import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';

export interface AutocompleteOption {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
  [key: string]: any;
}

interface SlottedOptionElement extends HTMLElement {
  value: string;
  label?: string;
  disabled: boolean;
  selected: boolean;
  active: boolean;
  hidden: boolean;
}

let autocompleteIds = 0;

/**
 * `<nx-autocomplete>` is an accessible, feature-rich combobox component that provides
 * real-time suggestion filtering, keyboard navigation, slot support (including `<nx-option>`),
 * and extensive CSS customization with zero border shadows.
 */
@Component({
  tag: 'nx-autocomplete',
  styleUrl: 'nx-autocomplete.scss',
  shadow: true,
})
export class NxAutocomplete {
  @Element() el!: HTMLElement;

  private nativeInput?: HTMLInputElement;
  private readonly autocompleteId = `nx-autocomplete-${autocompleteIds++}`;
  private readonly labelTextId = `${this.autocompleteId}-label`;
  private readonly listboxId = `${this.autocompleteId}-listbox`;

  private slotObserver?: MutationObserver;
  private debounceTimer?: any;
  private lastCommittedValue = '';

  @State() isOpen = false;
  @State() activeIndex = -1;
  @State() activeSlottedIndex = -1;
  @State() hasFocus = false;
  @State() hasSlottedLabel = false;
  @State() hasStartSlot = false;
  @State() hasEndSlot = false;
  @State() slottedOptionsCount = 0;
  @State() visibleSlottedCount = 0;

  /**
   * The current text value of the autocomplete input.
   */
  @Prop({ mutable: true, reflect: true }) value = '';

  /**
   * Label text displayed above the autocomplete control.
   */
  @Prop() label?: string;

  /**
   * Placeholder text shown when the input field is empty.
   */
  @Prop() placeholder = 'Start typing...';

  /**
   * Name of the input element for forms.
   */
  @Prop() name = '';

  /**
   * Whether the autocomplete is disabled.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Whether the autocomplete is read-only.
   */
  @Prop({ reflect: true }) readonly = false;

  /**
   * Marks the field as required.
   */
  @Prop({ reflect: true }) required = false;

  /**
   * Applies invalid/error visual styling.
   */
  @Prop({ reflect: true }) invalid = false;

  /**
   * Applies success visual styling.
   */
  @Prop({ reflect: true }) success = false;

  /**
   * Helper text displayed beneath the field.
   */
  @Prop() helperText?: string;

  /**
   * Error message displayed beneath the field when invalid is true.
   */
  @Prop() errorText?: string;

  /**
   * Array of options or JSON string. Accepts objects `{ label, value, disabled? }` or plain strings.
   * Can also be omitted when using slotted `<nx-option>` elements.
   */
  @Prop() options: (AutocompleteOption | string)[] | string = [];

  /**
   * Filtering mode: 'contains', 'startsWith', or 'custom' (for async/server-side filtering).
   */
  @Prop() filterMode: 'contains' | 'startsWith' | 'custom' = 'contains';

  /**
   * Debounce delay in milliseconds before emitting nxInput and filtering options.
   */
  @Prop() debounce = 0;

  /**
   * Whether an asynchronous search or loading process is in progress.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * Whether a clear ("x") button is displayed when input has a value.
   */
  @Prop() clearable = true;

  /**
   * Minimum number of characters typed before opening the suggestions dropdown.
   */
  @Prop() minChars = 0;

  /**
   * Whether focusing the input automatically opens the suggestions dropdown.
   */
  @Prop() openOnFocus = false;

  /**
   * Whether clicking the dropdown arrow icon toggles the dropdown list.
   */
  @Prop() showDropdownIcon = true;

  /**
   * Maximum number of suggestions to display in the dropdown. 0 means unlimited.
   */
  @Prop() maxResults = 0;

  /**
   * Message displayed when no suggestions match the query.
   */
  @Prop() noResultsText = 'No options found';

  /**
   * Whether to highlight the matching text segment within each suggestion item.
   */
  @Prop() highlightMatch = true;

  /**
   * Emitted whenever the user types into the input field.
   */
  @Event({ bubbles: true, composed: true }) nxInput!: EventEmitter<string>;

  /**
   * Emitted when a selection is made or the input loses focus after its value changed.
   */
  @Event({ bubbles: true, composed: true }) nxChange!: EventEmitter<string>;

  /**
   * Emitted when an option is selected from the dropdown list.
   */
  @Event({ bubbles: true, composed: true }) nxSelect!: EventEmitter<AutocompleteOption>;

  /**
   * Emitted when the clear button is clicked.
   */
  @Event({ bubbles: true, composed: true }) nxClear!: EventEmitter<void>;

  /**
   * Emitted when the input gains focus.
   */
  @Event({ bubbles: true, composed: true }) nxFocus!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the input loses focus.
   */
  @Event({ bubbles: true, composed: true }) nxBlur!: EventEmitter<FocusEvent>;

  connectedCallback() {
    this.lastCommittedValue = this.value || '';
    this.checkSlots();
    if (typeof MutationObserver !== 'undefined') {
      this.slotObserver = new MutationObserver(() => {
        this.checkSlots();
        this.syncSlottedOptions();
      });
      this.slotObserver.observe(this.el, { childList: true, subtree: true });
    }
  }

  disconnectedCallback() {
    this.slotObserver?.disconnect();
    this.slotObserver = undefined;
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = undefined;
    }
  }

  @Watch('value')
  valueChanged(newValue: string) {
    if (this.nativeInput && this.nativeInput.value !== (newValue ?? '')) {
      this.nativeInput.value = newValue ?? '';
    }
    this.syncSlottedOptions();
  }

  @Watch('disabled')
  disabledChanged(isDisabled: boolean) {
    if (isDisabled) {
      this.closeList();
    }
  }

  private get slottedOptions(): SlottedOptionElement[] {
    return Array.from(this.el.querySelectorAll('nx-option')) as SlottedOptionElement[];
  }

  private get hasSlottedOptions(): boolean {
    return this.slottedOptions.length > 0;
  }

  private get visibleEnabledSlottedOptions(): SlottedOptionElement[] {
    return this.slottedOptions.filter(opt => !opt.hidden && !opt.disabled);
  }

  private checkSlots = () => {
    const labelSlot = this.el.querySelector('[slot="label"]');
    this.hasSlottedLabel = !!labelSlot;
    if (labelSlot && !labelSlot.id) {
      labelSlot.id = this.labelTextId;
    }

    this.hasStartSlot = !!this.el.querySelector('[slot="start"]');
    this.hasEndSlot = !!this.el.querySelector('[slot="end"]');
    this.slottedOptionsCount = this.slottedOptions.length;
  };

  private syncSlottedOptions = () => {
    const options = this.slottedOptions;
    this.slottedOptionsCount = options.length;
    if (!options.length) {
      this.visibleSlottedCount = 0;
      return;
    }

    const query = (this.value || '').trim().toLowerCase();
    let visibleCount = 0;

    options.forEach(opt => {
      const rawLabel = opt.label || opt.textContent?.trim() || opt.value || '';
      const lowerLabel = rawLabel.toLowerCase();

      const matches =
        !query ||
        this.filterMode === 'custom' ||
        (this.filterMode === 'startsWith'
          ? lowerLabel.startsWith(query)
          : lowerLabel.includes(query));

      const isVisible =
        !(this.minChars > 0 && query.length < this.minChars) && matches;

      opt.hidden = !isVisible;
      if (isVisible) {
        visibleCount++;
      }

      opt.selected = rawLabel === this.value;
      opt.active = false;
    });

    this.visibleSlottedCount = visibleCount;
  };

  private onSlottedOptionsChange = () => {
    this.checkSlots();
    this.syncSlottedOptions();
  };

  /**
   * Parse and normalize the options array/string into standard AutocompleteOption items.
   */
  private get normalizedOptions(): AutocompleteOption[] {
    let list: unknown[] = [];
    const raw = this.options;

    if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          list = parsed;
        }
      } catch {
        list = raw.split(',').map(s => s.trim()).filter(Boolean);
      }
    } else if (Array.isArray(raw)) {
      list = raw;
    }

    return list.map(item => {
      if (typeof item === 'string' || typeof item === 'number') {
        return {
          label: String(item),
          value: String(item),
          disabled: false,
        };
      }
      if (item && typeof item === 'object') {
        const obj = item as Record<string, any>;
        const label = String(obj.label ?? obj.name ?? obj.title ?? obj.value ?? '');
        const value = obj.value !== undefined ? String(obj.value) : label;
        return {
          ...obj,
          label,
          value,
          disabled: Boolean(obj.disabled),
        };
      }
      return { label: '', value: '', disabled: false };
    });
  }

  /**
   * Filter the options according to filterMode and the current input query.
   */
  private get filteredOptions(): AutocompleteOption[] {
    const list = this.normalizedOptions;
    const query = (this.value || '').trim().toLowerCase();

    // If minChars is enforced and query is shorter, show no options
    if (this.minChars > 0 && query.length < this.minChars) {
      return [];
    }

    let result = list;

    if (this.filterMode !== 'custom' && query) {
      if (this.filterMode === 'startsWith') {
        result = list.filter(opt => opt.label.toLowerCase().startsWith(query));
      } else {
        result = list.filter(opt => opt.label.toLowerCase().includes(query));
      }
    }

    if (this.maxResults > 0) {
      return result.slice(0, this.maxResults);
    }

    return result;
  }

  private openList() {
    if (this.disabled || this.readonly) return;
    this.isOpen = true;
    if (this.hasSlottedOptions) {
      this.syncSlottedOptions();
    }
  }

  private closeList() {
    this.isOpen = false;
    this.activeIndex = -1;
    this.activeSlottedIndex = -1;
    if (this.hasSlottedOptions) {
      this.slottedOptions.forEach(opt => {
        opt.active = false;
      });
    }
  }

  private navigatePropOptions(direction: 'next' | 'prev') {
    const options = this.filteredOptions;
    if (!options.length) {
      this.activeIndex = -1;
      return;
    }

    const total = options.length;
    let nextIndex = this.activeIndex;

    for (let i = 0; i < total; i++) {
      if (direction === 'next') {
        nextIndex = nextIndex + 1 >= total ? 0 : nextIndex + 1;
      } else {
        nextIndex = nextIndex - 1 < 0 ? total - 1 : nextIndex - 1;
      }
      if (!options[nextIndex]?.disabled) {
        this.activeIndex = nextIndex;
        this.scrollActivePropOptionIntoView();
        break;
      }
    }
  }

  private scrollActivePropOptionIntoView() {
    if (this.activeIndex < 0) return;
    const optionEl = this.el.shadowRoot?.querySelector(
      `#${this.autocompleteId}-opt-${this.activeIndex}`
    ) as HTMLElement | null;
    if (optionEl) {
      optionEl.scrollIntoView({ block: 'nearest' });
    }
  }

  private navigateSlottedOptions(direction: 'next' | 'prev') {
    const visible = this.visibleEnabledSlottedOptions;
    if (!visible.length) {
      this.activeSlottedIndex = -1;
      return;
    }

    const total = visible.length;
    if (direction === 'next') {
      this.activeSlottedIndex = (this.activeSlottedIndex + 1) % total;
    } else {
      this.activeSlottedIndex = (this.activeSlottedIndex - 1 + total) % total;
    }

    visible.forEach((opt, idx) => {
      opt.active = idx === this.activeSlottedIndex;
    });

    const activeEl = visible[this.activeSlottedIndex];
    activeEl?.scrollIntoView({ block: 'nearest' });
  }

  private selectPropOption(option: AutocompleteOption) {
    if (option.disabled || this.disabled || this.readonly) return;

    this.value = option.label;
    if (this.nativeInput) {
      this.nativeInput.value = option.label;
    }
    this.lastCommittedValue = option.label;
    this.closeList();

    this.nxSelect.emit(option);
    this.nxInput.emit(this.value);
    this.nxChange.emit(this.value);

    // Keep focus on the native input
    this.nativeInput?.focus();
  }

  /**
   * Called by slotted `<nx-option>` components when clicked.
   */
  @Method()
  async selectOptionElement(option: HTMLElement) {
    const opt = option as SlottedOptionElement;
    if (opt.disabled || this.disabled || this.readonly) return;

    const label = opt.label || opt.textContent?.trim() || opt.value || '';
    const value = opt.value || label;

    const previousValue = this.value;
    this.value = label;
    if (this.nativeInput) {
      this.nativeInput.value = label;
    }
    this.lastCommittedValue = label;
    this.closeList();

    this.slottedOptions.forEach(item => {
      item.selected = item === opt;
      item.active = false;
    });

    this.nxSelect.emit({ label, value });
    this.nxInput.emit(this.value);
    if (this.value !== previousValue) {
      this.nxChange.emit(this.value);
    }

    this.nativeInput?.focus();
  }

  /**
   * Sets the active state on a slotted `<nx-option>` during hover.
   */
  @Method()
  async setOptionActive(option: HTMLElement) {
    const visible = this.visibleEnabledSlottedOptions;
    this.activeSlottedIndex = visible.indexOf(option as SlottedOptionElement);
    visible.forEach(opt => {
      opt.active = opt === option;
    });
  }

  @Listen('click', { target: 'document' })
  handleOutsideClick(event: MouseEvent) {
    if (this.isOpen && !event.composedPath().includes(this.el)) {
      this.closeList();
    }
  }

  /**
   * Sets focus to the native input element.
   */
  @Method()
  async setFocus() {
    this.nativeInput?.focus();
  }

  /**
   * Sets the input text value programmatically.
   */
  @Method()
  async setInputValue(value: string) {
    this.value = value;
    if (this.nativeInput && this.nativeInput.value !== value) {
      this.nativeInput.value = value;
    }
    this.lastCommittedValue = value;
    this.syncSlottedOptions();
    this.nxInput.emit(value);
    this.nxChange.emit(value);
  }

  /**
   * Clears the current input value and emits events.
   */
  @Method()
  async clear() {
    this.handleClear();
  }

  /**
   * Opens the suggestions dropdown list.
   */
  @Method()
  async open() {
    this.openList();
  }

  /**
   * Closes the suggestions dropdown list.
   */
  @Method()
  async close() {
    this.closeList();
  }

  /**
   * Returns a reference to the inner native `<input>` element.
   */
  @Method()
  async getInputElement(): Promise<HTMLInputElement | undefined> {
    return this.nativeInput;
  }

  private handleClear() {
    if (this.disabled || this.readonly) return;

    this.value = '';
    if (this.nativeInput) {
      this.nativeInput.value = '';
      this.nativeInput.focus();
    }
    this.activeIndex = -1;
    this.activeSlottedIndex = -1;
    this.lastCommittedValue = '';

    this.syncSlottedOptions();
    this.nxClear.emit();
    this.nxInput.emit('');
    this.nxChange.emit('');

    if (this.openOnFocus) {
      this.openList();
    } else {
      this.closeList();
    }
  }

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLInputElement;
    const newVal = input.value;
    this.value = newVal;

    if (this.debounce > 0) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.processInput(newVal);
      }, this.debounce);
    } else {
      this.processInput(newVal);
    }
  };

  private processInput(val: string) {
    this.nxInput.emit(val);
    this.activeIndex = -1;
    this.activeSlottedIndex = -1;

    if (this.hasSlottedOptions) {
      this.syncSlottedOptions();
    }

    if (this.minChars > 0 && val.trim().length < this.minChars) {
      this.closeList();
    } else {
      this.openList();
    }
  }

  private onFocus = (ev: FocusEvent) => {
    this.hasFocus = true;
    this.nxFocus.emit(ev);

    if (this.openOnFocus && !this.disabled && !this.readonly) {
      const query = (this.value || '').trim();
      if (this.minChars === 0 || query.length >= this.minChars) {
        this.openList();
      }
    }
  };

  private onBlur = (ev: FocusEvent) => {
    this.hasFocus = false;
    this.nxBlur.emit(ev);

    if (this.value !== this.lastCommittedValue) {
      this.lastCommittedValue = this.value;
      this.nxChange.emit(this.value);
    }
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (this.disabled || this.readonly) return;

    const hasSlotted = this.hasSlottedOptions;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) {
          this.openList();
        } else if (hasSlotted) {
          this.navigateSlottedOptions('next');
        } else {
          this.navigatePropOptions('next');
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen) {
          this.openList();
        } else if (hasSlotted) {
          this.navigateSlottedOptions('prev');
        } else {
          this.navigatePropOptions('prev');
        }
        break;

      case 'Enter':
        if (this.isOpen) {
          if (hasSlotted && this.activeSlottedIndex >= 0) {
            const activeOption = this.visibleEnabledSlottedOptions[this.activeSlottedIndex];
            if (activeOption) {
              event.preventDefault();
              this.selectOptionElement(activeOption);
            }
          } else if (!hasSlotted && this.activeIndex >= 0) {
            const activeOption = this.filteredOptions[this.activeIndex];
            if (activeOption && !activeOption.disabled) {
              event.preventDefault();
              this.selectPropOption(activeOption);
            }
          }
        }
        break;

      case 'Escape':
        if (this.isOpen) {
          event.preventDefault();
          event.stopPropagation();
          this.closeList();
        }
        break;

      case 'Tab':
        this.closeList();
        break;

      case 'Home':
        if (this.isOpen) {
          event.preventDefault();
          if (hasSlotted) {
            this.activeSlottedIndex = 0;
            const visible = this.visibleEnabledSlottedOptions;
            visible.forEach((opt, idx) => (opt.active = idx === 0));
            visible[0]?.scrollIntoView({ block: 'nearest' });
          } else if (this.filteredOptions.length > 0) {
            this.activeIndex = 0;
            this.scrollActivePropOptionIntoView();
          }
        }
        break;

      case 'End':
        if (this.isOpen) {
          event.preventDefault();
          if (hasSlotted) {
            const visible = this.visibleEnabledSlottedOptions;
            this.activeSlottedIndex = visible.length - 1;
            visible.forEach((opt, idx) => (opt.active = idx === visible.length - 1));
            visible[visible.length - 1]?.scrollIntoView({ block: 'nearest' });
          } else if (this.filteredOptions.length > 0) {
            this.activeIndex = this.filteredOptions.length - 1;
            this.scrollActivePropOptionIntoView();
          }
        }
        break;
    }
  };

  private onDropdownToggleClick = (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.disabled || this.readonly) return;

    if (this.isOpen) {
      this.closeList();
    } else {
      this.openList();
      this.nativeInput?.focus();
    }
  };

  private onClearClick = (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    this.handleClear();
  };

  private get hasLabel() {
    return this.label !== undefined || this.hasSlottedLabel;
  }

  private getLabelledById() {
    if (!this.hasLabel) {
      return undefined;
    }

    return this.label !== undefined
      ? this.labelTextId
      : this.el.querySelector('[slot="label"]')?.id;
  }

  private renderLabel() {
    if (!this.hasLabel) {
      return null;
    }

    return (
      <div class="label-text-wrapper" part="label">
        {this.label !== undefined ? (
          <label class="label-text" id={this.labelTextId} htmlFor={this.autocompleteId}>
            {this.label}
            {this.required && <span class="required" aria-hidden="true">*</span>}
          </label>
        ) : (
          <slot name="label" onSlotchange={this.checkSlots}></slot>
        )}
      </div>
    );
  }

  private renderFooter() {
    const showError = this.invalid && Boolean(this.errorText);
    const showHelper = !showError && Boolean(this.helperText);

    if (!showError && !showHelper) {
      return null;
    }

    return (
      <div class="input-footer" part="footer">
        {showError && (
          <div class="error-text" part="error-text" role="alert">
            {this.errorText}
          </div>
        )}
        {showHelper && (
          <div class="helper-text" part="helper-text">
            {this.helperText}
          </div>
        )}
      </div>
    );
  }

  private renderOptionContent(option: AutocompleteOption) {
    const query = (this.value || '').trim();
    if (!this.highlightMatch || !query) {
      return option.label;
    }

    const label = option.label;
    const lowerLabel = label.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const matchIndex = lowerLabel.indexOf(lowerQuery);

    if (matchIndex === -1) {
      return label;
    }

    const before = label.slice(0, matchIndex);
    const match = label.slice(matchIndex, matchIndex + query.length);
    const after = label.slice(matchIndex + query.length);

    return (
      <span>
        {before}
        <mark class="option-highlight" part="option-highlight">{match}</mark>
        {after}
      </span>
    );
  }

  private renderDropdownPanel() {
    const hasSlotted = this.hasSlottedOptions;
    const filtered = this.filteredOptions;
    const showNoResults =
      !this.loading &&
      (hasSlotted ? this.visibleSlottedCount === 0 : filtered.length === 0);

    return (
      <div
        class="options-panel"
        part="panel"
        id={this.listboxId}
        role="listbox"
        aria-label={this.label || 'Suggestions'}
        hidden={!this.isOpen}
      >
        {/* Slotted <nx-option> items are projected here */}
        <slot onSlotchange={this.onSlottedOptionsChange} />

        {this.loading && (
          <div class="loading-state" part="loading-state" aria-live="polite">
            <span class="loading-spinner" aria-hidden="true">
              <nx-icon name="loader-2" size="small"></nx-icon>
            </span>
            <span class="loading-text">Loading suggestions...</span>
          </div>
        )}

        {/* Render prop-based options if no slotted <nx-option> were provided */}
        {!hasSlotted &&
          !this.loading &&
          filtered.map((option, index) => {
            const isActive = index === this.activeIndex;
            const isSelected = option.label === this.value;
            const optId = `${this.autocompleteId}-opt-${index}`;

            return (
              <div
                key={`${option.value}-${index}`}
                id={optId}
                class={{
                  'option-item': true,
                  'is-active': isActive,
                  'is-selected': isSelected,
                  'is-disabled': Boolean(option.disabled),
                }}
                part="option"
                role="option"
                aria-selected={isSelected ? 'true' : 'false'}
                aria-disabled={option.disabled ? 'true' : undefined}
                onMouseDown={ev => {
                  ev.preventDefault(); // Prevents input blur before click
                  if (!option.disabled) {
                    this.selectPropOption(option);
                  }
                }}
                onMouseEnter={() => {
                  if (!option.disabled) {
                    this.activeIndex = index;
                  }
                }}
              >
                <span class="option-label" part="option-label">
                  {this.renderOptionContent(option)}
                </span>
                {isSelected && (
                  <nx-icon
                    class="checkmark"
                    part="checkmark"
                    name="check"
                    size="small"
                  ></nx-icon>
                )}
              </div>
            );
          })}

        {showNoResults && (
          <div class="no-results" part="no-results" role="status">
            <slot name="no-results">{this.noResultsText}</slot>
          </div>
        )}
      </div>
    );
  }

  render() {
    const hasSlotted = this.hasSlottedOptions;
    const activeOptionId =
      this.isOpen &&
      (hasSlotted
        ? this.visibleEnabledSlottedOptions[this.activeSlottedIndex]?.id
        : this.activeIndex >= 0
        ? `${this.autocompleteId}-opt-${this.activeIndex}`
        : undefined);

    const showClear =
      this.clearable && !this.disabled && !this.readonly && Boolean(this.value);

    return (
      <Host
        class={{
          'has-focus': this.hasFocus,
          'has-start-slot': this.hasStartSlot,
          'has-end-slot': this.hasEndSlot,
          'has-slotted-options': hasSlotted,
          'is-open': this.isOpen,
          'invalid': this.invalid,
          'success': this.success,
          'disabled': this.disabled,
          'readonly': this.readonly,
        }}
      >
        <div class="select-field">
          {this.renderLabel()}

          <div class="select-control" part="control">
            <div
              class={{
                'select-trigger': true,
                'has-focus': this.hasFocus,
                'is-open': this.isOpen,
              }}
              part="trigger"
              onClick={() => {
                if (!this.disabled && !this.readonly) {
                  this.nativeInput?.focus();
                }
              }}
            >
              <div class="input-start" part="start" hidden={!this.hasStartSlot}>
                <slot name="start" onSlotchange={this.checkSlots}></slot>
              </div>

              <input
                ref={el => (this.nativeInput = el as HTMLInputElement)}
                id={this.autocompleteId}
                class="native-input"
                part="input"
                type="text"
                name={this.name}
                value={this.value}
                placeholder={this.placeholder}
                disabled={this.disabled}
                readOnly={this.readonly}
                required={this.required}
                autocomplete="off"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={this.isOpen ? 'true' : 'false'}
                aria-controls={this.listboxId}
                aria-activedescendant={activeOptionId}
                aria-labelledby={this.getLabelledById()}
                aria-invalid={this.invalid ? 'true' : undefined}
                aria-required={this.required ? 'true' : undefined}
                onInput={this.onInput}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
              />

              <div class="input-end" part="end">
                <slot name="end" onSlotchange={this.checkSlots}></slot>

                {this.loading && (
                  <span class="inline-loader" part="loader" aria-hidden="true">
                    <slot name="loading">
                      <nx-icon name="loader-2" size="small"></nx-icon>
                    </slot>
                  </span>
                )}

                {showClear && (
                  <button
                    type="button"
                    class="clear-button"
                    part="clear-button"
                    aria-label="Clear input"
                    tabindex="-1"
                    onClick={this.onClearClick}
                  >
                    <nx-icon name="x" size="small"></nx-icon>
                  </button>
                )}

                {this.showDropdownIcon && (
                  <button
                    type="button"
                    class={{
                      'dropdown-toggle': true,
                      'is-open': this.isOpen,
                    }}
                    part="dropdown-button"
                    tabindex="-1"
                    aria-label="Toggle suggestions"
                    disabled={this.disabled || this.readonly}
                    onClick={this.onDropdownToggleClick}
                  >
                    <nx-icon
                      class="chevron"
                      part="chevron"
                      name="chevron-down"
                    ></nx-icon>
                  </button>
                )}
              </div>
            </div>

            {this.renderDropdownPanel()}
          </div>

          {this.renderFooter()}
        </div>
      </Host>
    );
  }
}

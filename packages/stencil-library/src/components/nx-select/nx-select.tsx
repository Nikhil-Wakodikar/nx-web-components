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

interface SelectOptionElement extends HTMLElement {
  value: string;
  disabled: boolean;
  selected: boolean;
  active: boolean;
}

interface SelectOptionDetail {
  value: string;
  label: string;
}

@Component({
  tag: 'nx-select',
  styleUrl: 'nx-select.scss',
  shadow: true,
})
export class NxSelect {
  @Element() el!: HTMLElement;

  @Prop({ mutable: true }) value = '';
  @Prop() label?: string;
  @Prop() placeholder = 'Select an option';
  @Prop() name = '';
  @Prop() required = false;
  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) invalid = false;
  @Prop({ reflect: true }) success = false;

  @State() isOpen = false;
  @State() activeIndex = -1;
  @State() optionsVersion = 0;

  @Event({ bubbles: true, composed: true }) nxInput!: EventEmitter<string>;
  @Event({ bubbles: true, composed: true }) nxChange!: EventEmitter<string>;
  @Event({ bubbles: true, composed: true }) nxFocus!: EventEmitter<FocusEvent>;
  @Event({ bubbles: true, composed: true }) nxBlur!: EventEmitter<FocusEvent>;

  private readonly selectId = `nx-select-${selectIds++}`;
  private readonly labelId = `${this.selectId}-label`;
  private readonly listboxId = `${this.selectId}-listbox`;

  @Watch('value')
  valueChanged() {
    this.syncSelectedOptions();
    this.optionsVersion++;
  }

  @Watch('disabled')
  disabledChanged(disabled: boolean) {
    if (disabled) this.closeList();
  }

  componentDidLoad() {
    this.syncSelectedOptions();
  }

  private get options(): SelectOptionElement[] {
    return Array.from(
      this.el.querySelectorAll('nx-select-option')
    ) as SelectOptionElement[];
  }

  private get enabledOptions(): SelectOptionElement[] {
    return this.options.filter(option => !option.disabled);
  }

  private get selectedLabel(): string {
    const selected = this.options.find(option => option.value === this.value);
    return selected?.textContent?.trim() || '';
  }

  private syncSelectedOptions() {
    this.options.forEach(option => {
      option.selected = option.value === this.value;
      option.active = false;
    });
  }

  private onOptionsChange = () => {
    this.syncSelectedOptions();
    this.optionsVersion++;
  };

  private setActiveIndex(index: number) {
    const enabled = this.enabledOptions;
    if (!enabled.length) {
      this.activeIndex = -1;
      return;
    }

    this.activeIndex = (index + enabled.length) % enabled.length;
    const activeOption = enabled[this.activeIndex];
    this.options.forEach(option => {
      option.active = option === activeOption;
    });
  }

  private openList(index?: number) {
    if (this.disabled) return;
    this.isOpen = true;
    const selectedIndex = this.enabledOptions.findIndex(
      option => option.value === this.value
    );
    this.setActiveIndex(index ?? (selectedIndex >= 0 ? selectedIndex : 0));
  }

  private closeList() {
    this.isOpen = false;
    this.activeIndex = -1;
    this.options.forEach(option => {
      option.active = false;
    });
  }

  private chooseOption(option: SelectOptionElement) {
    if (option.disabled || this.disabled) return;

    this.value = option.value;
    this.syncSelectedOptions();
    this.nxInput.emit(this.value);
    this.nxChange.emit(this.value);
    this.closeList();
    this.el.shadowRoot?.querySelector<HTMLButtonElement>('.select-trigger')?.focus();
  }

  @Listen('nxSelectOptionSelect')
  handleOptionSelect(event: CustomEvent<SelectOptionDetail>) {
    event.stopPropagation();
    const option = this.options.find(item => item.value === event.detail.value);
    if (option) this.chooseOption(option);
  }

  @Listen('click', { target: 'window' })
  handleOutsideClick(event: Event) {
    if (this.isOpen && !event.composedPath().includes(this.el)) {
      this.closeList();
    }
  }

  private onTriggerClick = () => {
    if (this.isOpen) {
      this.closeList();
    } else {
      this.openList();
    }
  };

  private onTriggerFocus = (event: FocusEvent) => {
    this.nxFocus.emit(event);
  };

  private onTriggerBlur = (event: FocusEvent) => {
    this.nxBlur.emit(event);
  };

  private onTriggerKeyDown = (event: KeyboardEvent) => {
    const enabled = this.enabledOptions;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) this.openList();
        else this.setActiveIndex(this.activeIndex + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen) this.openList(enabled.length - 1);
        else this.setActiveIndex(this.activeIndex - 1);
        break;
      case 'Home':
        if (this.isOpen) {
          event.preventDefault();
          this.setActiveIndex(0);
        }
        break;
      case 'End':
        if (this.isOpen) {
          event.preventDefault();
          this.setActiveIndex(enabled.length - 1);
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!this.isOpen) {
          this.openList();
        } else if (enabled[this.activeIndex]) {
          this.chooseOption(enabled[this.activeIndex]);
        }
        break;
      case 'Escape':
        if (this.isOpen) {
          event.preventDefault();
          this.closeList();
        }
        break;
      case 'Tab':
        this.closeList();
        break;
    }
  };

  @Method()
  async setFocus() {
    this.el.shadowRoot?.querySelector<HTMLButtonElement>('.select-trigger')?.focus();
  }

  render() {
    const selectedLabel = this.selectedLabel;
    const activeOption = this.enabledOptions[this.activeIndex];
    const label = this.label;

    return (
      <Host
        class={{
          invalid: this.invalid,
          success: this.success,
        }}
      >
        <div class="select-field">
          {label && (
            <label class="label-text" id={this.labelId} htmlFor={this.selectId}>
              {label}
              {this.required && <span class="required">*</span>}
            </label>
          )}

          <div class="select-control">
            <button
              class="select-trigger"
              id={this.selectId}
              type="button"
              role="combobox"
              aria-haspopup="listbox"
              aria-expanded={this.isOpen ? 'true' : 'false'}
              aria-controls={this.listboxId}
              aria-activedescendant={this.isOpen ? activeOption?.id : undefined}
              aria-labelledby={label ? this.labelId : undefined}
              aria-invalid={this.invalid ? 'true' : 'false'}
              aria-required={this.required ? 'true' : 'false'}
              disabled={this.disabled}
              onClick={this.onTriggerClick}
              onFocus={this.onTriggerFocus}
              onBlur={this.onTriggerBlur}
              onKeyDown={this.onTriggerKeyDown}
            >
              <span class={{ 'selected-label': true, placeholder: !selectedLabel }}>
                {selectedLabel || this.placeholder}
              </span>
              <svg class="chevron" viewBox="0 0 16 16" aria-hidden="true">
                <path d="m4 6 4 4 4-4" />
              </svg>
            </button>

            <div
              class="options-panel"
              id={this.listboxId}
              role="listbox"
              aria-labelledby={label ? this.labelId : undefined}
              hidden={!this.isOpen}
            >
              <slot onSlotchange={this.onOptionsChange} />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}

let selectIds = 0;
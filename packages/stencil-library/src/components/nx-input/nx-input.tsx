import { Component, Element, Event, EventEmitter, Host, Method, Prop, State, Watch, h } from '@stencil/core';
import { createSlotMutationController, SlotMutationController } from '../../utils/slot-mutation-controller';

@Component({
  tag: 'nx-input',
  styleUrl: 'nx-input.scss',
  shadow: true,
})
export class NxInput {
  @Element() el!: HTMLElement;

  private nativeInput!: HTMLInputElement;

  private inputId = `nx-input-${inputIds++}`;
  private labelTextId = `${this.inputId}-label`;

  private slotMutationController?: SlotMutationController;

  @State() hasFocus = false;
  @State() hasSlottedLabel = false;
  @State() hasStartSlot = false;
  @State() hasEndSlot = false;

  @Prop({ mutable: true }) value: string = '';

  @Prop() label?: string;
  @Prop() required = false;
  @Prop() type = 'text';
  @Prop() placeholder = '';
  @Prop() name = '';

  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) readonly = false;

  @Prop() maxlength?: number;
  @Prop() minlength?: number;
  @Prop() min?: string | number;
  @Prop() max?: string | number;
  @Prop() step?: string | number;

  @Prop() autocomplete = 'off';
  @Prop() autocapitalize = 'off';
  @Prop() autofocus = false;

  @Prop() inputmode?: string;
  @Prop() pattern?: string;
  @Prop() spellcheck = false;

  @Prop() counter = false;
  @Prop() helperText?: string;
  @Prop() errorText?: string;

  @Prop({ reflect: true }) invalid = false;
  @Prop({ reflect: true }) success = false;

  @Event({ bubbles: true, composed: true }) nxInput!: EventEmitter<string>;

  @Event({ bubbles: true, composed: true }) nxChange!: EventEmitter<string>;

  @Event({ bubbles: true, composed: true }) nxFocus!: EventEmitter<FocusEvent>;

  @Event({ bubbles: true, composed: true }) nxBlur!: EventEmitter<FocusEvent>;

  connectedCallback() {
    this.slotMutationController = createSlotMutationController(
      this.el,
      ['label', 'start', 'end'],
      () => {
        this.checkSlots();
      },
    );

    this.checkSlots();
  }

  disconnectedCallback() {
    this.slotMutationController?.destroy();
    this.slotMutationController = undefined;
  }

  @Watch('value')
  valueChanged(value: string) {
    if (this.nativeInput && this.nativeInput.value !== value) {
      this.nativeInput.value = value ?? '';
    }
  }

  @Method()
  async setInputValue(value: string) {
    this.value = value;

    if (this.nativeInput && this.nativeInput.value !== value) {
      this.nativeInput.value = value;
    }

    this.nxInput.emit(this.value);
  }

  @Method()
  async setFocus() {
    this.nativeInput?.focus();
  }

  @Method()
  async getInputElement(): Promise<HTMLInputElement> {
    return this.nativeInput;
  }

  private checkSlots = () => {
    const labelSlot = this.el.querySelector('[slot="label"]');
    this.hasSlottedLabel = !!labelSlot;
    if (labelSlot && !labelSlot.id) {
      labelSlot.id = this.labelTextId;
    }

    this.hasStartSlot = !!this.el.querySelector('[slot="start"]');
    this.hasEndSlot = !!this.el.querySelector('[slot="end"]');
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
          <div class="label-text" id={this.labelTextId}>
            {this.label}
            {this.required && <span class="required">*</span>}
          </div>
        ) : (
          <slot name="label" onSlotchange={this.checkSlots}></slot>
        )}
      </div>
    );
  }

  private renderFooter() {
    const showError = this.invalid && Boolean(this.errorText);
    const showHelper = !showError && Boolean(this.helperText);
    const showCounter = this.counter;

    if (!showError && !showHelper && !showCounter) {
      return null;
    }

    const currentLength = (this.value ?? '').length;
    const counterText =
      this.maxlength !== undefined ? `${currentLength} / ${this.maxlength}` : `${currentLength}`;

    return (
      <div class="input-footer" part="footer">
        <div class="footer-message">
          {showError && (
            <div class="error-text" part="error-text">
              {this.errorText}
            </div>
          )}
          {showHelper && (
            <div class="helper-text" part="helper-text">
              {this.helperText}
            </div>
          )}
        </div>
        {showCounter && (
          <div class="counter-text" part="counter">
            {counterText}
          </div>
        )}
      </div>
    );
  }

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLInputElement;

    this.value = input.value;

    this.nxInput.emit(this.value);
  };

  private onChange = () => {
    this.nxChange.emit(this.value);
  };

  private onFocus = (ev: FocusEvent) => {
    this.hasFocus = true;
    this.nxFocus.emit(ev);
  };

  private onBlur = (ev: FocusEvent) => {
    this.hasFocus = false;
    this.nxBlur.emit(ev);
  };

  private onLabelClick = (ev: MouseEvent) => {
    if (ev.target === ev.currentTarget) {
      ev.stopPropagation();
    }
  };

  render() {
    return (
      <Host
        class={{
          'has-focus': this.hasFocus,
          'has-start-slot': this.hasStartSlot,
          'has-end-slot': this.hasEndSlot,
          'invalid': this.invalid,
          'success': this.success,
          'disabled': this.disabled,
        }}
      >
        <label
          class="input-wrapper"
          htmlFor={this.inputId}
          onClick={this.onLabelClick}
        >
          {this.renderLabel()}

          <div class="native-wrapper" part="input-box">
            <div class="input-start" part="start" hidden={!this.hasStartSlot}>
              <slot name="start" onSlotchange={this.checkSlots}></slot>
            </div>

            <input
              ref={el => (this.nativeInput = el as HTMLInputElement)}
              id={this.inputId}
              aria-labelledby={this.getLabelledById()}
              aria-invalid={this.invalid ? 'true' : undefined}
              class="native-input"
              part="input"
              type={this.type}
              value={this.value}
              name={this.name}
              placeholder={this.placeholder}
              disabled={this.disabled}
              readOnly={this.readonly}
              required={this.required}
              maxLength={this.maxlength}
              minLength={this.minlength}
              min={this.min}
              max={this.max}
              step={this.step}
              autoComplete={this.autocomplete}
              autoCapitalize={this.autocapitalize}
              autoFocus={this.autofocus}
              spellcheck={this.spellcheck}
              inputMode={this.inputmode}
              pattern={this.pattern}
              onInput={this.onInput}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            />

            <div class="input-end" part="end" hidden={!this.hasEndSlot}>
              <slot name="end" onSlotchange={this.checkSlots}></slot>
            </div>
          </div>

          {this.renderFooter()}
        </label>
      </Host>
    );
  }
}

let inputIds = 0;
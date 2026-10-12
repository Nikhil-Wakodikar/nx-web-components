import { Component, Event, EventEmitter, Host, Method, Prop, State, h } from '@stencil/core';

const colorTokens: Record<string, string> = {
  primary: 'var(--nx-color-primary, #8145b5)',
  secondary: 'var(--nx-color-secondary, #475569)',
  success: 'var(--nx-color-success, #16a34a)',
  warning: 'var(--nx-color-warning, #d97706)',
  danger: 'var(--nx-color-error, #dc2626)',
  error: 'var(--nx-color-error, #dc2626)',
  info: 'var(--nx-color-info, #2563eb)',
  medium: 'var(--nx-color-gray-500, #64748b)',
  dark: 'var(--nx-color-gray-900, #0f172a)',
};

@Component({
  tag: 'nx-checkbox',
  styleUrl: 'nx-checkbox.scss',
  shadow: true,
})
export class NxCheckbox {
  private nativeInput?: HTMLInputElement;
  private inputId = `nx-checkbox-${checkboxIds++}`;

  @State() hasFocus = false;

  @Prop({ mutable: true, reflect: true }) checked = false;

  @Prop({ mutable: true, reflect: true }) indeterminate = false;

  @Prop({ mutable: true, reflect: true }) disabled = false;

  @Prop({ reflect: true }) invalid = false;

  @Prop({ reflect: true }) required = false;

  @Prop() name = '';

  @Prop() value = 'on';

  @Prop() label?: string;

  @Prop({ reflect: true }) labelPlacement: 'start' | 'end' = 'end';

  @Prop({ reflect: true }) justify?: 'start' | 'end' | 'space-between';

  @Prop({ reflect: true }) alignment?: 'start' | 'center';

  @Prop({ reflect: true }) color?: string;

  @Prop() helperText?: string;

  @Prop() errorText?: string;

  @Event({
    eventName: 'checkedChange',
    bubbles: true,
    composed: true,
    cancelable: true,
  })
  checkedChange!: EventEmitter<boolean>;

  @Event({ bubbles: true, composed: true }) nxChange!: EventEmitter<boolean>;

  @Event({ bubbles: true, composed: true }) nxFocus!: EventEmitter<FocusEvent>;

  @Event({ bubbles: true, composed: true }) nxBlur!: EventEmitter<FocusEvent>;

  @Method()
  async setFocus() {
    this.nativeInput?.focus();
  }

  private get cssColor(): string | undefined {
    if (!this.color) return undefined;
    return colorTokens[this.color.toLowerCase()] || this.color;
  }

  private onChange = (event: Event) => {
    if (this.disabled) return;
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false;
    this.checkedChange.emit(this.checked);
    this.nxChange.emit(this.checked);
  };

  private onFocus = (ev: FocusEvent) => {
    this.hasFocus = true;
    this.nxFocus.emit(ev);
  };

  private onBlur = (ev: FocusEvent) => {
    this.hasFocus = false;
    this.nxBlur.emit(ev);
  };

  private renderFooter() {
    const showError = this.invalid && Boolean(this.errorText);
    const showHelper = !showError && Boolean(this.helperText);

    if (!showError && !showHelper) {
      return null;
    }

    return (
      <div part="footer" class="checkbox-footer">
        {showError && (
          <div part="error-text" class="error-text">
            {this.errorText}
          </div>
        )}
        {showHelper && (
          <div part="helper-text" class="helper-text">
            {this.helperText}
          </div>
        )}
      </div>
    );
  }

  render() {
    const { checked, indeterminate, disabled, invalid, justify, alignment, labelPlacement, inputId } = this;
    const hostStyles: Record<string, string> = {};

    if (this.cssColor) {
      hostStyles['--checked-background'] = this.cssColor;
      hostStyles['--checked-border-color'] = this.cssColor;
    }

    return (
      <Host
        style={hostStyles}
        class={{
          checked,
          indeterminate,
          disabled,
          invalid,
          'has-focus': this.hasFocus,
          [`checkbox-label-${labelPlacement}`]: true,
          [`checkbox-justify-${justify}`]: justify !== undefined,
          [`checkbox-alignment-${alignment}`]: alignment !== undefined,
        }}
      >
        <div part="container" class="checkbox-wrapper">
          <div part="mark" class="checkbox-box-wrapper">
            <input
              ref={el => (this.nativeInput = el as HTMLInputElement)}
              id={inputId}
              type="checkbox"
              name={this.name}
              value={this.value}
              checked={checked}
              disabled={disabled}
              required={this.required}
              aria-checked={indeterminate ? 'mixed' : checked ? 'true' : 'false'}
              aria-invalid={invalid ? 'true' : undefined}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            />
          </div>

          <label part="label" class="checkbox-label-container" htmlFor={inputId}>
            {this.label}
            <slot />
            {this.required && <span class="required">*</span>}
          </label>
        </div>

        {this.renderFooter()}
      </Host>
    );
  }
}

let checkboxIds = 0;
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
  tag: 'nx-toggle',
  styleUrl: 'nx-toggle.scss',
  shadow: true,
})
export class NxToggle {
  private nativeInput?: HTMLInputElement;
  private inputId = `nx-toggle-${toggleIds++}`;

  @State() hasFocus = false;

  @Prop({ mutable: true, reflect: true }) checked = false;

  @Prop({ mutable: true, reflect: true }) disabled = false;

  @Prop({ reflect: true }) invalid = false;

  @Prop({ reflect: true }) required = false;

  @Prop() name = '';

  @Prop() value = 'on';

  @Prop() label?: string;

  @Prop({ reflect: true }) labelPlacement: 'start' | 'end' = 'end';

  @Prop({ reflect: true }) justify?: 'start' | 'end' | 'space-between';

  @Prop({ reflect: true }) alignment?: 'start' | 'center';

  @Prop({ reflect: true }) size: 'small' | 'default' | 'medium' | 'large' = 'default';

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
  async toggle(): Promise<boolean> {
    if (this.disabled) return this.checked;
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
    this.nxChange.emit(this.checked);
    return this.checked;
  }

  @Method()
  async setFocus(): Promise<void> {
    this.nativeInput?.focus();
  }

  private get cssColor(): string | undefined {
    if (!this.color) return undefined;
    return colorTokens[this.color.toLowerCase()] || this.color;
  }

  private onChange = (event: Event) => {
    if (this.disabled) return;
    const checked = (event.target as HTMLInputElement).checked;
    this.checked = checked;
    this.checkedChange.emit(checked);
    this.nxChange.emit(checked);
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
      <div part="footer" class="toggle-footer">
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
    const normalizedSize = this.size === 'medium' ? 'default' : this.size;
    const hostStyles: Record<string, string> = {};

    if (this.cssColor) {
      hostStyles['--track-background-checked'] = this.cssColor;
      hostStyles['--border-color-checked'] = this.cssColor;
    }

    return (
      <Host
        style={hostStyles}
        class={{
          'checked': this.checked,
          'disabled': this.disabled,
          'invalid': this.invalid,
          'has-focus': this.hasFocus,
          [`toggle-${normalizedSize}`]: true,
          [`toggle-label-${this.labelPlacement}`]: true,
          [`toggle-justify-${this.justify}`]: this.justify !== undefined,
          [`toggle-alignment-${this.alignment}`]: this.alignment !== undefined,
        }}
      >
        <div part="container" class="toggle-wrapper">
          <div part="track" class="toggle-track">
            <span part="thumb" class="toggle-thumb"></span>
            <input
              ref={el => (this.nativeInput = el as HTMLInputElement)}
              id={this.inputId}
              type="checkbox"
              role="switch"
              name={this.name}
              value={this.value}
              checked={this.checked}
              disabled={this.disabled}
              required={this.required}
              aria-checked={this.checked ? 'true' : 'false'}
              aria-invalid={this.invalid ? 'true' : undefined}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            />
          </div>

          <label part="label" class="toggle-label-container" htmlFor={this.inputId}>
            {this.label}
            <slot></slot>
            {this.required && <span class="required">*</span>}
          </label>
        </div>

        {this.renderFooter()}
      </Host>
    );
  }
}

let toggleIds = 0;


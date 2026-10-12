import { Component, Element, Event, EventEmitter, Host, Method, Prop, State, Watch, h } from '@stencil/core';

type RadioGroupElement = HTMLElement & {
  allowEmptySelection: boolean;
  compareWith?: string | ((a: any, b: any) => boolean);
  disabled?: boolean;
  invalid?: boolean;
  value: any;
};

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
  tag: 'nx-radio',
  styleUrl: 'nx-radio.scss',
  shadow: true,
})
export class NxRadio {
  private radioGroup?: RadioGroupElement | null;

  @Element() el!: HTMLNxRadioElement;

  @Prop() value: any;

  @Prop({ reflect: true }) disabled = false;

  @Prop({ reflect: true }) invalid = false;

  @Prop({ reflect: true }) color?: string;

  @Prop() labelPlacement: 'start' | 'end' | 'fixed' | 'stacked' = 'end';

  @Prop() justify?: 'start' | 'end' | 'space-between';

  @Prop() alignment?: 'start' | 'center';

  @State() checked = false;

  @State() groupDisabled = false;

  @State() groupInvalid = false;

  @State() buttonTabindex = -1;

  @Event({ bubbles: true, composed: true }) nxFocus!: EventEmitter<void>;

  @Event({ bubbles: true, composed: true }) nxBlur!: EventEmitter<void>;

  connectedCallback() {
    this.radioGroup = this.el.closest('nx-radio-group') as RadioGroupElement | null;

    this.updateState();

    this.radioGroup?.addEventListener('nxValueChange', this.updateState);
  }

  disconnectedCallback() {
    this.radioGroup?.removeEventListener('nxValueChange', this.updateState);
  }

  @Watch('value')
  valueChanged() {
    this.updateState();
  }

  private get isDisabled(): boolean {
    return this.disabled || this.groupDisabled;
  }

  private get isInvalid(): boolean {
    return this.invalid || this.groupInvalid;
  }

  private get cssColor(): string | undefined {
    if (!this.color) return undefined;
    return colorTokens[this.color.toLowerCase()] || this.color;
  }

  private updateState = () => {
    if (!this.radioGroup) {
      return;
    }

    this.groupDisabled = Boolean(this.radioGroup.disabled);
    this.groupInvalid = Boolean(this.radioGroup.invalid);

    const compareWith = this.radioGroup.compareWith;

    if (typeof compareWith === 'function') {
      this.checked = compareWith(this.radioGroup.value, this.value);
      return;
    }

    if (typeof compareWith === 'string' && this.radioGroup.value && this.value) {
      this.checked = this.radioGroup.value[compareWith] === this.value[compareWith];
      return;
    }

    this.checked = this.radioGroup.value === this.value;
  };

  private onClick = () => {
    if (this.isDisabled) {
      return;
    }

    if (!this.radioGroup) {
      this.checked = true;
    }
  };

  private onFocus = () => {
    this.nxFocus.emit();
  };

  private onBlur = () => {
    this.nxBlur.emit();
  };

  @Method()
  async setFocus() {
    this.el.focus();
  }

  @Method()
  async setButtonTabindex(index: number) {
    this.buttonTabindex = index;
  }

  private get hasLabel() {
    return (this.el.textContent?.trim().length ?? 0) > 0;
  }

  render() {
    const hostStyles: Record<string, string> = {};
    if (this.cssColor) {
      hostStyles['--border-color-checked'] = this.cssColor;
      hostStyles['--background-checked'] = this.cssColor;
    }

    return (
      <Host
        role="radio"
        tabindex={this.isDisabled ? -1 : this.buttonTabindex}
        aria-checked={`${this.checked}`}
        aria-disabled={this.isDisabled ? 'true' : undefined}
        style={hostStyles}
        class={{
          checked: this.checked,
          disabled: this.isDisabled,
          invalid: this.isInvalid,
          [`label-${this.labelPlacement}`]: true,
          [`justify-${this.justify}`]: this.justify !== undefined,
          [`align-${this.alignment}`]: this.alignment !== undefined,
        }}
        onClick={this.onClick}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        <div part="container" class="radio-wrapper">
          <div part="mark" class="radio-icon">
            <div class="radio-inner"></div>
          </div>

          <div
            part="label"
            class={{
              'label-wrapper': true,
              'hidden': !this.hasLabel,
            }}
          >
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}

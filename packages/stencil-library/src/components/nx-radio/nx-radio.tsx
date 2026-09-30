import { Component, Element, Event, EventEmitter, Host, Method, Prop, State, Watch, h } from '@stencil/core';

@Component({
  tag: 'nx-radio',
  styleUrl: 'nx-radio.scss',
  shadow: true,
})
export class NxRadio {
  private radioGroup?: HTMLNxRadioButtonsElement;

  @Element() el!: HTMLNxRadioElement;

  @Prop() value: any;

  @Prop() disabled = false;

  @Prop() color?: string;

  @Prop()
  labelPlacement: 'start' | 'end' | 'fixed' | 'stacked' = 'start';

  @Prop()
  justify?: 'start' | 'end' | 'space-between';

  @Prop()
  alignment?: 'start' | 'center';

  @State() checked = false;

  @State() buttonTabindex = -1;

  @Event() bflFocus!: EventEmitter<void>;

  @Event() bflBlur!: EventEmitter<void>;

  connectedCallback() {
    this.radioGroup = this.el.closest('nx-radio-buttons') as HTMLNxRadioButtonsElement;

    this.updateState();

    this.radioGroup?.addEventListener(
      'bflValueChange',
      this.updateState
    );
  }

  disconnectedCallback() {
    this.radioGroup?.removeEventListener(
      'bflValueChange',
      this.updateState
    );
  }

  @Watch('value')
  valueChanged() {
    this.updateState();
  }

  private updateState = () => {
    if (!this.radioGroup) {
      return;
    }

    const compareWith = this.radioGroup.compareWith;

    if (typeof compareWith === 'function') {
      this.checked = compareWith(
        this.radioGroup.value,
        this.value
      );
      return;
    }

    if (
      typeof compareWith === 'string' &&
      this.radioGroup.value &&
      this.value
    ) {
      this.checked =
        this.radioGroup.value[compareWith] ===
        this.value[compareWith];
      return;
    }

    this.checked = this.radioGroup.value === this.value;
  };

  private onClick = () => {
    if (this.disabled) {
      return;
    }

    if (
      this.checked &&
      this.radioGroup?.allowEmptySelection
    ) {
      this.checked = false;
    } else {
      this.checked = true;
    }
  };

  private onFocus = () => {
    this.bflFocus.emit();
  };

  private onBlur = () => {
    this.bflBlur.emit();
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
    return this.el.textContent?.trim().length > 0;
  }

  render() {
    return (
      <Host
        role="radio"
        tabindex={this.buttonTabindex}
        aria-checked={this.checked}
        aria-disabled={this.disabled}
        class={{
          checked: this.checked,
          disabled: this.disabled,
          [`label-${this.labelPlacement}`]: true,
          [`justify-${this.justify}`]:
            this.justify !== undefined,
          [`align-${this.alignment}`]:
            this.alignment !== undefined,
        }}
        onClick={this.onClick}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        <label class="radio-wrapper">
          <div
            class={{
              'label-wrapper': true,
              hidden: !this.hasLabel,
            }}
          >
            <slot />
          </div>

          <div class="radio-icon">
            <div class="radio-inner"></div>
          </div>
        </label>
      </Host>
    );
  }
}

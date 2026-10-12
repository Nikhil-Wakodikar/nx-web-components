import { Component, Element, Event, EventEmitter, Host, Listen, Method, Prop, Watch, h } from '@stencil/core';

export interface NxRadioGroupChangeEventDetail {
  value: any;
}

export interface NxRadioGroupValueChangeEventDetail {
  value: any;
}

export interface NxRadioGroupCustomEvent<T = NxRadioGroupChangeEventDetail>
  extends CustomEvent<T> {
  detail: T;
  target: HTMLElement;
}

@Component({
  tag: 'nx-radio-group',
  styleUrl: 'nx-radio-group.scss',
  shadow: true,
})
export class NxRadioGroup {
  @Element() el!: HTMLElement;

  @Prop({ mutable: true }) value?: any;

  @Prop() name = `nx-radio-group-${radioGroupIds++}`;

  @Prop() label?: string;

  @Prop() required = false;

  @Prop({ reflect: true }) disabled = false;

  @Prop({ reflect: true }) direction: 'horizontal' | 'vertical' = 'horizontal';

  @Prop() helperText?: string;

  @Prop() errorText?: string;

  @Prop() allowEmptySelection = false;

  @Prop() compareWith?: string | ((a: any, b: any) => boolean);

  @Prop({ reflect: true }) invalid = false;

  @Event({ bubbles: true, composed: true })
  nxChange!: EventEmitter<NxRadioGroupChangeEventDetail>;

  @Event({ bubbles: true, composed: true })
  nxValueChange!: EventEmitter<NxRadioGroupValueChangeEventDetail>;

  private labelId = `${this.name}-label`;
  private helperTextId = `${this.name}-helper`;
  private errorTextId = `${this.name}-error`;

  @Watch('value')
  valueChanged(value: any) {
    this.setRadioTabindex(value);
    this.nxValueChange.emit({ value });
  }

  @Watch('disabled')
  @Watch('invalid')
  stateChanged() {
    this.setRadioTabindex(this.value);
    this.nxValueChange.emit({ value: this.value });
  }

  componentDidLoad() {
    this.valueChanged(this.value);
  }

  private get hintId() {
    if (this.invalid && this.errorText) {
      return this.errorTextId;
    }

    if (this.helperText) {
      return this.helperTextId;
    }

    return undefined;
  }

  private getRadios(): HTMLNxRadioElement[] {
    return Array.from(this.el.querySelectorAll('nx-radio'));
  }

  private isRadioMatch(radio: HTMLNxRadioElement, value: any): boolean {
    if (typeof this.compareWith === 'function') {
      return this.compareWith(value, radio.value);
    }
    if (typeof this.compareWith === 'string' && value && radio.value) {
      return value[this.compareWith] === radio.value[this.compareWith];
    }
    return radio.value === value;
  }

  private setRadioTabindex(value: any) {
    const allRadios = this.getRadios();
    if (this.disabled) {
      allRadios.forEach(radio => radio.setButtonTabindex(-1));
      return;
    }

    const enabledRadios = allRadios.filter(r => !r.disabled);
    const checked = enabledRadios.find(r => this.isRadioMatch(r, value));
    const focusable = checked || enabledRadios[0];

    allRadios.forEach(radio => {
      radio.setButtonTabindex(radio === focusable ? 0 : -1);
    });
  }

  private emitValueChange() {
    this.nxChange.emit({
      value: this.value,
    });
  }

  private onSlotChange = () => {
    this.setRadioTabindex(this.value);
    this.nxValueChange.emit({ value: this.value });
  };

  private onClick = (ev: Event) => {
    if (this.disabled) {
      return;
    }

    const radio = (ev.target as HTMLElement).closest('nx-radio') as HTMLNxRadioElement | null;

    if (!radio || radio.disabled) {
      return;
    }

    const isMatched = this.isRadioMatch(radio, this.value);

    if (!isMatched) {
      this.value = radio.value;
      this.emitValueChange();
    } else if (this.allowEmptySelection) {
      this.value = undefined;
      this.emitValueChange();
    }
  };

  @Listen('keydown')
  onKeydown(ev: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    const radios = this.getRadios().filter(r => !r.disabled);
    if (!radios.length) {
      return;
    }

    const targetRadio = (ev.target as HTMLElement)?.closest('nx-radio') as HTMLNxRadioElement | null;
    const currentIndex = radios.findIndex(r => r === targetRadio);

    if (currentIndex === -1) {
      return;
    }

    let next: HTMLNxRadioElement | undefined;

    switch (ev.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = radios[(currentIndex + 1) % radios.length];
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        next = radios[(currentIndex - 1 + radios.length) % radios.length];
        break;

      case ' ':
      case 'Spacebar': {
        const currentRadio = radios[currentIndex];
        const isMatched = this.isRadioMatch(currentRadio, this.value);
        this.value = this.allowEmptySelection && isMatched ? undefined : currentRadio.value;
        this.emitValueChange();
        ev.preventDefault();
        return;
      }
    }

    if (next) {
      next.setFocus();
      this.value = next.value;
      this.emitValueChange();
      ev.preventDefault();
    }
  }

  @Method()
  async setFocus() {
    const radio = this.getRadios().find(r => r.tabIndex === 0);
    await radio?.setFocus();
  }

  private renderHintText() {
    const showError = this.invalid && Boolean(this.errorText);
    const showHelper = !showError && Boolean(this.helperText);

    if (!showError && !showHelper) {
      return null;
    }

    return (
      <div part="footer" class="hint-wrapper">
        {showHelper && (
          <div id={this.helperTextId} part="helper-text" class="helper-text">
            {this.helperText}
          </div>
        )}

        {showError && (
          <div id={this.errorTextId} part="error-text" class="error-text" role="alert">
            {this.errorText}
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <Host
        role="radiogroup"
        aria-labelledby={this.label ? this.labelId : undefined}
        aria-invalid={this.invalid ? 'true' : 'false'}
        aria-describedby={this.hintId}
        class={{
          'disabled': this.disabled,
          'invalid': this.invalid,
          [`direction-${this.direction}`]: true,
        }}
        onClick={this.onClick}
      >
        {this.label && (
          <div part="label" class="group-label" id={this.labelId}>
            {this.label}
            {this.required && <span class="required">*</span>}
          </div>
        )}

        <div part="container" class="radio-buttons-container">
          <slot onSlotchange={this.onSlotChange} />
        </div>

        {this.renderHintText()}
      </Host>
    );
  }
}

let radioGroupIds = 0;

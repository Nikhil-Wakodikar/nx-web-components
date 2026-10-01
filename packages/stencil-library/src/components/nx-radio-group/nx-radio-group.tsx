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

  @Prop() name = `nx-radio-group-${Date.now()}`;

  @Prop() disabled = false;

  @Prop() helperText?: string;

  @Prop() errorText?: string;

  @Prop() allowEmptySelection = false;

  @Prop() compareWith?: string | ((a: any, b: any) => boolean);

  @Prop() invalid = false;

  @Event()
  nxChange!: EventEmitter<NxRadioGroupChangeEventDetail>;

  @Event()
  nxValueChange!: EventEmitter<NxRadioGroupValueChangeEventDetail>;

  private helperTextId = `${this.name}-helper`;

  private errorTextId = `${this.name}-error`;

  @Watch('value')
  valueChanged(value: any) {
    this.setRadioTabindex(value);

    this.nxValueChange.emit({
      value,
    });
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

  private setRadioTabindex(value: any) {
    const radios = this.getRadios().filter(r => !r.disabled);

    const checked = radios.find(r => r.value === value);
    const first = radios[0];

    const focusable = checked || first;

    radios.forEach(radio => {
      radio.setButtonTabindex(radio === focusable ? 0 : -1);
    });
  }


  private emitValueChange() {
    this.nxChange.emit({
      value: this.value,
    });
  }

  private onClick = (ev: Event) => {
    const radio = (ev.target as HTMLElement).closest(
      'nx-radio'
    ) as HTMLNxRadioElement;

    if (!radio || radio.disabled) {
      return;
    }

    const current = this.value;

    if (radio.value !== current) {
      this.value = radio.value;
      this.emitValueChange();
    } else if (this.allowEmptySelection) {
      this.value = undefined;
      this.emitValueChange();
    }
  };

  @Listen('keydown')
  onKeydown(ev: KeyboardEvent) {
    const radios = this.getRadios().filter(r => !r.disabled);

    const currentIndex = radios.findIndex(
      r => r === ev.target
    );

    if (currentIndex === -1) {
      return;
    }

    let next: HTMLNxRadioElement | undefined;

    switch (ev.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next =
          radios[(currentIndex + 1) % radios.length];
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        next =
          radios[
          (currentIndex - 1 + radios.length) %
          radios.length
          ];
        break;

      case ' ':
      case 'Spacebar':
        this.value =
          this.allowEmptySelection &&
            this.value === radios[currentIndex].value
            ? undefined
            : radios[currentIndex].value;

        this.emitValueChange();
        ev.preventDefault();
        return;
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
    const radio = this.getRadios().find(
      r => r.tabIndex === 0
    );

    radio?.setFocus();
  }

  private renderHintText() {
    return (
      <div class="hint-wrapper">
        {this.helperText && !this.invalid && (
          <div
            id={this.helperTextId}
            class="helper-text"
          >
            {this.helperText}
          </div>
        )}

        {this.errorText && this.invalid && (
          <div
            id={this.errorTextId}
            class="error-text"
            role="alert"
          >
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
        aria-invalid={this.invalid ? 'true' : 'false'}
        aria-describedby={this.hintId}
        onClick={this.onClick}
      >
        {this.renderHintText()}

        <div class="radio-buttons-container">
          <slot />
        </div>
      </Host>
    );
  }
}

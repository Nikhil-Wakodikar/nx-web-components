import { Component, Element, Host, Prop, Watch, h } from '@stencil/core';

@Component({
  tag: 'nx-button',
  styleUrl: 'nx-button.scss',
  shadow: true,
})
export class NxButton {
  @Element() el!: HTMLElement;

  private formButtonEl: HTMLButtonElement | null = null;
  private formEl: HTMLFormElement | null = null;

  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  @Prop({ reflect: true }) disabled = false;

  @Prop({ reflect: true }) expand?: 'block' | 'full';

  @Prop({ reflect: true }) shape?: 'round';

  @Prop({ reflect: true }) fill: 'clear' | 'outline' | 'solid' = 'solid';

  @Watch('disabled')
  disabledChanged() {
    if (this.formButtonEl) {
      this.formButtonEl.disabled = this.disabled;
    }
  }

  private findForm(): HTMLFormElement | null {
    return this.el.closest('form');
  }

  private renderHiddenButton() {
    this.formEl = this.findForm();

    if (!this.formEl) {
      return;
    }

    if (this.formButtonEl && this.formEl.contains(this.formButtonEl)) {
      this.formButtonEl.type = this.type;
      this.formButtonEl.disabled = this.disabled;
      return;
    }

    this.formButtonEl = document.createElement('button');
    this.formButtonEl.type = this.type;
    this.formButtonEl.disabled = this.disabled;
    this.formButtonEl.style.display = 'none';

    this.formEl.appendChild(this.formButtonEl);
  }

  private submitForm(ev: MouseEvent) {
    if (!this.formButtonEl) {
      return;
    }

    ev.preventDefault();
    this.formButtonEl.click();
  }

  private handleClick = (ev: MouseEvent) => {
    if (this.disabled) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      return;
    }

    if (this.type !== 'button') {
      this.submitForm(ev);
    }
  };

  componentDidLoad() {
    if (this.type !== 'button') {
      this.renderHiddenButton();
    }
  }

  componentDidUpdate() {
    if (this.type !== 'button') {
      this.renderHiddenButton();
    }
  }

  disconnectedCallback() {
    if (this.formButtonEl?.parentNode) {
      this.formButtonEl.parentNode.removeChild(this.formButtonEl);
    }
  }

  render() {
    return (
      <Host onClick={this.handleClick}
        class={{
          'button': true,
          [`button-${this.expand}`]: this.expand !== undefined,
          [`button-${this.shape}`]: this.shape !== undefined,
          [`button-${this.fill}`]: true,
          'button-disabled': this.disabled,
        }}>
        <button class="button-native" type={this.type} disabled={this.disabled}>
          <span class="button-inner">
            <slot name="start"></slot>
            <slot></slot>
            <slot name="end"></slot>
          </span>
        </button>
      </Host>
    );
  }
}

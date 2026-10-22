import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  Watch,
  h,
} from '@stencil/core';

export type NxButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'error'
  | 'info'
  | 'light'
  | 'medium'
  | 'dark'
  | string;

export type NxButtonFill = 'solid' | 'outline' | 'clear';
export type NxButtonSize = 'small' | 'default' | 'medium' | 'large' | 'sm' | 'md' | 'lg';
export type NxButtonShape = 'round' | 'pill' | 'square';
export type NxButtonExpand = 'block' | 'full';

const PRESET_COLORS = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'error',
  'info',
  'light',
  'medium',
  'dark',
];

@Component({
  tag: 'nx-button',
  styleUrl: 'nx-button.scss',
  shadow: true,
})
export class NxButton {
  @Element() el!: HTMLElement;

  private nativeButton?: HTMLButtonElement;
  private formButtonEl: HTMLButtonElement | null = null;
  private formEl: HTMLFormElement | null = null;

  /** HTML button type */
  @Prop({ reflect: true }) type: 'button' | 'submit' | 'reset' = 'button';

  /** Whether the button is disabled */
  @Prop({ reflect: true }) disabled = false;

  /** Color theme ('primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'medium', 'dark') or custom CSS color string */
  @Prop({ reflect: true }) color?: NxButtonColor;

  /** Width expansion behavior ('block' or 'full') */
  @Prop({ reflect: true }) expand?: NxButtonExpand;

  /** Corner shape ('round' / 'pill' or 'square') */
  @Prop({ reflect: true }) shape?: NxButtonShape;

  /** Fill style variant ('solid', 'outline', 'clear') */
  @Prop({ reflect: true }) fill: NxButtonFill = 'solid';

  /** Visual variant alias for fill ('solid', 'outline', 'clear', 'ghost', 'text') */
  @Prop({ reflect: true }) variant?: 'solid' | 'outline' | 'clear' | 'ghost' | 'text';

  /** Size of the button ('small', 'default', 'large', or 'sm', 'md', 'lg') */
  @Prop({ reflect: true }) size: NxButtonSize = 'default';

  /** The ID of the form that the button belongs to */
  @Prop({ reflect: true }) form?: string;

  /** The name of the button submitted with form data */
  @Prop({ reflect: true }) name?: string;

  /** The value of the button submitted with form data */
  @Prop({ reflect: true }) value?: string;

  /** Emitted when the button gains focus */
  @Event({ bubbles: true, composed: true }) nxFocus!: EventEmitter<FocusEvent>;

  /** Emitted when the button loses focus */
  @Event({ bubbles: true, composed: true }) nxBlur!: EventEmitter<FocusEvent>;

  private get isDisabled(): boolean {
    return this.disabled || (this.disabled as any) === '' || (this.disabled as any) === 'true';
  }

  private get normalizedFill(): 'solid' | 'outline' | 'clear' {
    const v = this.variant || this.fill;
    if (v === 'ghost' || v === 'text') return 'clear';
    if (v === 'outline') return 'outline';
    if (v === 'clear') return 'clear';
    return 'solid';
  }

  private get normalizedSize(): 'small' | 'default' | 'large' {
    const s = this.size;
    if (s === 'sm' || s === 'small') return 'small';
    if (s === 'lg' || s === 'large') return 'large';
    return 'default';
  }

  private get normalizedShape(): 'round' | 'square' | undefined {
    if (this.shape === 'round' || this.shape === 'pill' || (this.shape as any) === '') return 'round';
    if (this.shape === 'square') return 'square';
    return undefined;
  }

  private get normalizedExpand(): 'block' | 'full' | undefined {
    if (this.expand === 'full') return 'full';
    if (this.expand === 'block' || (this.expand as any) === '' || (this.expand as any) === true) return 'block';
    return undefined;
  }

  @Watch('disabled')
  disabledChanged() {
    this.syncHiddenButton();
  }

  @Watch('type')
  typeChanged() {
    if (this.type !== 'button') {
      this.renderHiddenButton();
    } else if (this.formButtonEl?.parentNode) {
      this.formButtonEl.parentNode.removeChild(this.formButtonEl);
      this.formButtonEl = null;
    }
  }

  @Watch('name')
  @Watch('value')
  formValuesChanged() {
    this.syncHiddenButton();
  }

  private syncHiddenButton() {
    if (this.formButtonEl) {
      this.formButtonEl.type = this.type;
      this.formButtonEl.disabled = this.isDisabled;
      if (this.name) this.formButtonEl.name = this.name;
      else this.formButtonEl.removeAttribute('name');
      if (this.value) this.formButtonEl.value = this.value;
      else this.formButtonEl.removeAttribute('value');
    }
  }

  private findForm(): HTMLFormElement | null {
    if (this.form) {
      const root = this.el.getRootNode() as Document | ShadowRoot;
      const found = root?.getElementById ? (root.getElementById(this.form) as HTMLFormElement) : null;
      if (found) return found;
      return document.getElementById(this.form) as HTMLFormElement;
    }
    return this.el.closest('form');
  }

  private renderHiddenButton() {
    this.formEl = this.findForm();

    if (!this.formEl) {
      return;
    }

    if (this.formButtonEl && this.formEl.contains(this.formButtonEl)) {
      this.syncHiddenButton();
      return;
    }

    this.formButtonEl = document.createElement('button');
    this.formButtonEl.type = this.type;
    this.formButtonEl.style.display = 'none';
    this.syncHiddenButton();

    this.formEl.appendChild(this.formButtonEl);
  }

  private submitForm(ev: MouseEvent) {
    if (!this.formEl) {
      this.formEl = this.findForm();
    }
    if (!this.formEl) {
      return;
    }
    if (!this.formButtonEl) {
      this.renderHiddenButton();
    }
    if (!this.formButtonEl) {
      return;
    }

    ev.preventDefault();
    this.formButtonEl.click();
  }

  private handleClick = (ev: MouseEvent) => {
    if (this.isDisabled) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      return;
    }

    if (this.type !== 'button') {
      this.submitForm(ev);
    }
  };

  private handleFocus = (ev: FocusEvent) => {
    this.nxFocus.emit(ev);
  };

  private handleBlur = (ev: FocusEvent) => {
    this.nxBlur.emit(ev);
  };

  /** Sets focus on native button */
  @Method()
  async setFocus() {
    this.nativeButton?.focus();
  }

  /** Removes focus from native button */
  @Method()
  async setBlur() {
    this.nativeButton?.blur();
  }

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
      this.formButtonEl = null;
    }
  }

  render() {
    const fillStyle = this.normalizedFill;
    const sizeStyle = this.normalizedSize;
    const shapeStyle = this.normalizedShape;
    const expandStyle = this.normalizedExpand;
    const disabled = this.isDisabled;

    const hostStyles: Record<string, string> = {};
    let isPresetColor = false;
    let colorClass = '';

    if (this.color) {
      const lower = this.color.toLowerCase();
      if (PRESET_COLORS.includes(lower)) {
        isPresetColor = true;
        colorClass = `color-${lower === 'error' ? 'danger' : lower}`;
      } else {
        hostStyles['--background'] = this.color;
        hostStyles['--background-hover'] = `color-mix(in srgb, ${this.color} 85%, black)`;
        hostStyles['--background-activated'] = `color-mix(in srgb, ${this.color} 70%, black)`;
        hostStyles['--background-focused'] = `color-mix(in srgb, ${this.color} 85%, black)`;
        hostStyles['--color'] = '#ffffff';
        hostStyles['--color-hover'] = '#ffffff';
        hostStyles['--color-activated'] = '#ffffff';
        hostStyles['--color-focused'] = '#ffffff';
      }
    }

    return (
      <Host
        onClick={this.handleClick}
        style={hostStyles}
        class={{
          'button': true,
          [`button-${expandStyle}`]: expandStyle !== undefined,
          [`button-${shapeStyle}`]: shapeStyle !== undefined,
          [`button-${sizeStyle}`]: true,
          [`button-${fillStyle}`]: true,
          'button-disabled': disabled,
          [colorClass]: isPresetColor,
        }}
      >
        <button
          ref={el => (this.nativeButton = el as HTMLButtonElement)}
          part="native"
          class="button-native"
          type={this.type}
          disabled={disabled}
          aria-disabled={disabled ? 'true' : null}
          tabindex={disabled ? -1 : 0}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        >
          <span part="inner" class="button-inner">
            <slot name="start"></slot>
            <slot></slot>
            <slot name="end"></slot>
          </span>
        </button>
      </Host>
    );
  }
}

import {
  Component,
  Element,
  Host,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';

export type NxDividerOrientation = 'horizontal' | 'vertical';
export type NxDividerVariant = 'solid' | 'dashed' | 'dotted';
export type NxDividerAlign = 'start' | 'center' | 'end' | 'left' | 'right';
export type NxDividerColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'error'
  | 'info'
  | 'light'
  | 'muted'
  | 'dark'
  | string;
export type NxDividerSpacing =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | string
  | number;
export type NxDividerThickness =
  | 'hairline'
  | 'thin'
  | 'medium'
  | 'thick'
  | string
  | number;

const COLOR_MAP: Record<string, string> = {
  default: 'var(--nx-color-gray-200, #e2e8f0)',
  primary: 'var(--nx-color-primary, #8145b5)',
  secondary: 'var(--nx-color-secondary, #475569)',
  success: 'var(--nx-color-success, #16a34a)',
  warning: 'var(--nx-color-warning, #d97706)',
  danger: 'var(--nx-color-error, #dc2626)',
  error: 'var(--nx-color-error, #dc2626)',
  info: 'var(--nx-color-info, #2563eb)',
  light: 'var(--nx-color-gray-100, #f1f5f9)',
  muted: 'var(--nx-color-gray-400, #94a3b8)',
  dark: 'var(--nx-color-gray-900, #0f172a)',
};

const SPACING_MAP: Record<string, string> = {
  none: '0px',
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
};

const THICKNESS_MAP: Record<string, string> = {
  hairline: '1px',
  thin: '1px',
  sm: '1px',
  medium: '2px',
  md: '2px',
  thick: '4px',
  lg: '4px',
};

@Component({
  tag: 'nx-divider',
  styleUrl: 'nx-divider.scss',
  shadow: true,
})
export class NxDivider {
  @Element() el!: HTMLElement;

  /** Orientation of the divider: 'horizontal' or 'vertical' */
  @Prop({ reflect: true }) orientation: NxDividerOrientation = 'horizontal';

  /** Visual style: 'solid', 'dashed', or 'dotted' */
  @Prop({ reflect: true }) variant: NxDividerVariant = 'solid';

  /** Shorthand for variant="dashed" */
  @Prop({ reflect: true }) dashed = false;

  /** Shorthand for variant="dotted" */
  @Prop({ reflect: true }) dotted = false;

  /** Color token ('default', 'primary', 'secondary', etc.) or custom CSS color string */
  @Prop({ reflect: true }) color: NxDividerColor = 'default';

  /** Line thickness: 'hairline', 'thin', 'medium', 'thick' or custom value */
  @Prop({ reflect: true }) thickness: NxDividerThickness = 'thin';

  /** Spacing around the divider: 'none', 'xs', 'sm', 'md', 'lg', 'xl' or custom CSS value */
  @Prop({ reflect: true }) spacing: NxDividerSpacing = 'md';

  /** Content alignment when label or slotted content is present: 'start', 'center', 'end' */
  @Prop({ reflect: true }) align: NxDividerAlign = 'center';

  /** When true, indents the divider from the container edges */
  @Prop({ reflect: true }) inset = false;

  /** Optional text label to display on the divider */
  @Prop({ reflect: true }) label?: string;

  @State() hasContent = false;

  connectedCallback() {
    this.checkContent();
  }

  componentWillLoad() {
    this.checkContent();
  }

  componentDidLoad() {
    this.checkContent();
  }

  @Watch('label')
  onLabelChange() {
    this.checkContent();
  }

  private handleSlotChange = () => {
    this.checkContent();
  };

  private checkContent = () => {
    if (this.label && this.label.trim().length > 0) {
      this.hasContent = true;
      return;
    }

    const childNodes = Array.from(this.el.childNodes);
    const hasSlotted = childNodes.some((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return (node.textContent || '').trim().length > 0;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        return true;
      }
      return false;
    });

    this.hasContent = hasSlotted;
  };

  private resolveColor(): string {
    if (!this.color) return COLOR_MAP.default;
    return COLOR_MAP[this.color] || this.color;
  }

  private resolveThickness(): string {
    if (this.thickness === undefined || this.thickness === null) {
      return THICKNESS_MAP.thin;
    }
    if (typeof this.thickness === 'number') {
      return `${this.thickness}px`;
    }
    return THICKNESS_MAP[this.thickness] || this.thickness;
  }

  private resolveSpacing(): string {
    if (this.spacing === undefined || this.spacing === null) {
      return SPACING_MAP.md;
    }
    if (typeof this.spacing === 'number') {
      return `${this.spacing}px`;
    }
    return SPACING_MAP[this.spacing] || this.spacing;
  }

  private get effectiveVariant(): NxDividerVariant {
    if (this.dashed) return 'dashed';
    if (this.dotted) return 'dotted';
    return this.variant || 'solid';
  }

  private get normalizedAlign(): 'start' | 'center' | 'end' {
    if (this.align === 'left') return 'start';
    if (this.align === 'right') return 'end';
    return this.align || 'center';
  }

  render() {
    const isHorizontal = this.orientation !== 'vertical';

    return (
      <Host
        role="separator"
        aria-orientation={this.orientation}
        class={{
          'is-horizontal': isHorizontal,
          'is-vertical': !isHorizontal,
          'is-inset': this.inset,
          'has-content': this.hasContent,
        }}
        style={{
          '--nx-divider-color': this.resolveColor(),
          '--nx-divider-thickness': this.resolveThickness(),
          '--nx-divider-spacing': this.resolveSpacing(),
          '--nx-divider-style': this.effectiveVariant,
        }}
      >
        {this.hasContent ? (
          <div
            class={{
              divider: true,
              'divider--horizontal': isHorizontal,
              'divider--vertical': !isHorizontal,
              'divider--with-label': true,
              [`align-${this.normalizedAlign}`]: true,
            }}
            part="divider"
          >
            <div
              class="divider-line divider-line--start"
              part="line line-start"
            ></div>
            <span class="divider-label" part="label">
              <slot onSlotchange={this.handleSlotChange}>{this.label}</slot>
            </span>
            <div
              class="divider-line divider-line--end"
              part="line line-end"
            ></div>
          </div>
        ) : (
          <div
            class={{
              divider: true,
              'divider--horizontal': isHorizontal,
              'divider--vertical': !isHorizontal,
            }}
            part="divider line"
          >
            <slot onSlotchange={this.handleSlotChange}></slot>
          </div>
        )}
      </Host>
    );
  }
}


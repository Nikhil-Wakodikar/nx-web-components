import { Component, Host, Prop, h } from '@stencil/core';

export type NxTextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'overline'
  | 'label';

export type NxTextTag =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div'
  | 'label'
  | 'strong'
  | 'em'
  | 'small';

const colorTokens: Record<string, string> = {
  primary: 'var(--nx-color-primary, #8145b5)',
  secondary: 'var(--nx-color-secondary, #475569)',
  success: 'var(--nx-color-success, #16a34a)',
  warning: 'var(--nx-color-warning, #d97706)',
  danger: 'var(--nx-color-error, #dc2626)',
  error: 'var(--nx-color-error, #dc2626)',
  info: 'var(--nx-color-info, #2563eb)',
  light: 'var(--nx-color-white, #ffffff)',
  medium: 'var(--nx-color-gray-500, #64748b)',
  muted: 'var(--nx-color-gray-500, #64748b)',
  dark: 'var(--nx-color-gray-900, #0f172a)',
};

const sizeTokens: Record<string, string> = {
  'xs': 'var(--nx-font-size-xs, 12px)',
  'sm': 'var(--nx-font-size-sm, 14px)',
  'small': 'var(--nx-font-size-sm, 14px)',
  'md': 'var(--nx-font-size-md, 16px)',
  'default': 'var(--nx-font-size-md, 16px)',
  'medium': 'var(--nx-font-size-md, 16px)',
  'lg': 'var(--nx-font-size-lg, 18px)',
  'large': 'var(--nx-font-size-lg, 18px)',
  'xl': 'var(--nx-font-size-xl, 20px)',
  '2xl': 'var(--nx-font-size-2xl, 24px)',
  '3xl': 'var(--nx-font-size-3xl, 30px)',
};

const variantTagMap: Record<NxTextVariant, NxTextTag> = {
  'h1': 'h1',
  'h2': 'h2',
  'h3': 'h3',
  'h4': 'h4',
  'h5': 'h5',
  'h6': 'h6',
  'subtitle1': 'p',
  'subtitle2': 'p',
  'body': 'p',
  'body-sm': 'p',
  'caption': 'span',
  'overline': 'span',
  'label': 'label',
};

const inlineTags = new Set<NxTextTag>(['span', 'label', 'strong', 'em', 'small']);

@Component({
  tag: 'nx-text',
  styleUrl: 'nx-text.scss',
  shadow: true,
})
export class NxText {
  @Prop({ reflect: true }) variant: NxTextVariant = 'body';

  @Prop() as?: NxTextTag;

  @Prop({ reflect: true }) size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'small' | 'default' | 'medium' | 'large' | string | number;

  @Prop({ reflect: true }) weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

  @Prop({ reflect: true }) color?: string;

  @Prop({ reflect: true }) align?: 'left' | 'center' | 'right' | 'justify';

  @Prop({ reflect: true }) transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';

  @Prop({ reflect: true }) italic = false;

  @Prop({ reflect: true }) underline = false;

  @Prop({ reflect: true }) strikethrough = false;

  @Prop({ reflect: true }) truncate = false;

  @Prop() lines?: number;

  @Prop({ reflect: true }) inline = false;

  private get resolvedTag(): NxTextTag {
    return this.as || variantTagMap[this.variant] || 'p';
  }

  private get cssSize(): string | undefined {
    if (this.size === undefined || this.size === null || this.size === '') return undefined;
    if (typeof this.size === 'number') return `${this.size}px`;
    const normalized = this.size.toString().trim();
    if (sizeTokens[normalized.toLowerCase()]) {
      return sizeTokens[normalized.toLowerCase()];
    }
    if (/^\d+(\.\d+)?$/.test(normalized)) return `${normalized}px`;
    return normalized;
  }

  private get cssColor(): string | undefined {
    if (!this.color) return undefined;
    return colorTokens[this.color.toLowerCase()] || this.color;
  }

  render() {
    const Tag = this.resolvedTag;
    const isInline = this.inline || inlineTags.has(Tag);
    const hasLineClamp = typeof this.lines === 'number' && this.lines > 0;

    const hostStyles: Record<string, string> = {};
    if (this.cssColor) {
      hostStyles['--color'] = this.cssColor;
    }
    if (this.cssSize) {
      hostStyles['--font-size'] = this.cssSize;
    }
    if (this.align) {
      hostStyles['--text-align'] = this.align;
    }
    if (this.transform) {
      hostStyles['--text-transform'] = this.transform;
    }
    if (hasLineClamp) {
      hostStyles['--line-clamp'] = this.lines!.toString();
    }

    return (
      <Host
        style={hostStyles}
        class={{
          'text': true,
          [`text-${this.variant}`]: true,
          [`text-weight-${this.weight}`]: Boolean(this.weight),
          'text-inline': isInline,
          'text-italic': this.italic,
          'text-underline': this.underline,
          'text-strikethrough': this.strikethrough,
          'text-truncate': this.truncate,
          'text-line-clamp': hasLineClamp,
        }}
      >
        <Tag part="text" class="text-native">
          <slot></slot>
        </Tag>
      </Host>
    );
  }
}


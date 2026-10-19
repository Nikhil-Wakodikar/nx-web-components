import { Component, Element, Host, Prop, h } from '@stencil/core';

export type NxBadgeVariant = 'solid' | 'subtle' | 'outline';
export type NxBadgeColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'error'
  | 'info'
  | 'dark'
  | 'light'
  | string;
export type NxBadgeSize = 'sm' | 'md' | 'lg';
export type NxBadgeShape = 'pill' | 'rounded' | 'circle';
export type NxBadgePlacement = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

interface BadgeColorToken {
  bg: string;
  text: string;
  subtleBg: string;
  subtleText?: string;
  border?: string;
}

const COLOR_TOKENS: Record<string, BadgeColorToken> = {
  primary: {
    bg: 'var(--nx-color-primary, #8145b5)',
    text: '#ffffff',
    subtleBg: 'var(--nx-color-purple-100, #f6f0fa)',
    subtleText: 'var(--nx-color-primary, #8145b5)',
    border: 'var(--nx-color-primary, #8145b5)',
  },
  secondary: {
    bg: 'var(--nx-color-secondary, #475569)',
    text: '#ffffff',
    subtleBg: 'var(--nx-color-gray-100, #f1f5f9)',
    subtleText: 'var(--nx-color-secondary, #475569)',
    border: 'var(--nx-color-secondary, #475569)',
  },
  success: {
    bg: 'var(--nx-color-success, #16a34a)',
    text: '#ffffff',
    subtleBg: 'var(--nx-color-green-100, #dcfce7)',
    subtleText: 'var(--nx-color-green-700, #15803d)',
    border: 'var(--nx-color-success, #16a34a)',
  },
  warning: {
    bg: 'var(--nx-color-warning, #d97706)',
    text: '#ffffff',
    subtleBg: 'var(--nx-color-amber-100, #fef3c7)',
    subtleText: 'var(--nx-color-amber-800, #92400e)',
    border: 'var(--nx-color-warning, #d97706)',
  },
  danger: {
    bg: 'var(--nx-color-error, #dc2626)',
    text: '#ffffff',
    subtleBg: 'var(--nx-color-red-100, #fee2e2)',
    subtleText: 'var(--nx-color-red-700, #b91c1c)',
    border: 'var(--nx-color-error, #dc2626)',
  },
  error: {
    bg: 'var(--nx-color-error, #dc2626)',
    text: '#ffffff',
    subtleBg: 'var(--nx-color-red-100, #fee2e2)',
    subtleText: 'var(--nx-color-red-700, #b91c1c)',
    border: 'var(--nx-color-error, #dc2626)',
  },
  info: {
    bg: 'var(--nx-color-info, #2563eb)',
    text: '#ffffff',
    subtleBg: 'var(--nx-color-blue-100, #dbeafe)',
    subtleText: 'var(--nx-color-blue-700, #1d4ed8)',
    border: 'var(--nx-color-info, #2563eb)',
  },
  dark: {
    bg: 'var(--nx-color-gray-900, #0f172a)',
    text: '#ffffff',
    subtleBg: 'var(--nx-color-gray-200, #e2e8f0)',
    subtleText: 'var(--nx-color-gray-900, #0f172a)',
    border: 'var(--nx-color-gray-900, #0f172a)',
  },
  light: {
    bg: 'var(--nx-color-white, #ffffff)',
    text: 'var(--nx-color-gray-800, #1e293b)',
    subtleBg: 'rgba(255, 255, 255, 0.22)',
    subtleText: '#ffffff',
    border: 'var(--nx-color-gray-300, #cbd5e1)',
  },
};

@Component({
  tag: 'nx-badge',
  styleUrl: 'nx-badge.scss',
  shadow: true,
})
export class NxBadge {
  @Element() el!: HTMLElement;

  /** Value/content displayed inside the badge */
  @Prop() value?: string | number;

  /** Maximum numerical count to display. If value > max, displays `${max}+` */
  @Prop() max = 99;

  /** Visual style variant of the badge */
  @Prop({ reflect: true }) variant: NxBadgeVariant = 'solid';

  /** Color theme or custom CSS color string */
  @Prop({ reflect: true }) color: NxBadgeColor = 'primary';

  /** Sizing of the badge */
  @Prop({ reflect: true }) size: NxBadgeSize = 'md';

  /** Shape of the badge corners */
  @Prop({ reflect: true }) shape: NxBadgeShape = 'pill';

  /** When true, renders a small dot badge indicator without text */
  @Prop({ reflect: true }) dot = false;

  /** When true, displays an animated pulsing ring around the badge */
  @Prop({ reflect: true }) pulse = false;

  /** Corner placement when badging / wrapping target content */
  @Prop({ reflect: true }) placement?: NxBadgePlacement;

  private get displayValue(): string | undefined {
    if (this.value === undefined || this.value === null || this.value === '') {
      return undefined;
    }
    const num = Number(this.value);
    if (!isNaN(num) && typeof this.value !== 'boolean') {
      if (this.max !== undefined && this.max > 0 && num > this.max) {
        return `${this.max}+`;
      }
      return `${num}`;
    }
    return String(this.value);
  }

  render() {
    const colorKey = (this.color || 'primary').toLowerCase();
    const token = COLOR_TOKENS[colorKey];
    const isFloating = !!this.placement;

    let badgeBg: string;
    let badgeText: string;
    let badgeBorder: string;
    let pulseColor: string;

    if (token) {
      pulseColor = token.bg;
      if (this.variant === 'subtle') {
        badgeBg = token.subtleBg;
        badgeText = token.subtleText || token.bg;
        badgeBorder = 'transparent';
      } else if (this.variant === 'outline') {
        badgeBg = 'transparent';
        badgeText = colorKey === 'light' ? 'var(--nx-color-gray-700, #334155)' : token.bg;
        badgeBorder = token.border || token.bg;
      } else {
        // solid
        badgeBg = token.bg;
        badgeText = token.text;
        badgeBorder = token.border || 'transparent';
      }
    } else {
      // custom color string
      pulseColor = this.color;
      if (this.variant === 'subtle') {
        badgeBg = `color-mix(in srgb, ${this.color} 15%, transparent)`;
        badgeText = this.color;
        badgeBorder = 'transparent';
      } else if (this.variant === 'outline') {
        badgeBg = 'transparent';
        badgeText = this.color;
        badgeBorder = this.color;
      } else {
        badgeBg = this.color;
        badgeText = '#ffffff';
        badgeBorder = 'transparent';
      }
    }

    const hostStyles: Record<string, string> = {
      '--nx-badge-bg': badgeBg,
      '--nx-badge-text-color': badgeText,
      '--nx-badge-border-color': badgeBorder,
      '--nx-badge-pulse-color': pulseColor,
    };

    const badgeEl = (
      <span
        part="badge"
        class={{
          'badge': true,
          'badge--dot': this.dot,
          'badge--pulse': this.pulse,
          'badge--floating': isFloating,
        }}
        role="status"
        aria-hidden={this.dot ? 'true' : undefined}
      >
        {this.dot ? null : (
          this.displayValue !== undefined ? (
            this.displayValue
          ) : isFloating ? (
            <slot name="badge"></slot>
          ) : (
            <slot></slot>
          )
        )}
        {this.pulse && <span class="badge-pulse-ring" aria-hidden="true"></span>}
      </span>
    );

    return (
      <Host
        style={hostStyles}
        class={{
          [`variant-${this.variant}`]: true,
          [`size-${this.size}`]: true,
          [`shape-${this.shape}`]: true,
          [`color-${colorKey}`]: !!token,
          'is-floating': isFloating,
          [`placement-${this.placement}`]: isFloating,
          'is-dot': this.dot,
          'is-pulse': this.pulse,
        }}
      >
        {isFloating ? (
          <div class="badge-anchor" part="anchor">
            <slot></slot>
            {badgeEl}
          </div>
        ) : (
          badgeEl
        )}
      </Host>
    );
  }
}

import { Component, Host, Prop, h } from '@stencil/core';
import { IconNode, icons } from 'lucide';

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
  dark: 'var(--nx-color-gray-900, #0f172a)',
};

const iconLookup: Record<string, IconNode> = Object.entries(icons).reduce(
  (acc, [key, node]) => {
    acc[key.toLowerCase()] = node;
    return acc;
  },
  {
    arrowback: icons.ArrowLeft,
    arrowforward: icons.ArrowRight,
    checkmark: icons.Check,
    checkmarkcircle: icons.CircleCheck,
    close: icons.X,
    help: icons.CircleHelp,
    person: icons.UserRound,
  } as Record<string, IconNode>,
);

@Component({
  tag: 'nx-icon',
  styleUrl: 'nx-icon.scss',
  shadow: true,
})
export class NxIcon {
  @Prop({ reflect: true }) name?: string;

  @Prop() size: string | number = 'medium';

  @Prop() color?: string;

  @Prop() strokeWidth = 2;

  @Prop() label?: string;

  private get iconNode(): IconNode | undefined {
    if (!this.name) return undefined;

    const normalized = this.name
      .trim()
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .toLowerCase()
      .replace(/-(outline|sharp)$/, '')
      .replace(/[^a-z0-9]/g, '');

    return iconLookup[normalized];
  }

  private get cssSize(): string {
    if (typeof this.size === 'number') return `${this.size}px`;
    const size = this.size?.toString().trim();
    if (!size || size === 'medium' || size === 'default') return '24px';
    if (size === 'small') return '16px';
    if (size === 'large') return '32px';
    if (/^\d+(\.\d+)?$/.test(size)) return `${size}px`;
    return size;
  }

  private get cssColor(): string {
    if (!this.color) return 'currentColor';
    return colorTokens[this.color.toLowerCase()] || this.color;
  }

  render() {
    const icon = this.iconNode;
    const accessibleLabel = this.label?.trim();

    return (
      <Host
        role={accessibleLabel ? 'img' : undefined}
        aria-label={accessibleLabel}
        aria-hidden={accessibleLabel ? undefined : 'true'}
        style={{
          fontSize: this.cssSize,
          color: this.cssColor,
        }}
      >
        {icon ? (
          <svg
            part="svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            fill="none"
            stroke="currentColor"
            stroke-width={this.strokeWidth}
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            {icon.map(([tag, attributes]) => h(tag, attributes))}
          </svg>
        ) : (
          <slot></slot>
        )}
      </Host>
    );
  }
}


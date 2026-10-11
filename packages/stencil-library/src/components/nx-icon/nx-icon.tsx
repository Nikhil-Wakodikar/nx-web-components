import { Component, Host, Prop, h } from '@stencil/core';
import { getIconNode } from './icons/icon-registry';

const colorTokens: Record<string, string> = {
  primary: 'var(--nx-color-primary)',
  secondary: 'var(--nx-color-secondary)',
  success: 'var(--nx-color-success)',
  warning: 'var(--nx-color-warning)',
  danger: 'var(--nx-color-error)',
  error: 'var(--nx-color-error)',
  info: 'var(--nx-color-info)',
  light: 'var(--nx-color-white)',
  medium: 'var(--nx-color-gray-500)',
  dark: 'var(--nx-color-gray-900)',
};

@Component({
  tag: 'nx-icon',
  styleUrl: 'nx-icon.scss',
  shadow: true,
})
export class NxIcon {
  @Prop({ reflect: true }) name = '';
  @Prop() size: string | number = 'medium';
  @Prop() color?: string;
  @Prop() strokeWidth = 2;
  @Prop() label?: string;

  private get iconNode() {
    return getIconNode(this.name);
  }

  private get cssSize(): string {
    if (typeof this.size === 'number') return `${this.size}px`;
    if (this.size === 'small') return '16px';
    if (this.size === 'medium' || this.size === 'default') return '24px';
    if (this.size === 'large') return '32px';
    return this.size;
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
        style={{ fontSize: this.cssSize, color: this.cssColor }}
      >
        {icon && (
          <svg
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
        )}
      </Host>
    );
  }
}
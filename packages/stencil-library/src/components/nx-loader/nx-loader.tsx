import { Component, Host, Prop, h } from '@stencil/core';

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

@Component({
  tag: 'nx-loader',
  styleUrl: 'nx-loader.scss',
  shadow: true,
})
export class NxLoader {
  @Prop({ reflect: true }) variant: 'spinner' | 'dots' | 'pulse' | 'bars' = 'spinner';

  @Prop({ reflect: true }) size: 'small' | 'default' | 'medium' | 'large' | 'xlarge' | string | number = 'default';

  @Prop({ reflect: true }) color?: string;

  @Prop() strokeWidth = 3;

  @Prop() label?: string;

  @Prop({ reflect: true }) labelPlacement: 'end' | 'bottom' | 'start' | 'top' = 'end';

  @Prop({ reflect: true }) overlay = false;

  @Prop({ reflect: true }) fullscreen = false;

  @Prop({ reflect: true }) paused = false;

  private get cssSize(): string {
    if (typeof this.size === 'number') return `${this.size}px`;
    const size = this.size?.toString().trim();
    if (!size || size === 'medium' || size === 'default') return '24px';
    if (size === 'small') return '16px';
    if (size === 'large') return '36px';
    if (size === 'xlarge') return '48px';
    if (/^\d+(\.\d+)?$/.test(size)) return `${size}px`;
    return size;
  }

  private get cssColor(): string | undefined {
    if (!this.color) return undefined;
    return colorTokens[this.color.toLowerCase()] || this.color;
  }

  private renderIndicator() {
    if (this.variant === 'dots') {
      return (
        <span part="indicator" class="loader-dots" aria-hidden="true">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </span>
      );
    }

    if (this.variant === 'bars') {
      return (
        <span part="indicator" class="loader-bars" aria-hidden="true">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </span>
      );
    }

    if (this.variant === 'pulse') {
      return (
        <span part="indicator" class="loader-pulse" aria-hidden="true">
          <span class="ring"></span>
          <span class="ring ring-delayed"></span>
        </span>
      );
    }

    return (
      <svg
        part="indicator"
        class="loader-spinner"
        viewBox="0 0 50 50"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          class="spinner-track"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width={this.strokeWidth}
        />
        <circle
          class="spinner-head"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width={this.strokeWidth}
        />
      </svg>
    );
  }

  render() {
    const accessibleLabel = this.label?.trim() || 'Loading';
    const hostStyles: Record<string, string> = {
      '--size': this.cssSize,
    };

    if (this.cssColor) {
      hostStyles['--color'] = this.cssColor;
    }

    return (
      <Host
        role="status"
        aria-live="polite"
        aria-busy={(!this.paused).toString()}
        aria-label={accessibleLabel}
        style={hostStyles}
        class={{
          'loader': true,
          [`loader-${this.variant}`]: true,
          [`loader-label-${this.labelPlacement}`]: true,
          'loader-overlay': this.overlay,
          'loader-fullscreen': this.fullscreen,
          'loader-paused': this.paused,
        }}
      >
        <div part="container" class="loader-container">
          <slot name="indicator">{this.renderIndicator()}</slot>
          <span part="label" class="loader-label">
            {this.label}
            <slot></slot>
          </span>
        </div>
      </Host>
    );
  }
}


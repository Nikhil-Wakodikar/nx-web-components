import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

const colorTokens: Record<string, { base: string; hover: string; active: string }> = {
  primary: {
    base: 'var(--nx-color-primary, #8145b5)',
    hover: 'var(--nx-color-primary-hover, #6e389c)',
    active: 'var(--nx-color-primary-active, #5b2e81)',
  },
  secondary: {
    base: 'var(--nx-color-secondary, #475569)',
    hover: 'var(--nx-color-gray-700, #334155)',
    active: 'var(--nx-color-gray-800, #1e293b)',
  },
  success: {
    base: 'var(--nx-color-success, #16a34a)',
    hover: 'var(--nx-color-green-700, #15803d)',
    active: 'var(--nx-color-green-800, #166534)',
  },
  warning: {
    base: 'var(--nx-color-warning, #d97706)',
    hover: 'var(--nx-color-amber-700, #b45309)',
    active: 'var(--nx-color-amber-800, #92400e)',
  },
  danger: {
    base: 'var(--nx-color-error, #dc2626)',
    hover: 'var(--nx-color-red-700, #b91c1c)',
    active: 'var(--nx-color-red-800, #991b1b)',
  },
  error: {
    base: 'var(--nx-color-error, #dc2626)',
    hover: 'var(--nx-color-red-700, #b91c1c)',
    active: 'var(--nx-color-red-800, #991b1b)',
  },
  info: {
    base: 'var(--nx-color-info, #2563eb)',
    hover: 'var(--nx-color-blue-700, #1d4ed8)',
    active: 'var(--nx-color-blue-800, #1e40af)',
  },
  dark: {
    base: 'var(--nx-color-gray-900, #0f172a)',
    hover: 'var(--nx-color-gray-700, #334155)',
    active: 'var(--nx-color-black, #000000)',
  },
  medium: {
    base: 'var(--nx-color-gray-500, #64748b)',
    hover: 'var(--nx-color-gray-600, #475569)',
    active: 'var(--nx-color-gray-700, #334155)',
  },
  light: {
    base: 'var(--nx-color-white, #ffffff)',
    hover: 'var(--nx-color-gray-100, #f1f5f9)',
    active: 'var(--nx-color-gray-200, #e2e8f0)',
  },
};

@Component({
  tag: 'nx-link',
  styleUrl: 'nx-link.scss',
  shadow: true,
})
export class NxLink {
  @Prop({ reflect: true }) href?: string;

  @Prop({ reflect: true }) target?: '_self' | '_blank' | '_parent' | '_top' | string;

  @Prop() rel?: string;

  @Prop() download?: string | boolean;

  @Prop({ reflect: true }) underline: 'always' | 'hover' | 'none' = 'hover';

  @Prop({ reflect: true }) size: 'small' | 'default' | 'medium' | 'large' = 'default';

  @Prop({ reflect: true }) color?: string;

  @Prop({ reflect: true }) disabled = false;

  @Prop({ reflect: true }) external = false;

  @Prop() label?: string;

  @Event({ bubbles: true, composed: true }) nxClick!: EventEmitter<MouseEvent>;

  private get resolvedTarget(): string | undefined {
    if (this.target) return this.target;
    if (this.external) return '_blank';
    return undefined;
  }

  private get resolvedRel(): string | undefined {
    if (this.rel) return this.rel;
    if (this.resolvedTarget === '_blank') return 'noopener noreferrer';
    return undefined;
  }

  private get resolvedDownload(): string | undefined {
    if (this.download === undefined || this.download === false) return undefined;
    if (this.download === true) return '';
    return this.download;
  }

  private get colorStyles(): Record<string, string> | undefined {
    if (!this.color) return undefined;
    const token = colorTokens[this.color.toLowerCase()];
    if (token) {
      return {
        '--color': token.base,
        '--color-hover': token.hover,
        '--color-active': token.active,
      };
    }
    return {
      '--color': this.color,
      '--color-hover': this.color,
      '--color-active': this.color,
    };
  }

  private handleClick = (ev: MouseEvent) => {
    if (this.disabled) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      return;
    }

    this.nxClick.emit(ev);
  };

  render() {
    const normalizedSize = this.size === 'medium' ? 'default' : this.size;

    return (
      <Host
        style={this.colorStyles}
        class={{
          'link': true,
          [`link-${normalizedSize}`]: true,
          [`link-underline-${this.underline}`]: true,
          'link-disabled': this.disabled,
        }}
      >
        <a
          part="native"
          class="link-native"
          href={this.disabled ? undefined : this.href}
          target={this.resolvedTarget}
          rel={this.resolvedRel}
          download={this.resolvedDownload}
          aria-disabled={this.disabled ? 'true' : undefined}
          aria-label={this.label}
          tabIndex={this.disabled ? -1 : undefined}
          onClick={this.handleClick}
        >
          <span part="content" class="link-inner">
            <slot name="start"></slot>
            <slot></slot>
            <slot name="end"></slot>
          </span>
        </a>
      </Host>
    );
  }
}


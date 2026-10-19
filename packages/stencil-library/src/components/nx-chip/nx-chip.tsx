import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
} from '@stencil/core';

export type NxChipVariant = 'subtle' | 'solid' | 'outline';
export type NxChipColor =
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
export type NxChipSize = 'sm' | 'md' | 'lg';
export type NxChipShape = 'pill' | 'rounded';

export interface NxChipSelectEventDetail {
  selected: boolean;
  value?: any;
}

interface ChipColorToken {
  bg: string;
  text: string;
  subtleBg: string;
  subtleText: string;
  border?: string;
}

const COLOR_TOKENS: Record<string, ChipColorToken> = {
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
    subtleBg: 'var(--nx-color-gray-100, #f1f5f9)',
    subtleText: 'var(--nx-color-gray-800, #1e293b)',
    border: 'var(--nx-color-gray-300, #cbd5e1)',
  },
};

@Component({
  tag: 'nx-chip',
  styleUrl: 'nx-chip.scss',
  shadow: true,
})
export class NxChip {
  @Element() el!: HTMLElement;

  /** Value associated with the chip */
  @Prop() value?: any;

  /** Text label of the chip (alternative to default slot) */
  @Prop() label?: string;

  /** Visual variant of the chip */
  @Prop({ reflect: true }) variant: NxChipVariant = 'subtle';

  /** Color theme or custom CSS color string */
  @Prop({ reflect: true }) color: NxChipColor = 'primary';

  /** Size of the chip */
  @Prop({ reflect: true }) size: NxChipSize = 'md';

  /** Shape of the chip */
  @Prop({ reflect: true }) shape: NxChipShape = 'pill';

  /** Whether the chip is interactive and clickable */
  @Prop({ reflect: true }) clickable = false;

  /** Whether the chip acts as a toggleable filter chip */
  @Prop({ reflect: true }) selectable = false;

  /** Current selection state when selectable */
  @Prop({ mutable: true, reflect: true }) selected = false;

  /** Whether the chip displays a close / remove button */
  @Prop({ reflect: true }) removable = false;

  /** Whether the chip is disabled */
  @Prop({ reflect: true }) disabled = false;

  /** Emitted when a clickable or selectable chip is clicked */
  @Event({ bubbles: true, composed: true })
  nxClick!: EventEmitter<any>;

  /** Emitted when selection state changes on a selectable chip */
  @Event({ bubbles: true, composed: true })
  nxSelect!: EventEmitter<NxChipSelectEventDetail>;

  /** Emitted when the remove/close button is clicked */
  @Event({ bubbles: true, composed: true })
  nxRemove!: EventEmitter<any>;

  private handleClick = (ev: MouseEvent) => {
    if (this.disabled) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      return;
    }

    if (this.selectable) {
      this.selected = !this.selected;
      this.nxSelect.emit({
        selected: this.selected,
        value: this.value !== undefined ? this.value : this.label,
      });
    }

    if (this.clickable || this.selectable) {
      this.nxClick.emit(this.value !== undefined ? this.value : this.label);
    }
  };

  private handleKeyDown = (ev: KeyboardEvent) => {
    if (this.disabled) return;

    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.handleClick(ev as any);
    } else if ((ev.key === 'Backspace' || ev.key === 'Delete') && this.removable) {
      ev.preventDefault();
      this.handleRemove(ev as any);
    }
  };

  private handleRemove = (ev: MouseEvent) => {
    ev.stopPropagation();
    if (this.disabled) return;
    this.nxRemove.emit(this.value !== undefined ? this.value : this.label);
  };

  private get iconSize(): string {
    switch (this.size) {
      case 'sm':
        return '14px';
      case 'lg':
        return '18px';
      default:
        return '16px';
    }
  }

  render() {
    const isInteractive = (this.clickable || this.selectable) && !this.disabled;
    const colorKey = (this.color || 'primary').toLowerCase();
    const token = COLOR_TOKENS[colorKey];

    let chipBg: string;
    let chipText: string;
    let chipBorder: string;

    if (token) {
      if (this.selected) {
        // When selected in selectable mode, chip becomes prominent
        chipBg = token.bg;
        chipText = token.text;
        chipBorder = token.border || 'transparent';
      } else if (this.variant === 'solid') {
        chipBg = token.bg;
        chipText = token.text;
        chipBorder = token.border || 'transparent';
      } else if (this.variant === 'outline') {
        chipBg = 'transparent';
        chipText = colorKey === 'light' ? 'var(--nx-color-gray-800, #1e293b)' : token.bg;
        chipBorder = token.border || token.bg;
      } else {
        // subtle (default)
        chipBg = token.subtleBg;
        chipText = token.subtleText;
        chipBorder = 'transparent';
      }
    } else {
      // custom color string
      if (this.selected || this.variant === 'solid') {
        chipBg = this.color;
        chipText = '#ffffff';
        chipBorder = 'transparent';
      } else if (this.variant === 'outline') {
        chipBg = 'transparent';
        chipText = this.color;
        chipBorder = this.color;
      } else {
        // subtle
        chipBg = `color-mix(in srgb, ${this.color} 15%, transparent)`;
        chipText = this.color;
        chipBorder = 'transparent';
      }
    }

    const hostStyles: Record<string, string> = {
      '--nx-chip-bg': chipBg,
      '--nx-chip-text-color': chipText,
      '--nx-chip-border-color': chipBorder,
    };

    return (
      <Host
        style={hostStyles}
        class={{
          [`variant-${this.variant}`]: true,
          [`size-${this.size}`]: true,
          [`shape-${this.shape}`]: true,
          [`color-${colorKey}`]: !!token,
          'is-clickable': isInteractive,
          'is-selectable': this.selectable,
          'is-selected': this.selected,
          'is-removable': this.removable,
          'is-disabled': this.disabled,
        }}
        role={this.selectable ? 'checkbox' : this.clickable ? 'button' : undefined}
        aria-checked={this.selectable ? (this.selected ? 'true' : 'false') : undefined}
        aria-disabled={this.disabled ? 'true' : undefined}
        tabindex={isInteractive ? 0 : undefined}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
      >
        {/* Selected Checkmark (if selectable and selected) */}
        {this.selectable && this.selected && (
          <span class="chip-check" part="check">
            <svg viewBox="0 0 24 24" width={this.iconSize} height={this.iconSize} fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
        )}

        {/* Start Content (slot="start") */}
        <slot name="start"></slot>

        {/* Chip Label Content */}
        <span class="chip-label" part="label">
          {this.label ? this.label : <slot></slot>}
        </span>

        {/* End Slot */}
        <slot name="end"></slot>

        {/* Remove Button */}
        {this.removable && !this.disabled && (
          <button
            type="button"
            class="chip-remove-btn"
            part="remove-button"
            aria-label={`Remove ${this.label || 'chip'}`}
            onClick={this.handleRemove}
          >
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </Host>
    );
  }
}

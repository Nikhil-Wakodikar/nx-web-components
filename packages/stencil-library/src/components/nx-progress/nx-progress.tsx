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
  tag: 'nx-progress',
  styleUrl: 'nx-progress.scss',
  shadow: true,
})
export class NxProgress {
  @Prop() value = 0;

  @Prop() max = 100;

  @Prop() buffer?: number;

  @Prop({ reflect: true }) variant: 'linear' | 'circular' = 'linear';

  @Prop({ reflect: true }) size: 'small' | 'default' | 'medium' | 'large' = 'default';

  @Prop({ reflect: true }) color?: string;

  @Prop({ reflect: true }) indeterminate = false;

  @Prop({ reflect: true }) striped = false;

  @Prop({ reflect: true }) animated = false;

  @Prop() showValue = false;

  @Prop() label?: string;

  @Prop() valueText?: string;

  @Prop() strokeWidth = 4;

  private get safeMax(): number {
    return this.max > 0 ? this.max : 100;
  }

  private get clampedValue(): number {
    return Math.min(Math.max(Number(this.value) || 0, 0), this.safeMax);
  }

  private get percentage(): number {
    return Math.round((this.clampedValue / this.safeMax) * 100);
  }

  private get bufferPercentage(): number | undefined {
    if (this.buffer === undefined || this.buffer === null) return undefined;
    const clampedBuffer = Math.min(Math.max(Number(this.buffer) || 0, 0), this.safeMax);
    return Math.round((clampedBuffer / this.safeMax) * 100);
  }

  private get cssColor(): string | undefined {
    if (!this.color) return undefined;
    return colorTokens[this.color.toLowerCase()] || this.color;
  }

  private get formattedValue(): string {
    if (this.valueText) return this.valueText;
    return `${this.percentage}%`;
  }

  private renderLinear() {
    const hasHeader = Boolean(this.label || this.showValue || this.valueText);
    const bufferPct = this.bufferPercentage;

    return (
      <div part="container" class="progress-linear-wrapper">
        <div
          part="header"
          class={{
            'progress-header': true,
            'progress-header-visible': hasHeader,
          }}
        >
          <span part="label" class="progress-label">
            {this.label}
            <slot></slot>
          </span>
          {(this.showValue || this.valueText) && !this.indeterminate && (
            <span part="value" class="progress-value">
              <slot name="value">{this.formattedValue}</slot>
            </span>
          )}
        </div>

        <div part="track" class="progress-track">
          {bufferPct !== undefined && !this.indeterminate && (
            <div
              part="buffer"
              class="progress-buffer"
              style={{ width: `${bufferPct}%` }}
            ></div>
          )}
          <div
            part="fill"
            class="progress-fill"
            style={this.indeterminate ? undefined : { width: `${this.percentage}%` }}
          ></div>
        </div>
      </div>
    );
  }

  private renderCircular() {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (this.percentage / 100) * circumference;

    return (
      <div part="container" class="progress-circular-wrapper">
        <div class="progress-circular-box">
          <svg
            part="circular"
            class="progress-circular-svg"
            viewBox="0 0 50 50"
            aria-hidden="true"
            focusable="false"
          >
            <circle
              class="circular-track"
              cx="25"
              cy="25"
              r={radius}
              fill="none"
              stroke-width={this.strokeWidth}
            />
            <circle
              class="circular-fill"
              cx="25"
              cy="25"
              r={radius}
              fill="none"
              stroke-width={this.strokeWidth}
              stroke-dasharray={this.indeterminate ? undefined : `${circumference}`}
              stroke-dashoffset={this.indeterminate ? undefined : `${strokeDashoffset}`}
            />
          </svg>
          {(this.showValue || this.valueText) && !this.indeterminate && (
            <span part="value" class="progress-circular-value">
              <slot name="value">{this.formattedValue}</slot>
            </span>
          )}
        </div>

        {this.label && (
          <span part="label" class="progress-label">
            {this.label}
            <slot></slot>
          </span>
        )}
      </div>
    );
  }

  render() {
    const normalizedSize = this.size === 'medium' ? 'default' : this.size;
    const hostStyles: Record<string, string> = {};

    if (this.cssColor) {
      hostStyles['--color'] = this.cssColor;
    }

    return (
      <Host
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax={this.safeMax.toString()}
        aria-valuenow={this.indeterminate ? undefined : this.clampedValue.toString()}
        aria-valuetext={this.indeterminate ? undefined : this.formattedValue}
        aria-label={this.label?.trim() || 'Progress'}
        style={hostStyles}
        class={{
          'progress': true,
          [`progress-${this.variant}`]: true,
          [`progress-${normalizedSize}`]: true,
          'progress-indeterminate': this.indeterminate,
          'progress-striped': this.striped,
          'progress-animated': this.animated,
        }}
      >
        {this.variant === 'circular' ? this.renderCircular() : this.renderLinear()}
      </Host>
    );
  }
}


import { Component, Element, Host, Prop, h } from '@stencil/core';

export type NxSkeletonVariant =
  | 'text'
  | 'circular'
  | 'rectangular'
  | 'rounded';

export type NxSkeletonAnimation = 'shimmer' | 'pulse' | 'none';

@Component({
  tag: 'nx-skeleton',
  styleUrl: 'nx-skeleton.scss',
  shadow: true,
})
export class NxSkeleton {
  @Element() el!: HTMLElement;

  /** Shape of the skeleton placeholder: 'text', 'circular', 'rectangular', or 'rounded' */
  @Prop({ reflect: true }) variant: NxSkeletonVariant = 'text';

  /** Animation effect: 'shimmer', 'pulse', or 'none' */
  @Prop({ reflect: true }) animation: NxSkeletonAnimation = 'shimmer';

  /** Width of the skeleton (e.g. '100%', '80px', or 80) */
  @Prop({ reflect: true }) width?: string | number;

  /** Height of the skeleton (e.g. '16px', '40px', or 40) */
  @Prop({ reflect: true }) height?: string | number;

  /** Convenience dimension for width & height (ideal for circular/square skeletons) */
  @Prop({ reflect: true }) size?: string | number;

  /** Custom border radius (e.g. '12px', '50%', or 12) */
  @Prop({ reflect: true }) radius?: string | number;

  /** Number of skeleton lines to render (for text variant) */
  @Prop({ reflect: true }) count = 1;

  /** Width for the last line when count > 1 (e.g. '60%') */
  @Prop({ reflect: true }) lastLineWidth?: string;

  /** Whether the component is in loading state. If false, renders slotted content. */
  @Prop({ reflect: true }) loading = true;

  /** Custom animation duration (e.g. '1.5s' or '2s') */
  @Prop({ reflect: true }) duration?: string;

  /** Custom background color for the placeholder */
  @Prop({ reflect: true }) bg?: string;

  /** Custom shimmer highlight color */
  @Prop({ reflect: true }) shimmerColor?: string;

  private formatDimension(val?: string | number): string | undefined {
    if (val === undefined || val === null || val === '') return undefined;
    if (typeof val === 'number') return `${val}px`;
    const trimmed = val.toString().trim();
    if (/^\d+(\.\d+)?$/.test(trimmed)) return `${trimmed}px`;
    return trimmed;
  }

  private get resolvedWidth(): string | undefined {
    if (this.width !== undefined && this.width !== null) {
      return this.formatDimension(this.width);
    }
    if (this.size !== undefined && this.size !== null) {
      return this.formatDimension(this.size);
    }
    if (this.variant === 'circular') return '40px';
    if (this.variant === 'text') return '100%';
    return undefined;
  }

  private get resolvedHeight(): string | undefined {
    if (this.height !== undefined && this.height !== null) {
      return this.formatDimension(this.height);
    }
    if (this.size !== undefined && this.size !== null) {
      return this.formatDimension(this.size);
    }
    if (this.variant === 'circular') return '40px';
    if (this.variant === 'text') return '1em';
    if (this.variant === 'rounded' || this.variant === 'rectangular') {
      return '100px';
    }
    return undefined;
  }

  private get resolvedRadius(): string | undefined {
    if (this.radius !== undefined && this.radius !== null) {
      return this.formatDimension(this.radius);
    }
    if (this.variant === 'circular') return '50%';
    if (this.variant === 'rounded') return '8px';
    if (this.variant === 'rectangular') return '0px';
    if (this.variant === 'text') return '4px';
    return undefined;
  }

  render() {
    if (!this.loading) {
      return (
        <Host class="is-loaded">
          <slot></slot>
        </Host>
      );
    }

    const hostStyles: Record<string, string | undefined> = {};
    if (this.bg) hostStyles['--nx-skeleton-bg'] = this.bg;
    if (this.shimmerColor) hostStyles['--nx-skeleton-shimmer-color'] = this.shimmerColor;
    if (this.duration) hostStyles['--nx-skeleton-duration'] = this.duration;

    const baseClasses = {
      skeleton: true,
      [`skeleton--${this.variant}`]: true,
      [`skeleton--${this.animation}`]: this.animation !== 'none',
      'skeleton--no-animation': this.animation === 'none',
    };

    const count = Math.max(1, Math.floor(this.count || 1));

    if (count > 1) {
      const items = [];
      for (let i = 0; i < count; i++) {
        const isLast = i === count - 1;
        const itemWidth =
          isLast && this.lastLineWidth ? this.lastLineWidth : this.resolvedWidth;

        items.push(
          <span
            key={i}
            class={baseClasses}
            part="skeleton"
            style={{
              width: itemWidth,
              height: this.resolvedHeight,
              borderRadius: this.resolvedRadius,
            }}
          ></span>
        );
      }

      return (
        <Host
          aria-busy="true"
          aria-live="polite"
          role="status"
          class={{
            'is-loading': true,
            [`variant-${this.variant}`]: true,
            [`animation-${this.animation}`]: true,
          }}
          style={hostStyles}
        >
          <span class="sr-only">Loading...</span>
          <div class="skeleton-group" part="container">
            {items}
          </div>
        </Host>
      );
    }

    return (
      <Host
        aria-busy="true"
        aria-live="polite"
        role="status"
        class={{
          'is-loading': true,
          [`variant-${this.variant}`]: true,
          [`animation-${this.animation}`]: true,
        }}
        style={hostStyles}
      >
        <span class="sr-only">Loading...</span>
        <span
          class={baseClasses}
          part="skeleton"
          style={{
            width: this.resolvedWidth,
            height: this.resolvedHeight,
            borderRadius: this.resolvedRadius,
          }}
        ></span>
      </Host>
    );
  }
}


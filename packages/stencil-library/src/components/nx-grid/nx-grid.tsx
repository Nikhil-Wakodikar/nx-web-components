import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'nx-grid',
  styleUrl: 'nx-grid.scss',
  shadow: true,
})
export class NxGrid {
  /** When true, creates a fixed-width container with responsive max-width */
  @Prop({ reflect: true }) fixed = false;

  /** When true, creates a full-width container (100% width across all viewports) */
  @Prop({ reflect: true }) fluid = false;

  /** When true, removes padding from the grid container */
  @Prop({ reflect: true, attribute: 'no-padding' }) noPadding = false;

  /** Custom padding for the grid container */
  @Prop() padding?: string | number;

  render() {
    const hostStyles: Record<string, string> = {};

    if (this.padding !== undefined) {
      hostStyles['--padding'] = typeof this.padding === 'number' ? `${this.padding}px` : this.padding;
    }

    return (
      <Host
        part="grid"
        style={hostStyles}
        class={{
          'is-fixed': this.fixed,
          'is-fluid': this.fluid,
          'no-padding': this.noPadding,
        }}
      >
        <slot></slot>
      </Host>
    );
  }
}

import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'nx-grid',
  styleUrl: 'nx-grid.scss',
  shadow: true,
})
export class NxGrid {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
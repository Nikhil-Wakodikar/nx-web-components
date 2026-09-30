import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'nx-row',
  styleUrl: 'nx-row.scss',
  shadow: true,
})
export class NxRow {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}

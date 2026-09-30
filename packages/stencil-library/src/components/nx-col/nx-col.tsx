import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'nx-col',
  styleUrl: 'nx-col.scss',
  shadow: true,
})
export class NxCol {
  @Prop({ reflect: true }) size?: string;

  @Prop({ reflect: true, attribute: 'size-xs' }) sizeXs?: string;
  @Prop({ reflect: true, attribute: 'size-sm' }) sizeSm?: string;
  @Prop({ reflect: true, attribute: 'size-md' }) sizeMd?: string;
  @Prop({ reflect: true, attribute: 'size-lg' }) sizeLg?: string;
  @Prop({ reflect: true, attribute: 'size-xl' }) sizeXl?: string;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
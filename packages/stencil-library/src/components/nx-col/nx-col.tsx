import { Component, Host, Prop, h } from '@stencil/core';

export type NxColAlignSelf = 'auto' | 'start' | 'center' | 'end' | 'baseline' | 'stretch';

const ALIGN_SELF_MAP: Record<NxColAlignSelf, string> = {
  auto: 'auto',
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  baseline: 'baseline',
  stretch: 'stretch',
};

@Component({
  tag: 'nx-col',
  styleUrl: 'nx-col.scss',
  shadow: true,
})
export class NxCol {
  /** Column span for default (xs) screens: 1 to 12, or 'auto' */
  @Prop({ reflect: true }) size?: string | number;

  /** Column span for extra small screens < 576px */
  @Prop({ reflect: true, attribute: 'size-xs' }) sizeXs?: string | number;

  /** Column span for small screens >= 576px */
  @Prop({ reflect: true, attribute: 'size-sm' }) sizeSm?: string | number;

  /** Column span for medium screens >= 768px */
  @Prop({ reflect: true, attribute: 'size-md' }) sizeMd?: string | number;

  /** Column span for large screens >= 992px */
  @Prop({ reflect: true, attribute: 'size-lg' }) sizeLg?: string | number;

  /** Column span for extra large screens >= 1200px */
  @Prop({ reflect: true, attribute: 'size-xl' }) sizeXl?: string | number;

  /** Column span for extra extra large screens >= 1400px */
  @Prop({ reflect: true, attribute: 'size-xxl' }) sizeXxl?: string | number;

  /** Default column offset: 1 to 11 */
  @Prop({ reflect: true }) offset?: string | number;

  /** Column offset for extra small screens < 576px */
  @Prop({ reflect: true, attribute: 'offset-xs' }) offsetXs?: string | number;

  /** Column offset for small screens >= 576px */
  @Prop({ reflect: true, attribute: 'offset-sm' }) offsetSm?: string | number;

  /** Column offset for medium screens >= 768px */
  @Prop({ reflect: true, attribute: 'offset-md' }) offsetMd?: string | number;

  /** Column offset for large screens >= 992px */
  @Prop({ reflect: true, attribute: 'offset-lg' }) offsetLg?: string | number;

  /** Column offset for extra large screens >= 1200px */
  @Prop({ reflect: true, attribute: 'offset-xl' }) offsetXl?: string | number;

  /** Column offset for extra extra large screens >= 1400px */
  @Prop({ reflect: true, attribute: 'offset-xxl' }) offsetXxl?: string | number;

  /** Self vertical alignment within the row */
  @Prop({ reflect: true, attribute: 'align-self' }) alignSelf?: NxColAlignSelf;

  /** Flex order of the column ('first', 'last', or 1-12) */
  @Prop({ reflect: true }) order?: string | number;

  render() {
    const hostStyles: Record<string, string> = {};

    if (this.alignSelf && ALIGN_SELF_MAP[this.alignSelf]) {
      hostStyles['--align-self'] = ALIGN_SELF_MAP[this.alignSelf];
    }
    if (this.order !== undefined) {
      if (this.order === 'first') {
        hostStyles['--order'] = '-1';
      } else if (this.order === 'last') {
        hostStyles['--order'] = '13';
      } else {
        hostStyles['--order'] = String(this.order);
      }
    }

    return (
      <Host
        part="col"
        style={hostStyles}
        class={{
          [`align-self-${this.alignSelf}`]: !!this.alignSelf,
          [`order-${this.order}`]: this.order !== undefined,
        }}
      >
        <slot></slot>
      </Host>
    );
  }
}

import { Component, Host, Prop, h } from '@stencil/core';

export type NxRowJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type NxRowAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type NxRowAlignContent = 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch';
export type NxRowWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

const JUSTIFY_MAP: Record<NxRowJustify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

const ALIGN_MAP: Record<NxRowAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const ALIGN_CONTENT_MAP: Record<NxRowAlignContent, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  stretch: 'stretch',
};

@Component({
  tag: 'nx-row',
  styleUrl: 'nx-row.scss',
  shadow: true,
})
export class NxRow {
  /** Justify content (horizontal alignment of columns) */
  @Prop({ reflect: true }) justify?: NxRowJustify;

  /** Align items (vertical alignment of columns) */
  @Prop({ reflect: true }) align?: NxRowAlign;

  /** Align content (multi-row vertical alignment) */
  @Prop({ reflect: true, attribute: 'align-content' }) alignContent?: NxRowAlignContent;

  /** Flex wrap mode */
  @Prop({ reflect: true }) wrap: NxRowWrap = 'wrap';

  /** When true, removes gutters/padding from child columns */
  @Prop({ reflect: true, attribute: 'no-gutters' }) noGutters = false;

  /** Gap between columns and rows (e.g. '16px', '1rem', 16) */
  @Prop() gap?: string | number;

  /** Vertical row gap */
  @Prop({ attribute: 'row-gap' }) rowGap?: string | number;

  /** Horizontal column gap */
  @Prop({ attribute: 'column-gap' }) columnGap?: string | number;

  render() {
    const hostStyles: Record<string, string> = {};

    if (this.justify && JUSTIFY_MAP[this.justify]) {
      hostStyles['--justify-content'] = JUSTIFY_MAP[this.justify];
    }
    if (this.align && ALIGN_MAP[this.align]) {
      hostStyles['--align-items'] = ALIGN_MAP[this.align];
    }
    if (this.alignContent && ALIGN_CONTENT_MAP[this.alignContent]) {
      hostStyles['--align-content'] = ALIGN_CONTENT_MAP[this.alignContent];
    }
    if (this.wrap) {
      hostStyles['--flex-wrap'] = this.wrap;
    }
    if (this.gap !== undefined) {
      const gapVal = typeof this.gap === 'number' ? `${this.gap}px` : this.gap;
      hostStyles['--gap'] = gapVal;
      hostStyles['--row-gap'] = gapVal;
      hostStyles['--column-gap'] = gapVal;
    }
    if (this.rowGap !== undefined) {
      hostStyles['--row-gap'] = typeof this.rowGap === 'number' ? `${this.rowGap}px` : this.rowGap;
    }
    if (this.columnGap !== undefined) {
      hostStyles['--column-gap'] = typeof this.columnGap === 'number' ? `${this.columnGap}px` : this.columnGap;
    }

    return (
      <Host
        style={hostStyles}
        class={{
          [`justify-${this.justify}`]: !!this.justify,
          [`align-${this.align}`]: !!this.align,
          [`wrap-${this.wrap}`]: !!this.wrap,
          'no-gutters': this.noGutters,
        }}
      >
        <slot></slot>
      </Host>
    );
  }
}

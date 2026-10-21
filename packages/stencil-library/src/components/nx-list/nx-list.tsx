import {
  Component,
  Element,
  Host,
  Prop,
  Watch,
  h,
} from '@stencil/core';
import { NxListItemLines } from '../nx-list-item/nx-list-item';

export type NxListLines = NxListItemLines;

export interface NxListItemElement extends HTMLElement {
  lines?: NxListItemLines;
  dataset: DOMStringMap;
}

let listIds = 0;

@Component({
  tag: 'nx-list',
  styleUrl: 'nx-list.scss',
  shadow: true,
})
export class NxList {
  @Element() el!: HTMLElement;

  private listId = `nx-list-${listIds++}`;

  /** Divider line style for items in this list: 'full', 'inset', or 'none' */
  @Prop({ reflect: true }) lines: NxListLines = 'full';

  @Watch('lines')
  linesChanged() {
    this.syncChildItems();
  }

  connectedCallback() {
    this.syncChildItems();
  }

  componentDidLoad() {
    this.syncChildItems();
  }

  private getChildItems(): NxListItemElement[] {
    return Array.from(this.el.querySelectorAll('nx-list-item'));
  }

  private syncChildItems = () => {
    const items = this.getChildItems();
    items.forEach((item) => {
      if (!item.hasAttribute('lines') || item.dataset.inheritedLines === 'true') {
        item.lines = this.lines;
        item.dataset.inheritedLines = 'true';
      }
    });
  };

  render() {
    return (
      <Host
        id={this.listId}
        class={{
          [`lines-${this.lines}`]: true,
        }}
      >
        <div class="nx-list-container" role="list" part="container">
          <slot onSlotchange={this.syncChildItems}></slot>
        </div>
      </Host>
    );
  }
}

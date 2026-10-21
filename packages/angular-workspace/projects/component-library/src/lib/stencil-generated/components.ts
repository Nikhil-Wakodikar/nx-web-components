/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from 'stencil-library';


@ProxyCmp({
  inputs: ['collapseIcon', 'contentPadding', 'disabled', 'expandIconPosition', 'header', 'hideToggleIcon', 'icon', 'open', 'toggleIcon', 'value', 'variant'],
  methods: ['expand', 'collapse', 'toggle']
})
@Component({
  selector: 'nx-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['collapseIcon', 'contentPadding', 'disabled', 'expandIconPosition', 'header', 'hideToggleIcon', 'icon', 'open', 'toggleIcon', 'value', 'variant'],
})
export class NxAccordion {
  protected el: HTMLNxAccordionElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxToggle']);
  }
}


import type { NxAccordionToggleEventDetail as INxAccordionNxAccordionToggleEventDetail } from 'stencil-library';

export declare interface NxAccordion extends Components.NxAccordion {

  nxToggle: EventEmitter<INxAccordionNxAccordionToggleEventDetail>;
}


@ProxyCmp({
  inputs: ['disabled', 'displayMode', 'expandIconPosition', 'multiple', 'value', 'variant'],
  methods: ['getAccordions', 'requestToggle']
})
@Component({
  selector: 'nx-accordion-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'displayMode', 'expandIconPosition', 'multiple', 'value', 'variant'],
})
export class NxAccordionGroup {
  protected el: HTMLNxAccordionGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxChange']);
  }
}


import type { NxAccordionGroupChangeEventDetail as INxAccordionGroupNxAccordionGroupChangeEventDetail } from 'stencil-library';

export declare interface NxAccordionGroup extends Components.NxAccordionGroup {

  nxChange: EventEmitter<INxAccordionGroupNxAccordionGroupChangeEventDetail>;
}


@ProxyCmp({
  inputs: ['color', 'dot', 'max', 'placement', 'pulse', 'shape', 'size', 'value', 'variant']
})
@Component({
  selector: 'nx-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'dot', 'max', 'placement', 'pulse', 'shape', 'size', 'value', 'variant'],
})
export class NxBadge {
  protected el: HTMLNxBadgeElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NxBadge extends Components.NxBadge {}


@ProxyCmp({
  inputs: ['disabled', 'expand', 'fill', 'shape', 'size', 'type', 'variant']
})
@Component({
  selector: 'nx-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'expand', 'fill', 'shape', 'size', 'type', 'variant'],
})
export class NxButton {
  protected el: HTMLNxButtonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NxButton extends Components.NxButton {}


@ProxyCmp({
  inputs: ['disabled', 'headerTitle', 'hoverable', 'href', 'padding', 'rel', 'subtitle', 'target', 'variant']
})
@Component({
  selector: 'nx-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'headerTitle', 'hoverable', 'href', 'padding', 'rel', 'subtitle', 'target', 'variant'],
})
export class NxCard {
  protected el: HTMLNxCardElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxClick']);
  }
}


export declare interface NxCard extends Components.NxCard {

  nxClick: EventEmitter<MouseEvent>;
}


@ProxyCmp({
  inputs: ['alignment', 'checked', 'color', 'disabled', 'errorText', 'helperText', 'indeterminate', 'invalid', 'justify', 'label', 'labelPlacement', 'name', 'required', 'value'],
  methods: ['setFocus']
})
@Component({
  selector: 'nx-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alignment', 'checked', 'color', 'disabled', 'errorText', 'helperText', 'indeterminate', 'invalid', 'justify', 'label', 'labelPlacement', 'name', 'required', 'value'],
})
export class NxCheckbox {
  protected el: HTMLNxCheckboxElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['checkedChange', 'nxChange', 'nxFocus', 'nxBlur']);
  }
}


export declare interface NxCheckbox extends Components.NxCheckbox {

  checkedChange: EventEmitter<boolean>;

  nxChange: EventEmitter<boolean>;

  nxFocus: EventEmitter<FocusEvent>;

  nxBlur: EventEmitter<FocusEvent>;
}


@ProxyCmp({
  inputs: ['clickable', 'color', 'disabled', 'label', 'removable', 'selectable', 'selected', 'shape', 'size', 'value', 'variant']
})
@Component({
  selector: 'nx-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clickable', 'color', 'disabled', 'label', 'removable', 'selectable', 'selected', 'shape', 'size', 'value', 'variant'],
})
export class NxChip {
  protected el: HTMLNxChipElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxClick', 'nxSelect', 'nxRemove']);
  }
}


import type { NxChipSelectEventDetail as INxChipNxChipSelectEventDetail } from 'stencil-library';

export declare interface NxChip extends Components.NxChip {
  /**
   * Emitted when a clickable or selectable chip is clicked
   */
  nxClick: EventEmitter<any>;
  /**
   * Emitted when selection state changes on a selectable chip
   */
  nxSelect: EventEmitter<INxChipNxChipSelectEventDetail>;
  /**
   * Emitted when the remove/close button is clicked
   */
  nxRemove: EventEmitter<any>;
}


@ProxyCmp({
  inputs: ['alignSelf', 'offset', 'offsetLg', 'offsetMd', 'offsetSm', 'offsetXl', 'offsetXs', 'offsetXxl', 'order', 'size', 'sizeLg', 'sizeMd', 'sizeSm', 'sizeXl', 'sizeXs', 'sizeXxl']
})
@Component({
  selector: 'nx-col',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alignSelf', 'offset', 'offsetLg', 'offsetMd', 'offsetSm', 'offsetXl', 'offsetXs', 'offsetXxl', 'order', 'size', 'sizeLg', 'sizeMd', 'sizeSm', 'sizeXl', 'sizeXs', 'sizeXxl'],
})
export class NxCol {
  protected el: HTMLNxColElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NxCol extends Components.NxCol {}


@ProxyCmp({
  inputs: ['clearable', 'disabled', 'errorText', 'firstDayOfWeek', 'format', 'helperText', 'invalid', 'label', 'max', 'min', 'name', 'placeholder', 'readonly', 'required', 'showTodayButton', 'success', 'value'],
  methods: ['setFocus', 'open', 'close']
})
@Component({
  selector: 'nx-date-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clearable', 'disabled', 'errorText', 'firstDayOfWeek', 'format', 'helperText', 'invalid', 'label', 'max', 'min', 'name', 'placeholder', 'readonly', 'required', 'showTodayButton', 'success', 'value'],
})
export class NxDatePicker {
  protected el: HTMLNxDatePickerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxInput', 'nxChange', 'nxFocus', 'nxBlur']);
  }
}


export declare interface NxDatePicker extends Components.NxDatePicker {

  nxInput: EventEmitter<string>;

  nxChange: EventEmitter<string>;

  nxFocus: EventEmitter<FocusEvent>;

  nxBlur: EventEmitter<FocusEvent>;
}


@ProxyCmp({
  inputs: ['fixed', 'fluid', 'noPadding', 'padding']
})
@Component({
  selector: 'nx-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['fixed', 'fluid', 'noPadding', 'padding'],
})
export class NxGrid {
  protected el: HTMLNxGridElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NxGrid extends Components.NxGrid {}


@ProxyCmp({
  inputs: ['color', 'label', 'name', 'size', 'strokeWidth']
})
@Component({
  selector: 'nx-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'label', 'name', 'size', 'strokeWidth'],
})
export class NxIcon {
  protected el: HTMLNxIconElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NxIcon extends Components.NxIcon {}


@ProxyCmp({
  inputs: ['autocapitalize', 'autocomplete', 'autofocus', 'counter', 'disabled', 'errorText', 'helperText', 'inputmode', 'invalid', 'label', 'max', 'maxlength', 'min', 'minlength', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'spellcheck', 'step', 'success', 'type', 'value'],
  methods: ['setInputValue', 'setFocus', 'getInputElement']
})
@Component({
  selector: 'nx-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autocapitalize', 'autocomplete', 'autofocus', 'counter', 'disabled', 'errorText', 'helperText', 'inputmode', 'invalid', 'label', 'max', 'maxlength', 'min', 'minlength', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'spellcheck', 'step', 'success', 'type', 'value'],
})
export class NxInput {
  protected el: HTMLNxInputElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxInput', 'nxChange', 'nxFocus', 'nxBlur']);
  }
}


export declare interface NxInput extends Components.NxInput {

  nxInput: EventEmitter<string>;

  nxChange: EventEmitter<string>;

  nxFocus: EventEmitter<FocusEvent>;

  nxBlur: EventEmitter<FocusEvent>;
}


@ProxyCmp({
  inputs: ['color', 'disabled', 'download', 'external', 'href', 'label', 'rel', 'size', 'target', 'underline']
})
@Component({
  selector: 'nx-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'disabled', 'download', 'external', 'href', 'label', 'rel', 'size', 'target', 'underline'],
})
export class NxLink {
  protected el: HTMLNxLinkElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxClick']);
  }
}


export declare interface NxLink extends Components.NxLink {

  nxClick: EventEmitter<MouseEvent>;
}


@ProxyCmp({
  inputs: ['lines']
})
@Component({
  selector: 'nx-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['lines'],
})
export class NxList {
  protected el: HTMLNxListElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NxList extends Components.NxList {}


@ProxyCmp({
  inputs: ['clickable', 'disabled', 'download', 'href', 'lines', 'rel', 'selected', 'target', 'value']
})
@Component({
  selector: 'nx-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clickable', 'disabled', 'download', 'href', 'lines', 'rel', 'selected', 'target', 'value'],
})
export class NxListItem {
  protected el: HTMLNxListItemElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxClick']);
  }
}


import type { NxListItemClickEventDetail as INxListItemNxListItemClickEventDetail } from 'stencil-library';

export declare interface NxListItem extends Components.NxListItem {
  /**
   * Emitted when the item is clicked
   */
  nxClick: EventEmitter<INxListItemNxListItemClickEventDetail>;
}


@ProxyCmp({
  inputs: ['color', 'fullscreen', 'label', 'labelPlacement', 'overlay', 'paused', 'size', 'strokeWidth', 'variant']
})
@Component({
  selector: 'nx-loader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'fullscreen', 'label', 'labelPlacement', 'overlay', 'paused', 'size', 'strokeWidth', 'variant'],
})
export class NxLoader {
  protected el: HTMLNxLoaderElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NxLoader extends Components.NxLoader {}


@ProxyCmp({
  inputs: ['animated', 'backdrop', 'centered', 'dismissible', 'header', 'isOpen', 'keyboard', 'scrollable', 'size', 'subHeader', 'zIndex'],
  methods: ['present', 'dismiss']
})
@Component({
  selector: 'nx-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['animated', 'backdrop', 'centered', 'dismissible', 'header', 'isOpen', 'keyboard', 'scrollable', 'size', 'subHeader', 'zIndex'],
})
export class NxModal {
  protected el: HTMLNxModalElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxPresent', 'nxDismiss', 'nxClose']);
  }
}


import type { NxModalDismissDetail as INxModalNxModalDismissDetail } from 'stencil-library';

export declare interface NxModal extends Components.NxModal {
  /**
   * Emitted when the modal has opened and is presented
   */
  nxPresent: EventEmitter<void>;
  /**
   * Emitted when the modal has closed
   */
  nxDismiss: EventEmitter<INxModalNxModalDismissDetail>;
  /**
   * Emitted specifically when the close button is clicked
   */
  nxClose: EventEmitter<void>;
}


@ProxyCmp({
  inputs: ['animated', 'buffer', 'color', 'indeterminate', 'label', 'max', 'showValue', 'size', 'striped', 'strokeWidth', 'value', 'valueText', 'variant']
})
@Component({
  selector: 'nx-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['animated', 'buffer', 'color', 'indeterminate', 'label', 'max', 'showValue', 'size', 'striped', 'strokeWidth', 'value', 'valueText', 'variant'],
})
export class NxProgress {
  protected el: HTMLNxProgressElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NxProgress extends Components.NxProgress {}


@ProxyCmp({
  inputs: ['alignment', 'color', 'disabled', 'invalid', 'justify', 'labelPlacement', 'value'],
  methods: ['setFocus', 'setButtonTabindex']
})
@Component({
  selector: 'nx-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alignment', 'color', 'disabled', 'invalid', 'justify', 'labelPlacement', 'value'],
})
export class NxRadio {
  protected el: HTMLNxRadioElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxFocus', 'nxBlur']);
  }
}


export declare interface NxRadio extends Components.NxRadio {

  nxFocus: EventEmitter<void>;

  nxBlur: EventEmitter<void>;
}


@ProxyCmp({
  inputs: ['allowEmptySelection', 'compareWith', 'direction', 'disabled', 'errorText', 'helperText', 'invalid', 'label', 'name', 'required', 'value'],
  methods: ['setFocus']
})
@Component({
  selector: 'nx-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['allowEmptySelection', 'compareWith', 'direction', 'disabled', 'errorText', 'helperText', 'invalid', 'label', 'name', 'required', 'value'],
})
export class NxRadioGroup {
  protected el: HTMLNxRadioGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxChange', 'nxValueChange']);
  }
}


import type { NxRadioGroupChangeEventDetail as INxRadioGroupNxRadioGroupChangeEventDetail } from 'stencil-library';
import type { NxRadioGroupValueChangeEventDetail as INxRadioGroupNxRadioGroupValueChangeEventDetail } from 'stencil-library';

export declare interface NxRadioGroup extends Components.NxRadioGroup {

  nxChange: EventEmitter<INxRadioGroupNxRadioGroupChangeEventDetail>;

  nxValueChange: EventEmitter<INxRadioGroupNxRadioGroupValueChangeEventDetail>;
}


@ProxyCmp({
  inputs: ['align', 'alignContent', 'columnGap', 'gap', 'justify', 'noGutters', 'rowGap', 'wrap']
})
@Component({
  selector: 'nx-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'alignContent', 'columnGap', 'gap', 'justify', 'noGutters', 'rowGap', 'wrap'],
})
export class NxRow {
  protected el: HTMLNxRowElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NxRow extends Components.NxRow {}


@ProxyCmp({
  inputs: ['disabled', 'invalid', 'label', 'name', 'placeholder', 'required', 'success', 'value'],
  methods: ['selectOption', 'setFocus']
})
@Component({
  selector: 'nx-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'invalid', 'label', 'name', 'placeholder', 'required', 'success', 'value'],
})
export class NxSelect {
  protected el: HTMLNxSelectElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxInput', 'nxChange', 'nxFocus', 'nxBlur']);
  }
}


export declare interface NxSelect extends Components.NxSelect {

  nxInput: EventEmitter<string>;

  nxChange: EventEmitter<string>;

  nxFocus: EventEmitter<FocusEvent>;

  nxBlur: EventEmitter<FocusEvent>;
}


@ProxyCmp({
  inputs: ['active', 'disabled', 'selected', 'value']
})
@Component({
  selector: 'nx-select-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'disabled', 'selected', 'value'],
})
export class NxSelectOption {
  protected el: HTMLNxSelectOptionElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NxSelectOption extends Components.NxSelectOption {}


@ProxyCmp({
  inputs: ['active', 'badge', 'closable', 'disabled', 'icon', 'label', 'value'],
  methods: ['select', 'close']
})
@Component({
  selector: 'nx-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'badge', 'closable', 'disabled', 'icon', 'label', 'value'],
})
export class NxTab {
  protected el: HTMLNxTabElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxClose']);
  }
}


export declare interface NxTab extends Components.NxTab {
  /**
   * Emitted when the tab's close button is clicked
   */
  nxClose: EventEmitter<string>;
}


@ProxyCmp({
  inputs: ['color', 'disabled', 'placement', 'scrollable', 'size', 'stretch', 'value'],
  methods: ['getTabs', 'getSelectedTab', 'selectTab', 'registerTab', 'unregisterTab']
})
@Component({
  selector: 'nx-tab-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'disabled', 'placement', 'scrollable', 'size', 'stretch', 'value'],
})
export class NxTabGroup {
  protected el: HTMLNxTabGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxChange']);
  }
}


import type { NxTabChangeEventDetail as INxTabGroupNxTabChangeEventDetail } from 'stencil-library';

export declare interface NxTabGroup extends Components.NxTabGroup {
  /**
   * Emitted when the active tab changes
   */
  nxChange: EventEmitter<INxTabGroupNxTabChangeEventDetail>;
}


@ProxyCmp({
  inputs: ['bordered', 'caption', 'clickableRows', 'color', 'columns', 'currentPage', 'data', 'emptyText', 'hoverable', 'loading', 'loadingText', 'maxHeight', 'pageSize', 'pageSizeOptions', 'paginated', 'rowKey', 'selectable', 'selectedRows', 'selectionMode', 'size', 'sortColumn', 'sortDirection', 'sortable', 'stickyHeader', 'striped', 'totalItems', 'variant'],
  methods: ['selectAll', 'deselectAll', 'getSelectedRows', 'getSelectedKeys', 'setPage', 'sort']
})
@Component({
  selector: 'nx-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['bordered', 'caption', 'clickableRows', 'color', 'columns', 'currentPage', 'data', 'emptyText', 'hoverable', 'loading', 'loadingText', 'maxHeight', 'pageSize', 'pageSizeOptions', 'paginated', 'rowKey', 'selectable', 'selectedRows', 'selectionMode', 'size', 'sortColumn', 'sortDirection', 'sortable', 'stickyHeader', 'striped', 'totalItems', 'variant'],
})
export class NxTable {
  protected el: HTMLNxTableElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxSort', 'nxSelectionChange', 'nxPageChange', 'nxRowClick']);
  }
}


import type { NxTableSortEventDetail as INxTableNxTableSortEventDetail } from 'stencil-library';
import type { NxTableSelectionEventDetail as INxTableNxTableSelectionEventDetail } from 'stencil-library';
import type { NxTablePageChangeEventDetail as INxTableNxTablePageChangeEventDetail } from 'stencil-library';
import type { NxTableRowClickEventDetail as INxTableNxTableRowClickEventDetail } from 'stencil-library';

export declare interface NxTable extends Components.NxTable {
  /**
   * Emitted when a sortable column header is clicked
   */
  nxSort: EventEmitter<INxTableNxTableSortEventDetail>;
  /**
   * Emitted when row selection changes
   */
  nxSelectionChange: EventEmitter<INxTableNxTableSelectionEventDetail>;
  /**
   * Emitted when current page or page size changes
   */
  nxPageChange: EventEmitter<INxTableNxTablePageChangeEventDetail>;
  /**
   * Emitted when a table row is clicked
   */
  nxRowClick: EventEmitter<INxTableNxTableRowClickEventDetail>;
}


@ProxyCmp({
  inputs: ['align', 'as', 'color', 'inline', 'italic', 'lines', 'size', 'strikethrough', 'transform', 'truncate', 'underline', 'variant', 'weight']
})
@Component({
  selector: 'nx-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'as', 'color', 'inline', 'italic', 'lines', 'size', 'strikethrough', 'transform', 'truncate', 'underline', 'variant', 'weight'],
})
export class NxText {
  protected el: HTMLNxTextElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NxText extends Components.NxText {}


@ProxyCmp({
  inputs: ['autoGrow', 'autocapitalize', 'autofocus', 'cols', 'counter', 'disabled', 'errorText', 'helperText', 'invalid', 'label', 'maxlength', 'minlength', 'name', 'placeholder', 'readonly', 'required', 'resize', 'rows', 'spellcheck', 'success', 'value', 'wrap'],
  methods: ['setInputValue', 'setFocus', 'getInputElement']
})
@Component({
  selector: 'nx-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoGrow', 'autocapitalize', 'autofocus', 'cols', 'counter', 'disabled', 'errorText', 'helperText', 'invalid', 'label', 'maxlength', 'minlength', 'name', 'placeholder', 'readonly', 'required', 'resize', 'rows', 'spellcheck', 'success', 'value', 'wrap'],
})
export class NxTextarea {
  protected el: HTMLNxTextareaElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxInput', 'nxChange', 'nxFocus', 'nxBlur']);
  }
}


export declare interface NxTextarea extends Components.NxTextarea {

  nxInput: EventEmitter<string>;

  nxChange: EventEmitter<string>;

  nxFocus: EventEmitter<FocusEvent>;

  nxBlur: EventEmitter<FocusEvent>;
}


@ProxyCmp({
  inputs: ['clearable', 'disabled', 'errorText', 'format', 'helperText', 'invalid', 'label', 'max', 'min', 'minuteStep', 'name', 'placeholder', 'readonly', 'required', 'secondStep', 'showNowButton', 'showSeconds', 'success', 'value'],
  methods: ['setFocus', 'open', 'close']
})
@Component({
  selector: 'nx-time-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clearable', 'disabled', 'errorText', 'format', 'helperText', 'invalid', 'label', 'max', 'min', 'minuteStep', 'name', 'placeholder', 'readonly', 'required', 'secondStep', 'showNowButton', 'showSeconds', 'success', 'value'],
})
export class NxTimePicker {
  protected el: HTMLNxTimePickerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxInput', 'nxChange', 'nxFocus', 'nxBlur']);
  }
}


export declare interface NxTimePicker extends Components.NxTimePicker {

  nxInput: EventEmitter<string>;

  nxChange: EventEmitter<string>;

  nxFocus: EventEmitter<FocusEvent>;

  nxBlur: EventEmitter<FocusEvent>;
}


@ProxyCmp({
  inputs: ['actionText', 'animated', 'dismissible', 'duration', 'header', 'icon', 'isOpen', 'message', 'pauseOnHover', 'position', 'showIcon', 'showProgressBar', 'translucent', 'variant'],
  methods: ['present', 'dismiss']
})
@Component({
  selector: 'nx-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['actionText', 'animated', 'dismissible', 'duration', 'header', 'icon', 'isOpen', 'message', 'pauseOnHover', 'position', 'showIcon', 'showProgressBar', 'translucent', 'variant'],
})
export class NxToast {
  protected el: HTMLNxToastElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxPresent', 'nxDismiss', 'nxAction', 'nxClose']);
  }
}


import type { NxToastDismissDetail as INxToastNxToastDismissDetail } from 'stencil-library';

export declare interface NxToast extends Components.NxToast {
  /**
   * Emitted when the toast is presented
   */
  nxPresent: EventEmitter<void>;
  /**
   * Emitted when the toast is dismissed
   */
  nxDismiss: EventEmitter<INxToastNxToastDismissDetail>;
  /**
   * Emitted when the action button is clicked
   */
  nxAction: EventEmitter<void>;
  /**
   * Emitted when the close button is clicked
   */
  nxClose: EventEmitter<void>;
}


@ProxyCmp({
  inputs: ['alignment', 'checked', 'color', 'disabled', 'errorText', 'helperText', 'invalid', 'justify', 'label', 'labelPlacement', 'name', 'required', 'size', 'value'],
  methods: ['toggle', 'setFocus']
})
@Component({
  selector: 'nx-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alignment', 'checked', 'color', 'disabled', 'errorText', 'helperText', 'invalid', 'justify', 'label', 'labelPlacement', 'name', 'required', 'size', 'value'],
})
export class NxToggle {
  protected el: HTMLNxToggleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['checkedChange', 'nxChange', 'nxFocus', 'nxBlur']);
  }
}


export declare interface NxToggle extends Components.NxToggle {

  checkedChange: EventEmitter<boolean>;

  nxChange: EventEmitter<boolean>;

  nxFocus: EventEmitter<FocusEvent>;

  nxBlur: EventEmitter<FocusEvent>;
}



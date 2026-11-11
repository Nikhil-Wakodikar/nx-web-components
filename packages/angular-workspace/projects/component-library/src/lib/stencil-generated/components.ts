/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import type { Components } from '@_nx/stencil-library/components';

import { defineCustomElement as defineNxAccordion } from '@_nx/stencil-library/components/nx-accordion.js';
import { defineCustomElement as defineNxAccordionGroup } from '@_nx/stencil-library/components/nx-accordion-group.js';
import { defineCustomElement as defineNxAutocomplete } from '@_nx/stencil-library/components/nx-autocomplete.js';
import { defineCustomElement as defineNxBadge } from '@_nx/stencil-library/components/nx-badge.js';
import { defineCustomElement as defineNxButton } from '@_nx/stencil-library/components/nx-button.js';
import { defineCustomElement as defineNxCard } from '@_nx/stencil-library/components/nx-card.js';
import { defineCustomElement as defineNxCheckbox } from '@_nx/stencil-library/components/nx-checkbox.js';
import { defineCustomElement as defineNxChip } from '@_nx/stencil-library/components/nx-chip.js';
import { defineCustomElement as defineNxCol } from '@_nx/stencil-library/components/nx-col.js';
import { defineCustomElement as defineNxDatePicker } from '@_nx/stencil-library/components/nx-date-picker.js';
import { defineCustomElement as defineNxDivider } from '@_nx/stencil-library/components/nx-divider.js';
import { defineCustomElement as defineNxGrid } from '@_nx/stencil-library/components/nx-grid.js';
import { defineCustomElement as defineNxIcon } from '@_nx/stencil-library/components/nx-icon.js';
import { defineCustomElement as defineNxInput } from '@_nx/stencil-library/components/nx-input.js';
import { defineCustomElement as defineNxLabel } from '@_nx/stencil-library/components/nx-label.js';
import { defineCustomElement as defineNxLink } from '@_nx/stencil-library/components/nx-link.js';
import { defineCustomElement as defineNxList } from '@_nx/stencil-library/components/nx-list.js';
import { defineCustomElement as defineNxListItem } from '@_nx/stencil-library/components/nx-list-item.js';
import { defineCustomElement as defineNxLoader } from '@_nx/stencil-library/components/nx-loader.js';
import { defineCustomElement as defineNxModal } from '@_nx/stencil-library/components/nx-modal.js';
import { defineCustomElement as defineNxOption } from '@_nx/stencil-library/components/nx-option.js';
import { defineCustomElement as defineNxProgress } from '@_nx/stencil-library/components/nx-progress.js';
import { defineCustomElement as defineNxRadio } from '@_nx/stencil-library/components/nx-radio.js';
import { defineCustomElement as defineNxRadioGroup } from '@_nx/stencil-library/components/nx-radio-group.js';
import { defineCustomElement as defineNxRow } from '@_nx/stencil-library/components/nx-row.js';
import { defineCustomElement as defineNxSelect } from '@_nx/stencil-library/components/nx-select.js';
import { defineCustomElement as defineNxSelectOption } from '@_nx/stencil-library/components/nx-select-option.js';
import { defineCustomElement as defineNxSkeleton } from '@_nx/stencil-library/components/nx-skeleton.js';
import { defineCustomElement as defineNxTab } from '@_nx/stencil-library/components/nx-tab.js';
import { defineCustomElement as defineNxTabGroup } from '@_nx/stencil-library/components/nx-tab-group.js';
import { defineCustomElement as defineNxTable } from '@_nx/stencil-library/components/nx-table.js';
import { defineCustomElement as defineNxText } from '@_nx/stencil-library/components/nx-text.js';
import { defineCustomElement as defineNxTextarea } from '@_nx/stencil-library/components/nx-textarea.js';
import { defineCustomElement as defineNxTimePicker } from '@_nx/stencil-library/components/nx-time-picker.js';
import { defineCustomElement as defineNxToast } from '@_nx/stencil-library/components/nx-toast.js';
import { defineCustomElement as defineNxToggle } from '@_nx/stencil-library/components/nx-toggle.js';
import { defineCustomElement as defineNxTooltip } from '@_nx/stencil-library/components/nx-tooltip.js';
@ProxyCmp({
  defineCustomElementFn: defineNxAccordion,
  inputs: ['collapseIcon', 'contentPadding', 'disabled', 'expandIconPosition', 'header', 'hideToggleIcon', 'icon', 'open', 'toggleIcon', 'value', 'variant'],
  methods: ['expand', 'collapse', 'toggle']
})
@Component({
  selector: 'nx-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['collapseIcon', 'contentPadding', 'disabled', 'expandIconPosition', 'header', 'hideToggleIcon', 'icon', 'open', 'toggleIcon', 'value', 'variant'],
  standalone: true
})
export class NxAccordion {
  protected el: HTMLNxAccordionElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxToggle']);
  }
}


import type { NxAccordionToggleEventDetail as INxAccordionNxAccordionToggleEventDetail } from '@_nx/stencil-library/components';

export declare interface NxAccordion extends Components.NxAccordion {

  nxToggle: EventEmitter<INxAccordionNxAccordionToggleEventDetail>;
}


@ProxyCmp({
  defineCustomElementFn: defineNxAccordionGroup,
  inputs: ['disabled', 'displayMode', 'expandIconPosition', 'multiple', 'value', 'variant'],
  methods: ['getAccordions', 'requestToggle']
})
@Component({
  selector: 'nx-accordion-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'displayMode', 'expandIconPosition', 'multiple', 'value', 'variant'],
  standalone: true
})
export class NxAccordionGroup {
  protected el: HTMLNxAccordionGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxChange']);
  }
}


import type { NxAccordionGroupChangeEventDetail as INxAccordionGroupNxAccordionGroupChangeEventDetail } from '@_nx/stencil-library/components';

export declare interface NxAccordionGroup extends Components.NxAccordionGroup {

  nxChange: EventEmitter<INxAccordionGroupNxAccordionGroupChangeEventDetail>;
}


@ProxyCmp({
  defineCustomElementFn: defineNxAutocomplete,
  inputs: ['clearable', 'debounce', 'disabled', 'errorText', 'filterMode', 'helperText', 'highlightMatch', 'invalid', 'label', 'loading', 'maxResults', 'minChars', 'name', 'noResultsText', 'openOnFocus', 'options', 'placeholder', 'readonly', 'required', 'showDropdownIcon', 'success', 'value'],
  methods: ['selectOptionElement', 'setOptionActive', 'setFocus', 'setInputValue', 'clear', 'open', 'close', 'getInputElement']
})
@Component({
  selector: 'nx-autocomplete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clearable', 'debounce', 'disabled', 'errorText', 'filterMode', 'helperText', 'highlightMatch', 'invalid', 'label', 'loading', 'maxResults', 'minChars', 'name', 'noResultsText', 'openOnFocus', 'options', 'placeholder', 'readonly', 'required', 'showDropdownIcon', 'success', 'value'],
  standalone: true
})
export class NxAutocomplete {
  protected el: HTMLNxAutocompleteElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxInput', 'nxChange', 'nxSelect', 'nxClear', 'nxFocus', 'nxBlur']);
  }
}


import type { AutocompleteOption as INxAutocompleteAutocompleteOption } from '@_nx/stencil-library/components';

export declare interface NxAutocomplete extends Components.NxAutocomplete {
  /**
   * Emitted whenever the user types into the input field.
   */
  nxInput: EventEmitter<string>;
  /**
   * Emitted when a selection is made or the input loses focus after its value changed.
   */
  nxChange: EventEmitter<string>;
  /**
   * Emitted when an option is selected from the dropdown list.
   */
  nxSelect: EventEmitter<INxAutocompleteAutocompleteOption>;
  /**
   * Emitted when the clear button is clicked.
   */
  nxClear: EventEmitter<void>;
  /**
   * Emitted when the input gains focus.
   */
  nxFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the input loses focus.
   */
  nxBlur: EventEmitter<FocusEvent>;
}


@ProxyCmp({
  defineCustomElementFn: defineNxBadge,
  inputs: ['color', 'dot', 'max', 'placement', 'pulse', 'shape', 'size', 'value', 'variant']
})
@Component({
  selector: 'nx-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'dot', 'max', 'placement', 'pulse', 'shape', 'size', 'value', 'variant'],
  standalone: true
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
  defineCustomElementFn: defineNxButton,
  inputs: ['color', 'disabled', 'expand', 'fill', 'form', 'name', 'shape', 'size', 'type', 'value', 'variant'],
  methods: ['setFocus', 'setBlur']
})
@Component({
  selector: 'nx-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'disabled', 'expand', 'fill', 'form', 'name', 'shape', 'size', 'type', 'value', 'variant'],
  standalone: true
})
export class NxButton {
  protected el: HTMLNxButtonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxFocus', 'nxBlur']);
  }
}


export declare interface NxButton extends Components.NxButton {
  /**
   * Emitted when the button gains focus
   */
  nxFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the button loses focus
   */
  nxBlur: EventEmitter<FocusEvent>;
}


@ProxyCmp({
  defineCustomElementFn: defineNxCard,
  inputs: ['disabled', 'headerTitle', 'hoverable', 'href', 'padding', 'rel', 'subtitle', 'target', 'variant']
})
@Component({
  selector: 'nx-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'headerTitle', 'hoverable', 'href', 'padding', 'rel', 'subtitle', 'target', 'variant'],
  standalone: true
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
  defineCustomElementFn: defineNxCheckbox,
  inputs: ['alignment', 'checked', 'color', 'disabled', 'errorText', 'helperText', 'indeterminate', 'invalid', 'justify', 'label', 'labelPlacement', 'name', 'required', 'value'],
  methods: ['setFocus']
})
@Component({
  selector: 'nx-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alignment', 'checked', 'color', 'disabled', 'errorText', 'helperText', 'indeterminate', 'invalid', 'justify', 'label', 'labelPlacement', 'name', 'required', 'value'],
  standalone: true
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
  defineCustomElementFn: defineNxChip,
  inputs: ['clickable', 'color', 'disabled', 'label', 'removable', 'selectable', 'selected', 'shape', 'size', 'value', 'variant']
})
@Component({
  selector: 'nx-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clickable', 'color', 'disabled', 'label', 'removable', 'selectable', 'selected', 'shape', 'size', 'value', 'variant'],
  standalone: true
})
export class NxChip {
  protected el: HTMLNxChipElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxClick', 'nxSelect', 'nxRemove']);
  }
}


import type { NxChipSelectEventDetail as INxChipNxChipSelectEventDetail } from '@_nx/stencil-library/components';

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
  defineCustomElementFn: defineNxCol,
  inputs: ['alignSelf', 'offset', 'offsetLg', 'offsetMd', 'offsetSm', 'offsetXl', 'offsetXs', 'offsetXxl', 'order', 'size', 'sizeLg', 'sizeMd', 'sizeSm', 'sizeXl', 'sizeXs', 'sizeXxl']
})
@Component({
  selector: 'nx-col',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alignSelf', 'offset', 'offsetLg', 'offsetMd', 'offsetSm', 'offsetXl', 'offsetXs', 'offsetXxl', 'order', 'size', 'sizeLg', 'sizeMd', 'sizeSm', 'sizeXl', 'sizeXs', 'sizeXxl'],
  standalone: true
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
  defineCustomElementFn: defineNxDatePicker,
  inputs: ['clearable', 'disabled', 'errorText', 'firstDayOfWeek', 'format', 'helperText', 'invalid', 'label', 'max', 'min', 'name', 'placeholder', 'readonly', 'required', 'showTodayButton', 'success', 'value'],
  methods: ['setFocus', 'open', 'close']
})
@Component({
  selector: 'nx-date-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clearable', 'disabled', 'errorText', 'firstDayOfWeek', 'format', 'helperText', 'invalid', 'label', 'max', 'min', 'name', 'placeholder', 'readonly', 'required', 'showTodayButton', 'success', 'value'],
  standalone: true
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
  defineCustomElementFn: defineNxDivider,
  inputs: ['align', 'color', 'dashed', 'dotted', 'inset', 'label', 'orientation', 'spacing', 'thickness', 'variant']
})
@Component({
  selector: 'nx-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'color', 'dashed', 'dotted', 'inset', 'label', 'orientation', 'spacing', 'thickness', 'variant'],
  standalone: true
})
export class NxDivider {
  protected el: HTMLNxDividerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NxDivider extends Components.NxDivider {}


@ProxyCmp({
  defineCustomElementFn: defineNxGrid,
  inputs: ['fixed', 'fluid', 'noPadding', 'padding']
})
@Component({
  selector: 'nx-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['fixed', 'fluid', 'noPadding', 'padding'],
  standalone: true
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
  defineCustomElementFn: defineNxIcon,
  inputs: ['color', 'label', 'name', 'size', 'strokeWidth']
})
@Component({
  selector: 'nx-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'label', 'name', 'size', 'strokeWidth'],
  standalone: true
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
  defineCustomElementFn: defineNxInput,
  inputs: ['autocapitalize', 'autocomplete', 'autofocus', 'counter', 'disabled', 'errorText', 'helperText', 'inputmode', 'invalid', 'label', 'max', 'maxlength', 'min', 'minlength', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'spellcheck', 'step', 'success', 'type', 'value'],
  methods: ['setInputValue', 'setFocus', 'getInputElement']
})
@Component({
  selector: 'nx-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autocapitalize', 'autocomplete', 'autofocus', 'counter', 'disabled', 'errorText', 'helperText', 'inputmode', 'invalid', 'label', 'max', 'maxlength', 'min', 'minlength', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'spellcheck', 'step', 'success', 'type', 'value'],
  standalone: true
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
  defineCustomElementFn: defineNxLabel,
  inputs: ['color', 'disabled', 'fontFamily', 'htmlFor', 'optional', 'position', 'required', 'size', 'truncate', 'weight']
})
@Component({
  selector: 'nx-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'disabled', 'fontFamily', 'htmlFor', 'optional', 'position', 'required', 'size', 'truncate', 'weight'],
  standalone: true
})
export class NxLabel {
  protected el: HTMLNxLabelElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxClick']);
  }
}


export declare interface NxLabel extends Components.NxLabel {
  /**
   * Emitted when the label is clicked
   */
  nxClick: EventEmitter<MouseEvent>;
}


@ProxyCmp({
  defineCustomElementFn: defineNxLink,
  inputs: ['color', 'disabled', 'download', 'external', 'href', 'label', 'rel', 'size', 'target', 'underline']
})
@Component({
  selector: 'nx-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'disabled', 'download', 'external', 'href', 'label', 'rel', 'size', 'target', 'underline'],
  standalone: true
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
  defineCustomElementFn: defineNxList,
  inputs: ['clickable', 'disabled', 'lines', 'value']
})
@Component({
  selector: 'nx-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clickable', 'disabled', 'lines', 'value'],
  standalone: true
})
export class NxList {
  protected el: HTMLNxListElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxChange']);
  }
}


import type { NxListChangeEventDetail as INxListNxListChangeEventDetail } from '@_nx/stencil-library/components';

export declare interface NxList extends Components.NxList {
  /**
   * Emitted when the selected item value changes
   */
  nxChange: EventEmitter<INxListNxListChangeEventDetail>;
}


@ProxyCmp({
  defineCustomElementFn: defineNxListItem,
  inputs: ['clickable', 'disabled', 'download', 'href', 'lines', 'rel', 'selected', 'target', 'value']
})
@Component({
  selector: 'nx-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clickable', 'disabled', 'download', 'href', 'lines', 'rel', 'selected', 'target', 'value'],
  standalone: true
})
export class NxListItem {
  protected el: HTMLNxListItemElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxClick']);
  }
}


import type { NxListItemClickEventDetail as INxListItemNxListItemClickEventDetail } from '@_nx/stencil-library/components';

export declare interface NxListItem extends Components.NxListItem {
  /**
   * Emitted when the item is clicked
   */
  nxClick: EventEmitter<INxListItemNxListItemClickEventDetail>;
}


@ProxyCmp({
  defineCustomElementFn: defineNxLoader,
  inputs: ['color', 'fullscreen', 'label', 'labelPlacement', 'overlay', 'paused', 'size', 'strokeWidth', 'variant']
})
@Component({
  selector: 'nx-loader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'fullscreen', 'label', 'labelPlacement', 'overlay', 'paused', 'size', 'strokeWidth', 'variant'],
  standalone: true
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
  defineCustomElementFn: defineNxModal,
  inputs: ['animated', 'backdrop', 'centered', 'dismissible', 'header', 'isOpen', 'keyboard', 'scrollable', 'size', 'subHeader', 'zIndex'],
  methods: ['present', 'dismiss']
})
@Component({
  selector: 'nx-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['animated', 'backdrop', 'centered', 'dismissible', 'header', 'isOpen', 'keyboard', 'scrollable', 'size', 'subHeader', 'zIndex'],
  standalone: true
})
export class NxModal {
  protected el: HTMLNxModalElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxPresent', 'nxDismiss', 'nxClose']);
  }
}


import type { NxModalDismissDetail as INxModalNxModalDismissDetail } from '@_nx/stencil-library/components';

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
  defineCustomElementFn: defineNxOption,
  inputs: ['active', 'disabled', 'label', 'selected', 'value'],
  methods: ['getLabel']
})
@Component({
  selector: 'nx-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'disabled', 'label', 'selected', 'value'],
  standalone: true
})
export class NxOption {
  protected el: HTMLNxOptionElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NxOption extends Components.NxOption {}


@ProxyCmp({
  defineCustomElementFn: defineNxProgress,
  inputs: ['animated', 'buffer', 'color', 'indeterminate', 'label', 'max', 'showValue', 'size', 'striped', 'strokeWidth', 'value', 'valueText', 'variant']
})
@Component({
  selector: 'nx-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['animated', 'buffer', 'color', 'indeterminate', 'label', 'max', 'showValue', 'size', 'striped', 'strokeWidth', 'value', 'valueText', 'variant'],
  standalone: true
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
  defineCustomElementFn: defineNxRadio,
  inputs: ['alignment', 'color', 'disabled', 'invalid', 'justify', 'labelPlacement', 'value'],
  methods: ['setFocus', 'setButtonTabindex']
})
@Component({
  selector: 'nx-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alignment', 'color', 'disabled', 'invalid', 'justify', 'labelPlacement', 'value'],
  standalone: true
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
  defineCustomElementFn: defineNxRadioGroup,
  inputs: ['allowEmptySelection', 'compareWith', 'direction', 'disabled', 'errorText', 'helperText', 'invalid', 'label', 'name', 'required', 'value'],
  methods: ['setFocus']
})
@Component({
  selector: 'nx-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['allowEmptySelection', 'compareWith', 'direction', 'disabled', 'errorText', 'helperText', 'invalid', 'label', 'name', 'required', 'value'],
  standalone: true
})
export class NxRadioGroup {
  protected el: HTMLNxRadioGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxChange', 'nxValueChange']);
  }
}


import type { NxRadioGroupChangeEventDetail as INxRadioGroupNxRadioGroupChangeEventDetail } from '@_nx/stencil-library/components';
import type { NxRadioGroupValueChangeEventDetail as INxRadioGroupNxRadioGroupValueChangeEventDetail } from '@_nx/stencil-library/components';

export declare interface NxRadioGroup extends Components.NxRadioGroup {

  nxChange: EventEmitter<INxRadioGroupNxRadioGroupChangeEventDetail>;

  nxValueChange: EventEmitter<INxRadioGroupNxRadioGroupValueChangeEventDetail>;
}


@ProxyCmp({
  defineCustomElementFn: defineNxRow,
  inputs: ['align', 'alignContent', 'columnGap', 'gap', 'justify', 'noGutters', 'rowGap', 'wrap']
})
@Component({
  selector: 'nx-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'alignContent', 'columnGap', 'gap', 'justify', 'noGutters', 'rowGap', 'wrap'],
  standalone: true
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
  defineCustomElementFn: defineNxSelect,
  inputs: ['disabled', 'invalid', 'label', 'name', 'placeholder', 'required', 'success', 'value'],
  methods: ['selectOption', 'setFocus']
})
@Component({
  selector: 'nx-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'invalid', 'label', 'name', 'placeholder', 'required', 'success', 'value'],
  standalone: true
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
  defineCustomElementFn: defineNxSelectOption,
  inputs: ['active', 'disabled', 'selected', 'value']
})
@Component({
  selector: 'nx-select-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'disabled', 'selected', 'value'],
  standalone: true
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
  defineCustomElementFn: defineNxSkeleton,
  inputs: ['animation', 'bg', 'count', 'duration', 'height', 'lastLineWidth', 'loading', 'radius', 'shimmerColor', 'size', 'variant', 'width']
})
@Component({
  selector: 'nx-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['animation', 'bg', 'count', 'duration', 'height', 'lastLineWidth', 'loading', 'radius', 'shimmerColor', 'size', 'variant', 'width'],
  standalone: true
})
export class NxSkeleton {
  protected el: HTMLNxSkeletonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NxSkeleton extends Components.NxSkeleton {}


@ProxyCmp({
  defineCustomElementFn: defineNxTab,
  inputs: ['active', 'badge', 'closable', 'disabled', 'icon', 'label', 'value'],
  methods: ['select', 'close']
})
@Component({
  selector: 'nx-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'badge', 'closable', 'disabled', 'icon', 'label', 'value'],
  standalone: true
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
  defineCustomElementFn: defineNxTabGroup,
  inputs: ['color', 'disabled', 'placement', 'scrollable', 'size', 'stretch', 'value'],
  methods: ['getTabs', 'getSelectedTab', 'selectTab', 'registerTab', 'unregisterTab']
})
@Component({
  selector: 'nx-tab-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'disabled', 'placement', 'scrollable', 'size', 'stretch', 'value'],
  standalone: true
})
export class NxTabGroup {
  protected el: HTMLNxTabGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxChange']);
  }
}


import type { NxTabChangeEventDetail as INxTabGroupNxTabChangeEventDetail } from '@_nx/stencil-library/components';

export declare interface NxTabGroup extends Components.NxTabGroup {
  /**
   * Emitted when the active tab changes
   */
  nxChange: EventEmitter<INxTabGroupNxTabChangeEventDetail>;
}


@ProxyCmp({
  defineCustomElementFn: defineNxTable,
  inputs: ['bordered', 'caption', 'clickableRows', 'color', 'columns', 'currentPage', 'data', 'emptyText', 'hoverable', 'loading', 'loadingText', 'maxHeight', 'pageSize', 'pageSizeOptions', 'paginated', 'rowKey', 'selectable', 'selectedRows', 'selectionMode', 'size', 'sortColumn', 'sortDirection', 'sortable', 'stickyHeader', 'striped', 'totalItems', 'variant'],
  methods: ['selectAll', 'deselectAll', 'getSelectedRows', 'getSelectedKeys', 'setPage', 'sort']
})
@Component({
  selector: 'nx-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['bordered', 'caption', 'clickableRows', 'color', 'columns', 'currentPage', 'data', 'emptyText', 'hoverable', 'loading', 'loadingText', 'maxHeight', 'pageSize', 'pageSizeOptions', 'paginated', 'rowKey', 'selectable', 'selectedRows', 'selectionMode', 'size', 'sortColumn', 'sortDirection', 'sortable', 'stickyHeader', 'striped', 'totalItems', 'variant'],
  standalone: true
})
export class NxTable {
  protected el: HTMLNxTableElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxSort', 'nxSelectionChange', 'nxPageChange', 'nxRowClick']);
  }
}


import type { NxTableSortEventDetail as INxTableNxTableSortEventDetail } from '@_nx/stencil-library/components';
import type { NxTableSelectionEventDetail as INxTableNxTableSelectionEventDetail } from '@_nx/stencil-library/components';
import type { NxTablePageChangeEventDetail as INxTableNxTablePageChangeEventDetail } from '@_nx/stencil-library/components';
import type { NxTableRowClickEventDetail as INxTableNxTableRowClickEventDetail } from '@_nx/stencil-library/components';

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
  defineCustomElementFn: defineNxText,
  inputs: ['align', 'as', 'color', 'inline', 'italic', 'lines', 'size', 'strikethrough', 'transform', 'truncate', 'underline', 'variant', 'weight']
})
@Component({
  selector: 'nx-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'as', 'color', 'inline', 'italic', 'lines', 'size', 'strikethrough', 'transform', 'truncate', 'underline', 'variant', 'weight'],
  standalone: true
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
  defineCustomElementFn: defineNxTextarea,
  inputs: ['autoGrow', 'autocapitalize', 'autofocus', 'cols', 'counter', 'disabled', 'errorText', 'helperText', 'invalid', 'label', 'maxlength', 'minlength', 'name', 'placeholder', 'readonly', 'required', 'resize', 'rows', 'spellcheck', 'success', 'value', 'wrap'],
  methods: ['setInputValue', 'setFocus', 'getInputElement']
})
@Component({
  selector: 'nx-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoGrow', 'autocapitalize', 'autofocus', 'cols', 'counter', 'disabled', 'errorText', 'helperText', 'invalid', 'label', 'maxlength', 'minlength', 'name', 'placeholder', 'readonly', 'required', 'resize', 'rows', 'spellcheck', 'success', 'value', 'wrap'],
  standalone: true
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
  defineCustomElementFn: defineNxTimePicker,
  inputs: ['clearable', 'disabled', 'errorText', 'format', 'helperText', 'invalid', 'label', 'max', 'min', 'minuteStep', 'name', 'placeholder', 'readonly', 'required', 'secondStep', 'showNowButton', 'showSeconds', 'success', 'value'],
  methods: ['setFocus', 'open', 'close']
})
@Component({
  selector: 'nx-time-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clearable', 'disabled', 'errorText', 'format', 'helperText', 'invalid', 'label', 'max', 'min', 'minuteStep', 'name', 'placeholder', 'readonly', 'required', 'secondStep', 'showNowButton', 'showSeconds', 'success', 'value'],
  standalone: true
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
  defineCustomElementFn: defineNxToast,
  inputs: ['actionText', 'animated', 'dismissible', 'duration', 'header', 'icon', 'isOpen', 'message', 'pauseOnHover', 'position', 'showIcon', 'showProgressBar', 'translucent', 'variant'],
  methods: ['present', 'dismiss']
})
@Component({
  selector: 'nx-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['actionText', 'animated', 'dismissible', 'duration', 'header', 'icon', 'isOpen', 'message', 'pauseOnHover', 'position', 'showIcon', 'showProgressBar', 'translucent', 'variant'],
  standalone: true
})
export class NxToast {
  protected el: HTMLNxToastElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxPresent', 'nxDismiss', 'nxAction', 'nxClose']);
  }
}


import type { NxToastDismissDetail as INxToastNxToastDismissDetail } from '@_nx/stencil-library/components';

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
  defineCustomElementFn: defineNxToggle,
  inputs: ['alignment', 'checked', 'color', 'disabled', 'errorText', 'helperText', 'invalid', 'justify', 'label', 'labelPlacement', 'name', 'required', 'size', 'value'],
  methods: ['toggle', 'setFocus']
})
@Component({
  selector: 'nx-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alignment', 'checked', 'color', 'disabled', 'errorText', 'helperText', 'invalid', 'justify', 'label', 'labelPlacement', 'name', 'required', 'size', 'value'],
  standalone: true
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


@ProxyCmp({
  defineCustomElementFn: defineNxTooltip,
  inputs: ['arrow', 'content', 'delay', 'disabled', 'hideDelay', 'maxWidth', 'offset', 'open', 'placement', 'size', 'target', 'trigger', 'variant'],
  methods: ['show', 'hide', 'toggle']
})
@Component({
  selector: 'nx-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['arrow', 'content', 'delay', 'disabled', 'hideDelay', 'maxWidth', 'offset', 'open', 'placement', 'size', 'target', 'trigger', 'variant'],
  standalone: true
})
export class NxTooltip {
  protected el: HTMLNxTooltipElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nxShow', 'nxHide']);
  }
}


export declare interface NxTooltip extends Components.NxTooltip {
  /**
   * Emitted when the tooltip becomes visible.
   */
  nxShow: EventEmitter<void>;
  /**
   * Emitted when the tooltip hides.
   */
  nxHide: EventEmitter<void>;
}



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
  inputs: ['disabled', 'expand', 'fill', 'shape', 'size', 'type']
})
@Component({
  selector: 'nx-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'expand', 'fill', 'shape', 'size', 'type'],
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
  inputs: ['size', 'sizeLg', 'sizeMd', 'sizeSm', 'sizeXl', 'sizeXs']
})
@Component({
  selector: 'nx-col',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['size', 'sizeLg', 'sizeMd', 'sizeSm', 'sizeXl', 'sizeXs'],
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
})
@Component({
  selector: 'nx-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
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
})
@Component({
  selector: 'nx-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
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



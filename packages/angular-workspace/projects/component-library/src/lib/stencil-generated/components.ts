/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from 'stencil-library';


@ProxyCmp({
  inputs: ['disabled', 'expand', 'fill', 'shape', 'type']
})
@Component({
  selector: 'nx-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'expand', 'fill', 'shape', 'type'],
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
  inputs: ['alignment', 'checked', 'disabled', 'justify']
})
@Component({
  selector: 'nx-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alignment', 'checked', 'disabled', 'justify'],
})
export class NxCheckbox {
  protected el: HTMLNxCheckboxElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['checkedChange']);
  }
}


export declare interface NxCheckbox extends Components.NxCheckbox {

  checkedChange: EventEmitter<CustomEvent<boolean>>;
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
  inputs: ['autocapitalize', 'autocomplete', 'autofocus', 'disabled', 'inputmode', 'invalid', 'label', 'maxlength', 'minlength', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'spellcheck', 'success', 'type', 'value'],
  methods: ['setInputValue', 'setFocus', 'getInputElement']
})
@Component({
  selector: 'nx-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autocapitalize', 'autocomplete', 'autofocus', 'disabled', 'inputmode', 'invalid', 'label', 'maxlength', 'minlength', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'spellcheck', 'success', 'type', 'value'],
})
export class NxInput {
  protected el: HTMLNxInputElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['bflInput', 'bflChange', 'bflFocus', 'bflBlur']);
  }
}


export declare interface NxInput extends Components.NxInput {

  bflInput: EventEmitter<CustomEvent<string>>;

  bflChange: EventEmitter<CustomEvent<string>>;

  bflFocus: EventEmitter<CustomEvent<FocusEvent>>;

  bflBlur: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  inputs: ['alignment', 'color', 'disabled', 'justify', 'labelPlacement', 'value'],
  methods: ['setFocus', 'setButtonTabindex']
})
@Component({
  selector: 'nx-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alignment', 'color', 'disabled', 'justify', 'labelPlacement', 'value'],
})
export class NxRadio {
  protected el: HTMLNxRadioElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['bflFocus', 'bflBlur']);
  }
}


export declare interface NxRadio extends Components.NxRadio {

  bflFocus: EventEmitter<CustomEvent<void>>;

  bflBlur: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['allowEmptySelection', 'compareWith', 'disabled', 'errorText', 'helperText', 'invalid', 'name', 'value'],
  methods: ['setFocus']
})
@Component({
  selector: 'nx-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['allowEmptySelection', 'compareWith', 'disabled', 'errorText', 'helperText', 'invalid', 'name', 'value'],
})
export class NxRadioGroup {
  protected el: HTMLNxRadioGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['bflChange', 'bflValueChange']);
  }
}


import type { NxRadioGroupChangeEventDetail as INxRadioGroupNxRadioGroupChangeEventDetail } from 'stencil-library';
import type { NxRadioGroupValueChangeEventDetail as INxRadioGroupNxRadioGroupValueChangeEventDetail } from 'stencil-library';

export declare interface NxRadioGroup extends Components.NxRadioGroup {

  bflChange: EventEmitter<CustomEvent<INxRadioGroupNxRadioGroupChangeEventDetail>>;

  bflValueChange: EventEmitter<CustomEvent<INxRadioGroupNxRadioGroupValueChangeEventDetail>>;
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



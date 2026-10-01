import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  Optional,
  Self,
} from '@angular/core';

import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: 'nx-input[appInrFormat]',
})
export class InrFormatDirective implements OnInit, OnDestroy {
  private valueSub?: Subscription;
  private inputListener?: (event: Event) => void;

  private forwardingRawEvent = false;

  constructor(
    private readonly el: ElementRef,
    @Optional() @Self() private readonly ngControl: NgControl
  ) {}

  ngOnInit(): void {
    /*
     * A formatted value contains commas, therefore the internal
     * native input cannot remain type="number".
     */
    if (this.el.nativeElement.type === 'number') {
      this.el.nativeElement.type = 'text';
    }

    /*
    * Capture nxInput before normal Angular event handlers.
     */
    this.inputListener = (event: Event) => {
      /*
       * Allow the raw event that we dispatch below to pass through.
       */
      if (this.forwardingRawEvent) {
        return;
      }

      const customEvent = event as CustomEvent<string>;

      const value = customEvent.detail ?? '';

      /*
       * Convert whatever nx-input emitted into raw value.
       *
       * "13,31" -> "1331"
       * "1331"  -> "1331"
       */
      const rawValue = this.getRawValue(value);

      /*
      * Stop Angular's existing nxInput listeners from receiving
       * the formatted value.
       */
      event.stopImmediatePropagation();

      /*
       * Update display.
       *
       * nx-input will show:
       *
       * 1331 -> 1,331
       */
      this.formatDisplay(rawValue);

      /*
      * Send a new nxInput event containing the raw value.
       *
       * Angular:
      * (nxInput)="displayAmount($event)"
       *
       * will now receive:
       *
       * $event.detail === "1331"
       */
      this.forwardRawValue(rawValue);
    };

    this.el.nativeElement.addEventListener(
      'nxInput',
      this.inputListener,
      true
    );

    /*
     * Reactive Forms.
     *
     * Handles:
     * - patchValue()
     * - setValue()
     * - reset()
     * - backend values
     */
    const control = this.ngControl?.control;

    if (control) {
      this.valueSub = control.valueChanges.subscribe((value) => {
        this.formatDisplay(value);
      });

      /*
       * Initial value.
       */
      this.formatDisplay(control.value);
    }
  }

  ngOnDestroy(): void {
    this.valueSub?.unsubscribe();

    if (this.inputListener) {
      this.el.nativeElement.removeEventListener(
        'nxInput',
        this.inputListener,
        true
      );
    }
  }

  private forwardRawValue(rawValue: string): void {
    this.forwardingRawEvent = true;

    this.el.nativeElement.dispatchEvent(
      new CustomEvent('nxInput', {
        detail: rawValue,
        bubbles: true,
        composed: true,
      })
    );

    this.forwardingRawEvent = false;
  }

  private getRawValue(value: any): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    return String(value).replace(/,/g, '');
  }

  private formatDisplay(value: any): void {
    const rawValue = this.getRawValue(value);

    if (!rawValue) {
      this.el.nativeElement.value = '';
      return;
    }

    const numberValue = Number(rawValue);

    if (Number.isNaN(numberValue)) {
      this.el.nativeElement.value = '';
      return;
    }

    const formattedValue = new Intl.NumberFormat('en-IN').format(numberValue);

    /*
     * This updates nx-input's displayed value.
     */
    this.el.nativeElement.value = formattedValue;
  }
}

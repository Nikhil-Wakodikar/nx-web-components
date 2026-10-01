import { ElementRef } from '@angular/core';
import { NgControl, NgForm, FormGroupDirective } from '@angular/forms';

export function handleSharedFormSubmit(
  el: ElementRef<any>,
  ngControl: NgControl | null,
  formContainer: NgForm | FormGroupDirective | null,
  syncInvalidFn: () => void
) {
  syncInvalidFn();
}

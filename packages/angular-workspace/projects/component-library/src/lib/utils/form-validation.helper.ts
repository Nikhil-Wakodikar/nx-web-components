import { ElementRef } from '@angular/core';
import { NgControl, NgForm, FormGroupDirective } from '@angular/forms';

export function handleSharedFormSubmit(
  el: ElementRef<any>,
  ngControl: NgControl | null,
  formContainer: NgForm | FormGroupDirective | null,
  syncInvalidFn: () => void
) {
  // 1. Sync the current element's visual invalid state first
  syncInvalidFn();

  if (ngControl && ngControl.invalid && formContainer) {
    const formEl = el.nativeElement.closest('form');
    if (!formEl) return;

    // 2. Query all custom form components in the form container
    const selector = 'nx-input, nx-radio-group, nx-checkbox';
    const allInvalidFields = Array.from(
      formEl.querySelectorAll(selector)
    ).filter((field: any) => {
      const nameAttr =
        field.getAttribute('formControlName') || field.getAttribute('name');
      const ctrl = formContainer.form.get(nameAttr);
      return ctrl ? ctrl.invalid : false;
    });

    // 3. If this exact element is the absolute first error on the page, trigger actions
    if (allInvalidFields[0] === el.nativeElement) {
      // Try to focus the element (ensure your Stencil radio/checkbox components implement setFocus())
      if (typeof el.nativeElement.setFocus === 'function') {
        el.nativeElement.setFocus();
      }

      // 1. Look inside the Stencil component's Shadow DOM
      const shadowRoot = el.nativeElement.shadowRoot;
      if (shadowRoot) {
        // 2. Query only the inner input/control wrapper element
        const targetContainer = shadowRoot.querySelector(
          '.native-wrapper, .radio-buttons-container, .checkbox-wrapper'
        );

        if (targetContainer) {
          // 3. Add the shake animation class exclusively to the inner wrapper
          targetContainer.classList.add('shake');

          // Reset class so it can be re-triggered on next submit attempts
          setTimeout(() => {
            targetContainer.classList.remove('shake');
          }, 400);
        }
      }
    }
  }
}

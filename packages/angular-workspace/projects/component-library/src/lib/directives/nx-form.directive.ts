import { Directive, HostListener, Optional } from '@angular/core';
import { FormGroupDirective, NgForm } from '@angular/forms';

/**
 * Standalone directive that automatically marks all form controls as touched on submit,
 * ensuring NX web components display their invalid states and error text immediately.
 */
@Directive({
  selector: 'form[formGroup], form[formGroupName], form[ngForm]',
  standalone: true,
})
export class NxFormSubmitDirective {
  constructor(
    @Optional() private formGroupDir: FormGroupDirective,
    @Optional() private ngForm: NgForm
  ) {}

  @HostListener('submit')
  onSubmit(): void {
    const form = this.formGroupDir?.form || this.ngForm?.form;
    if (form) {
      form.markAllAsTouched();
    }
  }
}

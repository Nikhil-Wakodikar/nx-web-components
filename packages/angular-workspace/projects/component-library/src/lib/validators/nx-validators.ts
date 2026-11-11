import {
  Directive,
  forwardRef,
  Input,
} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';

/**
 * Custom Angular Validators for NX Components and Reactive Forms.
 */
export class NxValidators {
  /**
   * Validator that requires the control to have a non-empty value.
   */
  static required(control: AbstractControl): ValidationErrors | null {
    return Validators.required(control);
  }

  /**
   * Validator that requires the control's value to be true (for checkboxes and toggles).
   */
  static requiredTrue(control: AbstractControl): ValidationErrors | null {
    return Validators.requiredTrue(control);
  }

  /**
   * Validator that requires the control's value to be a valid email.
   */
  static email(control: AbstractControl): ValidationErrors | null {
    return Validators.email(control);
  }

  /**
   * Validator that requires the length of the control's value to be greater than or equal to the provided minimum length.
   */
  static minLength(minLength: number): ValidatorFn {
    return Validators.minLength(minLength);
  }

  /**
   * Validator that requires the length of the control's value to be less than or equal to the provided maximum length.
   */
  static maxLength(maxLength: number): ValidatorFn {
    return Validators.maxLength(maxLength);
  }

  /**
   * Validator that requires the control's value to match a regex pattern.
   */
  static pattern(pattern: string | RegExp): ValidatorFn {
    return Validators.pattern(pattern);
  }
}

/**
 * Standalone directive for template-driven NX required validation.
 */
@Directive({
  selector: `
    nx-input[nxRequired],
    nx-textarea[nxRequired],
    nx-select[nxRequired],
    nx-checkbox[nxRequired],
    nx-toggle[nxRequired],
    nx-radio-group[nxRequired]
  `,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxRequiredValidatorDirective),
      multi: true,
    },
  ],
  standalone: true,
})
export class NxRequiredValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return NxValidators.required(control);
  }
}

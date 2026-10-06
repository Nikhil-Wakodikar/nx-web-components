import {
  Directive,
  ElementRef,
  HostListener,
  Optional,
  Self,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  NgForm,
  FormGroupDirective,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { handleSharedFormSubmit } from '../utils/form-validation.helper';

@Directive({
  selector: `
      nx-input[formControlName],
      nx-input[formControl],
      nx-input[ngModel],
      nx-select[formControlName],
      nx-select[formControl],
      nx-select[ngModel]
  `,
})
export class InputValueAccessor
  implements ControlValueAccessor, OnInit, OnDestroy
{
  private statusSub!: Subscription;
  private submitSub!: Subscription;
  private formContainer: NgForm | FormGroupDirective | null = null;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(
    private el: ElementRef<any>,
    @Optional() @Self() private ngControl: NgControl,
    @Optional() private ngForm: NgForm,
    @Optional() private formGroupDir: FormGroupDirective
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    this.formContainer = this.ngForm || this.formGroupDir;
  }

  ngOnInit() {
    if (!this.ngControl) return;

    if (this.ngControl.statusChanges) {
      this.statusSub = this.ngControl.statusChanges.subscribe(() => {
        this.syncInvalidState();
      });
    }

    if (this.formContainer) {
      this.submitSub = this.formContainer.ngSubmit.subscribe(() => {
        handleSharedFormSubmit(
          this.el,
          this.ngControl,
          this.formContainer,
          () => this.syncInvalidState()
        );
      });
    }
  }

  ngOnDestroy() {
    if (this.statusSub) this.statusSub.unsubscribe();
    if (this.submitSub) this.submitSub.unsubscribe();
  }

  writeValue(value: any): void {
    this.el.nativeElement.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }

  @HostListener('nxInput', ['$event.detail'])
  handleInput(value: any) {
    this.onChange(value);
    this.syncInvalidState();
  }

  @HostListener('nxBlur')
  handleBlur() {
    this.onTouched();
    this.syncInvalidState();
  }

  private syncInvalidState(): void {
    if (!this.ngControl) return;
    const isSubmitted = this.formContainer
      ? this.formContainer.submitted
      : false;
    const isInvalid = !!(
      this.ngControl.invalid &&
      (this.ngControl.touched || this.ngControl.dirty || isSubmitted)
    );
    this.el.nativeElement.invalid = isInvalid;
  }
}

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { DIRECTIVES } from './stencil-generated';
import { defineCustomElements } from 'stencil-library/loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateFormatDirective } from './directives/date-format-directive';
import { InrFormatDirective } from './directives/inr-format.directive';
import { NxCheckboxValueAccessor } from './stencil-generated/checkbox-value-accessor';
import { InputValueAccessor } from './stencil-generated/input-value-accessor';
import { RadioGroupValueAccessorDirective } from './stencil-generated/radio-group-value-accessor';

@NgModule({
  declarations: [
    DateFormatDirective,
    InrFormatDirective,
    RadioGroupValueAccessorDirective,
    InputValueAccessor,
    NxCheckboxValueAccessor,
    ...DIRECTIVES,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    DateFormatDirective,
    InrFormatDirective,
    RadioGroupValueAccessorDirective,
    NxCheckboxValueAccessor,
    InputValueAccessor,
    ...DIRECTIVES,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        return defineCustomElements;
      },
      multi: true,
    },
  ],
})
export class ComponentLibraryModule {}

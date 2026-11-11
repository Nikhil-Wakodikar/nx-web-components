import { APP_INITIALIZER, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { defineCustomElements } from '@_nx/stencil-library/loader';

import { DIRECTIVES } from './stencil-generated';
import { BooleanValueAccessor } from './stencil-generated/boolean-value-accessor';
import { TextValueAccessor } from './stencil-generated/text-value-accessor';
import { RadioValueAccessor } from './stencil-generated/radio-value-accessor';
import { NxEventPlugin } from './plugins/nx-event.plugin';
import { NxDialogService, NxModalService } from './services/nx-dialog.service';
import { NxFormSubmitDirective } from './directives/nx-form.directive';
import { NxRequiredValidatorDirective } from './validators/nx-validators';

if (typeof window !== 'undefined') {
  defineCustomElements();
}

export const NX_VALUE_ACCESSORS: Type<any>[] = [
  RadioValueAccessor,
  TextValueAccessor,
  BooleanValueAccessor,
];

export const NX_CUSTOM_DIRECTIVES: Type<any>[] = [
  NxFormSubmitDirective,
  NxRequiredValidatorDirective,
];

export const NX_ALL_DIRECTIVES: Type<any>[] = [
  ...DIRECTIVES,
  ...NX_VALUE_ACCESSORS,
  ...NX_CUSTOM_DIRECTIVES,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...NX_ALL_DIRECTIVES,
  ],
  exports: [
    ...NX_ALL_DIRECTIVES,
  ],
  providers: [
    NxDialogService,
    NxModalService,
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        return () => {
          if (typeof window !== 'undefined') {
            defineCustomElements();
          }
        };
      },
      multi: true,
    },
    {
      provide: EVENT_MANAGER_PLUGINS,
      useClass: NxEventPlugin,
      multi: true,
    },
  ],
})
export class ComponentLibraryModule {
  constructor() {
    if (typeof window !== 'undefined') {
      defineCustomElements();
    }
  }
}

/**
 * Modern alias for ComponentLibraryModule
 */
export const NxComponentLibraryModule = ComponentLibraryModule;

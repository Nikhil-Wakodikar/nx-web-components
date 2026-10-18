import { APP_INITIALIZER, NgModule } from '@angular/core';
import { DIRECTIVES } from './stencil-generated';
import { defineCustomElements } from 'stencil-library/loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { BooleanValueAccessor } from './stencil-generated/boolean-value-accessor';
import { TextValueAccessor } from './stencil-generated/text-value-accessor';
import { RadioValueAccessor } from './stencil-generated/radio-value-accessor';
import { NxEventPlugin } from './plugins/nx-event.plugin';

import { NxDialogService, NxModalService } from './services/nx-dialog.service';

@NgModule({
  declarations: [
    RadioValueAccessor,
    TextValueAccessor,
    BooleanValueAccessor,
    ...DIRECTIVES,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    RadioValueAccessor,
    BooleanValueAccessor,
    TextValueAccessor,
    ...DIRECTIVES,
  ],
  providers: [
    NxDialogService,
    NxModalService,
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        return defineCustomElements;
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
export class ComponentLibraryModule {}

import {
  EnvironmentProviders,
  makeEnvironmentProviders,
  APP_INITIALIZER,
} from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { defineCustomElements } from '@_nx/stencil-library/loader';
import { NxEventPlugin } from './plugins/nx-event.plugin';
import { NxDialogService, NxModalService } from './services/nx-dialog.service';

export interface NxWebComponentsConfig {
  /**
   * Whether to automatically call defineCustomElements() during application initialization.
   * Defaults to true.
   */
  defineCustomElements?: boolean;
}

/**
 * Modern Angular EnvironmentProviders for NX Web Components.
 * Use this in standalone applications:
 *
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideNxWebComponents()
 *   ]
 * });
 * ```
 */
export function provideNxWebComponents(
  config: NxWebComponentsConfig = { defineCustomElements: true }
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        return () => {
          if (config.defineCustomElements !== false && typeof window !== 'undefined') {
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
    NxDialogService,
    NxModalService,
  ]);
}

/*
 * Public API Surface of @_nx/stencil-library/angular
 */

// Module & Directives collections
export * from './lib/component-library.module';
export { DIRECTIVES } from './lib/stencil-generated';

// Standalone Component Proxies
export * from './lib/stencil-generated/components';

// Custom ValueAccessors for Reactive Forms and ngModel
export * from './lib/stencil-generated/boolean-value-accessor';
export * from './lib/stencil-generated/radio-value-accessor';
export * from './lib/stencil-generated/text-value-accessor';

// Modern Providers & Plugins
export * from './lib/providers';
export * from './lib/plugins/nx-event.plugin';

// Services
export * from './lib/services/nx-dialog.service';

// Custom Directives & Validators
export * from './lib/validators/nx-validators';
export * from './lib/directives/nx-form.directive';
export * from './lib/utils/form-validation.helper';

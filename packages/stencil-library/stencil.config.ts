import { Config } from '@stencil/core';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'stencil-library',
  globalStyle: 'src/styles/global.scss',
  outputTargets: [
    // By default, the generated proxy components will
    // leverage the output from the `dist` target, so we
    // need to explicitly define that output alongside the
    // Angular target
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [{ src: 'global/fonts', dest: 'fonts' }],
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        { src: 'global/fonts', dest: 'fonts' }, // Copy fonts to the output directory
      ],
    },
    angularOutputTarget({
      componentCorePackage: 'stencil-library',
      outputType: 'component',
      directivesProxyFile: '../angular-workspace/projects/component-library/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../angular-workspace/projects/component-library/src/lib/stencil-generated/index.ts',
    }),
  ],
  plugins: [
    sass({
      injectGlobalPaths: ['src/global/variables.scss'],
    }),
  ],
  testing: {
    browserHeadless: 'new',
  },
};

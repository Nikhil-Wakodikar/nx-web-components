import { join, dirname } from 'path';

const { RetryChunkLoadPlugin } = require('webpack-retry-chunk-load-plugin');

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}

/** @type { import('@storybook/web-components-webpack5').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  features: {
    storyStoreV7: false,
  },
  addons: [getAbsolutePath('@storybook/addon-webpack5-compiler-swc'), getAbsolutePath('@storybook/addon-essentials'), getAbsolutePath('@chromatic-com/storybook')],
  framework: {
    name: getAbsolutePath('@storybook/web-components-webpack5'),
    options: {},
  },
  webpackFinal: async (cfg) => {
    cfg.plugins = cfg.plugins || [];
    cfg.plugins.push(
      new RetryChunkLoadPlugin({
        retryDelay: 1000,
        maxRetries: 3,
      })
    );
    return cfg;
  },
};
export default config;

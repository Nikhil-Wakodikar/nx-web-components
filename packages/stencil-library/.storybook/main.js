import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}

/** @type { import('@storybook/web-components-webpack5').StorybookConfig } */
const config = {
  stories: [
    '../src/stories/**/*.mdx',
    '../src/stories/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
    getAbsolutePath('@storybook/addon-essentials'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/web-components-webpack5'),
    options: {},
  },
};
export default config;

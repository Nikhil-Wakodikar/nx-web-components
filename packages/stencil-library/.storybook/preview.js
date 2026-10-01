import { defineCustomElements } from '../loader';
import '../dist/stencil-library/stencil-library.css';
import './preview.css';

defineCustomElements(window);

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  parameters: {
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      }
    },
    order: ['NX Web Components'],
    storySort: {
    },
  },
};


export default preview;

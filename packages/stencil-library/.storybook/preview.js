import { setCustomElements } from '@storybook/web-components';
import { defineCustomElements } from '../loader';
import customElements from './custom-elements.json';
import '../dist/stencil-library/stencil-library.css';
import './preview.css';

// Register Stencil web components
defineCustomElements(window);

// Set Custom Elements metadata for Storybook docs & args table
if (customElements) {
  setCustomElements(customElements);
}

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  parameters: {
    layout: 'padded',
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      extractArgTypes: true,
    },
    options: {
      storySort: {
        order: ['NX Web Components', ['Overview', 'Components']],
      },
    },
  },
};

export default preview;

import { defineCustomElements } from '../loader';
import './preview.css';
import { getBinding } from '../src/stories/storybook-helpers';

defineCustomElements();

/**
 * Automatically generate Angular-style code snippets for all components
 * This applies globally unless a component has its own custom transform
 */
const globalSourceTransform = (code, storyContext) => {
  const { component, args } = storyContext;
  
  // Skip if component doesn't have a tag name
  if (!component) return code;
  
  // Generate property bindings
  const properties = Object.keys(args)
    .filter(key => args[key] !== undefined && args[key] !== null && args[key] !== '')
    .map(key => `  ${getBinding(key, args[key])}`)
    .join('\n');
  
  // Generate final code
  if (properties) {
    return `<${component}\n${properties}>\n</${component}>`;
  }
  
  return `<${component}></${component}>`;
};

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  parameters: {
    
    layout: 'padded', // Use Storybook's inbuilt layout for all stories
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      source: {
        transform: globalSourceTransform,
        language: 'html',
        format: true, // Auto-format code snippets
      },
      toc: {
        disable: false,
        headingSelector: 'h2, h3 ', // Only show h2 and h3 in TOC
        ignoreSelector: '.docs-story', // Ignore story headings
        title: 'Table of Contents',
      }     
    },
    options: {
      storySort: {
        order: ['Form Generator', 'UI', 'Components'],
      },
     },
    },
  };


export default preview;

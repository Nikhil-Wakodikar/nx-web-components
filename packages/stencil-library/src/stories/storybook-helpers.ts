/**
 * Storybook Helper Utilities
 * 
 * Universal helper functions for generating Angular-style code snippets
 * in Storybook documentation for nested components.
 * 
 * Usage:
 * Import this helper in story files that have nested component structures
 * and need custom source code transforms.
 * 
 * @example
 * ```typescript
 * import { getBinding } from '../../stories';
 * 
 * parameters: {
 *   docs: {
 *     source: {
 *       transform: (_code, storyContext) => {
 *         const { args } = storyContext;
 *         return `<bfl-accordian
 *   ${getBinding('multi', args.multi)}>
 *   <bfl-accordian-panel ${getBinding('title', 'Header 1')}>
 *     <p>Content</p>
 *   </bfl-accordian-panel>
 * </bfl-accordian>`;
 *       }
 *     }
 *   }
 * }
 * ```
 */

/**
 * Generates Angular-style property binding syntax based on value type
 * 
 * Type Conversions:
 * - Boolean/Number: `[propName]="value"` (property binding)
 * - String: `propName="value"` (attribute binding)
 * - Array/Object: `[propName]='jsonValue'` (property binding with JSON)
 * 
 * @param propName - The property name to bind
 * @param value - The value to bind (any type)
 * @returns Angular-style binding string
 * 
 * @example
 * ```typescript
 * getBinding('multi', true) // returns: [multi]="true"
 * getBinding('label', 'Name') // returns: label="Name"
 * getBinding('options', [1, 2]) // returns: [options]='[1,2]'
 * ```
 */
export const getBinding = (propName: string, value: any): string => {
  // Skip undefined or null values - return empty string
  if (value === undefined || value === null) {
    return '';
  }
  
  const type = typeof value;
  
  // Boolean or Number: use property binding [prop]="value"
  if (type === 'boolean' || type === 'number') {
    return `[${propName}]="${value}"`;
  }
  
  // String: use attribute binding prop="value"
  if (type === 'string') {
    return `${propName}="${value}"`;
  }
  
  // Array or Object: use property binding with JSON
  if (Array.isArray(value) || (type === 'object' && value !== null)) {
    return `[${propName}]='${JSON.stringify(value)}'`;
  }
  
  // Default fallback for undefined/null
  return `${propName}="${value}"`;
};

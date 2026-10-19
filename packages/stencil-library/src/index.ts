/**
 * @fileoverview entry point for your component library
 *
 * This is the entry point for your component library. Use this file to export utilities,
 * constants or data structure that accompany your components.
 *
 * DO NOT use this file to export your components. Instead, use the recommended approaches
 * to consume components of this package as outlined in the `README.md`.
 */
export { format } from './utils/utils';
export type * from './components.d.ts';
export type { NxToastPosition, NxToastVariant, NxToastDismissDetail } from './components/nx-toast/nx-toast';
export type { NxModalSize, NxModalDismissDetail } from './components/nx-modal/nx-modal';
export type {
  NxTabGroupPlacement,
  NxTabGroupSize,
  NxTabGroupColor,
  NxTabChangeEventDetail,
  NxTabElement,
} from './components/nx-tab-group/nx-tab-group';

# NX Web Components (`@_nx/stencil-library`)

[![npm version](https://img.shields.io/npm/v/@_nx/stencil-library.svg)](https://www.npmjs.com/package/@_nx/stencil-library)
[![Storybook Docs](https://img.shields.io/badge/Storybook-Live_Docs-ff4785.svg?logo=storybook&logoColor=white)](https://nikhil-wakodikar.github.io/nx-web-components/?path=/docs/nx-web-components-select--docs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, highly accessible enterprise UI component library built with [Stencil](https://stenciljs.com). Delivers lightweight, encapsulated, standard-compliant Web Components featuring customizable design tokens, CSS custom variables, and shadow DOM `::part()` styling.

---

## 📚 Interactive Storybook Documentation

Explore live interactive examples, properties, events, CSS variables, and shadow parts for all 34 components:

👉 [**https://nikhil-wakodikar.github.io/nx-web-components/**](https://nikhil-wakodikar.github.io/nx-web-components/?path=/docs/nx-web-components-select--docs)

---

## 📦 Installation

```bash
npm install @_nx/stencil-library
```

For first-class Angular integration with typed directives and Reactive Forms support, install the companion package:

```bash
npm install @_nx/component-library @_nx/stencil-library
```

---

## 🚀 Setup & Integration

### 1. Global Styles & Design Tokens

Import the global design system stylesheet into your project's main stylesheet (e.g. `src/styles.scss` or `src/styles.css`):

```scss
@import '@_nx/stencil-library/styles.css';
```

### 2. Custom Element Registration

Initialize and register the component custom elements in your application's entry bootstrap file (e.g. `src/main.ts`):

```typescript
import { defineCustomElements } from '@_nx/stencil-library/loader';

defineCustomElements();
```

---

## 🅰️ Angular Integration

Using our official wrapper **[`@_nx/component-library`](https://www.npmjs.com/package/@_nx/component-library)**:

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComponentLibraryModule } from '@_nx/component-library';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ComponentLibraryModule, ReactiveFormsModule],
  template: `
    <nx-card>
      <nx-text variant="h3">User Profile</nx-text>
      
      <nx-input 
        label="Username" 
        [formControl]="usernameCtrl"
        placeholder="Enter username">
      </nx-input>

      <nx-divider></nx-divider>

      <nx-button variant="primary" (nxClick)="onSave()">Save</nx-button>
    </nx-card>
  `
})
export class AppComponent {
  usernameCtrl = new FormControl('');

  onSave() {
    console.log('Username:', this.usernameCtrl.value);
  }
}
```

---

## 🎨 Custom Styling & Theming

### 1. CSS Custom Properties (Variables)

Configure global theme tokens or target individual components:

```css
:root {
  --nx-color-primary: #8145b5;
  --nx-color-primary-hover: #6c32a0;
  --nx-border-radius: 8px;
  --nx-font-family: 'Inter', system-ui, sans-serif;
}

/* Custom styling for specific components */
nx-select {
  --background: #fdfbfe;
  --border-color: #8145b5;
  --label-color: #4a154b;
  --option-background-hover: #f3e8ff;
  --option-color-selected: #8145b5;
}
```

### 2. Shadow Parts (`::part`)

All components expose shadow parts for deep CSS styling without piercing encapsulation:

```css
nx-select::part(trigger) {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

nx-select::part(panel) {
  border-radius: 12px;
}

nx-badge::part(badge) {
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

---

## 🧩 Available Components (34)

| Category | Elements |
|---|---|
| **Forms & Input** | `nx-button`, `nx-input`, `nx-checkbox`, `nx-radio`, `nx-radio-group`, `nx-select`, `nx-select-option`, `nx-textarea`, `nx-toggle`, `nx-date-picker`, `nx-time-picker` |
| **Status & Feedback** | `nx-badge`, `nx-chip`, `nx-loader`, `nx-progress`, `nx-skeleton`, `nx-toast`, `nx-divider` |
| **Containers & Layout** | `nx-card`, `nx-grid`, `nx-row`, `nx-col`, `nx-list`, `nx-list-item`, `nx-table` |
| **Navigation & Modals** | `nx-accordion`, `nx-accordion-group`, `nx-tab`, `nx-tab-group`, `nx-link`, `nx-modal` |
| **Typography & Icons** | `nx-text`, `nx-label`, `nx-icon` |

---

## 🛠️ Publishing

```bash
# Build the library
npm run build

# Publish to npm registry
npm publish --access public
```

---

## License

MIT © [Nikhil Wakodikar](https://github.com/Nikhil-Wakodikar/nx-web-components)

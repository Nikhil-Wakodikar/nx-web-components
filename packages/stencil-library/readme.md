# NX Web Components (`@_nx/stencil-library`)

[![npm version](https://img.shields.io/npm/v/@_nx/stencil-library.svg)](https://www.npmjs.com/package/@_nx/stencil-library)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, accessible, and framework-independent UI library of Web Components built with [Stencil](https://stenciljs.com).

---

## ⚡ Quick Start (Vanilla JS & HTML)

### 1. Install

```bash
npm install @_nx/stencil-library
```

### 2. Register Components & Styles

Import styles and call `defineCustomElements()` in your main entry file (`main.js` or `index.js`):

```javascript
// Import styles and design tokens
import '@_nx/stencil-library/styles.css';

// Register web components with browser
import { defineCustomElements } from '@_nx/stencil-library/loader';
defineCustomElements();
```

### 3. Use in HTML

```html
<nx-card>
  <nx-text variant="h2">Welcome to NX</nx-text>
  <nx-input label="Full Name" placeholder="John Doe"></nx-input>
  <nx-button variant="primary">Get Started</nx-button>
</nx-card>
```

---

## 🌐 Using via CDN (Plain HTML)

You can also use the components directly in any HTML file without build tools:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>NX Web Components</title>

  <!-- Global Styles -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@_nx/stencil-library/dist/stencil-library/stencil-library.css" />

  <!-- Component Loader -->
  <script type="module" src="https://cdn.jsdelivr.net/npm/@_nx/stencil-library/dist/stencil-library/stencil-library.esm.js"></script>
</head>
<body>
  <div style="padding: 24px; max-width: 480px;">
    <nx-card>
      <nx-text variant="h3">Sign In</nx-text>
      <nx-input label="Email" type="email" placeholder="user@example.com"></nx-input>
      <nx-button variant="primary" id="btn">Submit</nx-button>
    </nx-card>
  </div>

  <script>
    document.getElementById('btn').addEventListener('nxClick', () => {
      alert('Button clicked!');
    });
  </script>
</body>
</html>
```

---

## 🅰️ Using in Angular

For Angular projects, use our official Angular wrapper package **[`@_nx/component-library`](https://www.npmjs.com/package/@_nx/component-library)**:

```bash
npm install @_nx/component-library @_nx/stencil-library
```

### 1. Global Styles
In `src/styles.css` (or `src/styles.scss`):
```scss
@import '@_nx/stencil-library/styles.css';
```

### 2. Register Loader
In `src/main.ts`:
```typescript
import { defineCustomElements } from '@_nx/stencil-library/loader';
defineCustomElements();
```

### 3. In Standalone Components (Angular 17, 18, 19, 20+)
Import `ComponentLibraryModule` in the `imports` array of your component:

```typescript
import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@_nx/component-library';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ComponentLibraryModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
```

### 4. Template
```html
<nx-card>
  <nx-input label="Email" placeholder="Enter email"></nx-input>
  <nx-button variant="primary">Submit</nx-button>
</nx-card>
```

---

## 🧩 Common Component Examples

### Buttons
```html
<nx-button variant="primary">Primary</nx-button>
<nx-button variant="secondary">Secondary</nx-button>
<nx-button variant="outline">Outline</nx-button>
<nx-button variant="danger">Delete</nx-button>
<nx-button disabled>Disabled</nx-button>
```

### Inputs & Toggles
```html
<nx-input label="Username" placeholder="Enter username" required></nx-input>
<nx-checkbox label="Remember me" checked></nx-checkbox>
<nx-toggle label="Enable notifications"></nx-toggle>
```

### Accordion
```html
<nx-accordion-group>
  <nx-accordion header="Section 1" open>
    <p>Content for section 1</p>
  </nx-accordion>
  <nx-accordion header="Section 2">
    <p>Content for section 2</p>
  </nx-accordion>
</nx-accordion-group>
```

### Grid & Layout
```html
<nx-grid>
  <nx-row>
    <nx-col span="6">Left Column</nx-col>
    <nx-col span="6">Right Column</nx-col>
  </nx-row>
</nx-grid>
```

---

## 🎨 Theming with CSS Variables

Customise the look & feel using CSS variables:

```css
:root {
  --nx-color-primary: #8145b5;
  --nx-color-primary-hover: #6c32a0;
  --nx-border-radius: 8px;
  --nx-font-family: 'Inter', system-ui, sans-serif;
}
```

---

## 📚 Available Components (32)

| Category | Elements |
|---|---|
| **Forms & Input** | `nx-button`, `nx-input`, `nx-checkbox`, `nx-radio`, `nx-radio-group`, `nx-select`, `nx-select-option`, `nx-textarea`, `nx-toggle`, `nx-date-picker`, `nx-time-picker` |
| **Status & Feedback** | `nx-badge`, `nx-chip`, `nx-loader`, `nx-progress`, `nx-toast` |
| **Containers & Layout** | `nx-card`, `nx-grid`, `nx-row`, `nx-col`, `nx-list`, `nx-list-item`, `nx-table` |
| **Navigation & Modals** | `nx-accordion`, `nx-accordion-group`, `nx-tab`, `nx-tab-group`, `nx-link`, `nx-modal` |
| **Typography & Icons** | `nx-text`, `nx-label`, `nx-icon` |

---

## License

MIT © [Nikhil Wakodikar](https://github.com/Nikhil-Wakodikar/nx-web-components)

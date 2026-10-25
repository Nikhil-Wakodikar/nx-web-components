# NX Web Components & Angular Design System

[![npm version (@_nx/component-library)](https://img.shields.io/npm/v/@_nx/component-library.svg?label=@_nx/component-library)](https://www.npmjs.com/package/@_nx/component-library)
[![npm version (@_nx/stencil-library)](https://img.shields.io/npm/v/@_nx/stencil-library.svg?label=@_nx/stencil-library)](https://www.npmjs.com/package/@_nx/stencil-library)
[![Storybook Docs](https://img.shields.io/badge/Storybook-Live_Docs-ff4785.svg?logo=storybook&logoColor=white)](https://nikhil-wakodikar.github.io/nx-web-components/?path=/docs/nx-web-components-select--docs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, highly accessible enterprise design system and Web Component library built with [Stencil](https://stenciljs.com) and first-party [Angular](https://angular.dev) Ivy wrapper integration.

---

## 📚 Storybook Documentation

Explore our interactive component playground, live documentation, accessibility details, design tokens, CSS custom variables, and shadow part customizations:

👉 [**Interactive Storybook Documentation**](https://nikhil-wakodikar.github.io/nx-web-components/?path=/docs/nx-web-components-select--docs)

---

## 📦 Packages in this Monorepo

| Package | Description | NPM |
|---|---|---|
| **[`@_nx/component-library`](packages/angular-workspace/projects/component-library)** | First-party Angular wrapper components and directives with full Reactive Forms & ControlValueAccessor integration. | [![npm](https://img.shields.io/npm/v/@_nx/component-library.svg)](https://www.npmjs.com/package/@_nx/component-library) |
| **[`@_nx/stencil-library`](packages/stencil-library)** | Core Web Components built with Stencil featuring shadow DOM encapsulation, CSS custom properties, and `::part` styling. | [![npm](https://img.shields.io/npm/v/@_nx/stencil-library.svg)](https://www.npmjs.com/package/@_nx/stencil-library) |

---

## 🚀 Angular Quick Start

### 1. Installation

Install both the Angular wrapper and core components:

```bash
npm install @_nx/component-library @_nx/stencil-library
```

### 2. Configure Global Styles

Import the core design tokens and component styles in your application's `src/styles.scss` (or `src/styles.css`):

```scss
@import '@_nx/stencil-library/styles.css';
```

### 3. Register Custom Element Loader

Initialize the Web Components in your application entry point (`src/main.ts`):

```typescript
import { defineCustomElements } from '@_nx/stencil-library/loader';

defineCustomElements();
```

### 4. Use in Standalone Angular Components

Import `ComponentLibraryModule` in your component's `imports` array:

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
      <nx-text variant="h2">Account Settings</nx-text>
      
      <nx-input 
        label="Email Address" 
        [formControl]="emailControl"
        placeholder="user@example.com">
      </nx-input>

      <nx-divider></nx-divider>

      <nx-button variant="primary" (nxClick)="onSave()">
        Save Changes
      </nx-button>
    </nx-card>
  `
})
export class AppComponent {
  emailControl = new FormControl('');

  onSave() {
    console.log('Saved:', this.emailControl.value);
  }
}
```

### 5. Use in NgModule-based Angular Apps

If using traditional Angular modules, import `ComponentLibraryModule` into your `AppModule`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentLibraryModule } from '@_nx/component-library';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentLibraryModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

---

## 🎨 Custom Styling & Theming

Every component supports complete design customization through:

1. **CSS Custom Properties (Variables)**:
```scss
:root {
  --nx-color-primary: #8145b5;
  --nx-color-primary-hover: #6c32a0;
  --nx-border-radius: 8px;
}

/* Component-level overrides */
nx-select {
  --background: #faf7fd;
  --border-color: #8145b5;
  --label-color: #5c2d82;
}
```

2. **CSS Shadow Parts (`::part`)**:
```scss
nx-select::part(trigger) {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(129, 69, 181, 0.15);
}

nx-select::part(panel) {
  backdrop-filter: blur(8px);
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

## 🛠️ Monorepo Development & Publishing Scripts

Run these commands from the monorepo root:

| Command | Description |
|---|---|
| `npm run build:stencil` | Builds Stencil web components and regenerates Angular proxies |
| `npm run build:angular` | Compiles the `@_nx/component-library` Angular package |
| `npm run storybook` | Starts the Storybook development server |
| `npm run build-storybook` | Builds the static Storybook deployment |
| `npm run publish:stencil` | Publishes `@_nx/stencil-library` to npm |
| `npm run publish:angular` | Publishes `@_nx/component-library` to npm |

---

## License

MIT © [Nikhil Wakodikar](https://github.com/Nikhil-Wakodikar/nx-web-components)

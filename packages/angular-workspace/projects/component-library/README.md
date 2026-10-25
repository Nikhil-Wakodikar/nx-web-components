# NX Angular Component Library (`@_nx/component-library`)

[![npm version](https://img.shields.io/npm/v/@_nx/component-library.svg)](https://www.npmjs.com/package/@_nx/component-library)
[![Storybook Docs](https://img.shields.io/badge/Storybook-Live_Docs-ff4785.svg?logo=storybook&logoColor=white)](https://nikhil-wakodikar.github.io/nx-web-components/?path=/docs/nx-web-components-select--docs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Official Angular wrapper library for **[`@_nx/stencil-library`](https://www.npmjs.com/package/@_nx/stencil-library)**. Provides native Angular component directives, event bindings, form control integration (`ReactiveFormsModule` / `FormsModule`), and dialog services.

---

## 📚 Interactive Storybook Documentation

Explore interactive examples, props, and design token customizations in our live documentation:

👉 [**https://nikhil-wakodikar.github.io/nx-web-components/**](https://nikhil-wakodikar.github.io/nx-web-components/?path=/docs/nx-web-components-select--docs)

---

## 📦 Installation

Install both the Angular wrapper and core components:

```bash
npm install @_nx/component-library @_nx/stencil-library
```

---

## 🚀 Setup & Usage

### 1. Global Styles
In `src/styles.css` (or `src/styles.scss`):
```scss
@import '@_nx/stencil-library/styles.css';
```

### 2. Register Custom Elements
In `src/main.ts`:
```typescript
import { defineCustomElements } from '@_nx/stencil-library/loader';

defineCustomElements();
```

### 3. In Standalone Components (Angular 17, 18, 19, 20+)
Import `ComponentLibraryModule` in your component's `imports` array:

```typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ComponentLibraryModule } from '@_nx/component-library';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ComponentLibraryModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');
  emailControl = new FormControl('');
}
```

### 4. In NgModule-based Apps
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentLibraryModule } from '@_nx/component-library';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentLibraryModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

---

## 🧩 Form Controls & Event Binding Example

```html
<nx-card>
  <!-- Reactive Forms -->
  <nx-input [formControl]="emailControl" label="Email"></nx-input>

  <!-- Template-driven forms -->
  <nx-checkbox [(ngModel)]="rememberMe" label="Remember me"></nx-checkbox>

  <!-- Event Handling -->
  <nx-button variant="primary" (nxClick)="onSave()">Save Changes</nx-button>
</nx-card>
```

---

## 🛠️ Publishing

```bash
# Build the Angular library from root
npm run build:angular

# Publish the generated dist package to npm
npm run publish:angular
```

---

## License

MIT © [Nikhil Wakodikar](https://github.com/Nikhil-Wakodikar/nx-web-components)

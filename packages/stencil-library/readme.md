# NX Web Components (`@_nx/stencil-library`)

[![npm version](https://img.shields.io/npm/v/@_nx/stencil-library.svg)](https://www.npmjs.com/package/@_nx/stencil-library)
[![Storybook Docs](https://img.shields.io/badge/Storybook-Live_Docs-ff4785.svg?logo=storybook&logoColor=white)](https://nikhil-wakodikar.github.io/nx-web-components/?path=/docs/nx-web-components-overview--docs)
[![Angular Support](https://img.shields.io/badge/Angular-%3E%3D16.0.0-dd0031.svg?logo=angular&logoColor=white)](https://angular.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An enterprise-grade UI design system and Web Component library built with [Stencil](https://stenciljs.com) and packaged with first-party **Angular (v16+)** Ivy wrappers in a single package.

Delivers lightweight, encapsulated, standard-compliant components with standalone Angular component proxies, automatic `ControlValueAccessor` integration for Reactive Forms and `ngModel`, custom form validation sync, programmatic dialog/modal services, and flexible CSS custom properties.

---

## 📚 Interactive Storybook Documentation

Explore live interactive examples, properties, events, CSS variables, and shadow parts:

👉 [**https://nikhil-wakodikar.github.io/nx-web-components/?path=/docs/nx-web-components-overview--docs**](https://nikhil-wakodikar.github.io/nx-web-components/?path=/docs/nx-web-components-overview--docs)

---

## 📦 Installation

Install everything with a single npm command:

```bash
npm install @_nx/stencil-library
```

> **Single Package Architecture**: Both the core Web Components and the typed Angular Ivy wrappers (`@_nx/stencil-library/angular`) are included in `@_nx/stencil-library`. You do not need any separate wrapper package.

---

## 🎨 Global Styles & Typography

Import the global design system stylesheet into your Angular application's global stylesheet (e.g. `src/styles.scss`):

```scss
@import "@_nx/stencil-library/styles.css";

// Optional: Customize theme tokens and root font family
:root {
  --nx-font-family: 'Poppins', sans-serif;
  --nx-color-primary: #8145b5;
  --nx-color-primary-hover: #6c32a0;
  --nx-border-radius: 8px;
}

body {
  font-family: var(--nx-font-family);
}
```

---

## 🚀 Application Setup

### Standalone Angular Applications (Recommended, Angular 16+)

In your `src/main.ts`, register the custom element loader using `provideNxWebComponents()`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideNxWebComponents } from '@_nx/stencil-library/angular';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideNxWebComponents(),
    // other application providers
  ]
}).catch(err => console.error(err));
```

### NgModule Applications

If your application uses traditional `NgModule`, import `NxComponentLibraryModule`:

```typescript
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NxComponentLibraryModule } from '@_nx/stencil-library/angular';
import { AppComponent } from './app/app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NxComponentLibraryModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

---

## 🧩 Standalone Component Usage

All Angular component proxies are standalone and can be imported directly into any standalone component:

```typescript
import { Component } from '@angular/core';
import { NxButton, NxCard, NxBadge } from '@_nx/stencil-library/angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NxButton, NxCard, NxBadge],
  template: `
    <nx-card>
      <h2>Dashboard <nx-badge variant="success">Active</nx-badge></h2>
      <p>Manage your account settings and preferences.</p>
      
      <!-- Native (click) works directly -->
      <nx-button variant="primary" (click)="onSave()">Save Changes</nx-button>
    </nx-card>
  `
})
export class DashboardComponent {
  onSave() {
    console.log('Button clicked!');
  }
}
```

---

## 📝 Reactive Forms & ngModel Integration

All input components (`nx-input`, `nx-checkbox`, `nx-radio`, `nx-radio-group`, `nx-select`, `nx-textarea`, `nx-toggle`, `nx-autocomplete`, `nx-date-picker`, `nx-time-picker`) have built-in `ControlValueAccessor` implementations that automatically sync Angular form states (`touched`, `dirty`, `invalid`, `disabled`):

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { 
  NxInput, 
  NxCheckbox, 
  NxButton, 
  NxValidators 
} from '@_nx/stencil-library/angular';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, NxInput, NxCheckbox, NxButton],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <nx-input 
        formControlName="email" 
        label="Email Address" 
        type="email"
        placeholder="user@example.com">
      </nx-input>

      <nx-input 
        formControlName="password" 
        label="Password" 
        type="password">
      </nx-input>

      <nx-checkbox formControlName="rememberMe">
        Remember me
      </nx-checkbox>

      <nx-button type="submit" variant="primary" [disabled]="loginForm.invalid">
        Log In
      </nx-button>
    </form>
  `
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false, [NxValidators.requiredTrue]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form data:', this.loginForm.value);
    }
  }
}
```

---

## ⚡ Event Handling in Angular

You can use both standard native DOM events and custom typed component events:

| Interaction | Event Binding | Payload (`$event`) | Description |
|---|---|---|---|
| **Clicking** | `(click)="onClick($event)"` | Native `MouseEvent` | Standard browser click event on buttons, links, cards, list items. |
| **Typing** | `(input)="onInput($event)"`<br />`(nxInput)="text = $event"` | Native `InputEvent`<br />Directly the `string` value | Keystroke input events. |
| **Focus / Blur** | `(nxFocus)="onFocus($event)"`<br />`(nxBlur)="onBlur($event)"` | `FocusEvent`<br />`FocusEvent` | Crosses Shadow DOM boundary cleanly. |
| **Selection change** | `(nxChange)="onChange($event)"` | Typed selection value | Emitted on select, radio, toggle, and checkbox change. |
| **Keyboard** | `(keydown.enter)="onEnter()"` | Native `KeyboardEvent` | Standard Angular keyboard event filtering. |

---

## 🪟 Programmatic Dialog & Modal Services

Open modal dialogs dynamically from TypeScript using `NxDialogService`:

```typescript
import { Component, inject } from '@angular/core';
import { NxDialogService, NxButton } from '@_nx/stencil-library/angular';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [NxButton],
  template: `
    <nx-button variant="danger" (click)="onDeleteAccount()">
      Delete Account
    </nx-button>
  `
})
export class AccountSettingsComponent {
  private dialog = inject(NxDialogService);

  onDeleteAccount() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { 
        title: 'Delete Account', 
        message: 'Are you sure you want to permanently delete your account?' 
      },
      width: '420px'
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        console.log('Account deleted');
      }
    });
  }
}
```

---

## 🛠️ Publishing

```bash
# Build the library and Angular integration
npm run build

# Publish to npm registry
npm publish --access public
```

---

## License

MIT © [Nikhil Wakodikar](https://github.com/Nikhil-Wakodikar/nx-web-components)

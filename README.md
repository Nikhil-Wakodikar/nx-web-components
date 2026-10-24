# NX Web Components Monorepo

Welcome to the **NX Web Components** workspace:
- **`@_nx/stencil-library`** ([`packages/stencil-library`](packages/stencil-library)): Core accessible Web Components built with [Stencil](https://stenciljs.com).
- **`@_nx/component-library`** ([`packages/angular-workspace/projects/component-library`](packages/angular-workspace/projects/component-library)): First-party Angular wrapper components and directives with Reactive Forms support.
- **Storybook Documentation**: Interactive component explorer and design token showcase.

---

## 📦 Packages & Quick Installation

### 1. Web Components (Plain HTML & Vanilla JS)
```bash
npm install @_nx/stencil-library
```

```javascript
import '@_nx/stencil-library/styles.css';
import { defineCustomElements } from '@_nx/stencil-library/loader';

defineCustomElements();
```
```html
<nx-button variant="primary">Click Me</nx-button>
```

### 2. Angular Wrapper Library
```bash
npm install @_nx/component-library @_nx/stencil-library
```

**Angular Standalone Setup:**
```typescript
import { ComponentLibraryModule } from '@_nx/component-library';

@Component({
  imports: [ComponentLibraryModule],
})
export class App {}
```

---

## 🛠️ Monorepo Development Scripts

From repository root:

| Command | Description |
|---|---|
| `npm run build:stencil` | Builds the Stencil web components and regenerates Angular proxies |
| `npm run build:angular` | Builds the Angular component library |
| `npm run storybook` | Starts the Storybook dev server on port 6006 |
| `npm run build-storybook` | Compiles Storybook static site |
| `npm run publish:stencil` | Publishes `@_nx/stencil-library` to npm |
| `npm run publish:angular` | Publishes `@_nx/component-library` to npm |

---

## License

MIT © [Nikhil Wakodikar](https://github.com/Nikhil-Wakodikar/nx-web-components)

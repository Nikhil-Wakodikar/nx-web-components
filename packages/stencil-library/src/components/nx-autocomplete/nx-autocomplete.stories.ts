import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

const countryOptions = [
  { label: 'United States', value: 'US' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'Canada', value: 'CA' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' },
  { label: 'Japan', value: 'JP' },
  { label: 'Australia', value: 'AU' },
  { label: 'India', value: 'IN' },
  { label: 'Brazil', value: 'BR' },
  { label: 'Netherlands', value: 'NL' },
  { label: 'Sweden', value: 'SE' },
  { label: 'Switzerland', value: 'CH' },
];

const fruitOptions = [
  'Apple',
  'Apricot',
  'Avocado',
  'Banana',
  'Blackberry',
  'Blueberry',
  'Cherry',
  'Coconut',
  'Cranberry',
  'Dragonfruit',
  'Grape',
  'Grapefruit',
  'Guava',
  'Kiwi',
  'Lemon',
  'Lime',
  'Mango',
  'Orange',
  'Papaya',
  'Peach',
  'Pear',
  'Pineapple',
  'Pomegranate',
  'Raspberry',
  'Strawberry',
  'Watermelon',
];

/**
 * `<nx-autocomplete>` is an accessible, high-performance combobox with live filtering,
 * keyboard navigation, match highlighting, and complete CSS custom property theming.
 */
const meta: Meta = {
  title: 'NX Web Components/Autocomplete',
  component: 'nx-autocomplete',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-autocomplete>\` component combines a text input with an interactive suggestions dropdown.
It conforms to the W3C WAI-ARIA combobox pattern, supporting full keyboard navigation (arrows, Enter, Escape, Home, End),
live search filtering, option match highlighting, clear action, and custom slot adornments.

---

### How to Use Custom Styling

\`<nx-autocomplete>\` encapsulates styles using Shadow DOM. You can customize the appearance via
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--background\` | Field background color | \`transparent\` |
| \`--background-hover\` | Field background on hover | \`transparent\` |
| \`--background-focus\` | Field background when focused | \`transparent\` |
| \`--background-disabled\` | Field background when disabled | \`#f1f5f9\` |
| \`--color\` | Text color | \`#0f172a\` |
| \`--placeholder-color\` | Placeholder text color | \`#64748b\` |
| \`--border-color\` | Default border color | \`#cbd5e1\` |
| \`--border-hover-color\` | Border color on hover | \`#64748b\` |
| \`--border-focus-color\` | Focus border & ring color | \`#8145b5\` |
| \`--border-error-color\` | Border color when invalid | \`#dc2626\` |
| \`--border-success-color\` | Border color when success | \`#16a34a\` |
| \`--border-radius\` | Control corner radius | \`0.25rem (4px)\` |
| \`--control-height\` | Height of input control | \`3rem (48px)\` |
| \`--padding-start\` | Left padding of input | \`0.875rem (14px)\` |
| \`--padding-end\` | Right padding of input | \`0.875rem (14px)\` |
| \`--caret-color\` | Text cursor color | \`#8145b5\` |
| \`--panel-background\` | Dropdown panel background | \`#ffffff\` |
| \`--panel-border-color\` | Dropdown panel border color | \`#cbd5e1\` |
| \`--panel-border-radius\` | Dropdown panel corner radius | \`0.25rem (4px)\` |
| \`--panel-box-shadow\` | Dropdown panel shadow | \`none\` |
| \`--panel-max-height\` | Maximum height of dropdown panel | \`15rem (240px)\` |
| \`--option-background-hover\` | Option hover background | \`#f6f0fa\` |
| \`--option-background-selected\` | Option selected background | \`#f6f0fa\` |
| \`--option-color-selected\` | Option selected text color | \`#8145b5\` |
| \`--option-highlight-color\` | Matching query text color | \`#8145b5\` |
| \`--checkmark-color\` | Checkmark icon color | \`#8145b5\` |
| \`--loader-color\` | Spinner loader color | \`#8145b5\` |

#### 2. Shadow Parts Styling (\`::part\`)
- \`::part(control)\`: The outer box containing input, prefix, suffix, and actions.
- \`::part(input)\`: The native HTML \`<input>\` element.
- \`::part(label)\`: The label text displayed above the control.
- \`::part(start)\`: The start slot container for prefix icons or content.
- \`::part(end)\`: The end container holding slots, clear button, and chevron.
- \`::part(clear-button)\`: The clear "x" button.
- \`::part(dropdown-button)\`: The dropdown chevron toggle button.
- \`::part(loader)\`: The loading spinner container.
- \`::part(panel)\`: The floating dropdown list container.
- \`::part(option)\`: Each suggestion item in the list.
- \`::part(option-highlight)\`: The matched text segment inside an option.
- \`::part(option-checkmark)\`: The checkmark icon on selected options.
- \`::part(no-results)\`: The empty state message.
- \`::part(footer)\`: The footer container for helper/error text.
- \`::part(helper-text)\`: The helper message text.
- \`::part(error-text)\`: The error message text.

#### 3. Usage Pattern
\`\`\`html
<nx-autocomplete
  label="Country"
  placeholder="Type to search countries..."
  .options="\${countries}"
></nx-autocomplete>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label text displayed above the input',
      defaultValue: 'Choose Country',
    },
    value: {
      control: 'text',
      description: 'Current string value of the autocomplete',
      defaultValue: '',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when field is empty',
      defaultValue: 'Start typing country name...',
    },
    helperText: {
      control: 'text',
      description: 'Supporting guidance message shown below field',
      defaultValue: 'Select your country of residence',
    },
    errorText: {
      control: 'text',
      description: 'Error message shown when invalid is true',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user interaction and dims the control',
      defaultValue: false,
    },
    readonly: {
      control: 'boolean',
      description: 'Prevents editing while keeping focusable',
      defaultValue: false,
    },
    required: {
      control: 'boolean',
      description: 'Displays required asterisk and applies aria-required',
      defaultValue: false,
    },
    invalid: {
      control: 'boolean',
      description: 'Applies error visual border and shows error text',
      defaultValue: false,
    },
    success: {
      control: 'boolean',
      description: 'Applies success visual border',
      defaultValue: false,
    },
    clearable: {
      control: 'boolean',
      description: 'Shows clear ("x") button when input has text',
      defaultValue: true,
    },
    openOnFocus: {
      control: 'boolean',
      description: 'Automatically opens dropdown when input is focused',
      defaultValue: false,
    },
    showDropdownIcon: {
      control: 'boolean',
      description: 'Shows chevron toggle button at end of input',
      defaultValue: true,
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner indicator',
      defaultValue: false,
    },
    minChars: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Minimum characters typed before opening suggestions list',
      defaultValue: 0,
    },
    maxResults: {
      control: { type: 'number', min: 0, max: 50 },
      description: 'Limit on number of suggestions displayed (0 = unlimited)',
      defaultValue: 0,
    },
    filterMode: {
      control: 'select',
      options: ['contains', 'startsWith', 'custom'],
      description: 'Client-side filtering algorithm',
      defaultValue: 'contains',
    },
    highlightMatch: {
      control: 'boolean',
      description: 'Highlights matching letters in option labels',
      defaultValue: true,
    },
    noResultsText: {
      control: 'text',
      description: 'Text shown when no options match query',
      defaultValue: 'No matching options found',
    },
  },
};

export default meta;

export const Playground: StoryObj = {
  args: {
    label: 'Country Search',
    placeholder: 'Type a country (e.g. United, Canada)...',
    helperText: 'Type to filter from 12 popular countries',
    value: '',
    options: countryOptions,
    disabled: false,
    readonly: false,
    required: false,
    invalid: false,
    success: false,
    clearable: true,
    openOnFocus: false,
    showDropdownIcon: true,
    loading: false,
    minChars: 0,
    maxResults: 0,
    filterMode: 'contains',
    highlightMatch: true,
    noResultsText: 'No matching options found',
  },
  render: (args) => html`
    <div style="max-width: 24rem; margin: 1.5rem auto;">
      <nx-autocomplete
        label=${ifDefined(args.label)}
        value=${ifDefined(args.value)}
        placeholder=${ifDefined(args.placeholder)}
        helper-text=${ifDefined(args.helperText)}
        error-text=${ifDefined(args.errorText)}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?required=${args.required}
        ?invalid=${args.invalid}
        ?success=${args.success}
        ?clearable=${args.clearable}
        ?open-on-focus=${args.openOnFocus}
        ?show-dropdown-icon=${args.showDropdownIcon}
        ?loading=${args.loading}
        min-chars=${ifDefined(args.minChars)}
        max-results=${ifDefined(args.maxResults)}
        filter-mode=${ifDefined(args.filterMode)}
        ?highlight-match=${args.highlightMatch}
        no-results-text=${ifDefined(args.noResultsText)}
        .options=${args.options}
      ></nx-autocomplete>
    </div>
  `,
};

export const SlottedOptions: StoryObj = {
  render: () => html`
    <div style="max-width: 24rem; margin: 1.5rem auto;">
      <nx-autocomplete
        label="Country (Slotted <nx-option>)"
        placeholder="Type to search country..."
        helper-text="Using child <nx-option> elements"
        ?clearable=${true}
        ?show-dropdown-icon=${true}
      >
        <svg
          slot="start"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>

        <nx-option value="United States">United States</nx-option>
        <nx-option value="United Kingdom">United Kingdom</nx-option>
        <nx-option value="Canada">Canada</nx-option>
        <nx-option value="Germany">Germany</nx-option>
        <nx-option value="France">France</nx-option>
        <nx-option value="Japan">Japan</nx-option>
        <nx-option value="Australia">Australia</nx-option>
        <nx-option value="India">India</nx-option>
        <nx-option value="Brazil">Brazil</nx-option>
      </nx-autocomplete>
    </div>
  `,
};

export const ObjectOptions: StoryObj = {
  render: () => html`
    <div style="max-width: 24rem; margin: 1.5rem auto;">
      <nx-autocomplete
        label="Select Country"
        placeholder="Search countries..."
        helper-text="Options passed as { label, value } objects"
        .options=${countryOptions}
      ></nx-autocomplete>
    </div>
  `,
};

export const StringOptions: StoryObj = {
  render: () => html`
    <div style="max-width: 24rem; margin: 1.5rem auto;">
      <nx-autocomplete
        label="Favorite Fruit"
        placeholder="Type a fruit name..."
        helper-text="Options passed as a simple string array"
        .options=${fruitOptions}
      ></nx-autocomplete>
    </div>
  `,
};

export const OpenOnFocus: StoryObj = {
  render: () => html`
    <div style="max-width: 24rem; margin: 1.5rem auto;">
      <nx-autocomplete
        label="Instant Dropdown"
        placeholder="Click here to open immediately"
        helper-text="Dropdown opens immediately when clicked or focused"
        ?open-on-focus=${true}
        .options=${countryOptions}
      ></nx-autocomplete>
    </div>
  `,
};

export const WithPrefixSlot: StoryObj = {
  render: () => html`
    <div style="max-width: 24rem; margin: 1.5rem auto;">
      <nx-autocomplete
        label="Search with Icon"
        placeholder="Search destination..."
        helper-text="Includes a search icon in slot='start'"
        .options=${countryOptions}
      >
        <svg
          slot="start"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </nx-autocomplete>
    </div>
  `,
};

export const AsyncLoading: StoryObj = {
  render: () => html`
    <div style="max-width: 24rem; margin: 1.5rem auto;">
      <nx-autocomplete
        label="Live Async Search"
        value="United"
        placeholder="Fetching results from server..."
        helper-text="Shows spinner indicator while fetching remote data"
        ?loading=${true}
        .options=${countryOptions}
      ></nx-autocomplete>
    </div>
  `,
};

export const ValidationStates: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 24rem; margin: 1.5rem auto;">
      <nx-autocomplete
        label="Error State"
        value="Atlantis"
        ?invalid=${true}
        error-text="Country not recognized in our database"
        .options=${countryOptions}
      ></nx-autocomplete>

      <nx-autocomplete
        label="Success State"
        value="Canada"
        ?success=${true}
        helper-text="Country verified successfully"
        .options=${countryOptions}
      ></nx-autocomplete>
    </div>
  `,
};

export const DisabledAndReadonly: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 24rem; margin: 1.5rem auto;">
      <nx-autocomplete
        label="Disabled Autocomplete"
        value="United States"
        ?disabled=${true}
        helper-text="Cannot be interacted with"
        .options=${countryOptions}
      ></nx-autocomplete>

      <nx-autocomplete
        label="Readonly Autocomplete"
        value="Germany"
        ?readonly=${true}
        helper-text="Readable and selectable but not editable"
        .options=${countryOptions}
      ></nx-autocomplete>
    </div>
  `,
};

export const CustomStyling: StoryObj = {
  render: () => html`
    <style>
      .custom-autocomplete-pill {
        --border-radius: 9999px;
        --border-color: #6366f1;
        --border-focus-color: #4f46e5;
        --focus-ring: 3px solid rgba(99, 102, 241, 0.25);
        --caret-color: #4f46e5;
        --option-background-hover: #eef2ff;
        --option-background-selected: #e0e7ff;
        --option-color-selected: #4338ca;
        --option-highlight-color: #4f46e5;
        --checkmark-color: #4f46e5;
        --panel-border-radius: 1rem;
        --panel-box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.15), 0 8px 10px -6px rgba(99, 102, 241, 0.1);
      }
    </style>
    <div style="max-width: 24rem; margin: 1.5rem auto;">
      <nx-autocomplete
        class="custom-autocomplete-pill"
        label="Pill Theme"
        placeholder="Type fruit name..."
        helper-text="Fully customized with CSS custom properties (pill radius, indigo theme)"
        .options=${fruitOptions}
      ></nx-autocomplete>
    </div>
  `,
};

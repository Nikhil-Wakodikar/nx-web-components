import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-link>` is an accessible navigation link component wrapping HTML `<a>` tags.
 * It provides underline behavior modes, sizes, start/end icon slots, external link indicators,
 * and CSS custom property styling.
 */
const meta: Meta = {
  title: 'NX Web Components/Link',
  component: 'nx-link',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-link>\` component standardizes hyperlink behavior, visual states, and icons.
It supports:
- **Underline Modes**: \`hover\` (default), \`always\`, or \`none\`.
- **External Links**: When \`external\` is true or \`target="_blank"\`, automatically appends an external link indicator icon and adds secure \`rel="noopener noreferrer"\`.
- **Slots**: \`start\` and \`end\` slots for icons or badges.

---

### How to Use Custom Styling

\`<nx-link>\` encapsulates its styles using Shadow DOM. You can customize link styles via
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--color\` | Default link text color | \`#8145b5\` |
| \`--color-hover\` | Hover text color | \`#6e389c\` |
| \`--color-active\` | Active / pressed text color | \`#5b2e81\` |
| \`--color-focused\` | Focus outline / text color | \`#6e389c\` |
| \`--font-size\` | Font size override | Set by size preset |
| \`--font-weight\` | Font weight override | \`500\` |
| \`--underline-offset\` | Distance between text and underline | \`2px\` |
| \`--gap\` | Gap between slotted icons and label | \`6px\` |

#### 2. Shadow Parts Styling (\`::part\`)
- \`::part(native)\`: Targets the inner \`<a>\` element.
- \`::part(content)\`: Targets the link content wrapper.
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Link label text',
      defaultValue: 'Explore Documentation',
    },
    href: {
      control: 'text',
      description: 'Destination URL of the hyperlink',
      defaultValue: 'https://github.com',
    },
    target: {
      control: 'select',
      options: [undefined, '_blank', '_self', '_parent', '_top'],
      description: 'Browsing context for opening the link',
    },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
      description: 'Underline decoration visibility',
      table: { defaultValue: { summary: 'hover' } },
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'medium', 'large'],
      description: 'Font size preset',
      table: { defaultValue: { summary: 'default' } },
    },
    color: {
      control: 'color',
      description: 'Custom text color override',
    },
    external: {
      control: 'boolean',
      description: 'Indicates link points to an external destination with an icon',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables link navigation and dims opacity',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    label: 'Explore Documentation',
    href: 'https://github.com',
    underline: 'hover',
    size: 'default',
    external: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nx-link
      .label=${args.label}
      .href=${args.href}
      .target=${args.target}
      .underline=${args.underline}
      .size=${args.size}
      .color=${args.color}
      ?external=${args.external}
      ?disabled=${args.disabled}
      @nxClick=${(e: CustomEvent) => console.log('nxClick:', e)}
    ></nx-link>
  `,
};

export const UnderlineVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <nx-link href="#" underline="hover" label="Hover Underline (Default)"></nx-link>
      <nx-link href="#" underline="always" label="Always Underlined"></nx-link>
      <nx-link href="#" underline="none" label="Never Underlined"></nx-link>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 20px; align-items: baseline;">
      <nx-link href="#" size="small" label="Small (14px)"></nx-link>
      <nx-link href="#" size="default" label="Default (16px)"></nx-link>
      <nx-link href="#" size="medium" label="Medium (16px)"></nx-link>
      <nx-link href="#" size="large" label="Large (18px)"></nx-link>
    </div>
  `,
};

export const ExternalAndDownload: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <nx-link href="https://github.com" target="_blank" external label="External Documentation"></nx-link>
      <nx-link href="/assets/report.pdf" download="report.pdf" label="Download Annual Report (PDF)">
        <nx-icon slot="start" name="download" size="16"></nx-icon>
      </nx-link>
    </div>
  `,
};

export const WithSlots: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <nx-link href="#">
        <nx-icon slot="start" name="arrow-left" size="16"></nx-icon>
        Back to Dashboard
      </nx-link>

      <nx-link href="#">
        View User Profile
        <nx-icon slot="end" name="arrow-right" size="16"></nx-icon>
      </nx-link>

      <nx-link href="#" color="#059669">
        <nx-icon slot="start" name="check-circle-2" size="16"></nx-icon>
        Operational Status
      </nx-link>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <nx-link
        href="#"
        style="
          --color: #0284c7;
          --color-hover: #0369a1;
          --font-weight: 700;
          --underline-offset: 4px;
        "
        underline="always"
        label="Sky Blue Heavy Link"
      ></nx-link>

      <nx-link
        href="#"
        style="
          --color: #ec4899;
          --color-hover: #be185d;
          font-style: italic;
        "
        label="Pink Italicized Link"
      ></nx-link>
    </div>
  `,
};


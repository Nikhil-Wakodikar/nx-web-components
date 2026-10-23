import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-card>` is a flexible container component used to present structured content,
 * media, actions, and grouped information. It provides elevated, flat, and outlined
 * variants, built-in media, header, and footer slots, hover animations, and complete CSS theming.
 */
const meta: Meta = {
  title: 'NX Web Components/Card',
  component: 'nx-card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-card>\` component organizes related content into a distinct visual card unit.
It supports:
- **Card Variants**: \`elevated\` (with shadow), \`outlined\` (with subtle border), and \`flat\` (tinted background).
- **Flexible Slots**: \`media\` (for top banners, images, or video), \`header\`, default (body), and \`footer\`.
- **Link Card**: Setting \`href\` renders the card as an interactive anchor link.
- **Interactivity**: \`hoverable\` elevates the card on hover with smooth transitions.

---

### How to Use Custom Styling

\`<nx-card>\` uses Shadow DOM encapsulation. You can customize its styling using
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--nx-card-background\` | Card background color | \`#ffffff\` |
| \`--nx-card-color\` | Default body text color | \`#0f172a\` |
| \`--nx-card-border-color\` | Border color (for outlined cards) | \`#e2e8f0\` |
| \`--nx-card-border-radius\` | Outer corner radius | \`8px\` |
| \`--nx-card-shadow\` | Box shadow for elevated cards | \`0 1px 3px rgb(0 0 0 / 0.08)\` |
| \`--nx-card-shadow-hover\` | Hover elevation shadow | \`0 4px 6px -1px rgb(0 0 0 / 0.1)\` |
| \`--nx-card-flat-background\` | Background for flat cards | \`#f1f5f9\` |
| \`--padding\` | Overall card padding fallback | \`16px\` |
| \`--header-padding\` | Card header padding | \`16px 20px\` |
| \`--body-padding\` | Card body padding | \`20px\` |
| \`--footer-padding\` | Card footer padding | \`16px 20px\` |
| \`--title\` | Title color | \`var(--color, #0f172a)\` |

#### 2. Shadow Parts Styling (\`::part\`)
- \`::part(media)\`: Targets the top media/image container.
- \`::part(header)\`: Targets the card header element.
- \`::part(title)\`: Targets the card title heading.
- \`::part(subtitle)\`: Targets the secondary subtitle text.
- \`::part(body)\`: Targets the main content area.
- \`::part(footer)\`: Targets the card footer container.
        `,
      },
    },
  },
  argTypes: {
    headerTitle: {
      control: 'text',
      description: 'Card title rendered in the header',
      defaultValue: 'Card Title',
    },
    subtitle: {
      control: 'text',
      description: 'Sub-heading rendered below the title',
      defaultValue: 'Card Subtitle',
    },
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'flat'],
      description: 'Visual container style variant',
      table: { defaultValue: { summary: 'elevated' } },
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
      description: 'Internal content padding preset',
      table: { defaultValue: { summary: 'medium' } },
    },
    hoverable: {
      control: 'boolean',
      description: 'Enables hover elevation and cursor pointer',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables card interactions and dims visual opacity',
      table: { defaultValue: { summary: 'false' } },
    },
    href: {
      control: 'text',
      description: 'Optional URL turns the card into a clickable hyperlink',
    },
  },
  args: {
    headerTitle: 'Card Title',
    subtitle: 'Card Subtitle',
    variant: 'elevated',
    padding: 'medium',
    hoverable: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width: 400px;">
      <nx-card
        .headerTitle=${args.headerTitle}
        .subtitle=${args.subtitle}
        .variant=${args.variant}
        .padding=${args.padding}
        ?hoverable=${args.hoverable}
        ?disabled=${args.disabled}
        .href=${args.href}
      >
        <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6;">
          Cards contain content and actions about a single subject. They should be easy to scan for relevant and actionable information.
        </p>
        <div slot="footer" style="display: flex; justify-content: flex-end; gap: 8px;">
          <nx-button fill="clear" size="small">Cancel</nx-button>
          <nx-button fill="solid" size="small">Confirm</nx-button>
        </div>
      </nx-card>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
      <nx-card variant="elevated" headerTitle="Elevated Card" subtitle="Default elevation shadow">
        <p style="margin: 0; font-size: 14px; color: #64748b;">
          Elevated cards provide depth and hierarchy using soft drop shadows. Best for primary standalone cards.
        </p>
      </nx-card>

      <nx-card variant="outlined" headerTitle="Outlined Card" subtitle="1px subtle border">
        <p style="margin: 0; font-size: 14px; color: #64748b;">
          Outlined cards provide clean distinction without casting shadows. Best for grouped dashboard widgets.
        </p>
      </nx-card>

      <nx-card variant="flat" headerTitle="Flat Card" subtitle="Neutral surface fill">
        <p style="margin: 0; font-size: 14px; color: #64748b;">
          Flat cards blend seamlessly with surface background colors. Great for secondary nested elements.
        </p>
      </nx-card>
    </div>
  `,
};

export const WithMediaBanner: Story = {
  render: () => html`
    <div style="max-width: 380px;">
      <nx-card hoverable variant="elevated">
        <div slot="media" style="height: 160px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); display: flex; align-items: center; justify-content: center; color: white;">
          <nx-icon name="image" size="48"></nx-icon>
        </div>
        <div slot="header" style="padding-top: 12px;">
          <h3 style="margin: 0 0 4px; font-size: 18px; font-weight: 600; color: #0f172a;">Stunning Destinations</h3>
          <p style="margin: 0; font-size: 13px; color: #64748b;">Discover the most scenic places on Earth</p>
        </div>
        <p style="margin: 12px 0 0; font-size: 14px; color: #475569; line-height: 1.5;">
          From tropical archipelagos to towering alpine ranges, explore our curated travel guides.
        </p>
        <div slot="footer" style="display: flex; align-items: center; justify-content: space-between;">
          <nx-badge variant="subtle" color="success" value="Popular"></nx-badge>
          <nx-button fill="outline" size="small">Explore</nx-button>
        </div>
      </nx-card>
    </div>
  `,
};

export const PaddingOptions: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
      <nx-card padding="none" variant="outlined" headerTitle="Padding: None">
        <p style="margin: 12px; font-size: 13px; color: #64748b;">Zero internal padding.</p>
      </nx-card>
      <nx-card padding="small" variant="outlined" headerTitle="Padding: Small">
        <p style="margin: 0; font-size: 13px; color: #64748b;">Compact padding.</p>
      </nx-card>
      <nx-card padding="medium" variant="outlined" headerTitle="Padding: Medium">
        <p style="margin: 0; font-size: 13px; color: #64748b;">Default balanced padding.</p>
      </nx-card>
      <nx-card padding="large" variant="outlined" headerTitle="Padding: Large">
        <p style="margin: 0; font-size: 13px; color: #64748b;">Spacious airy padding.</p>
      </nx-card>
    </div>
  `,
};

export const InteractiveAndLink: Story = {
  render: () => html`
    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
      <nx-card hoverable style="max-width: 320px;" headerTitle="Hoverable Card" subtitle="Hover to see elevation">
        <p style="margin: 0; font-size: 14px; color: #64748b;">
          Cards with <code>hoverable</code> automatically elevate their drop shadow and show a pointer cursor.
        </p>
      </nx-card>

      <nx-card hoverable href="https://stenciljs.com" target="_blank" style="max-width: 320px;" headerTitle="Link Card" subtitle="Click to visit stenciljs.com">
        <p style="margin: 0; font-size: 14px; color: #64748b;">
          Setting <code>href</code> renders the card as a full-surface hyperlink.
        </p>
      </nx-card>

      <nx-card disabled style="max-width: 320px;" headerTitle="Disabled Card" subtitle="Interactions blocked">
        <p style="margin: 0; font-size: 14px; color: #64748b;">
          Disabled cards have muted opacity and ignore user clicks.
        </p>
      </nx-card>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; flex-wrap: wrap;">
      <!-- Dark Card -->
      <nx-card
        style="
          max-width: 340px;
          --nx-card-background: #0f172a;
          --nx-card-color: #94a3b8;
          --title: #f8fafc;
          --nx-card-border-radius: 16px;
          --nx-card-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
        "
        headerTitle="Dark Mode Card"
        subtitle="Custom dark theme container"
      >
        <p style="margin: 0; font-size: 14px; line-height: 1.6;">
          Customized entirely via CSS custom properties for sleek dark UI dashboards.
        </p>
        <div slot="footer">
          <nx-button fill="solid" color="primary" size="small">Take Action</nx-button>
        </div>
      </nx-card>

      <!-- Vibrant Gradient Border Card -->
      <nx-card
        variant="outlined"
        style="
          max-width: 340px;
          --nx-card-border-color: #ec4899;
          --nx-card-border-radius: 12px;
          --title: #831843;
        "
        headerTitle="Vibrant Accent"
        subtitle="Styled border and title colors"
      >
        <p style="margin: 0; font-size: 14px; color: #475569;">
          Custom borders make important notices or callout panels stand out immediately.
        </p>
      </nx-card>
    </div>
  `,
};


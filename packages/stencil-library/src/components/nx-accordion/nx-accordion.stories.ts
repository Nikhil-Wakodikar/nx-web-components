import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-accordion>` and `<nx-accordion-group>` are accessible, collapsible components
 * designed for organizing complex content into vertically expandable sections.
 * They support single and multi-expansion modes, leading and custom toggle icons,
 * custom header and content slots, trailing badges, multiple visual variants,
 * and comprehensive CSS Custom Property styling.
 */
const meta: Meta = {
  title: 'NX Web Components/Accordion',
  component: 'nx-accordion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The accordion system comprises two complementary components:
- **\`<nx-accordion>\`**: An individual collapsible item with a clickable header and an animated content container.
- **\`<nx-accordion-group>\`**: A parent container that manages single or multi-item expansion, visual variants, and display modes.

---

### Custom Header & Content Slots

Rather than using only the \`header="..."\` attribute, you can pass rich HTML directly using **\`slot="header"\`** and **\`slot="content"\`**:

\`\`\`html
<nx-accordion-group (nxChange)="changeAcc($event)">
  <nx-accordion value="first">
    <span slot="header"> What is NX Web Components? </span>
    <div slot="content">
      <p style="margin: 0">
        NX Web Components is a framework-agnostic design system built with
        Stencil and distributed with first-class Angular bindings.
      </p>
    </div>
  </nx-accordion>

  <nx-accordion value="second" icon="user-round-key">
    <span slot="header">User Authentication & Security</span>
    <div slot="content">
      <p style="margin: 0">
        Easily manage multi-factor authentication, sessions, and security
        permissions.
      </p>
    </div>
  </nx-accordion>

  <nx-accordion value="third" toggleIcon="panel-bottom-open">
    <span slot="header" style="display: inline-flex; align-items: center;">
      <nx-icon style="margin-right: 8px" name="user-round-key"></nx-icon>
      Custom Header via slot="header"
    </span>
    <div slot="content">
      <p style="margin: 0">
        Both header and body content are provided cleanly via
        <code>slot="header"</code> and <code>slot="content"</code> with 12px
        padding.
      </p>
    </div>
  </nx-accordion>
</nx-accordion-group>
\`\`\`

---

### How to Use Custom Styling

Both \`<nx-accordion>\` and \`<nx-accordion-group>\` use Shadow DOM encapsulation and provide
a rich **Public Styling API** via **CSS Custom Properties** and **CSS Shadow Parts** (\`::part\`).

#### 1. CSS Custom Properties for \`<nx-accordion>\`

| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--background\` | Background color of the accordion | \`var(--nx-color-white, #ffffff)\` |
| \`--color\` | Header and body primary text color | \`var(--nx-color-gray-900, #0f172a)\` |
| \`--border-color\` | Outer border and separator color | \`var(--nx-color-gray-200, #e2e8f0)\` |
| \`--border-active-color\` | Border color when accordion is open | \`var(--border-color)\` |
| \`--border-width\` | Border thickness | \`1px\` |
| \`--border-radius\` | Corner radius | \`8px\` |
| \`--header-padding\` | Inner padding of the clickable header | \`12px\` |
| \`--content-padding\` | Inner padding of the body content | \`12px\` |
| \`--icon-size\` | Size of leading and toggle icons | \`20px\` |
| \`--icon-color\` | Leading icon color | \`#0f172a\` |
| \`--header-icon-active-color\` | Leading icon color when expanded | \`var(--icon-color)\` |
| \`--toggle-icon-color\` | Expand/collapse chevron icon color | \`#64748b\` |
| \`--hover-background\` | Header background on hover | \`#f8fafc\` |
| \`--accent-color\` | Accent bar indicator & focus outline color | \`var(--nx-color-primary, #8145b5)\` |
| \`--font-family\` | Font family | \`var(--font-rubik, sans-serif)\` |

#### 2. CSS Custom Properties for \`<nx-accordion-group>\`

| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--gap\` | Spacing between accordion items in flat mode | \`0px\` (default) / \`12px\` (flat) |
| \`--border-radius\` | Container border radius in default mode | \`8px\` |
| \`--border-color\` | Container border and divider line color | \`#e2e8f0\` |
| \`--border-width\` | Border thickness | \`1px\` |

#### 3. Inline Style Customization
Pass CSS variables directly via the \`style\` attribute:
\`\`\`html
<nx-accordion
  header="Custom Styled Accordion"
  style="
    --border-color: #8145b5;
    --border-active-color: #8145b5;
    --border-radius: 12px;
    --header-padding: 16px;
    --content-padding: 16px;
    --hover-background: #f6f0fa;
    --accent-color: #8145b5;
  "
>
  <p>Custom styled content inside body.</p>
</nx-accordion>
\`\`\`

#### 4. Class-Based Theming in Stylesheets
Define classes with custom CSS properties in your CSS/SCSS files:
\`\`\`css
/* Brand Purple Accordion */
.brand-accordion {
  --accent-color: #8145b5;
  --border-active-color: #8145b5;
  --header-icon-active-color: #8145b5;
  --hover-background: rgba(129, 69, 181, 0.05);
  --border-radius: 10px;
}

/* Dark Mode Theme */
.dark-accordion-group {
  --background: #1e293b;
  --color: #f8fafc;
  --border-color: #334155;
  --hover-background: #334155;
  --toggle-icon-color: #94a3b8;
  --icon-color: #38bdf8;
  --accent-color: #38bdf8;
}
\`\`\`

#### 5. Shadow Parts Styling (\`::part\`)
For deep CSS overrides not covered by custom properties, use the exported shadow parts:
- \`::part(header-button)\`: The clickable \`<button>\` header element.
- \`::part(header)\`: The header text/slot container.
- \`::part(icon)\`: The leading icon container.
- \`::part(toggle-icon)\`: The expand/collapse chevron container.
- \`::part(end)\`: The trailing slot container.
- \`::part(collapse)\`: The animated collapse grid wrapper.
- \`::part(body)\`: The content container.

\`\`\`css
nx-accordion.custom-header::part(header-button) {
  font-weight: 700;
  letter-spacing: 0.02em;
}

nx-accordion.custom-header::part(body) {
  background-color: #f8fafc;
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    header: {
      control: 'text',
      description: 'Text displayed in the accordion header',
      defaultValue: 'Accordion Title',
    },
    content: {
      name: 'Content (Slot)',
      control: 'text',
      description: 'Body content displayed when the accordion is expanded',
      defaultValue: 'This is the expanded content of the accordion section.',
    },
    variant: {
      control: 'select',
      options: ['bordered', 'borderless', 'accent'],
      description: 'Visual appearance variant ("bordered", "borderless", "accent")',
      table: {
        defaultValue: { summary: 'bordered' },
      },
    },
    open: {
      control: 'boolean',
      description: 'Whether the accordion is currently expanded',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the accordion is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    expandIconPosition: {
      control: 'select',
      options: ['end', 'start'],
      description: 'Placement of the chevron/toggle icon ("end" or "start")',
      table: {
        defaultValue: { summary: 'end' },
      },
    },
    icon: {
      control: 'text',
      description: 'Name of the leading icon from Lucide (e.g. "settings", "circle-help", "shield")',
    },
    toggleIcon: {
      control: 'text',
      description: 'Custom icon name for the collapsed toggle (e.g. "plus", "chevron-down", "panel-bottom-open")',
    },
    collapseIcon: {
      control: 'text',
      description: 'Custom icon name for the expanded toggle (e.g. "minus", "chevron-up")',
    },
    hideToggleIcon: {
      control: 'boolean',
      description: 'Hides the toggle/chevron icon completely',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    contentPadding: {
      control: 'text',
      description: 'Custom padding for the expanded content body (e.g. "16px", "24px")',
    },
  },
  args: {
    header: 'What is NX Web Components?',
    content: 'NX Web Components is a set of framework-independent, accessible UI components built using Stencil.js.',
    variant: 'bordered',
    open: false,
    disabled: false,
    expandIconPosition: 'end',
    hideToggleIcon: false,
  },
};

export default meta;
type Story = StoryObj;

/**
 * Interactive playground for testing a standalone `<nx-accordion>` with live controls.
 */
export const Playground: Story = {
  render: (args) => html`
    <div style="max-width: 600px; width: 100%;">
      <nx-accordion
        .header=${args.header}
        .variant=${args.variant}
        ?open=${args.open}
        ?disabled=${args.disabled}
        .expandIconPosition=${args.expandIconPosition}
        .icon=${args.icon}
        .toggleIcon=${args.toggleIcon}
        .collapseIcon=${args.collapseIcon}
        ?hideToggleIcon=${args.hideToggleIcon}
        .contentPadding=${args.contentPadding}
      >
        <p>${args.content}</p>
      </nx-accordion>
    </div>
  `,
};

/**
 * Three visual variants: `bordered` (default), `borderless`, and `accent` (featuring an active colored indicator bar).
 */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 640px; width: 100%;">
      <div>
        <p style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #64748b;">1. Bordered (Default):</p>
        <nx-accordion variant="bordered" header="Bordered Accordion" open>
          <p>The bordered variant has a solid 1px border around the entire container with rounded corners.</p>
        </nx-accordion>
      </div>

      <div>
        <p style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #64748b;">2. Borderless:</p>
        <nx-accordion variant="borderless" header="Borderless Accordion" open>
          <p>The borderless variant removes outer borders and dividers, ideal for minimalist layouts or nested cards.</p>
        </nx-accordion>
      </div>

      <div>
        <p style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #64748b;">3. Accent (Left indicator line when open):</p>
        <nx-accordion variant="accent" header="Accent Accordion" open>
          <p>The accent variant highlights the active expanded section with a 4px primary color indicator bar on the left edge.</p>
        </nx-accordion>
      </div>
    </div>
  `,
};

/**
 * Multiple accordions coordinated inside an `<nx-accordion-group>` in default joined mode.
 * In this mode, items are linked into a single seamless bordered container. Only one item can be open at a time.
 */
export const AccordionGroupDefault: Story = {
  render: () => html`
    <div style="max-width: 640px; width: 100%;">
      <nx-accordion-group value="section-1">
        <nx-accordion value="section-1" header="Getting Started">
          <p>Learn how to install, import, and configure NX Web Components in your application.</p>
        </nx-accordion>
        <nx-accordion value="section-2" header="Design Tokens & Theming">
          <p>Customize colors, typography, spacing, shadows, and radii using global CSS variables.</p>
        </nx-accordion>
        <nx-accordion value="section-3" header="Framework Integrations">
          <p>Use seamlessly across modern frontend frameworks and Angular applications.</p>
        </nx-accordion>
      </nx-accordion-group>
    </div>
  `,
};

/**
 * Demonstrates custom headers and content using `slot="header"` and `slot="content"`.
 * Supports rich markup, inline `<nx-icon>` elements, leading icons, and custom toggle icons (e.g. `toggleIcon="panel-bottom-open"`).
 */
export const SlotHeaderAndContent: Story = {
  render: () => html`
    <div style="max-width: 640px; width: 100%;">
      <nx-accordion-group
        value="first"
        @nxChange=${(ev: CustomEvent) => console.log('nxChange:', ev.detail)}
      >
        <nx-accordion value="first">
          <span slot="header"> What is NX Web Components? </span>
          <div slot="content">
            <p style="margin: 0">
              NX Web Components is a framework-agnostic design system built with
              Stencil and distributed with first-class Angular bindings.
            </p>
          </div>
        </nx-accordion>

        <nx-accordion value="second" icon="user-round-key">
          <span slot="header">User Authentication & Security</span>
          <div slot="content">
            <p style="margin: 0">
              Easily manage multi-factor authentication, sessions, and security
              permissions.
            </p>
          </div>
        </nx-accordion>

        <nx-accordion value="third" toggleIcon="panel-bottom-open">
          <span
            slot="header"
            style="display: inline-flex; align-items: center;"
          >
            <nx-icon style="margin-right: 8px" name="user-round-key"></nx-icon>
            Custom Header via slot="header"
          </span>
          <div slot="content">
            <p style="margin: 0">
              Both header and body content are provided cleanly via
              <code>slot="header"</code> and <code>slot="content"</code> with 12px
              padding.
            </p>
          </div>
        </nx-accordion>
      </nx-accordion-group>
    </div>
  `,
};

/**
 * An `<nx-accordion-group>` with `multiple` enabled, allowing several sections to be expanded simultaneously.
 */
export const AccordionGroupMultiple: Story = {
  render: () => html`
    <div style="max-width: 640px; width: 100%;">
      <p style="margin: 0 0 12px; font-size: 13px; color: #64748b;">
        Multiple sections can be opened at the same time:
      </p>
      <nx-accordion-group multiple>
        <nx-accordion header="System Requirements" open>
          <p>Node.js v18+, modern evergreen browsers (Chrome, Edge, Firefox, Safari).</p>
        </nx-accordion>
        <nx-accordion header="Browser Support" open>
          <p>Full support for all modern browsers supporting Web Components and Shadow DOM v1.</p>
        </nx-accordion>
        <nx-accordion header="Accessibility (a11y)">
          <p>Complies with WAI-ARIA Accordion design pattern with full keyboard navigation and screen-reader support.</p>
        </nx-accordion>
      </nx-accordion-group>
    </div>
  `,
};

/**
 * `<nx-accordion-group>` with `displayMode="flat"`, separating items into distinct card-like elements with gaps.
 */
export const AccordionGroupFlat: Story = {
  render: () => html`
    <div style="max-width: 640px; width: 100%;">
      <nx-accordion-group displayMode="flat" value="item-1">
        <nx-accordion value="item-1" header="Account & Security" icon="shield">
          <p>Manage your password, two-factor authentication, and active sessions.</p>
        </nx-accordion>
        <nx-accordion value="item-2" header="Notification Preferences" icon="bell">
          <p>Configure email, SMS, and in-app alert notifications for critical system updates.</p>
        </nx-accordion>
        <nx-accordion value="item-3" header="Billing & Invoices" icon="credit-card">
          <p>View subscription tiers, download past PDF invoices, and update payment methods.</p>
        </nx-accordion>
      </nx-accordion-group>
    </div>
  `,
};

/**
 * Accordion headers featuring leading icons via the `icon` prop or `slot="start"` / `slot="icon"`.
 */
export const WithLeadingIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 640px; width: 100%;">
      <nx-accordion header="General Settings" icon="settings">
        <p>Adjust system configurations, language, and regional preferences.</p>
      </nx-accordion>

      <nx-accordion header="Help & Documentation" icon="circle-help">
        <p>Explore tutorials, API references, and frequently asked questions.</p>
      </nx-accordion>

      <nx-accordion header="Privacy & Security" icon="lock">
        <p>Review data collection policies, telemetry settings, and export account data.</p>
      </nx-accordion>
    </div>
  `,
};

/**
 * Trailing custom content in the header using `slot="end"` (e.g. badges, status tags, timestamps).
 */
export const WithTrailingSlot: Story = {
  render: () => html`
    <div style="max-width: 640px; width: 100%;">
      <nx-accordion-group displayMode="flat">
        <nx-accordion header="API Gateway Service" icon="server">
          <span
            slot="end"
            style="
              font-size: 11px;
              font-weight: 600;
              padding: 2px 8px;
              background: #dcfce7;
              color: #15803d;
              border-radius: 9999px;
            "
          >
            Operational
          </span>
          <p>Average response time: 28ms. Uptime: 99.98% over the last 30 days.</p>
        </nx-accordion>

        <nx-accordion header="Database Cluster" icon="database">
          <span
            slot="end"
            style="
              font-size: 11px;
              font-weight: 600;
              padding: 2px 8px;
              background: #fef9c3;
              color: #854d0e;
              border-radius: 9999px;
            "
          >
            Maintenance
          </span>
          <p>Scheduled index rebuild scheduled for 02:00 UTC.</p>
        </nx-accordion>
      </nx-accordion-group>
    </div>
  `,
};

/**
 * Custom toggle icons such as plus/minus icons using `toggleIcon="plus"` and `collapseIcon="minus"`.
 */
export const CustomToggleIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 640px; width: 100%;">
      <nx-accordion
        header="Plus & Minus Toggle Icons"
        toggleIcon="plus"
        collapseIcon="minus"
        open
      >
        <p>This accordion replaces the default rotating chevron with a plus icon when closed and a minus icon when opened.</p>
      </nx-accordion>

      <nx-accordion
        header="Chevron with Start Position"
        expandIconPosition="start"
        open
      >
        <p>The expand toggle icon is positioned at the start (left) of the header instead of the end.</p>
      </nx-accordion>
    </div>
  `,
};

/**
 * Disabled state for individual accordions and entire accordion groups.
 */
export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 640px; width: 100%;">
      <div>
        <p style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #64748b;">Single Item Disabled:</p>
        <nx-accordion header="Active Accordion">
          <p>This section is active and interactive.</p>
        </nx-accordion>
        <div style="height: 12px;"></div>
        <nx-accordion header="Disabled Accordion" disabled>
          <p>This content cannot be expanded because the item is disabled.</p>
        </nx-accordion>
      </div>

      <div>
        <p style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #64748b;">Entire Group Disabled:</p>
        <nx-accordion-group disabled displayMode="flat">
          <nx-accordion header="Section 1">
            <p>Content 1</p>
          </nx-accordion>
          <nx-accordion header="Section 2">
            <p>Content 2</p>
          </nx-accordion>
        </nx-accordion-group>
      </div>
    </div>
  `,
};

/**
 * Demonstrates Custom Styling using CSS Custom Properties (`--accent-color`, `--border-color`, `--hover-background`, etc.).
 */
export const CustomStylingVariables: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 640px; width: 100%;">
      <div>
        <h4 style="margin: 0 0 10px; font-size: 14px; font-weight: 600;">1. Brand Primary Purple Theme</h4>
        <nx-accordion
          header="Purple Brand Styling"
          icon="sparkles"
          open
          style="
            --accent-color: #8145b5;
            --border-color: #e9d5ff;
            --border-active-color: #8145b5;
            --border-radius: 12px;
            --header-padding: 16px;
            --content-padding: 16px;
            --hover-background: #faf5ff;
            --icon-color: #8145b5;
            --header-icon-active-color: #8145b5;
            --toggle-icon-color: #8145b5;
          "
        >
          <p>Customized with brand purple borders, active highlight, hover tint, and matching icon colors.</p>
        </nx-accordion>
      </div>

      <div>
        <h4 style="margin: 0 0 10px; font-size: 14px; font-weight: 600;">2. Emerald Success Accent</h4>
        <nx-accordion
          variant="accent"
          header="Environment Healthy"
          icon="circle-check"
          open
          style="
            --accent-color: #10b981;
            --border-color: #a7f3d0;
            --border-radius: 10px;
            --hover-background: #ecfdf5;
            --icon-color: #059669;
            --toggle-icon-color: #059669;
          "
        >
          <p>All Kubernetes pods and services running with zero error rates.</p>
        </nx-accordion>
      </div>

      <div>
        <h4 style="margin: 0 0 10px; font-size: 14px; font-weight: 600;">3. Compact Density</h4>
        <nx-accordion
          header="Compact Accordion"
          style="
            --header-padding: 8px 12px;
            --content-padding: 8px 12px;
            --icon-size: 16px;
            --border-radius: 6px;
            font-size: 14px;
          "
        >
          <p style="font-size: 13px;">Dense padding suitable for high-density sidebars and inspectors.</p>
        </nx-accordion>
      </div>
    </div>
  `,
};

/**
 * Demonstrates a sleek Dark Mode theme achieved purely through CSS Custom Properties.
 */
export const CustomStylingDarkMode: Story = {
  render: () => html`
    <div style="background: #0f172a; padding: 24px; border-radius: 16px; max-width: 640px; width: 100%;">
      <p style="margin: 0 0 16px; font-size: 13px; font-weight: 600; color: #94a3b8;">Dark Minimalist Accordion Group:</p>
      <nx-accordion-group
        displayMode="flat"
        value="dark-1"
        style="
          --background: #1e293b;
          --color: #f1f5f9;
          --border-color: #334155;
          --border-active-color: #38bdf8;
          --hover-background: #334155;
          --icon-color: #38bdf8;
          --toggle-icon-color: #94a3b8;
          --border-radius: 12px;
        "
      >
        <nx-accordion value="dark-1" header="Cloud Infrastructure" icon="cloud">
          <p style="color: #cbd5e1;">Deployed across us-east-1 and eu-central-1 with multi-region failover.</p>
        </nx-accordion>
        <nx-accordion value="dark-2" header="SSL/TLS Certificates" icon="lock">
          <p style="color: #cbd5e1;">Automated renewal via Let's Encrypt configured with 2048-bit RSA keys.</p>
        </nx-accordion>
      </nx-accordion-group>
    </div>
  `,
};

/**
 * Demonstrates deep styling using CSS Shadow Parts (`::part(header-button)`, `::part(body)`, etc.).
 */
export const CustomStylingShadowParts: Story = {
  render: () => html`
    <style>
      .styled-parts-accordion::part(header-button) {
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        color: #ffffff;
        font-weight: 600;
        letter-spacing: 0.03em;
        border-radius: 12px 12px 0 0;
        padding: 16px;
      }
      .styled-parts-accordion:not(.is-open)::part(header-button) {
        border-radius: 12px;
      }
      .styled-parts-accordion::part(toggle-icon) {
        color: #ffffff;
      }
      .styled-parts-accordion::part(body) {
        background: #faf5ff;
        border-left: 2px solid #8b5cf6;
        border-right: 2px solid #8b5cf6;
        border-bottom: 2px solid #8b5cf6;
        border-radius: 0 0 12px 12px;
        padding: 20px;
        color: #475569;
      }
    </style>

    <div style="max-width: 640px; width: 100%;">
      <nx-accordion
        class="styled-parts-accordion"
        variant="borderless"
        header="Gradient Header via ::part(header-button)"
        open
      >
        <p>This accordion uses <code>::part(header-button)</code> to apply a gradient background and <code>::part(body)</code> to style the content container.</p>
      </nx-accordion>
    </div>
  `,
};

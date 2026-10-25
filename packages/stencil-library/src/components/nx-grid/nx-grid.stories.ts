import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-grid>`, `<nx-row>`, and `<nx-col>` provide a flexible 12-column responsive grid layout system.
 * Features responsive column spanning (xs, sm, md, lg, xl, xxl), offsets, flex alignment,
 * custom gutters, and fluid containers.
 */
const meta: Meta = {
  title: 'NX Web Components/Grid',
  component: 'nx-grid',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The responsive grid system is organized into three tiers:
- **\`<nx-grid>\`**: The outer container providing max-width constraints, centering, and container padding.
- **\`<nx-row>\`**: A flexbox row wrapper managing gutters, flex wrapping, and horizontal/vertical alignment.
- **\`<nx-col>\`**: Responsive column spans based on a 12-column grid system (\`size="6"\`, \`sizeMd="4"\`, \`sizeLg="3"\`).

---

### How to Use Custom Styling

\`<nx-grid>\`, \`<nx-row>\`, and \`<nx-col>\` provide styling hooks via **CSS Custom Properties**.

#### Public CSS Custom Properties
| CSS Property | Scope | Description |
| :--- | :--- | :--- |
| \`--padding\` | Grid / Col | Inner padding |
| \`--margin\` | Grid / Row / Col | External spacing |
| \`--gap\` | Row | Horizontal and vertical gutter spacing |
| \`--row-gap\` | Row | Vertical spacing between rows |
| \`--column-gap\` | Row | Horizontal spacing between columns |
        `,
      },
    },
  },
  argTypes: {
    fixed: {
      control: 'boolean',
      description: 'Sets responsive max-widths matching standard viewport breakpoints',
      table: { defaultValue: { summary: 'false' } },
    },
    fluid: {
      control: 'boolean',
      description: 'Expands grid full width across 100% of viewport',
      table: { defaultValue: { summary: 'false' } },
    },
    noPadding: {
      control: 'boolean',
      description: 'Removes container side padding',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    fixed: false,
    fluid: true,
    noPadding: false,
  },
};

export default meta;
type Story = StoryObj;

const boxStyle = 'background: #e0e7ff; color: #3730a3; padding: 14px; text-align: center; border-radius: 6px; font-weight: 500; font-size: 13px; border: 1px solid #c7d2fe;';

export const Default: Story = {
  render: (args) => html`
    <nx-grid ?fixed=${args.fixed} ?fluid=${args.fluid} ?noPadding=${args.noPadding}>
      <nx-row gap="12px">
        <nx-col size="12">
          <div style=${boxStyle}>size="12" (Full Width)</div>
        </nx-col>
        <nx-col size="6">
          <div style=${boxStyle}>size="6" (Half Width)</div>
        </nx-col>
        <nx-col size="6">
          <div style=${boxStyle}>size="6" (Half Width)</div>
        </nx-col>
        <nx-col size="4">
          <div style=${boxStyle}>size="4" (One Third)</div>
        </nx-col>
        <nx-col size="4">
          <div style=${boxStyle}>size="4" (One Third)</div>
        </nx-col>
        <nx-col size="4">
          <div style=${boxStyle}>size="4" (One Third)</div>
        </nx-col>
      </nx-row>
    </nx-grid>
  `,
};

export const ResponsiveBreakpoints: Story = {
  render: () => html`
    <nx-grid fluid>
      <nx-row gap="12px">
        <nx-col sizeXs="12" sizeSm="6" sizeMd="4" sizeLg="3">
          <div style=${boxStyle}>12 xs | 6 sm | 4 md | 3 lg</div>
        </nx-col>
        <nx-col sizeXs="12" sizeSm="6" sizeMd="4" sizeLg="3">
          <div style=${boxStyle}>12 xs | 6 sm | 4 md | 3 lg</div>
        </nx-col>
        <nx-col sizeXs="12" sizeSm="6" sizeMd="4" sizeLg="3">
          <div style=${boxStyle}>12 xs | 6 sm | 4 md | 3 lg</div>
        </nx-col>
        <nx-col sizeXs="12" sizeSm="6" sizeMd="4" sizeLg="3">
          <div style=${boxStyle}>12 xs | 6 sm | 4 md | 3 lg</div>
        </nx-col>
      </nx-row>
    </nx-grid>
  `,
};

export const OffsetsAndOrdering: Story = {
  render: () => html`
    <nx-grid fluid>
      <nx-row gap="12px">
        <nx-col size="4" offset="4">
          <div style=${boxStyle}>size="4" offset="4" (Centered)</div>
        </nx-col>
      </nx-row>
      <nx-row gap="12px" style="margin-top: 12px;">
        <nx-col size="3" offset="9">
          <div style=${boxStyle}>size="3" offset="9" (Right-Aligned)</div>
        </nx-col>
      </nx-row>
    </nx-grid>
  `,
};

export const AlignmentAndJustification: Story = {
  render: () => html`
    <nx-grid fluid>
      <nx-row justify="center" gap="12px">
        <nx-col size="3"><div style=${boxStyle}>Justified Center</div></nx-col>
        <nx-col size="3"><div style=${boxStyle}>Justified Center</div></nx-col>
      </nx-row>
      <nx-row justify="between" gap="12px" style="margin-top: 12px;">
        <nx-col size="3"><div style=${boxStyle}>Space Between (1)</div></nx-col>
        <nx-col size="3"><div style=${boxStyle}>Space Between (2)</div></nx-col>
      </nx-row>
    </nx-grid>
  `,
};

/**
 * Demonstrates Custom Styling using CSS Custom Properties (`--padding`, `--gap`, `--row-gap`, `--column-gap`).
 */
export const CustomStyling: Story = {
  render: () => html`
    <nx-grid fluid style="--padding: 24px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;">
      <nx-row style="--gap: 20px;">
        <nx-col size="6">
          <div style=${boxStyle}>Custom 20px Gutter Column (1)</div>
        </nx-col>
        <nx-col size="6">
          <div style=${boxStyle}>Custom 20px Gutter Column (2)</div>
        </nx-col>
      </nx-row>
    </nx-grid>
  `,
};

/**
 * Demonstrates CSS Shadow Parts (`nx-grid::part(grid)`, `nx-row::part(row)`, `nx-col::part(col)`) for deep styling.
 */
export const CustomStylingShadowParts: Story = {
  render: () => html`
    <style>
      .custom-grid-parts::part(grid) {
        border: 2px dashed #8145b5;
        border-radius: 16px;
        padding: 20px;
        background: #faf5ff;
      }
      .custom-grid-parts nx-row::part(row) {
        outline: 1px dashed rgba(129, 69, 181, 0.4);
      }
    </style>

    <nx-grid class="custom-grid-parts" fluid>
      <nx-row gap="16px">
        <nx-col size="4"><div style=${boxStyle}>Dashed Grid Container</div></nx-col>
        <nx-col size="4"><div style=${boxStyle}>Styled via ::part(grid)</div></nx-col>
        <nx-col size="4"><div style=${boxStyle}>And ::part(row)</div></nx-col>
      </nx-row>
    </nx-grid>
  `,
};



import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-skeleton>` is a lightweight placeholder component used to visually indicate an
 * in-flight loading state for cards, text blocks, media items, tables, and avatars.
 * It prevents jarring content layout shifts and significantly reduces perceived wait times.
 */
const meta: Meta = {
  title: 'NX Web Components/Skeleton',
  component: 'nx-skeleton',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-skeleton>\` component renders an animated placeholder while real content loads.

Key features:
- **Shapes**: \`text\` (default), \`circular\`, \`rounded\`, and \`rectangular\`.
- **Animations**: \`shimmer\` (default), \`pulse\`, and \`none\`.
- **Multi-line Text**: Set \`count\` to generate multi-line paragraphs with natural \`lastLineWidth\`.
- **Dimensions**: Flexible \`width\`, \`height\`, \`size\`, and \`radius\` properties.
- **Wrapper Mode**: Toggle \`loading\` to conditionally reveal slotted content once ready.
- **Full Custom Styling**: Customize background, shimmer sweep, duration, border radius, and gaps via CSS Custom Properties or Shadow Parts.

---

### How to Use Custom Styling

\`<nx-skeleton>\` encapsulates its styles using Shadow DOM. You can customize its appearance via
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--nx-skeleton-bg\` | Base background color of the skeleton placeholder | \`var(--nx-color-gray-200, #e2e8f0)\` |
| \`--nx-skeleton-shimmer-color\` | Highlight sweep color for the shimmer wave | \`rgba(255, 255, 255, 0.65)\` |
| \`--nx-skeleton-duration\` | Speed / duration of the animation | \`1.5s\` |
| \`--nx-skeleton-gap\` | Gap between lines when \`count > 1\` | \`8px\` |
| \`--nx-skeleton-border-radius\` | Default border radius for \`rounded\` variant | \`8px\` |

#### 2. Inline Style Customization
Pass CSS custom variables directly via the \`style\` attribute:
\`\`\`html
<!-- Custom Brand Tint -->
<nx-skeleton
  variant="rounded"
  width="100%"
  height="48px"
  style="--nx-skeleton-bg: #f3e8ff; --nx-skeleton-shimmer-color: rgba(129, 69, 181, 0.25);"
></nx-skeleton>

<!-- Dark Mode Placeholder -->
<nx-skeleton
  variant="rounded"
  width="100%"
  height="48px"
  style="--nx-skeleton-bg: #1e293b; --nx-skeleton-shimmer-color: rgba(255, 255, 255, 0.08);"
></nx-skeleton>
\`\`\`

#### 3. Shadow Parts Styling (\`::part\`)
- \`::part(skeleton)\`: Targets the skeleton placeholder element.
- \`::part(container)\`: Targets the multi-line wrapper container.

\`\`\`css
/* Add subtle borders or box-shadow to skeleton blocks */
nx-skeleton::part(skeleton) {
  border: 1px dashed #cbd5e1;
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rounded', 'rectangular'],
      description: 'Shape variant of the placeholder',
      table: { defaultValue: { summary: 'text' } },
    },
    animation: {
      control: 'select',
      options: ['shimmer', 'pulse', 'none'],
      description: 'Animation effect',
      table: { defaultValue: { summary: 'shimmer' } },
    },
    width: {
      control: 'text',
      description: 'Custom width (e.g. 100%, 200px)',
    },
    height: {
      control: 'text',
      description: 'Custom height (e.g. 20px, 120px)',
    },
    size: {
      control: 'text',
      description: 'Uniform width and height (ideal for circular or square skeletons)',
    },
    radius: {
      control: 'text',
      description: 'Custom border radius (e.g. 12px, 50%)',
    },
    count: {
      control: 'number',
      description: 'Number of skeleton lines to render',
      table: { defaultValue: { summary: '1' } },
    },
    lastLineWidth: {
      control: 'text',
      description: 'Width for the last line when count > 1 (e.g. 60%)',
    },
    loading: {
      control: 'boolean',
      description: 'Whether skeleton is in loading state. When false, reveals slotted content.',
      table: { defaultValue: { summary: 'true' } },
    },
    duration: {
      control: 'text',
      description: 'Custom animation duration (e.g. 0.8s, 2.5s)',
    },
    bg: {
      control: 'color',
      description: 'Custom base placeholder background color',
    },
    shimmerColor: {
      control: 'text',
      description: 'Custom shimmer highlight sweep color',
    },
  },
  args: {
    variant: 'text',
    animation: 'shimmer',
    width: '100%',
    height: '16px',
    count: 1,
    loading: true,
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Default Interactive Playground
 * Test and configure all component properties live using Storybook controls.
 */
export const Default: Story = {
  render: (args) => html`
    <div style="max-width: 480px; font-family: sans-serif;">
      <nx-skeleton
        .variant=${args.variant}
        .animation=${args.animation}
        .width=${args.width}
        .height=${args.height}
        .size=${args.size}
        .radius=${args.radius}
        .count=${args.count}
        .lastLineWidth=${args.lastLineWidth}
        ?loading=${args.loading}
        .duration=${args.duration}
        .bg=${args.bg}
        .shimmerColor=${args.shimmerColor}
      >
        <div style="padding: 16px; background: #e0f2fe; border-radius: 8px; color: #0369a1;">
          <strong>Slotted Content Revealed!</strong>
          <p style="margin: 4px 0 0; font-size: 13px;">This content appears automatically when loading=false.</p>
        </div>
      </nx-skeleton>
    </div>
  `,
};

/**
 * 2. Shapes & Variants
 * Demonstrates the 4 primary shapes: text, circular, rounded, and rectangular.
 */
export const ShapesAndVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 540px; font-family: sans-serif;">
      <div>
        <h4 style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase;">
          1. Text Variant (Single Line &amp; Headline)
        </h4>
        <nx-skeleton variant="text" width="60%" height="24px" style="margin-bottom: 8px;"></nx-skeleton>
        <nx-skeleton variant="text" width="100%" height="16px"></nx-skeleton>
      </div>

      <div>
        <h4 style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase;">
          2. Circular Variant (Avatar Scale: 24px, 32px, 48px, 64px, 80px)
        </h4>
        <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
          <nx-skeleton variant="circular" size="24px"></nx-skeleton>
          <nx-skeleton variant="circular" size="32px"></nx-skeleton>
          <nx-skeleton variant="circular" size="48px"></nx-skeleton>
          <nx-skeleton variant="circular" size="64px"></nx-skeleton>
          <nx-skeleton variant="circular" size="80px"></nx-skeleton>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase;">
          3. Rounded Variant (Buttons, Tags, Inputs)
        </h4>
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <nx-skeleton variant="rounded" width="80px" height="28px"></nx-skeleton>
          <nx-skeleton variant="rounded" width="140px" height="40px"></nx-skeleton>
          <nx-skeleton variant="rounded" width="220px" height="40px"></nx-skeleton>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase;">
          4. Rectangular Variant (Media Banner &amp; Image)
        </h4>
        <nx-skeleton variant="rectangular" width="100%" height="140px"></nx-skeleton>
      </div>
    </div>
  `,
};

/**
 * 3. Animation Modes & Speeds
 * Comparison between shimmer wave, pulse opacity, static (no animation), and customized animation speeds.
 */
export const AnimationModesAndSpeeds: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 520px; font-family: sans-serif;">
      <div>
        <h4 style="margin: 0 0 6px; font-size: 13px; font-weight: 600; color: #64748b;">
          Shimmer (Default wave gradient - 1.5s)
        </h4>
        <nx-skeleton animation="shimmer" variant="rounded" height="32px"></nx-skeleton>
      </div>

      <div>
        <h4 style="margin: 0 0 6px; font-size: 13px; font-weight: 600; color: #64748b;">
          Fast Shimmer (0.8s)
        </h4>
        <nx-skeleton animation="shimmer" duration="0.8s" variant="rounded" height="32px"></nx-skeleton>
      </div>

      <div>
        <h4 style="margin: 0 0 6px; font-size: 13px; font-weight: 600; color: #64748b;">
          Slow Shimmer (2.5s)
        </h4>
        <nx-skeleton animation="shimmer" duration="2.5s" variant="rounded" height="32px"></nx-skeleton>
      </div>

      <div>
        <h4 style="margin: 0 0 6px; font-size: 13px; font-weight: 600; color: #64748b;">
          Pulse (Gentle opacity fade)
        </h4>
        <nx-skeleton animation="pulse" variant="rounded" height="32px"></nx-skeleton>
      </div>

      <div>
        <h4 style="margin: 0 0 6px; font-size: 13px; font-weight: 600; color: #64748b;">
          None (Static wireframe placeholder)
        </h4>
        <nx-skeleton animation="none" variant="rounded" height="32px"></nx-skeleton>
      </div>
    </div>
  `,
};

/**
 * 4. Multi-Line Paragraphs
 * Using `count` and `lastLineWidth` to simulate natural paragraphs without layout shifts.
 */
export const MultiLineParagraphs: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 500px; font-family: sans-serif;">
      <div style="padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
        <span style="font-size: 12px; font-weight: 600; color: #64748b; display: block; margin-bottom: 8px;">
          Short Paragraph (count="3", lastLineWidth="60%")
        </span>
        <nx-skeleton count="3" height="14px" last-line-width="60%"></nx-skeleton>
      </div>

      <div style="padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
        <span style="font-size: 12px; font-weight: 600; color: #64748b; display: block; margin-bottom: 8px;">
          Long Article Excerpt (count="5", lastLineWidth="45%")
        </span>
        <nx-skeleton count="5" height="13px" last-line-width="45%"></nx-skeleton>
      </div>

      <div style="padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
        <span style="font-size: 12px; font-weight: 600; color: #64748b; display: block; margin-bottom: 8px;">
          Wide Gap Paragraph (--nx-skeleton-gap: 16px)
        </span>
        <nx-skeleton count="3" height="14px" last-line-width="70%" style="--nx-skeleton-gap: 16px;"></nx-skeleton>
      </div>
    </div>
  `,
};

/**
 * 5. Wrapper & Conditional Loading Mode
 * When `loading=true`, renders the skeleton. When `loading=false`, renders slotted children directly.
 */
export const WrapperMode: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; flex-wrap: wrap; font-family: sans-serif;">
      <!-- State 1: Loading = true -->
      <div style="width: 280px; padding: 16px; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff;">
        <span style="font-size: 12px; font-weight: 600; color: #64748b; display: block; margin-bottom: 12px;">
          LOADING STATE (loading=true)
        </span>
        <nx-skeleton .loading=${true} variant="rounded" width="100%" height="160px">
          <div style="background: #8145b5; color: white; padding: 16px; border-radius: 8px;">
            <h4>User Profile Ready</h4>
            <p>This content is hidden until loading finishes.</p>
          </div>
        </nx-skeleton>
      </div>

      <!-- State 2: Loading = false -->
      <div style="width: 280px; padding: 16px; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff;">
        <span style="font-size: 12px; font-weight: 600; color: #16a34a; display: block; margin-bottom: 12px;">
          LOADED STATE (loading=false)
        </span>
        <nx-skeleton .loading=${false} variant="rounded" width="100%" height="160px">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
              <div style="width: 36px; height: 36px; border-radius: 50%; background: #8145b5; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px;">
                AK
              </div>
              <div>
                <h4 style="margin: 0; font-size: 14px; color: #0f172a;">Alex Morgan</h4>
                <span style="font-size: 12px; color: #64748b;">Frontend Lead</span>
              </div>
            </div>
            <p style="margin: 0; font-size: 12px; color: #475569; line-height: 1.4;">
              Slotted content seamlessly displayed without wrapper markup interference.
            </p>
          </div>
        </nx-skeleton>
      </div>
    </div>
  `,
};

/**
 * 6. User Profile Card Pattern
 * Full composition showing avatar, badges, heading, multi-line bio, and action buttons.
 */
export const UserCardComposition: Story = {
  render: () => html`
    <div
      style="
        max-width: 360px;
        padding: 20px;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        background: #ffffff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        font-family: sans-serif;
      "
    >
      <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px;">
        <nx-skeleton variant="circular" size="52px"></nx-skeleton>
        <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
          <nx-skeleton width="70%" height="16px"></nx-skeleton>
          <nx-skeleton width="45%" height="12px"></nx-skeleton>
        </div>
      </div>
      <nx-skeleton variant="rounded" width="100%" height="130px" style="margin-bottom: 16px;"></nx-skeleton>
      <nx-skeleton count="3" height="12px" last-line-width="70%" style="margin-bottom: 20px;"></nx-skeleton>
      <div style="display: flex; justify-content: flex-end; gap: 10px;">
        <nx-skeleton variant="rounded" width="75px" height="32px"></nx-skeleton>
        <nx-skeleton variant="rounded" width="95px" height="32px"></nx-skeleton>
      </div>
    </div>
  `,
};

/**
 * 7. Video & Media Card Pattern
 * 16:9 media thumbnail, channel circle, 2-line title, and meta info line.
 */
export const VideoMediaCard: Story = {
  render: () => html`
    <div style="max-width: 340px; font-family: sans-serif;">
      <nx-skeleton variant="rounded" width="100%" height="190px" style="margin-bottom: 12px;"></nx-skeleton>
      <div style="display: flex; gap: 12px;">
        <nx-skeleton variant="circular" size="38px" style="flex-shrink: 0;"></nx-skeleton>
        <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
          <nx-skeleton width="90%" height="14px"></nx-skeleton>
          <nx-skeleton width="60%" height="14px"></nx-skeleton>
          <nx-skeleton width="40%" height="11px" style="margin-top: 2px;"></nx-skeleton>
        </div>
      </div>
    </div>
  `,
};

/**
 * 8. Form & Inputs Skeleton Pattern
 * Form labels, input boxes, radio/checkbox placeholders, and submit buttons.
 */
export const FormAndInputPlaceholders: Story = {
  render: () => html`
    <div
      style="
        max-width: 440px;
        padding: 24px;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        background: #ffffff;
        font-family: sans-serif;
      "
    >
      <nx-skeleton width="50%" height="20px" style="margin-bottom: 20px;"></nx-skeleton>

      <!-- Field 1 -->
      <div style="margin-bottom: 16px;">
        <nx-skeleton width="30%" height="12px" style="margin-bottom: 6px;"></nx-skeleton>
        <nx-skeleton variant="rounded" width="100%" height="38px"></nx-skeleton>
      </div>

      <!-- Field 2 -->
      <div style="margin-bottom: 16px;">
        <nx-skeleton width="25%" height="12px" style="margin-bottom: 6px;"></nx-skeleton>
        <nx-skeleton variant="rounded" width="100%" height="38px"></nx-skeleton>
      </div>

      <!-- Checkbox line -->
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
        <nx-skeleton variant="rounded" size="18px" radius="4px"></nx-skeleton>
        <nx-skeleton width="60%" height="12px"></nx-skeleton>
      </div>

      <!-- Submit button -->
      <nx-skeleton variant="rounded" width="100%" height="42px"></nx-skeleton>
    </div>
  `,
};

/**
 * 9. Data Table / List Rows Skeleton
 * Replicates table headers and 4 rows of multi-column cell data.
 */
export const DataTableSkeleton: Story = {
  render: () => html`
    <div
      style="
        max-width: 640px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        overflow: hidden;
        background: #ffffff;
        font-family: sans-serif;
      "
    >
      <!-- Table Header -->
      <div style="display: flex; gap: 16px; padding: 12px 16px; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
        <nx-skeleton width="20%" height="12px"></nx-skeleton>
        <nx-skeleton width="35%" height="12px"></nx-skeleton>
        <nx-skeleton width="20%" height="12px"></nx-skeleton>
        <nx-skeleton width="15%" height="12px"></nx-skeleton>
      </div>

      <!-- Table Rows -->
      ${[1, 2, 3, 4].map(
        () => html`
          <div style="display: flex; align-items: center; gap: 16px; padding: 14px 16px; border-bottom: 1px solid #f1f5f9;">
            <div style="width: 20%; display: flex; align-items: center; gap: 8px;">
              <nx-skeleton variant="circular" size="28px"></nx-skeleton>
              <nx-skeleton width="50%" height="12px"></nx-skeleton>
            </div>
            <nx-skeleton width="35%" height="12px"></nx-skeleton>
            <nx-skeleton variant="rounded" width="60px" height="22px" radius="12px"></nx-skeleton>
            <nx-skeleton variant="rounded" width="45px" height="26px" radius="4px"></nx-skeleton>
          </div>
        `
      )}
    </div>
  `,
};

/**
 * 10. Custom Styling with CSS Custom Properties
 * Demonstrates custom brand tints, animation speed overrides, gaps, and border radiuses.
 */
export const CustomStylingCSSVariables: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 540px; font-family: sans-serif;">
      <!-- Brand Purple Theme -->
      <div>
        <h4 style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #8145b5;">
          1. Brand Purple Palette (--nx-skeleton-bg &amp; --nx-skeleton-shimmer-color)
        </h4>
        <nx-skeleton
          variant="rounded"
          width="100%"
          height="48px"
          style="
            --nx-skeleton-bg: #f3e8ff;
            --nx-skeleton-shimmer-color: rgba(129, 69, 181, 0.35);
          "
        ></nx-skeleton>
      </div>

      <!-- Warm Amber Theme -->
      <div>
        <h4 style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #d97706;">
          2. Warm Amber Theme
        </h4>
        <nx-skeleton
          variant="rounded"
          width="100%"
          height="48px"
          style="
            --nx-skeleton-bg: #fef3c7;
            --nx-skeleton-shimmer-color: rgba(245, 158, 11, 0.3);
          "
        ></nx-skeleton>
      </div>

      <!-- Cool Sky / Info Theme -->
      <div>
        <h4 style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #0284c7;">
          3. Cool Sky Palette
        </h4>
        <nx-skeleton
          variant="rounded"
          width="100%"
          height="48px"
          style="
            --nx-skeleton-bg: #e0f2fe;
            --nx-skeleton-shimmer-color: rgba(14, 165, 233, 0.35);
          "
        ></nx-skeleton>
      </div>

      <!-- Custom Border Radius Pill -->
      <div>
        <h4 style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #475569;">
          4. Custom Pill Radius (--nx-skeleton-border-radius: 999px)
        </h4>
        <div style="display: flex; gap: 12px;">
          <nx-skeleton variant="rounded" width="100px" height="34px" style="--nx-skeleton-border-radius: 999px;"></nx-skeleton>
          <nx-skeleton variant="rounded" width="130px" height="34px" style="--nx-skeleton-border-radius: 999px;"></nx-skeleton>
          <nx-skeleton variant="rounded" width="160px" height="34px" style="--nx-skeleton-border-radius: 999px;"></nx-skeleton>
        </div>
      </div>
    </div>
  `,
};

/**
 * 11. Custom Styling for Dark Mode
 * Deep slate and midnight dark background themes with subtle luminous wave gradients.
 */
export const CustomStylingDarkMode: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; font-family: sans-serif;">
      <!-- Dark Slate Container (#0f172a) -->
      <div
        style="
          max-width: 380px;
          padding: 24px;
          background: #0f172a;
          border-radius: 14px;
          border: 1px solid #1e293b;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
        "
      >
        <span style="font-size: 12px; font-weight: 600; color: #94a3b8; display: block; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.05em;">
          Dark Slate Mode (#0f172a)
        </span>

        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px;">
          <nx-skeleton
            variant="circular"
            size="48px"
            style="--nx-skeleton-bg: #1e293b; --nx-skeleton-shimmer-color: rgba(255, 255, 255, 0.08);"
          ></nx-skeleton>
          <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
            <nx-skeleton
              width="65%"
              height="14px"
              style="--nx-skeleton-bg: #1e293b; --nx-skeleton-shimmer-color: rgba(255, 255, 255, 0.08);"
            ></nx-skeleton>
            <nx-skeleton
              width="40%"
              height="11px"
              style="--nx-skeleton-bg: #1e293b; --nx-skeleton-shimmer-color: rgba(255, 255, 255, 0.08);"
            ></nx-skeleton>
          </div>
        </div>

        <nx-skeleton
          variant="rounded"
          width="100%"
          height="110px"
          style="--nx-skeleton-bg: #1e293b; --nx-skeleton-shimmer-color: rgba(255, 255, 255, 0.08); margin-bottom: 16px;"
        ></nx-skeleton>

        <nx-skeleton
          count="3"
          height="11px"
          last-line-width="60%"
          style="--nx-skeleton-bg: #1e293b; --nx-skeleton-shimmer-color: rgba(255, 255, 255, 0.08); margin-bottom: 20px;"
        ></nx-skeleton>

        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <nx-skeleton
            variant="rounded"
            width="75px"
            height="32px"
            style="--nx-skeleton-bg: #1e293b; --nx-skeleton-shimmer-color: rgba(255, 255, 255, 0.08);"
          ></nx-skeleton>
          <nx-skeleton
            variant="rounded"
            width="90px"
            height="32px"
            style="--nx-skeleton-bg: #334155; --nx-skeleton-shimmer-color: rgba(255, 255, 255, 0.12);"
          ></nx-skeleton>
        </div>
      </div>

      <!-- Midnight Black Container (#000000) -->
      <div
        style="
          max-width: 380px;
          padding: 24px;
          background: #000000;
          border-radius: 14px;
          border: 1px solid #27272a;
        "
      >
        <span style="font-size: 12px; font-weight: 600; color: #a1a1aa; display: block; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.05em;">
          Midnight Black Mode (#000000)
        </span>

        <nx-skeleton
          variant="rounded"
          width="100%"
          height="60px"
          style="--nx-skeleton-bg: #18181b; --nx-skeleton-shimmer-color: rgba(255, 255, 255, 0.12); margin-bottom: 12px;"
        ></nx-skeleton>
        <nx-skeleton
          count="2"
          height="12px"
          last-line-width="70%"
          style="--nx-skeleton-bg: #18181b; --nx-skeleton-shimmer-color: rgba(255, 255, 255, 0.12);"
        ></nx-skeleton>
      </div>
    </div>
  `,
};

/**
 * 12. Custom Styling with Shadow Parts (::part)
 * Using ::part(skeleton) and ::part(container) to inject custom CSS borders, shadows, or filters.
 */
export const CustomStylingShadowParts: Story = {
  render: () => html`
    <style>
      .part-demo-dashed::part(skeleton) {
        border: 1px dashed #94a3b8;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
      }
      .part-demo-glow::part(skeleton) {
        box-shadow: 0 0 10px rgba(129, 69, 181, 0.35);
        border: 1px solid #c084fc;
      }
    </style>

    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 500px; font-family: sans-serif;">
      <div>
        <h4 style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #475569;">
          1. Dashed Border Outline via ::part(skeleton)
        </h4>
        <nx-skeleton class="part-demo-dashed" variant="rounded" width="100%" height="52px"></nx-skeleton>
      </div>

      <div>
        <h4 style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #8145b5;">
          2. Glowing Outer Shadow via ::part(skeleton)
        </h4>
        <nx-skeleton class="part-demo-glow" variant="rounded" width="100%" height="52px"></nx-skeleton>
      </div>
    </div>
  `,
};

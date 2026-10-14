import { newSpecPage } from '@stencil/core/testing';
import { NxCard } from '../nx-card';

describe('nx-card', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [NxCard],
      html: `<nx-card>Card content</nx-card>`,
    });

    expect(page.root).toEqualHtml(`
      <nx-card class="card-elevated padding-medium">
        <mock:shadow-root>
          <div class="card-inner">
            <div class="card-content-wrapper">
              <div class="card-media" hidden="" part="media">
                <slot name="media"></slot>
              </div>
              <div class="card-body" part="body">
                <slot></slot>
              </div>
              <div class="card-footer" hidden="" part="footer">
                <slot name="footer"></slot>
              </div>
            </div>
          </div>
        </mock:shadow-root>
        Card content
      </nx-card>
    `);
  });

  it('renders headerTitle and subtitle', async () => {
    const page = await newSpecPage({
      components: [NxCard],
      html: `<nx-card header-title="Title" subtitle="Subtitle">Content</nx-card>`,
    });

    const title = page.root?.shadowRoot?.querySelector('.card-title');
    const subtitle = page.root?.shadowRoot?.querySelector('.card-subtitle');

    expect(title?.textContent).toBe('Title');
    expect(subtitle?.textContent).toBe('Subtitle');
  });

  it('renders as a link when href is provided', async () => {
    const page = await newSpecPage({
      components: [NxCard],
      html: `<nx-card href="https://example.com" target="_blank">Link Card</nx-card>`,
    });

    const anchor = page.root?.shadowRoot?.querySelector('a.card-inner');
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute('href')).toBe('https://example.com');
    expect(anchor?.getAttribute('target')).toBe('_blank');
  });

  it('emits nxClick when clicked and not disabled', async () => {
    const page = await newSpecPage({
      components: [NxCard],
      html: `<nx-card hoverable>Clickable Card</nx-card>`,
    });

    const clickSpy = jest.fn();
    page.root?.addEventListener('nxClick', clickSpy);

    page.root?.click();
    expect(clickSpy).toHaveBeenCalled();
  });

  it('does not emit nxClick when disabled', async () => {
    const page = await newSpecPage({
      components: [NxCard],
      html: `<nx-card disabled hoverable>Disabled Card</nx-card>`,
    });

    const clickSpy = jest.fn();
    page.root?.addEventListener('nxClick', clickSpy);

    page.root?.click();
    expect(clickSpy).not.toHaveBeenCalled();
  });
});


import { html } from 'lit';

export default {
  title: 'NX Web Components/Components',
};

export const Buttons = {
  render: () => html`
    <section style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
      <nx-button>Primary</nx-button>
      <nx-button fill="outline">Outline</nx-button>
      <nx-button fill="clear">Clear</nx-button>
      <nx-button shape="round">Round</nx-button>
      <nx-button disabled>Disabled</nx-button>
    </section>
  `,
};

export const Inputs = {
  render: () => html`
    <section style="display:grid;gap:20px;max-width:420px">
      <nx-input label="Name" placeholder="Enter your name"></nx-input>
      <nx-input label="Email" type="email" placeholder="name@example.com"></nx-input>
      <nx-input label="Invalid input" value="Not valid" invalid></nx-input>
      <nx-input label="Disabled input" value="Unavailable" disabled></nx-input>
    </section>
  `,
};

export const Selection = {
  render: () => html`
    <section style="display:grid;gap:24px;max-width:420px">
      <nx-checkbox checked>Accept the terms</nx-checkbox>
      <nx-radio-group name="plan" value="standard">
        <nx-radio value="standard">Standard</nx-radio>
        <nx-radio value="premium">Premium</nx-radio>
      </nx-radio-group>
    </section>
  `,
};

export const Layout = {
  render: () => html`
    <nx-grid>
      <nx-row>
        <nx-col size-xs="12" size-sm="6"><div style="padding:16px;background:#f1f5f9">Column 1</div></nx-col>
        <nx-col size-xs="12" size-sm="6"><div style="padding:16px;background:#f1f5f9">Column 2</div></nx-col>
      </nx-row>
    </nx-grid>
  `,
};
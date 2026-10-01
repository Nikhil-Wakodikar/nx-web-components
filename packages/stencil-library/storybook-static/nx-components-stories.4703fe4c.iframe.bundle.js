"use strict";(self.webpackChunkstencil_library=self.webpackChunkstencil_library||[]).push([[962],{"./src/stories/nx-components.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Buttons:()=>Buttons,Inputs:()=>Inputs,Layout:()=>Layout,Selection:()=>Selection,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/lit/index.js");const __WEBPACK_DEFAULT_EXPORT__={title:"NX Web Components/Components"},Buttons={render:()=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`
    <section style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
      <nx-button>Primary</nx-button>
      <nx-button fill="outline">Outline</nx-button>
      <nx-button fill="clear">Clear</nx-button>
      <nx-button shape="round">Round</nx-button>
      <nx-button disabled>Disabled</nx-button>
    </section>
  `},Inputs={render:()=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`
    <section style="display:grid;gap:20px;max-width:420px">
      <nx-input label="Name" placeholder="Enter your name"></nx-input>
      <nx-input label="Email" type="email" placeholder="name@example.com"></nx-input>
      <nx-input label="Invalid input" value="Not valid" invalid></nx-input>
      <nx-input label="Disabled input" value="Unavailable" disabled></nx-input>
    </section>
  `},Selection={render:()=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`
    <section style="display:grid;gap:24px;max-width:420px">
      <nx-checkbox checked>Accept the terms</nx-checkbox>
      <nx-radio-group name="plan" value="standard">
        <nx-radio value="standard">Standard</nx-radio>
        <nx-radio value="premium">Premium</nx-radio>
      </nx-radio-group>
    </section>
  `},Layout={render:()=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`
    <nx-grid>
      <nx-row>
        <nx-col size-xs="12" size-sm="6"><div style="padding:16px;background:#f1f5f9">Column 1</div></nx-col>
        <nx-col size-xs="12" size-sm="6"><div style="padding:16px;background:#f1f5f9">Column 2</div></nx-col>
      </nx-row>
    </nx-grid>
  `},__namedExportsOrder=["Buttons","Inputs","Selection","Layout"];Buttons.parameters={...Buttons.parameters,docs:{...Buttons.parameters?.docs,source:{originalSource:'{\n  render: () => html`\n    <section style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">\n      <nx-button>Primary</nx-button>\n      <nx-button fill="outline">Outline</nx-button>\n      <nx-button fill="clear">Clear</nx-button>\n      <nx-button shape="round">Round</nx-button>\n      <nx-button disabled>Disabled</nx-button>\n    </section>\n  `\n}',...Buttons.parameters?.docs?.source}}},Inputs.parameters={...Inputs.parameters,docs:{...Inputs.parameters?.docs,source:{originalSource:'{\n  render: () => html`\n    <section style="display:grid;gap:20px;max-width:420px">\n      <nx-input label="Name" placeholder="Enter your name"></nx-input>\n      <nx-input label="Email" type="email" placeholder="name@example.com"></nx-input>\n      <nx-input label="Invalid input" value="Not valid" invalid></nx-input>\n      <nx-input label="Disabled input" value="Unavailable" disabled></nx-input>\n    </section>\n  `\n}',...Inputs.parameters?.docs?.source}}},Selection.parameters={...Selection.parameters,docs:{...Selection.parameters?.docs,source:{originalSource:'{\n  render: () => html`\n    <section style="display:grid;gap:24px;max-width:420px">\n      <nx-checkbox checked>Accept the terms</nx-checkbox>\n      <nx-radio-group name="plan" value="standard">\n        <nx-radio value="standard">Standard</nx-radio>\n        <nx-radio value="premium">Premium</nx-radio>\n      </nx-radio-group>\n    </section>\n  `\n}',...Selection.parameters?.docs?.source}}},Layout.parameters={...Layout.parameters,docs:{...Layout.parameters?.docs,source:{originalSource:'{\n  render: () => html`\n    <nx-grid>\n      <nx-row>\n        <nx-col size-xs="12" size-sm="6"><div style="padding:16px;background:#f1f5f9">Column 1</div></nx-col>\n        <nx-col size-xs="12" size-sm="6"><div style="padding:16px;background:#f1f5f9">Column 2</div></nx-col>\n      </nx-row>\n    </nx-grid>\n  `\n}',...Layout.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=nx-components-stories.4703fe4c.iframe.bundle.js.map
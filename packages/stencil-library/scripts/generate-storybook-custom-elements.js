const fs = require('fs');
const path = require('path');

const docsPath = path.resolve(__dirname, '../dist/docs.json');
const outputPath = path.resolve(__dirname, '../.storybook/custom-elements.json');

if (!fs.existsSync(docsPath)) {
  console.log('[generate-custom-elements] dist/docs.json not found, skipping');
  process.exit(0);
}

const docs = JSON.parse(fs.readFileSync(docsPath, 'utf8'));

const customElements = {
  tags: (docs.components || []).map((comp) => ({
    name: comp.tag,
    description: comp.docs || '',
    attributes: (comp.props || []).map((p) => ({
      name: p.attr || p.name,
      type: p.complexType?.original || p.type || 'string',
      description: p.docs || '',
      default: p.default || '',
      required: p.required || false,
    })),
    properties: (comp.props || []).map((p) => ({
      name: p.name,
      type: p.complexType?.original || p.type || 'string',
      description: p.docs || '',
      default: p.default || '',
      required: p.required || false,
    })),
    events: (comp.events || []).map((e) => ({
      name: e.event,
      description: e.docs || '',
      type: e.complexType?.original || e.detail || '',
    })),
    methods: (comp.methods || []).map((m) => ({
      name: m.name,
      description: m.docs || '',
      type: m.signature || '',
    })),
    slots: (comp.slots || []).map((s) => ({
      name: s.name === '' ? 'default' : s.name,
      description: s.docs || '',
    })),
    cssProperties: (comp.styles || []).map((style) => ({
      name: style.name,
      description: style.docs || '',
    })),
    cssParts: (comp.parts || []).map((part) => ({
      name: part.name,
      description: part.docs || '',
    })),
  })),
};

fs.writeFileSync(outputPath, JSON.stringify(customElements, null, 2), 'utf8');
console.log(`[generate-custom-elements] Generated ${customElements.tags.length} components into .storybook/custom-elements.json`);


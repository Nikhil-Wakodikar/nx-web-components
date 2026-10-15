const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');
const componentsPath = path.resolve(root, 'packages/angular-workspace/projects/component-library/src/lib/stencil-generated/components.ts');
const utilsPath = path.resolve(root, 'packages/angular-workspace/projects/component-library/src/lib/stencil-generated/angular-component-lib/utils.ts');
const templateUtilsPath = path.resolve(root, 'node_modules/@stencil/angular-output-target/angular-component-lib/utils.ts');

// 1. Patch utils.ts files to use EventEmitter and unwrap detail
function patchUtils(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (!content.includes('@angular/core')) {
    content = content.replace(
      "import { fromEvent, map } from 'rxjs';",
      "import { EventEmitter } from '@angular/core';\nimport { fromEvent, map } from 'rxjs';"
    );
    changed = true;
  }

  const oldProxyRegex = /export const proxyOutputs = \(instance: any, el: any, events: string\[\]\) => \{[\s\S]*?\n\};/;
  const newProxyOutputs = `export const proxyOutputs = (instance: any, el: any, events: string[]) => {
  events.forEach((eventName) => {
    const emitter = new EventEmitter();
    instance[eventName] = emitter;
    fromEvent(el, eventName).subscribe((ev: any) => {
      const data = ev && typeof ev === 'object' && 'detail' in ev ? ev.detail : ev;
      if (ev && typeof ev.stopImmediatePropagation === 'function') {
        ev.stopImmediatePropagation();
      }
      if (instance.z) {
        instance.z.run(() => emitter.emit(data));
      } else {
        emitter.emit(data);
      }
    });
  });
};`;

  if (oldProxyRegex.test(content)) {
    content = content.replace(oldProxyRegex, newProxyOutputs);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('[clean-angular-events] Patched proxyOutputs in', filePath);
  }
}

patchUtils(utilsPath);
patchUtils(templateUtilsPath);

// 2. Patch node_modules generator files to include outputs: [...] in @Component
const generatorFiles = [
  path.resolve(root, 'node_modules/@stencil/angular-output-target/dist/generate-angular-component.js'),
  path.resolve(root, 'node_modules/@stencil/angular-output-target/dist/index.cjs.js'),
  path.resolve(root, 'node_modules/@stencil/angular-output-target/dist/index.js'),
];

generatorFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('outputs: [${formattedOutputs}]')) {
      content = content.replace(
        /inputs: \[\$\{formattedInputs\}\],(\$\{standaloneOption\})/g,
        'inputs: [${formattedInputs}],${hasOutputs ? `\\n  outputs: [${formattedOutputs}],` : \'\'}$1'
      );
      fs.writeFileSync(file, content, 'utf8');
      console.log('[clean-angular-events] Patched generator file:', file);
    }
  }
});

// 3. Process components.ts
if (fs.existsSync(componentsPath)) {
  let content = fs.readFileSync(componentsPath, 'utf8');

  // 3a. Remove CustomEvent wrappers in EventEmitter<T>
  let prev = '';
  while (prev !== content) {
    prev = content;
    content = content.replace(/EventEmitter<CustomEvent<([^<>]+)>>/g, 'EventEmitter<$1>');
  }

  // 3b. Ensure outputs: [...] is declared on @Component whenever proxyOutputs is present
  const classBlocks = content.split(/(@Component\(\{[\s\S]*?export class \w+ \{[\s\S]*?\n\})/g);
  for (let i = 0; i < classBlocks.length; i++) {
    const block = classBlocks[i];
    if (block.startsWith('@Component({')) {
      const proxyMatch = block.match(/proxyOutputs\(this,\s*this\.el,\s*(\[[^\]]+\])\);/);
      if (proxyMatch && !block.includes('outputs:')) {
        const outputsStr = proxyMatch[1];
        classBlocks[i] = block.replace(
          /(inputs:\s*\[[^\]]*\],?)/,
          `$1\n  outputs: ${outputsStr},`
        );
      }
    }
  }
  content = classBlocks.join('');

  fs.writeFileSync(componentsPath, content, 'utf8');
  console.log('[clean-angular-events] Ensured outputs metadata and cleaned EventEmitters in components.ts.');
}

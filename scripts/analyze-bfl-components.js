#!/usr/bin/env node

/**
 * BFL Component Usage Analyzer
 * ----------------------------
 * Pre-deployment hook script for Azure DevOps pipelines.
 * Scans a build dist folder and reports all <bfl-*> web components found.
 *
 * Usage:
 *   node scripts/analyze-bfl-components.js <dist-path> [options]
 *
 * Options:
 *   --json              Output results as JSON
 *   --fail-on-missing   Exit with code 1 if no bfl- components found
 *   --min-components N  Fail if fewer than N unique components are detected
 *   --output <file>     Write report to a file
 *   --verbose           Show per-file breakdown
 *
 * Examples:
 *   node scripts/analyze-bfl-components.js ./dist
 *   node scripts/analyze-bfl-components.js ./dist --json --output report.json
 *   node scripts/analyze-bfl-components.js ./dist --verbose --min-components 5
 */

const fs = require('fs');
const path = require('path');

// ─── Configuration ───────────────────────────────────────────────
const COMPONENT_TAG_REGEX = /<bfl-[a-z][a-z0-9-]*/gi;
const DEFINE_CUSTOM_ELEMENT_REGEX = /defineCustomElement.*?["']bfl-[a-z][a-z0-9-]*["']/gi;
const TAG_NAME_REGEX = /bfl-[a-z][a-z0-9-]*/gi;
const SCANNABLE_EXTENSIONS = new Set([
  '.html', '.htm', '.js', '.mjs', '.cjs', '.jsx',
  '.ts', '.tsx', '.json', '.css', '.scss', '.svg',
]);

// ─── CLI Argument Parsing ────────────────────────────────────────
function parseArgs(argv) {
  const args = argv.slice(2);
  const options = {
    distPath: null,
    json: false,
    failOnMissing: false,
    minComponents: 0,
    outputFile: null,
    verbose: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--json':
        options.json = true;
        break;
      case '--fail-on-missing':
        options.failOnMissing = true;
        break;
      case '--min-components':
        options.minComponents = parseInt(args[++i], 10) || 0;
        break;
      case '--output':
        options.outputFile = args[++i];
        break;
      case '--verbose':
        options.verbose = true;
        break;
      default:
        if (!args[i].startsWith('--') && !options.distPath) {
          options.distPath = args[i];
        }
        break;
    }
  }

  return options;
}

// ─── File System Helpers ─────────────────────────────────────────
function getFilesRecursively(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip common non-relevant directories
      if (['node_modules', '.git', 'source-maps'].includes(entry.name)) continue;
      getFilesRecursively(fullPath, fileList);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (SCANNABLE_EXTENSIONS.has(ext)) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

// ─── Component Detection ─────────────────────────────────────────
function extractBflComponents(content) {
  const components = new Set();

  // Match HTML-style tags: <bfl-something
  const tagMatches = content.match(COMPONENT_TAG_REGEX) || [];
  for (const match of tagMatches) {
    // Remove the leading '<'
    components.add(match.slice(1).toLowerCase());
  }

  // Match defineCustomElement or tag name strings in JS bundles
  const defineMatches = content.match(DEFINE_CUSTOM_ELEMENT_REGEX) || [];
  for (const match of defineMatches) {
    const tagNames = match.match(TAG_NAME_REGEX) || [];
    for (const tag of tagNames) {
      components.add(tag.toLowerCase());
    }
  }

  // Match quoted tag name references like "bfl-button" or 'bfl-input'
  const quotedTagRegex = /["']bfl-[a-z][a-z0-9-]*["']/gi;
  const quotedMatches = content.match(quotedTagRegex) || [];
  for (const match of quotedMatches) {
    const tag = match.slice(1, -1).toLowerCase();
    components.add(tag);
  }

  return components;
}

// ─── Analysis Engine ─────────────────────────────────────────────
function analyzeDistFolder(distPath) {
  const absoluteDistPath = path.resolve(distPath);

  if (!fs.existsSync(absoluteDistPath)) {
    console.error(`❌ Error: dist path does not exist: ${absoluteDistPath}`);
    process.exit(1);
  }

  const stats = fs.statSync(absoluteDistPath);
  if (!stats.isDirectory()) {
    console.error(`❌ Error: path is not a directory: ${absoluteDistPath}`);
    process.exit(1);
  }

  const files = getFilesRecursively(absoluteDistPath);
  const allComponents = new Set();
  const componentUsageMap = {}; // component -> { count, files[] }
  const fileComponentMap = {}; // file -> Set<components>
  let totalFilesScanned = 0;
  let totalFilesWithComponents = 0;

  for (const filePath of files) {
    totalFilesScanned++;
    let content;
    try {
      content = fs.readFileSync(filePath, 'utf-8');
    } catch {
      continue; // skip unreadable files
    }

    const fileComponents = extractBflComponents(content);
    if (fileComponents.size > 0) {
      totalFilesWithComponents++;
      const relativePath = path.relative(absoluteDistPath, filePath);
      fileComponentMap[relativePath] = [...fileComponents].sort();

      for (const component of fileComponents) {
        allComponents.add(component);
        if (!componentUsageMap[component]) {
          componentUsageMap[component] = { count: 0, files: [] };
        }
        componentUsageMap[component].count++;
        componentUsageMap[component].files.push(relativePath);
      }
    }
  }

  return {
    distPath: absoluteDistPath,
    timestamp: new Date().toISOString(),
    summary: {
      totalFilesScanned,
      totalFilesWithComponents,
      uniqueComponentsFound: allComponents.size,
      components: [...allComponents].sort(),
    },
    componentDetails: Object.fromEntries(
      Object.entries(componentUsageMap)
        .sort(([a], [b]) => a.localeCompare(b))
    ),
    fileBreakdown: fileComponentMap,
  };
}

// ─── Report Formatting ───────────────────────────────────────────
function printTextReport(result, verbose) {
  const { summary, componentDetails } = result;

  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║        BFL Component Usage Analysis Report              ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  console.log(`📂 Dist Path:        ${result.distPath}`);
  console.log(`🕐 Analyzed At:      ${result.timestamp}`);
  console.log(`📄 Files Scanned:    ${summary.totalFilesScanned}`);
  console.log(`📋 Files with bfl-:  ${summary.totalFilesWithComponents}`);
  console.log(`🧩 Unique Components: ${summary.uniqueComponentsFound}\n`);

  if (summary.uniqueComponentsFound === 0) {
    console.log('⚠️  No bfl- components detected in the dist folder.\n');
    return;
  }

  // Component list table
  console.log('┌─────────────────────────────────────────┬──────────────┐');
  console.log('│ Component Tag                           │ Used In Files│');
  console.log('├─────────────────────────────────────────┼──────────────┤');

  for (const [component, data] of Object.entries(componentDetails)) {
    const tag = component.padEnd(39);
    const count = String(data.count).padStart(12);
    console.log(`│ ${tag} │ ${count} │`);
  }

  console.log('└─────────────────────────────────────────┴──────────────┘\n');

  // Verbose: per-file breakdown
  if (verbose) {
    console.log('📁 Per-file breakdown:\n');
    for (const [file, components] of Object.entries(result.fileBreakdown)) {
      console.log(`  ${file}`);
      for (const comp of components) {
        console.log(`    └── <${comp}>`);
      }
    }
    console.log('');
  }

  console.log(`✅ Total: ${summary.uniqueComponentsFound} unique bfl- component(s) detected across ${summary.totalFilesWithComponents} file(s).\n`);
}

// ─── Main ────────────────────────────────────────────────────────
function main() {
  const options = parseArgs(process.argv);

  if (!options.distPath) {
    console.error('Usage: node analyze-bfl-components.js <dist-path> [options]');
    console.error('');
    console.error('Options:');
    console.error('  --json              Output as JSON');
    console.error('  --fail-on-missing   Exit 1 if no components found');
    console.error('  --min-components N  Fail if fewer than N components');
    console.error('  --output <file>     Write report to file');
    console.error('  --verbose           Show per-file breakdown');
    process.exit(1);
  }

  const result = analyzeDistFolder(options.distPath);

  // Output
  if (options.json) {
    const jsonOutput = JSON.stringify(result, null, 2);
    if (options.outputFile) {
      fs.writeFileSync(options.outputFile, jsonOutput, 'utf-8');
      console.log(`📄 JSON report written to: ${options.outputFile}`);
    } else {
      console.log(jsonOutput);
    }
  } else {
    printTextReport(result, options.verbose);
    if (options.outputFile) {
      fs.writeFileSync(options.outputFile, JSON.stringify(result, null, 2), 'utf-8');
      console.log(`📄 Report also saved to: ${options.outputFile}`);
    }
  }

  // Gate checks
  const { uniqueComponentsFound } = result.summary;

  if (options.failOnMissing && uniqueComponentsFound === 0) {
    console.error('❌ PIPELINE GATE FAILED: No bfl- components found in dist.');
    process.exit(1);
  }

  if (options.minComponents > 0 && uniqueComponentsFound < options.minComponents) {
    console.error(
      `❌ PIPELINE GATE FAILED: Found ${uniqueComponentsFound} component(s), minimum required is ${options.minComponents}.`
    );
    process.exit(1);
  }

  // Set Azure DevOps pipeline variables (if running in pipeline)
  if (process.env.TF_BUILD) {
    console.log(`##vso[task.setvariable variable=BFL_COMPONENT_COUNT]${uniqueComponentsFound}`);
    console.log(`##vso[task.setvariable variable=BFL_COMPONENTS]${result.summary.components.join(',')}`);
    // Add build tag
    console.log(`##vso[build.addbuildtag]bfl-components:${uniqueComponentsFound}`);
  }

  process.exit(0);
}

main();

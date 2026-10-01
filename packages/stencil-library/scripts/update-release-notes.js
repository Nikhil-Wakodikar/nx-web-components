#!/usr/bin/env node

/**
 * Auto-generate release notes from git commits
 * 
 * Usage:
 *   node scripts/update-release-notes.js              # Uses commits since last tag
 *   node scripts/update-release-notes.js --since=HEAD~10  # Last 10 commits
 *   node scripts/update-release-notes.js --since=v1.0.0   # Since specific tag
 * 
 * This script automatically detects:
 *   - New/modified components from git history
 *   - New @Prop() declarations
 *   - Story paths from component story files
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const RELEASE_NOTES_PATH = path.join(__dirname, '../src/stories/release-notes.mdx');
const COMPONENTS_DIR = path.join(__dirname, '../src/components');
const VERSION_JSON_PATH = path.join(__dirname, '../../../version.json');

// Cache for discovered story paths
const storyPathCache = {};

/**
 * Read version from version.json file
 */
function getVersionFromFile() {
  try {
    const versionData = JSON.parse(fs.readFileSync(VERSION_JSON_PATH, 'utf8'));
    return versionData.version || '1.0.0';
  } catch (e) {
    console.warn('⚠️ Could not read version.json, using default version');
    return '1.0.0';
  }
}

/**
 * Dynamically discover story path from component's story file
 */
function discoverStoryPath(componentName) {
  if (storyPathCache[componentName]) {
    return storyPathCache[componentName];
  }

  const componentDir = path.join(COMPONENTS_DIR, componentName);

  // Try to find story file in component directory
  if (fs.existsSync(componentDir)) {
    const files = fs.readdirSync(componentDir);
    const storyFile = files.find(f => f.endsWith('.stories.ts') || f.endsWith('.stories.tsx'));

    if (storyFile) {
      try {
        const content = fs.readFileSync(path.join(componentDir, storyFile), 'utf8');
        // Match title: 'Design System/Components/Category/Component Name'
        const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
        if (titleMatch) {
          // Convert "Design System/Components/Form Controls/Amount Input" 
          // to "design-system-components-form-controls-amount-input"
          const storyPath = titleMatch[1]
            .toLowerCase()
            .replace(/\s*\/\s*/g, '-')
            .replace(/\s+/g, '-')
            .replace(/&/g, 'and');
          storyPathCache[componentName] = storyPath;
          return storyPath;
        }
      } catch (e) {
        // Ignore read errors
      }
    }
  }

  // Fallback: generate path from component name
  const fallbackPath = `design-system-components-${componentName.toLowerCase()}`;
  storyPathCache[componentName] = fallbackPath;
  return fallbackPath;
}

function getStoryPath(componentName) {
  const normalized = componentName.toLowerCase().replace(/\s+/g, '-');
  return discoverStoryPath(normalized);
}

function runGit(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', cwd: path.join(__dirname, '..') }).trim();
  } catch (e) {
    return '';
  }
}

function getCommitsSince(since) {
  // Default to last 10 commits for recent changes only
  const range = since || runGit('git describe --tags --abbrev=0 2>/dev/null') || 'HEAD~10';
  const log = runGit(`git log ${range}..HEAD --pretty=format:"%H|%s" -- src/components`);
  if (!log) return [];
  return log.split('\n').filter(Boolean).map(line => {
    const [hash, ...msgParts] = line.split('|');
    return { hash, message: msgParts.join('|') };
  });
}

function getCommitDiff(hash) {
  return runGit(`git show ${hash} --stat --name-only`);
}

function getCommitPatch(hash) {
  return runGit(`git show ${hash} -p`);
}

/**
 * Check if this commit introduces a new component
 */
function isNewComponent(hash, componentName) {
  // Check if the component's main .tsx file was added (not modified)
  const diff = runGit(`git show ${hash} --diff-filter=A --name-only`);
  return diff.includes(`components/${componentName}/`) &&
    (diff.includes('.tsx') || diff.includes('.ts'));
}

function extractComponentName(filePath) {
  const match = filePath.match(/components\/([^/]+)\//);
  return match ? match[1] : null;
}

function detectNewProps(patch) {
  const addedProps = [];
  const removedProps = new Set();
  const lines = patch.split('\n');

  // First pass: collect removed props (existing props being modified)
  for (const line of lines) {
    if (line.startsWith('-') && !line.startsWith('---')) {
      const match = line.match(/@Prop\([^)]*\)\s*(\w+)\s*(?::|!)/);
      if (match) {
        removedProps.add(match[1].trim());
      }
    }
  }

  // Second pass: collect added props that are truly NEW (not in removed set)
  for (const line of lines) {
    if (line.startsWith('+') && !line.startsWith('+++')) {
      const match = line.match(/@Prop\([^)]*\)\s*(\w+)\s*(?::|!)\s*([^=;]+)/);
      if (match) {
        const propName = match[1].trim();
        const propType = match[2].trim();
        // Only add if this is a truly NEW prop (not modification of existing)
        if (!removedProps.has(propName)) {
          addedProps.push({ name: propName, type: propType });
        }
      }
    }
  }
  return addedProps;
}

// Generate realistic example values based on prop name and type
function getExampleValue(propName, propType) {
  const name = propName.toLowerCase();
  const type = propType.toLowerCase();

  // Style-related props
  if (name.includes('style') || name.includes('styles')) {
    return "{ width: '20px', height: '20px', borderRadius: '24px' }";
  }
  if (name.includes('iconstyle')) {
    return "{ width: '32px', height: '32px' }";
  }

  // URL props
  if (name.includes('url') || name.includes('icon') && name.includes('url')) {
    return "'assets/icon.png'";
  }
  if (name.includes('imageurl') || name.includes('backgroundimage')) {
    return "'assets/image.jpg'";
  }

  // Text props
  if (name.includes('title') || name.includes('header') || name.includes('label')) {
    return "'Your Title Here'";
  }
  if (name.includes('subtitle') || name.includes('subtext') || name.includes('subheader')) {
    return "'Subtitle text'";
  }
  if (name.includes('text') || name.includes('name') || name.includes('message')) {
    return "'Sample text'";
  }
  if (name.includes('status')) {
    return "'active'";
  }

  // Position/alignment props
  if (name.includes('align') || name.includes('position')) {
    return "'left'";
  }
  if (name.includes('top') || name.includes('bottom') || name.includes('left') || name.includes('right')) {
    return "100";
  }

  // Boolean props
  if (type.includes('boolean') || name.startsWith('is') || name.startsWith('has') || name.startsWith('show') || name.includes('expandable') || name.includes('forcefully')) {
    return "true";
  }

  // Number props
  if (type.includes('number')) {
    return "10";
  }

  // Object/any type
  if (type.includes('object') || type.includes('{')) {
    return "{ key: 'value' }";
  }

  // Array type
  if (type.includes('[]') || type.includes('array')) {
    return "[]";
  }

  // Default string
  return "'value'";
}

function categorizeCommit(commit) {
  const msg = commit.message.toLowerCase();
  const patch = getCommitPatch(commit.hash);
  const diff = getCommitDiff(commit.hash);

  // Extract component names from changed files
  const components = new Set();
  const newComponents = new Set();
  diff.split('\n').forEach(line => {
    const comp = extractComponentName(line);
    if (comp) {
      components.add(comp);
      // Check if this is a newly created component
      if (isNewComponent(commit.hash, comp)) {
        newComponents.add(comp);
      }
    }
  });

  // Detect new props
  const newProps = detectNewProps(patch);

  // Categorize based on commit message and changes
  let category = 'changed';
  if (msg.includes('fix:') || msg.includes('fix ') || msg.includes('fixed')) {
    category = 'fixed';
  } else if (newComponents.size > 0 || msg.includes('new component') || msg.includes('created')) {
    category = 'added';
  } else if (msg.includes('add') || msg.includes('new') || msg.includes('create') || newProps.length > 0) {
    category = 'added';
  } else if (msg.includes('remove') || msg.includes('delete')) {
    category = 'removed';
  } else if (msg.includes('deprecat')) {
    category = 'deprecated';
  }

  // Check if it's a storybook-only change
  const isStorybookOnly = diff.includes('.stories.') && !diff.match(/\.tsx?$/m);

  return {
    ...commit,
    category,
    components: Array.from(components),
    newComponents: Array.from(newComponents),
    newProps,
    isStorybookOnly,
    isCssOnly: diff.includes('.scss') && !diff.match(/\.tsx?$/m),
  };
}

function formatComponentLink(componentName) {
  const storyPath = getStoryPath(componentName);
  const displayName = componentName
    .replace(/^nx-/, '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return `[${displayName}](?path=/docs/${storyPath}--docs)`;
}

// Generate appropriate change description based on commit context
function generateChangeDescription(commit, componentName) {
  const { message, newProps, newComponents, isStorybookOnly, isCssOnly, category } = commit;
  const msg = message.toLowerCase();

  // Format component display name
  const displayName = componentName
    .replace(/^nx-/, '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  // Check if this is a brand new component
  if (newComponents && newComponents.includes(componentName)) {
    return `New component added to the library`;
  }

  // Fix category - check first before other checks
  if (category === 'fixed') {
    if (msg.includes('floating') || msg.includes('position')) {
      return `Fixed positioning and floating behavior`;
    }
    if (msg.includes('scroll')) {
      return `Fixed scrolling behavior`;
    }
    if (msg.includes('responsive') || msg.includes('mobile')) {
      return `Fixed responsive layout issues`;
    }
    if (msg.includes('behaviour') || msg.includes('behavior')) {
      return `Fixed component behavior`;
    }
    return `Bug fixes and stability improvements`;
  }

  // If new props were added
  if (newProps.length > 0) {
    const propNames = newProps.map(p => `\`${p.name}\``).join(', ');
    return `Added new ${newProps.length > 1 ? 'properties' : 'property'} ${propNames} for enhanced customization`;
  }

  // Storybook-only changes
  if (isStorybookOnly || msg.includes('storybook')) {
    return `Updated Storybook documentation with improved examples and usage guidelines`;
  }

  // CSS/styling changes
  if (isCssOnly || msg.includes('css') || msg.includes('style') || msg.includes('ui fix')) {
    return `Improved visual styling and UI consistency`;
  }

  // New component (fallback check from commit message)
  if (msg.includes('new component') || msg.includes('created')) {
    return `New component added to the library`;
  }

  // Generic update
  return `Component updated with improvements`;
}

function generatePropUsageBlock(componentName, props) {
  // props is an array of { name, type } objects
  const selector = componentName.startsWith('nx-')
    ? componentName
    : `nx-${componentName}`;

  // Build prop lines with green highlight
  const propLines = props.map(prop => {
    const sampleValue = getExampleValue(prop.name, prop.type);
    const escapedPropLine = `[${prop.name}]="${sampleValue}"`.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
    return `<span style={{ display: "block", padding: "2px 10px", background: "#dafbe1", color: "#116329" }}>  ${escapedPropLine}</span>`;
  }).join('\n');

  // Build props list for heading
  const propNames = props.map(p => `\`${p.name}\``).join(', ');

  return `
### ${formatComponentLink(componentName)} - ${propNames}

<div style={{ border: "1px solid #d0d7de", borderRadius: "8px", overflow: "hidden", margin: "10px 0 14px" }}>
	<div style={{ background: "#f6f8fa", color: "#57606a", padding: "8px 10px", fontFamily: "ui-monospace,Menlo,Consolas,monospace", fontSize: "12px" }}>Usage</div>
	<pre style={{ margin: 0, padding: "8px 0", fontFamily: "ui-monospace,Menlo,Consolas,monospace", fontSize: "12px", lineHeight: 1.45, background: "#ffffff" }}>
<span style={{ display: "block", padding: "2px 10px" }}>&lt;${selector}</span>
${propLines}
<span style={{ display: "block", padding: "2px 10px" }}>&gt;&lt;/${selector}&gt;</span>
	</pre>
</div>
`;
}

function generateReleaseNotes(categorizedCommits, version, date) {
  const added = categorizedCommits.filter(c => c.category === 'added');
  const changed = categorizedCommits.filter(c => c.category === 'changed');
  const fixed = categorizedCommits.filter(c => c.category === 'fixed');
  const removed = categorizedCommits.filter(c => c.category === 'removed');
  const deprecated = categorizedCommits.filter(c => c.category === 'deprecated');

  // Helper function to group commits by component and merge messages
  function groupByComponent(commits) {
    const grouped = {};
    commits.forEach(c => {
      c.components.forEach(comp => {
        if (!grouped[comp]) {
          grouped[comp] = {
            messages: [],
            newProps: [],
            isStorybookOnly: true,
            isCssOnly: true
          };
        }
        // Generate appropriate description instead of using raw commit message
        const description = generateChangeDescription(c, comp);
        // Avoid duplicate messages
        if (!grouped[comp].messages.includes(description)) {
          grouped[comp].messages.push(description);
        }
        // Collect all new props (props are now objects with { name, type })
        c.newProps.forEach(prop => {
          if (!grouped[comp].newProps.some(p => p.name === prop.name)) {
            grouped[comp].newProps.push(prop);
          }
        });
        // Track if any commit is not storybook-only or css-only
        if (!c.isStorybookOnly) grouped[comp].isStorybookOnly = false;
        if (!c.isCssOnly) grouped[comp].isCssOnly = false;
      });
    });
    return grouped;
  }

  // Collect all new props for the usage section
  const allNewProps = [];
  categorizedCommits.forEach(c => {
    c.newProps.forEach(prop => {
      c.components.forEach(comp => {
        // Avoid duplicates (props are objects with { name, type })
        if (!allNewProps.some(p => p.component === comp && p.prop.name === prop.name)) {
          allNewProps.push({ component: comp, prop });
        }
      });
    });
  });

  let md = `import { Meta } from "@storybook/blocks";

<Meta title="Release Notes" />

# Component Library Release Notes

Track what was added, changed, fixed, removed, and deprecated in each deployment.

**Version:** \`${version}\`  
**Released:** \`${date}\`  
**Focus:** Component updates and improvements.

## Highlights
`;

  if (added.length > 0) {
    md += `\n### Added\n`;
    const grouped = groupByComponent(added);
    Object.keys(grouped).forEach(comp => {
      const { messages } = grouped[comp];
      md += `- ${formatComponentLink(comp)}: ${messages.join('; ')}.\n`;
    });
  }

  if (changed.length > 0) {
    md += `\n### Changed\n`;
    const grouped = groupByComponent(changed);
    Object.keys(grouped).forEach(comp => {
      const { messages, isStorybookOnly, isCssOnly } = grouped[comp];
      const suffix = isStorybookOnly ? ' (Storybook docs updated)' : '';
      const cssSuffix = isCssOnly && !isStorybookOnly ? ' (CSS styling updated)' : '';
      md += `- ${formatComponentLink(comp)}: ${messages.join('; ')}.${suffix}${cssSuffix}\n`;
    });
  }

  if (fixed.length > 0) {
    md += `\n### Fixed\n`;
    const grouped = groupByComponent(fixed);
    Object.keys(grouped).forEach(comp => {
      const { messages } = grouped[comp];
      md += `- ${formatComponentLink(comp)}: ${messages.join('; ')}.\n`;
    });
  }

  if (removed.length > 0) {
    md += `\n### Removed\n`;
    const grouped = groupByComponent(removed);
    Object.keys(grouped).forEach(comp => {
      const { messages } = grouped[comp];
      md += `- ${formatComponentLink(comp)}: ${messages.join('; ')}.\n`;
    });
  }

  if (deprecated.length > 0) {
    md += `\n### Deprecated\n`;
    const grouped = groupByComponent(deprecated);
    Object.keys(grouped).forEach(comp => {
      const { messages } = grouped[comp];
      md += `- ${formatComponentLink(comp)}: ${messages.join('; ')}.\n`;
    });
  }

  // Add new props usage section - group by component
  if (allNewProps.length > 0) {
    md += `\n## New Props Usage\n`;

    // Group props by component
    const propsByComponent = {};
    allNewProps.forEach(({ component, prop }) => {
      if (!propsByComponent[component]) {
        propsByComponent[component] = [];
      }
      propsByComponent[component].push(prop);
    });

    // Generate one block per component with all its props
    Object.keys(propsByComponent).forEach(component => {
      md += generatePropUsageBlock(component, propsByComponent[component]);
    });
  }

  return md;
}

function main() {
  const args = process.argv.slice(2);
  let since = null;
  let version = getVersionFromFile(); // Read from version.json

  args.forEach(arg => {
    if (arg.startsWith('--since=')) {
      since = arg.replace('--since=', '');
    }
    if (arg.startsWith('--version=')) {
      version = arg.replace('--version=', ''); // Allow override via CLI
    }
  });

  console.log('📝 Fetching commits...');
  const commits = getCommitsSince(since);

  if (commits.length === 0) {
    console.log('No component changes found.');
    return;
  }

  console.log(`Found ${commits.length} commits affecting components.`);

  console.log('🔍 Analyzing changes...');
  const categorized = commits.map(categorizeCommit);

  const date = new Date().toISOString().split('T')[0];
  const releaseNotes = generateReleaseNotes(categorized, version, date);

  console.log('📄 Writing release notes...');
  fs.writeFileSync(RELEASE_NOTES_PATH, releaseNotes);

  console.log(`✅ Release notes updated: ${RELEASE_NOTES_PATH}`);
  console.log('\nSummary:');
  console.log(`  Added: ${categorized.filter(c => c.category === 'added').length}`);
  console.log(`  Changed: ${categorized.filter(c => c.category === 'changed').length}`);
  console.log(`  Fixed: ${categorized.filter(c => c.category === 'fixed').length}`);
  console.log(`  Removed: ${categorized.filter(c => c.category === 'removed').length}`);
  console.log(`  Deprecated: ${categorized.filter(c => c.category === 'deprecated').length}`);
}

main();

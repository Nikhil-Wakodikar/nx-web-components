/**
 * BFL AI Suggestions Generator
 * Uses Azure OpenAI (GPT-4) to generate actionable suggestions
 * for improving BFL component library adoption.
 *
 * Usage:
 *   node scripts/bfl-ai-suggestions.js --report bfl-component-report.json
 *
 * Environment Variables:
 *   AZURE_OPENAI_ENDPOINT    - Azure OpenAI endpoint URL
 *   AZURE_OPENAI_KEY         - API key
 *   AZURE_OPENAI_DEPLOYMENT  - Deployment/model name
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// ─── Configuration ───────────────────────────────────────────────────────────
const config = {
  endpoint: process.env.AZURE_OPENAI_ENDPOINT || "",
  apiKey: process.env.AZURE_OPENAI_KEY || "",
  deployment: process.env.AZURE_OPENAI_DEPLOYMENT || "",
  apiVersion: "2025-01-01-preview",
};

if (!config.endpoint || !config.apiKey || !config.deployment) {
  console.error("❌ Missing required environment variables:");
  if (!config.endpoint) console.error("   - AZURE_OPENAI_ENDPOINT");
  if (!config.apiKey) console.error("   - AZURE_OPENAI_KEY");
  if (!config.deployment) console.error("   - AZURE_OPENAI_DEPLOYMENT");
  process.exit(1);
}

// ─── Parse CLI args ──────────────────────────────────────────────────────────
const args = process.argv.slice(2);
let reportPath = "bfl-component-report.json";
const reportArgIdx = args.indexOf("--report");
if (reportArgIdx !== -1 && args[reportArgIdx + 1]) {
  reportPath = args[reportArgIdx + 1];
}

// ─── Read Report ─────────────────────────────────────────────────────────────
const fullReportPath = path.resolve(reportPath);
if (!fs.existsSync(fullReportPath)) {
  console.error(`❌ Report not found: ${fullReportPath}`);
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(fullReportPath, "utf-8"));

// ─── Build Prompt ────────────────────────────────────────────────────────────
function buildPrompt(report) {
  const { aggregatedReport, pageWiseReport } = report;

  const lowCoveragePages = Object.entries(pageWiseReport)
    .filter(
      ([, data]) =>
        data.bflCoveragePercent < 50 && data.nonBflComponentsUsed > 0
    )
    .map(([name, data]) => ({
      component: data.componentName,
      coverage: data.bflCoveragePercent,
      nonBfl: data.componentList.nonBfl,
    }));

  const prompt = `You are an expert UI designer and Angular architect. Given the following BFL Component Coverage Report for the Gold Loan module:

Overall Coverage: ${aggregatedReport.bflCoveragePercent}%
- Total Components Used: ${aggregatedReport.totalComponentsUsed}
- BFL Components: ${aggregatedReport.totalBflComponentsUsed}
- Non-BFL Components: ${aggregatedReport.totalNonBflComponentsUsed}

Pages with Low BFL Coverage (<50%):
${lowCoveragePages
  .map(
    (p) =>
      `- ${p.component} (${p.coverage}% coverage) — Non-BFL: [${p.nonBfl.join(", ")}]`
  )
  .join("\n")}

Based on this data, generate a single visually appealing HTML block for an "AI-Powered Suggestions" section to be embedded inside an email body.

CRITICAL EMAIL RENDERING RULES (must follow strictly):
- Use ONLY inline styles (style="...") on every element. Do NOT use <style> tags or CSS classes.
- Use ONLY table-based layouts. Do NOT use CSS grid, flexbox, or float.
- Use simple, email-safe elements: <table>, <tr>, <td>, <div>, <span>, <ul>, <li>, <strong>, <p>, <h3>, <h4>.
- Do NOT use <svg>, <img>, or any external resources.
- Use emoji characters (🔴🟡🟢⚡✅⚠️📊🎯🚀) for icons instead of SVGs.
- All widths should be in pixels or percentages on table/td elements.
- Use cellpadding, cellspacing attributes on tables.
- Keep fonts to: 'Segoe UI', Arial, sans-serif.
- Use border, background-color, padding, margin as inline styles.
- Ensure proper spacing with padding on <td> elements.
- Make text readable: minimum 12px font-size, proper line-height (1.5+).
- Use color-coded left borders on table rows/cells for priority (red), quick wins (green), risk (orange).

The content should include:
  1. Top 3 Priority Actions (specific components to replace and with what BFL equivalent)
  2. Quick Wins (easiest replacements that can boost coverage immediately)
  3. Risk Assessment (which non-BFL components pose compliance/UX consistency risks)
  4. Estimated Coverage After Fixes (if suggestions are implemented)

Output ONLY the raw HTML. No markdown, no explanation, no code fences.`;
  return prompt;
}

// ─── Call Azure OpenAI ───────────────────────────────────────────────────────
function callAzureOpenAI(prompt) {
  return new Promise((resolve, reject) => {
    const url = `${config.endpoint}/openai/deployments/${config.deployment}/chat/completions?api-version=${config.apiVersion}`;
    const parsedUrl = new URL(url);

    const payload = JSON.stringify({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful Angular architecture advisor for Bajaj Finserv. Provide specific, actionable suggestions for improving BFL component library adoption. Be concise and practical.",
        },
        { role: "user", content: prompt },
      ],
      max_completion_tokens: 16000,
    });

    const options = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": config.apiKey,
        "Content-Length": Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(
            new Error(
              `API Error ${res.statusCode}: ${data.substring(0, 500)}`
            )
          );
          return;
        }
        try {
          const json = JSON.parse(data);
          const content = json.choices?.[0]?.message?.content || "";
          resolve(content);
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on("error", (e) => reject(e));
    req.write(payload);
    req.end();
  });
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🤖 Generating AI suggestions for BFL coverage improvement...\n");
  console.log(
    `📊 Current Coverage: ${report.aggregatedReport.bflCoveragePercent}% (${report.aggregatedReport.totalBflComponentsUsed}/${report.aggregatedReport.totalComponentsUsed} components)\n`
  );

  const prompt = buildPrompt(report);

  try {
    const suggestionsHtml = await callAzureOpenAI(prompt);

    console.log("═".repeat(70));
    console.log("🤖 AI-GENERATED SUGGESTIONS FOR BFL COVERAGE IMPROVEMENT (HTML)");
    console.log("═".repeat(70));
    console.log(suggestionsHtml);
    console.log("═".repeat(70));

    const output = {
      generatedAt: new Date().toISOString(),
      model: config.deployment,
      currentCoverage: report.aggregatedReport.bflCoveragePercent,
      suggestionsHtml: suggestionsHtml,
    };

    const outputPath = path.resolve("bfl-ai-suggestions.json");
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`\n✅ Suggestions saved to: ${outputPath}`);
  } catch (error) {
    console.error(`\n❌ AI Generation Failed: ${error.message}`);
    console.log("\n📋 Falling back to static suggestions...\n");
    printStaticFallback(report);
  }
}

// ─── Static Fallback ─────────────────────────────────────────────────────────
function printStaticFallback(report) {
  const { pageWiseReport } = report;
  const nonBflAll = new Set();
  Object.values(pageWiseReport).forEach((page) =>
    page.componentList.nonBfl.forEach((c) => nonBflAll.add(c))
  );

  console.log("Static Suggestions:");
  console.log(`- Replace Material components (mat-*) with BFL equivalents`);
  console.log(`- Non-BFL components found: ${[...nonBflAll].join(", ")}`);
  console.log(`- Target: 80%+ BFL coverage`);
}

main();

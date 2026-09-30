export default {
  title: 'Documentation/BFL Component Coverage Dashboard',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive dashboard showing BFL component usage across all deployed modules.',
      },
    },
  },
};

// Module name to webpack folder mapping (platform-specific)
const MODULE_FOLDER_MAP: Record<string, Record<string, string>> = {
  app: {
    'hamburger': 'pwa-hamburger',
    'arvr': 'remote-arvr',
    'search': 'pwa-search',
    'loan-against-insurance-policy-application-form': 'remote-laip_las',
    'lsf': 'remote-lsf',
    'esop': 'remote-esop-service',
    'medicalEqpFinance': 'mf-mef-ief-old',
    'mefx': 'mf-mef-ief',
    'drawdown': 'mf-drawdown',
    'businessloan': 'mf-bl',
    'BlseP3S3': 'mf-blse',
    'pharma': 'mf-pharma',
    'offersModulenew': 'mf-offerworld',
    'salpl': 'mf-salpl',
    'upi-autopay': 'mf-upiautopay',
    'mycart': 'remote-mycart',
    'clp': 'pwa-old-clp',
    'clp-xaop': 'pwa-clp',
    'myaccount': 'pwa-remote-app-account',
    'plcard': 'mf-plcard_acq',
    'commonScreen': 'mf-faq',
    'chr': 'mf-chr',
    'onboardingRar': 'remote-onboarding-rar',
    'extended-warranty': 'extended-warranty',
    'profile_new': 'pwa-profile',
    'Homeloan': 'home-loan',
    'blxaop': 'mf-sme-common',
    'blsexaop': 'mf-sme-common',
    'profxaop': 'mf-sme-common',
    'debt': 'mf-sme-common',
    'ncf': 'ncf-deployment',
    'loan-against-mutual-funds-application-form': 'lamf-seperate',
    'pdpx': 'mf-pdpx',
    'pdp': 'mf-pdp_old',
    'creditcard': 'mf-creditcard',
    'professional-loan': 'prof-loan',
    'emiCardServices': 'emi-card-services',
    'paymentServiceXaop': 'mf-paymentServicexaop',
    'loancancel': 'mf-loancancel',
    'fdServices': 'remote-fd-services',
    'mDServices': 'remote-mandate-service',
    'Dnc': 'remote-dnc',
    'nps': 'remote-nps',
    'emicard': 'remote-emiacq',
    'docCentre': 'remote-doccentre',
    'Ucf': 'remote-usedcar-finance',
    'Ucf_DPAOP': 'remote-usedcar-finance',
    'serviceInsurance': 'remote-insurenceservices',
    'ChatBot': 'remote-chat-bot',
    'rar': 'remote-rar',
    'lasServices': 'remote-las-service',
    'micro-finance': 'remote-mfi',
    'my-order': 'remote-myorder',
    'my-order-revamp': 'remote-myorder-revamp',
    'consent-revocation': 'remote-consent-revocation',
    'refer-earn': 'remote-app-refernearn',
    'face-auth': 'remote-face-auth',
    'b2b-sce': 'remote-sce',
    'aiax': 'remote-appinapp',
    'consent': 'remote-consent-mng',
    'irctc': 'remote-irctc',
    'pl-emi': 'remote-plemicards_service',
    'icl': 'mf_icl',
    'lapx': 'remote-lap',
    'dms': 'remote-dms',
    'b2c': 'remote-app-b2c',
    'Calculator': 'mf-calculator',
    'loan-against-shares-application-form': 'mf-las',
    'serviceGoldLoan': 'mf-gl-service',
    'serviceGoldLoanL2': 'mf-gl-service',
    'ruralGoldLoanXAOP': 'mf-rgl',
    'ruralGoldLoanXAOP2': 'remote-app-rgl',
    'b2corder': 'b2c-order',
    'Deposit': 'fd-acq',
    'commercial-cibil': 'com-cibil',
    'rewards': 'mf-rewards',
    'paymentService': 'mf-paymentServiceold',
    'sce': 'mf-sce',
    'StoreLocator': 'mf-store-locator',
    'cdloan': 'remote-b2b',
    'eduloan': 'remote-b2b',
    'slv': 'mf-slv',
    'mf-las': 'mf-las',
    'remote-gst': 'remote-gst',
    'offersModule': 'offer-world-old',
    'tractor-loan': 'remote-tractor-loan',
    'cv': 'remote-app-cv-dpaop',
    'two-wheeler': 'remote-twf',
    'redbus': 'remote-redbus',
    'government_service': 'remote-govt-services',
    'business_landing': 'remote-app-business-landing',
    'consent-new': 'remote-app-consent-mng',
    'b2b-redir': 'remote-b2b-redir',
    'newsandinfotainment': 'remote-newsandinfotainment',
    'homepageDynamic': 'federation-pwa-home-page-banners',
  },
  web: {
    'loan-against-mutual-funds-application-form': 'remote-app-lamf',
    'loan-against-shares-application-form': 'remote-app-las',
    'loan-against-insurance-policy-application-form': 'remote-app-laip',
    'rewards': 'remote-app-rewards',
    'cdqr-web': 'remote-cdqr',
    'Deposit': 'remote-app-deposit',
    'commercial-cibil': 'remote-app-commercial-cibil',
    'government_service': 'remote-government-services',
    'ChatBot': 'remote-app-chat-bot',
    'Ucf_DPAOP': 'remote-usedcar-finance',
    'dms': 'remote-dms',
    'paymentServiceXaop': 'mf-paymentServicexaop',
    'loancancel': 'mf-loancancel',
    'search': 'remote-app-search',
    'tractor-loan': 'remote-tractor-loan',
    'cv': 'remote-app-cv-dpaop',
    'consent-revocation': 'remote-app-consent-revocation',
    'refer-earn': 'remote-app-refernearn',
    'face-auth': 'remote-app-face-auth',
    'ncf': 'ncf-deployment',
    'emiCardServices': 'remote-app-emicardservice',
    'serviceInsurance': 'remote-app-service-insurance',
    'profile_new': 'remote-app-profile',
    'lasServices': 'remote-app-lasservice',
    'business_landing': 'remote-app-business-landing',
    'extended-warranty': 'remote-ew',
    'b2corder': 'remote-b2c-order',
    'mycart': 'remote-app-my-cart',
    'my-order': 'remote-app-myorder',
    'my-order-revamp': 'remote-app-myorder-revamp',
    'myaccount': 'remote-app-my-account',
    'serviceGoldLoan': 'remote-app-goldloan-services',
    'serviceGoldLoanL2': 'remote-app-goldloan-services',
    'rar': 'remote-app-rar',
    'fdServices': 'remote-app-fd-service',
    'mDServices': 'remote-app-mdservice',
    'Dnc': 'remote-app-dnc-revamp',
    'remote-gst': 'remote-app-gst',
    'drawdown': 'remote-app-drawdown',
    'lapx': 'remote-lap',
    'b2c': 'remote-app-b2c',
    'blxaop': 'remote-app-sme',
    'blsexaop': 'remote-app-sme',
    'profxaop': 'remote-app-sme',
    'debt': 'remote-app-sme',
    'micro-finance': 'remote_mfi',
    'sce': 'remote-app-sce',
    'b2b-sce': 'remote-b2b-sce',
    'cdloan-web': 'remote-web-b2b',
    'eduloan-web': 'remote-web-b2b',
    'emicard-web': 'remote-app-emicardacq',
    'flipkart-web': 'remote-app-emiflipkart',
    'nps': 'remote-nps',
    'redbus': 'remote-redbus',
    'irctc': 'remote-irctc',
    'clp-xaop': 'pwa-clp',
    'docCentre': 'remote-app-doccenter',
    'newsandinfotainment': 'remote-newsandinfotainment',
    'StoreLocator': 'remote-app-storelocator',
  },
};

// ── Custom / Internal Component Prefixes ─────────────────────
// Components matching these prefixes are internal Angular components
// that may wrap BFL components internally. They should NOT count as
// "non-BFL" because they are the app's own structural components,
// not third-party alternatives to BFL.
const CUSTOM_COMPONENT_PREFIXES = [
  'app-',       // Angular app components (app-header, app-footer, etc.)
  'header-',    // Header widgets (header-widget, etc.)
  'footer-',    // Footer widgets
  'widget-',    // Generic widgets
  'page-',      // Page-level wrappers
  'layout-',    // Layout wrappers
  'shared-',    // Shared internal components
  'common-',    // Common internal components
];

// Standard HTML tags — NOT custom elements. Cannot be detected by the\n// report generator since it only scans for tags with hyphens (custom elements).\n// Components built purely with native HTML (div, span, etc.) are invisible\n// to this analysis. Only Angular/Web Component selectors are detectable.\n// Reference list: div, span, p, a, img, input, button, form, h1-h6,\n// ul, ol, li, table, tr, td, th, section, article, nav, main, etc.

/**
 * Checks whether a component tag is a custom/internal component
 * (should be excluded from non-BFL count).
 */
const isCustomComponent = (tag: string): boolean => {
  const lower = tag.toLowerCase();
  return CUSTOM_COMPONENT_PREFIXES.some(prefix => lower.startsWith(prefix));
};

/**
 * Process raw report data to split nonBfl into thirdParty vs custom,
 * and recalculate coverage excluding custom components.
 *
 * NOTE on components built with plain HTML tags (div, span, etc.):
 * The report generator only detects custom element tags (tags with hyphens).
 * Components built purely with native HTML tags cannot be detected as
 * "custom components" since they are standard HTML — this is a fundamental
 * limitation. Only Angular/Web Component selectors (e.g., app-header,
 * mat-icon) are detectable.
 */
const processReportData = (rawData: any): any => {
  if (!rawData || !rawData.pageWiseReport) return rawData;

  const processedPageWise: any = {};
  let totalBfl = 0;
  let totalThirdParty = 0;
  let totalCustom = 0;

  for (const [key, page] of Object.entries(rawData.pageWiseReport) as [string, any][]) {
    const bflList: string[] = page.componentList?.bfl || [];
    const rawNonBfl: string[] = page.componentList?.nonBfl || [];

    // Split nonBfl into thirdParty and custom
    const thirdPartyList = rawNonBfl.filter(c => !isCustomComponent(c));
    const customList = rawNonBfl.filter(c => isCustomComponent(c));

    const bflCount = bflList.length;
    const thirdPartyCount = thirdPartyList.length;
    const customCount = customList.length;
    const relevantTotal = bflCount + thirdPartyCount; // exclude custom from coverage calc
    const recalcCoverage = relevantTotal > 0 ? (bflCount / relevantTotal) * 100 : 0;

    totalBfl += bflCount;
    totalThirdParty += thirdPartyCount;
    totalCustom += customCount;

    processedPageWise[key] = {
      ...page,
      totalComponentsUsed: relevantTotal,
      bflComponentsUsed: bflCount,
      nonBflComponentsUsed: thirdPartyCount,
      customComponentsUsed: customCount,
      bflCoveragePercent: Math.round(recalcCoverage * 100) / 100,
      componentList: {
        bfl: bflList,
        nonBfl: thirdPartyList,     // only third-party
        custom: customList,         // internal / custom
      },
    };
  }

  const relevantTotal = totalBfl + totalThirdParty;
  const recalcCoverage = relevantTotal > 0 ? (totalBfl / relevantTotal) * 100 : 0;

  return {
    ...rawData,
    aggregatedReport: {
      ...rawData.aggregatedReport,
      totalComponentsUsed: relevantTotal,
      totalBflComponentsUsed: totalBfl,
      totalNonBflComponentsUsed: totalThirdParty,
      totalCustomComponentsUsed: totalCustom,
      bflCoveragePercent: Math.round(recalcCoverage * 100) / 100,
    },
    pageWiseReport: processedPageWise,
  };
};

// Mock data for localhost testing (new report format)
const MOCK_REPORTS: ModuleReport[] = [
  {
    moduleName: 'Test Module 1 (Localhost)',
    version: '1.0',
    reportUrl: 'mock',
    mockData: {
      reportMetadata: {
        generatedAt: new Date().toISOString(),
        sourceDirectory: 'src',
        totalFilesScanned: 15,
      },
      aggregatedReport: {
        totalComponentsUsed: 24,
        totalBflComponentsUsed: 12,
        totalNonBflComponentsUsed: 12,
        bflCoveragePercent: 50,
      },
      pageWiseReport: {
        'HomeComponent': {
          componentName: 'HomeComponent',
          filePath: 'src/app/home/home.component.html',
          totalComponentsUsed: 8,
          bflComponentsUsed: 5,
          nonBflComponentsUsed: 3,
          bflCoveragePercent: 62.5,
          componentList: {
            bfl: ['bfl-cta-button', 'bfl-span-text', 'bfl-container-layout', 'bfl-stack-layout', 'bfl-divider'],
            nonBfl: ['app-header', 'app-footer', 'mat-icon'],
          },
        },
        'LoginComponent': {
          componentName: 'LoginComponent',
          filePath: 'src/app/login/login.component.html',
          totalComponentsUsed: 6,
          bflComponentsUsed: 4,
          nonBflComponentsUsed: 2,
          bflCoveragePercent: 66.67,
          componentList: {
            bfl: ['bfl-text-input', 'bfl-cta-button', 'bfl-form-wrapper', 'bfl-span-text'],
            nonBfl: ['mat-form-field', 'mat-error'],
          },
        },
        'DashboardComponent': {
          componentName: 'DashboardComponent',
          filePath: 'src/app/dashboard/dashboard.component.html',
          totalComponentsUsed: 10,
          bflComponentsUsed: 3,
          nonBflComponentsUsed: 7,
          bflCoveragePercent: 30,
          componentList: {
            bfl: ['bfl-loader', 'bfl-span-text', 'bfl-cta-link'],
            nonBfl: ['app-header', 'app-sidebar', 'app-footer', 'mat-table', 'mat-paginator', 'mat-sort', 'mat-icon'],
          },
        },
      },
    },
  },
  {
    moduleName: 'Test Module 2 (Localhost)',
    version: '2.0',
    reportUrl: 'mock',
    mockData: {
      reportMetadata: {
        generatedAt: new Date().toISOString(),
        sourceDirectory: 'src',
        totalFilesScanned: 32,
      },
      aggregatedReport: {
        totalComponentsUsed: 30,
        totalBflComponentsUsed: 24,
        totalNonBflComponentsUsed: 6,
        bflCoveragePercent: 80,
      },
      pageWiseReport: {
        'FormPageComponent': {
          componentName: 'FormPageComponent',
          filePath: 'src/app/form-page/form-page.component.html',
          totalComponentsUsed: 14,
          bflComponentsUsed: 14,
          nonBflComponentsUsed: 0,
          bflCoveragePercent: 100,
          componentList: {
            bfl: ['bfl-text-input', 'bfl-cta-button', 'bfl-form-wrapper', 'bfl-span-text', 'bfl-checkbox-input', 'bfl-radio-input', 'bfl-select-input', 'bfl-container-layout', 'bfl-stack-layout', 'bfl-divider', 'bfl-dob-input', 'bfl-pan-input', 'bfl-app-header', 'bfl-cta-link'],
            nonBfl: [],
          },
        },
        'SuccessPageComponent': {
          componentName: 'SuccessPageComponent',
          filePath: 'src/app/success/success.component.html',
          totalComponentsUsed: 8,
          bflComponentsUsed: 4,
          nonBflComponentsUsed: 4,
          bflCoveragePercent: 50,
          componentList: {
            bfl: ['bfl-span-text', 'bfl-cta-button', 'bfl-hstack-card', 'bfl-vertical-tracker-group'],
            nonBfl: ['app-header', 'app-footer', 'app-banners', 'header-widget'],
          },
        },
        'ErrorPageComponent': {
          componentName: 'ErrorPageComponent',
          filePath: 'src/app/error/error.component.html',
          totalComponentsUsed: 4,
          bflComponentsUsed: 4,
          nonBflComponentsUsed: 0,
          bflCoveragePercent: 100,
          componentList: {
            bfl: ['bfl-span-text', 'bfl-cta-button', 'bfl-container-layout', 'bfl-app-header'],
            nonBfl: [],
          },
        },
        'LandingComponent': {
          componentName: 'LandingComponent',
          filePath: 'src/app/landing/landing.component.html',
          totalComponentsUsed: 4,
          bflComponentsUsed: 2,
          nonBflComponentsUsed: 2,
          bflCoveragePercent: 50,
          componentList: {
            bfl: ['bfl-loader', 'bfl-span-text'],
            nonBfl: ['app-header', 'app-footer'],
          },
        },
      },
    },
  },
];

interface ModuleReport {
  moduleName: string;
  version: string;
  reportUrl: string;
  data?: any;
  error?: string;
  loading?: boolean;
  mockData?: any;
}

const CoverageDashboard = () => {
  const container = document.createElement('div');
  container.style.cssText = `
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    padding: 24px;
    background: #f5f5f5;
    min-height: 100vh;
  `;

  // State
  let platform: 'app' | 'web' = 'app';
  let environment: 'uat' | 'cug' | 'prod' = 'uat';
  let appVersion = '26.0.0';
  let moduleReports: ModuleReport[] = [];
  let sortBy: 'coverage' | 'name' | 'components' = 'coverage';
  let sortDirection: 'asc' | 'desc' = 'desc';
  let filterText = '';
  let showOnlyWithReports = false;
  let selectedModule: ModuleReport | null = null;

  // ── URL Construction ────────────────────────────────────────────
  const URL_MAP: Record<string, Record<string, string>> = {
    app: {
      uat:  'https://pushengineuat.bajajfinserv.in/DPAOP/',
      cug:  'https://pushenginecug.bajajfinserv.in/DPAOP/',
      prod: 'https://pushengine.bajajfinserv.in/DPAOP/',
    },
    web: {
      uat:  'https://pushenginewebuat.bajajfinserv.in/3in1web/',
      cug:  'https://pushenginewebcug.bajajfinserv.in/3in1web/',
      prod: 'https://pushengineweb.bajajfinserv.in/3in1web/',
    },
  };

  const getBaseUrl = (): string => URL_MAP[platform]?.[environment] || URL_MAP.app.uat;

  const WEB_VERSION_URL_MAP: Record<string, string> = {
    uat:  'https://pushenginewebuat.bajajfinserv.in/web_version.json',
    cug:  'https://pushenginewebcug.bajajfinserv.in/web_version.json',
    prod: 'https://pushengineweb.bajajfinserv.in/web_version.json',
  };

  const getVersionUrl = (): string =>
    platform === 'web'
      ? WEB_VERSION_URL_MAP[environment] || WEB_VERSION_URL_MAP.uat
      : `${getBaseUrl()}version/${appVersion}/${appVersion}_v1.json`;

  // ── CORS Proxy Helper ───────────────────────────────────────────
  const PROXY_PREFIX = '/api-proxy';

  const toProxiedUrl = (url: string): string => {
    // Only proxy URLs pointing to the current base-URL host
    const proxyTarget = getBaseUrl().replace(/\/$/, '');
    if (url.startsWith(proxyTarget)) {
      return url.replace(proxyTarget, PROXY_PREFIX);
    }
    return url;
  };

  const corsFetch = async (url: string, init?: RequestInit): Promise<Response> => {
    const proxiedUrl = toProxiedUrl(url);

    // Try proxied URL first (works in Storybook dev server)
    if (proxiedUrl !== url) {
      try {
        const res = await fetch(proxiedUrl, init);
        if (res.ok) return res;
      } catch (_proxyErr) {
        // Proxy not available (e.g. static build), fall through
      }
    }

    // Fallback: try direct fetch (works when CORS headers are present
    // or when served from same origin in production)
    return fetch(url, init);
  };

  // ── Styles ──────────────────────────────────────────────────────
  const styles = `
    <style>
      /* ─── Dashboard Layout ─── */
      /* ─── Tabs ─── */
      .dashboard-tabs {
        display: flex;
        gap: 4px;
        margin-bottom: 20px;
        background: white;
        padding: 6px;
        border-radius: 10px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.08);
      }
      .dashboard-tab {
        flex: 1;
        padding: 12px 20px;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      .dashboard-tab-inactive {
        background: transparent;
        color: #64748b;
      }
      .dashboard-tab-inactive:hover {
        background: #f1f5f9;
        color: #334155;
      }
      .dashboard-tab-active {
        background: #1e293b;
        color: white;
        box-shadow: 0 2px 8px rgba(30,41,59,0.3);
      }
      .dashboard-tab-security-active {
        background: linear-gradient(135deg, #450a0a, #7f1d1d);
        color: white;
        box-shadow: 0 2px 8px rgba(127,29,29,0.3);
      }

      .dashboard-header {
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        padding: 28px 32px;
        border-radius: 12px;
        margin-bottom: 24px;
        color: white;
      }
      .dashboard-title {
        font-size: 26px;
        font-weight: 700;
        margin: 0 0 6px 0;
      }
      .dashboard-subtitle {
        font-size: 14px;
        opacity: 0.8;
        margin: 0;
      }

      /* ─── Controls ─── */
      .controls-section {
        background: white;
        padding: 20px 24px;
        border-radius: 10px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        margin-bottom: 24px;
      }
      .controls-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 16px;
      }
      .control-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .control-label {
        font-size: 11px;
        font-weight: 600;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .control-input {
        padding: 10px 12px;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        font-size: 13px;
        font-family: 'Courier New', monospace;
        transition: border-color 0.2s;
      }
      .control-input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
      }
      .control-button {
        padding: 10px 24px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
      }
      .control-button:hover { background: #2563eb; }
      .control-button:disabled { background: #cbd5e1; cursor: not-allowed; }

      /* ─── Summary Cards ─── */
      .summary-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
      }
      .summary-card {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        border-left: 4px solid #e2e8f0;
      }
      .summary-card-value {
        font-size: 30px;
        font-weight: 700;
        margin: 0 0 4px 0;
      }
      .summary-card-label {
        font-size: 11px;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin: 0;
      }

      /* ─── Filters ─── */
      .filters-row {
        display: flex;
        gap: 12px;
        align-items: center;
        flex-wrap: wrap;
      }
      .filter-input {
        flex: 1;
        min-width: 200px;
        padding: 9px 14px;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        font-size: 13px;
      }
      .filter-input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
      }
      .filter-select {
        padding: 9px 14px;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        font-size: 13px;
        background: white;
      }
      .filter-checkbox {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 9px 14px;
        background: #f8fafc;
        border-radius: 6px;
        cursor: pointer;
        user-select: none;
        font-size: 13px;
        white-space: nowrap;
      }

      /* ─── Table ─── */
      .table-container {
        background: white;
        border-radius: 10px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        overflow: hidden;
      }
      .data-table {
        width: 100%;
        border-collapse: collapse;
      }
      .data-table thead th {
        padding: 14px 16px;
        text-align: left;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: #64748b;
        background: #f8fafc;
        border-bottom: 2px solid #e2e8f0;
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        transition: background 0.15s;
      }
      .data-table thead th:hover {
        background: #f1f5f9;
        color: #334155;
      }
      .data-table thead th.sorted {
        color: #3b82f6;
      }
      .data-table tbody tr {
        cursor: pointer;
        transition: all 0.15s;
        border-bottom: 1px solid #f1f5f9;
      }
      .data-table tbody tr:hover {
        filter: brightness(0.96);
        box-shadow: inset 0 0 0 1px rgba(0,0,0,0.06);
      }
      .data-table tbody td {
        padding: 14px 16px;
        font-size: 13px;
        color: #334155;
      }
      .data-table tbody td:first-child {
        font-weight: 600;
      }
      .row-coverage-excellent { background: #f0fdf4; }
      .row-coverage-good { background: #eff6ff; }
      .row-coverage-moderate { background: #fffbeb; }
      .row-coverage-low { background: #fef2f2; }
      .row-coverage-none { background: #f9fafb; }
      .row-loading { background: #fafafa; }
      .row-error { background: #fff5f5; }

      .coverage-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 700;
      }
      .coverage-badge-excellent { background: #dcfce7; color: #166534; }
      .coverage-badge-good { background: #dbeafe; color: #1e40af; }
      .coverage-badge-moderate { background: #fef3c7; color: #92400e; }
      .coverage-badge-low { background: #fecaca; color: #991b1b; }

      .inline-bar {
        display: inline-block;
        width: 80px;
        height: 6px;
        background: #e2e8f0;
        border-radius: 3px;
        overflow: hidden;
        vertical-align: middle;
        margin-right: 8px;
      }
      .inline-bar-fill {
        height: 100%;
        border-radius: 3px;
        transition: width 0.3s;
      }

      .sort-arrow { font-size: 10px; margin-left: 4px; }

      .badge-mock {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: 600;
        background: #fef3c7;
        color: #92400e;
        margin-left: 8px;
        vertical-align: middle;
      }
      .badge-live {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: 600;
        background: #dcfce7;
        color: #166534;
        margin-left: 8px;
        vertical-align: middle;
      }

      .spinner-sm {
        display: inline-block;
        width: 14px;
        height: 14px;
        border: 2px solid #e2e8f0;
        border-radius: 50%;
        border-top-color: #3b82f6;
        animation: spin 0.6s linear infinite;
        vertical-align: middle;
        margin-right: 6px;
      }
      @keyframes spin { to { transform: rotate(360deg); } }

      .error-text { color: #dc2626; font-size: 12px; }

      .empty-state {
        padding: 60px 20px;
        text-align: center;
        color: #94a3b8;
      }
      .empty-state-icon { font-size: 40px; margin-bottom: 12px; }

      /* ─── Modal ─── */
      .modal-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
        animation: fadeIn 0.2s ease;
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .modal-content {
        background: #f5f5f5;
        border-radius: 14px;
        width: 100%;
        max-width: 1100px;
        max-height: 90vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        animation: slideUp 0.25s ease;
      }
      @keyframes slideUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .modal-header {
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        padding: 24px 28px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-shrink: 0;
      }
      .modal-header-left h2 {
        font-size: 20px;
        font-weight: 700;
        margin: 0 0 4px 0;
      }
      .modal-header-left p {
        font-size: 13px;
        opacity: 0.7;
        margin: 0;
      }
      .modal-close {
        background: rgba(255,255,255,0.15);
        border: none;
        color: white;
        width: 36px;
        height: 36px;
        border-radius: 8px;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
        flex-shrink: 0;
      }
      .modal-close:hover { background: rgba(255,255,255,0.25); }

      .ai-tips-btn {
        background: linear-gradient(135deg, #8b5cf6, #6366f1);
        border: none;
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s;
        flex-shrink: 0;
      }
      .ai-tips-btn:hover { background: linear-gradient(135deg, #7c3aed, #4f46e5); transform: scale(1.02); }
      .ai-tips-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
      .ai-tips-btn .spinner {
        display: inline-block;
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }

      .ai-tips-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        padding: 20px;
        animation: fadeIn 0.2s ease;
      }
      .ai-tips-content {
        background: white;
        border-radius: 14px;
        width: 100%;
        max-width: 900px;
        max-height: 85vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        animation: slideUp 0.25s ease;
      }
      .ai-tips-header {
        background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
        padding: 20px 24px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
      }
      .ai-tips-header h2 {
        font-size: 18px;
        font-weight: 700;
        margin: 0;
      }
      .ai-tips-body {
        overflow-y: auto;
        padding: 24px;
        flex: 1;
        font-size: 14px;
        line-height: 1.6;
      }
      .ai-tips-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 20px;
        gap: 16px;
        color: #64748b;
      }
      .ai-tips-loading .spinner-lg {
        width: 40px;
        height: 40px;
        border: 4px solid #e2e8f0;
        border-top-color: #6366f1;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      .ai-tips-error {
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 8px;
        padding: 16px;
        color: #dc2626;
        text-align: center;
      }

      .modal-summary {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        padding: 20px 28px;
        background: white;
        border-bottom: 1px solid #e2e8f0;
        flex-shrink: 0;
      }
      .modal-stat {
        text-align: center;
        padding: 12px;
        background: #f8fafc;
        border-radius: 8px;
      }
      .modal-stat-value {
        font-size: 24px;
        font-weight: 700;
        margin: 0 0 2px 0;
      }
      .modal-stat-label {
        font-size: 10px;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin: 0;
      }

      .modal-body {
        overflow-y: auto;
        padding: 24px 28px;
        flex: 1;
      }
      .modal-section-title {
        font-size: 15px;
        font-weight: 700;
        color: #1e293b;
        margin: 0 0 16px 0;
      }

      /* ─── Page Cards ─── */
      .page-cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
        gap: 16px;
      }
      .page-card {
        background: white;
        border-radius: 10px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        overflow: hidden;
        border: 1px solid #e2e8f0;
        transition: box-shadow 0.2s;
      }
      .page-card:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
      }
      .page-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 16px;
        border-bottom: 1px solid #f1f5f9;
      }
      .page-card-name {
        font-size: 14px;
        font-weight: 700;
        color: #1e293b;
        margin: 0;
      }
      .page-card-path {
        font-size: 11px;
        color: #94a3b8;
        font-family: 'Courier New', monospace;
        padding: 0 16px 12px;
        margin: 0;
        word-break: break-all;
        border-bottom: 1px solid #f1f5f9;
      }
      .page-card-stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        padding: 12px 16px;
      }
      .page-stat {
        text-align: center;
        padding: 8px 4px;
        background: #f8fafc;
        border-radius: 6px;
      }
      .page-stat-value {
        font-size: 18px;
        font-weight: 700;
        margin: 0;
      }
      .page-stat-label {
        font-size: 9px;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 0.3px;
        margin: 0;
      }

      .page-card-coverage-bar {
        margin: 0 16px 12px;
        height: 8px;
        background: #f1f5f9;
        border-radius: 4px;
        overflow: hidden;
      }
      .page-card-coverage-fill {
        height: 100%;
        border-radius: 4px;
        transition: width 0.3s;
      }

      .page-card-chips {
        padding: 12px 16px;
        border-top: 1px solid #f1f5f9;
      }
      .chips-section {
        margin-bottom: 10px;
      }
      .chips-section:last-child {
        margin-bottom: 0;
      }
      .chips-label {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin: 0 0 6px 0;
      }
      .chips-label-bfl { color: #059669; }
      .chips-label-nonbfl { color: #d97706; }
      .chips-container {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }
      .chip {
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 500;
        font-family: 'Courier New', monospace;
      }
      .chip-bfl {
        background: #ecfdf5;
        color: #065f46;
        border: 1px solid #a7f3d0;
      }
      .chip-nonbfl {
        background: #fffbeb;
        color: #92400e;
        border: 1px solid #fde68a;
      }
      .chip-custom {
        background: #f0f4ff;
        color: #4338ca;
        border: 1px solid #c7d2fe;
      }
      .chips-label-custom { color: #6366f1; }
      .chips-empty {
        font-size: 11px;
        color: #cbd5e1;
        font-style: italic;
      }
    </style>
  `;

  // ── Helpers ──────────────────────────────────────────────────────
  const getCoverageClass = (percent: number): string => {
    if (percent >= 75) return 'excellent';
    if (percent >= 50) return 'good';
    if (percent >= 25) return 'moderate';
    return 'low';
  };

  const getCoverageColor = (percent: number): string => {
    if (percent >= 75) return '#10b981';
    if (percent >= 50) return '#3b82f6';
    if (percent >= 25) return '#f59e0b';
    return '#ef4444';
  };

  const getRowClass = (report: ModuleReport): string => {
    if (report.loading) return 'row-loading';
    if (report.error) return 'row-error';
    if (!report.data) return 'row-coverage-none';
    const pct = report.data.aggregatedReport?.bflCoveragePercent ?? 0;
    if (pct >= 75) return 'row-coverage-excellent';
    if (pct >= 50) return 'row-coverage-good';
    if (pct >= 25) return 'row-coverage-moderate';
    if (pct > 0) return 'row-coverage-low';
    return 'row-coverage-none';
  };

  // ── Fetch Logic ─────────────────────────────────────────────────
  const fetchVersionData = async () => {
    const baseUrl = getBaseUrl();
    const versionUrl = getVersionUrl();

    // Initialize with mock data (process to split custom components)
    moduleReports = MOCK_REPORTS.map(m => ({ ...m, loading: false, data: processReportData(m.mockData) }));
    render();

    try {
      const response = await corsFetch(versionUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const versionData = await response.json();

      const folderMap = MODULE_FOLDER_MAP[platform] || MODULE_FOLDER_MAP.app;
      const liveReports: ModuleReport[] = Object.entries(versionData).map(([moduleName, version]) => {
        const folderName = folderMap[moduleName] || moduleName;
        return {
          moduleName,
          version: String(version),
          reportUrl: `${baseUrl}${folderName}/${version}/bfl-component-report.json`,
          loading: true,
        };
      });

      moduleReports = [
        ...MOCK_REPORTS.map(m => ({ ...m, loading: false, data: processReportData(m.mockData) })),
        ...liveReports,
      ];
      render();

      // Fetch all reports in parallel
      await Promise.all(
        liveReports.map(async (report) => {
          try {
            const res = await corsFetch(report.reportUrl);
            if (res.ok) {
              report.data = processReportData(await res.json());
            } else {
              report.error = `HTTP ${res.status}`;
            }
          } catch (err) {
            report.error = 'Network / CORS error';
          }
          report.loading = false;
          render();
        })
      );
    } catch (error) {
      console.error('Failed to fetch version data:', error);
      render();
    }
  };

  // ── Filtering & Sorting ─────────────────────────────────────────
  const getFilteredAndSortedReports = (): ModuleReport[] => {
    let filtered = moduleReports;

    if (filterText) {
      const lower = filterText.toLowerCase();
      filtered = filtered.filter(r =>
        r.moduleName.toLowerCase().includes(lower) ||
        r.version.includes(lower)
      );
    }

    if (showOnlyWithReports) {
      filtered = filtered.filter(r => r.data && !r.error);
    }

    filtered.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'coverage') {
        const aVal = a.data?.aggregatedReport?.bflCoveragePercent ?? -1;
        const bVal = b.data?.aggregatedReport?.bflCoveragePercent ?? -1;
        cmp = aVal - bVal;
      } else if (sortBy === 'components') {
        const aVal = a.data?.aggregatedReport?.totalComponentsUsed ?? -1;
        const bVal = b.data?.aggregatedReport?.totalComponentsUsed ?? -1;
        cmp = aVal - bVal;
      } else {
        cmp = a.moduleName.localeCompare(b.moduleName);
      }
      return sortDirection === 'desc' ? -cmp : cmp;
    });

    return filtered;
  };

  const calculateSummaryStats = () => {
    const reportsWithData = moduleReports.filter(r => r.data);
    const totalModules = moduleReports.length;
    const modulesWithReports = reportsWithData.length;
    const avgCoverage = reportsWithData.length > 0
      ? reportsWithData.reduce((sum, r) => sum + (r.data.aggregatedReport?.bflCoveragePercent || 0), 0) / reportsWithData.length
      : 0;
    const totalFilesScanned = reportsWithData.reduce((sum, r) => sum + (r.data.reportMetadata?.totalFilesScanned || 0), 0);
    return { totalModules, modulesWithReports, avgCoverage, totalFilesScanned };
  };

  // ── Sort Header Click ───────────────────────────────────────────
  const handleSortClick = (column: 'coverage' | 'name' | 'components') => {
    if (sortBy === column) {
      sortDirection = sortDirection === 'desc' ? 'asc' : 'desc';
    } else {
      sortBy = column;
      sortDirection = column === 'name' ? 'asc' : 'desc';
    }
    render();
  };

  // ── Sort Arrow Helper ───────────────────────────────────────────
  const sortArrow = (col: string) => {
    if (sortBy !== col) return '';
    return `<span class="sort-arrow">${sortDirection === 'desc' ? '▼' : '▲'}</span>`;
  };

  // ── Main Render ─────────────────────────────────────────────────
  const render = () => {
    const filtered = getFilteredAndSortedReports();
    const stats = calculateSummaryStats();

    container.innerHTML = `
      ${styles}
      <div class="dashboard-tabs">
        <button type="button" class="dashboard-tab dashboard-tab-active" id="tabCoverage">🎯 Component Coverage</button>
        <button type="button" class="dashboard-tab dashboard-tab-inactive" id="tabSecurity">🛡️ Security Vulnerabilities</button>
      </div>
      <div id="coverageContent">
      <div class="dashboard-header">
        <h1 class="dashboard-title">🎯 BFL Component Coverage Dashboard</h1>
        <p class="dashboard-subtitle">Real-time monitoring of component library adoption across all deployed modules</p>
      </div>

      <div class="controls-section">
        <div class="controls-grid" style="grid-template-columns: 1fr 1fr 1fr;">
          <div class="control-group">
            <label class="control-label">Platform</label>
            <select class="control-input" id="platformSelect">
              <option value="app" ${platform === 'app' ? 'selected' : ''}>App</option>
              <option value="web" ${platform === 'web' ? 'selected' : ''}>Web</option>
            </select>
          </div>
          <div class="control-group">
            <label class="control-label">Environment</label>
            <select class="control-input" id="environmentSelect">
              <option value="uat" ${environment === 'uat' ? 'selected' : ''}>UAT</option>
              <option value="cug" ${environment === 'cug' ? 'selected' : ''}>CUG</option>
              <option value="prod" ${environment === 'prod' ? 'selected' : ''}>Prod</option>
            </select>
          </div>
          <div class="control-group">
            <label class="control-label">App Version</label>
            <input type="text" class="control-input" id="appVersionInput" value="${appVersion}" placeholder="e.g. 26.0.0" />
          </div>
        </div>
        <div style="margin-top: 14px; padding: 12px 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; font-family: 'Courier New', monospace; font-size: 12px; color: #475569; line-height: 1.8;">
          <strong style="color: #1e293b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">🔗 Constructed URLs</strong><br/>
          <span style="color: #64748b;">Base URL:</span> <span style="color: #2563eb;">${getBaseUrl()}</span><br/>
          <span style="color: #64748b;">Version URL:</span> <span style="color: #2563eb;">${getVersionUrl()}</span>
        </div>
        <button type="button" class="control-button" id="fetchButton" style="margin-top: 14px;">🔄 Fetch Reports</button>
      </div>

      <div class="summary-cards">
        <div class="summary-card" style="border-left-color: #6366f1;">
          <div class="summary-card-value" style="color: #6366f1;">${stats.totalModules}</div>
          <div class="summary-card-label">Total Modules</div>
        </div>
        <div class="summary-card" style="border-left-color: #10b981;">
          <div class="summary-card-value" style="color: #10b981;">${stats.modulesWithReports}</div>
          <div class="summary-card-label">Modules with Reports</div>
        </div>
        <div class="summary-card" style="border-left-color: #3b82f6;">
          <div class="summary-card-value" style="color: #3b82f6;">${stats.avgCoverage.toFixed(1)}%</div>
          <div class="summary-card-label">Avg BFL Coverage</div>
        </div>
        <div class="summary-card" style="border-left-color: #f59e0b;">
          <div class="summary-card-value" style="color: #f59e0b;">${stats.totalFilesScanned}</div>
          <div class="summary-card-label">Total Files Scanned</div>
        </div>
      </div>

      <div class="controls-section" style="margin-bottom: 20px;">
        <div class="filters-row">
          <input type="text" class="filter-input" id="filterInput" placeholder="🔍 Search modules..." value="${filterText}" />
          <label class="filter-checkbox">
            <input type="checkbox" id="showOnlyCheckbox" ${showOnlyWithReports ? 'checked' : ''} />
            <span>Only with reports (${stats.modulesWithReports})</span>
          </label>
        </div>
      </div>

      ${filtered.length === 0 ? `
        <div class="table-container">
          <div class="empty-state">
            <div class="empty-state-icon">📊</div>
            <p>No modules found matching your filters</p>
          </div>
        </div>
      ` : `
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th id="sort-name" class="${sortBy === 'name' ? 'sorted' : ''}">Module Name ${sortArrow('name')}</th>
                <th>Version</th>
                <th id="sort-components" class="${sortBy === 'components' ? 'sorted' : ''}">Relevant Components ${sortArrow('components')}</th>
                <th>BFL</th>
                <th>Third-party</th>
                <th style="color: #6366f1;">Custom (excluded)</th>
                <th id="sort-coverage" class="${sortBy === 'coverage' ? 'sorted' : ''}">BFL Coverage % ${sortArrow('coverage')}</th>
                <th>Files Scanned</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map((report, idx) => renderTableRow(report, idx)).join('')}
            </tbody>
          </table>
        </div>
      `}

      <div id="modal-root"></div>
      </div><!-- end coverageContent -->
      <div id="securityContent"></div>
    `;

    // ── Attach Event Listeners ─────────────────────────────────────
    attachEventListeners(filtered);

    // Tab switching
    const tabCoverage = container.querySelector('#tabCoverage');
    const tabSecurity = container.querySelector('#tabSecurity');
    if (tabSecurity) {
      tabSecurity.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        // Switch to security tab
        const coverageEl = container.querySelector('#coverageContent') as HTMLElement;
        const securityEl = container.querySelector('#securityContent') as HTMLElement;
        if (coverageEl) coverageEl.style.display = 'none';
        if (securityEl) {
          securityEl.style.display = 'block';
          // Lazy-load security dashboard
          if (!securityEl.innerHTML.trim()) {
            import('./BFLSecurityDashboard.stories').then(mod => {
              const secDash = (mod as any).SecurityVulnerabilityDashboard();
              securityEl.appendChild(secDash);
            }).catch(() => {
              securityEl.innerHTML = '<p style="padding:40px;text-align:center;color:#dc2626;">Failed to load Security Dashboard</p>';
            });
          }
        }
        // Update tab styles
        if (tabCoverage) { tabCoverage.className = 'dashboard-tab dashboard-tab-inactive'; }
        if (tabSecurity) { tabSecurity.className = 'dashboard-tab dashboard-tab-security-active'; }
      });
    }
    if (tabCoverage) {
      tabCoverage.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        const coverageEl = container.querySelector('#coverageContent') as HTMLElement;
        const securityEl = container.querySelector('#securityContent') as HTMLElement;
        if (coverageEl) coverageEl.style.display = 'block';
        if (securityEl) securityEl.style.display = 'none';
        if (tabCoverage) { tabCoverage.className = 'dashboard-tab dashboard-tab-active'; }
        if (tabSecurity) { tabSecurity.className = 'dashboard-tab dashboard-tab-inactive'; }
      });
    }

    // If a module is selected, render its modal
    if (selectedModule) {
      renderModal();
    }
  };

  // ── Render Table Row ────────────────────────────────────────────
  const renderTableRow = (report: ModuleReport, idx: number): string => {
    const isMock = report.mockData !== undefined;
    const rowClass = getRowClass(report);

    if (report.loading) {
      return `
        <tr class="${rowClass}" data-idx="${idx}">
          <td>${report.moduleName} ${isMock ? '<span class="badge-mock">Mock</span>' : '<span class="badge-live">Live</span>'}</td>
          <td>${report.version}</td>
          <td colspan="6"><span class="spinner-sm"></span> Loading report...</td>
        </tr>
      `;
    }

    if (report.error) {
      return `
        <tr class="${rowClass}" data-idx="${idx}">
          <td>${report.moduleName}</td>
          <td>${report.version}</td>
          <td colspan="6"><span class="error-text">⚠️ ${report.error}</span></td>
        </tr>
      `;
    }

    if (!report.data) {
      return `
        <tr class="${rowClass}" data-idx="${idx}">
          <td>${report.moduleName}</td>
          <td>${report.version}</td>
          <td colspan="6" style="color: #94a3b8;">No report data</td>
        </tr>
      `;
    }

    const agg = report.data.aggregatedReport || {};
    const meta = report.data.reportMetadata || {};
    const pct = agg.bflCoveragePercent ?? 0;
    const coverageClass = getCoverageClass(pct);
    const coverageColor = getCoverageColor(pct);

    return `
      <tr class="${rowClass}" data-idx="${idx}" style="cursor: pointer;" title="Click to view page-wise breakdown">
        <td>
          ${report.moduleName}
          ${isMock ? '<span class="badge-mock">Mock</span>' : '<span class="badge-live">Live</span>'}
        </td>
        <td>${report.version}</td>
        <td style="font-weight: 600;">${agg.totalComponentsUsed ?? '—'}</td>
        <td style="color: #059669; font-weight: 600;">${agg.totalBflComponentsUsed ?? '—'}</td>
        <td style="color: #d97706; font-weight: 600;">${agg.totalNonBflComponentsUsed ?? '—'}</td>
        <td style="color: #6366f1; font-weight: 500;">${agg.totalCustomComponentsUsed ?? '—'}</td>
        <td>
          <span class="inline-bar">
            <span class="inline-bar-fill" style="width: ${pct}%; background: ${coverageColor};"></span>
          </span>
          <span class="coverage-badge coverage-badge-${coverageClass}">${pct.toFixed(1)}%</span>
        </td>
        <td>${meta.totalFilesScanned ?? '—'}</td>
      </tr>
    `;
  };

  // ── Render Modal ────────────────────────────────────────────────
  const renderModal = () => {
    if (!selectedModule || !selectedModule.data) return;

    const report = selectedModule;
    const agg = report.data.aggregatedReport || {};
    const meta = report.data.reportMetadata || {};
    const pageWise = report.data.pageWiseReport || {};
    const pages = (Object.entries(pageWise) as [string, any][]).sort((a, b) => {
      const bflCountA = (a[1].componentList?.bfl || []).length;
      const bflCountB = (b[1].componentList?.bfl || []).length;
      return bflCountB - bflCountA;
    });
    const pct = agg.bflCoveragePercent ?? 0;

    const modalRoot = container.querySelector('#modal-root') as HTMLElement;
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="modal-overlay" id="modalOverlay" onclick="if(event.target===this)this.style.display='none'">
        <div class="modal-content" onclick="event.stopPropagation()">
          <div class="modal-header">
            <div class="modal-header-left">
              <h2>📋 ${report.moduleName}</h2>
              <p>Version ${report.version} &nbsp;|&nbsp; Source: ${meta.sourceDirectory || '—'} &nbsp;|&nbsp; Generated: ${meta.generatedAt ? new Date(meta.generatedAt).toLocaleDateString() : '—'}</p>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
              <button type="button" class="ai-tips-btn" id="aiTipsBtn">🤖 AI Tips</button>
              <button type="button" class="modal-close" id="modalClose">✕</button>
            </div>
          </div>

          <div class="modal-summary" style="grid-template-columns: repeat(5, 1fr);">
            <div class="modal-stat">
              <div class="modal-stat-value" style="color: #334155;">${agg.totalComponentsUsed ?? 0}</div>
              <div class="modal-stat-label">Relevant Components</div>
            </div>
            <div class="modal-stat">
              <div class="modal-stat-value" style="color: #059669;">${agg.totalBflComponentsUsed ?? 0}</div>
              <div class="modal-stat-label">BFL</div>
            </div>
            <div class="modal-stat">
              <div class="modal-stat-value" style="color: #d97706;">${agg.totalNonBflComponentsUsed ?? 0}</div>
              <div class="modal-stat-label">Third-party</div>
            </div>
            <div class="modal-stat">
              <div class="modal-stat-value" style="color: #6366f1;">${agg.totalCustomComponentsUsed ?? 0}</div>
              <div class="modal-stat-label">Custom (excluded)</div>
            </div>
            <div class="modal-stat">
              <div class="modal-stat-value" style="color: ${getCoverageColor(pct)};">${pct.toFixed(1)}%</div>
              <div class="modal-stat-label">BFL Coverage</div>
            </div>
          </div>

          <div class="modal-body">
            <h3 class="modal-section-title">Page-wise Breakdown (${pages.length} pages)</h3>
            <div class="page-cards-grid">
              ${pages.map(([key, page]) => renderPageCard(key, page)).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    // AI Tips button - attach after render
    const aiTipsBtn = modalRoot.querySelector('#aiTipsBtn');
    if (aiTipsBtn) {
      aiTipsBtn.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        openAiTipsModal(report.data);
      });
    }
    // Close button
    const closeBtn = modalRoot.querySelector('#modalClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        selectedModule = null;
        modalRoot.innerHTML = '';
      });
    }
  };

  // ── AI Tips Modal ───────────────────────────────────────────────
  const openAiTipsModal = async (reportData: any) => {
    const tipsRoot = document.createElement('div');
    tipsRoot.id = 'ai-tips-root';
    tipsRoot.innerHTML = `
      <div class="ai-tips-overlay" id="aiTipsOverlay">
        <div class="ai-tips-content">
          <div class="ai-tips-header">
            <h2>🤖 AI-Powered Suggestions</h2>
            <button type="button" class="modal-close" id="aiTipsClose">✕</button>
          </div>
          <div class="ai-tips-body" id="aiTipsBody">
            <div class="ai-tips-loading">
              <div class="spinner-lg"></div>
              <p>Generating AI suggestions...</p>
              <p style="font-size: 12px; color: #94a3b8;">Analyzing coverage data with Azure OpenAI</p>
            </div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(tipsRoot);

    // Close handlers
    const closeAiTips = () => { tipsRoot.remove(); };
    tipsRoot.querySelector('#aiTipsClose')?.addEventListener('click', closeAiTips);
    tipsRoot.querySelector('#aiTipsOverlay')?.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).id === 'aiTipsOverlay') closeAiTips();
    });

    // Fetch AI suggestions
    const bodyEl = tipsRoot.querySelector('#aiTipsBody') as HTMLElement;
    try {
      const response = await fetch('/api/bfl-ai-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const result = await response.json();
      bodyEl.innerHTML = result.suggestionsHtml || '<p>No suggestions generated.</p>';
    } catch (err: any) {
      // Fallback: generate static suggestions client-side
      bodyEl.innerHTML = generateStaticSuggestions(reportData);
    }
  };

  // ── Static Suggestions Fallback ─────────────────────────────────
  const generateStaticSuggestions = (reportData: any): string => {
    const agg = reportData?.aggregatedReport || {};
    const pageWise = reportData?.pageWiseReport || {};
    const nonBflAll = new Set<string>();
    const lowPages: { name: string; pct: number; nonBfl: string[] }[] = [];

    Object.entries(pageWise).forEach(([, page]: [string, any]) => {
      (page.componentList?.nonBfl || []).forEach((c: string) => nonBflAll.add(c));
      if (page.bflCoveragePercent < 50 && (page.componentList?.nonBfl || []).length > 0) {
        lowPages.push({
          name: page.componentName || 'Unknown',
          pct: page.bflCoveragePercent,
          nonBfl: page.componentList.nonBfl,
        });
      }
    });

    const matComponents = [...nonBflAll].filter(c => c.startsWith('mat-'));
    const currentPct = agg.bflCoveragePercent || 0;
    const potentialPct = Math.min(100, currentPct + (matComponents.length * 3));

    return `
      <div style="font-family: 'Segoe UI', Arial, sans-serif;">
        <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; font-size: 13px;">
          ⚠️ <strong>Offline Mode:</strong> AI backend unavailable. Showing static analysis.
        </div>

        <h3 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">🎯 Top Priority Actions</h3>
        <ul style="padding-left: 20px; line-height: 2;">
          ${matComponents.slice(0, 3).map(c => {
            const bflEquiv = c.replace('mat-', 'bfl-').replace('table', 'data-table').replace('paginator', 'pagination').replace('icon', 'icon-element');
            return `<li><strong>${c}</strong> → Replace with <code style="background:#e0f2fe;padding:2px 6px;border-radius:4px;">${bflEquiv}</code></li>`;
          }).join('')}
          ${matComponents.length === 0 ? '<li>No Material components detected — review third-party dependencies</li>' : ''}
        </ul>

        <h3 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">⚡ Quick Wins</h3>
        <ul style="padding-left: 20px; line-height: 2;">
          <li>Replace <code style="background:#dcfce7;padding:2px 6px;border-radius:4px;">mat-icon</code> with <code style="background:#dcfce7;padding:2px 6px;border-radius:4px;">bfl-icon-element</code> (simple drop-in)</li>
          <li>Replace <code style="background:#dcfce7;padding:2px 6px;border-radius:4px;">mat-form-field</code> with <code style="background:#dcfce7;padding:2px 6px;border-radius:4px;">bfl-form-wrapper</code></li>
          <li>Replace <code style="background:#dcfce7;padding:2px 6px;border-radius:4px;">mat-error</code> with BFL inline validation</li>
        </ul>

        <h3 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">⚠️ Risk Assessment</h3>
        ${lowPages.length > 0 ? `
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr style="background: #f8fafc;">
              <th style="text-align: left; padding: 8px; border-bottom: 1px solid #e2e8f0;">Component</th>
              <th style="text-align: center; padding: 8px; border-bottom: 1px solid #e2e8f0;">Coverage</th>
              <th style="text-align: left; padding: 8px; border-bottom: 1px solid #e2e8f0;">Non-BFL</th>
            </tr>
            ${lowPages.slice(0, 5).map(p => `
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; border-left: 3px solid #f97316;">${p.name}</td>
                <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; text-align: center; color: #dc2626; font-weight: 600;">${p.pct.toFixed(1)}%</td>
                <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-size: 12px;">${p.nonBfl.join(', ')}</td>
              </tr>
            `).join('')}
          </table>
        ` : '<p style="color: #059669;">✅ No critical low-coverage pages detected.</p>'}

        <h3 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-top: 24px;">📊 Estimated Coverage After Fixes</h3>
        <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px; text-align: center;">
          <span style="font-size: 14px; color: #64748b;">Current: <strong>${currentPct.toFixed(1)}%</strong></span>
          <span style="margin: 0 12px; font-size: 18px;">→</span>
          <span style="font-size: 18px; font-weight: 700; color: #059669;">~${potentialPct.toFixed(1)}%</span>
          <span style="font-size: 12px; color: #64748b; display: block; margin-top: 4px;">after replacing ${matComponents.length} Material components</span>
        </div>
      </div>
    `;
  };

  // ── Render Page Card ────────────────────────────────────────────
  const renderPageCard = (_key: string, page: any): string => {
    const pct = page.bflCoveragePercent ?? 0;
    const coverageClass = getCoverageClass(pct);
    const coverageColor = getCoverageColor(pct);
    const bflList: string[] = page.componentList?.bfl || [];
    const thirdPartyList: string[] = page.componentList?.nonBfl || [];
    const customList: string[] = page.componentList?.custom || [];

    return `
      <div class="page-card">
        <div class="page-card-header">
          <h4 class="page-card-name">${page.componentName || _key}</h4>
          <span class="coverage-badge coverage-badge-${coverageClass}">${pct.toFixed(1)}%</span>
        </div>
        <p class="page-card-path">${page.filePath || '—'}</p>

        <div class="page-card-stats" style="grid-template-columns: repeat(5, 1fr);">
          <div class="page-stat">
            <div class="page-stat-value" style="color: #334155;">${page.totalComponentsUsed ?? 0}</div>
            <div class="page-stat-label">Relevant</div>
          </div>
          <div class="page-stat">
            <div class="page-stat-value" style="color: #059669;">${page.bflComponentsUsed ?? 0}</div>
            <div class="page-stat-label">BFL</div>
          </div>
          <div class="page-stat">
            <div class="page-stat-value" style="color: #d97706;">${thirdPartyList.length}</div>
            <div class="page-stat-label">Third-party</div>
          </div>
          <div class="page-stat">
            <div class="page-stat-value" style="color: #6366f1;">${customList.length}</div>
            <div class="page-stat-label">Custom</div>
          </div>
          <div class="page-stat">
            <div class="page-stat-value" style="color: ${coverageColor};">${pct.toFixed(1)}%</div>
            <div class="page-stat-label">Coverage</div>
          </div>
        </div>

        <div class="page-card-coverage-bar">
          <div class="page-card-coverage-fill" style="width: ${pct}%; background: ${coverageColor};"></div>
        </div>

        <div class="page-card-chips">
          <div class="chips-section">
            <p class="chips-label chips-label-bfl">✅ BFL Components (${bflList.length})</p>
            <div class="chips-container">
              ${bflList.length > 0
                ? bflList.map(c => `<span class="chip chip-bfl">${c}</span>`).join('')
                : '<span class="chips-empty">None</span>'
              }
            </div>
          </div>
          <div class="chips-section">
            <p class="chips-label chips-label-nonbfl">⚠️ Third-party Components (${thirdPartyList.length})</p>
            <div class="chips-container">
              ${thirdPartyList.length > 0
                ? thirdPartyList.map(c => `<span class="chip chip-nonbfl">${c}</span>`).join('')
                : '<span class="chips-empty">None</span>'
              }
            </div>
          </div>
          <div class="chips-section">
            <p class="chips-label chips-label-custom">🏠 Custom / Internal Components (${customList.length}) — excluded from coverage</p>
            <div class="chips-container">
              ${customList.length > 0
                ? customList.map(c => `<span class="chip chip-custom">${c}</span>`).join('')
                : '<span class="chips-empty">None</span>'
              }
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // ── Attach Event Listeners ──────────────────────────────────────
  const attachEventListeners = (filtered: ModuleReport[]) => {
    // Controls
    const fetchButton = container.querySelector('#fetchButton') as HTMLButtonElement;
    const platformSelect = container.querySelector('#platformSelect') as HTMLSelectElement;
    const environmentSelect = container.querySelector('#environmentSelect') as HTMLSelectElement;
    const appVersionInput = container.querySelector('#appVersionInput') as HTMLInputElement;
    const filterInput = container.querySelector('#filterInput') as HTMLInputElement;
    const showOnlyCheckbox = container.querySelector('#showOnlyCheckbox') as HTMLInputElement;

    // Re-render on platform/environment change so the URL preview updates
    if (platformSelect) {
      platformSelect.addEventListener('change', (e) => {
        platform = (e.target as HTMLSelectElement).value as 'app' | 'web';
        render();
      });
    }
    if (environmentSelect) {
      environmentSelect.addEventListener('change', (e) => {
        environment = (e.target as HTMLSelectElement).value as 'uat' | 'cug' | 'prod';
        render();
      });
    }
    if (appVersionInput) {
      appVersionInput.addEventListener('input', (e) => {
        const input = e.target as HTMLInputElement;
        const cursorPos = input.selectionStart;
        appVersion = input.value;
        render();
        // Restore focus and cursor position after re-render
        const restoredInput = container.querySelector('#appVersionInput') as HTMLInputElement;
        if (restoredInput) {
          restoredInput.focus();
          restoredInput.setSelectionRange(cursorPos, cursorPos);
        }
      });
    }

    if (fetchButton) {
      fetchButton.addEventListener('click', () => {
        fetchVersionData();
      });
    }

    if (filterInput) {
      filterInput.addEventListener('input', (e) => {
        const input = e.target as HTMLInputElement;
        const cursorPos = input.selectionStart;
        filterText = input.value;
        render();
        // Restore focus and cursor position after re-render
        const restoredInput = container.querySelector('#filterInput') as HTMLInputElement;
        if (restoredInput) {
          restoredInput.focus();
          restoredInput.setSelectionRange(cursorPos, cursorPos);
        }
      });
    }

    if (showOnlyCheckbox) {
      showOnlyCheckbox.addEventListener('change', (e) => {
        showOnlyWithReports = (e.target as HTMLInputElement).checked;
        render();
      });
    }

    // Sort headers
    const sortNameTh = container.querySelector('#sort-name');
    const sortComponentsTh = container.querySelector('#sort-components');
    const sortCoverageTh = container.querySelector('#sort-coverage');

    if (sortNameTh) sortNameTh.addEventListener('click', () => handleSortClick('name'));
    if (sortComponentsTh) sortComponentsTh.addEventListener('click', () => handleSortClick('components'));
    if (sortCoverageTh) sortCoverageTh.addEventListener('click', () => handleSortClick('coverage'));

    // Row clicks → open modal
    const rows = container.querySelectorAll('.data-table tbody tr[data-idx]');
    rows.forEach(row => {
      row.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const idx = parseInt(row.getAttribute('data-idx') || '0', 10);
        const report = filtered[idx];
        if (report && report.data && !report.loading && !report.error) {
          selectedModule = report;
          renderModal();
        }
      });
    });
  };

  // ── Initial Render ──────────────────────────────────────────────
  render();

  return container;
};

export const CoverageReportDashboard = () => {
  return CoverageDashboard();
};

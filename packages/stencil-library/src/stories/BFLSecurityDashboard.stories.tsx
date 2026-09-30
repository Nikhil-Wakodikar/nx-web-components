export default {
  title: 'Documentation/BFL Security Vulnerability Dashboard',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Security vulnerability scanning dashboard showing SAST + AI-Enhanced findings across all deployed modules.',
      },
    },
  },
};

// ── Types ─────────────────────────────────────────────────────────
interface SecurityFinding {
  id: number;
  fingerprint: string;
  ruleId: string;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  category: string;
  cwe: string;
  owasp: string;
  file: string;
  line: number;
  lineRange: { start: number; end: number };
  matchedText: string;
  codeSnippet: string;
  description: string;
  exploitability?: string;
  remediation?: string;
  complianceImpact?: string;
}

interface CategoryBreakdown {
  category: string;
  count: number;
  findings: {
    ruleId: string;
    title: string;
    severity: string;
    file: string;
    line: number;
  }[];
}

interface SecurityReport {
  reportMetadata: {
    generatedAt: string;
    scanner: string;
    scanType: string;
    repository: string;
    buildNumber: string;
    triggeredBy: string;
    sourceDirectory: string;
    totalFilesScanned: number;
    scanDuration: string;
  };
  summary: {
    totalFindings: number;
    severityCounts: { High: number; Medium: number; Low: number };
    riskScore: { score: number; grade: string };
    status: string;
  };
  owaspMapping: { category: string; count: number }[];
  categoryBreakdown: CategoryBreakdown[];
  findings: SecurityFinding[];
}

interface SecurityModuleReport {
  moduleName: string;
  version: string;
  reportUrl: string;
  data?: SecurityReport;
  error?: string;
  loading?: boolean;
  mockData?: SecurityReport;
}

// ── Module Folder Map (reuse from coverage) ───────────────────────
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
    'ruralGoldLoanXAOP2': 'remote-app-rgl',
    'serviceGoldLoan': 'mf-gl-service',
    'serviceGoldLoanL2': 'mf-gl-service',
  },
  web: {
    'serviceGoldLoan': 'remote-app-goldloan-services',
    'serviceGoldLoanL2': 'remote-app-goldloan-services',
    'ruralGoldLoanXAOP2': 'remote-app-rgl',
    'Deposit': 'remote-app-deposit',
    'rewards': 'remote-app-rewards',
    'profile_new': 'remote-app-profile',
    'myaccount': 'remote-app-my-account',
  },
};

// ── Mock Data ─────────────────────────────────────────────────────
const MOCK_SECURITY_REPORTS: SecurityModuleReport[] = [
  {
    moduleName: 'Gold Loan Module',
    version: '1.0.0',
    reportUrl: 'mock',
    mockData: {
      reportMetadata: {
        generatedAt: '2026-05-25T09:38:13.582Z',
        scanner: 'BFL Security Scanner v1.0',
        scanType: 'SAST + AI-Enhanced',
        repository: '3in1_PWA_GoldLoan',
        buildNumber: 'local',
        triggeredBy: 'Unknown',
        sourceDirectory: 'projects/remote-app-rgl/src',
        totalFilesScanned: 113,
        scanDuration: '211.7s',
      },
      summary: {
        totalFindings: 51,
        severityCounts: { High: 30, Medium: 18, Low: 3 },
        riskScore: { score: 100, grade: 'F' },
        status: 'FAIL',
      },
      owaspMapping: [
        { category: 'A01:2021 - Broken Access Control', count: 32 },
        { category: 'A03:2021 - Injection', count: 8 },
        { category: 'A05:2021 - Security Misconfiguration', count: 6 },
        { category: 'A02:2021 - Cryptographic Failures', count: 3 },
        { category: 'A04:2021 - Insecure Design', count: 1 },
        { category: 'A07:2021 - Identification and Authentication Failures', count: 1 },
      ],
      categoryBreakdown: [
        {
          category: 'Information Exposure',
          count: 24,
          findings: [
            { ruleId: 'SEC-025', title: 'Insufficient Error Handling (Stack Trace Exposure)', severity: 'Medium', file: 'common/services/google-analytics.service.ts', line: 75 },
            { ruleId: 'SEC-008', title: 'Sensitive Information Disclosure', severity: 'High', file: 'common/services/tensorflow-ocr.service.ts', line: 1370 },
            { ruleId: 'SEC-008', title: 'Sensitive Information Disclosure', severity: 'High', file: 'common/services/tensorflow-ocr.service.ts', line: 1389 },
            { ruleId: 'SEC-008', title: 'Sensitive Information Disclosure', severity: 'High', file: 'common/services/tensorflow-ocr.service.ts', line: 1434 },
            { ruleId: 'SEC-008', title: 'Sensitive Information Disclosure', severity: 'High', file: 'etg/personal-details/personal-details.component.ts', line: 2705 },
            { ruleId: 'SEC-008', title: 'Sensitive Information Disclosure', severity: 'High', file: 'etg/personal-details/personal-details.component.ts', line: 3213 },
            { ruleId: 'SEC-025', title: 'Insufficient Error Handling (Stack Trace Exposure)', severity: 'Medium', file: 'components/popup/nearest-gold-branch/nearest-gold-branch.component.ts', line: 816 },
          ],
        },
        {
          category: 'Input Validation',
          count: 18,
          findings: [
            { ruleId: 'SEC-021', title: 'Missing Input Validation / Sanitization', severity: 'Medium', file: 'common/directives/character-with-space-directive.directive.ts', line: 11 },
            { ruleId: 'SEC-019', title: 'Unvalidated Redirect / Open Redirect', severity: 'High', file: 'components/application-success/application-success.component.ts', line: 274 },
            { ruleId: 'SEC-019', title: 'Unvalidated Redirect / Open Redirect', severity: 'High', file: 'components/gold-loan-reels/gold-loan-reels.component.ts', line: 141 },
            { ruleId: 'SEC-019', title: 'Unvalidated Redirect / Open Redirect', severity: 'Medium', file: 'components/popup/sorry-to-see/sorry-to-see.component.ts', line: 163 },
            { ruleId: 'SEC-019', title: 'Unvalidated Redirect / Open Redirect', severity: 'Medium', file: 'etg/personal-details/personal-details.component.ts', line: 1404 },
          ],
        },
        {
          category: 'Cross-Site Scripting',
          count: 4,
          findings: [
            { ruleId: 'SEC-015', title: 'Unsafe DOM Manipulation (XSS Risk)', severity: 'High', file: 'components/popup/dialog-kpoint-video-player/dialog-kpoint-video-player.component.ts', line: 57 },
            { ruleId: 'SEC-015', title: 'Unsafe DOM Manipulation (XSS Risk)', severity: 'High', file: 'etg/personal-details/personal-details.component.html', line: 81 },
            { ruleId: 'SEC-015', title: 'Unsafe DOM Manipulation (XSS Risk)', severity: 'High', file: 'ntg/fill-personal-details/fill-personal-details.component.html', line: 67 },
            { ruleId: 'SEC-015', title: 'Unsafe DOM Manipulation (XSS Risk)', severity: 'High', file: 'ntg/fill-personal-details/fill-personal-details.component.ts', line: 1466 },
          ],
        },
        {
          category: 'Cryptography',
          count: 3,
          findings: [
            { ruleId: 'SEC-004', title: 'AES-ECB Insecure Encryption', severity: 'High', file: 'common/utils/aes.util.ts', line: 8 },
            { ruleId: 'SEC-004', title: 'AES-ECB Insecure Encryption', severity: 'High', file: 'static-data.ts', line: 1 },
            { ruleId: 'SEC-004', title: 'AES-ECB Insecure Encryption', severity: 'High', file: 'static-data.ts', line: 3 },
          ],
        },
        {
          category: 'Data Storage',
          count: 1,
          findings: [
            { ruleId: 'SEC-017', title: 'Sensitive Data in LocalStorage/SessionStorage', severity: 'High', file: 'common/datastorage/child-storage.service.ts', line: 367 },
          ],
        },
        {
          category: 'Secrets Management',
          count: 1,
          findings: [
            { ruleId: 'SEC-006', title: 'Hardcoded Azure APIM Subscription Key', severity: 'High', file: 'common/services/api-calls.service.ts', line: 182 },
          ],
        },
      ],
      findings: [
        {
          id: 1, fingerprint: '09e2f3c55878', ruleId: 'SEC-017', title: 'Sensitive Data in LocalStorage/SessionStorage', severity: 'High', category: 'Data Storage', cwe: 'CWE-922', owasp: 'A04:2021 - Insecure Design',
          file: 'common/datastorage/child-storage.service.ts', line: 367, lineRange: { start: 362, end: 372 }, matchedText: "sessionStorage.setItem('myStorageKey'",
          codeSnippet: '   362 | \n   363 |     this.assignValues(storageObj, this, [\n   364 |       "mobileNo", "customerDtls", "goldrateReqBody", "goldrateResponse",\n   365 |       "loanDtlsReqBody", "loanDtlsResponse", "glreadReqBody"\n>> 367 |     sessionStorage.setItem(\'myStorageKey\', JSON.stringify(storageObj));',
          description: 'Sensitive data stored in browser localStorage/sessionStorage. Vulnerable to XSS exfiltration.',
          exploitability: 'Sensitive customer and journey data (mobileNo, customerDtls, latlong, loan details) is stored in Web Storage. Any XSS, malicious browser extension, or shared device access can read and exfiltrate PII.',
          remediation: '• Do not store sensitive data in localStorage/sessionStorage\n• Keep data in memory-only Angular services/NgRx store\n• Use server-set HttpOnly, Secure, SameSite cookies for auth\n• If persistence needed, encrypt with Web Crypto (AES-GCM) using per-session key\n• Clear storage on logout and journey completion',
          complianceImpact: 'OWASP A02 (Cryptographic Failures), A04 (Insecure Design), CWE-922; RBI Cyber Security Framework – secure storage of customer data; PCI-DSS Req 3.4/3.5',
        },
        {
          id: 6, fingerprint: 'ef364f1e345d', ruleId: 'SEC-006', title: 'Hardcoded Azure APIM Subscription Key', severity: 'High', category: 'Secrets Management', cwe: 'CWE-798', owasp: 'A07:2021 - Identification and Authentication Failures',
          file: 'common/services/api-calls.service.ts', line: 182, lineRange: { start: 177, end: 187 }, matchedText: "Ocp-Apim-Subscription-Key': '0b2e980966d04eccb9b2b44b507e0f02'",
          codeSnippet: "   179 | postApiServKey(url: any) {\n   180 |     const headers = {\n   181 |       'Content-Type': 'application/json',\n>> 182 |       'Ocp-Apim-Subscription-Key': '0b2e980966d04eccb9b2b44b507e0f02'\n   183 |     };\n   185 |     return this.http.post(url, {}, { headers, observe: 'response' }).pipe(",
          description: 'Azure APIM subscription keys hardcoded in source. Should be injected via environment config at deployment time.',
          exploitability: 'An Azure API Management subscription key is hardcoded in frontend code. Anyone can retrieve it from the bundled JS, allowing unauthorized API invocation, quota abuse, data scraping, and potential fraud.',
          remediation: '• Never embed secrets in client code or environment.ts\n• Move calls behind a Backend-for-Frontend (BFF)\n• BFF adds APIM key server-side from Key Vault\n• Prefer OAuth2/JWT validation at APIM (validate-jwt policy)\n• Rotate the exposed key immediately\n• Implement secret scanning (pre-commit hooks, CI scanners)',
          complianceImpact: 'OWASP A07 (Auth Failures), A02 (Cryptographic Failures), CWE-798; RBI CSF – key/credential management; PCI-DSS Req 3.5/3.6 (protect secrets)',
        },
        {
          id: 15, fingerprint: 'd47b11e57a43', ruleId: 'SEC-004', title: 'AES-ECB Insecure Encryption', severity: 'High', category: 'Cryptography', cwe: 'CWE-327', owasp: 'A02:2021 - Cryptographic Failures',
          file: 'common/utils/aes.util.ts', line: 8, lineRange: { start: 3, end: 13 }, matchedText: 'CryptoJS.AES.encrypt(data, aesKey, { iv, mode: CryptoJS.mode.CBC })',
          codeSnippet: '   4 | export function encryptAES(data: string, hexKey: string): string {\n   5 |   const aesKey = CryptoJS.enc.Hex.parse(hexKey);\n   6 |   const iv = CryptoJS.lib.WordArray.create(aesKey.words.slice(0, 4), 16);\n>> 8 |   return CryptoJS.AES.encrypt(data, aesKey, {\n   9 |     iv,\n   10 |     mode: CryptoJS.mode.CBC,\n   11 |     padding: CryptoJS.pad.Pkcs7,\n   12 |   }).toString();\n   13 | }',
          description: 'IV derived from key (static/predictable), breaking semantic security. Identical plaintexts produce identical ciphertexts.',
          exploitability: 'AES-CBC with IV derived from key enables pattern analysis. CBC without authentication is malleable, allowing bit-flipping attacks. Keys and IV reuse enable known-plaintext and chosen-ciphertext attacks.',
          remediation: '• Use Web Crypto AES-GCM with random IV per encryption:\n  const iv = crypto.getRandomValues(new Uint8Array(12));\n  const key = await crypto.subtle.importKey(...);\n  const ct = await crypto.subtle.encrypt({name:"AES-GCM", iv}, key, data);\n• If staying on CryptoJS: use CryptoJS.lib.WordArray.random(16) for IV\n• Add HMAC over iv||ciphertext\n• Never hardcode keys; derive from secure KDF',
          complianceImpact: 'OWASP A02:2021 Cryptographic Failures; PCI-DSS Req 3.4/3.5/4.1 (strong cryptography, key/IV management); RBI CSF (strong encryption for sensitive data)',
        },
        {
          id: 9, fingerprint: '230e05912ba4', ruleId: 'SEC-008', title: 'Sensitive Information Disclosure', severity: 'High', category: 'Information Exposure', cwe: 'CWE-200', owasp: 'A01:2021 - Broken Access Control',
          file: 'common/services/tensorflow-ocr.service.ts', line: 1370, lineRange: { start: 1365, end: 1375 }, matchedText: "console.log('🔍 Extracting Aadhaar data from text...')",
          codeSnippet: "   1369 |   private extractAadharData(text: string): any {\n>> 1370 |     console.log('🔍 Extracting Aadhaar data from text...');\n   1371 |     console.log('Raw OCR Text:', text);",
          description: 'Sensitive PII (Aadhaar numbers, names, DOB) exposed via console.log in production code.',
          exploitability: 'Raw OCR output containing Aadhaar numbers, names, DOB, address is logged to browser console. Any malicious extension or XSS can monkey-patch console.log to capture this data in real time.',
          remediation: '• Remove all console.log statements logging PII\n• Gate debug logging behind environment.enableDebugLogs flag\n• Mask sensitive values: aadharNumber.replace(/\\d(?=\\d{4})/g, "X")\n• Use a central LoggerService that redacts PII\n• Configure Angular prod builds to strip console.*',
          complianceImpact: 'OWASP A02:2021 Cryptographic Failures; PCI-DSS Req 3.2/3.3/10.2; RBI Cyber Security Framework (PII protection); KYC confidentiality',
        },
        {
          id: 10, fingerprint: '164d4d65d644', ruleId: 'SEC-008', title: 'Sensitive Information Disclosure', severity: 'High', category: 'Information Exposure', cwe: 'CWE-200', owasp: 'A01:2021 - Broken Access Control',
          file: 'common/services/tensorflow-ocr.service.ts', line: 1389, lineRange: { start: 1384, end: 1394 }, matchedText: "console.log('📋 Extracted Aadhaar Number:', aadharNumber)",
          codeSnippet: "   1386 |     const aadharPattern = /\\d{4}\\s?\\d{4}\\s?\\d{4}/g;\n   1388 |     const aadharNumber = aadharMatch ? aadharMatch[0].replace(/\\s/g, '') : '';\n>> 1389 |     console.log('📋 Extracted Aadhaar Number:', aadharNumber || '❌ NOT FOUND');",
          description: 'Explicitly logs the Aadhaar number to browser console.',
          exploitability: 'Prints Aadhaar number in plain text, trivially readable by any script with console access.',
          remediation: '• Delete the log or mask: const masked = aadharNumber.replace(/\\d(?=\\d{4})/g,"X");\n• Gate behind environment.enableDebugLogs\n• Add ESLint rule to forbid console logging of PII',
          complianceImpact: 'OWASP A02:2021; PCI-DSS 3.2/10.2; RBI CSF & KYC confidentiality',
        },
        {
          id: 11, fingerprint: 'f32344ba1085', ruleId: 'SEC-008', title: 'Sensitive Information Disclosure', severity: 'High', category: 'Information Exposure', cwe: 'CWE-200', owasp: 'A01:2021 - Broken Access Control',
          file: 'common/services/tensorflow-ocr.service.ts', line: 1434, lineRange: { start: 1429, end: 1439 }, matchedText: "console.log('📍 Extracted Pincode:', pincode)",
          codeSnippet: "   1431 |     const pincodePattern = /\\b[1-8]\\d{5}\\b/;\n   1433 |     const pincode = pincodeMatch ? pincodeMatch[0] : '';\n>> 1434 |     console.log('📍 Extracted Pincode:', pincode || '❌ NOT FOUND');",
          description: 'Logs location PII (pincode) enabling customer identity reconstruction.',
          exploitability: 'Location PII logged alongside other identity fields enables full customer profile reconstruction.',
          remediation: '• Remove console.log\n• Log only presence flags: this.logger.debug("Pincode found:", Boolean(pincode))',
          complianceImpact: 'OWASP A02:2021; PCI-DSS 10.2; RBI CSF (PII protection)',
        },
        {
          id: 7, fingerprint: '1e1e6925a6b7', ruleId: 'SEC-025', title: 'Insufficient Error Handling (Stack Trace Exposure)', severity: 'Medium', category: 'Information Exposure', cwe: 'CWE-209', owasp: 'A05:2021 - Security Misconfiguration',
          file: 'common/services/google-analytics.service.ts', line: 75, lineRange: { start: 70, end: 80 }, matchedText: "catch (e) {\n          console.log(e)",
          codeSnippet: "   73 |           console.log(payload);\n   74 |           dataLayer.push(payload);\n>> 75 |         } catch (e) {\n   76 |           console.log(e);\n   77 |         }",
          description: 'Full error/stack trace exposed to users or console.',
          exploitability: 'Catching errors and logging full stack traces can disclose internal object structure and potentially PII to end users or attackers.',
          remediation: '• Use a LoggerService that redacts PII and is disabled in prod\n• Example: catch (e) { this.logger.warn("GA event dropped"); }',
          complianceImpact: 'OWASP A05; CWE-209; PCI-DSS Req 10.2/10.5',
        },
        {
          id: 25, fingerprint: 'd292e7a4b106', ruleId: 'SEC-025', title: 'Insufficient Error Handling (Stack Trace Exposure)', severity: 'Medium', category: 'Information Exposure', cwe: 'CWE-209', owasp: 'A05:2021 - Security Misconfiguration',
          file: 'components/popup/nearest-gold-branch/nearest-gold-branch.component.ts', line: 816, lineRange: { start: 811, end: 821 }, matchedText: "catch (e) {\n          console.log(e)",
          codeSnippet: "   812 |       setTime() {\n   813 |         try {\n   814 |           const date = new Date()\n   815 |           this.startTime = date.getTime()\n>> 816 |         } catch (e) {\n   817 |           console.log(e);\n   818 |         }",
          description: 'Stack trace exposed via console.log in error handler.',
          exploitability: 'Error details leaked to console aid reconnaissance.',
          remediation: '• Replace with: catch(e) { /* silent or this.logger.warn("setTime failed") */ }',
          complianceImpact: 'OWASP A05; CWE-209',
        },
        {
          id: 2, fingerprint: '8ab78bfa62b1', ruleId: 'SEC-021', title: 'Missing Input Validation / Sanitization', severity: 'Medium', category: 'Input Validation', cwe: 'CWE-20', owasp: 'A03:2021 - Injection',
          file: 'common/directives/character-with-space-directive.directive.ts', line: 11, lineRange: { start: 6, end: 16 }, matchedText: 'nativeElement.value',
          codeSnippet: "   10 |   @HostListener('input', ['$event']) onInputChange(event) {\n>> 11 |     const initalValue = this._el.nativeElement.value;\n   12 |     this._el.nativeElement.value = initalValue.replace(/[^a-zA-Z ]*/g, '');\n   13 |     this._el.nativeElement.value = (this._el.nativeElement.value).trimLeft()",
          description: 'Raw DOM input values used without validation. Client-side filtering can be bypassed.',
          exploitability: 'ElementRef manipulation can be bypassed via programmatic assignment, dev tools, or crafted requests. Without server-side validation, unexpected characters can reach APIs.',
          remediation: '• Use Angular Reactive Forms with Validators.pattern(/^[A-Za-z ]{1,50}$/)\n• Enforce validation server-side with strict allow-list regex\n• Replace ElementRef with Renderer2\n• Treat client-side filters as UX aids only',
          complianceImpact: 'OWASP A03 (Injection), A04 (Insecure Design), CWE-20; PCI-DSS Req 6.5.1',
        },
        {
          id: 16, fingerprint: '95d69eb64b83', ruleId: 'SEC-019', title: 'Unvalidated Redirect / Open Redirect', severity: 'High', category: 'Input Validation', cwe: 'CWE-601', owasp: 'A01:2021 - Broken Access Control',
          file: 'components/application-success/application-success.component.ts', line: 274, lineRange: { start: 269, end: 279 }, matchedText: 'window.location.href = map',
          codeSnippet: "   272 |     } else {\n   273 |       this.sendClickGLF('5','Check Now','locatormap_button_click',...)\n>> 274 |       window.location.href = map;\n   275 |     }",
          description: 'Redirects using unvalidated user input. Can be exploited for phishing.',
          exploitability: 'Sets window.location.href to unvalidated map URL. Attacker can influence the value to redirect users to phishing sites or javascript: URLs.',
          remediation: '• Validate URL: const url = new URL(map, window.location.origin);\n• Allowlist hosts: ["maps.google.com","www.google.com","maps.app.goo.gl"]\n• Check protocol: if(!["https:","http:"].includes(url.protocol)) return;\n• Prefer Angular Router for internal navigation',
          complianceImpact: 'OWASP ASVS 5.3.2; PCI-DSS Req 6.5; RBI CSF (phishing controls)',
        },
        {
          id: 20, fingerprint: 'a8a59f8ea953', ruleId: 'SEC-019', title: 'Unvalidated Redirect / Open Redirect', severity: 'High', category: 'Input Validation', cwe: 'CWE-601', owasp: 'A01:2021 - Broken Access Control',
          file: 'components/gold-loan-reels/gold-loan-reels.component.ts', line: 141, lineRange: { start: 136, end: 146 }, matchedText: "window.open(link, '_self')",
          codeSnippet: "   140 |     else if (link && typeof link === 'string' && environment.CONNECTION_SOURCE=='WEB') {\n>> 141 |        window.open(link, '_self')\n   142 |     }",
          description: 'Opens unvalidated link in same tab. Enables phishing if link is attacker-controlled.',
          exploitability: 'If link originates from CMS/config/event data that is attacker-controllable, users are seamlessly redirected to malicious sites.',
          remediation: '• Validate protocol and restrict to allowlist of approved origins\n• Disallow javascript:, data:, file:, blob: schemes\n• Use Angular Router for same-site paths',
          complianceImpact: 'PCI-DSS 4.0 Req 6; OWASP ASVS V5.3; RBI CSF (anti-phishing)',
        },
        {
          id: 26, fingerprint: '334bc146f56e', ruleId: 'SEC-019', title: 'Unvalidated Redirect / Open Redirect', severity: 'Medium', category: 'Input Validation', cwe: 'CWE-601', owasp: 'A01:2021 - Broken Access Control',
          file: 'components/popup/sorry-to-see/sorry-to-see.component.ts', line: 163, lineRange: { start: 158, end: 168 }, matchedText: 'window.location.href = environment.WEB_HOME_PAGE',
          codeSnippet: "   164 |        const langCode = localStorage.getItem('langCode');\n   165 |      if(langCode == 'hi_IN'){\n>> 166 |             window.location.href = environment.WEB_HOME_PAGE +\"hindi/\"+ \"gold-loan\";",
          description: 'Redirect using environment variable. Low risk but bypasses Angular routing.',
          exploitability: 'Build-time constant; low exploitability unless build pipeline is compromised.',
          remediation: '• Prefer Angular Router: this.router.navigateByUrl("/gold-loan")\n• Validate origin before assigning to window.location',
          complianceImpact: 'OWASP A04; PCI-DSS Req 6; RBI CSF (secure config management)',
        },
        {
          id: 37, fingerprint: '8df297fa415f', ruleId: 'SEC-019', title: 'Unvalidated Redirect / Open Redirect', severity: 'Medium', category: 'Input Validation', cwe: 'CWE-601', owasp: 'A01:2021 - Broken Access Control',
          file: 'etg/personal-details/personal-details.component.ts', line: 1404, lineRange: { start: 1399, end: 1409 }, matchedText: "window.open(this.rglStorage.termsConditionUrl, '_blank')",
          codeSnippet: "   1402 |     } else {\n   1403 |       this.sendClickGLF('8', 'Terms and Conditions', ...)\n>> 1404 |       window.open(this.rglStorage.termsConditionUrl, '_blank');\n   1405 |     }",
          description: 'Opens URL from storage without validation.',
          exploitability: 'If termsConditionUrl is influenced by API response, attacker can redirect to phishing page.',
          remediation: '• Validate URL against allowlist of company domains before opening\n• Enforce https: protocol',
          complianceImpact: 'OWASP ASVS V5.3; PCI-DSS Req 6.5',
        },
        {
          id: 23, fingerprint: '96aa8a2ecf20', ruleId: 'SEC-015', title: 'Unsafe DOM Manipulation (XSS Risk)', severity: 'High', category: 'Cross-Site Scripting', cwe: 'CWE-79', owasp: 'A03:2021 - Injection',
          file: 'components/popup/dialog-kpoint-video-player/dialog-kpoint-video-player.component.ts', line: 57, lineRange: { start: 52, end: 62 }, matchedText: 'innerHTML =',
          codeSnippet: "   55 |   loadScript(body: HTMLDivElement) {\n   56 |     const script = document.createElement('script');\n>> 57 |     script.innerHTML = '';\n   58 |     script.src = this.scriptUrl;\n   59 |     script.async = false;\n   60 |     script.defer = true;\n   61 |     body.appendChild(script);",
          description: 'Dynamic script injection with runtime-controlled src enables remote code execution.',
          exploitability: 'If attacker can influence scriptUrl, they achieve full DOM XSS — credential theft, transaction manipulation. Bypasses Angular security model.',
          remediation: '• Avoid dynamic script injection\n• Add scripts via angular.json scripts[] or dynamic import\n• If required: validate URL, use Renderer2, enforce HTTPS, allowlist origins\n• Deploy CSP: script-src \'self\' with nonces',
          complianceImpact: 'PCI-DSS 4.0 Req 6 (XSS prevention); OWASP A03 Injection; OWASP ASVS V5.1/V5.2; RBI CSF (secure coding)',
        },
        {
          id: 30, fingerprint: 'd8b1c6b4d32c', ruleId: 'SEC-015', title: 'Unsafe DOM Manipulation (XSS Risk)', severity: 'High', category: 'Cross-Site Scripting', cwe: 'CWE-79', owasp: 'A03:2021 - Injection',
          file: 'etg/personal-details/personal-details.component.html', line: 81, lineRange: { start: 76, end: 86 }, matchedText: '[innerHTML]="tncexpdesc"',
          codeSnippet: '   78 |                 <bfl-checkbox-input *ngIf="consent" name="tnc-2" formControlName="consent">\n   80 |                   <div>\n>> 81 |                     <p [innerHTML]="tncexpdesc"></p>\n   82 |                   </div>',
          description: 'Using [innerHTML] binding with potentially untrusted content.',
          exploitability: 'If tncexpdesc contains unsanitized HTML from API, attacker can inject script payloads.',
          remediation: '• Ensure tncexpdesc is sanitized by Angular DomSanitizer\n• Use bypassSecurityTrustHtml only if content is from a trusted source\n• Add server-side HTML sanitization (DOMPurify equivalent)',
          complianceImpact: 'OWASP A03 Injection (XSS); PCI-DSS Req 6.5; RBI CSF',
        },
        {
          id: 40, fingerprint: 'a23109ceb902', ruleId: 'SEC-015', title: 'Unsafe DOM Manipulation (XSS Risk)', severity: 'High', category: 'Cross-Site Scripting', cwe: 'CWE-79', owasp: 'A03:2021 - Injection',
          file: 'ntg/fill-personal-details/fill-personal-details.component.html', line: 67, lineRange: { start: 62, end: 72 }, matchedText: '[innerHTML]="tncexpdesc"',
          codeSnippet: '   65 |                 <bfl-checkbox-input *ngIf="consent" name="tnc-2">\n   66 |                   <div>\n>> 67 |                      <p [innerHTML]="tncexpdesc"></p>\n   68 |                     </div>',
          description: 'Same [innerHTML] XSS pattern in NTG flow.',
          exploitability: 'Duplicate of ETG flow vulnerability — same risk applies.',
          remediation: '• Apply same fix: sanitize content before binding\n• Consider using a shared safe-html pipe',
          complianceImpact: 'OWASP A03; PCI-DSS Req 6.5',
        },
        {
          id: 47, fingerprint: '84ffa0099ffd', ruleId: 'SEC-015', title: 'Unsafe DOM Manipulation (XSS Risk)', severity: 'High', category: 'Cross-Site Scripting', cwe: 'CWE-79', owasp: 'A03:2021 - Injection',
          file: 'ntg/fill-personal-details/fill-personal-details.component.ts', line: 1466, lineRange: { start: 1461, end: 1471 }, matchedText: 'txt.innerHTML = str',
          codeSnippet: "   1463 |   splitTncDescription(description: string): string[] {\n   1464 |     const decodeHtml = (str: string): string => {\n   1465 |       const txt = document.createElement('textarea');\n>> 1466 |       txt.innerHTML = str;\n   1467 |       return txt.value;\n   1468 |     };",
          description: 'Using innerHTML for HTML entity decoding — can execute scripts if input contains <script> tags in some edge cases.',
          exploitability: 'The textarea trick is generally safe for decoding entities, but passing untrusted HTML through innerHTML is a code smell that may mask future vulnerabilities.',
          remediation: '• Use DOMParser or a dedicated decode library instead\n• Example: new DOMParser().parseFromString(str, "text/html").body.textContent',
          complianceImpact: 'OWASP A03; ASVS V5.1',
        },
        {
          id: 50, fingerprint: '3f25232af1ca', ruleId: 'SEC-004', title: 'AES-ECB Insecure Encryption', severity: 'High', category: 'Cryptography', cwe: 'CWE-327', owasp: 'A02:2021 - Cryptographic Failures',
          file: 'static-data.ts', line: 1, lineRange: { start: 1, end: 4 }, matchedText: 'export const BASE64_STRING = "/9j/4AAQ..."',
          codeSnippet: '>> 1 | export const BASE64_STRING = "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAA..."',
          description: 'Large base64-encoded data blob in source. May contain embedded encrypted data or images with metadata.',
          exploitability: 'If this contains AES-ECB encrypted data, pattern analysis is possible. Large embedded data increases bundle size and attack surface.',
          remediation: '• Move static assets to CDN with proper cache headers\n• If encrypted data: switch to AES-GCM with random IV\n• Remove from source control if not needed at build time',
          complianceImpact: 'OWASP A02; PCI-DSS Req 3.4; RBI CSF',
        },
        {
          id: 35, fingerprint: '2001102b046c', ruleId: 'SEC-008', title: 'Sensitive Information Disclosure', severity: 'High', category: 'Information Exposure', cwe: 'CWE-200', owasp: 'A01:2021 - Broken Access Control',
          file: 'etg/personal-details/personal-details.component.ts', line: 3213, lineRange: { start: 3208, end: 3218 }, matchedText: 'console.log(`   ℹ️ Keeping trailing single letter "${word}"',
          codeSnippet: '   3211 |     const substantialWords = words.filter(w => w.length >= 3);\n   3212 |     if (index === words.length - 1 && words.length >= 2) {\n>> 3213 |       console.log(`   ℹ️ Keeping trailing single letter "${word}" as potential middle initial`);\n   3214 |       return word;',
          description: 'Logs OCR-extracted name parts which constitute PII.',
          exploitability: 'Exposes customer name parsing logic and partial name data to console.',
          remediation: '• Remove debug logging of OCR-extracted PII\n• Gate behind feature flag disabled in production',
          complianceImpact: 'OWASP A02:2021; RBI CSF (data minimization); KYC confidentiality',
        },
        {
          id: 31, fingerprint: 'c83d00c749f4', ruleId: 'SEC-008', title: 'Sensitive Information Disclosure', severity: 'High', category: 'Information Exposure', cwe: 'CWE-200', owasp: 'A01:2021 - Broken Access Control',
          file: 'etg/personal-details/personal-details.component.ts', line: 2705, lineRange: { start: 2700, end: 2710 }, matchedText: 'console.log(`         ⏩ Skipping: too short`)',
          codeSnippet: '   2701 |         console.log(`      ↳ Checking line ${i + j} (offset +${j}): "${nextLine}"`);\n   2704 |         if (!nextLine || nextLine.length < 5) {\n>> 2705 |           console.log(`         ⏩ Skipping: too short`);',
          description: 'Debug logs exposing OCR processing logic and document content in console.',
          exploitability: 'While the specific log message is benign, the surrounding logs print actual document lines (nextLine) which contain PII.',
          remediation: '• Remove entire debug logging block in OCR processing\n• Use structured server-side logging for debugging production OCR issues',
          complianceImpact: 'OWASP A02:2021; PCI-DSS 10.2; RBI CSF',
        },
      ],
    },
  },
];

// ── Dashboard Component ───────────────────────────────────────────
const SecurityDashboard = () => {
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
  let moduleReports: SecurityModuleReport[] = [];
  let sortBy: 'risk' | 'name' | 'findings' = 'risk';
  let sortDirection: 'asc' | 'desc' = 'desc';
  let filterText = '';
  let showOnlyWithReports = false;
  let selectedModule: SecurityModuleReport | null = null;

  // ── URL Construction ────────────────────────────────────────────
  const URL_MAP: Record<string, Record<string, string>> = {
    app: {
      uat: 'https://pushengineuat.bajajfinserv.in/DPAOP/',
      cug: 'https://pushenginecug.bajajfinserv.in/DPAOP/',
      prod: 'https://pushengine.bajajfinserv.in/DPAOP/',
    },
    web: {
      uat: 'https://pushenginewebuat.bajajfinserv.in/3in1web/',
      cug: 'https://pushenginewebcug.bajajfinserv.in/3in1web/',
      prod: 'https://pushengineweb.bajajfinserv.in/3in1web/',
    },
  };

  const getBaseUrl = (): string => URL_MAP[platform]?.[environment] || URL_MAP.app.uat;

  const WEB_VERSION_URL_MAP: Record<string, string> = {
    uat: 'https://pushenginewebuat.bajajfinserv.in/web_version.json',
    cug: 'https://pushenginewebcug.bajajfinserv.in/web_version.json',
    prod: 'https://pushengineweb.bajajfinserv.in/web_version.json',
  };

  const getVersionUrl = (): string =>
    platform === 'web'
      ? WEB_VERSION_URL_MAP[environment] || WEB_VERSION_URL_MAP.uat
      : `${getBaseUrl()}version/${appVersion}/${appVersion}_v1.json`;

  // ── CORS Proxy Helper ───────────────────────────────────────────
  const PROXY_PREFIX = '/api-proxy';
  const toProxiedUrl = (url: string): string => {
    const proxyTarget = getBaseUrl().replace(/\/$/, '');
    if (url.startsWith(proxyTarget)) return url.replace(proxyTarget, PROXY_PREFIX);
    return url;
  };

  const corsFetch = async (url: string, init?: RequestInit): Promise<Response> => {
    const proxiedUrl = toProxiedUrl(url);
    if (proxiedUrl !== url) {
      try {
        const res = await fetch(proxiedUrl, init);
        if (res.ok) return res;
      } catch (_) { /* fall through */ }
    }
    return fetch(url, init);
  };

  // ── Styles ──────────────────────────────────────────────────────
  const styles = `
    <style>
      .sec-dashboard-header {
        background: linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #991b1b 100%);
        padding: 28px 32px;
        border-radius: 12px;
        margin-bottom: 24px;
        color: white;
      }
      .sec-dashboard-title { font-size: 26px; font-weight: 700; margin: 0 0 6px 0; }
      .sec-dashboard-subtitle { font-size: 14px; opacity: 0.8; margin: 0; }

      .sec-controls-section {
        background: white;
        padding: 20px 24px;
        border-radius: 10px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        margin-bottom: 24px;
      }
      .sec-controls-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 16px;
        margin-bottom: 16px;
      }
      .sec-control-group { display: flex; flex-direction: column; gap: 6px; }
      .sec-control-label { font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
      .sec-control-input {
        padding: 10px 12px;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        font-size: 13px;
        font-family: 'Courier New', monospace;
      }
      .sec-control-input:focus { outline: none; border-color: #dc2626; box-shadow: 0 0 0 3px rgba(220,38,38,0.1); }
      .sec-control-button {
        padding: 10px 24px;
        background: #dc2626;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
      }
      .sec-control-button:hover { background: #b91c1c; }
      .sec-control-button:disabled { background: #cbd5e1; cursor: not-allowed; }

      .sec-summary-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
      }
      .sec-summary-card {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        border-left: 4px solid #e2e8f0;
      }
      .sec-summary-card-value { font-size: 28px; font-weight: 700; margin: 0 0 4px 0; }
      .sec-summary-card-label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin: 0; }

      .sec-table-container {
        background: white;
        border-radius: 10px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        overflow: hidden;
      }
      .sec-data-table { width: 100%; border-collapse: collapse; }
      .sec-data-table thead th {
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
      }
      .sec-data-table thead th:hover { background: #f1f5f9; color: #334155; }
      .sec-data-table tbody tr {
        cursor: pointer;
        transition: all 0.15s;
        border-bottom: 1px solid #f1f5f9;
      }
      .sec-data-table tbody tr:hover { filter: brightness(0.96); }
      .sec-data-table tbody td { padding: 14px 16px; font-size: 13px; color: #334155; }
      .sec-data-table tbody td:first-child { font-weight: 600; }

      .sec-row-critical { background: #fef2f2; }
      .sec-row-high { background: #fff7ed; }
      .sec-row-medium { background: #fffbeb; }
      .sec-row-pass { background: #f0fdf4; }
      .sec-row-none { background: #f9fafb; }
      .sec-row-loading { background: #fafafa; }

      .sec-grade-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 800;
      }
      .sec-grade-F { background: #fecaca; color: #991b1b; }
      .sec-grade-D { background: #fed7aa; color: #9a3412; }
      .sec-grade-C { background: #fef3c7; color: #92400e; }
      .sec-grade-B { background: #d1fae5; color: #065f46; }
      .sec-grade-A { background: #cffafe; color: #155e75; }

      .sec-severity-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 11px;
        font-weight: 600;
      }
      .sec-severity-High { background: #fecaca; color: #991b1b; }
      .sec-severity-Medium { background: #fef3c7; color: #92400e; }
      .sec-severity-Low { background: #e0f2fe; color: #0c4a6e; }

      .sec-status-badge {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 700;
      }
      .sec-status-FAIL { background: #fecaca; color: #991b1b; }
      .sec-status-PASS { background: #dcfce7; color: #166534; }

      .sec-badge-mock {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: 600;
        background: #fef3c7;
        color: #92400e;
        margin-left: 8px;
      }
      .sec-badge-live {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: 600;
        background: #dcfce7;
        color: #166534;
        margin-left: 8px;
      }

      .sec-spinner-sm {
        display: inline-block;
        width: 14px; height: 14px;
        border: 2px solid #e2e8f0;
        border-radius: 50%;
        border-top-color: #dc2626;
        animation: sec-spin 0.6s linear infinite;
        vertical-align: middle;
        margin-right: 6px;
      }
      @keyframes sec-spin { to { transform: rotate(360deg); } }

      .sec-sort-arrow { font-size: 10px; margin-left: 4px; }

      .sec-filters-row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
      .sec-filter-input {
        flex: 1; min-width: 200px;
        padding: 9px 14px;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        font-size: 13px;
      }
      .sec-filter-checkbox {
        display: flex; align-items: center; gap: 6px;
        padding: 9px 14px; background: #f8fafc; border-radius: 6px;
        cursor: pointer; user-select: none; font-size: 13px; white-space: nowrap;
      }

      /* Modal */
      .sec-modal-overlay {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000; padding: 20px;
        animation: sec-fadeIn 0.2s ease;
      }
      @keyframes sec-fadeIn { from { opacity: 0; } to { opacity: 1; } }
      .sec-modal-content {
        background: #f5f5f5;
        border-radius: 14px;
        width: 100%; max-width: 1100px; max-height: 90vh;
        overflow: hidden; display: flex; flex-direction: column;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        animation: sec-slideUp 0.25s ease;
      }
      @keyframes sec-slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      .sec-modal-header {
        background: linear-gradient(135deg, #450a0a 0%, #7f1d1d 100%);
        padding: 24px 28px; color: white;
        display: flex; justify-content: space-between; align-items: flex-start; flex-shrink: 0;
      }
      .sec-modal-header h2 { font-size: 20px; font-weight: 700; margin: 0 0 4px 0; }
      .sec-modal-header p { font-size: 13px; opacity: 0.7; margin: 0; }
      .sec-modal-close {
        background: rgba(255,255,255,0.15); border: none; color: white;
        width: 36px; height: 36px; border-radius: 8px; font-size: 18px;
        cursor: pointer; display: flex; align-items: center; justify-content: center;
      }
      .sec-modal-close:hover { background: rgba(255,255,255,0.25); }

      .sec-modal-summary {
        display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px;
        padding: 20px 28px; background: white; border-bottom: 1px solid #e2e8f0; flex-shrink: 0;
      }
      .sec-modal-stat { text-align: center; padding: 12px; background: #f8fafc; border-radius: 8px; }
      .sec-modal-stat-value { font-size: 22px; font-weight: 700; margin: 0 0 2px 0; }
      .sec-modal-stat-label { font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }

      .sec-modal-body { overflow-y: auto; padding: 24px 28px; flex: 1; }

      /* Category accordion */
      .sec-category-card {
        background: white; border-radius: 10px; margin-bottom: 12px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; overflow: hidden;
      }
      /* Details/Summary native accordion styling */
      .sec-category-card { list-style: none; }
      .sec-category-card > summary { list-style: none; }
      .sec-category-card > summary::-webkit-details-marker { display: none; }
      .sec-category-card > summary::marker { display: none; content: ''; }
      .sec-category-card[open] .sec-category-chevron { transform: rotate(180deg); }

      .sec-finding-item { list-style: none; }
      .sec-finding-item > summary { list-style: none; }
      .sec-finding-item > summary::-webkit-details-marker { display: none; }
      .sec-finding-item > summary::marker { display: none; content: ''; }
      .sec-finding-item[open] .sec-finding-chevron { transform: rotate(180deg); }

      .sec-category-header {
        padding: 16px 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
        transition: background 0.15s; user-select: none;
      }
      .sec-category-header:hover { background: #f8fafc; }
      .sec-category-header-left { display: flex; align-items: center; gap: 12px; }
      .sec-category-icon { font-size: 20px; }
      .sec-category-name { font-size: 14px; font-weight: 700; color: #1e293b; }
      .sec-category-count {
        display: inline-flex; align-items: center; justify-content: center;
        min-width: 24px; height: 24px; border-radius: 12px;
        background: #fecaca; color: #991b1b; font-size: 12px; font-weight: 700; padding: 0 8px;
      }
      .sec-category-chevron { font-size: 14px; color: #94a3b8; transition: transform 0.2s; }
      .sec-finding-chevron { font-size: 14px; color: #94a3b8; transition: transform 0.2s; }

      .sec-category-findings { border-top: 1px solid #e2e8f0; }
      .sec-finding-row {
        padding: 12px 20px; border-bottom: 1px solid #f1f5f9;
        display: grid; grid-template-columns: auto 1fr auto; gap: 12px; align-items: center;
        font-size: 13px; cursor: pointer;
      }
      .sec-finding-row:hover { background: #f8fafc; }
      .sec-finding-row:last-child { border-bottom: none; }
      .sec-finding-rule { font-family: 'Courier New', monospace; font-size: 11px; color: #6366f1; font-weight: 600; }
      .sec-finding-title { color: #334155; }
      .sec-finding-file { font-size: 11px; color: #64748b; margin-top: 2px; font-family: 'Courier New', monospace; }
      .sec-finding-meta { display: flex; align-items: center; gap: 8px; }

      .sec-finding-detail {
        padding: 16px 20px; background: #f8fafc; border-bottom: 1px solid #e2e8f0;
        font-size: 12px; line-height: 1.7;
      }
      .sec-finding-detail-section { margin-bottom: 12px; }
      .sec-finding-detail-label {
        font-size: 10px; font-weight: 700; text-transform: uppercase;
        letter-spacing: 0.5px; color: #64748b; margin-bottom: 4px;
      }
      .sec-finding-detail-code {
        background: #1e293b; color: #e2e8f0; padding: 12px 16px;
        border-radius: 6px; font-family: 'Courier New', monospace;
        font-size: 11px; overflow-x: auto; white-space: pre; line-height: 1.5;
      }
      .sec-finding-detail-text { color: #334155; font-size: 13px; }
      .sec-finding-detail-remediation {
        background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px;
        padding: 12px 16px; font-size: 12px; color: #166534; line-height: 1.6;
      }
      .sec-finding-detail-risk {
        background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px;
        padding: 12px 16px; font-size: 12px; color: #991b1b; line-height: 1.6;
      }
      .sec-finding-detail-compliance {
        background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px;
        padding: 12px 16px; font-size: 12px; color: #1e40af; line-height: 1.6;
      }
      .sec-finding-detail-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
      .sec-finding-detail-tag {
        padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 600;
        background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0;
      }

      .sec-empty-state { padding: 60px 20px; text-align: center; color: #94a3b8; }
      .sec-empty-state-icon { font-size: 40px; margin-bottom: 12px; }

      /* OWASP bar chart */
      .sec-owasp-bar { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
      .sec-owasp-label { font-size: 11px; color: #475569; min-width: 260px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .sec-owasp-track { flex: 1; height: 20px; background: #f1f5f9; border-radius: 4px; overflow: hidden; }
      .sec-owasp-fill { height: 100%; border-radius: 4px; display: flex; align-items: center; padding-left: 6px; font-size: 10px; color: white; font-weight: 700; }
      .sec-owasp-count { font-size: 12px; font-weight: 700; color: #334155; min-width: 24px; text-align: right; }
    </style>
  `;

  // ── Helpers ─────────────────────────────────────────────────────
  const getGradeColor = (grade: string) => {
    const map: Record<string, string> = { F: '#dc2626', D: '#ea580c', C: '#d97706', B: '#059669', A: '#0891b2' };
    return map[grade] || '#64748b';
  };

  const getCategoryIcon = (category: string): string => {
    const map: Record<string, string> = {
      'Information Exposure': '🔓',
      'Input Validation': '🛡️',
      'Cross-Site Scripting': '💉',
      'Cryptography': '🔐',
      'Data Storage': '💾',
      'Secrets Management': '🔑',
    };
    return map[category] || '⚠️';
  };

  const getRowClass = (report: SecurityModuleReport): string => {
    if (report.loading) return 'sec-row-loading';
    if (report.error || !report.data) return 'sec-row-none';
    const grade = report.data.summary.riskScore.grade;
    if (grade === 'F' || grade === 'D') return 'sec-row-critical';
    if (grade === 'C') return 'sec-row-medium';
    return 'sec-row-pass';
  };

  // ── Fetch Logic ─────────────────────────────────────────────────
  const fetchVersionData = async () => {
    const baseUrl = getBaseUrl();
    const versionUrl = getVersionUrl();

    moduleReports = MOCK_SECURITY_REPORTS.map(m => ({ ...m, loading: false, data: m.mockData }));
    render();

    try {
      const response = await corsFetch(versionUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const versionData = await response.json();

      const folderMap = MODULE_FOLDER_MAP[platform] || MODULE_FOLDER_MAP.app;
      const liveReports: SecurityModuleReport[] = Object.entries(versionData).map(([moduleName, version]) => {
        const folderName = folderMap[moduleName] || moduleName;
        return {
          moduleName,
          version: String(version),
          reportUrl: `${baseUrl}${folderName}/${version}/bfl-security-report.json`,
          loading: true,
        };
      });

      moduleReports = [
        ...MOCK_SECURITY_REPORTS.map(m => ({ ...m, loading: false, data: m.mockData })),
        ...liveReports,
      ];
      render();

      await Promise.all(
        liveReports.map(async (report) => {
          try {
            const res = await corsFetch(report.reportUrl);
            if (res.ok) {
              report.data = await res.json();
            } else {
              report.error = `HTTP ${res.status}`;
            }
          } catch {
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
  const getFilteredAndSorted = (): SecurityModuleReport[] => {
    let filtered = moduleReports;
    if (filterText) {
      const lower = filterText.toLowerCase();
      filtered = filtered.filter(r => r.moduleName.toLowerCase().includes(lower) || r.version.includes(lower));
    }
    if (showOnlyWithReports) {
      filtered = filtered.filter(r => r.data && !r.error);
    }
    filtered.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'risk') {
        const aVal = a.data?.summary?.riskScore?.score ?? -1;
        const bVal = b.data?.summary?.riskScore?.score ?? -1;
        cmp = aVal - bVal;
      } else if (sortBy === 'findings') {
        const aVal = a.data?.summary?.totalFindings ?? -1;
        const bVal = b.data?.summary?.totalFindings ?? -1;
        cmp = aVal - bVal;
      } else {
        cmp = a.moduleName.localeCompare(b.moduleName);
      }
      return sortDirection === 'desc' ? -cmp : cmp;
    });
    return filtered;
  };

  const calculateStats = () => {
    const withData = moduleReports.filter(r => r.data);
    const totalModules = moduleReports.length;
    const modulesScanned = withData.length;
    const totalFindings = withData.reduce((sum, r) => sum + (r.data!.summary.totalFindings || 0), 0);
    const totalHigh = withData.reduce((sum, r) => sum + (r.data!.summary.severityCounts.High || 0), 0);
    const totalMedium = withData.reduce((sum, r) => sum + (r.data!.summary.severityCounts.Medium || 0), 0);
    const totalLow = withData.reduce((sum, r) => sum + (r.data!.summary.severityCounts.Low || 0), 0);
    const failCount = withData.filter(r => r.data!.summary.status === 'FAIL').length;
    return { totalModules, modulesScanned, totalFindings, totalHigh, totalMedium, totalLow, failCount };
  };

  const handleSortClick = (column: 'risk' | 'name' | 'findings') => {
    if (sortBy === column) { sortDirection = sortDirection === 'desc' ? 'asc' : 'desc'; }
    else { sortBy = column; sortDirection = column === 'name' ? 'asc' : 'desc'; }
    render();
  };

  const sortArrow = (col: string) => sortBy !== col ? '' : `<span class="sec-sort-arrow">${sortDirection === 'desc' ? '▼' : '▲'}</span>`;

  // ── Main Render ─────────────────────────────────────────────────
  const render = () => {
    const filtered = getFilteredAndSorted();
    const stats = calculateStats();

    container.innerHTML = `
      ${styles}
      <div class="sec-dashboard-header">
        <h1 class="sec-dashboard-title">🛡️ BFL Security Vulnerability Dashboard</h1>
        <p class="sec-dashboard-subtitle">SAST + AI-Enhanced security scanning across all deployed modules</p>
      </div>

      <div class="sec-controls-section">
        <div class="sec-controls-grid">
          <div class="sec-control-group">
            <label class="sec-control-label">Platform</label>
            <select class="sec-control-input" id="secPlatformSelect">
              <option value="app" ${platform === 'app' ? 'selected' : ''}>App</option>
              <option value="web" ${platform === 'web' ? 'selected' : ''}>Web</option>
            </select>
          </div>
          <div class="sec-control-group">
            <label class="sec-control-label">Environment</label>
            <select class="sec-control-input" id="secEnvironmentSelect">
              <option value="uat" ${environment === 'uat' ? 'selected' : ''}>UAT</option>
              <option value="cug" ${environment === 'cug' ? 'selected' : ''}>CUG</option>
              <option value="prod" ${environment === 'prod' ? 'selected' : ''}>Prod</option>
            </select>
          </div>
          <div class="sec-control-group">
            <label class="sec-control-label">App Version</label>
            <input type="text" class="sec-control-input" id="secAppVersionInput" value="${appVersion}" placeholder="e.g. 26.0.0" />
          </div>
        </div>
        <div style="margin-top: 14px; padding: 12px 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; font-family: 'Courier New', monospace; font-size: 12px; color: #475569; line-height: 1.8;">
          <strong style="color: #1e293b; font-size: 11px; text-transform: uppercase;">🔗 Report URL Pattern</strong><br/>
          <span style="color: #2563eb;">${getBaseUrl()}{folder}/{version}/bfl-security-report.json</span>
        </div>
        <button type="button" class="sec-control-button" id="secFetchButton" style="margin-top: 14px;">🔄 Fetch Security Reports</button>
      </div>

      <div class="sec-summary-cards">
        <div class="sec-summary-card" style="border-left-color: #6366f1;">
          <div class="sec-summary-card-value" style="color: #6366f1;">${stats.totalModules}</div>
          <div class="sec-summary-card-label">Total Modules</div>
        </div>
        <div class="sec-summary-card" style="border-left-color: #dc2626;">
          <div class="sec-summary-card-value" style="color: #dc2626;">${stats.totalFindings}</div>
          <div class="sec-summary-card-label">Total Findings</div>
        </div>
        <div class="sec-summary-card" style="border-left-color: #991b1b;">
          <div class="sec-summary-card-value" style="color: #991b1b;">${stats.totalHigh}</div>
          <div class="sec-summary-card-label">High Severity</div>
        </div>
        <div class="sec-summary-card" style="border-left-color: #d97706;">
          <div class="sec-summary-card-value" style="color: #d97706;">${stats.totalMedium}</div>
          <div class="sec-summary-card-label">Medium Severity</div>
        </div>
        <div class="sec-summary-card" style="border-left-color: #0ea5e9;">
          <div class="sec-summary-card-value" style="color: #0ea5e9;">${stats.totalLow}</div>
          <div class="sec-summary-card-label">Low Severity</div>
        </div>
        <div class="sec-summary-card" style="border-left-color: #ef4444;">
          <div class="sec-summary-card-value" style="color: #ef4444;">${stats.failCount}</div>
          <div class="sec-summary-card-label">Failed Modules</div>
        </div>
      </div>

      <div class="sec-controls-section" style="margin-bottom: 20px;">
        <div class="sec-filters-row">
          <input type="text" class="sec-filter-input" id="secFilterInput" placeholder="🔍 Search modules..." value="${filterText}" />
          <label class="sec-filter-checkbox">
            <input type="checkbox" id="secShowOnlyCheckbox" ${showOnlyWithReports ? 'checked' : ''} />
            <span>Only with reports (${stats.modulesScanned})</span>
          </label>
        </div>
      </div>

      ${filtered.length === 0 ? `
        <div class="sec-table-container">
          <div class="sec-empty-state">
            <div class="sec-empty-state-icon">🛡️</div>
            <p>No modules found. Click "Fetch Security Reports" to load data.</p>
          </div>
        </div>
      ` : `
        <div class="sec-table-container">
          <table class="sec-data-table">
            <thead>
              <tr>
                <th id="sec-sort-name">Module ${sortArrow('name')}</th>
                <th>Version</th>
                <th>Status</th>
                <th id="sec-sort-risk">Risk Grade ${sortArrow('risk')}</th>
                <th id="sec-sort-findings">Findings ${sortArrow('findings')}</th>
                <th>High</th>
                <th>Medium</th>
                <th>Low</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map((report, idx) => {
                if (report.loading) {
                  return `<tr class="sec-row-loading"><td colspan="9"><span class="sec-spinner-sm"></span> Loading ${report.moduleName}...</td></tr>`;
                }
                if (report.error) {
                  return `<tr class="sec-row-none"><td>${report.moduleName}</td><td>${report.version}</td><td colspan="7" style="color:#dc2626;font-size:12px;">❌ ${report.error}</td></tr>`;
                }
                if (!report.data) {
                  return `<tr class="sec-row-none"><td>${report.moduleName}</td><td>${report.version}</td><td colspan="7" style="color:#94a3b8;">No report</td></tr>`;
                }
                const s = report.data.summary;
                return `
                  <tr class="${getRowClass(report)}" data-idx="${idx}">
                    <td>${report.moduleName}</td>
                    <td>${report.version}</td>
                    <td><span class="sec-status-badge sec-status-${s.status}">${s.status}</span></td>
                    <td><span class="sec-grade-badge sec-grade-${s.riskScore.grade}">${s.riskScore.grade}</span> <span style="font-size:11px;color:#64748b;">${s.riskScore.score}/100</span></td>
                    <td style="font-weight:700;">${s.totalFindings}</td>
                    <td><span class="sec-severity-badge sec-severity-High">${s.severityCounts.High}</span></td>
                    <td><span class="sec-severity-badge sec-severity-Medium">${s.severityCounts.Medium}</span></td>
                    <td><span class="sec-severity-badge sec-severity-Low">${s.severityCounts.Low}</span></td>
                    <td>${report.reportUrl === 'mock' ? '<span class="sec-badge-mock">Mock</span>' : '<span class="sec-badge-live">Live</span>'}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `}

      <div id="sec-modal-root"></div>
    `;

    attachEventListeners(filtered);
    if (selectedModule) renderModal();
  };

  // ── Render Modal (uses native <details> for expand - no JS re-render) ──
  const renderModal = () => {
    try {
    if (!selectedModule || !selectedModule.data) return;
    const report = selectedModule;
    const s = report.data!.summary;
    const meta = report.data!.reportMetadata;
    const categories = report.data!.categoryBreakdown || [];
    const owaspMap = report.data!.owaspMapping || [];
    const allFindings = report.data!.findings || [];
    const maxOwasp = Math.max(...owaspMap.map(o => o.count), 1);

    const owaspColors = ['#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', '#0d9488'];

    const modalHtml = `
      <div class="sec-modal-overlay" id="secModalOverlay" onclick="if(event.target===this)this.style.display='none'">
        <div class="sec-modal-content" onclick="event.stopPropagation()">
          <div class="sec-modal-header">
            <div>
              <h2>🛡️ ${report.moduleName}</h2>
              <p>v${report.version} | ${meta.scanner} | ${meta.scanType} | ${meta.scanDuration} | ${new Date(meta.generatedAt).toLocaleDateString()}</p>
            </div>
            <button type="button" class="sec-modal-close" onclick="document.getElementById('secModalOverlay').style.display='none'">✕</button>
          </div>

          <div class="sec-modal-summary">
            <div class="sec-modal-stat">
              <div class="sec-modal-stat-value" style="color:${getGradeColor(s.riskScore.grade)};">${s.riskScore.grade}</div>
              <div class="sec-modal-stat-label">Grade (${s.riskScore.score}/100)</div>
            </div>
            <div class="sec-modal-stat">
              <div class="sec-modal-stat-value" style="color:#334155;">${s.totalFindings}</div>
              <div class="sec-modal-stat-label">Total Findings</div>
            </div>
            <div class="sec-modal-stat">
              <div class="sec-modal-stat-value" style="color:#dc2626;">${s.severityCounts.High}</div>
              <div class="sec-modal-stat-label">High</div>
            </div>
            <div class="sec-modal-stat">
              <div class="sec-modal-stat-value" style="color:#d97706;">${s.severityCounts.Medium}</div>
              <div class="sec-modal-stat-label">Medium</div>
            </div>
            <div class="sec-modal-stat">
              <div class="sec-modal-stat-value" style="color:#0ea5e9;">${s.severityCounts.Low}</div>
              <div class="sec-modal-stat-label">Low</div>
            </div>
          </div>

          <div class="sec-modal-body">
            <h3 style="font-size:15px;font-weight:700;color:#1e293b;margin:0 0 12px 0;">📊 OWASP Top 10 Distribution</h3>
            <div style="margin-bottom:24px;">
              ${owaspMap.map((o, i) => `
                <div class="sec-owasp-bar">
                  <div class="sec-owasp-label">${o.category}</div>
                  <div class="sec-owasp-track">
                    <div class="sec-owasp-fill" style="width:${(o.count / maxOwasp) * 100}%;background:${owaspColors[i % owaspColors.length]};">${o.count > 2 ? o.count : ''}</div>
                  </div>
                  <div class="sec-owasp-count">${o.count}</div>
                </div>
              `).join('')}
            </div>

            <h3 style="font-size:15px;font-weight:700;color:#1e293b;margin:0 0 12px 0;">📁 Category Breakdown</h3>
            ${categories.map(cat => {
              return `
                <details class="sec-category-card">
                  <summary class="sec-category-header">
                    <div class="sec-category-header-left">
                      <span class="sec-category-icon">${getCategoryIcon(cat.category)}</span>
                      <span class="sec-category-name">${cat.category}</span>
                      <span class="sec-category-count">${cat.count}</span>
                    </div>
                    <span class="sec-category-chevron">▼</span>
                  </summary>
                  <div class="sec-category-findings">
                    ${cat.findings.map(f => {
                      const fullFinding = allFindings.find(ff => ff.ruleId === f.ruleId && ff.file.endsWith(f.file) && ff.line === f.line) || allFindings.find(ff => ff.ruleId === f.ruleId);
                      return `
                      <details class="sec-finding-item">
                        <summary class="sec-finding-row">
                          <span class="sec-finding-rule">${f.ruleId}</span>
                          <div>
                            <div class="sec-finding-title">${f.title}</div>
                            <div class="sec-finding-file">${f.file}:${f.line}</div>
                          </div>
                          <div class="sec-finding-meta">
                            <span class="sec-severity-badge sec-severity-${f.severity}">${f.severity}</span>
                            <span class="sec-finding-chevron">▼</span>
                          </div>
                        </summary>
                        ${fullFinding ? `
                          <div class="sec-finding-detail">
                            <div class="sec-finding-detail-tags">
                              <span class="sec-finding-detail-tag">${fullFinding.cwe || ''}</span>
                              <span class="sec-finding-detail-tag">${fullFinding.owasp || ''}</span>
                              <span class="sec-finding-detail-tag">Line ${fullFinding.line}</span>
                              ${fullFinding.lineRange ? `<span class="sec-finding-detail-tag">Range: ${fullFinding.lineRange.start}-${fullFinding.lineRange.end}</span>` : ''}
                            </div>
                            ${fullFinding.description ? `
                              <div class="sec-finding-detail-section">
                                <div class="sec-finding-detail-label">📝 Description</div>
                                <div class="sec-finding-detail-text">${fullFinding.description}</div>
                              </div>
                            ` : ''}
                            ${fullFinding.codeSnippet ? `
                              <div class="sec-finding-detail-section">
                                <div class="sec-finding-detail-label">💻 Code Snippet</div>
                                <div class="sec-finding-detail-code">${fullFinding.codeSnippet.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>
                              </div>
                            ` : ''}
                            ${fullFinding.matchedText ? `
                              <div class="sec-finding-detail-section">
                                <div class="sec-finding-detail-label">🎯 Matched Pattern</div>
                                <code style="background:#fef3c7;padding:4px 8px;border-radius:4px;font-size:12px;">${fullFinding.matchedText.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code>
                              </div>
                            ` : ''}
                            ${fullFinding.exploitability ? `
                              <div class="sec-finding-detail-section">
                                <div class="sec-finding-detail-label">⚡ Exploitability</div>
                                <div class="sec-finding-detail-risk">${fullFinding.exploitability}</div>
                              </div>
                            ` : ''}
                            ${fullFinding.remediation ? `
                              <div class="sec-finding-detail-section">
                                <div class="sec-finding-detail-label">✅ Remediation</div>
                                <div class="sec-finding-detail-remediation">${fullFinding.remediation}</div>
                              </div>
                            ` : ''}
                            ${fullFinding.complianceImpact ? `
                              <div class="sec-finding-detail-section">
                                <div class="sec-finding-detail-label">📋 Compliance Impact</div>
                                <div class="sec-finding-detail-compliance">${fullFinding.complianceImpact}</div>
                              </div>
                            ` : ''}
                          </div>
                        ` : ''}
                      </details>
                    `;
                    }).join('')}
                  </div>
                </details>
              `;
            }).join('')}

            <div style="margin-top: 20px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="margin:0;font-size:13px;color:#64748b;">
                📂 <strong>${meta.totalFilesScanned}</strong> files scanned in <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">${meta.sourceDirectory}</code>
                &nbsp;|&nbsp; Repository: <strong>${meta.repository}</strong>
                &nbsp;|&nbsp; Build: ${meta.buildNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Render into the container's modal-root (single innerHTML set, no re-renders needed after)
    const modalRoot = container.querySelector('#sec-modal-root') as HTMLElement;
    if (modalRoot) modalRoot.innerHTML = modalHtml;

    } catch (err) {
      console.error('renderModal error:', err);
    }
  };

  // ── Attach Event Listeners ──────────────────────────────────────
  const attachEventListeners = (filtered: SecurityModuleReport[]) => {
    const fetchButton = container.querySelector('#secFetchButton');
    const platformSelect = container.querySelector('#secPlatformSelect') as HTMLSelectElement;
    const environmentSelect = container.querySelector('#secEnvironmentSelect') as HTMLSelectElement;
    const appVersionInput = container.querySelector('#secAppVersionInput') as HTMLInputElement;
    const filterInput = container.querySelector('#secFilterInput') as HTMLInputElement;
    const showOnlyCheckbox = container.querySelector('#secShowOnlyCheckbox') as HTMLInputElement;

    if (platformSelect) platformSelect.addEventListener('change', (e) => { platform = (e.target as HTMLSelectElement).value as any; render(); });
    if (environmentSelect) environmentSelect.addEventListener('change', (e) => { environment = (e.target as HTMLSelectElement).value as any; render(); });
    if (appVersionInput) {
      appVersionInput.addEventListener('input', (e) => {
        const input = e.target as HTMLInputElement;
        const pos = input.selectionStart;
        appVersion = input.value;
        render();
        const restored = container.querySelector('#secAppVersionInput') as HTMLInputElement;
        if (restored) { restored.focus(); restored.setSelectionRange(pos, pos); }
      });
    }
    if (fetchButton) fetchButton.addEventListener('click', () => fetchVersionData());
    if (filterInput) {
      filterInput.addEventListener('input', (e) => {
        const input = e.target as HTMLInputElement;
        const pos = input.selectionStart;
        filterText = input.value;
        render();
        const restored = container.querySelector('#secFilterInput') as HTMLInputElement;
        if (restored) { restored.focus(); restored.setSelectionRange(pos, pos); }
      });
    }
    if (showOnlyCheckbox) showOnlyCheckbox.addEventListener('change', (e) => { showOnlyWithReports = (e.target as HTMLInputElement).checked; render(); });

    // Sort headers
    container.querySelector('#sec-sort-name')?.addEventListener('click', () => handleSortClick('name'));
    container.querySelector('#sec-sort-risk')?.addEventListener('click', () => handleSortClick('risk'));
    container.querySelector('#sec-sort-findings')?.addEventListener('click', () => handleSortClick('findings'));

    // Row clicks
    container.querySelectorAll('.sec-data-table tbody tr[data-idx]').forEach(row => {
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

export const SecurityVulnerabilityDashboard = () => SecurityDashboard();

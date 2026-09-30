
import { html } from 'lit-html';
import { Meta, StoryFn } from '@storybook/web-components';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

// Helper function to clean up empty lines from generated code
const cleanTemplate = (template: string): string => {
  return template
    .split('\n')
    .filter(line => line.trim() !== '')
    .join('\n');
};

// Component definitions with their default properties
const AVAILABLE_COMPONENTS = [
  {
    id: 'text-input',
    name: 'Text Input',
    tag: 'bfl-text-input',
    defaultProps: {
      name: 'textField',
      label: 'Text Field',
      placeholder: 'Enter text',
      isRequired: false,
      value: '',
      hasCustomError: false,
      customErrorMessage: '',
      allowAnyCharecter: false,
      isInfoPopup: false,
      maxLength: 250,
      variant: 'default',
      height: '44px',
      hint: '',
      disableCopyPaste: false,
      regex: '',
    },
    template: (props) => cleanTemplate(`<bfl-text-input
  name="${props.name}"
  label="${props.label}"
  placeholder="${props.placeholder}"
  ${props.value ? `value="${props.value}"` : ''}
  ${props.regex ? `regex="${props.regex}"` : ''}
  ${props.variant !== 'default' ? `variant="${props.variant}"` : ''}
  ${props.height !== '44px' ? `height="${props.height}"` : ''}
  ${props.hint ? `hint="${props.hint}"` : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}
  ${props.allowAnyCharecter ? '[allowAnyCharecter]="true"' : ''}
  ${props.isInfoPopup ? '[isInfoPopup]="true"' : ''}
  ${props.disableCopyPaste ? '[disableCopyPaste]="true"' : ''}
  ${props.maxLength !== 250 ? `[maxLength]="${props.maxLength}"` : ''}>
</bfl-text-input>`),
  },
  {
    id: 'email-input',
    name: 'Email Input',
    tag: 'bfl-email-input',
    defaultProps: {
      name: 'email',
      label: 'Email Address',
      placeholder: 'Enter email',
      isRequired: false,
      value: '',
      hasCustomError: false,
      customErrorMessage: '',
      isInfoPopup: false,
      hint: '',
      disableCopyPaste: false,
    },
    template: (props) => cleanTemplate(`<bfl-email-input
  name="${props.name}"
  label="${props.label}"
  placeholder="${props.placeholder}"
  ${props.value ? `value="${props.value}"` : ''}
  ${props.hint ? `hint="${props.hint}"` : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}
  ${props.isInfoPopup ? '[isInfoPopup]="true"' : ''}
  ${props.disableCopyPaste ? '[disableCopyPaste]="true"' : ''}>
</bfl-email-input>`),
  },
  {
    id: 'number-input',
    name: 'Number Input',
    tag: 'number-input',
    defaultProps: {
      name: 'phoneNumber',
      label: 'Phone Number',
      placeholder: 'Enter number',
      maxLength: 10,
      isRequired: false,
      value: '',
      hasCustomError: false,
      customErrorMessage: '',
      isInfoPopup: false,
      hint: '',
      disableCopyPaste: false,
    },
    template: (props) => cleanTemplate(`<number-input
  name="${props.name}"
  label="${props.label}"
  placeholder="${props.placeholder}"
  [maxLength]="${props.maxLength}"
  ${props.value ? `value="${props.value}"` : ''}
  ${props.hint ? `hint="${props.hint}"` : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}
  ${props.isInfoPopup ? '[isInfoPopup]="true"' : ''}
  ${props.disableCopyPaste ? '[disableCopyPaste]="true"' : ''}>
</number-input>`),
  },
  {
    id: 'dob-input',
    name: 'Date of Birth',
    tag: 'bfl-dob-input',
    defaultProps: {
      name: 'dob',
      label: 'Date of Birth',
      isRequired: false,
      value: '',
      hasCustomError: false,
      customErrorMessage: '',
      isInfoPopup: false,
      hint: '',
      minAge: 18,
      maxAge: 100,
    },
    template: (props) => cleanTemplate(`<bfl-dob-input
  name="${props.name}"
  label="${props.label}"
  ${props.value ? `value="${props.value}"` : ''}
  ${props.hint ? `hint="${props.hint}"` : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  [minAge]="${props.minAge}"
  [maxAge]="${props.maxAge}"
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}
  ${props.isInfoPopup ? '[isInfoPopup]="true"' : ''}>
</bfl-dob-input>`),
  },
  {
    id: 'dropdown-input',
    name: 'Dropdown',
    tag: 'bfl-dropdown-input',
    defaultProps: {
      name: 'dropdown',
      label: 'Qccupation',
      placeholder: 'Select Option',
      isRequired: false,
      options: [
        { id: 1, value: 'Student', showValue: 'Option 1' },
        { id: 2, value: 'Salaried', showValue: 'Option 2' },
        { id: 3, value: 'Self Employeed', showValue: 'Option 3' },
      ],
      value: '',
      hasCustomError: false,
      customErrorMessage: '',
      isInfoPopup: false,
      hint: '',
      isSearchable: false,
      isDisabled: false,
    },
    template: (props) => cleanTemplate(`<bfl-dropdown-input
  name="${props.name}"
  label="${props.label}"
  placeholder="${props.placeholder}"
  [options]='${JSON.stringify(props.options)}'
  ${props.value ? `value="${props.value}"` : ''}
  ${props.hint ? `hint="${props.hint}"` : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}
  ${props.isInfoPopup ? '[isInfoPopup]="true"' : ''}
  ${props.isSearchable ? '[isSearchable]="true"' : ''}
  ${props.isDisabled ? '[isDisabled]="true"' : ''}>
</bfl-dropdown-input>`),
  },
  {
    id: 'radio-input',
    name: 'Radio Group',
    tag: 'bfl-radio-input',
    defaultProps: {
      name: 'radioGroup',
      label: 'Select One',
      inputValues: ['Option 1', 'Option 2', 'Option 3'],
      isRequired: false,
      value: '',
      hasCustomError: false,
      customErrorMessage: '',
      isInfoPopup: false,
      hint: '',
      isDisabled: false,
    },
    template: (props) => cleanTemplate(`<bfl-radio-input
  name="${props.name}"
  label="${props.label}"
  [inputValues]='${JSON.stringify(props.inputValues)}'
  ${props.value ? `value="${props.value}"` : ''}
  ${props.hint ? `hint="${props.hint}"` : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}
  ${props.isInfoPopup ? '[isInfoPopup]="true"' : ''}
  ${props.isDisabled ? '[isDisabled]="true"' : ''}>
</bfl-radio-input>`),
  },
  {
    id: 'ammount-input',
    name: 'Amount Input',
    tag: 'bfl-ammount-input',
    defaultProps: {
      name: 'amount',
      label: 'Amount',
      placeholder: 'Enter amount',
      showRupeeSymbol: true,
      isRequired: false,
      value: '',
      hasCustomError: false,
      customErrorMessage: '',
      isInfoPopup: false,
      hint: '',
      disableCopyPaste: false,
    },
    template: (props) => cleanTemplate(`<bfl-ammount-input
  name="${props.name}"
  label="${props.label}"
  placeholder="${props.placeholder}"
  ${props.value ? `value="${props.value}"` : ''}
  ${props.hint ? `hint="${props.hint}"` : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  ${props.showRupeeSymbol ? '[showRupeeSymbol]="true"' : ''}
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}
  ${props.isInfoPopup ? '[isInfoPopup]="true"' : ''}
  ${props.disableCopyPaste ? '[disableCopyPaste]="true"' : ''}>
</bfl-ammount-input>`),
  },
  {
    id: 'pincode-input',
    name: 'Pincode Input',
    tag: 'bfl-pincode-input',
    defaultProps: {
      name: 'pincode',
      label: 'PIN Code',
      placeholder: 'Enter 6-digit PIN',
      isRequired: false,
      value: '',
      hasCustomError: false,
      customErrorMessage: '',
      isInfoPopup: false,
      hint: '',
      disableCopyPaste: false,
    },
    template: (props) => cleanTemplate(`<bfl-pincode-input
  name="${props.name}"
  label="${props.label}"
  placeholder="${props.placeholder}"
  ${props.value ? `value="${props.value}"` : ''}
  ${props.hint ? `hint="${props.hint}"` : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}
  ${props.isInfoPopup ? '[isInfoPopup]="true"' : ''}
  ${props.disableCopyPaste ? '[disableCopyPaste]="true"' : ''}>
</bfl-pincode-input>`),
  },
  {
    id: 'textarea',
    name: 'Textarea',
    tag: 'bfl-text-input',
    defaultProps: {
      name: 'textarea',
      label: 'Comments',
      placeholder: 'Enter your comments',
      variant: 'textarea',
      isRequired: false,
      value: '',
      hasCustomError: false,
      customErrorMessage: '',
      allowAnyCharecter: false,
      isInfoPopup: false,
      maxLength: 500,
      height: '90px',
      hint: '',
      disableCopyPaste: false,
      regex: '',
      showCtaLink: false,
      ctaLinkDetails: {
        text: 'Change',
        color: 'var(--orange)',
        fontSize: 'var(--FontSize-12)',
        fontFamily: 'var(--font-rubik-medium)',
        fontWeight: 'var(--font-medium)'
      },
    },
    template: (props) => cleanTemplate(`<bfl-text-input
  name="${props.name}"
  label="${props.label}"
  placeholder="${props.placeholder}"
  variant="textarea"
  ${props.value ? `value="${props.value}"` : ''}
  ${props.regex ? `regex="${props.regex}"` : ''}
  ${props.height !== '90px' ? `height="${props.height}"` : ''}
  ${props.hint ? `hint="${props.hint}"` : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}
  ${props.allowAnyCharecter ? '[allowAnyCharecter]="true"' : ''}
  ${props.isInfoPopup ? '[isInfoPopup]="true"' : ''}
  ${props.showCtaLink ? '[showCtaLink]="true"' : ''}
  ${props.disableCopyPaste ? '[disableCopyPaste]="true"' : ''}
  ${props.maxLength !== 500 ? `[maxLength]="${props.maxLength}"` : ''}
  ${props.showCtaLink ? `[ctaLinkDetails]='${JSON.stringify(props.ctaLinkDetails)}'` : ''}>
</bfl-text-input>`),
  },
  {
    id: 'pan-input',
    name: 'PAN Input',
    tag: 'bfl-pan-input',
    defaultProps: {
      name: 'panNumber',
      label: 'PAN Number',
      placeholder: 'Enter PAN',
      isRequired: false,
      value: '',
      hasCustomError: false,
      customErrorMessage: '',
      isInfoPopup: false,
      hint: '',
      disableCopyPaste: false,
    },
    template: (props) => cleanTemplate(`<bfl-pan-input
  name="${props.name}"
  label="${props.label}"
  placeholder="${props.placeholder}"
  ${props.value ? `value="${props.value}"` : ''}
  ${props.hint ? `hint="${props.hint}"` : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}
  ${props.isInfoPopup ? '[isInfoPopup]="true"' : ''}
  ${props.disableCopyPaste ? '[disableCopyPaste]="true"' : ''}>
</bfl-pan-input>`),
  },
  {
    id: 'gstin-input',
    name: 'GSTIN Input',
    tag: 'bfl-gstin-input',
    defaultProps: {
      name: 'gstin',
      label: 'GSTIN',
      placeholder: 'Enter GSTIN',
      isRequired: false,
      value: '',
      hasCustomError: false,
      customErrorMessage: '',
      isInfoPopup: false,
      hint: '',
      disableCopyPaste: false,
    },
    template: (props) => cleanTemplate(`<bfl-gstin-input
  name="${props.name}"
  label="${props.label}"
  placeholder="${props.placeholder}"
  ${props.value ? `value="${props.value}"` : ''}
  ${props.hint ? `hint="${props.hint}"` : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}
  ${props.isInfoPopup ? '[isInfoPopup]="true"' : ''}
  ${props.disableCopyPaste ? '[disableCopyPaste]="true"' : ''}>
</bfl-gstin-input>`),
  },
  {
    id: 'branch-input',
    name: 'Branch Input',
    tag: 'bfl-branch-input',
    defaultProps: {
      name: 'branch',
      label: 'Branch',
      placeholder: 'Enter branch',
      isRequired: false,
      value: '',
      hasCustomError: false,
      customErrorMessage: '',
      isInfoPopup: false,
      hint: '',
      options: [],
    },
    template: (props) => cleanTemplate(`<bfl-branch-input
  name="${props.name}"
  label="${props.label}"
  placeholder="${props.placeholder}"
  ${props.value ? `value="${props.value}"` : ''}
  ${props.hint ? `hint="${props.hint}"` : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  ${props.options.length > 0 ? `[options]='${JSON.stringify(props.options)}'` : ''}
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}
  ${props.isInfoPopup ? '[isInfoPopup]="true"' : ''}>
</bfl-branch-input>`),
  },
  {
    id: 'year-input',
    name: 'Year Input',
    tag: 'bfl-year-input',
    defaultProps: {
      name: 'year',
      label: 'Year',
      placeholder: 'Enter year',
      isRequired: false,
      value: '',
      hasCustomError: false,
      customErrorMessage: '',
      isInfoPopup: false,
      hint: '',
      minYear: 1900,
      maxYear: new Date().getFullYear(),
    },
    template: (props) => cleanTemplate(`<bfl-year-input
  name="${props.name}"
  label="${props.label}"
  placeholder="${props.placeholder}"
  ${props.value ? `value="${props.value}"` : ''}
  ${props.hint ? `hint="${props.hint}"` : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  [minYear]="${props.minYear}"
  [maxYear]="${props.maxYear}"
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}
  ${props.isInfoPopup ? '[isInfoPopup]="true"' : ''}>
</bfl-year-input>`),
  },
  {
    id: 'smart-search-input',
    name: 'Smart Search Input',
    tag: 'bfl-smart-search-input',
    defaultProps: {
      name: 'search',
      label: 'Search',
      placeholder: 'Type to search',
      isRequired: false,
      value: '',
      hasCustomError: false,
      customErrorMessage: '',
      isInfoPopup: false,
      hint: '',
      options: [],
      minCharacters: 3,
    },
    template: (props) => cleanTemplate(`<bfl-smart-search-input
  name="${props.name}"
  label="${props.label}"
  placeholder="${props.placeholder}"
  ${props.value ? `value="${props.value}"` : ''}
  ${props.hint ? `hint="${props.hint}"` : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  ${props.options.length > 0 ? `[options]='${JSON.stringify(props.options)}'` : ''}
  [minCharacters]="${props.minCharacters}"
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}
  ${props.isInfoPopup ? '[isInfoPopup]="true"' : ''}>
</bfl-smart-search-input>`),
  },
  {
    id: 'doc-upload-input',
    name: 'Document Upload Input',
    tag: 'bfl-doc-upload-input',
    defaultProps: {
      name: 'document',
      label: 'Upload Document',
      placeholder: 'Choose file',
      isRequired: false,
      hasCustomError: false,
      customErrorMessage: '',
      isInfoPopup: false,
      hint: '',
      acceptedFormats: '.pdf,.jpg,.jpeg,.png',
      maxFileSize: 5242880,
    },
    template: (props) => cleanTemplate(`<bfl-doc-upload-input
  name="${props.name}"
  label="${props.label}"
  placeholder="${props.placeholder}"
  ${props.hint ? `hint="${props.hint}"` : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  acceptedFormats="${props.acceptedFormats}"
  [maxFileSize]="${props.maxFileSize}"
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}
  ${props.isInfoPopup ? '[isInfoPopup]="true"' : ''}>
</bfl-doc-upload-input>`),
  },
  {
    id: 'otp-verification',
    name: 'OTP Verification',
    tag: 'bfl-otp-varification',
    defaultProps: {
      name: 'otp',
      label: 'Enter OTP',
      placeholder: 'Enter OTP',
      isRequired: false,
      value: '',
      hasCustomError: false,
      customErrorMessage: '',
      otpLength: 6,
      timer: 60,
    },
    template: (props) => cleanTemplate(`<bfl-otp-varification
  name="${props.name}"
  label="${props.label}"
  placeholder="${props.placeholder}"
  ${props.value ? `value="${props.value}"` : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  [otpLength]="${props.otpLength}"
  [timer]="${props.timer}"
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}>
</bfl-otp-varification>`),
  },
  {
    id: 'radiochip-input',
    name: 'Radio Chip Input',
    tag: 'bfl-radiochip-input',
    defaultProps: {
      name: 'radioChip',
      label: 'Select Option',
      inputList: [
        { value: '12', isdisabled: false },
        { value: '18', isdisabled: false },
        { value: '24', isdisabled: false },
      ],
      showLabel: true,
      customLabel: null,
      value: '',
      isRequired: false,
      hasCustomError: false,
      customErrorMessage: '',
      isInfoPopup: false,
      showError: false,
      layoutVariant: 'scroll',
      chipSize: 'auto',
      showanimation: false,
      showYelloAnimation: false,
      showGreyAnimation: false,
      isDisabled: false,
      fieldDisabled: false,
    },
    template: (props) => cleanTemplate(`<bfl-radiochip-input
  name="${props.name}"
  label="${props.label}"
  [inputList]='${JSON.stringify(props.inputList).replace(/'/g, "&apos;")}'
  ${props.value ? `value="${props.value}"` : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  layoutVariant="${props.layoutVariant}"
  chipSize="${props.chipSize}"
  ${!props.showLabel ? '[showLabel]="false"' : ''}
  ${props.customLabel && props.customLabel !== null ? `[customLabel]='${JSON.stringify(props.customLabel).replace(/'/g, "&apos;")}'` : ''}
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}
  ${props.isInfoPopup ? '[isInfoPopup]="true"' : ''}
  ${props.showError ? '[showError]="true"' : ''}
  ${props.showanimation ? '[showanimation]="true"' : ''}
  ${props.showYelloAnimation ? '[showYelloAnimation]="true"' : ''}
  ${props.showGreyAnimation ? '[showGreyAnimation]="true"' : ''}
  ${props.isDisabled ? '[isDisabled]="true"' : ''}
  ${props.fieldDisabled ? '[fieldDisabled]="true"' : ''}>
</bfl-radiochip-input>`),
  },
  {
    id: 'accordion-input',
    name: 'Accordion Input',
    tag: 'bfl-accordion-input',
    defaultProps: {
      name: 'accordion',
      label: 'Accordion',
      placeholder: 'Select',
      isRequired: false,
      value: '',
      hasCustomError: false,
      customErrorMessage: '',
      isInfoPopup: false,
      hint: '',
      options: [],
      isExpanded: false,
    },
    template: (props) => cleanTemplate(`<bfl-accordion-input
  name="${props.name}"
  label="${props.label}"
  placeholder="${props.placeholder}"
  ${props.value ? `value="${props.value}"` : ''}
  ${props.hint ? `hint="${props.hint}"` : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  ${props.options.length > 0 ? `[options]='${JSON.stringify(props.options)}'` : ''}
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}
  ${props.isInfoPopup ? '[isInfoPopup]="true"' : ''}
  ${props.isExpanded ? '[isExpanded]="true"' : ''}>
</bfl-accordion-input>`),
  },
  {
    id: 'tnc-checkbox',
    name: 'Terms & Conditions Checkbox',
    tag: 'bfl-tnc-checkbox',
    defaultProps: {
      name: 'termsAccepted',
      label: 'I accept the terms and conditions',
      isRequired: false,
      value: false,
      hasCustomError: false,
      customErrorMessage: '',
      isDisabled: false,
    },
    template: (props) => cleanTemplate(`<bfl-tnc-checkbox
  name="${props.name}"
  ${props.value ? '[value]="true"' : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}
  ${props.isDisabled ? '[isDisabled]="true"' : ''}>
  <span slot="label">${props.label}</span>
</bfl-tnc-checkbox>`),
  },
  {
    id: 'tracker-input',
    name: 'Tracker Input',
    tag: 'bfl-tracker-input',
    defaultProps: {
      name: 'tracker',
      steps: [
        { name: 'Step 1', state: 'completed' },
        { name: 'Step 2', state: 'in-progress' },
        { name: 'Step 3', state: 'pending' },
      ],
      currentStep: 2,
      orientation: 'horizontal',
    },
    template: (props) => cleanTemplate(`<bfl-tracker-input
  name="${props.name}"
  [steps]='${JSON.stringify(props.steps)}'
  [currentStep]="${props.currentStep}"
  orientation="${props.orientation}">
</bfl-tracker-input>`),
  },
  {
    id: 'date-range',
    name: 'Date Range',
    tag: 'bfl-date-range',
    defaultProps: {
      name: 'dateRange',
      label: 'Date Range',
      placeholder: 'Select date range',
      isRequired: false,
      value: '',
      hasCustomError: false,
      customErrorMessage: '',
      isInfoPopup: false,
      hint: '',
      minDate: '',
      maxDate: '',
      disablePastDates: false,
      disableFutureDates: false,
    },
    template: (props) => cleanTemplate(`<bfl-date-range
  name="${props.name}"
  label="${props.label}"
  placeholder="${props.placeholder}"
  ${props.value ? `value="${props.value}"` : ''}
  ${props.hint ? `hint="${props.hint}"` : ''}
  ${props.customErrorMessage ? `customErrorMessage="${props.customErrorMessage}"` : ''}
  ${props.minDate ? `minDate="${props.minDate}"` : ''}
  ${props.maxDate ? `maxDate="${props.maxDate}"` : ''}
  ${props.isRequired ? '[isRequired]="true"' : ''}
  ${props.hasCustomError ? '[hasCustomError]="true"' : ''}
  ${props.isInfoPopup ? '[isInfoPopup]="true"' : ''}
  ${props.disablePastDates ? '[disablePastDates]="true"' : ''}
  ${props.disableFutureDates ? '[disableFutureDates]="true"' : ''}>
</bfl-date-range>`),
  },
  {
    id: 'app-header',
    name: 'App Header',
    tag: 'app-header',
    defaultProps: {
      headerTitle: 'Form Title',
      showBackButton: true,
      showCloseButton: false,
    },
    template: (props) => cleanTemplate(`<app-header
  headerTitle="${props.headerTitle}"
  ${props.showBackButton ? '[showBackButton]="true"' : ''}
  ${props.showCloseButton ? '[showCloseButton]="true"' : ''}>
</app-header>`),
  },
  {
    id: 'button-group',
    name: 'Button Group',
    tag: 'bfl-button-group',
    defaultProps: {
      primaryLabel: 'Submit',
      secondaryLabel: 'Cancel',
      showSecondary: true,
      primaryDisabled: false,
      secondaryDisabled: false,
      loading: false,
    },
    template: (props) => cleanTemplate(`<bfl-button-group
  primaryLabel="${props.primaryLabel}"
  ${props.secondaryLabel ? `secondaryLabel="${props.secondaryLabel}"` : ''}
  ${props.showSecondary ? '[showSecondary]="true"' : ''}
  ${props.primaryDisabled ? '[primaryDisabled]="true"' : ''}
  ${props.secondaryDisabled ? '[secondaryDisabled]="true"' : ''}
  ${props.loading ? '[loading]="true"' : ''}>
</bfl-button-group>`),
  },
];

export default {
  title: 'Templates/Form Builder',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const FormBuilderTemplate: StoryFn = () => {
  // Initialize state
  let formComponents = [];
  let selectedComponentIndex = null;
  let draggedComponent = null;
  let draggedFromPalette = false;
  let showCodeModal = false;
  let codeCopied = false;

  const generateFormCode = () => {
    const componentsCode = formComponents
      .map((comp) => {
        const component = AVAILABLE_COMPONENTS.find((c) => c.id === comp.id);
        return '    ' + component.template(comp.props);
      })
      .join('\n\n');

    return `<bfl-container-layout>
  <bfl-stack-layout gap="50px">
    <bfl-app-header
      title="Form Title"
      [showBackButton]="true"
      [showCloseIcon]="false">
    </bfl-app-header>

    <bfl-form-wrapper submitId="formSubmit" (formSubmitted)="onFormSubmit($event)">
      <bfl-stack-layout gap="16px">
${componentsCode}
      </bfl-stack-layout>

      <button-group button-count="1">
        <cta-button
          name="submit"
          type="gradient"
          submitId="formSubmit"
          [isSubmit]="true"
          label="Submit Form">
        </cta-button>
      </button-group>
    </bfl-form-wrapper>
  </bfl-stack-layout>
</bfl-container-layout>`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      codeCopied = true;
      renderApp();
      
      // Reset after 2 seconds
      setTimeout(() => {
        codeCopied = false;
        renderApp();
      }, 2000);
    });
  };

  const renderComponentPalette = () => {
    return AVAILABLE_COMPONENTS.map(
      (component) => html`
        <div
          class="palette-item"
          draggable="true"
          @dragstart="${(e) => {
            draggedComponent = component;
            draggedFromPalette = true;
            e.dataTransfer.effectAllowed = 'copy';
          }}"
        >
          ${component.name}
        </div>
      `
    );
  };

  const renderFormPreview = () => {
    if (formComponents.length === 0) {
      return html`
        <div class="empty-drop-zone">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="60" height="60" rx="8" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 4"/>
            <path d="M40 25V55M25 40H55" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
            <circle cx="40" cy="40" r="20" fill="#e2e8f0" opacity="0.3"/>
          </svg>
          <div class="empty-title">Add Components Here</div>
          <div class="empty-description">
            Drag components from the left panel to build your form
          </div>
        </div>
      `;
    }

    return html`
      <div class="form-components">
        ${formComponents.map(
          (comp, index) => html`
            <div
              class="form-component ${selectedComponentIndex === index ? 'selected' : ''}"
              draggable="true"
              @click="${() => {
                selectedComponentIndex = index;
                renderApp();
              }}"
              @dragstart="${(e) => {
                draggedComponent = comp;
                draggedFromPalette = false;
                e.dataTransfer.effectAllowed = 'move';
              }}"
              @dragover="${(e) => {
                e.preventDefault();
                e.currentTarget.classList.add('drag-over');
              }}"
              @dragleave="${(e) => {
                e.currentTarget.classList.remove('drag-over');
              }}"
              @drop="${(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('drag-over');

                if (draggedFromPalette) {
                  // Insert new component at this position
                  const newComponent = {
                    id: draggedComponent.id,
                    props: { ...draggedComponent.defaultProps },
                    uniqueId: Date.now(),
                  };
                  formComponents.splice(index, 0, newComponent);
                } else {
                  // Reorder existing components
                  const draggedIndex = formComponents.findIndex((c) => c === draggedComponent);
                  formComponents.splice(draggedIndex, 1);
                  formComponents.splice(index, 0, draggedComponent);
                }

                renderApp();
              }}"
            >
              <div class="component-header">
                <div class="component-title">
                  <span class="drag-handle">⋮⋮</span>
                  <span>${AVAILABLE_COMPONENTS.find((c) => c.id === comp.id)?.name}</span>
                </div>
                <button
                  class="delete-btn"
                  @click="${(e) => {
                    e.stopPropagation();
                    formComponents.splice(index, 1);
                    selectedComponentIndex = null;
                    renderApp();
                  }}"
                >
                  ×
                </button>
              </div>
              <div class="component-preview">${unsafeHTML(renderComponentHTML(comp))}</div>
            </div>
          `
        )}
      </div>
    `;
  };

  const renderComponentHTML = (comp) => {
    const component = AVAILABLE_COMPONENTS.find((c) => c.id === comp.id);
    return component.template(comp.props);
  };

  const renderPropertyEditor = () => {
    if (selectedComponentIndex === null) {
      return html`
        <div class="no-selection">
          <p>Select a component to edit its properties</p>
        </div>
      `;
    }

    const comp = formComponents[selectedComponentIndex];
    const componentDef = AVAILABLE_COMPONENTS.find((c) => c.id === comp.id);

    return html`
      <div class="property-editor">
        <h4>${componentDef.name}</h4>
        ${Object.keys(comp.props).map((propKey) => {
          const value = comp.props[propKey];

          if (typeof value === 'boolean') {
            return html`
              <label class="prop-label">
                <span class="prop-name">${propKey}</span>
                <input
                  type="checkbox"
                  .checked="${value}"
                  @change="${(e) => {
                    comp.props[propKey] = e.target.checked;
                    renderApp();
                  }}"
                />
              </label>
            `;
          } else if (Array.isArray(value) || propKey === 'options' || propKey === 'inputValues' || propKey === 'inputList' || propKey === 'steps') {
            return html`
              <label class="prop-label">
                <span class="prop-name">${propKey}</span>
                <textarea
                  class="prop-input"
                  rows="6"
                  .value="${JSON.stringify(value, null, 2)}"
                  @input="${(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      comp.props[propKey] = parsed;
                      renderApp();
                    } catch (err) {
                      // Invalid JSON, don't update
                      console.warn('Invalid JSON for ' + propKey, err);
                    }
                  }}"
                ></textarea>
              </label>
            `;
          } else if (typeof value === 'object' && value !== null || propKey === 'ctaLinkDetails' || propKey === 'customLabel') {
            return html`
              <label class="prop-label">
                <span class="prop-name">${propKey}</span>
                <textarea
                  class="prop-input"
                  rows="6"
                  .value="${JSON.stringify(value, null, 2)}"
                  @input="${(e) => {
                    try {
                      comp.props[propKey] = JSON.parse(e.target.value);
                      renderApp();
                    } catch (err) {
                      // Invalid JSON, don't update
                    }
                  }}"
                ></textarea>
              </label>
            `;
          } else if (typeof value === 'number') {
            return html`
              <label class="prop-label">
                <span class="prop-name">${propKey}</span>
                <input
                  type="number"
                  class="prop-input"
                  .value="${value}"
                  @input="${(e) => {
                    comp.props[propKey] = parseInt(e.target.value) || 0;
                    renderApp();
                  }}"
                />
              </label>
            `;
          } else {
            return html`
              <label class="prop-label">
                <span class="prop-name">${propKey}</span>
                <input
                  type="text"
                  class="prop-input"
                  .value="${value}"
                  @input="${(e) => {
                    comp.props[propKey] = e.target.value;
                    renderApp();
                  }}"
                />
              </label>
            `;
          }
        })}
      </div>
    `;
  };

  const renderApp = () => {
    const container = document.getElementById('form-builder-root');
    if (!container) return;

    const template = html`
      <style>
        .form-builder-container {
          display: flex;
          height: 100vh;
          font-family: system-ui, -apple-system, sans-serif;
          background: #f5f5f5;
        }

        /* Left Panel - Component Palette */
        .palette-panel {
          width: 150px;
          background: white;
          border-right: 1px solid #e0e0e0;
          padding: 20px;
          overflow-y: auto;
        }

        .palette-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #333;
        }

        .palette-item {
          padding: 10px 12px;
          margin-bottom: 6px;
          background: #f9f9f9;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          cursor: grab;
          transition: all 0.2s;
          font-size: 14px;
          color: #333;
        }

        .palette-item:hover {
          background: #f0f0f0;
          border-color: #0066cc;
        }

        .palette-item:active {
          cursor: grabbing;
        }

        /* Center Panel - Form Preview */
        .preview-panel {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background: #f5f5f5;
        }

        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding: 16px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .preview-title {
          font-size: 20px;
          font-weight: 600;
          color: #333;
        }

        .show-code-btn {
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.05);
          color: #333;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .show-code-btn:hover {
          background: rgba(0, 0, 0, 0.1);
          border-color: rgba(0, 0, 0, 0.2);
        }

        .code-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .code-modal-content {
          background: white;
          border-radius: 8px;
          padding: 24px;
          max-width: 800px;
          max-height: 80vh;
          overflow: auto;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .code-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .code-modal-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }

        .code-modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }

        .code-modal-close:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .code-block {
          background: #f5f5f5;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          padding: 16px;
          overflow-x: auto;
          position: relative;
        }

        .code-block pre {
          margin: 0;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 13px;
          line-height: 1.5;
          color: #333;
        }

        .copy-code-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          padding: 6px 12px;
          background: white;
          color: #333;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .copy-code-btn:hover {
          background: #f5f5f5;
        }

        .copy-code-btn.copied {
          background: #000;
          color: white;
          border: 1px solid #0066cc;
        }

        .form-preview {
          background: white;
          border-radius: 8px;
          padding: 20px;
          min-height: 700px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .empty-drop-zone {
          border: 2px dashed #94a3b8;
          border-radius: 12px;
          padding: 80px 40px;
          text-align: center;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          min-height: 550px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 16px;
          transition: all 0.3s ease;
        }

        .empty-drop-zone.drag-over {
          border-color: #0066cc;
          background: linear-gradient(135deg, #e6f2ff 0%, #cce5ff 100%);
        }

        .empty-title {
          font-size: 18px;
          font-weight: 600;
          color: #475569;
          margin-top: 8px;
        }

        .empty-description {
          font-size: 14px;
          color: #64748b;
          max-width: 400px;
        }

        .form-components {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-component {
          padding: 8px;
          background: #fafafa;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .form-component:hover {
          border-color: #0066cc;
        }

        .form-component.selected {
          border-color: #0066cc;
          background: #f0f7ff;
        }

        .form-component.drag-over {
          border-color: #00cc66;
          background: #f0fff7;
        }

        .component-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .component-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
          color: #333;
        }

        .drag-handle {
          cursor: grab;
          color: #999;
          font-size: 16px;
        }

        .delete-btn {
          width: 24px;
          height: 24px;
          border: none;
          background: #ff4444;
          color: white;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          line-height: 1;
          transition: transform 0.2s;
        }

        .delete-btn:hover {
          transform: scale(1.1);
          background: #cc0000;
        }

        .component-preview {
          padding: 12px;
          background: white;
          border-radius: 4px;
          font-family: monospace;
          font-size: 12px;
          color: #666;
          overflow-x: auto;
          white-space: pre-wrap;
        }

        /* Right Panel - Properties */
        .properties-panel {
          width: 300px;
          background: white;
          border-left: 1px solid #e0e0e0;
          padding: 20px;
          overflow-y: auto;
        }

        .properties-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #333;
        }

        .no-selection {
          text-align: center;
          color: #999;
          padding: 40px 20px;
        }

        .property-editor h4 {
          margin: 0 0 16px 0;
          padding-bottom: 12px;
          border-bottom: 1px solid #e0e0e0;
          color: #333;
        }

        .prop-label {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
          font-size: 13px;
          color: #555;
        }

        .prop-name {
          font-weight: 600;
          margin-bottom: 6px;
          color: #333;
          display: block;
        }

        .prop-input {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 13px;
          font-family: inherit;
          width: 100%;
        }

        .prop-input:focus {
          outline: none;
          border-color: #0066cc;
          box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
        }

        .prop-label input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        textarea.prop-input {
          resize: vertical;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 12px;
        }

        /* Drop Zone */
        .drop-zone {
          border: 2px dashed #ddd;
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          color: #999;
          margin-top: 16px;
        }

        .drop-zone.drag-over {
          border-color: #0066cc;
          background: #f0f7ff;
        }

        @media (max-width: 1024px) {
          .properties-panel {
            display: none;
          }
        }
      </style>

      <div class="form-builder-container">
        <!-- Left Panel: Component Palette -->
        <div class="palette-panel">
          <h3 class="palette-title">Components</h3>
          ${renderComponentPalette()}
        </div>

        <!-- Center Panel: Form Preview -->
        <div class="preview-panel">
          <div class="preview-header">
            <h2 class="preview-title">Form Builder</h2>
            <button
              class="show-code-btn"
              @click="${() => {
                showCodeModal = true;
                renderApp();
              }}"
            >
              <span>&lt;/&gt;</span>
              Show code
            </button>
          </div>

          ${showCodeModal ? html`
            <div class="code-modal" @click="${(e) => {
              if (e.target.classList.contains('code-modal')) {
                showCodeModal = false;
                renderApp();
              }
            }}">
              <div class="code-modal-content">
                <div class="code-modal-header">
                  <h3 class="code-modal-title">Generated Form Code</h3>
                  <button
                    class="code-modal-close"
                    @click="${() => {
                      showCodeModal = false;
                      renderApp();
                    }}"
                  >
                    ×
                  </button>
                </div>
                <div class="code-block">
                  <button
                    class="copy-code-btn ${codeCopied ? 'copied' : ''}"
                    @click="${() => copyToClipboard(generateFormCode())}"
                  >
                    ${codeCopied ? 'Copied' : 'Copy'}
                  </button>
                  <pre>${generateFormCode()}</pre>
                </div>
              </div>
            </div>
          ` : ''}

          <div
            class="form-preview"
            @dragover="${(e) => {
              e.preventDefault();
              if (formComponents.length === 0) {
                e.currentTarget.querySelector('.empty-drop-zone')?.classList.add('drag-over');
              }
            }}"
            @dragleave="${(e) => {
              if (formComponents.length === 0) {
                e.currentTarget.querySelector('.empty-drop-zone')?.classList.remove('drag-over');
              }
            }}"
            @drop="${(e) => {
              e.preventDefault();
              if (formComponents.length === 0) {
                e.currentTarget.querySelector('.empty-drop-zone')?.classList.remove('drag-over');
              }
              if (draggedFromPalette) {
                const newComponent = {
                  id: draggedComponent.id,
                  props: { ...draggedComponent.defaultProps },
                  uniqueId: Date.now(),
                };
                formComponents.push(newComponent);
                renderApp();
              }
            }}"
          >
            ${renderFormPreview()}
          </div>
        </div>

        <!-- Right Panel: Properties Editor -->
        <div class="properties-panel">
          <h3 class="properties-title">Properties</h3>
          ${renderPropertyEditor()}
        </div>
      </div>
    `;

    // Render using lit-html
    import('lit-html').then(({ render }) => {
      render(template, container);
    });
  };

  // Initial render
  setTimeout(() => {
    renderApp();
  }, 0);

  return html`<div id="form-builder-root"></div>`;
};

export const InteractiveFormBuilder = FormBuilderTemplate.bind({});
InteractiveFormBuilder.storyName = 'Interactive Form Builder';

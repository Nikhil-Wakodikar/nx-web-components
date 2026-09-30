import { html } from 'lit-html';
import { Meta, StoryFn } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { getBinding } from '../storybook-helpers';

export default {
  title: 'Templates/Form Template',
  argTypes: {
    formTitle: {
      control: 'text',
      description: 'Title displayed in the form header',
      defaultValue: 'Application Form',
    },
    showBackButton: {
      control: 'boolean',
      description: 'Show back button in header',
      defaultValue: true,
    },
    showCloseIcon: {
      control: 'boolean',
      description: 'Show close icon in header',
      defaultValue: false,
    },
    stackGap: {
      control: 'text',
      description: 'Gap between form fields',
      defaultValue: '16px',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
This comprehensive form template demonstrates all available input components from the stencil-library in a single scrollable form.

## Features
- **All Form Components** - Text, Email, Number, Date, Dropdown, Radio, Checkbox, etc.
- **Single Page View** - All components visible without nested structures
- **Form Validation** - Uses \`bfl-form-wrapper\` for centralized validation
- **Copy-able Code** - Click "Show code" to copy implementation
- **Interactive Controls** - Customize the form in real-time

## Components Included
- \`bfl-container-layout\` - Main container wrapper with custom styling support
- \`bfl-stack-layout\` - Vertical layout with spacing
- \`bfl-app-header\` - Header with navigation and back/close buttons
- \`bfl-form-wrapper\` - Form validation and submission container
- \`bfl-text-input\` - Text and textarea inputs with validation
- \`bfl-email-input\` - Email input with format validation
- \`number-input\` - Number input with maxLength control
- \`bfl-dob-input\` - Date of birth picker with DD/MM/YYYY format
- \`bfl-dropdown-input\` - Dropdown selection with custom options
- \`bfl-pincode-input\` - 6-digit PIN code input
- \`bfl-radio-input\` - Radio button groups
- \`bfl-ammount-input\` - Currency/amount input with rupee symbol
- \`bfl-checkbox-input\` - Checkboxes with custom slot content
- \`bfl-tracker-input\` - Multi-step progress tracker
- \`bfl-button-group\` - Button layout container (tag: \`button-group\`)
- \`bfl-cta-button\` - Call-to-action buttons (tag: \`cta-button\`)

## Events Emitted
- \`formSubmitted\` - Form wrapper emits validated form data
- \`inputChanged\` - All inputs emit on value change
- \`focusIn\` / \`focusOut\` - Input focus events
- \`backButtonClicked\` / \`closeButtonClicked\` - Header navigation events
- \`buttonClick\` - CTA button click events

`,
      },
      source: {
        transform: (_code, storyContext) => {
          const { args } = storyContext;
          return `<bfl-container-layout>
  <bfl-stack-layout gap="50px">
    <bfl-app-header
      ${getBinding('title', args.formTitle)}
      ${getBinding('showBackButton', args.showBackButton)}
      ${getBinding('showCloseIcon', args.showCloseIcon)}>
    </bfl-app-header>

    <bfl-form-wrapper submitId="formSubmit" (formSubmitted)="onFormSubmit($event)">
      <bfl-stack-layout ${getBinding('gap', args.stackGap)}>
    <!-- Personal Information -->
    <bfl-text-input
      name="fullName"
      label="Full Name"
      placeholder="Enter your full name"
      [isRequired]="true">
    </bfl-text-input>

    <bfl-email-input
      name="email"
      label="Email Address"
      placeholder="Enter your email"
      [isRequired]="true">
    </bfl-email-input>

    <number-input
      name="phoneNumber"
      label="Phone Number"
      placeholder="Enter 10 digit number"
      [isRequired]="true"
      [maxLength]="10">
    </number-input>

    <bfl-dob-input
      name="dob"
      label="Date of Birth"
      placeholder="DD/MM/YYYY"
      [isRequired]="true">
    </bfl-dob-input>

    <!-- Contact & Address -->
    <bfl-pincode-input
      name="pincode"
      label="Pincode"
      placeholder="Enter 6-digit pincode"
      [isRequired]="true">
    </bfl-pincode-input>

    <bfl-text-input
      name="address"
      label="Address"
      placeholder="Enter your address"
      [isRequired]="true"
      variant="textarea"
      height="100px">
    </bfl-text-input>

    <bfl-text-input
      name="city"
      label="City"
      placeholder="Enter your city"
      [isRequired]="true">
    </bfl-text-input>

    <!-- Employment & Income -->
    <bfl-dropdown-input
      name="occupation"
      label="Occupation"
      drop-down-label="Select Occupation"
      drop-down-placeholder="Choose occupation"
      [options]="occupationOptions"
      [isRequired]="true">
    </bfl-dropdown-input>

    <bfl-text-input
      name="companyName"
      label="Company Name"
      placeholder="Enter company name"
      [isRequired]="true">
    </bfl-text-input>

    <bfl-ammount-input
      name="monthlyIncome"
      label="Monthly Income"
      placeholder="Enter monthly income"
      .showRupeeSymbol=${true}
      .isRequired=${true}>
    </bfl-ammount-input>

    <bfl-ammount-input
      name="loanAmount"
      variant="loan"
      label="Loan Amount Required"
      placeholder="Enter desired loan amount"
      showRupeeSymbol="true"
      [isRequired]="true">
    </bfl-ammount-input>

    <!-- Personal Details -->
    <bfl-dropdown-input
      name="gender"
      label="Gender"
      drop-down-label="Select Gender"
      [options]="genderOptions"
      [isRequired]="true">
    </bfl-dropdown-input>

    <bfl-radio-input
      name="maritalStatus"
      label="Marital Status"
      [inputValues]="['Single', 'Married', 'Divorced']"
      [isRequired]="true">
    </bfl-radio-input>

    <!-- Terms and Submit -->
    <bfl-checkbox-input
      name="terms"
      [isRequired]="true">
      <p>I agree to the <a href="#">terms and conditions</a></p>
    </bfl-checkbox-input>

    <bfl-button-group [button-count]="2">
      <bfl-cta-button
        name="saveDraft"
        label="Save Draft"
        type="outlined"
        [isSubmit]="false">
      </bfl-cta-button>
      
      <bfl-cta-button
        name="submit"
        label="Submit Application"
        type="gradient"
        [isSubmit]="true"
        submitId="formSubmit">
      </bfl-cta-button>
    </bfl-button-group>
    </bfl-stack-layout>
  </bfl-form-wrapper>
  </bfl-stack-layout>
</bfl-container-layout>`;
        },
      },
    },
  },
} as Meta;

const Template: StoryFn = (args) => {
  const {
    formTitle,
    showBackButton,
    showCloseIcon,
    stackGap,
  } = args;

  // Sample dropdown options
  const genderOptions = [
    { id: 1, value: 'male', showValue: 'Male' },
    { id: 2, value: 'female', showValue: 'Female' },
    { id: 3, value: 'other', showValue: 'Other' },
  ];

  const occupationOptions = [
    { id: 1, value: 'salaried', showValue: 'Salaried' },
    { id: 2, value: 'self-employed', showValue: 'Self Employed' },
    { id: 3, value: 'business', showValue: 'Business Owner' },
    { id: 4, value: 'professional', showValue: 'Professional' },
    { id: 5, value: 'other', showValue: 'Other' },
  ];

  return html`
    <bfl-container-layout>
      <bfl-stack-layout gap="50px">
      <bfl-app-header 
        .title=${formTitle}
        .showBackButton=${showBackButton}
        .showCloseIcon=${showCloseIcon}
        @backButtonClicked=${action('backButtonClicked')}
        @closeButtonClicked=${action('closeButtonClicked')}
      ></bfl-app-header>
    
    <bfl-form-wrapper
      submitId="mainFormSubmit"
      @formSubmitted=${(e: CustomEvent) => {
        console.log('Form submitted:', e.detail);
        action('formSubmitted')(e.detail);
      }}
    >
       <bfl-stack-layout gap=${stackGap}> 
        <!-- Personal Information -->
        <bfl-text-input
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          .isRequired=${true}
          @inputChanged=${action('fullNameChanged')}
        ></bfl-text-input>

        <bfl-email-input
          name="email"
          label="Email Address"
          placeholder="Enter your email address"
          .isRequired=${true}
          @inputChanged=${action('emailChanged')}
        ></bfl-email-input>

        <number-input
          name="phoneNumber"
          label="Phone Number"
          placeholder="Enter your phone number"
          .isRequired=${true}
          .maxLength=${10}
          @inputChanged=${action('phoneChanged')}
        ></number-input>

        <bfl-dob-input
          name="dob"
          label="Date of Birth"
          placeholder="DD/MM/YYYY"
          .isRequired=${true}
          @inputChanged=${action('dobChanged')}
        ></bfl-dob-input>

        <!-- Contact & Address -->
        <bfl-pincode-input
          name="pincode"
          label="Pincode"
          placeholder="Enter your area pincode"
          .isRequired=${true}
          @inputChanged=${action('pincodeChanged')}
        ></bfl-pincode-input>

        <bfl-text-input
          name="address"
          label="Address"
          placeholder="Enter your complete address"
          .isRequired=${true}
          .variant=${'textarea'}
          .height=${'100px'}
          @inputChanged=${action('addressChanged')}
        ></bfl-text-input>

        <bfl-text-input
          name="city"
          label="City"
          placeholder="Enter your city"
          .isRequired=${true}
          @inputChanged=${action('cityChanged')}
        ></bfl-text-input>

        <!-- Employment & Income -->
        <bfl-dropdown-input
          name="occupation"
          label="Occupation"
          drop-down-label="Select Occupation"
          drop-down-placeholder="Select your occupation"
          .options=${occupationOptions}
          .isRequired=${true}
          @inputChanged=${action('occupationChanged')}
        ></bfl-dropdown-input>

        <bfl-text-input
          name="companyName"
          label="Company Name"
          placeholder="Enter company name"
          .isRequired=${true}
          @inputChanged=${action('companyNameChanged')}
        ></bfl-text-input>

        <bfl-ammount-input
          name="monthlyIncome"
          label="Monthly Income"
          placeholder="Enter monthly income"
          .showRupeeSymbol=${true}
          .isRequired=${true}
          @inputChanged=${action('incomeChanged')}
        ></bfl-ammount-input>

        <bfl-ammount-input
          name="loanAmount"
          variant="loan"
          label="Loan Amount Required"
          placeholder="Enter desired loan amount"
          .isRequired=${true}
          showRupeeSymbol=${true}
          @inputChanged=${action('loanAmountChanged')}
        ></bfl-ammount-input>

        <!-- Personal Details -->
        <bfl-dropdown-input
          name="gender"
          label="Gender"
          drop-down-label="Select Gender"
          drop-down-placeholder="Select your gender"
          .options=${genderOptions}
          .isRequired=${true}
          @inputChanged=${action('genderChanged')}
        ></bfl-dropdown-input>

        <bfl-radio-input
          name="maritalStatus"
          label="Marital Status"
          .inputValues=${['Single', 'Married', 'Divorced', 'Widowed']}
          .isRequired=${true}
          @inputChanged=${action('maritalStatusChanged')}
        ></bfl-radio-input>
        
        <!-- Terms and Conditions -->
        <bfl-checkbox-input
          name="tncCheckbox"
          .isRequired=${true}
          @inputChanged=${action('termsChanged')}
        >
          <p>I have read and agree to the <a href="#">Terms and Conditions</a></p>
        </bfl-checkbox-input>

        <!-- Action Buttons -->
        <bfl-button-group button-count="2">
          <bfl-cta-button 
            name="saveDraft" 
            type="outlined" 
            label="Save Draft" 
            isSubmit="false"
            @buttonClick=${action('saveDraftClicked')}
          ></bfl-cta-button>
          
          <bfl-cta-button 
            submitId="mainFormSubmit" 
            name="submit" 
            type="gradient"
            label="Submit Application"
            isSubmit="true"
            @buttonClick=${action('submitClicked')}
          ></bfl-cta-button>
        </bfl-button-group>
      </bfl-stack-layout>
    </bfl-form-wrapper>
    </bfl-stack-layout>
    </bfl-container-layout>
  `;
};

export const CompleteFormShowcase = Template.bind({});
CompleteFormShowcase.storyName = 'Complete Form - All Components';
CompleteFormShowcase.args = {
  formTitle: 'Loan Application Form',
  showBackButton: true,
  showCloseIcon: false,
  stackGap: '16px',
};
CompleteFormShowcase.parameters = {
  docs: {
    description: {
      story: 'A comprehensive loan application form showcasing all available form components including text inputs, email, phone number, date of birth, address fields, dropdowns, amount inputs, radio buttons, checkboxes, and action buttons.',
    },
  },
};

// Multi-Step Form Template with Tracker
const MultiStepFormTemplate: StoryFn = (args) => {
  const {
    formTitle = 'Empty Application Form',
    showBackButton = true,
    showCloseIcon = false,
    stackGap = '24px',
  } = args;

  // Sample steps for tracker
  const trackerSteps = [
    { name: 'Personal Details', state: 'completed' },
    { name: 'Address Info', state: 'in-progress' },
    { name: 'Verification', state: 'pending' },
    { name: 'Review', state: 'pending' },
  ];

  return html`
    <bfl-container-layout>
    <bfl-stack-layout gap="50px">
      <bfl-app-header
        .title=${formTitle}
        .showBackButton=${showBackButton}
        .showCloseIcon=${showCloseIcon}
        @backButtonClicked=${action('backButtonClicked')}
        @closeButtonClicked=${action('closeButtonClicked')}
      ></bfl-app-header>

      <bfl-stack-layout gap=${stackGap}>
        <!-- Horizontal Progress Tracker -->
        <bfl-tracker-input
          .steps=${trackerSteps}
        ></bfl-tracker-input>

        <!-- Drag and Drop Placeholder -->
        <div style="
          border: 2px dashed #94a3b8;
          border-radius: 12px;
          padding: 80px 40px;
          text-align: center;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          min-height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin: 20px 0;
          transition: all 0.3s ease;
          cursor: pointer;
        ">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="60" height="60" rx="8" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 4"/>
            <path d="M40 25V55M25 40H55" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
            <circle cx="40" cy="40" r="20" fill="#e2e8f0" opacity="0.3"/>
          </svg>
          <div style="
            font-size: 18px;
            font-weight: 600;
            color: #475569;
            margin-top: 8px;
          ">
            Add Components Here
          </div>
          <div style="
            font-size: 14px;
            color: #64748b;
            max-width: 400px;
          ">
            Add form fields like text-input, dropdown, radio buttons, or any other components to build your form
          </div>
        </div>

        <!-- Navigation Buttons -->
        <bfl-button-group button-count="2">
          <bfl-cta-button
            name="back"
            label="Previous"
            type="outlined"
            isSubmit="false"
            @buttonClick=${action('previousButtonClick')}
          ></bfl-cta-button>

          <bfl-cta-button
            name="next"
            label="Continue"
            type="gradient"
            isSubmit="false"
            @buttonClick=${action('continueButtonClick')}
          ></bfl-cta-button>
        </bfl-button-group>
      </bfl-stack-layout>
    </bfl-stack-layout>
    </bfl-container-layout>
  `;
};

export const EmptyFormTemplate = MultiStepFormTemplate.bind({});
EmptyFormTemplate.storyName = 'Multi-Step Form with Tracker';
EmptyFormTemplate.args = {
  formTitle: 'Empty Application Form',
  showBackButton: true,
  showCloseIcon: false,
  stackGap: '0px',
};
EmptyFormTemplate.parameters = {
  docs: {
    description: {
      story: 'A multi-step form template featuring horizontal progress tracking. The dotted box placeholder represents where step-specific content should be added. Ideal for wizards, onboarding flows, and multi-stage application processes.',
    },
    source: {
      code: `<bfl-container-layout>
  <bfl-stack-layout gap="50px">
    <bfl-app-header
      title="Empty Application Form"
      showBackButton="true"
      showCloseIcon="false">
    </bfl-app-header>

    <bfl-stack-layout gap="8px">
    <!-- Horizontal Progress Tracker -->
    <bfl-tracker-input
      [steps]="trackerSteps">
    </bfl-tracker-input>

    <!-- 
        Add your components here 
    -->

    <!-- Navigation Buttons -->
    <bfl-button-group button-count="2">
      <bfl-cta-button
        name="back"
        label="Previous"
        type="outlined"
        [isSubmit]="false">
      </bfl-cta-button>

      <bfl-cta-button
        name="next"
        label="Continue"
        type="gradient"
        [isSubmit]="false">
      </bfl-cta-button>
    </bfl-button-group>
  </bfl-stack-layout>
  </bfl-stack-layout>
</bfl-container-layout>`,
    },
  },
};

// Simple Registration Form (No Accordion)
const SimpleFormTemplate: StoryFn = (args) => {
  const {
    formTitle = 'Quick Registration',
    showBackButton = false,
    showCloseIcon = true,
    stackGap = '16px',
  } = args;

  return html`
    <bfl-container-layout>
    <bfl-stack-layout gap="50px">
      <bfl-app-header
        .title=${formTitle}
        .showBackButton=${showBackButton}
        .showCloseIcon=${showCloseIcon}
        @backButtonClicked=${action('backButtonClicked')}
        @closeButtonClicked=${action('closeButtonClicked')}
      ></bfl-app-header>
    

    <bfl-form-wrapper
      submitId="registrationSubmit"
      @formSubmitted=${(e: CustomEvent) => {
        console.log('Registration submitted:', e.detail);
        action('registrationSubmitted')(e.detail);
      }}
    >
        <bfl-stack-layout gap=${stackGap}>
        <bfl-text-input
          name="fullName"
          label="Full Name"
          placeholder="Enter your name"
          .isRequired=${true}
          @inputChanged=${action('nameChanged')}
        ></bfl-text-input>

        <bfl-email-input
          name="email"
          label="Email"
          placeholder="your.email@example.com"
          .isRequired=${true}
          @inputChanged=${action('emailChanged')}
        ></bfl-email-input>

        <number-input
          name="mobile"
          label="Mobile Number"
          placeholder="10-digit mobile number"
          .isRequired=${true}
          .maxLength=${10}
          @inputChanged=${action('mobileChanged')}
        ></number-input>

        <bfl-checkbox-input
          name="agree"
          .isRequired=${true}
          @inputChanged=${action('agreeChanged')}
        >
          <p>I agree to the <a href="#">terms and conditions</a></p>
        </bfl-checkbox-input>

        <bfl-button-group button-count="1">
          <bfl-cta-button
            label="Register Now"
            type="gradient"
            isSubmit="true"
            submitId="registrationSubmit"
            @buttonClick=${action('registerClicked')}
          ></bfl-cta-button>
        </bfl-button-group>
        </bfl-stack-layout>
    </bfl-form-wrapper>
      </bfl-stack-layout>
      </bfl-container-layout>
  `;
};

export const SimpleRegistrationForm = SimpleFormTemplate.bind({});
SimpleRegistrationForm.storyName = 'Simple Registration Form';
SimpleRegistrationForm.args = {
  formTitle: 'Quick Registration',
  showBackButton: false,
  showCloseIcon: true,
  stackGap: '16px',
};
SimpleRegistrationForm.parameters = {
  docs: {
    source: {
      code: `<bfl-container-layout>
  <bfl-stack-layout gap="50px">
    <bfl-app-header
      title="Quick Registration"
      showBackButton="false"
      showCloseIcon="true">
    </bfl-app-header>

    <bfl-form-wrapper submitId="registrationSubmit">
    <bfl-stack-layout gap="16px">
      <bfl-text-input
        name="fullName"
        label="Full Name"
        placeholder="Enter your name"
        [isRequired]="true">
      </bfl-text-input>

      <bfl-email-input
        name="email"
        label="Email"
        placeholder="your.email@example.com"
        [isRequired]="true">
      </bfl-email-input>

      <number-input
        name="mobile"
        label="Mobile Number"
        placeholder="10-digit mobile number"
        [isRequired]="true"
        [maxLength]="10">
      </number-input>

      <bfl-checkbox-input
        name="agree"
        [isRequired]="true">
        <p>I agree to the <a href="#">terms and conditions</a></p>
      </bfl-checkbox-input>

      <bfl-button-group button-count="1">
        <bfl-cta-button
          label="Register Now"
          type="gradient"
          isSubmit="true"
          submitId="registrationSubmit">
        </bfl-cta-button>
      </bfl-button-group>
    </bfl-stack-layout>
  </bfl-form-wrapper>
  </bfl-stack-layout>
</bfl-container-layout>`,
    },
  },
};

// Contact Form
const ContactFormTemplate: StoryFn = (args) => {
  const {
    formTitle = 'Contact Us',
    showBackButton = true,
    showCloseIcon = true,
    stackGap = '16px',
  } = args;

  return html`
    <bfl-container-layout>
    <bfl-stack-layout gap="50px">
      <bfl-app-header
        .title=${formTitle}
        .showCloseIcon=${showCloseIcon}
        .showBackButton=${showBackButton}
        @backButtonClicked=${action('backButtonClicked')}
        @closeButtonClicked=${action('closeButtonClicked')}
      ></bfl-app-header>

    <bfl-form-wrapper
      submitId="contactSubmit"
      @formSubmitted=${(e: CustomEvent) => {
        console.log('Contact form submitted:', e.detail);
        action('contactSubmitted')(e.detail);
      }}
    >
      <bfl-stack-layout gap=${stackGap}>
        <bfl-text-input
          name="name"
          label="Name"
          placeholder="Your name"
          .isRequired=${true}
          @inputChanged=${action('nameChanged')}
        ></bfl-text-input>

        <bfl-email-input
          name="email"
          label="Email Address"
          placeholder="your@email.com"
          .isRequired=${true}
          @inputChanged=${action('emailChanged')}
        ></bfl-email-input>

        <number-input
          name="phone"
          label="Phone Number (Optional)"
          placeholder="Contact number"
          .isRequired=${false}
          .maxLength=${10}
          @inputChanged=${action('phoneChanged')}
        ></number-input>

        <bfl-text-input
          name="subject"
          label="Subject"
          placeholder="What is this regarding?"
          .isRequired=${true}
          @inputChanged=${action('subjectChanged')}
        ></bfl-text-input>

        <bfl-text-input
          name="message"
          label="Message"
          placeholder="Tell us more..."
          .isRequired=${true}
          .variant=${'textarea'}
          .height=${'120px'}
          @inputChanged=${action('messageChanged')}
        ></bfl-text-input>

        <bfl-button-group button-count="1">
          <bfl-cta-button 
            name="Send Message" 
            type="gradient" 
            label="Send Message" 
            isSubmit="true" 
            submitId="contactSubmit"
            @buttonClick=${action('sendClicked')}
          ></bfl-cta-button>
        </bfl-button-group>
        </bfl-stack-layout>
    </bfl-form-wrapper>
      </bfl-stack-layout>
      </bfl-container-layout>
  `;
};

export const ContactForm = ContactFormTemplate.bind({});
ContactForm.storyName = 'Contact Form';
ContactForm.args = {
  formTitle: 'Contact Us',
  showBackButton: true,
  showCloseIcon: true,
  stackGap: '16px',
};
ContactForm.parameters = {
  docs: {
    source: {
      code: `<bfl-container-layout>
  <bfl-stack-layout gap="50px">
    <bfl-app-header
      title="Contact Us"
      showBackButton="true"
      showCloseIcon="true">
  </bfl-app-header>

  <bfl-form-wrapper submitId="contactSubmit">
    <bfl-stack-layout gap="16px">
      <bfl-text-input
        name="name"
        label="Name"
        placeholder="Your name"
        [isRequired]="true">
      </bfl-text-input>

      <bfl-email-input
        name="email"
        label="Email Address"
        placeholder="your@email.com"
        [isRequired]="true">
      </bfl-email-input>

      <number-input
        name="phone"
        label="Phone Number (Optional)"
        placeholder="Contact number"
        [isRequired]="false"
        [maxLength]="10">
      </number-input>

      <bfl-text-input
        name="subject"
        label="Subject"
        placeholder="What is this regarding?"
        [isRequired]="true">
      </bfl-text-input>

      <bfl-text-input
        name="message"
        label="Message"
        placeholder="Tell us more..."
        [isRequired]="true"
        variant="textarea"
        height="120px">
      </bfl-text-input>

      <bfl-button-group button-count="1">
        <bfl-cta-button 
          name="Send Message" 
          type="gradient" 
          label="Send Message" 
          isSubmit="true" 
          submitId="contactSubmit">
        </bfl-cta-button>
      </bfl-button-group>
    </bfl-stack-layout>
  </bfl-form-wrapper>
  </bfl-stack-layout>
</bfl-container-layout>`,
    },
  },
};

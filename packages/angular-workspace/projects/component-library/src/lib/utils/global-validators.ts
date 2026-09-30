import { AbstractControl, ValidatorFn } from '@angular/forms';

// Common invalid email domains that should be blocked
export const INVALID_EMAIL_DOMAINS = [
  'mailinator.com',
  '10minutemail.com',
  'tempmail.org',
  'guerrillamail.com',
  'temp-mail.org',
  'throwaway.email',
  'yopmail.com',
  'maildrop.cc',
  'fake.com',
  'example.com',
  'test.com'
];

export interface ErrorConfig {
  required?: {
    validationMessage: string;
  };
  minLength?: {
    validationMessage: string;
    minCharacters: number;
  };
  maxLength?: {
    validationMessage: string;
    maxCharacters: number;
  };
  pattern?: {
    validationMessage: string;
    pattern: string;
  };

  email?: {
    validationMessage: string;
    invalidDomainMessage?: string; // Optional separate message for invalid domains
    pattern?: string; // Optional custom email pattern
    invalidDomains?: string[]; // List of invalid domains to check against
  };

  termsAndConditions?: {
    validationMessage: string;
  };
  custom?: {
    validationFunction: (control: AbstractControl) => { [key: string]: any } | null;
  };
  panFormat?: {
    validationMessage: string;
    pattern?: string; // Optional regex pattern for PAN validation
  };
  gstinFormat?: {
    validationMessage: string;
    pattern?: string; // Optional regex pattern for GSTIN validation
  };
  pincodeFormat?: {
    validationMessage: string;
    pattern?: string; // Optional regex pattern for pincode validation
  };
  numericOnly?: {
    validationMessage: string;
    cleanValue?: boolean; // Remove non-numeric characters before validation
  };
  minValue?: {
    validationMessage: string;
    value: number;
    cleanValue?: boolean; // Remove non-numeric characters before validation
  };
  maxValue?: {
    validationMessage: string;
    value: number;
    cleanValue?: boolean; // Remove non-numeric characters before validation
  };
  noConsecutiveSpaces?: {
    validationMessage: string;
  };
  dateFormatValidation?: {
    validationMessage: string;
    format?: string; // e.g., 'dd/mm/yyyy'
  };
  futureDateValidation?: {
    validationMessage: string;
    format?: string; // e.g., 'dd/mm/yyyy'
  };
  ageRangeValidation?: {
    validationMessage: string;
    minAge: number;
    maxAge: number;
    format?: string; // e.g., 'dd/mm/yyyy'
  };
}

export function createUniversalValidator(errorConfig: ErrorConfig, errorKey: string = 'validationError'): ValidatorFn {
  const validatorFn: ValidatorFn = (control: AbstractControl) => {
    const value = control.value;

    // Check required validation
    if (errorConfig.required && (value === null || value === undefined || (typeof value === 'string' && value.trim().length === 0))) {
      return {
        [`${errorKey}-required`]: errorConfig.required.validationMessage,
      };
    }



    // Check minimum length
    if (errorConfig.minLength) {
      const minLength = errorConfig.minLength.minCharacters || 0;
      if (value.length < minLength) {
        return {
          [`${errorKey}-minLength`]: errorConfig.minLength.validationMessage.replace('{min}', minLength.toString()),
        };
      }
    }

    // Check maximum length
    if (errorConfig.maxLength) {
      const maxLength = errorConfig.maxLength.maxCharacters || 50;
      if (value.length > maxLength) {
        return {
          [`${errorKey}-maxLength`]: errorConfig.maxLength.validationMessage.replace('{max}', maxLength.toString()),
        };
      }
    }

    // Check pattern validation
    if (errorConfig.pattern && errorConfig.pattern.pattern) {
      const regex = new RegExp(errorConfig.pattern.pattern);
      if (!regex.test(value)) {
        return {
          [`${errorKey}-pattern`]: errorConfig.pattern.validationMessage,
        };
      }
    }

    // Check email validation
    if (errorConfig.email) {
      const emailValue = value.toString().trim().toLowerCase();

      // Use custom email pattern if provided, otherwise use default
      const emailPattern = errorConfig.email.pattern
        ? new RegExp(errorConfig.email.pattern)
        : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

      if (!emailPattern.test(emailValue)) {
        return {
          [`${errorKey}-email`]: errorConfig.email.validationMessage,
        };
      }

      // Check for invalid domains if provided
      if (errorConfig.email.invalidDomains && errorConfig.email.invalidDomains.length > 0) {
        const emailSplit = emailValue.split('@');
        const domain = emailSplit.length > 1 ? emailSplit[1] : '';

        if (domain && errorConfig.email.invalidDomains.includes(domain)) {
          const domainMessage = errorConfig.email.invalidDomainMessage || errorConfig.email.validationMessage;
          return {
            [`${errorKey}-emailDomain`]: domainMessage,
          };
        }
      }
    }

    // Check no consecutive spaces
    if (errorConfig.noConsecutiveSpaces) {
      if (/\s{2,}/.test(value)) {
        return {
          [`${errorKey}-noConsecutiveSpaces`]: errorConfig.noConsecutiveSpaces.validationMessage,
        };
      }
    }

    // Check numeric only validation (with optional value cleaning)
    if (errorConfig.numericOnly) {
      let valueToCheck = value.toString();

      if (errorConfig.numericOnly.cleanValue) {
        // Remove non-numeric characters (like in monthlySalaryValidator)
        valueToCheck = valueToCheck.replace(/[^\d]/g, '');
      }

      const numericPattern = /^[0-9]+$/;
      if (!numericPattern.test(valueToCheck)) {
        return {
          [`${errorKey}-numericOnly`]: errorConfig.numericOnly.validationMessage,
        };
      }
    }

    // Check minimum value validation (with optional value cleaning)
    if (errorConfig.minValue) {
      let valueToCheck = value.toString();

      if (errorConfig.minValue.cleanValue) {
        // Remove non-numeric characters before parsing
        valueToCheck = valueToCheck.replace(/[^\d]/g, '');
      }

      const numValue = parseFloat(valueToCheck);
      if (isNaN(numValue) || numValue < errorConfig.minValue.value) {
        return {
          [`${errorKey}-minValue`]: errorConfig.minValue.validationMessage.replace('{value}', errorConfig.minValue.value.toString()),
        };
      }
    }

    // Check maximum value validation (with optional value cleaning)
    if (errorConfig.maxValue) {
      let valueToCheck = value.toString();

      if (errorConfig.maxValue.cleanValue) {
        // Remove non-numeric characters before parsing
        valueToCheck = valueToCheck.replace(/[^\d]/g, '');
      }

      const numValue = parseFloat(valueToCheck);
      if (isNaN(numValue) || numValue > errorConfig.maxValue.value) {
        return {
          [`${errorKey}-maxValue`]: errorConfig.maxValue.validationMessage.replace('{value}', errorConfig.maxValue.value.toString()),
        };
      }
    }

    // Check date format validation (DD/MM/YYYY format validation)
    if (errorConfig.dateFormatValidation) {
      const format = errorConfig.dateFormatValidation.format || 'dd/mm/yyyy';

      if (format.toLowerCase() === 'dd/mm/yyyy') {
        // Check if format matches DD/MM/YYYY
        const dateFormatRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!dateFormatRegex.test(value)) {
          return {
            [`${errorKey}-dateFormat`]: errorConfig.dateFormatValidation.validationMessage,
          };
        }

        // Extract date parts and validate if it's a real date
        const [, date, month, year] = value.match(dateFormatRegex);
        const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();

        if (parseInt(month) > 12 || parseInt(month) < 1 ||
            parseInt(date) > daysInMonth || parseInt(date) < 1 ||
            parseInt(year) < 1 ||
            isNaN(daysInMonth)) {
          return {
            [`${errorKey}-dateFormat`]: errorConfig.dateFormatValidation.validationMessage,
          };
        }
      }
    }

    // Check future date validation (DOB cannot be today or future)
    if (errorConfig.futureDateValidation) {
      const format = errorConfig.futureDateValidation.format || 'dd/mm/yyyy';

      if (format.toLowerCase() === 'dd/mm/yyyy') {
        const dateFormatRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (dateFormatRegex.test(value)) {
          const [, date, month, year] = value.match(dateFormatRegex);

          // Create input date object (month is 0-indexed in JavaScript Date)
          const inputDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(date));
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0); // reset time to start of the day

          if (inputDate > currentDate) {
            return {
              [`${errorKey}-futureDate`]: errorConfig.futureDateValidation.validationMessage,
            };
          }
        }
      }
    }

    // Check age range validation (min/max age based on DOB)
    if (errorConfig.ageRangeValidation) {
      const format = errorConfig.ageRangeValidation.format || 'dd/mm/yyyy';

      if (format.toLowerCase() === 'dd/mm/yyyy') {
        const dateFormatRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (dateFormatRegex.test(value)) {
          const [, date, month, year] = value.match(dateFormatRegex);

          // Calculate age
          const birthDate = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(date, 10));
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          const maxAllowedBirthDate = new Date(today);
          maxAllowedBirthDate.setFullYear(today.getFullYear() - errorConfig.ageRangeValidation.maxAge);
          const minAllowedBirthDate = new Date(today);
          minAllowedBirthDate.setFullYear(today.getFullYear() - errorConfig.ageRangeValidation.minAge);

          // Adjust age if birthday hasn't occurred this year
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }

          // Check if age is within the specified range
          if (
            age < errorConfig.ageRangeValidation.minAge ||
            age > errorConfig.ageRangeValidation.maxAge ||
            birthDate < maxAllowedBirthDate ||
            birthDate > minAllowedBirthDate
          ) {
            return {
              [`${errorKey}-ageRange`]: errorConfig.ageRangeValidation.validationMessage.replace('{minAge}', errorConfig.ageRangeValidation.minAge.toString()).replace('{maxAge}', errorConfig.ageRangeValidation.maxAge.toString()),
            };
          }
        }
      }
    }

    // Check custom function validation
    if (errorConfig.custom) {
      const customResult = errorConfig.custom.validationFunction(control);
      if (customResult) {
        return customResult;
      }
    }

    // Check terms and conditions validation
    if (errorConfig.termsAndConditions && value !== true) {
      return {
        [`${errorKey}-termsAndConditions`]: errorConfig.termsAndConditions.validationMessage,
      };
    }

    // Check PAN format
    if (errorConfig.panFormat) {
        // Use custom pattern if provided, otherwise default to individual PAN pattern
        const panPattern = errorConfig.panFormat.pattern
          ? new RegExp(errorConfig.panFormat.pattern)
          : /^[A-Za-z]{3}[Pp][A-Za-z]{1}[0-9]{4}[A-Za-z]{1}$/;

        if (!panPattern.test(value)) {
          return {
            [`${errorKey}-panFormat`]: errorConfig.panFormat.validationMessage,
          };
        }
      }

      // Check GSTIN format
      if (errorConfig.gstinFormat) {
        // Trim the value before validation (like in original gstinValidator)
        const trimmedValue = value.trim();

        // Use custom pattern if provided, otherwise default GSTIN pattern
        const gstinPattern = errorConfig.gstinFormat.pattern
          ? new RegExp(errorConfig.gstinFormat.pattern)
          : /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9A-Z]{1}$/;

        if (trimmedValue && !gstinPattern.test(trimmedValue)) {
          return {
            [`${errorKey}-gstinFormat`]: errorConfig.gstinFormat.validationMessage,
          };
        }
      }

      // Check pincode format
      if (errorConfig.pincodeFormat) {
        // Convert to string and trim (like in original pinCodeValidator)
        const trimmedValue = value.toString().trim();

        // Use custom pattern if provided, otherwise default pincode pattern
        const pincodePattern = errorConfig.pincodeFormat.pattern
          ? new RegExp(errorConfig.pincodeFormat.pattern)
          : /^[1-9][0-9]{5}$/;

        if (trimmedValue && !pincodePattern.test(trimmedValue)) {
          return {
            [`${errorKey}-pincodeFormat`]: errorConfig.pincodeFormat.validationMessage,
          };
        }
      }

    return null;
  };

  return validatorFn;
}

// Helper function to create common email validator
export function createEmailValidator(
  validationMessage: string = 'Please enter a valid email address',
  invalidDomainMessage?: string,
  customPattern?: string,
  customInvalidDomains?: string[]
): ValidatorFn {
  return createUniversalValidator({
    required: {
      validationMessage: 'Email is required'
    },
    email: {
      validationMessage,
      invalidDomainMessage,
      pattern: customPattern,
      invalidDomains: customInvalidDomains || INVALID_EMAIL_DOMAINS
    }
  });
}

// Helper function to create office email validator (similar to your original)
export function createOfficeEmailValidator(
  requiredMessage: string = 'Please enter office email',
  invalidEmailMessage: string = 'Please enter a correct email',
  customInvalidDomains?: string[]
): ValidatorFn {
  return createUniversalValidator({
    required: {
      validationMessage: requiredMessage
    },
    email: {
      validationMessage: invalidEmailMessage,
      invalidDomainMessage: invalidEmailMessage,
      invalidDomains: customInvalidDomains || INVALID_EMAIL_DOMAINS
    }
  });
}

// Usage Examples:
/*
// Basic email validation
const basicEmailValidator = createEmailValidator('Please enter a valid email');

// Office email validation with custom invalid domains
const officeEmailValidator = createOfficeEmailValidator(
  'Please enter your office email',
  'Please enter a correct email address',
  ['gmail.com', 'yahoo.com', 'hotmail.com'] // Block personal email domains
);

// Advanced email validation with all options
const advancedEmailValidator = createUniversalValidator({
  required: {
    validationMessage: 'Email is required'
  },
  email: {
    validationMessage: 'Please enter a valid email address',
    invalidDomainMessage: 'Personal email domains are not allowed',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$',
    invalidDomains: ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']
  },
  maxLength: {
    validationMessage: 'Email cannot exceed {max} characters',
    maxCharacters: 100
  }
});

// Usage in component:
// this.form = this.fb.group({
//   email: ['', basicEmailValidator],
//   officeEmail: ['', officeEmailValidator]
// });
*/

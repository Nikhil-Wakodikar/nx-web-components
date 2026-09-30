# Universal Validator Guide

This guide explains how to use the universal validator system in your component library for comprehensive form validation.

## Overview

The universal validator system allows you to define validation rules through configuration objects instead of writing custom validator functions. This approach provides consistency, reusability, and easier maintenance across your application.

## Basic Usage

```typescript
import { FormControl } from "@angular/forms";
import { createUniversalValidator } from "component-library";

// Define your validation configuration
const fieldConfig = {
  required: {
    validationMessage: "This field is required.",
  },
  minLength: {
    validationMessage: "Please enter at least {min} characters.",
    minCharacters: 3,
  },
};

// Use it in your form
const control = new FormControl("", [createUniversalValidator(fieldConfig)]);
```

## Available Validation Types

### 1. Required Validation

Ensures the field has a value.

```typescript
required: {
  validationMessage: "This field is required.";
}
```

### 2. Length Validations

#### Minimum Length

```typescript
minLength: {
  validationMessage: "Please enter at least {min} characters.",
  minCharacters: 5
}
```

#### Maximum Length

```typescript
maxLength: {
  validationMessage: "Please enter no more than {max} characters.",
  maxCharacters: 50
}
```

### 3. Value Range Validations

#### Minimum Value (for numeric fields)

```typescript
minValue: {
  validationMessage: "Value should be at least {value}.",
  value: 100
}
```

#### Maximum Value (for numeric fields)

```typescript
maxValue: {
  validationMessage: "Value cannot exceed {value}.",
  value: 1000
}
```

### 4. Format Validations

#### Email Format

```typescript
emailFormat: {
  validationMessage: "Please enter a valid email address.";
}
```

#### Phone Format

```typescript
phoneFormat: {
  validationMessage: "Please enter a valid phone number.";
}
```

#### URL Format

```typescript
urlFormat: {
  validationMessage: "Please enter a valid website URL.";
}
```

#### Date Format

```typescript
dateFormat: {
  validationMessage: "Please enter date in DD/MM/YYYY format.",
  format: "dd/mm/yyyy" // Options: "dd/mm/yyyy", "mm/dd/yyyy", "yyyy-mm-dd"
}
```

#### Credit Card Format

```typescript
creditCardFormat: {
  validationMessage: "Please enter a valid credit card number.";
}
```

### 5. Content Type Validations

#### Numeric Only

```typescript
numericOnly: {
  validationMessage: "This field should contain only numbers.";
}
```

#### Alphabetic Only

```typescript
alphabeticOnly: {
  validationMessage: "This field should contain only letters and spaces.";
}
```

#### Alphanumeric Only

```typescript
alphanumericOnly: {
  validationMessage: "This field should contain only letters, numbers, and spaces.";
}
```

### 6. Whitespace Validations

#### No Consecutive Spaces

```typescript
noConsecutiveSpaces: {
  validationMessage: "This field cannot contain consecutive spaces.";
}
```

#### No Whitespace

```typescript
noWhitespace: {
  validationMessage: "This field cannot contain spaces.";
}
```

### 7. Age Validations

#### Minimum Age

```typescript
minAge: {
  validationMessage: "You must be at least {years} years old.",
  years: 18
}
```

#### Maximum Age

```typescript
maxAge: {
  validationMessage: "Age cannot exceed {years} years.",
  years: 100
}
```

### 8. Password Validation

#### Strong Password

```typescript
strongPassword: {
  validationMessage: "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
  minUppercase: 1,    // Optional, default: 1
  minLowercase: 1,    // Optional, default: 1
  minNumbers: 1,      // Optional, default: 1
  minSpecialChars: 1  // Optional, default: 1
}
```

### 9. Indian Specific Validations

#### PAN Format

```typescript
panFormat: {
  validationMessage: "Please enter a valid PAN number.";
}
```

#### GSTIN Format

```typescript
gstinFormat: {
  validationMessage: "Please enter a valid GSTIN number.";
}
```

#### Pincode Format

```typescript
pincodeFormat: {
  validationMessage: "Please enter a valid 6-digit pincode.";
}
```

### 10. Custom Pattern Validation

```typescript
pattern: {
  validationMessage: "Please enter a valid format.",
  pattern: "^[A-Z]{3}[0-9]{3}$" // Regular expression pattern
}
```

### 11. Terms and Conditions

```typescript
termsAndConditions: {
  validationMessage: "You must accept the terms and conditions.";
}
```

### 12. Custom Function Validation

```typescript
custom: {
  validationFunction: (control: AbstractControl) => {
    // Your custom validation logic
    if (someCondition) {
      return { customError: "Custom error message" };
    }
    return null;
  };
}
```

## Combining Multiple Validations

You can combine multiple validation types for a single field:

```typescript
const userNameConfig = {
  required: {
    validationMessage: "Username is required.",
  },
  minLength: {
    validationMessage: "Username must be at least {min} characters.",
    minCharacters: 3,
  },
  maxLength: {
    validationMessage: "Username cannot exceed {max} characters.",
    maxCharacters: 20,
  },
  alphanumericOnly: {
    validationMessage: "Username should contain only letters and numbers.",
  },
  noWhitespace: {
    validationMessage: "Username cannot contain spaces.",
  },
};
```

## Complete Example

```typescript
export const formFieldConfigs = {
  fullName: {
    required: {
      validationMessage: "Full name is required.",
    },
    minLength: {
      validationMessage: "Full name must be at least {min} characters.",
      minCharacters: 2,
    },
    maxLength: {
      validationMessage: "Full name cannot exceed {max} characters.",
      maxCharacters: 50,
    },
    alphabeticOnly: {
      validationMessage: "Full name should contain only letters and spaces.",
    },
    noConsecutiveSpaces: {
      validationMessage: "Full name cannot contain consecutive spaces.",
    },
  },

  email: {
    required: {
      validationMessage: "Email is required.",
    },
    emailFormat: {
      validationMessage: "Please enter a valid email address.",
    },
  },

  age: {
    required: {
      validationMessage: "Age is required.",
    },
    numericOnly: {
      validationMessage: "Age should contain only numbers.",
    },
    minValue: {
      validationMessage: "Age should be at least {value}.",
      value: 18,
    },
    maxValue: {
      validationMessage: "Age cannot exceed {value}.",
      value: 100,
    },
  },

  password: {
    required: {
      validationMessage: "Password is required.",
    },
    minLength: {
      validationMessage: "Password must be at least {min} characters.",
      minCharacters: 8,
    },
    strongPassword: {
      validationMessage: "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
    },
  },
};

// Usage in component
import { FormControl, FormGroup } from "@angular/forms";

this.form = new FormGroup({
  fullName: new FormControl("", [createUniversalValidator(formFieldConfigs.fullName)]),
  email: new FormControl("", [createUniversalValidator(formFieldConfigs.email)]),
  age: new FormControl("", [createUniversalValidator(formFieldConfigs.age)]),
  password: new FormControl("", [createUniversalValidator(formFieldConfigs.password)]),
});
```

## Message Placeholders

Some validation messages support placeholders that will be replaced with actual values:

- `{min}` - Replaced with minimum character count
- `{max}` - Replaced with maximum character count
- `{value}` - Replaced with minimum/maximum value
- `{years}` - Replaced with age in years

## Migration from Old Validators

To migrate from your old `fullNameValidator` function:

**Old approach:**

```typescript
fullNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Custom validation logic...
  };
}
```

**New approach:**

```typescript
const fullNameConfig = {
  required: {
    validationMessage: "Full name is required.",
  },
  alphabeticOnly: {
    validationMessage: "Full name should contain only letters and spaces.",
  },
  noConsecutiveSpaces: {
    validationMessage: "Full name cannot contain consecutive spaces.",
  },
  minLength: {
    validationMessage: "Full name must be at least {min} characters.",
    minCharacters: 1,
  },
  maxLength: {
    validationMessage: "Full name cannot exceed {max} characters.",
    maxCharacters: 255,
  },
};

// Usage
new FormControl("", [createUniversalValidator(fullNameConfig)]);
```

This approach provides better maintainability, consistency, and reusability across your application.

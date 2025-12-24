# @wearehere-labs/generic-form-create

A TypeScript library for dynamically creating [Generic Form Format (GFF)](https://github.com/wearehere-labs/generic-form-format) JSON definitions. This library provides a type-safe, programmatic way to build form definitions that can be used with any GFF-compatible form renderer.

## Features

- ✅ **Type-safe**: Full TypeScript support with comprehensive type definitions
- ✅ **Immutable operations**: All functions return new form instances
- ✅ **Duplicate detection**: Automatically prevents adding duplicate fields with different content
- ✅ **Comprehensive field types**: Support for all 13 GFF field types
- ✅ **Helper functions**: Convenient builders for fields, dependencies, and conditions
- ✅ **GFF v1.0 compliant**: Fully compatible with Generic Form Format specification v1.0

## Installation

```bash
npm install @wearehere-labs/generic-form-create
```

## Quick Start

```typescript
import {
  createForm,
  addField,
  createTextField,
  createEmailField,
  createSelectField,
  createOptions,
  toJSON,
} from '@wearehere-labs/generic-form-create';

// Create a new form
let form = createForm('contact-form', {
  title: 'Contact Us',
  description: 'Get in touch with our team',
});

// Add fields
form = addField(form, createTextField('name', 'Your Name', {
  minLength: 1,
  maxLength: 100,
  placeholder: 'Enter your name',
}));

form = addField(form, createEmailField('email', 'Email Address', {
  required: true,
  placeholder: 'you@example.com',
}));

form = addField(form, createSelectField('subject', 'Subject', {
  required: true,
  options: createOptions(['Support', 'Sales', 'General Inquiry']),
}));

// Export to JSON
const json = toJSON(form);
console.log(json);
```

## API Reference

### Form Management

#### `createForm(formId, options?)`

Creates a new form definition.

```typescript
const form = createForm('my-form', {
  title: 'My Form',
  description: 'Form description',
  version: '1.0',
  metadata: { author: 'Your Name' },
});
```

#### `addField(form, field)`

Adds a field to the form. Throws `DuplicateFieldError` if a field with the same ID exists and is different.

```typescript
form = addField(form, createTextField('username', 'Username', {
  minLength: 3,
  maxLength: 20,
}));
```

#### `removeField(form, fieldId)`

Removes a field from the form by its ID.

```typescript
form = removeField(form, 'username');
```

#### `getField(form, fieldId)`

Gets a field from the form by its ID.

```typescript
const field = getField(form, 'username');
```

#### `updateField(form, fieldId, updates)`

Updates an existing field in the form.

```typescript
form = updateField(form, 'username', {
  params: { minLength: 5, maxLength: 30 },
});
```

### Field Creation

All field creation functions follow the pattern:
```typescript
createFieldType(id, caption, params, options?)
```

#### Text Field

```typescript
createTextField('bio', 'Biography', {
  minLength: 0,
  maxLength: 500,
  multiline: true,
  placeholder: 'Tell us about yourself',
})
```

#### Number Field

```typescript
createNumberField('age', 'Age', {
  required: true,
  min: 18,
  max: 120,
  decimals: 0,
})
```

#### Checkbox Field

```typescript
createCheckboxField('agree', 'I agree to the terms', {
  required: true,
})
```

#### Radio Field

```typescript
createRadioField('gender', 'Gender', {
  required: true,
  options: createOptions(['Male', 'Female', 'Other', 'Prefer not to say']),
})
```

#### Select Field

```typescript
createSelectField('interests', 'Interests', {
  multiple: true,
  searchable: true,
  options: [
    createOption('sports', 'Sports'),
    createOption('music', 'Music'),
    createOption('art', 'Art'),
  ],
})
```

#### Date Field

```typescript
createDateField('birthdate', 'Date of Birth', {
  required: true,
  minDate: '1900-01-01',
  maxDate: '2025-12-31',
  format: 'YYYY-MM-DD',
})
```

#### File Field

```typescript
createFileField('resume', 'Upload Resume', {
  required: true,
  maxSize: 5242880, // 5MB
  acceptedTypes: ['.pdf', '.doc', '.docx'],
  acceptedMimeTypes: ['application/pdf'],
})
```

#### Email Field

```typescript
createEmailField('email', 'Email Address', {
  required: true,
  placeholder: 'you@example.com',
})
```

#### URL Field

```typescript
createURLField('website', 'Website', {
  placeholder: 'https://example.com',
})
```

#### Password Field

```typescript
createPasswordField('password', 'Password', {
  required: true,
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSymbol: true,
})
```

#### Range Field

```typescript
createRangeField('satisfaction', 'Satisfaction Level', {
  min: 0,
  max: 10,
  step: 1,
  defaultValue: 5,
})
```

#### Color Field

```typescript
createColorField('favoriteColor', 'Favorite Color', {
  format: 'hex',
  defaultValue: '#0000ff',
})
```

#### Nested Field

```typescript
createNestedField('address', 'Address', {
  formId: 'address-form',
  multiple: false,
  collapsible: true,
})
```

### Dependencies and Conditions

#### Creating Conditions

```typescript
import { createCondition, createCompoundCondition } from '@wearehere-labs/generic-form-create';

// Simple condition
const condition = createCondition('equals', true);

// Compound condition (AND)
const complexCondition = createCompoundCondition('and', [
  createCondition('greaterThan', 18),
  createCondition('lessThan', 65),
]);
```

#### Creating Effects

```typescript
import {
  showEffect,
  hideEffect,
  requireEffect,
  setValueEffect,
} from '@wearehere-labs/generic-form-create';

const effects = [
  showEffect('addressField'),
  requireEffect('addressField'),
];
```

#### Creating Dependencies

```typescript
import { createDependency, addDependency } from '@wearehere-labs/generic-form-create';

const dependency = createDependency(
  'hasAddress', // sourceFieldId
  createCondition('equals', true), // condition
  [
    showEffect('streetAddress'),
    requireEffect('streetAddress'),
  ]
);

form = addDependency(form, dependency);
```

### Functions

#### Creating Function Definitions

```typescript
import {
  addFunction,
  createDatasourceFunction,
  createValidatorFunction,
} from '@wearehere-labs/generic-form-create';

// Datasource function
form = addFunction(
  form,
  'getCountries',
  createDatasourceFunction('Returns list of countries')
);

// Validator function
form = addFunction(
  form,
  'validateAge',
  createValidatorFunction('Custom age validation', ['value'])
);
```

### JSON Conversion

#### `toJSON(form, pretty?)`

Converts a form definition to JSON string.

```typescript
const json = toJSON(form, true); // pretty-printed
const compact = toJSON(form, false); // compact
```

#### `fromJSON(json)`

Parses a JSON string into a form definition.

```typescript
const form = fromJSON(jsonString);
```

## Advanced Examples

### Complete Contact Form

```typescript
import {
  createForm,
  addField,
  createTextField,
  createEmailField,
  createSelectField,
  createCheckboxField,
  createOptions,
  toJSON,
} from '@wearehere-labs/generic-form-create';

let form = createForm('contact-form', {
  title: 'Contact Us',
  description: 'Send us a message',
});

form = addField(form, createTextField('name', 'Your Name', {
  minLength: 1,
  maxLength: 100,
}, {
  layout: {
    width: { mobile: 'full', desktop: '1/2' },
  },
}));

form = addField(form, createEmailField('email', 'Email Address', {
  required: true,
}, {
  layout: {
    width: { mobile: 'full', desktop: '1/2' },
  },
}));

form = addField(form, createSelectField('subject', 'Subject', {
  required: true,
  options: createOptions(['Support', 'Sales', 'General Inquiry']),
}));

form = addField(form, createTextField('message', 'Message', {
  minLength: 10,
  maxLength: 1000,
  multiline: true,
}));

form = addField(form, createCheckboxField('subscribe', 'Subscribe to newsletter', {}));

const json = toJSON(form);
```

### Form with Conditional Logic

```typescript
import {
  createForm,
  addField,
  addDependency,
  createCheckboxField,
  createTextField,
  createDependency,
  createCondition,
  showEffect,
  requireEffect,
} from '@wearehere-labs/generic-form-create';

let form = createForm('shipping-form', { title: 'Shipping Information' });

// Add checkbox for different billing address
form = addField(form, createCheckboxField(
  'differentBilling',
  'Use different billing address',
  {}
));

// Add billing address field (initially hidden)
form = addField(form, createTextField(
  'billingAddress',
  'Billing Address',
  { minLength: 1 },
  { disabled: true } // Initially hidden by renderer
));

// Add dependency to show billing address when checkbox is checked
form = addDependency(
  form,
  createDependency(
    'differentBilling',
    createCondition('equals', true),
    [
      showEffect('billingAddress'),
      requireEffect('billingAddress'),
    ]
  )
);
```

### Job Application Form

```typescript
import {
  createForm,
  addField,
  createTextField,
  createNumberField,
  createDateField,
  createFileField,
  createRadioField,
  createOptions,
  toJSON,
} from '@wearehere-labs/generic-form-create';

let form = createForm('job-application', {
  title: 'Job Application',
  description: 'Apply for a position at our company',
});

form = addField(form, createTextField('firstName', 'First Name', {
  minLength: 1,
  maxLength: 50,
}));

form = addField(form, createTextField('lastName', 'Last Name', {
  minLength: 1,
  maxLength: 50,
}));

form = addField(form, createTextField('email', 'Email', {
  minLength: 1,
  pattern: '^[^@]+@[^@]+\\.[^@]+$',
}));

form = addField(form, createRadioField('position', 'Position', {
  required: true,
  options: createOptions([
    { value: 'dev', label: 'Software Developer' },
    { value: 'designer', label: 'UI/UX Designer' },
    { value: 'pm', label: 'Project Manager' },
  ]),
}));

form = addField(form, createNumberField('experience', 'Years of Experience', {
  required: true,
  min: 0,
  max: 50,
  decimals: 0,
}));

form = addField(form, createDateField('startDate', 'Available Start Date', {
  required: true,
}));

form = addField(form, createFileField('resume', 'Resume', {
  required: true,
  maxSize: 5242880,
  acceptedTypes: ['.pdf', '.doc', '.docx'],
}));

const json = toJSON(form);
```

## Error Handling

The library throws two main error types:

### `FormCreationError`

Thrown when there's an issue creating or manipulating a form.

```typescript
try {
  const form = createForm(''); // Empty formId
} catch (error) {
  if (error instanceof FormCreationError) {
    console.error('Form creation failed:', error.message);
  }
}
```

### `DuplicateFieldError`

Thrown when attempting to add a field with an existing ID that has different content.

```typescript
try {
  form = addField(form, field1);
  form = addField(form, field2); // Same ID, different content
} catch (error) {
  if (error instanceof DuplicateFieldError) {
    console.error('Duplicate field detected:', error.message);
  }
}
```

## Best Practices

1. **Immutability**: Always reassign the returned form object:
   ```typescript
   form = addField(form, field); // ✅ Correct
   addField(form, field); // ❌ Wrong
   ```

2. **Field ID Uniqueness**: Ensure all field IDs are unique within a form:
   ```typescript
   form = addField(form, createTextField('email', 'Email', {}));
   // Don't add another field with id 'email'
   ```

3. **Validation**: Use appropriate field parameters for validation:
   ```typescript
   // For required fields
   createTextField('name', 'Name', { minLength: 1 })
   createNumberField('age', 'Age', { required: true })
   createEmailField('email', 'Email', { required: true })
   ```

4. **Options**: For radio/select fields, always provide either `options` or `optionsFunction`:
   ```typescript
   createSelectField('country', 'Country', {
     optionsFunction: 'getCountries', // Dynamic options
   })
   ```

## TypeScript Support

This library is written in TypeScript and provides complete type definitions. All field parameters are properly typed:

```typescript
import { Field, FormDefinition, TextFieldParams } from '@wearehere-labs/generic-form-create';

const params: TextFieldParams = {
  minLength: 3,
  maxLength: 50,
  placeholder: 'Enter text',
};

const field: Field = createTextField('myField', 'My Field', params);
```

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT

## Related Projects

- [generic-form-format](https://github.com/wearehere-labs/generic-form-format) - The specification this library implements
- Generic Form Renderer libraries (coming soon)

## Support

For issues, questions, or suggestions, please [open an issue](https://github.com/wearehere-labs/generic-form-create/issues) on GitHub.

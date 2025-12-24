# Quick Start Guide

Get started with `@wearehere-labs/generic-form-create` in 5 minutes!

## Installation

```bash
npm install @wearehere-labs/generic-form-create
```

## Basic Usage

### 1. Create a Simple Form

```typescript
import { createForm, addField, createTextField, toJSON } from '@wearehere-labs/generic-form-create';

// Create a form
let form = createForm('my-first-form', {
  title: 'My First Form',
});

// Add a field
form = addField(
  form,
  createTextField('username', 'Username', {
    minLength: 3,
    maxLength: 20,
  })
);

// Get the JSON
const json = toJSON(form);
console.log(json);
```

### 2. Add Multiple Fields

```typescript
import {
  createForm,
  addField,
  createTextField,
  createEmailField,
  createNumberField,
} from '@wearehere-labs/generic-form-create';

let form = createForm('user-profile');

// Add multiple fields
form = addField(form, createTextField('name', 'Full Name', { minLength: 1 }));
form = addField(form, createEmailField('email', 'Email', { required: true }));
form = addField(form, createNumberField('age', 'Age', { min: 18, max: 120 }));
```

### 3. Create Select/Radio Fields

```typescript
import {
  createForm,
  addField,
  createSelectField,
  createRadioField,
  createOptions,
} from '@wearehere-labs/generic-form-create';

let form = createForm('preferences');

// Select with options
form = addField(
  form,
  createSelectField('country', 'Country', {
    required: true,
    options: createOptions(['USA', 'Canada', 'UK', 'Other']),
  })
);

// Radio with custom labels
form = addField(
  form,
  createRadioField('plan', 'Subscription Plan', {
    required: true,
    options: createOptions([
      { value: 'free', label: 'Free - $0/month' },
      { value: 'pro', label: 'Pro - $9/month' },
      { value: 'enterprise', label: 'Enterprise - Contact us' },
    ]),
  })
);
```

### 4. Add Conditional Logic

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

let form = createForm('shipping-form');

// Checkbox to trigger condition
form = addField(
  form,
  createCheckboxField('differentShipping', 'Use different shipping address', {})
);

// Field that will be shown conditionally
form = addField(
  form,
  createTextField('shippingAddress', 'Shipping Address', { minLength: 1 })
);

// Add the dependency
form = addDependency(
  form,
  createDependency(
    'differentShipping',
    createCondition('equals', true),
    [
      showEffect('shippingAddress'),
      requireEffect('shippingAddress'),
    ]
  )
);
```

### 5. Merging Forms

```typescript
import {
  createForm,
  addField,
  mergeForms,
  createTextField,
  createEmailField,
} from '@wearehere-labs/generic-form-create';

// Create reusable form sections
let contactInfo = createForm('contact');
contactInfo = addField(contactInfo, createTextField('name', 'Name', {}));
contactInfo = addField(contactInfo, createEmailField('email', 'Email', { required: true }));

let addressInfo = createForm('address');
addressInfo = addField(addressInfo, createTextField('street', 'Street', {}));
addressInfo = addField(addressInfo, createTextField('city', 'City', {}));

// Merge them into one form
const completeForm = mergeForms([contactInfo, addressInfo], {
  formId: 'complete-form',
  title: 'Contact & Address',
});

console.log(completeForm.fields.length); // 4 fields total
```

**Merge Rules:**
- ✅ Different field IDs: merged successfully
- ✅ Same ID, identical content: merged (no duplicate)
- ❌ Same ID, different content: throws `DuplicateFieldError`

### 6. Working with the Result

```typescript
import { toJSON, fromJSON } from '@wearehere-labs/generic-form-create';

// Convert to JSON string
const jsonString = toJSON(form, true); // true for pretty-print

// Save to file (Node.js)
import { writeFileSync } from 'fs';
writeFileSync('./my-form.json', jsonString);

// Parse back from JSON
const loadedForm = fromJSON(jsonString);
```

## Common Patterns

### Required Field

```typescript
createTextField('email', 'Email', { minLength: 1 })
// or
createNumberField('age', 'Age', { required: true })
```

### Field with Tooltip

```typescript
createTextField('password', 'Password', { minLength: 8 }, {
  tooltip: 'Must be at least 8 characters',
})
```

### Responsive Layout

```typescript
createTextField('address', 'Address', {}, {
  layout: {
    width: {
      mobile: 'full',
      tablet: '1/2',
      desktop: '1/3',
    },
  },
})
```

### File Upload

```typescript
createFileField('resume', 'Resume', {
  required: true,
  maxSize: 5242880, // 5MB in bytes
  acceptedTypes: ['.pdf', '.doc', '.docx'],
})
```

## Next Steps

- Read the [full README](../README.md) for comprehensive documentation
- Check out the [examples](../examples/) directory for complete examples
- Learn about [conditional dependencies](../README.md#dependencies-and-conditions)
- Explore all [field types](../README.md#field-creation)

## Need Help?

- [API Reference](../README.md#api-reference)
- [GitHub Issues](https://github.com/wearehere-labs/generic-form-create/issues)
- [Generic Form Format Specification](https://github.com/wearehere-labs/generic-form-format)

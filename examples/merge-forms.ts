/**
 * Example: Merging Multiple Form Definitions
 * 
 * This example demonstrates how to merge multiple form definitions into one.
 * Useful for:
 * - Composing reusable form sections
 * - Building complex forms from smaller modules
 * - Combining forms from different sources
 */

import {
  createForm,
  addField,
  mergeForms,
  createTextField,
  createEmailField,
  createNumberField,
  createDateField,
  createCheckboxField,
  createSelectField,
  createOptions,
  toJSON,
} from '../src/index';

// Example 1: Basic merge of two simple forms
console.log('=== Example 1: Basic Merge ===\n');

let contactForm = createForm('contact-info');
contactForm = addField(contactForm, createTextField('name', 'Full Name', { minLength: 1 }));
contactForm = addField(contactForm, createEmailField('email', 'Email', { required: true }));

let addressForm = createForm('address-info');
addressForm = addField(addressForm, createTextField('street', 'Street', { minLength: 1 }));
addressForm = addField(addressForm, createTextField('city', 'City', { minLength: 1 }));

const basicMerge = mergeForms([contactForm, addressForm], {
  formId: 'contact-and-address',
  title: 'Contact & Address Information',
});

console.log('Merged form has', basicMerge.fields.length, 'fields');
console.log('Field IDs:', basicMerge.fields.map(f => f.id).join(', '));
console.log();

// Example 2: Merging with shared fields (identical)
console.log('=== Example 2: Merge with Shared Fields ===\n');

let form1 = createForm('form1');
const sharedEmailField = createEmailField('email', 'Email Address', { required: true });
form1 = addField(form1, createTextField('firstName', 'First Name', {}));
form1 = addField(form1, sharedEmailField);

let form2 = createForm('form2');
form2 = addField(form2, createTextField('lastName', 'Last Name', {}));
form2 = addField(form2, sharedEmailField); // Same field - OK!

const mergeWithShared = mergeForms([form1, form2], {
  formId: 'shared-merge',
  title: 'Form with Shared Field',
});

console.log('Form 1 fields:', form1.fields.map(f => f.id).join(', '));
console.log('Form 2 fields:', form2.fields.map(f => f.id).join(', '));
console.log('Merged fields:', mergeWithShared.fields.map(f => f.id).join(', '));
console.log('Note: "email" appears only once in merged form\n');

// Example 3: Building a complete user registration form from modules
console.log('=== Example 3: Modular Registration Form ===\n');

// Personal info module
let personalModule = createForm('personal');
personalModule = addField(personalModule, createTextField('firstName', 'First Name', { minLength: 1 }));
personalModule = addField(personalModule, createTextField('lastName', 'Last Name', { minLength: 1 }));
personalModule = addField(personalModule, createDateField('birthdate', 'Date of Birth', { required: true }));

// Account info module
let accountModule = createForm('account');
accountModule = addField(accountModule, createTextField('username', 'Username', { 
  minLength: 3, 
  maxLength: 20,
  pattern: '^[a-zA-Z0-9_]+$',
}));
accountModule = addField(accountModule, createEmailField('email', 'Email', { required: true }));

// Preferences module
let preferencesModule = createForm('preferences');
preferencesModule = addField(preferencesModule, createSelectField('language', 'Language', {
  required: true,
  options: createOptions(['English', 'Spanish', 'French', 'German']),
}));
preferencesModule = addField(preferencesModule, createCheckboxField('newsletter', 'Subscribe to newsletter', {}));

// Terms module
let termsModule = createForm('terms');
termsModule = addField(termsModule, createCheckboxField('acceptTerms', 'I accept the terms and conditions', {
  required: true,
}));

// Merge all modules into complete registration form
const registrationForm = mergeForms(
  [personalModule, accountModule, preferencesModule, termsModule],
  {
    formId: 'user-registration',
    title: 'User Registration',
    description: 'Create your account',
  }
);

console.log('Complete Registration Form:');
console.log('- Total fields:', registrationForm.fields.length);
console.log('- Modules merged: 4');
console.log('- Fields:', registrationForm.fields.map(f => `${f.id} (${f.type})`).join(', '));
console.log();

// Example 4: Attempting to merge conflicting forms (will throw error)
console.log('=== Example 4: Handling Merge Conflicts ===\n');

let formA = createForm('formA');
formA = addField(formA, createNumberField('age', 'Age', { min: 18, max: 120 }));

let formB = createForm('formB');
formB = addField(formB, createNumberField('age', 'Age', { min: 21, max: 100 })); // Different params!

try {
  mergeForms([formA, formB]);
  console.log('Merge succeeded (unexpected!)');
} catch (error) {
  console.log('❌ Merge failed as expected:', (error as Error).message);
  console.log('Reason: Field "age" exists in both forms with different parameters\n');
}

// Example 5: Merging many forms at once
console.log('=== Example 5: Merging Multiple Forms ===\n');

const forms = [];
for (let i = 1; i <= 5; i++) {
  let form = createForm(`section-${i}`);
  form = addField(form, createTextField(`field${i}`, `Field ${i}`, {}));
  forms.push(form);
}

const multiMerge = mergeForms(forms, {
  formId: 'multi-section-form',
  title: 'Form with Multiple Sections',
});

console.log('Merged', forms.length, 'forms into one');
console.log('Total fields:', multiMerge.fields.length);
console.log();

// Export the main registration form as JSON
console.log('=== Generated JSON ===\n');
console.log(toJSON(registrationForm, true));

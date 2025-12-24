# Examples

This directory contains example usage of the `@wearehere-labs/generic-form-create` library.

## Running Examples

To run these examples:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Run an example with ts-node:
   ```bash
   npx ts-node examples/contact-form.ts
   ```

## Available Examples

### [contact-form.ts](./contact-form.ts)

A simple contact form demonstrating:
- Text fields with validation
- Email field
- Select dropdown
- Checkbox
- Responsive layout configuration
- Field tooltips

**Output**: Creates a contact form JSON with all basic field types.

### [job-application.ts](./job-application.ts)

A comprehensive job application form demonstrating:
- Multiple field types (text, email, number, date, file, radio, select)
- Conditional logic (showing/hiding fields based on selections)
- File upload with constraints
- Complex validation rules
- Dependencies between fields

**Output**: Creates a job application form with conditional fields.

## Creating Your Own Examples

To create a new example:

1. Create a new TypeScript file in this directory
2. Import the necessary functions from `../src/index`
3. Build your form using the library functions
4. Export the form and/or print the JSON

Example template:

```typescript
import {
  createForm,
  addField,
  createTextField,
  toJSON,
} from '../src/index';

// Create form
let myForm = createForm('my-form', {
  title: 'My Form',
});

// Add fields
myForm = addField(
  myForm,
  createTextField('field1', 'Field 1', {})
);

// Output JSON
console.log(toJSON(myForm, true));

export default myForm;
```

## Tips

- Use `toJSON(form, true)` for pretty-printed output
- Save generated JSON to files for use with form renderers
- Test your forms with a GFF-compatible renderer
- Validate generated JSON against the GFF schema

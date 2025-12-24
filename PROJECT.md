# generic-form-create

TypeScript library for dynamically creating Generic Form Format (GFF) JSON definitions.

## Project Overview

This repository provides a type-safe, programmatic way to build form definitions compatible with the [Generic Form Format specification v1.0](https://github.com/wearehere-labs/generic-form-format).

### Key Features

✅ **Immutable API** - All operations return new form instances
✅ **Duplicate Detection** - Automatically prevents duplicate fields with different content  
✅ **Type Safety** - Full TypeScript support with comprehensive type definitions
✅ **13 Field Types** - Support for all GFF v1.0 field types
✅ **Helper Functions** - Convenient builders for fields, dependencies, and conditions
✅ **GFF Compliant** - 100% compatible with Generic Form Format v1.0

## Project Structure

```
generic-form-create/
├── src/
│   ├── types.ts           # TypeScript type definitions (GFF v1.0)
│   ├── form.ts            # Core form management functions
│   ├── fields.ts          # Field creation helper functions
│   ├── helpers.ts         # Dependency and condition helpers
│   ├── index.ts           # Main export file
│   └── __tests__/
│       └── index.test.ts  # Unit tests
├── examples/
│   ├── contact-form.ts    # Simple contact form example
│   ├── job-application.ts # Complex form with conditionals
│   └── README.md
├── package.json
├── tsconfig.json
├── jest.config.js
├── README.md              # Full documentation
├── QUICKSTART.md          # Quick start guide
├── CONTRIBUTING.md        # Contribution guidelines
├── LICENSE               # MIT License
└── .gitignore
```

## Core API

### Form Management
- `createForm()` - Create a new form definition
- `addField()` - Add a field to a form (with duplicate detection)
- `removeField()` - Remove a field by ID
- `getField()` - Get a field by ID
- `updateField()` - Update an existing field
- `addDependency()` - Add conditional logic
- `removeDependency()` - Remove a dependency
- `addFunction()` - Add a function definition
- `removeFunction()` - Remove a function
- `toJSON()` - Export form to JSON string
- `fromJSON()` - Import form from JSON string

### Field Creation (13 Types)
- `createTextField()` - Text/textarea fields
- `createNumberField()` - Numeric input
- `createCheckboxField()` - Boolean selection
- `createRadioField()` - Single selection from options
- `createSelectField()` - Dropdown (single/multiple)
- `createDateField()` - Date/time picker
- `createFileField()` - File upload
- `createEmailField()` - Email validation
- `createURLField()` - URL validation
- `createPasswordField()` - Password with complexity
- `createRangeField()` - Slider input
- `createColorField()` - Color picker
- `createNestedField()` - Embedded form reference

### Helper Functions
- `createOptions()` - Create option arrays for select/radio
- `createCondition()` - Create a condition
- `createCompoundCondition()` - Create AND/OR conditions
- `createEffect()` - Create an effect
- `showEffect()`, `hideEffect()`, etc. - Convenience effect creators
- `createDependency()` - Create a dependency
- `createFunctionDef()` - Create function definitions

## Installation

```bash
npm install @wearehere-labs/generic-form-create
```

## Quick Example

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

let form = createForm('contact-form', {
  title: 'Contact Us',
});

form = addField(form, createTextField('name', 'Your Name', { minLength: 1 }));
form = addField(form, createEmailField('email', 'Email', { required: true }));
form = addField(form, createSelectField('subject', 'Subject', {
  required: true,
  options: createOptions(['Support', 'Sales', 'General']),
}));

const json = toJSON(form);
```

## Duplicate Field Handling

The library prevents adding duplicate fields with different content:

```typescript
const field1 = createTextField('username', 'Username', { minLength: 3 });
const field2 = createTextField('username', 'Username', { minLength: 5 });

form = addField(form, field1); // ✅ OK
form = addField(form, field2); // ❌ Throws DuplicateFieldError
```

Identical fields are allowed (no error, no duplicate added):

```typescript
const field1 = createTextField('username', 'Username', { minLength: 3 });
const field2 = createTextField('username', 'Username', { minLength: 3 });

form = addField(form, field1); // ✅ OK
form = addField(form, field2); // ✅ OK (no duplicate added, returns form unchanged)
```

## Documentation

- **[README.md](README.md)** - Complete API reference and examples
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute quick start guide
- **[examples/](examples/)** - Working code examples
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines

## Dependencies

- **Production**: [generic-form-format](https://github.com/wearehere-labs/generic-form-format) (specification repo)
- **Development**: TypeScript, Jest, ts-jest

## Testing

```bash
npm test              # Run tests
npm run test:watch    # Watch mode
```

## Building

```bash
npm run build         # Compile TypeScript
```

## Related Projects

- [generic-form-format](https://github.com/wearehere-labs/generic-form-format) - The GFF specification

## License

MIT - See [LICENSE](LICENSE) file

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

**Maintained by WeAreHere Labs**

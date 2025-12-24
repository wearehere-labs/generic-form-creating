# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-24

### Added
- Initial release of generic-form-create
- Core form management functions:
  - `createForm()` - Create new form definitions
  - `addField()` - Add fields with duplicate detection
  - `removeField()` - Remove fields by ID
  - `getField()` - Retrieve fields by ID
  - `updateField()` - Update existing fields
  - `addDependency()` - Add conditional logic
  - `removeDependency()` - Remove dependencies
  - `addFunction()` - Add function definitions
  - `removeFunction()` - Remove functions
  - `toJSON()` - Export to JSON string
  - `fromJSON()` - Import from JSON string
- Field creation helpers for all 13 GFF v1.0 field types:
  - `createTextField()` - Text and textarea fields
  - `createNumberField()` - Numeric input
  - `createCheckboxField()` - Boolean selection
  - `createRadioField()` - Single selection from options
  - `createSelectField()` - Dropdown selection
  - `createDateField()` - Date/time picker
  - `createFileField()` - File upload
  - `createEmailField()` - Email validation
  - `createURLField()` - URL validation
  - `createPasswordField()` - Password with complexity
  - `createRangeField()` - Slider input
  - `createColorField()` - Color picker
  - `createNestedField()` - Embedded forms
- Dependency and condition helpers:
  - `createCondition()` - Simple conditions
  - `createCompoundCondition()` - AND/OR/NOT conditions
  - `createEffect()` - Generic effect creator
  - Effect shortcuts: `showEffect()`, `hideEffect()`, `enableEffect()`, `disableEffect()`, etc.
  - `createDependency()` - Complete dependency definitions
  - `createFunctionDef()` - Function definitions
  - Function type creators: `createDatasourceFunction()`, `createValidatorFunction()`, `createTransformerFunction()`
- Options helpers:
  - `createOption()` - Single option object
  - `createOptions()` - Multiple options from strings or objects
- Complete TypeScript type definitions matching GFF v1.0 specification
- Duplicate field detection with `DuplicateFieldError`
- Immutable API design (all functions return new instances)
- Comprehensive documentation:
  - README.md with full API reference
  - QUICKSTART.md for quick start
  - CONTRIBUTING.md for contributors
  - Examples directory with working code
- Unit tests with Jest
- TypeScript compilation configuration
- Jest test configuration
- Package configuration for npm publishing

### Features
- ✅ Full GFF v1.0 compliance
- ✅ Type-safe TypeScript API
- ✅ Immutable operations
- ✅ Automatic duplicate detection
- ✅ Comprehensive field type support
- ✅ Helper functions for common patterns
- ✅ JSON import/export
- ✅ Extensive documentation and examples

## [Unreleased]

### Planned
- Additional validation helpers
- Form composition utilities
- Schema validation integration
- More complex examples
- Performance optimizations

---

[1.0.0]: https://github.com/wearehere-labs/generic-form-create/releases/tag/v1.0.0

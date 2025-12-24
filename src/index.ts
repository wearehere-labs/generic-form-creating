/**
 * @wearehere-labs/generic-form-create
 * 
 * A library for dynamically creating Generic Form Format (GFF) JSONs
 * Based on https://github.com/wearehere-labs/generic-form-format
 */

// Export all types
export * from './types';

// Export form management functions
export {
  createForm,
  addField,
  removeField,
  getField,
  updateField,
  addDependency,
  removeDependency,
  addFunction,
  removeFunction,
  toJSON,
  fromJSON,
} from './form';

// Export field creation helpers
export {
  createTextField,
  createNumberField,
  createCheckboxField,
  createRadioField,
  createSelectField,
  createDateField,
  createFileField,
  createEmailField,
  createURLField,
  createPasswordField,
  createRangeField,
  createColorField,
  createNestedField,
  createOption,
  createOptions,
} from './fields';

// Export dependency and condition helpers
export {
  createCondition,
  createCompoundCondition,
  createEffect,
  showEffect,
  hideEffect,
  enableEffect,
  disableEffect,
  requireEffect,
  unrequireEffect,
  updateParamsEffect,
  setValueEffect,
  clearValueEffect,
  createDependency,
  createFunctionDef,
  createDatasourceFunction,
  createValidatorFunction,
  createTransformerFunction,
} from './helpers';

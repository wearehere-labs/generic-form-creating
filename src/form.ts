import {
  FormDefinition,
  Field,
  Dependency,
  FunctionDef,
  FormCreationError,
  DuplicateFieldError,
} from './types';

/**
 * Creates a new form definition
 * @param formId - Unique identifier for the form
 * @param options - Optional form properties
 * @returns A new FormDefinition object
 */
export function createForm(
  formId: string,
  options?: {
    title?: string;
    description?: string;
    version?: string;
    metadata?: Record<string, any>;
  }
): FormDefinition {
  if (!formId || typeof formId !== 'string') {
    throw new FormCreationError('formId must be a non-empty string');
  }

  return {
    version: options?.version || '1.0',
    formId,
    title: options?.title,
    description: options?.description,
    fields: [],
    dependencies: [],
    functions: {},
    metadata: options?.metadata,
  };
}

/**
 * Deep equality check for objects
 */
function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;
  
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

/**
 * Adds a field to a form definition
 * @param form - The form definition to add the field to
 * @param field - The field to add
 * @returns The updated form definition
 * @throws DuplicateFieldError if a field with the same ID exists and is different
 */
export function addField(form: FormDefinition, field: Field): FormDefinition {
  if (!field.id || typeof field.id !== 'string') {
    throw new FormCreationError('Field must have a non-empty string id');
  }

  if (!field.type) {
    throw new FormCreationError('Field must have a type');
  }

  if (!field.caption || typeof field.caption !== 'string') {
    throw new FormCreationError('Field must have a non-empty string caption');
  }

  // Check for existing field with same ID
  const existingField = form.fields.find((f) => f.id === field.id);

  if (existingField) {
    // If field exists, check if it's identical
    if (!deepEqual(existingField, field)) {
      throw new DuplicateFieldError(
        field.id,
        'A different field with this ID already exists'
      );
    }
    // If identical, return form unchanged
    return form;
  }

  // Add the new field
  return {
    ...form,
    fields: [...form.fields, field],
  };
}

/**
 * Removes a field from a form definition
 * @param form - The form definition to remove the field from
 * @param fieldId - The ID of the field to remove
 * @returns The updated form definition
 */
export function removeField(form: FormDefinition, fieldId: string): FormDefinition {
  return {
    ...form,
    fields: form.fields.filter((f) => f.id !== fieldId),
  };
}

/**
 * Gets a field from a form by ID
 * @param form - The form definition to search
 * @param fieldId - The ID of the field to find
 * @returns The field if found, undefined otherwise
 */
export function getField(form: FormDefinition, fieldId: string): Field | undefined {
  return form.fields.find((f) => f.id === fieldId);
}

/**
 * Updates an existing field in a form
 * @param form - The form definition containing the field
 * @param fieldId - The ID of the field to update
 * @param updates - Partial field updates to apply
 * @returns The updated form definition
 * @throws FormCreationError if field not found
 */
export function updateField(
  form: FormDefinition,
  fieldId: string,
  updates: Partial<Omit<Field, 'id'>>
): FormDefinition {
  const fieldIndex = form.fields.findIndex((f) => f.id === fieldId);

  if (fieldIndex === -1) {
    throw new FormCreationError(`Field with ID "${fieldId}" not found`);
  }

  const updatedFields = [...form.fields];
  updatedFields[fieldIndex] = {
    ...updatedFields[fieldIndex],
    ...updates,
  };

  return {
    ...form,
    fields: updatedFields,
  };
}

/**
 * Adds a dependency to a form definition
 * @param form - The form definition to add the dependency to
 * @param dependency - The dependency to add
 * @returns The updated form definition
 */
export function addDependency(form: FormDefinition, dependency: Dependency): FormDefinition {
  return {
    ...form,
    dependencies: [...(form.dependencies || []), dependency],
  };
}

/**
 * Removes a dependency from a form definition
 * @param form - The form definition to remove the dependency from
 * @param dependencyId - The ID of the dependency to remove
 * @returns The updated form definition
 */
export function removeDependency(form: FormDefinition, dependencyId: string): FormDefinition {
  return {
    ...form,
    dependencies: (form.dependencies || []).filter((d) => d.id !== dependencyId),
  };
}

/**
 * Adds a function definition to a form
 * @param form - The form definition to add the function to
 * @param name - The name of the function
 * @param functionDef - The function definition
 * @returns The updated form definition
 */
export function addFunction(
  form: FormDefinition,
  name: string,
  functionDef: FunctionDef
): FormDefinition {
  return {
    ...form,
    functions: {
      ...form.functions,
      [name]: functionDef,
    },
  };
}

/**
 * Removes a function definition from a form
 * @param form - The form definition to remove the function from
 * @param name - The name of the function to remove
 * @returns The updated form definition
 */
export function removeFunction(form: FormDefinition, name: string): FormDefinition {
  const { [name]: removed, ...remainingFunctions } = form.functions || {};
  return {
    ...form,
    functions: remainingFunctions,
  };
}

/**
 * Converts a form definition to JSON string
 * @param form - The form definition to convert
 * @param pretty - Whether to pretty-print the JSON (default: true)
 * @returns JSON string representation of the form
 */
export function toJSON(form: FormDefinition, pretty: boolean = true): string {
  return JSON.stringify(form, null, pretty ? 2 : 0);
}

/**
 * Parses a JSON string into a form definition
 * @param json - The JSON string to parse
 * @returns The parsed form definition
 * @throws FormCreationError if JSON is invalid
 */
export function fromJSON(json: string): FormDefinition {
  try {
    const form = JSON.parse(json);
    
    if (!form.version || !form.formId || !Array.isArray(form.fields)) {
      throw new FormCreationError('Invalid form definition: missing required properties');
    }
    
    return form;
  } catch (error) {
    if (error instanceof FormCreationError) {
      throw error;
    }
    throw new FormCreationError(`Failed to parse JSON: ${(error as Error).message}`);
  }
}

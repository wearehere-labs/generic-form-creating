import {
  Field,
  TextFieldParams,
  NumberFieldParams,
  CheckboxFieldParams,
  RadioFieldParams,
  SelectFieldParams,
  DateFieldParams,
  FileFieldParams,
  EmailFieldParams,
  URLFieldParams,
  PasswordFieldParams,
  RangeFieldParams,
  ColorFieldParams,
  NestedFieldParams,
  LayoutConfig,
  ValidationConfig,
  OptionObject,
} from './types';

interface BaseFieldOptions {
  tooltip?: string;
  layout?: LayoutConfig;
  validation?: ValidationConfig;
  defaultValue?: any;
  disabled?: boolean;
  readonly?: boolean;
}

/**
 * Creates a text field
 */
export function createTextField(
  id: string,
  caption: string,
  params: TextFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'text',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a number field
 */
export function createNumberField(
  id: string,
  caption: string,
  params: NumberFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'number',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a checkbox field
 */
export function createCheckboxField(
  id: string,
  caption: string,
  params: CheckboxFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'checkbox',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a radio field
 */
export function createRadioField(
  id: string,
  caption: string,
  params: RadioFieldParams,
  options?: BaseFieldOptions
): Field {
  if (!params.options && !params.optionsFunction) {
    throw new Error('Radio field must have either options or optionsFunction');
  }
  return {
    id,
    type: 'radio',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a select field
 */
export function createSelectField(
  id: string,
  caption: string,
  params: SelectFieldParams,
  options?: BaseFieldOptions
): Field {
  if (!params.options && !params.optionsFunction) {
    throw new Error('Select field must have either options or optionsFunction');
  }
  return {
    id,
    type: 'select',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a date field
 */
export function createDateField(
  id: string,
  caption: string,
  params: DateFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'date',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a file field
 */
export function createFileField(
  id: string,
  caption: string,
  params: FileFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'file',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates an email field
 */
export function createEmailField(
  id: string,
  caption: string,
  params: EmailFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'email',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a URL field
 */
export function createURLField(
  id: string,
  caption: string,
  params: URLFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'url',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a password field
 */
export function createPasswordField(
  id: string,
  caption: string,
  params: PasswordFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'password',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a range field
 */
export function createRangeField(
  id: string,
  caption: string,
  params: RangeFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'range',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a color field
 */
export function createColorField(
  id: string,
  caption: string,
  params: ColorFieldParams = {},
  options?: BaseFieldOptions
): Field {
  return {
    id,
    type: 'color',
    caption,
    params,
    ...options,
  };
}

/**
 * Creates a nested form field
 */
export function createNestedField(
  id: string,
  caption: string,
  params: NestedFieldParams,
  options?: BaseFieldOptions
): Field {
  if (!params.formId) {
    throw new Error('Nested field must have a formId');
  }
  return {
    id,
    type: 'nested',
    caption,
    params,
    ...options,
  };
}

/**
 * Helper to create option objects for select/radio fields
 */
export function createOption(value: string | number, label: string): OptionObject {
  return { value, label };
}

/**
 * Helper to create multiple options at once
 */
export function createOptions(
  items: Array<string | { value: string | number; label: string }>
): OptionObject[] {
  return items.map((item) => {
    if (typeof item === 'string') {
      return { value: item, label: item };
    }
    return item;
  });
}

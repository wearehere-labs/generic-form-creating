/**
 * Generic Form Format v1.0 Type Definitions
 * Based on https://github.com/wearehere-labs/generic-form-format
 */

// Root form definition
export interface FormDefinition {
  version: string;
  formId: string;
  title?: string;
  description?: string;
  fields: Field[];
  dependencies?: Dependency[];
  functions?: Record<string, FunctionDef>;
  metadata?: Record<string, any>;
}

// Field types
export type FieldType =
  | 'text'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'date'
  | 'file'
  | 'email'
  | 'url'
  | 'password'
  | 'range'
  | 'color'
  | 'nested';

// Field definition
export interface Field {
  id: string;
  type: FieldType;
  caption: string;
  tooltip?: string;
  params: FieldParams;
  layout?: LayoutConfig;
  validation?: ValidationConfig;
  defaultValue?: any;
  disabled?: boolean;
  readonly?: boolean;
}

// Field parameters (union type)
export type FieldParams =
  | TextFieldParams
  | NumberFieldParams
  | CheckboxFieldParams
  | RadioFieldParams
  | SelectFieldParams
  | DateFieldParams
  | FileFieldParams
  | EmailFieldParams
  | URLFieldParams
  | PasswordFieldParams
  | RangeFieldParams
  | ColorFieldParams
  | NestedFieldParams;

export interface TextFieldParams {
  minLength?: number;
  maxLength?: number;
  multiline?: boolean;
  rtl?: boolean;
  pattern?: string;
  placeholder?: string;
}

export interface NumberFieldParams {
  required?: boolean;
  min?: number;
  max?: number;
  decimals?: number;
  step?: number;
}

export interface CheckboxFieldParams {
  required?: boolean;
}

export interface RadioFieldParams {
  required?: boolean;
  options?: string[] | OptionObject[];
  optionsFunction?: string;
}

export interface SelectFieldParams {
  required?: boolean;
  multiple?: boolean;
  options?: OptionObject[];
  optionsFunction?: string;
  searchable?: boolean;
  placeholder?: string;
}

export interface DateFieldParams {
  required?: boolean;
  includeTime?: boolean;
  minDate?: string;
  maxDate?: string;
  format?: string;
}

export interface FileFieldParams {
  required?: boolean;
  multiple?: boolean;
  maxSize?: number;
  acceptedTypes?: string[];
  acceptedMimeTypes?: string[];
}

export interface EmailFieldParams {
  required?: boolean;
  multiple?: boolean;
  placeholder?: string;
}

export interface URLFieldParams {
  required?: boolean;
  placeholder?: string;
}

export interface PasswordFieldParams {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumber?: boolean;
  requireSymbol?: boolean;
}

export interface RangeFieldParams {
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

export interface ColorFieldParams {
  required?: boolean;
  format?: 'hex' | 'rgb' | 'rgba' | 'hsl';
  defaultValue?: string;
}

export interface NestedFieldParams {
  formId: string;
  multiple?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export interface OptionObject {
  value: string | number;
  label: string;
}

// Layout configuration
export interface LayoutConfig {
  width?: WidthConfig;
  order?: number;
  row?: number;
  column?: number;
  span?: number;
}

export interface WidthConfig {
  mobile?: WidthValue;
  tablet?: WidthValue;
  desktop?: WidthValue;
  wide?: WidthValue;
}

export type WidthValue =
  | 'full'
  | '15/16'
  | '7/8'
  | '14/16'
  | '13/16'
  | '3/4'
  | '12/16'
  | '11/16'
  | '5/8'
  | '10/16'
  | '9/16'
  | '1/2'
  | '8/16'
  | '7/16'
  | '3/8'
  | '6/16'
  | '5/16'
  | '1/4'
  | '4/16'
  | '3/16'
  | '1/8'
  | '2/16'
  | '1/16';

// Validation configuration
export interface ValidationConfig {
  custom?: CustomValidation[];
  crossField?: CrossFieldValidation[];
}

export interface CustomValidation {
  rule: string;
  message: string;
  params?: Record<string, any>;
}

export interface CrossFieldValidation {
  fields: string[];
  rule: string;
  message: string;
}

// Dependencies
export interface Dependency {
  id?: string;
  sourceFieldId: string;
  condition: Condition;
  effects: Effect[];
}

export interface Condition {
  operator: ConditionOperator;
  value?: any;
  sourceFieldId?: string;
  conditions?: Condition[];
}

export type ConditionOperator =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'notContains'
  | 'greaterThan'
  | 'lessThan'
  | 'greaterThanOrEqual'
  | 'lessThanOrEqual'
  | 'isEmpty'
  | 'isNotEmpty'
  | 'matches'
  | 'in'
  | 'notIn'
  | 'and'
  | 'or'
  | 'not';

export interface Effect {
  targetFieldId: string;
  action: EffectAction;
  params?: Record<string, any>;
  value?: any;
}

export type EffectAction =
  | 'show'
  | 'hide'
  | 'enable'
  | 'disable'
  | 'require'
  | 'unrequire'
  | 'updateParams'
  | 'setValue'
  | 'clearValue';

// Functions
export interface FunctionDef {
  type: FunctionType;
  description?: string;
  params?: string[];
  returns?: string;
}

export type FunctionType = 'datasource' | 'validator' | 'transformer';

// Error types
export class FormCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FormCreationError';
  }
}

export class DuplicateFieldError extends Error {
  constructor(fieldId: string, message: string) {
    super(`Field ID "${fieldId}" already exists: ${message}`);
    this.name = 'DuplicateFieldError';
  }
}

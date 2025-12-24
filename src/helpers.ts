import {
  Dependency,
  Condition,
  Effect,
  ConditionOperator,
  EffectAction,
  FunctionDef,
  FunctionType,
} from './types';

/**
 * Creates a simple condition
 */
export function createCondition(
  operator: ConditionOperator,
  value?: any,
  sourceFieldId?: string
): Condition {
  return {
    operator,
    value,
    sourceFieldId,
  };
}

/**
 * Creates a compound condition (AND/OR)
 */
export function createCompoundCondition(
  operator: 'and' | 'or' | 'not',
  conditions: Condition[]
): Condition {
  return {
    operator,
    conditions,
  };
}

/**
 * Creates an effect
 */
export function createEffect(
  targetFieldId: string,
  action: EffectAction,
  params?: Record<string, any>,
  value?: any
): Effect {
  return {
    targetFieldId,
    action,
    params,
    value,
  };
}

/**
 * Creates a show effect
 */
export function showEffect(targetFieldId: string): Effect {
  return createEffect(targetFieldId, 'show');
}

/**
 * Creates a hide effect
 */
export function hideEffect(targetFieldId: string): Effect {
  return createEffect(targetFieldId, 'hide');
}

/**
 * Creates an enable effect
 */
export function enableEffect(targetFieldId: string): Effect {
  return createEffect(targetFieldId, 'enable');
}

/**
 * Creates a disable effect
 */
export function disableEffect(targetFieldId: string): Effect {
  return createEffect(targetFieldId, 'disable');
}

/**
 * Creates a require effect
 */
export function requireEffect(targetFieldId: string): Effect {
  return createEffect(targetFieldId, 'require');
}

/**
 * Creates an unrequire effect
 */
export function unrequireEffect(targetFieldId: string): Effect {
  return createEffect(targetFieldId, 'unrequire');
}

/**
 * Creates an update params effect
 */
export function updateParamsEffect(
  targetFieldId: string,
  params: Record<string, any>
): Effect {
  return createEffect(targetFieldId, 'updateParams', params);
}

/**
 * Creates a set value effect
 */
export function setValueEffect(targetFieldId: string, value: any): Effect {
  return createEffect(targetFieldId, 'setValue', undefined, value);
}

/**
 * Creates a clear value effect
 */
export function clearValueEffect(targetFieldId: string): Effect {
  return createEffect(targetFieldId, 'clearValue');
}

/**
 * Creates a dependency
 */
export function createDependency(
  sourceFieldId: string,
  condition: Condition,
  effects: Effect[],
  id?: string
): Dependency {
  return {
    id,
    sourceFieldId,
    condition,
    effects,
  };
}

/**
 * Creates a function definition
 */
export function createFunctionDef(
  type: FunctionType,
  options?: {
    description?: string;
    params?: string[];
    returns?: string;
  }
): FunctionDef {
  return {
    type,
    description: options?.description,
    params: options?.params,
    returns: options?.returns,
  };
}

/**
 * Creates a datasource function definition
 */
export function createDatasourceFunction(
  description?: string,
  params?: string[]
): FunctionDef {
  return createFunctionDef('datasource', {
    description,
    params,
    returns: 'array',
  });
}

/**
 * Creates a validator function definition
 */
export function createValidatorFunction(
  description?: string,
  params?: string[]
): FunctionDef {
  return createFunctionDef('validator', {
    description,
    params,
    returns: 'boolean',
  });
}

/**
 * Creates a transformer function definition
 */
export function createTransformerFunction(
  description?: string,
  params?: string[],
  returns?: string
): FunctionDef {
  return createFunctionDef('transformer', {
    description,
    params,
    returns,
  });
}

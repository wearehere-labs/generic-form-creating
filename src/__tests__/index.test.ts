import {
  createForm,
  addField,
  removeField,
  getField,
  updateField,
  createTextField,
  createNumberField,
  createSelectField,
  createOptions,
  toJSON,
  fromJSON,
  FormCreationError,
  DuplicateFieldError,
} from '../index';

describe('Form Creation', () => {
  test('createForm creates a valid form', () => {
    const form = createForm('test-form', {
      title: 'Test Form',
      description: 'A test form',
    });

    expect(form.formId).toBe('test-form');
    expect(form.version).toBe('1.0');
    expect(form.title).toBe('Test Form');
    expect(form.description).toBe('A test form');
    expect(form.fields).toEqual([]);
  });

  test('createForm throws error for empty formId', () => {
    expect(() => createForm('')).toThrow(FormCreationError);
  });

  test('createForm accepts custom version', () => {
    const form = createForm('test-form', { version: '2.0' });
    expect(form.version).toBe('2.0');
  });
});

describe('Field Management', () => {
  let form: any;

  beforeEach(() => {
    form = createForm('test-form');
  });

  test('addField adds a field to the form', () => {
    const field = createTextField('username', 'Username', {});
    form = addField(form, field);

    expect(form.fields).toHaveLength(1);
    expect(form.fields[0].id).toBe('username');
  });

  test('addField throws error for duplicate field with different content', () => {
    const field1 = createTextField('username', 'Username', { minLength: 3 });
    const field2 = createTextField('username', 'Username', { minLength: 5 });

    form = addField(form, field1);
    expect(() => addField(form, field2)).toThrow(DuplicateFieldError);
  });

  test('addField allows identical duplicate fields', () => {
    const field1 = createTextField('username', 'Username', { minLength: 3 });
    const field2 = createTextField('username', 'Username', { minLength: 3 });

    form = addField(form, field1);
    form = addField(form, field2);

    expect(form.fields).toHaveLength(1);
  });

  test('removeField removes a field from the form', () => {
    const field = createTextField('username', 'Username', {});
    form = addField(form, field);
    form = removeField(form, 'username');

    expect(form.fields).toHaveLength(0);
  });

  test('getField returns the correct field', () => {
    const field = createTextField('username', 'Username', {});
    form = addField(form, field);

    const retrieved = getField(form, 'username');
    expect(retrieved).toEqual(field);
  });

  test('getField returns undefined for non-existent field', () => {
    const retrieved = getField(form, 'nonexistent');
    expect(retrieved).toBeUndefined();
  });

  test('updateField updates a field', () => {
    const field = createTextField('username', 'Username', { minLength: 3 });
    form = addField(form, field);
    form = updateField(form, 'username', {
      params: { minLength: 5, maxLength: 20 },
    });

    const updated = getField(form, 'username');
    expect(updated?.params).toEqual({ minLength: 5, maxLength: 20 });
  });

  test('updateField throws error for non-existent field', () => {
    expect(() => updateField(form, 'nonexistent', { caption: 'New Caption' }))
      .toThrow(FormCreationError);
  });
});

describe('Field Creation', () => {
  test('createTextField creates a valid text field', () => {
    const field = createTextField('bio', 'Biography', {
      minLength: 10,
      maxLength: 500,
      multiline: true,
    });

    expect(field.type).toBe('text');
    expect(field.id).toBe('bio');
    expect(field.caption).toBe('Biography');
    expect(field.params).toEqual({
      minLength: 10,
      maxLength: 500,
      multiline: true,
    });
  });

  test('createNumberField creates a valid number field', () => {
    const field = createNumberField('age', 'Age', {
      required: true,
      min: 18,
      max: 120,
    });

    expect(field.type).toBe('number');
    expect(field.params).toMatchObject({
      required: true,
      min: 18,
      max: 120,
    });
  });

  test('createSelectField creates a valid select field', () => {
    const field = createSelectField('interests', 'Interests', {
      multiple: true,
      options: createOptions(['Sports', 'Music', 'Art']),
    });

    expect(field.type).toBe('select');
    expect((field.params as any).multiple).toBe(true);
    expect((field.params as any).options).toHaveLength(3);
  });

  test('createSelectField throws error without options', () => {
    expect(() => 
      createSelectField('test', 'Test', {} as any)
    ).toThrow();
  });
});

describe('Options Helper', () => {
  test('createOptions creates options from strings', () => {
    const options = createOptions(['Option 1', 'Option 2', 'Option 3']);

    expect(options).toEqual([
      { value: 'Option 1', label: 'Option 1' },
      { value: 'Option 2', label: 'Option 2' },
      { value: 'Option 3', label: 'Option 3' },
    ]);
  });

  test('createOptions preserves objects', () => {
    const options = createOptions([
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' },
    ]);

    expect(options).toEqual([
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' },
    ]);
  });

  test('createOptions handles mixed input', () => {
    const options = createOptions([
      'Simple Option',
      { value: 'custom', label: 'Custom Option' },
    ]);

    expect(options).toEqual([
      { value: 'Simple Option', label: 'Simple Option' },
      { value: 'custom', label: 'Custom Option' },
    ]);
  });
});

describe('JSON Conversion', () => {
  test('toJSON converts form to JSON string', () => {
    const form = createForm('test-form', { title: 'Test' });
    const json = JSON.parse(toJSON(form));

    expect(json.formId).toBe('test-form');
    expect(json.title).toBe('Test');
  });

  test('fromJSON parses JSON string to form', () => {
    const original = createForm('test-form', { title: 'Test' });
    const jsonString = toJSON(original);
    const parsed = fromJSON(jsonString);

    expect(parsed.formId).toBe('test-form');
    expect(parsed.title).toBe('Test');
  });
});

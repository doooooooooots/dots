import { isEmpty } from 'lodash';
import { SchemaLike } from 'yup/lib/types';
import { Field, FieldDefinitions } from '../types/field';

export interface FormSectionType<T extends string> {
  primary: string;
  secondary: string;
  description?: string;
  fields: {
    [key in T]?: { col?: number };
  };
}

export type FormDefinition<T extends string> = Record<
  string,
  FormSectionType<T>
>;

export type FormApiType<T extends string> = {
  form: unknown;
  getValidation: () =>
    | Record<T, SchemaLike | undefined>
    | Record<string, never>;
  getDefaultValues: () => Record<T, unknown> | Record<string, never>;
};

/**
 * Creates validations and defaultValue  object
 */
export default function createFormApi<T extends string>(
  form: FormDefinition<T>,
  fields: FieldDefinitions<T>
): FormApiType<T> {
  if (!form)
    return {
      form: {},
      getValidation: () => ({}),
      getDefaultValues: () => ({}),
    };

  /**
   * [ ] Get validation from fragment only
   * For each fields of a form, get it's validation
   * and defaultValue and constitute an object
   */
  const validations = Object.values(form).reduce<
    Record<T, SchemaLike | undefined>
  >((acc, section) => {
    /**
     * For each section
     */
    Object.entries(section.fields).forEach(([fieldName, fieldParams]) => {
      const _fieldName = fieldName as T;

      if (!(_fieldName in fields)) {
        throw Error('Form contains a field which is not declared in Entity');
      }

      if (isEmpty(fields[_fieldName].validation)) return acc;
      acc[_fieldName] = fields[fieldName as T].validation;
    });
    return acc;
  }, {} as Record<T, SchemaLike | undefined>);

  /**
   * Get all default values, so we can instanciate all ...
   * ... datas in form event the ones we don't ask to user
   */
  const defaultValues = Object.entries(fields).reduce<Record<T, unknown>>(
    (acc, [fieldName, field]) => ({
      ...acc,
      [fieldName]: (field as Field).defaultValue,
    }),
    {} as Record<T, unknown>
  );

  return {
    form: form,
    getValidation: () => validations,
    getDefaultValues: () => defaultValues,
  };
}

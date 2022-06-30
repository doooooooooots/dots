/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from '@apollo/client';
import { isEmpty } from 'lodash';
import { Field } from '../types/field';
import { FragmentType } from './create-fragment-api';

export default function createColumnApi<T extends string>(
  fragments: FragmentType,
  fields: Record<T, Field>
) {
  /**
   * Extract all columns from fragments
   */
  const getColumnsFromFragment = (fragment: string): Field[] => {
    return gql(`{ Entity {${fragments[fragment]}}}`)
      .definitions[0].selectionSet.selections[0].selectionSet.selections.reduce(
        (acc: Field[], item: any) => {
          const fieldName = item.name.value as T;
          const field = fields[fieldName];

          if (!isEmpty(item.selectionSet) && !field?.valueGetter) return acc;
          if (!(fieldName in fields)) return acc;

          const { label } = field;

          return [
            ...acc,
            {
              ...field,
              field: fieldName,
              headerName: label,
            },
          ];
        },
        [] as Field[]
      )
      .filter((item: Field) => item);
  };

  return {
    getColumnsFromFragment,
  };
}

import { FIELD_TYPES } from '@dots.cool/tokens';
import { isEmpty } from 'lodash';
import { Field } from '../types/field';

export type FragmentApiArgs = FragmentType | undefined;

export type FragmentType = {
  details: string;
  preview?: string;
  single?: string;
};

const defaultFragment = {
  details: '',
  preview: '',
  single: '',
};

const regex = /fragment::([^\s]*)/g;

export default function createFragmentApi(
  fragments: FragmentType,
  fields: {
    [key in string]: Field;
  }
): FragmentType {
  /**
   * If no Fragments are defined, take all native fields of entity
   */
  if (isEmpty(fragments)) {
    const allFields = Object.entries(fields).reduce(
      (acc, [fieldName, field]) => {
        if (
          ![FIELD_TYPES.select, FIELD_TYPES.relationship].includes(field.type)
        )
          acc.push(fieldName);
        return acc;
      },
      [] as string[]
    );

    return {
      details: allFields.join(' '),
      preview: allFields.join(' '),
      single: allFields.join(' '),
    };
  }

  /**
   * Else replace frgament by its parts
   */

  if (!fragments.details) {
    throw Error('Fragment required details attribute to be defined');
  }
  const _fragments = {
    ...defaultFragment,
    ...fragments,
  };

  // ! User are only allowed to extend detail fragment
  // FIXME(Adrien): Recursive logic needed
  return Object.entries(_fragments).reduce<FragmentType>(
    (acc, [key, value]) => {
      if (key === 'details') return { ...acc, [key]: value };

      if (!value) return { ...acc, [key]: _fragments.details };

      if (value.includes('fragment::')) {
        const found = value.match(regex);
        if (found && found.length > 0) {
          // For each frament extension
          found.forEach((fragment) => {
            console.log(fragment);
            const _key = fragment.split('::').pop() as keyof FragmentType;
            value = value.replace(fragment, _fragments[_key] || '');
          });
        }
      }
      return { ...acc, [key]: value };
    },
    {
      details: '',
      preview: '',
      single: '',
    }
  );
}

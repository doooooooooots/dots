import { useFetch } from '@dots.cool/hooks';
import { toKebabCase } from 'js-convert-case';

function useEnum(enumName, query = 'options') {
  let request;
  switch (query) {
    case 'options':
      request = '/options';
      break;
    case 'index':
      request = '';
      break;
    default:
      request = `/${query}`;
  }

  const { data, loading, error } = useFetch(
    enumName && `/api/constants/${toKebabCase(enumName)}${request}`
  );

  if (!enumName)
    return { data: [], loading: false, error: ['Enum name is missing'] };

  return { data, loading, error };
}

export default useEnum;

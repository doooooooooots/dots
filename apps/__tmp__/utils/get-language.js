import { isString } from 'lodash';
import { ABBREVIATION_LANGUAGES, LANGUAGES } from '../enums/languages';

export function getLanguageCode(id) {
  if (!id) return 'tt';
  let input = parseInt(id, 10);
  if (isNaN(input)) {
    input = id.toLowerCase();
    if (input === 'gb') return 'en';
    return input === 'd' ? 'de' : input;
  }
  const inputId = parseInt(id, 10);
  const outputCode = ABBREVIATION_LANGUAGES[inputId];
  if (outputCode === 'gb') return 'en';
  return outputCode ?? inputId;
}

export function getLanguageId(code) {
  if (!code) return 'tt';
  if (!isString(code)) return code;
  const inputCode = code.toLowerCase();
  const outputId = LANGUAGES.indexOf(inputCode);
  return outputId === -1 ? inputCode : outputId;
}

export const getLanguageOrder = (lang) => {
  switch (lang) {
    case '2':
      return 1;
    case '1':
      return 2;
    default:
      return 3;
  }
};

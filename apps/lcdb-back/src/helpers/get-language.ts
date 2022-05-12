import { isString } from 'lodash';

export const ABBREVIATION_LANGUAGES = [
  'unknown',
  'gb', // 1 - England
  'fr', // 2 - France
  'de', // 3 - Germany
  'es', // 4 - Spain
  'it', // 5 - Italy
  'cn', // 6 - China
  'jp', // 7 - Japan
  'pt', // 8 - Portugal
  'ru', // 9 - Russia
  'kp', // 10 - Korea
  'tw', // 11 - Taiwan
  'lu', // 12 - Luxembourg
  'pl', // 13 - Poland
  'cz', // 14 - Czech Republic
  'hu', // 15 - Hungary
  'eu' // Europe
];

export const LANGUAGES = [
  { idMkm: '1', name: 'English', code: 'en' },
  { idMkm: '2', name: 'French', code: 'fr' },
  { idMkm: '3', name: 'German', code: 'de' },
  { idMkm: '4', name: 'Spanish', code: 'es' },
  { idMkm: '5', name: 'Italian', code: 'it' }
];

export function getLanguageCode(id:any) {
  if (!id) return 'tt';
  let input:any = parseInt(id, 10);
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
  const inputCode:any = code.toLowerCase();
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

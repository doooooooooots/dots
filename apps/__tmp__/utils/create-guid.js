import { isString } from 'lodash';
import { CONDITIONS } from '../enums/conditions';

const regex = /^(\([^)]*\)[^[]*\[[^\]]*])/;
const trueValue = ['True', 't', 1, '1', 'true', true, 'TRUE', 'T'];

const condID = (condition) => {
  return CONDITIONS.indexOf(condition);
};
[];

const getFirstSymbol = (isFirst) => {
  if (isString(isFirst)) return trueValue.includes(isFirst) ? 't' : 'f';
  return isFirst ? 't' : 'f';
};

export const extractStorageCodeFromComment = (comment) => {
  let storageBox = '(xx)UNK[xx]';
  const match = comment.match(regex);
  if (match && match.length > 1) {
    storageBox = match[1];
  } else if (comment.slice(0, 4).includes('CGC')) {
    storageBox = `(00)${comment.replaceAll('-', '/').split(' ').join('/')}`;
  } else if (comment.slice(0, 4).includes('Y C')) {
    storageBox = `(00)${comment.replaceAll('-', '/').split(' ').join('/')}`;
  }
  return storageBox.toUpperCase();
};

export function createGuidFromSvet(item) {
  let comment = item.comments_special_ad;
  if (['Null', null, 'NULL', undefined].includes(comment)) {
    comment = item.comments_special_cm;
  }
  if (['Null', null, 'NULL', undefined].includes(comment)) {
    comment = item.comments;
  }
  const storageCode = extractStorageCodeFromComment(comment);
  const guid = `${storageCode}-${item.abbreviation}-${condID(item.condition)}${item.condition}-${
    item.language_id
  }-${getFirstSymbol(item.is_first_ed)}-${item.product_id}`;

  return guid.toUpperCase();
}

export function createGuidFromHeroku(item) {
  let comment = item.comments_special_ad;
  if (['Null', null, 'NULL', undefined].includes(comment)) {
    comment = item.comments_special_cm;
  }
  if (['Null', null, 'NULL', undefined].includes(comment)) {
    comment = item.comments;
  }
  const storageCode = extractStorageCodeFromComment(comment);
  const guid = `${storageCode}-${item.expansion}-${condID(item.condition)}${item.condition}-${
    item.language_id
  }-${getFirstSymbol(item.is_first_ed)}-${item.product_id}`;

  return guid.toUpperCase();
}

export function createGuidFromMKMItem(item) {
  let comment = item.Comments;
  const storageCode = extractStorageCodeFromComment(comment);
  const guid = `${storageCode}-${item['Exp.']}-${condID(item.Condition)}${item.Condition}-${
    item.Language
  }-${getFirstSymbol(item['FirstEd?'])}-${item.idProduct}`;

  return guid.toUpperCase();
}

export function createGuidFromArticle(article) {
  const { condition, languageId, storageBoxId, isFirstEd, productId } = article;
  const guid = `${storageBoxId}-${productId}-${condID(condition)}${condition}-${languageId}-${getFirstSymbol(
    isFirstEd
  )}`;
  return guid.toUpperCase();
}

export const makeInventoryGUID = (item) => {
  return `${parseInt(item.product_id, 10)}-${item.condition}-${item.language_id}-${item.is_first_ed}`;
};

export const makeStockGUID = (item) => {
  const is_first = trueValue.includes(item.is_first_ed) ? 't' : 'f';
  return `${item.product_id}-${item.condition}-${item.language_id}-${is_first}`;
};

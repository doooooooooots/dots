import { isEmpty, isFunction, isArray } from 'lodash';
import { getLanguageCode } from '@utils/get-language';

const flattenObject = (item) => {
  const { id, sellerCountry, price, isCommercial, sellerType, condition, languageId, isFirstEd, expansion } = item;

  const _sellerId = item.seller?.idUser || null;
  const _sellerCountry = item.seller?.address?.country || sellerCountry;
  const _sellerType = item.seller?.isCommercial ?? isCommercial ?? sellerType;
  const _languageId = item.language?.idLanguage ?? languageId;
  const _expansion = item.expansion?.abbreviation ?? expansion;

  return {
    id,
    sellerId: parseInt(_sellerId, 10),
    sellerCountry: getLanguageCode(_sellerCountry),
    sellerType: _sellerType,
    expansion: _expansion,
    languageId: getLanguageCode(_languageId),
    condition,
    isFirstEd: !!isFirstEd,
    price
  };
};

// *Test all criterias
const filterArticles = (list = [], filters = {}, stats = {}, customFilter = null) => {
  if (isEmpty(list)) return list;

  const {
    sellerCountryIn = [],
    sellerTypeIn = [],
    conditionIn = [],
    languageIdIn = [],
    expansionIn = [],
    onlyAbberation = null,
    isFirstEd = null
  } = filters || {};

  const { mean = null, max = null, beforeMax = null, before2Max = null } = stats || {};

  return list.filter((_item) => {
    let doPrint = true;
    let item = flattenObject(_item);

    // *Seller Country
    if (sellerCountryIn.length) {
      if (sellerCountryIn.length !== 2) {
        const country = item.sellerCountry !== 'fr' ? 'eu' : 'fr';
        doPrint *= sellerCountryIn.includes(country);
      }
    }

    // *Seller Type
    if (sellerTypeIn.length) {
      if (sellerTypeIn.length !== 3) {
        doPrint *= sellerTypeIn.includes(item.sellerType);
      }
    }

    // *Article conditionIn
    if (conditionIn.length) {
      if (conditionIn.length !== 6) {
        const condition = item.condition === 'MT' ? 'NM' : item.condition;
        doPrint *= conditionIn.includes(condition);
      }
    }

    // *Article languageIdIn
    if (languageIdIn.length && languageIdIn.length !== 3) {
      const language = ['fr', 'gb'].includes(item.languageId) ? item.languageId : 'eu';
      doPrint *= languageIdIn.includes(language);
    }

    // *Expansion
    if (expansionIn && expansionIn.length) {
      if (item.expansion) {
        if (isArray(expansionIn)) {
          doPrint *= expansionIn.includes(item.expansion);
        } else {
          doPrint *= item.expansion.toLowerCase().includes(expansionIn.toLowerCase());
        }
      } else {
        doPrint = 0;
      }
    }

    // *Article edition
    if (isFirstEd !== null) {
      doPrint *= isFirstEd === item.isFirstEd;
    }

    // *Price abberation
    if (!isEmpty(stats) && onlyAbberation !== null) {
      let isAbberation = false;

      if (item.price >= 17.5 * mean) {
        isAbberation = true;
      }

      if (item.price === max) {
        if (max >= 20 * beforeMax) {
          isAbberation = true;
        }
        if (item.price >= 300) {
          isAbberation = true;
        }
      }

      if (item.price === beforeMax) {
        if (beforeMax > 30 * before2Max) {
          isAbberation = true;
        }
      }
      doPrint *= onlyAbberation ? isAbberation : !isAbberation;
    }
    if (isFunction(customFilter)) {
      doPrint *= customFilter(item);
    }
    return doPrint;
  });
};

export default filterArticles;

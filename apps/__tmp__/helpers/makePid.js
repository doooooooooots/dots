import cyrb53 from '../utils/cryb-53';
import { toKebabCase } from 'js-convert-case';

export const makeProductPid = (gameCode, expansionAbbr, number) => {
  const pid = `${gameCode}-${expansionAbbr}-${number}`;
  return `${cyrb53(pid)}`;
};

export const makeArticlePid = (productPid, conditionCode, languageCode, isFirstEd, isReverseHolo) => {
  const pid = `${productPid}-${conditionCode}-${languageCode}-${isFirstEd ? 'T' : 'F'}-${isReverseHolo ? 'T' : 'F'}`;
  return `${cyrb53(pid)}`;
};

export const makeStockUnitPid = (articlePid, storageName) => {
  const pid = `${articlePid}-${storageName}`;
  return `${cyrb53(pid)}`;
};

export const makeOfferPid = (plateformPid, stockUnitPid) => {
  return `${plateformPid}-${stockUnitPid}`;
};

export const makeOrderPid = () => {
  return ``;
};

export const makeStoragePid = (storageName) => {
  return `${toKebabCase(storageName)}`;
};

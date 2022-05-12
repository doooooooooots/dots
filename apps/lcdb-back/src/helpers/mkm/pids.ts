import cyrb53 from '../../utils/cryb-53';
import { toKebabCase } from 'js-convert-case';

export const makeArticlePid = (
  productPid: string | number,
  conditionCode: string,
  langueId: string | number,
  isFirstEd: boolean,
  isReverseHolo: boolean = false
): string => {
  const pid = `${productPid}-${conditionCode}-${langueId}-${isFirstEd ? 'T' : 'F'}-${isReverseHolo ? 'T' : 'F'}`;
  return `${cyrb53(pid)}`;
};

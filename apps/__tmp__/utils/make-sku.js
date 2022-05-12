import { CONDITIONS_BY_CODE } from '@enums/conditions';
import { RARITIES_BY_VALUE } from '@enums/rarities';

export const makeSku = (item, group) => {
  let rarity = null;
  const condition = CONDITIONS_BY_CODE[item.conditionCode];
  const cond = `${condition.value}${condition.code}`;

  switch (group) {
    case 1:
      return `${item.storageName}-${item.abbreviation}-${item.numberText}-${cond}-${item.isFirstEd}-${item.languageId}`;
    case 3:
      rarity = RARITIES_BY_VALUE[item.rarityValue];
      return `${item.storageName}-${item.dateRelease}-${item.abbreviation}-${rarity.group}-${item.numberText}-${cond}-${item.isFirstEd}-${item.languageId}`;
    case 4:
      return `${item.storageName}-${item.abbreviation}-${cond}-${item.numberText}-${item.isFirstEd}-${item.languageId}`;
    case 5:
      rarity = RARITIES_BY_VALUE[item.rarityValue];
      return `${item.storageName}-${item.abbreviation}-${rarity.group}-${item.numberText}-${cond}-${item.isFirstEd}-${item.languageId}`;
    default:
      return;
  }
};

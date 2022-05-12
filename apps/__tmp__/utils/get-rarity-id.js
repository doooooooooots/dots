import { RARITIES } from '../enums/rarities';

export default function getRarityId(rarityName) {
  const id = RARITIES.indexOf(rarityName);
  return id === -1 ? 20 : id;
}

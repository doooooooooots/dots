export default function toBddArray(item, appStore) {
  return {
    productId: item.idProduct,
    nameFr: item.name_fr,
    condition: item.condition,
    expansion: appStore.expansion.abbreviation,
    gameId: 3,
    count: parseInt(item.count, 10),
    languageId: ['en', 'gb', 1].includes(item.language) ? 1 : 2,
    isFirstEd: !!item.isFirstEd,
    number: item.number,
    numberText: item.number_text,
    comments: appStore.comments || '',
    operator: appStore.operator
  };
}

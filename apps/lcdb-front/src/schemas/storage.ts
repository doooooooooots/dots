const text = (args) => {
  return '';
};
const relationship = (args) => {
  return '';
};
const checkbox = (args) => {
  return '';
};
const integer = (args) => {
  return '';
};
const list = (args) => {
  return '';
};

export const Storage = list({
  fields: {
    name: text({ isIndexed: 'unique' }),
    game: relationship({ ref: 'Game', many: false }),
    stockUnits: relationship({ ref: 'StockUnit', many: true }),
    expansions: relationship({ ref: 'Expansion', many: true }),
  },
  withCreateTracker: true,
  withUpdateTracker: true,
});

export const StockUnit = list({
  fields: {
    quantity: integer({
      defaultValue: 0,
      access: {
        update: () => false,
      },
    }),
    quantityVariations: relationship({
      ref: 'StockUnitQuantity.stockUnit',
      many: true,
    }),
    article: relationship({ ref: 'Article.stockUnits', many: false }),
    storage: relationship({ ref: 'Storage.stockUnits', many: false }),
    offers: relationship({ ref: 'Offer.stockUnit', many: true }),
  },
});

const schemas = {
  Storage,
  StockUnit,
};

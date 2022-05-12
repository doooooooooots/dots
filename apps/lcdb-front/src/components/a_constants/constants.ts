const storage = {
  singular: 'storage',
  plurial: 'storages',
  defaultQuery: 'id name game {id name}',
};

const stockUnit = {
  singular: 'stockUnit',
  plurial: 'stockUnits',
  defaultQuery: `
    id
    quantity
    article {
      product {
        number
        expansion {
          abbreviation
        }
        locals( where: { language: { code: { equals: $lang } } }) {
          name
        }
        image {
          url
        }
      }
      language {
        code
      }
      condition {
        code
      }
      isFirstEd
    }
    offers {
      id
    }
    offersCount
  `,
};

const product = {
  singular: 'product',
  plurial: 'products',
  defaultQuery: 'id',
};

const article = {
  singular: 'article',
  plurial: 'articles',
  defaultQuery: 'id',
};

const category = {
  singular: 'category',
  plurial: 'categories',
  defaultQuery: 'id',
};

const ENTITIES = {
  storage,
  stockUnit,
  product,
  article,
  category,
};

export default ENTITIES;

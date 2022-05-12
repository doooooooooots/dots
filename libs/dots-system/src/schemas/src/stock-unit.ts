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
export default stockUnit;

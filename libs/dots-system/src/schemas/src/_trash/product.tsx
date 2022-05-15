const PRODUCT_COLUMNS = `
  id: ID!
  status: String
  number: String
  website: String
  countSells: Int
  priceStrategy: Int
  image: MediaObject
  expansion: Expansion
  productModel: ProductModel
  category: Category
  rarity: Rarity

  locals(...): [ProductLocal!]
  localsCount(...): Int
  links(...): [Link!]
  linksCount(...): Int
  articles(...): [Article!]
  articlesCount(...): Int
  reconciliations(...): [ProductReconciliation!]
  reconciliationsCount(...): Int
`;

export default PRODUCT_COLUMNS;

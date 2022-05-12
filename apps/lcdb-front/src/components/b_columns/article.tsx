const article = `
  id: ID!
  status: String
  product: Product
  condition: Condition
  language: Language
  updatedAt: DateTime
  updatedBy: Person
  isSigned: Boolean
  isFirstEd: Boolean
  isAltered: Boolean
  isFoil: Boolean
  isReverseHolo: Boolean
  isPlayset: Boolean
  priceSuggested(...): [Price!]
  priceSuggestedCount(...): Int
  stockUnits(...): [StockUnit!]
  stockUnitsCount(...): Int
  reconciliations(...): [ArticleReconciliation!]
  reconciliationsCount(...): Int
  aggregateCount(...): Int
`;

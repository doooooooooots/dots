import { list } from "@keystone-6/core";
import { relationship, text, integer } from "@keystone-6/core/fields";

export const Rarity = list({
  fields: {
    name: text({ isIndexed: 'unique' }),
    value: integer({ isIndexed: 'unique' }),
    group:integer(),
    products: relationship({ ref: 'Product.rarity', many: true }),
  },
})
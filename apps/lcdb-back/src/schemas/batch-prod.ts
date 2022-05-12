import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";

export const BatchProd = list({
  fields: {
    name: text(),
    articles: relationship({ ref: 'Article', many: true }),
  },
})
import { list } from "@keystone-6/core";
import { integer, relationship, text, timestamp } from "@keystone-6/core/fields";

export const Batch = list({
  fields: {
    condition: text(),
    expansion: text(),
    time: integer(),
    article_number: integer(),
    createdAt: timestamp(),
    updatedAt: timestamp(),
    operator: relationship({ ref: 'Person', many: false }),
  },
})
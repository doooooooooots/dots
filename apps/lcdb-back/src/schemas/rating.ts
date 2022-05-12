import { list } from "@keystone-6/core";
import { relationship, integer } from "@keystone-6/core/fields";

export const Rating = list({
  fields: {
    value: integer(),
    author: relationship({ ref: 'Person.ratings', many: false }),
  },
})
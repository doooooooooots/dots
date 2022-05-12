import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";

export const MediaObject = list({
  fields: {
    typeOf: text(),
    extension: text(),
    name: text(),
    description: text(),
    alt: text(),
    url: text(),
    backlinks: relationship({ ref: 'Link', many: true }),
  },
})


import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";
import { mediaObject } from './fields/media-object';

export const ProductLocal = list({
  fields: {
    language: relationship({ ref: 'Language', many: false }),
    name: text(),
    image: mediaObject()
  },
})
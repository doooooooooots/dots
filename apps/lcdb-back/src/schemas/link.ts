import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";

export const Link = list({
  fields: {
    targetId: text(),
    targetType: text(),
    targetField: text(),
  },
})
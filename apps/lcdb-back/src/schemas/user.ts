import { list } from "@keystone-6/core";
import { password, relationship, text } from "@keystone-6/core/fields";

export const User = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      isFilterable: true,
    }),
    password: password({ validation: { isRequired: true } }),
    profile: relationship({ ref: 'Person.account', many: false }),
  },
  ui: {
    listView: {
      initialColumns: ['email'],
    },
  },
});
import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";

export const Person = list({
  fields: {
    // TODO(Adrien): Add unique logic scoping each workspace
    pid: text({ isIndexed: true }),
    familyName: text({ validation: { isRequired: false } }),
    givenName: text({ validation: { isRequired: false } }),
    email: text({ validation: { isRequired: false } }),
    account: relationship({ ref: 'User.profile', many: false }),
    ratings: relationship({ ref: 'Rating.author', many: true }),
    actions: relationship({ ref: 'Action.agent', many: true }),
  },
  ui: {
    listView: {
      initialColumns: ['familyName', 'givenName', 'email'],
    },
  },
});
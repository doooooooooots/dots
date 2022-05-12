import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';

export const ExpansionLocal = list({
  fields: {
    name: text(),
    imageToken: text(),
    language: relationship({ ref: 'Language', many: false }),
    expansion: relationship({ ref: 'Expansion.locals', many: false }),
  }
});

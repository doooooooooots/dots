import { list } from '@keystone-6/core';
import { relationship, text, integer } from '@keystone-6/core/fields';

export const Condition = list({
  fields: {
    name: text(),
    value: integer({ isIndexed: 'unique' }),
    code: text({ isIndexed: 'unique' }),
    articles: relationship({ ref: 'Article.condition', many: true })
  }
});

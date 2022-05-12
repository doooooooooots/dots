import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';

export const ArticleReconciliation = list({
  fields: {
    plateform: relationship({ ref: 'Plateform.articles', many: false }),
    articleId: relationship({ ref: 'Article.reconciliations', many: false }),
    localPid: text()
  }
});

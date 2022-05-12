import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';

export const ExpansionReconciliation = list({
  fields: {
    plateform: relationship({ ref: 'Plateform.expansions', many: false }),
    expansionId: relationship({ ref: 'Expansion.reconciliations', many: false }),
    localPid: text()
  }
});

import { list } from "@keystone-6/core";
import { float, relationship } from "@keystone-6/core/fields";
import { trackerCreate } from './fields/tracker-create';

export const Price = list({
  fields: {
    value: float(),
    currency: relationship({ref:'Currency', many: false}),
    ...trackerCreate
  },
})
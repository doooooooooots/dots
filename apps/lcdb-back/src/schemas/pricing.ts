import { list } from "@keystone-6/core";
import { relationship } from "@keystone-6/core/fields";

export const Pricing = list({
  fields: {
    prices: relationship({ref:'Price', many: true}),
    countries: relationship({ref:'Country', many: true}),
    zones: relationship({ref:'CountryGroup', many: true}),
  },
})
import { list } from "@keystone-6/core";
import { integer, text, relationship } from "@keystone-6/core/fields";

export const Currency = list({
  fields: {
    name: text(),
    namePlural: text(),
    code: text({isIndexed:'unique'}),
    symbol:text(),
    symbolNative:text(),
    decimalDigits:integer(),
    countries: relationship({ ref: 'Country.currencies', many: true }),
  },
})
import { list } from "@keystone-6/core";
import { integer, relationship, text } from "@keystone-6/core/fields";

export const Country = list({
  fields: {
    name: text({isIndexed:'unique'}),
    native: text(),
    code: text({isIndexed:'unique'}),
    phone: integer(),
    capital: text(),
    currencies: relationship({ ref: 'Currency.countries', many: true }),
    languages: relationship({ ref: 'Language', many: true }),
    emoji: text(),
    emojiU: text()
  }
})
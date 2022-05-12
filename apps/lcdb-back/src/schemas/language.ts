import { list } from "@keystone-6/core";
import { text, checkbox } from "@keystone-6/core/fields";

export const Language = list({
  fields: {
    name: text(),
    code: text({isIndexed:'unique'}),
    native: text(),
    rtl: checkbox({defaultValue: false,}),
    idMkm:text({isIndexed: true})
  },
})
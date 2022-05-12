import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";

export const ProductModel = list({
  fields: {
    name: text(),
    products: relationship({ ref: 'Product.productModel', many: true }),
    game: relationship({ ref: 'Game.productModels', many: false }),
    idMkm:text({isIndexed: 'unique'}),
  },
})
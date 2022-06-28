import entity from '../../utils/entity';
import text from '../../fields/atoms/text/text';
import length3D from '../../fields/molecules/length-3d/length-3d';

const Product = entity({
  singular: 'product',
  fields: {
    name: text({
      label: 'Nom',
    }),
    ...length3D({ z: 'Epaisseur' }),
  },
  filters: {
    default: {
      name: 'nom',
      query: ['name'],
      filterAttributes: ['name'],
      getters: {
        primary: (option) => `${option.name}`,
        secondary: (option) => `${option.name}`,
        info: (option) => `${option.name}`,
      },
    },
  },
});

export default Product;

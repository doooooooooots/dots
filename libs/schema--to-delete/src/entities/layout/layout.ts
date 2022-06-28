import relationship from '../../fields/atoms/relationship/relationship';
import entity from '../../utils/entity';
import text from '../../fields/atoms/text/text';
import checkbox from '../../fields/atoms/checkbox/checkbox';
import json from '../../fields/atoms/json/json';
import select from '../../fields/atoms/select/select';
import dimension2D from '../../fields/molecules/dimension-2d/dimensions-2d';
import lengthX from '../../fields/molecules/length-x/length-x';
import lengthY from '../../fields/molecules/length-y/length-y';

const Layout = entity({
  singular: 'layout',
  fields: {
    name: text({
      label: 'Nom',
    }),
    alignment: select({
      label: 'Alignement',
      options: 'Alignment',
    }),
    solarEdge: checkbox({
      label: 'Solar edge ?',
    }),
    comments: json({
      label: 'Commentaires',
    }),
    moduleQuantity: json({
      label: 'numberOfLines',
    }),
    moduleMapping: json({
      label: 'numberOfLines',
    }),
    overrideMassBalance: json({
      label: 'override',
    }),
    pdf: relationship({
      label: 'Pdf',
      options: 'MediaObject', // should be ref
    }),
    product: relationship({
      label: 'Produit',
      options: 'Product', // should be ref
    }),
    roof: relationship({
      label: 'Toiture',
      options: 'Roof', // should be ref
    }),
    numberOfColumns: lengthX('Nbre colonnes'),
    numberOfLines: lengthY('Nbre rangées'),
    ...dimension2D('offset'),
    ...dimension2D('moduleSpaceBetween', 'Ecart Module'),
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
  templates: {},
});

export default Layout;

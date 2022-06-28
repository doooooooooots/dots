import entity from '../../utils/entity';
import text from '../../fields/atoms/text/text';
import number from '../../fields/atoms/float/float';
import select from '../../fields/atoms/select/select';
import integer from '../../fields/atoms/integer/integer';
import color from '../../fields/atoms/color/color';
import length3D from '../../fields/molecules/length-3d/length-3d';

const Cladding = entity({
  singular: 'cladding',
  fields: {
    name: text({
      label: 'Nom',
    }),
    color: color({
      label: 'Nom',
    }),
    numberOfWaves: integer({
      label: "Nombre d'ondes",
    }),
    thickness: number({
      label: 'Epaisseur',
    }),
    waveBaseWidth: number({
      label: 'purlinThickness',
    }),
    waveTopWidth: number({
      label: 'incline',
    }),
    material: select({
      label: 'material',
      options: 'material',
    }),
    ...length3D({ z: "Hauteur d'onde" }),
  },
  filters: {
    default: {
      name: 'prénom, nom',
      query: ['name', 'color', 'numberOfWaves'],
      filterAttributes: ['name', 'material'],
      getters: {
        primary: (option) => `${option.name}`,
        secondary: (option) => `${option.color}`,
        info: (option) => `${option.name} ${option.name}`,
      },
    },
  },
  templates: {},
});

export default Cladding;

import entity from '../../utils/entity';
import text from '../../fields/atoms/text/text';
import number from '../../fields/atoms/float/float';
import select from '../../fields/atoms/select/select';
import length3D from '../../fields/molecules/length-3d/length-3d';

const SolarModule = entity({
  singular: 'solarModule',
  fields: {
    name: text({
      label: 'Nom',
    }),
    sku: text({
      label: 'Purlin type',
    }),
    frameType: select({
      label: 'Type de cadre',
      options: 'FrameType',
    }),
    electricalPower: number({
      label: 'Puissance éléctrique',
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

export default SolarModule;

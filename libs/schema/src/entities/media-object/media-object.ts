import entity from '../../utils/entity';
import text from '../../fields/atoms/text/text';
import number from '../../fields/atoms/float/float';
import select from '../../fields/atoms/select/select';

const MediaObject = entity({
  singular: 'MediaObject',
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

export default MediaObject;

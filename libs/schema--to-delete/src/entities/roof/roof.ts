import length2D from '../../fields/molecules/length-2d/length-2d';
import entity from '../../utils/entity';
import text from '../../fields/atoms/text/text';
import select from '../../fields/atoms/select/select';
import number from '../../fields/atoms/float/float';

const Roof = entity({
  singular: 'roof',
  fields: {
    name: text({
      label: 'Nom',
    }),
    purlinType: select({
      label: "Type d'axe",
      options: 'PurlinType',
    }),
    purlinBetweenAxis: number({
      label: 'Entre axe',
    }),
    purlinThickness: number({
      label: 'Epaisseur pannes',
    }),
    incline: number({
      label: 'Inclinaison',
    }),
    ridgeHeight: number({
      label: 'Hauteur de crête',
    }),
    ...length2D(),
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

export default Roof;

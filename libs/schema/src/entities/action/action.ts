import entity from '../../utils/entity';
import { text, float, timestamp, relationship } from '../../fields/atoms';

const ACTION_FIELDS = {
  name: text({
    label: 'Nom',
    isIndexed: true,
  }),
  description: text({
    label: 'Description',
  }),
  startTime: timestamp({
    label: 'Débute',
  }),
  endTime: timestamp({
    label: 'Termine',
  }),
  tasksCount: relationship({
    label: 'Tâches',
    options: 'Task',
    target: 'action',
    many: false,
    onClick: 'open',
  }),
  responsible: relationship({
    label: 'Responsable',
    options: 'Person',
    target: 'isResponsibleFor',
    many: true,
  }),
  project: relationship({
    label: 'Projet',
    options: 'Project',
    target: 'actions',
    many: true,
  }),
  actionPourcentageCompletion: float({
    label: 'Progression',
  }),
};

const Action = entity<keyof typeof ACTION_FIELDS>({
  singular: 'action',
  copyright: {
    form: 'Vous allez créer une action',
  },
  pictures: {
    form: '/assets/illustrations/buy-action.svg',
  },
  fields: ACTION_FIELDS,
  allowedSort: ['name'],
  allowedFilter: [],
  searchFilters: {
    default: {
      name: 'seller',
      query: ['name'],
      filterAttributes: ['name'],
      getters: {
        primary: (option) => `${option.name}`,
        secondary: (option) => `${option.description}`,
        info: () => ``,
      },
    },
  },
  form: {
    required: {
      primary: "L'essentiel",
      secondary: "Comment s'appelle l'action ?",
      description: '',
      fields: {
        name: { col: 12 },
      },
    },
  },
  fragments: {
    details: `
      name
      description
      startTime
      endTime
      tasksCount
      responsible { id givenName familyName}
      project { id name }
      tasks { id name}
      actionPourcentageCompletion
    `,
  },
});
export default Action;

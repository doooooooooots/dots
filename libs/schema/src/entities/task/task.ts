import entity from '../../utils/entity';
import { text, timestamp, relationship } from '../../fields/atoms';

const TASK = {
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
  action: relationship({
    label: 'Issue de',
    options: 'Action',
    target: 'tasks',
    many: true,
  }),
  agent: relationship({
    label: 'Pour',
    options: 'Person',
    target: 'tasks',
    many: true,
  }),
};

const Task = entity<keyof typeof TASK>({
  singular: 'task',
  copyright: {
    form: 'Vous allez créer une tâche',
  },
  pictures: {
    form: '/assets/illustrations/buy-action.svg',
  },
  fields: TASK,
  allowedSort: ['name'],
  allowedFilter: [],
  searchFilters: {
    default: {
      name: 'infos',
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
      secondary: 'Veuillez indiquez le nom de la tâche',
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
      agent { id givenName fullName }
      action { id name }
    `,
    single: ``,
  },
});
export default Task;

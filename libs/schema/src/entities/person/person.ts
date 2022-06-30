import entity from '../../utils/entity';
import text from '../../fields/atoms/text/text';
import relationship from '../../fields/atoms/relationship/relationship';

const PERSON_FIELDS = {
  givenName: text({
    label: 'Prénom',
  }),
  familyName: text({
    label: 'Nom',
  }),
  email: text({
    label: 'Email',
  }),
  image: text({
    label: 'Image',
    options: 'Image',
  }),
  telephone: text({
    label: 'Phone',
  }),
  jobTitle: text({
    label: 'Job Title',
  }),
  postalAddress: relationship({
    label: 'Adresse',
    options: 'PostalAddress',
  }),
  isProjectManagerFor: relationship({
    label: 'Responsable de',
    options: 'Project',
  }),
  isCommercialFor: relationship({
    label: 'Commercial pour',
    options: 'Project',
  }),
  isProjectTechnicianFor: relationship({
    label: 'Technicien sur',
    options: 'Project',
  }),
  isResponsibleFor: relationship({
    label: 'Responsable de',
    options: 'Project',
  }),
  tasks: relationship({
    label: 'Taches',
    options: 'Task',
  }),
};

const Person = entity<keyof typeof PERSON_FIELDS>({
  singular: 'person',
  copyright: {
    form: 'Vous allez créer une peronne',
  },
  pictures: {
    form: '/assets/illustrations/buy-action.svg',
  },
  fields: PERSON_FIELDS,
  allowedSort: ['familyName'],
  allowedFilter: [],
  searchFilters: {
    default: {
      name: 'infos',
      query: ['givenName'],
      filterAttributes: ['givenName'],
      getters: {
        primary: (option) => `${option.givenName}`,
        info: () => ``,
      },
    },
  },
  form: {
    required: {
      primary: "L'essentiel",
      secondary: 'Veuillez indiquez le nom de la peronne',
      description: '',
      fields: {
        givenName: { col: 6 },
        familyName: { col: 6 },
        email: { col: 6 },
        telephone: { col: 6 },
      },
    },
  },
  fragments: {
    details: `
      givenName
      familyName
      email
      telephone
      jobTitle
    `,
  },
});
export default Person;

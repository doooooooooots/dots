import entity from '../../utils/entity';
import text from '../../fields/atoms/text/text';

const Person = entity({
  singular: 'person',
  fields: {
    givenName: text({
      label: 'Prénom',
    }),
    familyName: text({
      label: 'Nom',
    }),
    email: text({
      label: 'Email',
    }),
    telephone: text({
      label: 'Phone',
    }),
    jobTitle: text({
      label: 'Job Title',
    }),
  },
  filters: {
    default: {
      name: 'prénom, nom',
      query: ['givenName', 'familyName'],
      filterAttributes: ['givenName', 'familyName'],
      getters: {
        primary: (option) => `${option.givenName} ${option.familyName}`,
        secondary: (option) => `${option.familyName}`,
        info: (option) => `${option.givenName} ${option.familyName}`,
      },
    },
    byEmail: {
      name: 'email',
      query: ['givenName', 'familyName', 'email'],
      filterAttributes: [],
      getters: {
        primary: (option) => `${option.givenName} ${option.familyName}`,
        secondary: (option) => `${option.email}`,
        info: () => '',
      },
    },
  },
});

export default Person;

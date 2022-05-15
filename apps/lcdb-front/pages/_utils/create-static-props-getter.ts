import { addApolloState, initializeApollo } from '../../src/lib/apolloClient';

const createStaticPropsGetter = (name, querySingles) => async (context) => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: querySingles,
    variables: { id: context.params.id },
  });

  return addApolloState(apolloClient, {
    props: {
      [name]: data[`${name}`],
    },
  });
};

export default createStaticPropsGetter;

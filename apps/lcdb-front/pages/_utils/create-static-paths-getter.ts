import { initializeApollo } from '@lib/apolloClient';

const createStaticPathsGetter = (queryIds) => async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query(queryIds);

  // Get the paths we want to pre-render based on posts
  const paths = data[`${name}s`].map(({ id }) => ({
    params: { id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export default createStaticPathsGetter;

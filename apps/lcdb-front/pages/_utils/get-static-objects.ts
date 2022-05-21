import createStaticPathsGetter from './create-static-paths-getter';
import createStaticPropsGetter from './create-static-props-getter';

// [ ](Adrien): https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
export default function getStaticObjects(queryIds, querySingles, name) {
  const getStaticPaths = createStaticPathsGetter(queryIds);

  const getStaticProps = createStaticPropsGetter(name, querySingles);

  return { getStaticPaths, getStaticProps };
}

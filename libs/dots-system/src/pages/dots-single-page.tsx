import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import { Single, SingleMain, SingleSidebar } from '@dots.cool/components';

const DotsSinglePage = (props) => {
  const {
    texts = {},
    components = {},
    componentProps = {},
    query,
    where = {},
    skip,
  } = props;

  //* MERGE DATAS
  // -- TEXTS
  const mergedTexts = useMemo(
    () => ({
      ...defaultText,
      ...texts,
    }),
    [texts]
  );

  // -- COMPONENTS
  const mergedComponents = useMemo(
    () => ({
      ...defaultComponents,
      ...components,
    }),
    [components]
  );

  // -- COMPONENT-PROPS
  const mergedProps = useMemo(
    () => ({
      ...defaultComponentProps,
      ...componentProps,
    }),
    [componentProps]
  );

  //* QUERIES
  const { findOne } = graphql;
  const mainQuery = useMemo(() => findOne(query), [query, findOne]);
  const { data, loading, error } = useQuery(mainQuery, {
    variables: { where },
    skip: skip,
  });

  if (loading) return `loading`;
  if (error) return `Error! ${error.message}`;

  const { Sidebar, Main } = mergedComponents;
  return (
    <Single>
      <SingleSidebar>
        <Sidebar
          texts={mergedTexts.sidebar}
          components={mergedComponents.sidebar}
          componentProps={mergedProps.sidebar}
        />
      </SingleSidebar>
      <SingleMain sx={{ p: 2 }}>
        <Main
          item={(data && data[singular]) || []}
          texts={mergedTexts.main}
          components={mergedComponents.main}
          componentProps={mergedProps.main}
        />
      </SingleMain>
    </Single>
  );
};

export default DotsSinglePage;

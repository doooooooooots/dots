import { useQuery } from '@apollo/client';
import ENTITIES from '../a_constants/constants';
import { createSchema } from '@dots.cool/schemas';
import FetchError from '../../pages/fetch-error';

const withQuery =
  (singular: string) =>
  (withError: boolean) =>
  (queryName: string) =>
  (Component) => {
    //* CreateContext
    const { defaultQuery, plurial } = ENTITIES[singular];
    const context = createSchema(singular, plurial);
    const { graphql } = context;

    //* Component
    const EnhanceComponent = (props) => {
      const { variables, query = defaultQuery } = props;
      const request = graphql[queryName](query);

      //* Make query
      const { loading, error, data, refetch } = useQuery(request, {
        variables,
      });

      //! ErrorHandler -- fetching data error
      if (withError && error) {
        return <FetchError />;
      }

      //* Render Component
      return (
        <Component
          {...props}
          context={context}
          loading={loading}
          error={error}
          data={data}
          refetch={refetch}
        />
      );
    };
    return EnhanceComponent;
  };

export default withQuery;

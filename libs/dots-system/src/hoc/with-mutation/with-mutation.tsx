import { useMutation } from '@apollo/client';
import ENTITIES from '../../schemas';
import { createSchema } from '@dots.cool/schemas';
import FetchError from '../../pages/fetch-error';

const withMutation =
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
      const { query = defaultQuery } = props;
      const request = graphql[queryName](query);

      //* Make mutation
      const [mutateFunction, { data, loading, error }] = useMutation(request);

      //! ErrorHandler -- fetching data error
      if (withError && error) {
        return <FetchError />;
      }

      //* Render Component
      return (
        <Component
          {...props}
          onSubmit={mutateFunction}
          context={context}
          loading={loading}
          error={error}
          data={data}
        />
      );
    };
    return EnhanceComponent;
  };

export default withMutation;

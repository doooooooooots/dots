import { useCallback } from 'react';
import { FORM_MODAL_WIDTH } from '@dots.cool/tokens';
import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { useQuery } from '@apollo/client';
import { useContext } from '../../hoc/with-context';
import useHistory from '../../hooks/use-history';
import DotsFormCreate from '../../pages/dots-from-create';

const SKIP = 0;
const TAKE = 10;

function FieldWithContext(props) {
  const { name, target, formId, children, ...other } = props;

  const { push, goBackTo } = useHistory();
  const { indexColumn, graphql, plurial } = useContext(target);

  //* REQUEST
  //? Request is made 'onInputChange' (i.e. When user is changing input value)
  //-> Retrieve builder
  const makeFindManyQuery = graphql[GRAPHQL_ACTIONS.FindMany];
  //-> Add id to query
  const findManyQuery = makeFindManyQuery(
    indexColumn === 'id' ? [indexColumn] : ['id', indexColumn]
  );
  //-> Create appollo Query
  const { data, loading, refetch } = useQuery(findManyQuery, {
    variables: { take: TAKE, skip: SKIP, where: {} },
  });

  const handleInputChange = useCallback(
    (searchString) => {
      refetch({
        take: TAKE,
        skip: SKIP,
        where: {
          [indexColumn]: { contains: searchString, mode: 'insensitive' },
        },
      });
    },
    [indexColumn, refetch]
  );

  //* LINKED ENTITIES
  //-> Create formular maker component so Autocomplete can generate his form
  const handleCreateButtonClick = useCallback(
    (userInput) => {
      push({
        title: `form.${name}.create.title`,
        path: `${formId}.create.${name}`,
        width: FORM_MODAL_WIDTH,
        Component: DotsFormCreate,
        componentProps: {
          id: `${formId}.create.${name}`,
          parentFormId: formId,
          entityName: target,
          defaultValues: userInput,
          onSubmitSuccess: () => {
            goBackTo(formId);
          },
        },
      });
    },
    [push, name, target, formId, goBackTo]
  );

  return children({
    indexColumn,
    options: data && data[plurial],
    loading,
    onInputChange: handleInputChange,
    onCreateButtonClick: handleCreateButtonClick,
    ...other,
  });
}

export default FieldWithContext;

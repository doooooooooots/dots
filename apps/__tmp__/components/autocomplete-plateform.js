import React, { useCallback } from 'react';
import { gql, useQuery } from '@apollo/client';
import { AUTOCOMPLETE_TAKE_DEFAULT } from 'src/constants';
import PlateformsCreate from './forms/plateforms-create';
import AutocompleteWithForm from '../design-system/form/autocomplete-with-form';
import { useStateMachine } from 'little-state-machine';
import { updateFormAction } from '@store/form';
import { useHistory } from '@hooks/use-history-shared';

const GET_PLATEFORM = gql`
  query getPlateforms($take: Int = ${AUTOCOMPLETE_TAKE_DEFAULT}, $skip: Int = 0, $name: String! = "") {
    plateforms(take: $take, skip: $skip, where: { name: { contains: $name, mode: insensitive } }) {
      id
      name
    }
  }
`;

function AutocompletePlateform(props) {
  const { name } = props;
  const { data = {}, loading, refetch } = useQuery(GET_PLATEFORM);

  const { undo, path } = useHistory();
  const { actions } = useStateMachine({
    updateFormAction
  });

  const handleInputChange = useCallback(
    (searchString) => {
      refetch({ take: AUTOCOMPLETE_TAKE_DEFAULT, name: searchString });
    },
    [refetch]
  );

  // *FUNC -- onSuccessCallback
  const handleFormSubmitSuccess = React.useCallback(
    (res) => {
      actions.updateFormAction({ id: path, data: { [name]: res.createPlateform } });
      undo();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [undo, actions]
  );

  if (loading) return 'loading';

  return (
    <AutocompleteWithForm
      options={data.plateforms || []}
      optionKey='name'
      formTitle={'Créer une plateforme'}
      renderFormComponent={({ initialValues }) => (
        <PlateformsCreate initialValues={initialValues} onSubmitSuccessCallback={handleFormSubmitSuccess} />
      )}
      onInputChange={handleInputChange}
      {...props}
    />
  );
}

export default AutocompletePlateform;

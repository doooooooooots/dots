import React, { useCallback, useEffect } from 'react';
import { Button, Stack, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { get } from 'lodash';
import { useMemory } from '../with-memory';

function Form(props: any) {
  const {
    id,
    entityName,
    parentFormId,
    validations,
    defaultValues,
    onSubmit,
    onSubmitSuccess,
    spacing = 0,
    direction = 'column',
    children,
  } = props;

  //-> Save form in local storage so manipulation error won't cause data loss
  const { actions, state }: any = useMemory();

  //* FORM INIT
  //? Uses react hook forms
  //-> Retrieve default values from local storage
  const _defaultValues = state[id] || {};

  //-> Initialize Form from react-hook-form
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validations),
    defaultValues: {
      ...defaultValues,
      ..._defaultValues,
    },
  });

  //* REQUEST
  //? Handles form submition
  // [ ](Adrien): Check for errors

  const handleSubmitClick = useCallback(
    async (data) => {
      //-> Submit from@
      const response = await onSubmit(data);

      //-> Send data to memory if needed
      if (parentFormId && entityName)
        actions.updateFormAction({
          id: parentFormId,
          data: { [entityName]: response },
        });

      //-> Run callback if there's one
      if (typeof onSubmitSuccess === 'function') {
        onSubmitSuccess(response);
      }

      //-> Delete current form saved data
      actions.deleteFormAction(id);
    },
    [onSubmit, parentFormId, entityName, actions, onSubmitSuccess, id]
  );

  //* EFFECT - Component Life cycle
  //? On unmount
  //-> is submitted -> delete form in local storage
  //-> not submitted -> save current form in local storage
  useEffect(() => {
    actions.createFormAction(id);
    return () => {
      actions.setFormAction({ id, data: getValues() });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!id) return <Alert severity="error">Form id is missing</Alert>;

  //* RENDER
  // [ ](Adrien): Create display mode logic
  return (
    <form id={id} onSubmit={handleSubmit(handleSubmitClick)}>
      <Button onClick={actions.clearAllAction}>CLEAr</Button>
      <Stack spacing={spacing} direction={direction}>
        {React.Children.map(children, (child) => {
          //-> get field error from error handler object
          const error = get(errors, `${child.props.name}.message`);
          //-> render each fields
          return (
            <>
              {child.props.name
                ? React.createElement(child.type, {
                    ...{
                      ...child.props,
                      register: register,
                      control: control,
                      key: child.props.name,
                    },
                  })
                : child}
              {error && <Alert severity="error">{error}</Alert>}
            </>
          );
        })}
      </Stack>
      <Button type="submit">form-builder.ui.button.submit</Button>
    </form>
  );
}

export default Form;

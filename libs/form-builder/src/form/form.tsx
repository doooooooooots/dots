import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { Stack } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';

function Form(props: any) {
  const {
    query = ' id',
    context,
    defaultValues,
    onSubmitSuccessCallback,
    onUnmount,
    children,
    spacing = 0,
    formatData,
    direction = 'column',
  } = props;

  const { control, register, handleSubmit, getValues } = useForm({
    defaultValues,
  });

  const createOne = context.graphql[GRAPHQL_ACTIONS.CreateOne];
  const [onSubmit] = useMutation(createOne(query));

  const handleSubmitClick = useCallback(
    async (data) => {
      const { data: res } = await onSubmit({ variables: formatData(data) });

      if (typeof onSubmitSuccessCallback === 'function')
        onSubmitSuccessCallback(res);
    },
    [formatData, onSubmit, onSubmitSuccessCallback]
  );

  //* EFFECT - mount & unmount
  useEffect(() => {
    return () => {
      if (typeof onUnmount === 'function' && getValues())
        onUnmount(getValues());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleSubmit(handleSubmitClick)}>
      <Stack spacing={spacing} direction={direction}>
        {React.Children.map(children, (child) => {
          return child.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  register: register,
                  control: control,
                  key: child.props.name,
                },
              })
            : child;
        })}
      </Stack>
    </form>
  );
}

export default Form;

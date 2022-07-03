import React from 'react';
import { CircularProgress, Stack } from '@mui/material';
import useEnum from '../../../../hooks/use-enums';
import InputEnum from '../input-enum';
import { isEmpty, last } from 'lodash';
import { ErrorPage } from '@dots.cool/components';

/**
 * Render value for user
 */
const getValue = (value, multiple) => {
  if (isEmpty(value)) return null;
  if (multiple) return value.map((option) => option.value);
  return last(value)?.value;
};

function InputEnumWithFetch(props) {
  const { value, options, ...other } = props;

  const { data = {}, loading: loadingData, error } = useEnum(options);

  /**
   * Print error message when error occurs
   */
  if (error) {
    return <ErrorPage message={error} />;
  }

  /**
   * Wait for list to be loaded
   */
  if (loadingData)
    return (
      <Stack direction="row" justifyContent="center" p={2}>
        <CircularProgress color="neutral" />
      </Stack>
    );

  if (isEmpty(data)) {
    return <ErrorPage message={"Data is empty but shouldn't be"} />;
  }

  return (
    <InputEnum
      options={data.options}
      getValue={getValue}
      value={data.options.filter((item) => item.value === value)}
      disableSort
      {...other}
    />
  );
}

export default InputEnumWithFetch;

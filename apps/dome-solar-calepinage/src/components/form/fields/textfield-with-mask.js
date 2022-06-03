import React from 'react';
import { TextField } from '@mui/material';
import InputMask from 'react-input-mask';

const TextfieldWithMask = (props, ref) => {
  const { mask, value, onChange, onBlur, ...rest } = props;
  return (
    <InputMask mask={mask} value={value} onChange={onChange} onBlur={onBlur}>
      {() => <TextField ref={ref} {...rest} />}
    </InputMask>
  );
};

TextfieldWithMask.displayName = 'TextfieldWithMask';

export default React.forwardRef(TextfieldWithMask);

import * as React from 'react';
import { Input as InputMui } from '@mui/material';

const Input = React.forwardRef((props, ref) => (
  <InputMui
    ref={ref}
    {...props}
    type="number"
  />
));

export default Input;

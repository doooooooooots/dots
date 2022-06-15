import React, { useCallback, useState } from 'react';
import { Stack } from '@mui/material';
import PopperTextField from './popper-textfield';
import PopperActions from './popper-actions';

function PopperText(props) {
  const { value, onSubmit, onChange, onCancel, children } = props;
  const [input, setInput] = useState(value);

  const handleChange = useCallback((event) => {
    setInput(event.target.value);
  }, []);

  /**
   * User clicks on a reset button
   */
  const handleClearClick = useCallback(() => {
    setInput('');
  }, []);

  return (
    <Stack direction="column" p={0.5} spacing={0.5}>
      <PopperTextField
        placeholder="Enter a text"
        value={input}
        variant="outlined"
        onChange={handleChange}
        onClear={handleClearClick}
      />
      <PopperActions
        variant="icons"
        onConfirm={() => null}
        onCancel={() => null}
      />
    </Stack>
  );
}

export default PopperText;

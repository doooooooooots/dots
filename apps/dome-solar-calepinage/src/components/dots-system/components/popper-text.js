import React, { useCallback, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import PopperTextField from './popper-input';
import PopperActions from './actions';

function PopperText(props) {
  const { value, onChange, onSubmit, onCancel } = props;
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

  /**
   * Suscribe to each changes
   */
  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(input);
    }
  }, [input, onChange]);

  return (
    <Stack direction="column" p={0.5} spacing={0.5}>
      <PopperTextField
        placeholder="Enter a text"
        value={input}
        variant="outlined"
        onChange={handleChange}
        onClear={handleClearClick}
      />
    </Stack>
  );
}

export default PopperText;

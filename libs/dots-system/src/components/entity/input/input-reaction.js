import React, { useCallback, useEffect, useState } from 'react';
import { MenuItem, Stack } from '@mui/material';
import { Reaction } from '@dots.cool/schema';

function InputReaction(props) {
  const { value, onChange, onSubmit, onCancel } = props;
  const [input, setInput] = useState(value);

  const options = Reaction.getOptions();

  const handleChange = useCallback((key) => {
    setInput();
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
    <Stack direction="row" p={0.5} spacing={0.5}>
      {options.map(({ key, value, label }) => (
        <MenuItem
          key={key}
          value={value}
          onClick={() => handleChange(key)}
          sx={{ px: 1 }}
        >
          {label}
        </MenuItem>
      ))}
    </Stack>
  );
}

export default InputReaction;

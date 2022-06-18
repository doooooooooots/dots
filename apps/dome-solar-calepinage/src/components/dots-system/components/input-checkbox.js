import React, { useCallback, useEffect, useState } from 'react';
import { Checkbox, Divider, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';

/**
 *
 * @param {*} props
 * @returns
 */

function InputCheckbox(props) {
  const {
    id,
    name,
    label = 'check',
    value,
    onChange,
    onSubmit,
    onCancel,
  } = props;
  const [input, setInput] = useState(value);

  const handleChange = useCallback((event) => {
    setInput(event.target.checked);
  }, []);

  /**
   *
   * Suscribe to each changes
   */
  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(input);
    }
  }, [input, onChange]);

  return (
    <Stack direction="row" px={1} py={0.5} spacing={1} alignItems="center">
      <Box>
        <Checkbox
          id={id}
          name={name}
          onChange={handleChange}
          checked={!!input}
        />
      </Box>
      <Divider orientation="vertical" flexItem />
      <Typography color={input ? 'text.primary' : 'text.disabled'}>
        {label}
      </Typography>
    </Stack>
  );
}

export default InputCheckbox;

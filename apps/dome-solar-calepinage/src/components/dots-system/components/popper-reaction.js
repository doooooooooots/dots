import React, { useCallback, useEffect, useState } from 'react';
import { MenuItem, Stack } from '@mui/material';

const ICONS = {
  '+1': '👍',
  '-1': '👎',
  smile: '😁',
  tada: '🎉',
  thinking_face: '🤔',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
  fire: '🔥',
  brain: '🧠',
  creative: '🎨',
  checked: '✅',
  error: '❌',
};

function PopperReaction(props) {
  const { value, onChange, onSubmit, onCancel } = props;
  const [input, setInput] = useState(value);

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
      {Object.entries(ICONS).map(([key, emoji]) => (
        <MenuItem
          key={key}
          value={key}
          onClick={() => handleChange(key)}
          sx={{ px: 1 }}
        >
          {emoji}
        </MenuItem>
      ))}
    </Stack>
  );
}

export default PopperReaction;

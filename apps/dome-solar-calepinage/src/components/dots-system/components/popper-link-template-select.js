import React, { useCallback } from 'react';
import { MenuItem, Select, Stack, Typography } from '@mui/material';

function PopperLinkTemplateSelect(props) {
  const { options, value, onChange } = props;

  const templateList = Object.entries(options).map(([key, { name }]) => ({
    value: key,
    label: name,
  }));

  const handleTemplateChange = useCallback(
    (event) => onChange(event.target.value),
    [onChange]
  );

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      px={1}
      spacing={1}
      sx={{ color: 'neutral.500' }}
    >
      <Typography variant="caption">Search by:</Typography>
      <Select
        value={value}
        onChange={handleTemplateChange}
        variant="standard"
        sx={{
          fontSize: 12,
          height: 20,
          px: 1,
          borderRadius: 1,
          '& .MuiSelect-select.MuiSelect-standard.MuiInput-input.MuiInputBase-input':
            {
              pr: 1,
            },
          '& .MuiSvgIcon-root': {
            fontSize: 16,
          },
          '&:before, &:after': {
            content: 'none',
          },
          '& fieldset': {
            border: 0,
          },
          '&:hover': {
            bgcolor: 'neutral.background',
          },
          '& .MuiInput-input:focus': {
            bgcolor: 'transparent',
          },
        }}
      >
        <MenuItem key={value} value={'default'}>
          default
        </MenuItem>

        {templateList.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
}

export default PopperLinkTemplateSelect;

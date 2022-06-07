import React, { useCallback, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import usePopper from './select-with-autocomplete/hooks/use-popper';
import ButtonBase from './button-base';
import { isEmpty } from 'lodash';
import AddIcon from '@mui/icons-material/Add';
import PopperGrowWithClickaway from '../../popper-grow-with-clickaway';
import ButtonBaseUnstyled from './button-base-unstyled';

const STATUS = ['draft', 'published', 'pending'];

const STATUS_COLORS = {
  draft: 'warning',
  published: 'success',
  pending: 'error',
};

const ChipStatus = ({ label, sx = {}, ...other }) => (
  <Typography
    variant="caption"
    sx={{
      px: 1.5,
      py: 0.5,
      m: 0,
      borderRadius: 1,
      textTransform: 'uppercase',
      cursor: 'pointer',
      bgcolor: (theme) => `${theme.palette[STATUS_COLORS[label]].background}`,
      color: (theme) => `${theme.palette[STATUS_COLORS[label]].main}!important`,
      '&:hover': {
        bgcolor: (theme) => `${theme.palette[STATUS_COLORS[label]].hover}`,
      },
      ...sx,
    }}
    {...other}
  >
    {label}
  </Typography>
);

function SelectStatus(props) {
  const { defaultValue = 'draft', tooltip = 'status' } = props;

  const { open, anchorEl, onOpen, onClose } = usePopper(false);

  const [value, setValue] = useState(defaultValue);

  //* FUNC -- When select
  const handleElementClick = useCallback(
    (_value) => () => {
      setValue(_value);
      onClose();
    },
    [onClose]
  );

  return (
    <>
      {/*//* BUTTON */}
      {isEmpty(value) ? (
        <ButtonBase tooltip={tooltip} startIcon={<AddIcon />} onClick={onOpen}>
          Add status
        </ButtonBase>
      ) : (
        <ButtonBaseUnstyled tooltip={tooltip}>
          <ChipStatus
            label={value}
            onClick={onOpen}
            sx={{ width: '100%', textAlign: 'center' }}
          />
        </ButtonBaseUnstyled>
      )}
      <PopperGrowWithClickaway
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
      >
        <Stack spacing={1} p={2}>
          {STATUS.map((option) => (
            <ChipStatus
              key={option}
              label={option}
              sx={{ width: '100%', textAlign: 'center' }}
              onClick={handleElementClick(option)}
            />
          ))}
        </Stack>
      </PopperGrowWithClickaway>
    </>
  );
}

export default SelectStatus;

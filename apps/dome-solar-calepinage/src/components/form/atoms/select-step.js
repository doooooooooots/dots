import React, { useCallback, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import usePopper from '../../../hooks/use-popper';
import ButtonBase from './button-base';
import { isEmpty } from 'lodash';
import AddIcon from '@mui/icons-material/Add';
import PopperGrowWithClickaway from '../../popper-grow-with-clickaway';
import ButtonBaseUnstyled from './button-base-unstyled';

const STEP_COLORS = {
  status_draft: 'warning',
  status_available: 'success',
  status_archived: 'error',
  status_unpublished: 'info',
};

const StepChip = ({ label, color = 'primary', onClick, fullColor }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      onClick={onClick}
      sx={{
        px: 2,
        py: 0.5,
        borderRadius: '100px',
        cursor: 'pointer',
        border: '1px solid',
        borderColor: fullColor ? `border.${color}` : 'border.neutral',
        '&:hover': {
          borderColor: `${color}.main`,
          '& .MuiTypography-root': {
            color: `${color}.main`,
          },
        },
      }}
    >
      <Box bgcolor={`${color}.main`} width={8} height={8} borderRadius="50%" />
      <Typography
        color={fullColor ? `${color}.main` : 'neutral.300'}
        variant="body2"
        fontWeight={500}
      >
        {label}
      </Typography>
    </Stack>
  );
};

function SelectStep(props) {
  const { fullColor, defaultValue, tooltip = 'step' } = props;

  const { open, anchorEl, onOpen, onClose } = usePopper(false);

  const [value, setValue] = useState(defaultValue || '');

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
        <ButtonBase tooltip={tooltip} icon={<AddIcon />} onClick={onOpen}>
          Add Step
        </ButtonBase>
      ) : (
        <ButtonBaseUnstyled tooltip={tooltip}>
          <StepChip
            onClick={onOpen}
            label={value}
            color={STEP_COLORS[value]}
            sx={{ width: '100%', textAlign: 'center' }}
          />
        </ButtonBaseUnstyled>
      )}
      <PopperGrowWithClickaway
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
      >
        <Stack p={2} spacing={1}>
          {Object.entries(STEP_COLORS).map(([key, color]) => (
            <StepChip
              key={key}
              label={key}
              color={color}
              fullColor={fullColor}
              onClick={handleElementClick(key)}
            />
          ))}
        </Stack>
      </PopperGrowWithClickaway>
    </>
  );
}

export default SelectStep;

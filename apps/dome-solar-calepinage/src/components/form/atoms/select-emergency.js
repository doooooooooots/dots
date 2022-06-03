import React, { useCallback, useState } from 'react';
import { Box } from '@mui/material';
import SignalCellularAlt1BarOutlinedIcon from '@mui/icons-material/SignalCellularAlt1BarOutlined';
import SignalCellularAlt2BarOutlinedIcon from '@mui/icons-material/SignalCellularAlt2BarOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import ButtonBase from './button-base';
import PopperGrowWithClickaway from '../../popper-grow-with-clickaway';
import PopperList from '../../popper-list';
import SelectOptionItem from './select-option-item';
import usePopper from '../../../hooks/use-popper';

const EMERGENCY = {
  none: { value: 0, color: 'neutral', label: 'None' },
  low: { value: 1, color: 'success', label: 'Low' },
  medium: { value: 2, color: 'warning', label: 'Medium' },
  high: { value: 3, color: 'error', label: 'High' },
};

const EmergencyIcon = ({ severity }) => (
  <Box position="relative">
    <SignalCellularAltOutlinedIcon
      sx={{ fill: (theme) => `${theme.palette.grey[200]}` }}
    />
    <Box position="absolute" top={0} left={0}>
      {severity === 3 && (
        <SignalCellularAltOutlinedIcon
          sx={{ fill: (theme) => `${theme.palette.error.main}` }}
        />
      )}
      {severity === 2 && (
        <SignalCellularAlt2BarOutlinedIcon
          sx={{ fill: (theme) => `${theme.palette.warning.main}` }}
        />
      )}
      {severity === 1 && (
        <SignalCellularAlt1BarOutlinedIcon
          sx={{ fill: (theme) => `${theme.palette.success.main}` }}
        />
      )}
    </Box>
  </Box>
);

function EmergencySelect(props) {
  const { tooltip = 'emergency', defaultValue = 0 } = props;

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
      <ButtonBase
        tooltip={value ? value : tooltip}
        icon={<EmergencyIcon severity={value} />}
        className={open ? 'is--focused' : ''}
        onClick={onOpen}
      />
      <PopperGrowWithClickaway
        label="Choisir une personne"
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
      >
        <PopperList>
          {Object.entries(EMERGENCY).map(
            ([key, { color, label, value: _value }]) => (
              <SelectOptionItem
                key={key}
                icon={<EmergencyIcon severity={_value} />}
                onClick={handleElementClick(_value)}
                primary={label}
              />
            )
          )}
        </PopperList>
      </PopperGrowWithClickaway>
    </>
  );
}

export default EmergencySelect;

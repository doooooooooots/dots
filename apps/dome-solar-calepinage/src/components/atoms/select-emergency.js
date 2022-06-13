import React from 'react';
import { Box } from '@mui/material';
import SelectFromList from './select-with-autocomplete/components/popper-from-list';
import { isEmpty } from 'lodash';
import ButtonBase from './button-base';
import SelectItemOption from './select-with-autocomplete/components/item-option';
import SignalCellularAlt1BarOutlinedIcon from '@mui/icons-material/SignalCellularAlt1BarOutlined';
import SignalCellularAlt2BarOutlinedIcon from '@mui/icons-material/SignalCellularAlt2BarOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';

const EMERGENCY = {
  none: { value: 0, color: 'neutral', label: 'None' },
  low: { value: 1, color: 'success', label: 'Low' },
  medium: { value: 2, color: 'warning', label: 'Medium' },
  high: { value: 3, color: 'error', label: 'High' },
};

const title = "Définissez l'urgence du projet";
const placeholder = 'Chercher un tag';
const options = Object.values(EMERGENCY);
const defaultButtonText = 'Emerency';
const defaultTooltip = 'Add a progress';

const renderButtonText = (value) => (isEmpty(value) ? defaultButtonText : null);
const renderOption = (props, option, { selected }) => (
  <SelectItemOption
    {...props}
    title={option.label}
    icon={<EmergencyIcon severity={option.value} size="small" />}
    selected={selected}
  />
);

const EmergencyIcon = ({ severity, size = 'medium' }) => {
  let boxProps = { width: 24, height: 24 };
  if (size === 'small') boxProps = { width: 20, height: 20 };
  if (size === 'large') boxProps = { width: 28, height: 28 };

  return (
    <Box position="relative" {...boxProps}>
      <SignalCellularAltOutlinedIcon
        fontSize={size}
        sx={{ fill: (theme) => `${theme.palette.grey[200]}` }}
      />
      {!!severity && (
        <Box position="absolute" top={0} left={0}>
          {severity === 3 && (
            <SignalCellularAltOutlinedIcon
              fontSize={size}
              sx={{ fill: (theme) => `${theme.palette.error.main}` }}
            />
          )}
          {severity === 2 && (
            <SignalCellularAlt2BarOutlinedIcon
              fontSize={size}
              sx={{ fill: (theme) => `${theme.palette.warning.main}` }}
            />
          )}
          {severity === 1 && (
            <SignalCellularAlt1BarOutlinedIcon
              fontSize={size}
              sx={{ fill: (theme) => `${theme.palette.success.main}` }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

function SelectEmergency(props) {
  const { tooltip = defaultTooltip } = props;

  return (
    <SelectFromList
      title={title}
      options={options}
      renderOption={renderOption}
      inputProps={{ placeholder }}
      hideSearch
      disableSort
    >
      {({ value, onClick, open }) => (
        <ButtonBase
          tooltip={tooltip}
          startIcon={<EmergencyIcon severity={value?.value} />}
          onClick={onClick}
          isActive={open}
          withAddIcon={isEmpty(value)}
        >
          {renderButtonText(value)}
        </ButtonBase>
      )}
    </SelectFromList>
  );
}

export default SelectEmergency;

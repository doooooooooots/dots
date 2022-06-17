import React, { useEffect, useMemo, useState } from 'react';
import { useAutocomplete, useWhyDidYouUpdate } from '@dots.cool/hooks';
import { Autocomplete, Stack, Typography } from '@mui/material';
import PopperInput from '../../design-system/popper/popper-input';
import StyledAutocompletePopper from './styled-autocomplete-popper';
import PopperTitle from '../../design-system/popper/popper-title';
import SelectItemOption from './list-item/list-item-option';
import { matchSorter } from 'match-sorter';
import { isEmpty, round } from 'lodash';
import makeSortFunc from '../../design-system/autocomplete/utils/makeSortFunc';
import { Box } from '@mui/system';

import SignalCellularAlt1BarOutlinedIcon from '@mui/icons-material/SignalCellularAlt1BarOutlined';
import SignalCellularAlt2BarOutlinedIcon from '@mui/icons-material/SignalCellularAlt2BarOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import ProgressIcon from '../../icons-progress';

const filterOptions = (options, { inputValue }) =>
  matchSorter(options, inputValue);

function PopperComponent(props) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

const getCriticityColor = (index, max) => {
  if (index / max <= 0.25) return 'neutral.dark';
  if (index / max <= 0.5) return 'success.main';
  if (index / max <= 0.75) return 'warning.main';
  return 'error.main';
};

const StyledItem = React.forwardRef((props) => (
  <Stack {...props} as="li" direction="row" py={0.5} px={1} spacing={1} />
));
StyledItem.displayName = 'StyledItem';

/**
 * EMERGENCY ICON
 */

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
          {severity === 4 && (
            <SignalCellularAltOutlinedIcon
              fontSize={size}
              sx={{ fill: (theme) => `${theme.palette.error.main}` }}
            />
          )}
          {severity === 3 && (
            <SignalCellularAlt2BarOutlinedIcon
              fontSize={size}
              sx={{ fill: (theme) => `${theme.palette.warning.main}` }}
            />
          )}
          {severity === 2 && (
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

/**
 * SCALE VALUE
 */
const ScaleValue = React.forwardRef((props, ref) => {
  const { value, label, index, max, ...other } = props;
  const color = getCriticityColor(index, max);
  return (
    <StyledItem {...other} ref={ref}>
      <Box
        minWidth={15}
        mr={2}
        sx={{
          width: 120,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {label}
      </Box>
      {new Array(index).fill(0).map((_, _index) => (
        <Box
          key={_index}
          width={16}
          height={16}
          sx={{ bgcolor: color, borderRadius: '4px' }}
        />
      ))}
      {new Array(max - index).fill(0).map((_, _index) => (
        <Box
          key={_index}
          width={16}
          height={16}
          sx={{ bgcolor: 'neutral.100', borderRadius: '4px' }}
        />
      ))}
    </StyledItem>
  );
});
ScaleValue.displayName = 'ScaleValue';

/**
 * SCALE VALUE
 */
const CriticityValue = React.forwardRef((props, ref) => {
  const { value, label, index, max, ...other } = props;
  return (
    <StyledItem {...other} ref={ref}>
      <EmergencyIcon severity={round((4 * index) / max)} />
      <Typography variant="body2">{label}</Typography>
    </StyledItem>
  );
});
CriticityValue.displayName = 'CriticityValue';

/**
 * LABEL
 */

const LabelStatus = React.forwardRef((props, ref) => {
  const { label, color, sx = {}, ...other } = props;
  return (
    <StyledItem {...other} ref={ref}>
      <Typography
        variant="caption"
        sx={{
          px: 1.5,
          py: 0.5,
          m: 0,
          borderRadius: 1,
          textTransform: 'uppercase',
          cursor: 'pointer',
          bgcolor: (theme) => `${theme.palette[color].background}`,
          color: (theme) => `${theme.palette[color].main}!important`,
          '&:hover': {
            bgcolor: (theme) => `${theme.palette[color].hover}`,
          },
          ...sx,
        }}
        {...other}
      >
        {label}
      </Typography>
    </StyledItem>
  );
});
LabelStatus.displayName = 'LabelStatus';

/**
 * PROGRESS
 */
const ProgressValue = React.forwardRef((props, ref) => {
  const { value, label, index, max, color, ...other } = props;
  return (
    <StyledItem {...other} ref={ref}>
      <ProgressIcon stage={value} color={`${color}.main`} />
      <Typography variant="body2">{label}</Typography>
    </StyledItem>
  );
});
ProgressValue.displayName = 'ProgressValue';

/**
 * CHIP STATUS
 */
const StepChip = React.forwardRef((props, ref) => {
  const { value, label, index, max, color, fullColor, ...other } = props;

  return (
    <StyledItem {...other} ref={ref}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          px: 1.5,
          py: 0.25,
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
        <Box
          bgcolor={`${color}.main`}
          width={6}
          height={6}
          borderRadius="50%"
        />
        <Typography
          color={fullColor ? `${color}.main` : 'neutral.600'}
          variant="caption"
          fontWeight={500}
        >
          {label}
        </Typography>
      </Stack>
    </StyledItem>
  );
});
StepChip.displayName = 'StepChip';

/**
 * REACTION
 */
const ReactionIcon = ({ variant, count, onClick, isActive }) => {
  if (variant === '' || variant === 'default') {
    return <AddReactionOutlinedIcon />;
  }
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      onClick={onClick}
      sx={[
        {
          borderRadius: 1,
          px: 0.75,
          py: 0.35,
          cursor: 'pointer',
          border: '1px solid',
          borderColor: 'divider',
          color: 'neutral.500',
        },
        isActive && {
          borderColor: 'neutral.main',
          bgcolor: 'neutral.25',
        },
      ]}
    >
      <Typography>{ICONS[variant]}</Typography>
      <Typography variant="body2">{count}</Typography>
    </Stack>
  );
};

/**
 *
 * @param {*} props
 * @returns
 */

function PopperSelect(props) {
  const {
    title = 'Select an option 👇',
    name,
    loading,
    value,
    options,
    onChange,
    onSubmit,
    onCancel,
    withPreview,
    disableSort,
    multiple,
  } = props;

  const [isReady, setIsReady] = useState(false);
  useWhyDidYouUpdate('Popper', props);

  const {
    id,
    // Pending value
    pendingValue,
    getValue,
    handleChange,
    // Search input
    input,
    handleInputChange,
    handleInputClear,
  } = useAutocomplete({
    name: name,
    value: value,
    multiple,
  });

  const [optionList, setOptionList] = useState([]);

  // Add selected values to all results
  const _options = useMemo(() => {
    if (isEmpty(optionList)) return [];
    return disableSort
      ? optionList
      : [...optionList].sort(
          makeSortFunc({ value: pendingValue, options: optionList })
        );
  }, [disableSort, pendingValue, optionList]);

  /**
   * On Mount, fetch options
   */
  useEffect(() => {
    const getOptionList = async () => {
      const res = await fetch(`/api/constants/${options}/options`);
      const list = await res.json();
      setOptionList(list);
      if (value) {
        handleChange(
          null,
          list.filter((item) => item.value === value)
        );
      }
      setIsReady(true);
    };
    getOptionList();
    return () => {
      setIsReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Suscribe to each changes
   */
  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(getValue(pendingValue)?.value);
    }
  }, [getValue, onChange, pendingValue]);

  if (!isReady) return null;

  return (
    <Stack direction="row">
      <Stack flex={1} overflow="hidden" width={270}>
        {title && <PopperTitle title={title} loading={loading} />}
        <Autocomplete
          id={id}
          loading={!title && loading}
          value={pendingValue}
          onChange={handleChange}
          inputValue={input}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <Stack ref={params.InputProps.ref}>
              <PopperInput
                loading={loading}
                onClear={handleInputClear}
                inputProps={params.inputProps}
                sx={[optionList.length < 10 && { opacity: 0, height: 0 }]}
                autoFocus
              />
            </Stack>
          )}
          options={_options}
          PopperComponent={PopperComponent}
          filterOptions={input ? filterOptions : () => _options}
          getOptionLabel={(option) => option?.label}
          renderOption={(
            props,
            { label, index, value, color },
            { selected }
          ) => (
            <StepChip
              {...props}
              label={label}
              index={index}
              value={value}
              color={color}
              max={optionList.length}
              selected={selected}
              hideStartIcon={!multiple && !selected}
            />
          )}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          onClose={() => null}
          clearOnBlur={false}
          filterSelectedOptions={withPreview}
          disableCloseOnSelect
          multiple
          open
        />
      </Stack>
    </Stack>
  );
}

export default PopperSelect;

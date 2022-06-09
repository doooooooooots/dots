import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { useQuery } from '@apollo/client';
import { isEmpty } from 'lodash';
import { Button, Divider } from '@mui/material';

const OptionItem = (props) => {
  const { selected, primary, secondary, ...other } = props;
  return (
    <li {...other}>
      <Box
        component={DoneIcon}
        sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
        style={{
          visibility: selected ? 'visible' : 'hidden',
        }}
      />
      <Box
        sx={{
          flexGrow: 1,
          '& span': {
            color: (theme) =>
              theme.palette.mode === 'light' ? '#586069' : '#8b949e',
          },
        }}
      >
        {primary}
        <br />
        <span>{secondary}</span>
      </Box>
      <Box
        component={CloseIcon}
        sx={{ opacity: 0.6, width: 18, height: 18 }}
        style={{
          visibility: selected ? 'visible' : 'hidden',
        }}
      />
    </li>
  );
};

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: 'none',
    margin: 0,
    color: 'inherit',
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: 8,
      borderBottom: `1px solid  ${
        theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'
      }`,
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
        {
          backgroundColor: theme.palette.action.hover,
        },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
}));

function PopperComponent(props) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

PopperComponent.propTypes = {
  anchorEl: PropTypes.any,
  disablePortal: PropTypes.bool,
  open: PropTypes.bool.isRequired,
};

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: '100%',
  borderBottom: `1px solid ${
    theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
  }`,
  '& input': {
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
    padding: 8,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    border: `1px solid ${
      theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
    }`,
    fontSize: 14,
    '&:focus': {
      boxShadow: `0px 0px 0px 3px ${
        theme.palette.mode === 'light'
          ? 'rgba(3, 102, 214, 0.3)'
          : 'rgb(12, 45, 107)'
      }`,
      borderColor: theme.palette.mode === 'light' ? '#0366d6' : '#388bfd',
    },
  },
}));

export default function AutocompleteFromQuery(props) {
  const {
    query,
    where,
    take,
    value = [],
    skip,
    orderBy,
    multiple,
    renderOptionProps,
    getOptionLabel,
    onClose,
    disableExclude,
  } = props;

  const { data, loading, error } = useQuery(query, {
    variables: { where: where, take: take, skip: skip, orderBy: orderBy },
  });

  const rows = data?.options || [];
  const [pendingValue, setPendingValue] = React.useState([]);

  return (
    <Box sx={{ fontSize: 13 }}>
      <Autocomplete
        open
        loading={loading}
        multiple
        onClose={(event, reason) => {
          if (reason === 'escape') {
            onClose(pendingValue);
          }
        }}
        value={pendingValue}
        onChange={(event, newValue, reason) => {
          if (
            event.type === 'keydown' &&
            event.key === 'Backspace' &&
            reason === 'removeOption'
          ) {
            return;
          }
          if (!isEmpty(newValue)) {
            multiple ? setPendingValue(newValue) : onClose([newValue.pop()]);
          } else {
            setPendingValue([]);
          }
        }}
        disableCloseOnSelect
        PopperComponent={PopperComponent}
        renderTags={() => null}
        noOptionsText="No labels"
        renderOption={(props, option, { selected }) => (
          <OptionItem {...props} {...renderOptionProps(option, selected)} />
        )}
        options={[...rows].sort((a, b) => {
          // Display the selected labels first.
          let ai = value.indexOf(a);
          ai = ai === -1 ? value.length + rows.indexOf(a) : ai;
          let bi = value.indexOf(b);
          bi = bi === -1 ? value.length + rows.indexOf(b) : bi;
          return ai - bi;
        })}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => (
          <StyledInput
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            autoFocus
            placeholder="Filter labels"
          />
        )}
      />
      <Divider />
      {multiple && (
        <Button fullWidth onClick={() => onClose(pendingValue)}>
          Enregistrer
        </Button>
      )}
    </Box>
  );
}

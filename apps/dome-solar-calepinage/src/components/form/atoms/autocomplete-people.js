import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { findManyBuilder } from '@dots.cool/schemas';
import { useQuery } from '@apollo/client';
import { styled } from '@mui/system';
import {
  Avatar,
  AvatarGroup,
  Button,
  Chip,
  CircularProgress,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import stringAvatar from '../../../utils/string-to-avatar';
import { toKebabCase } from 'js-convert-case';

const CustomTag = styled(Chip)``;

const CustomRenderInput = (props) => {
  const { label, loading, ...params } = props;

  return (
    <TextField
      {...params}
      autoFocus
      label={label}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            {params.InputProps.endAdornment}
          </>
        ),
      }}
    />
  );
};

const FIND_MANY_COMMERCIAL = findManyBuilder(
  'person',
  'people'
)('id givenName familyName');

export default function AutocompletePeople(props) {
  const { label, showMax = 4, ...rest } = props;

  //* Active state
  const [isActive, setIsActive] = React.useState(false);
  const toggleActive = React.useCallback(() => {
    setIsActive((current) => !current);
  }, []);

  const handleClose = React.useCallback((_, reason) => {
    if (reason !== 'selectOption') {
      setIsActive(false);
    }
  }, []);

  //* Value
  const [value, setValue] = React.useState([]);
  const handleChange = React.useCallback((_, newValue) => {
    setValue(newValue);
  }, []);

  //* Input value
  const [inputValue, setInputValue] = React.useState('');
  const handleInputChange = React.useCallback((_, newInputValue) => {
    setInputValue(newInputValue);
  }, []);

  //* Request
  const { data, loading } = useQuery(FIND_MANY_COMMERCIAL);
  if (!isActive && !value.length) {
    return (
      <Button fullWidth onClick={toggleActive}>
        {label}
      </Button>
    );
  }

  if (!isActive && value.length)
    return (
      <Button fullWidth onClick={toggleActive}>
        <AvatarGroup total={value.length}>
          {value.slice(0, Math.min(showMax, value.length)).map((people, i) => (
            <Avatar
              key={people.id}
              {...stringAvatar(people.givenName, people.familyName)}
            />
          ))}
        </AvatarGroup>
      </Button>
    );

  return (
    <Autocomplete
      id={`autocomplete-input-${toKebabCase(label)}`}
      {...rest}
      openOnFocus
      value={value}
      inputValue={inputValue}
      onChange={handleChange}
      onInputChange={handleInputChange}
      isOptionEqualToValue={(option, value) =>
        option.firstName === value.familyName
      }
      options={data?.people?.filter(({ id }) => id) || []}
      getOptionLabel={(option) => option.familyName}
      renderOption={(props, option) => (
        <Stack
          key={option.id}
          component="li"
          {...props}
          spacing={1}
          direction="row"
        >
          <Avatar {...stringAvatar(option.givenName, option.familyName)} />
          <Typography>{option.givenName}</Typography>
          <Typography>{option.familyName}</Typography>
        </Stack>
      )}
      loading={loading}
      renderInput={(params) => (
        <CustomRenderInput {...params} label={label} loading={loading} />
      )}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
          <CustomTag
            key={option.id}
            {...getTagProps({ index })}
            label={option.familyName}
            avatar={
              <Avatar {...stringAvatar(option.givenName, option.familyName)} />
            }
          />
        ));
      }}
      multiple
      onClose={handleClose}
      disableCloseOnSelect
    />
  );
}

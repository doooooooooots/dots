import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { findManyBuilder } from '@dots.cool/schemas';
import { useQuery } from '@apollo/client';
import { Box, styled } from '@mui/system';
import { Avatar, Chip, CircularProgress } from '@mui/material';
import stringAvatar from '../../../utils/string-to-avatar';

const CustomTag = styled(Chip)``;

const FIND_MANY_COMMERCIAL = findManyBuilder(
  'person',
  'people'
)('id name familyName');

export default function AutocompleteCommercial(props) {
  const { placeholder } = props;

  const [inputValue, setInputValue] = React.useState('');

  //* REQUEST
  const { data, loading } = useQuery(FIND_MANY_COMMERCIAL);

  return (
    <Autocomplete
      id="asynchronous-demo"
      inputValue={inputValue}
      onChange={(_, newValue) => {
        console.log(newValue);
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      isOptionEqualToValue={(option, value) =>
        option.firstName === value.familyName
      }
      options={data?.people || []}
      getOptionLabel={(option) => option.familyName}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          Hello {option.familyName}
        </Box>
      )}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
          <CustomTag
            key={option.id}
            {...getTagProps({ index })}
            label={option.familyName}
            avatar={
              <Avatar
                {...stringAvatar(option.name + ' ' + option.familyName)}
              />
            }
          />
        ));
      }}
      multiple
    />
  );
}

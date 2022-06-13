import React from 'react';
import { Box, Stack } from '@mui/material';
import { isEmpty } from 'lodash';
import ButtonBase from './button-base';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import ColorDot from '../../color-dot/color-dot';
import ColorDotGroup from '../../color-dot/color-dot-group';
import SelectItemOption from './select-with-autocomplete/components/item-option';
import SelectFromQuery from './select-with-autocomplete/components/popper-from-query';
import { gql } from '@apollo/client';

const GET_PEOPLE = gql`
  query GetPeople($take: Int! = 4, $input: String! = "", $where:) {
    rows: people(
      take: $take
      where: $where
    ) {
      id
      givenName
      familyName
    }
  }
`;
const title = 'Assigner des personnes';
const placeholder = 'Chercher une personne';
const defaultButtonText = 'Personnes';
const defaultTooltip = 'Add a person';
const renderOption = (props, option, { selected }) => (
  <SelectItemOption
    {...props}
    title={option.name}
    icon={<TagIcon color={option.color} />}
    description={option.description}
    selected={selected}
    tooltip={option.description}
  />
);
const renderButtonText = (value) =>
  isEmpty(value) ? (
    defaultButtonText
  ) : (
    <ColorDotGroup>
      {value.map((label) => (
        <ColorDot key={label.name} color={label.color} borderSize={1} />
      ))}
    </ColorDotGroup>
  );
const renderButtonTooltip = (value, defaultValue) =>
  isEmpty(value) ? (
    defaultValue
  ) : (
    <Stack py="4px" spacing={'3px'}>
      {value.map((label) => (
        <Box
          key={label.name}
          sx={{
            height: 20,
            minWidth: 140,
            padding: '.15em 4px',
            fontWeight: 600,
            lineHeight: '15px',
            borderRadius: '2px',
            color: (theme) => theme.palette.getContrastText(label.color),
          }}
          style={{
            backgroundColor: label.color,
          }}
        >
          {label.name}
        </Box>
      ))}
    </Stack>
  );
const TagIcon = ({ color }) => (
  <Box
    component="span"
    sx={{
      width: 14,
      height: 14,
      flexShrink: 0,
      borderRadius: '3px',
      mr: 1,
      mt: '2px',
    }}
    style={{ backgroundColor: color }}
  />
);

function SelectTag(props) {
  const { tooltip = defaultTooltip } = props;

  return (
    <AutocompleteContext config={{ multiple: false, defaultValue: [] }}>
      <PopperButton>
        <AutocompletePopperWithRequest
          query={GET_PEOPLE}
          take={5}
        />
    </AutocompleteContext>
  );
}

export default SelectTag;

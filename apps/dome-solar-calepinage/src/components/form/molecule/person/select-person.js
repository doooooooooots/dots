import { isEmpty } from 'lodash';
import SelectItemOption from '../../select-with-autocomplete/components/list-item-option';
import {
  Avatar,
  AvatarGroup,
  createFilterOptions,
  Stack,
  Typography,
} from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import withDefaultValues from '../../../hoc/with-default-values';
import SelectWithAutocomplete from '../../select-with-autocomplete/select-with-autocomplete';
import { gql } from '@apollo/client';
import stringAvatar from '../../../../utils/string-to-avatar';
import { Box } from '@mui/system';
import { matchSorter } from 'match-sorter';

//* REQUEST
const GET_PEOPLE = gql`
  query GetPeople($take: Int! = 4, $input: String! = "", $exclude: [ID!] = []) {
    rows: people(
      take: $take
      orderBy: [{ givenName: asc }]
      where: {
        OR: [
          { givenName: { contains: $input, mode: insensitive } }
          { familyName: { contains: $input, mode: insensitive } }
        ]
        AND: { id: { notIn: $exclude } }
      }
    ) {
      id
      givenName
      familyName
    }
    count: peopleCount(
      where: {
        OR: [
          { givenName: { contains: $input, mode: insensitive } }
          { familyName: { contains: $input, mode: insensitive } }
        ]
        AND: { id: { notIn: $exclude } }
      }
    )
  }
`;

//* OPTIONS
const getOptionLabel = (option) => option.familyName;
const renderOption = (props, option, { selected }) => (
  <SelectItemOption
    {...props}
    title={option.givenName}
    icon={<PeopleAltOutlinedIcon color={option.color} />}
    description={option.familyName}
    selected={selected}
    tooltip={option.description}
  />
);

//* PREVIEW
const filterPreview = (options, input) =>
  matchSorter(options, input, {
    keys: ['givenName', 'familyName'],
  });
const renderPreview = (option, props = {}) => (
  <SelectItemOption
    title={
      <>
        <Box as="span" fontWeight={700}>
          {option.givenName}
        </Box>
        <span> {option.familyName}</span>
      </>
    }
    icon={
      <Avatar
        {...stringAvatar(option.givenName, option.familyName, {
          width: 25,
          height: 25,
          fontSize: 11,
        })}
      />
    }
    selected={true}
    hideStartIcon
    {...props}
  />
);

//* BUTTON
const renderButtonText = (value) =>
  isEmpty(value) ? (
    'Person'
  ) : (
    <AvatarGroup
      total={24}
      sx={{
        '& > div.MuiAvatar-root': {
          width: 20,
          height: 20,
          fontSize: 8,
          borderWidth: 1,
        },
      }}
    >
      {value.map((item) => (
        <Avatar
          key={item.id}
          {...stringAvatar(item.givenName, item.familyName)}
        />
      ))}
    </AvatarGroup>
  );

//* TOOLTIP
const PersonTooltip = (props) => {
  const { value } = props;
  const _value = value.slice(0, 11);
  const seeMore = value.length - _value.length;

  return (
    <Stack p={0.5}>
      {_value.map((item) => (
        <Typography key={item.id} variant="caption">
          {`${item.givenName} ${item.familyName}`}
        </Typography>
      ))}
      {seeMore > 0 && (
        <Typography
          variant="caption"
          fontStyle="italic"
        >{`${seeMore} de plus...`}</Typography>
      )}
    </Stack>
  );
};
const renderButtonTooltip = (value) =>
  isEmpty(value) ? 'Add a person' : <PersonTooltip value={value} />;

//* COMPONENT
const SelectPerson = withDefaultValues(SelectWithAutocomplete, {
  title: 'Assigner une personne',
  take: 15,
  placeholder: "Chercher quelqu'un",
  multiple: true,
  query: GET_PEOPLE,
  startIcon: PeopleAltOutlinedIcon,
  filterAttributes: ['givenName', 'familyName'],
  getOptionLabel,
  renderOption,
  renderButtonText,
  renderButtonTooltip,
  // Preview
  filterPreview,
  renderPreview,
  withPreview: true,
});

export default SelectPerson;

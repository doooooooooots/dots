import { isEmpty } from 'lodash';
import SelectItemOption from '../../select-with-autocomplete/components/item-option';
import { Stack } from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import withDefaultValues from '../../../hoc/with-default-values';
import SelectWithAutocomplete from '../../select-with-autocomplete/select-with-autocomplete';
import { gql } from '@apollo/client';

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

const SelectPerson = withDefaultValues(SelectWithAutocomplete, {
  title: 'Assigner une personne',
  take: 15,
  placeholder: "Chercher quelqu'un",
  multiple: true,
  query: GET_PEOPLE,
  startIcon: PeopleAltOutlinedIcon,
  filterAttributes: ['givenName', 'familyName'],
  getOptionLabel: (option) => option.familyName,
  renderOption: (props, option, { selected }) => (
    <SelectItemOption
      {...props}
      title={option.givenName}
      icon={<PeopleAltOutlinedIcon color={option.color} />}
      description={option.familyName}
      selected={selected}
      tooltip={option.description}
    />
  ),
  renderButtonText: (value) =>
    isEmpty(value) ? 'Person' : <>{value.familyName}</>,
  renderButtonTooltip: (value) =>
    isEmpty(value) ? (
      'Add a person'
    ) : (
      <Stack py="4px" spacing={'3px'}>
        <PeopleAltOutlinedIcon
          key={value.name}
          name={value.name}
          color={value.color}
        />
      </Stack>
    ),
});

export default SelectPerson;

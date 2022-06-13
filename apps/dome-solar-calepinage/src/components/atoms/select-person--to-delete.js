import React, { useCallback, useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import usePopper from '../design-system/select-with-autocomplete/hooks/use-popper';
import ButtonBase from './button-base';
import stringAvatar from '../../utils/string-to-avatar';
import useInput from '../../hooks/use-input';
import { gql, useLazyQuery } from '@apollo/client';
import PopperSearch from '../popper-search';
import SelectOptionItem from './select-option-item--to-delete';
import PopperList from '../popper-list';
import { isEmpty } from 'lodash';
import SelectNoResult from '../design-system/screens/no-result';
import { useDebounce } from 'react-use';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const GET_PEOPLE = gql`
  query GetPeople($take: Int! = 4, $input: String! = "") {
    rows: people(
      take: $take
      where: {
        OR: [
          { familyName: { contains: $input, mode: insensitive } }
          { givenName: { contains: $input, mode: insensitive } }
        ]
      }
    ) {
      id
      givenName
      familyName
    }
  }
`;

const avatarProps = {
  fontSize: 12,
  width: 24,
  height: 24,
};

function SelectPerson(props) {
  const { tooltip = 'number' } = props;
  const { open, anchorEl, onOpen, onClose } = usePopper(false);

  const [person, setPerson] = useState(null);
  const { input, onChange } = useInput('');
  const [searchPeople, { data, loading }] = useLazyQuery(GET_PEOPLE);

  //* FUNC -- When select a user
  const handleClearClick = useCallback(() => {
    setPerson(null);
  }, []);

  //* FUNC -- When select a user
  const handlePersonClick = useCallback(
    (_person) => () => {
      setPerson(_person);
      onClose();
    },
    [onClose]
  );

  //* FUNC -- Send request
  useDebounce(
    () => {
      searchPeople({
        variables: { take: 5, input: input },
      });
    },
    350,
    [input]
  );

  return (
    <>
      {/*//* BUTTON */}
      {isEmpty(person) ? (
        <ButtonBase
          tooltip={'Personne'}
          startIcon={<AddIcon />}
          onClick={onOpen}
        >
          Add person
        </ButtonBase>
      ) : (
        <ButtonBase
          tooltip={
            person ? `${person.givenName} ${person.familyName}` : tooltip
          }
          startIcon={
            <Avatar
              {...stringAvatar(
                person.givenName,
                person.familyName,
                avatarProps
              )}
            />
          }
          className={open ? 'is--focused' : ''}
          onClick={onOpen}
        />
      )}

      {/*//* RESULT */}
      <PopperSearch
        label="Choisir une personne"
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        input={input}
        onChange={onChange}
        loading={loading}
      >
        <PopperList>
          {!isEmpty(person) && (
            <SelectOptionItem
              primary={person.givenName}
              icon={
                <Avatar
                  {...stringAvatar(
                    person.givenName,
                    person.familyName,
                    avatarProps
                  )}
                />
              }
              secondaryAction={
                <IconButton
                  onClick={handleClearClick}
                  edge="end"
                  aria-label="comments"
                >
                  <CloseIcon />
                </IconButton>
              }
              onClick={handlePersonClick(person)}
              isActive
            />
          )}

          {!isEmpty(data?.rows) &&
            data?.rows?.map((_person) => (
              <SelectOptionItem
                key={_person.id}
                icon={
                  <Avatar
                    {...stringAvatar(
                      _person.givenName,
                      _person.familyName,
                      avatarProps
                    )}
                  />
                }
                onClick={handlePersonClick(_person)}
                primary={_person.givenName}
              />
            ))}
          {isEmpty(data?.rows) && <SelectNoResult />}
        </PopperList>
      </PopperSearch>
    </>
  );
}

export default SelectPerson;

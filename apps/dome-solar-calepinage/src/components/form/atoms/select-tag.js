import React, { useCallback, useState } from 'react';
import { IconButton } from '@mui/material';
import usePopper from '../../../hooks/use-popper';
import ButtonBase from './button-base';
import useInput from '../../../hooks/use-input';
import { gql, useLazyQuery } from '@apollo/client';
import PopperSearch from '../../popper-search';
import SelectOptionItem from './select-option-item';
import PopperList from '../../popper-list';
import { isEmpty } from 'lodash';
import SelectNoResult from './select-no-result';
import { useDebounce } from 'react-use';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';

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

function SelectTag(props) {
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
        <ButtonBase tooltip={'Personne'} icon={<AddIcon />} onClick={onOpen}>
          Add Tag
        </ButtonBase>
      ) : (
        <ButtonBase
          tooltip={
            person ? `${person.givenName} ${person.familyName}` : tooltip
          }
          icon={<DiscountOutlinedIcon />}
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
              icon={<DiscountOutlinedIcon />}
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

export default SelectTag;

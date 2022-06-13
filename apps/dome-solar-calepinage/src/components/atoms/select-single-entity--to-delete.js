import React, { useCallback, useState } from 'react';
import { IconButton } from '@mui/material';
import usePopper from './select-with-autocomplete/hooks/use-popper';
import ButtonBase from './button-base';
import useInput from '../../hooks/use-input';
import { gql, useLazyQuery } from '@apollo/client';
import PopperSearch from '../popper-search';
import SelectOptionItem from './select-option-item--to-delete';
import PopperList from '../popper-list';
import { isEmpty } from 'lodash';
import SelectNoResult from './select-with-autocomplete/components/no-result';
import { useDebounce } from 'react-use';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';

function SelectSingleEntity(props) {
  const {
    tooltip = 'number',
    query,
    take,
    skip,
    renderOption,
    getOptionLabel,
    renderInput,
    renderTags,
    defaultValue,
    multiple,
  } = props;

  const { open, anchorEl, onOpen, onClose } = usePopper(false);
  const [value, setValue] = useState(null);
  const { input, onChange } = useInput('');

  const [searchEntity, { data, loading }] = useLazyQuery(query);

  //* FUNC -- When select a user
  const handleClearClick = useCallback(() => {
    setValue(null);
  }, []);

  //* FUNC -- When select a user
  const handlePersonClick = useCallback(
    (_value) => () => {
      setValue(_value);
      onClose();
    },
    [onClose]
  );

  //* FUNC -- Send request
  useDebounce(
    () => {
      searchEntity({
        variables: { take: take, input: input },
      });
    },
    350,
    [input]
  );

  return (
    <>
      {/*//* BUTTON */}
      {isEmpty(value) ? (
        <ButtonBase
          tooltip={'Personne'}
          startIcon={<AddIcon />}
          onClick={onOpen}
        >
          Add Tag
        </ButtonBase>
      ) : (
        <ButtonBase
          tooltip={value ? `${value.givenName} ${value.familyName}` : tooltip}
          startIcon={<DiscountOutlinedIcon />}
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
          {!isEmpty(value) && (
            <SelectOptionItem
              primary={value.givenName}
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
              onClick={handlePersonClick(value)}
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

export default SelectSingleEntity;

import React, { useCallback, useMemo, useState } from 'react';
import { ClickAwayListener } from '@mui/material';
import { useAutocomplete, bindToggle, bindPopper } from '@dots.cool/hooks';
import FieldInput from './input';
import Popper from '../../popper-styled';
import { useLazyQuery } from '@apollo/client';
import { useDebounce } from 'react-use';
import { searchManyBuilder } from '@keystone-nx/schema--to-delete';
import { useDots } from '../context/dots-context';
import FieldLinkPopper from './field-link-popper';
import { usePopupState } from 'material-ui-popup-state/hooks';
import { useInput } from '@dots.cool/hooks';

function FieldLink(props) {
  const {
    // Field input
    title = '',
    name,
    label,
    value,
    onSubmit,
    // Autocomplete
    entity,
    renderModel = 'default',
    where = [],
    take = 10,
    skip = 0,
    orderBy = [],
    // Config
    withPreview,
    withDetails,
    variant,
    multiple,
  } = props;

  const popupState = usePopupState({
    variant,
    popupId: `${variant}-select-${name}`,
  });
  const { close, isOpen } = popupState;

  const { input: pendingValue, onChange } = useInput();

  const handleSubmit = useCallback(() => {
    onSubmit(pendingValue);
    close();
  }, [close, onSubmit, pendingValue]);

  return (
    <>
      <FieldInput
        name={name}
        label={label}
        icon={Icon}
        type={'link'}
        value={value}
        readOnly
        isActive={isOpen}
        {...bindToggle(popupState)}
      />
      <Popper {...bindPopper(popupState)} placement="bottom-start">
        {isOpen && (
          <FieldLinkPopper
            title={title}
            name={name}
            label={label}
            value={value}
            //
            entity={entity}
            renderModel={renderModel}
            // Request
            where={where}
            take={take}
            skip={skip}
            orderBy={orderBy}
            onCancel={close}
            onSubmit={handleSubmit}
            //
            multiple={multiple}
            //
            variant={variant}
            open={isOpen}
            onClose={handleSubmit}
            withCloseWarning
            withPreview={withPreview}
            withDetails={withDetails}
          />
        )}
      </Popper>
    </>
  );
}

export default FieldLink;

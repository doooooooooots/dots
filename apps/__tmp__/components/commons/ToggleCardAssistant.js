import React, { useCallback } from 'react';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import StorageBoxWizardForm from './storage/wizard/storage-box-wizard-step-2';
import useDialog from '../../src/hooks/use-dialog';
import ConnectedFormActions from './ConnectedFormActions';
import useConnectedForm from '@hooks/use-connected-form';
import { getMultiple as getInventories } from '../api/inventory-api';
import { getMultiple as getProducts } from '../api/product-api';
import { isEmpty } from 'lodash';
import { useDispatch } from '_trash/store/store';
import { setValue } from '../../_trash/slices/data-grid';

export default function ToggleCardAssistant() {
  const { open, onClose, onOpen } = useDialog();
  const dispatch = useDispatch();

  const { form } = useConnectedForm();
  const { expansionIdIn } = form;

  const handleSubmit = useCallback(async () => {
    let products = [];

    if (!isEmpty(expansionIdIn)) {
      products = await getProducts(
        {
          filter: {
            expansionIdIn
          },
          pagination: {
            first: -1
          }
        },
        ['id', 'number', 'expansion {abbreviation}', 'image']
      );
    }

    if (!isEmpty(products)) {
      const inventories = await getInventories(
        {
          filter: {
            productIdIn: products.map((item) => item.id)
          },
          pagination: {
            first: -1
          }
        },
        ['id']
      );
      dispatch(
        setValue(
          'selectionModel',
          inventories.map((item) => item.id)
        )
      );
    }

    onClose();
  }, [onClose, dispatch, expansionIdIn]);

  return (
    <>
      <Button variant='outlined' onClick={onOpen} startIcon={<AutoFixHighOutlinedIcon />} sx={{ height: 32 }}>
        Assistant de séléction
      </Button>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth='xl'
        scroll='paper'
        PaperProps={{ sx: { height: '100%' } }}
        fullWidth
      >
        <DialogTitle>Assistant de sélection de cartes</DialogTitle>
        <DialogContent dividers>
          <StorageBoxWizardForm />
        </DialogContent>
        <DialogActions>
          <ConnectedFormActions onCancel={onClose} onSubmit={handleSubmit} />
        </DialogActions>
      </Dialog>
    </>
  );
}

// import StorageChoiceAutocomplete from '@components/autocomplete-storage';
import { Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { useCallback, useState } from 'react';
import ConfirmModal from '../components/confirm-modal';
import { ModalComponentProps } from '../components/dialog/dialog';

function StorageMoveManyModal(props: ModalComponentProps) {
  const { targets, onSubmit, onClose, ...other } = props;

  // *MUTATION
  const [targetBox, setTargetBox] = useState({});

  // *FUNC -- OnSubmit
  const handleSubmitClick = useCallback(() => {
    if (!isEmpty(targetBox) && targetBox.id)
      onSubmit({
        variables: {
          ids: targets,
          storageID: targetBox.id,
        },
      });
    onClose();
  }, [onSubmit, onClose, targetBox, targets]);

  return (
    <ConfirmModal {...other} onCancel={onClose} onSubmit={handleSubmitClick}>
      {/* STORAGEBOX */}
      <Typography variant="body1" fontWeight="bold">
        Choisis le rack vers lequel déplacer les cartes :
      </Typography>
      {/* <StorageChoiceAutocomplete onChange={setTargetBox} /> */}
    </ConfirmModal>
  );
}

export default StorageMoveManyModal;

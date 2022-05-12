import React from 'react';
import { DELETE_MULTIPLE, DELETE_ONE, MOVE, PUBLISH, UNLIST, UNPUBLISH, UPDATE_MULTIPLE } from 'src/constants';

import ModalDeleteMultiple from '@components/modals/storage-storage-modal-delete-multiple';
import ModalDeleteOne from '@components/modals/storage-modal-delete';
import ModalMoveMultiple from '@components/modals/storage-modal-move-multiple';
import ModalPublishMultiple from '@components/modals/storage-modal-publish-multiple';
import ModalUnlistMultiple from '@components/modals/storage-modal-unlist-multiple';
import ModalUnpublishMultiple from '@components/modals/storage-modal-unpublish-multiple';
import ModalUpdateMultiple from '@components/modals/storage-modal-update-multiple';

function StorageModals(props) {
  const { refetch, action, target, onClose } = props;
  return (
    <>
      {action === MOVE && <ModalMoveMultiple target={target} onClose={onClose} onSubmitCallback={() => refetch()} />}
      {action === UNLIST && <ModalUnlistMultiple target={target} onClose={onClose} />}
      {action === PUBLISH && <ModalPublishMultiple target={target} onClose={onClose} />}
      {action === UNPUBLISH && <ModalUnpublishMultiple target={target} onClose={onClose} />}
      {action === DELETE_ONE && <ModalDeleteOne target={target} onClose={onClose} onSubmitCallback={() => refetch()} />}
      {action === DELETE_MULTIPLE && (
        <ModalDeleteMultiple target={target} onClose={onClose} onSubmitCallback={() => refetch()} />
      )}
      {action === UPDATE_MULTIPLE && <ModalUpdateMultiple target={target} onClose={onClose} />}
    </>
  );
}

export default StorageModals;

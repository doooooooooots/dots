import {
  UPDATE_ONE,
  UPDATE_MANY,
  DELETE_ONE,
  DELETE_MANY,
  MOVE,
  PUBLISH,
  UNLIST,
  UNPUBLISH,
} from '@dots.cool/tokens';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import ConfirmModal from './confirm-modal-base';

const ConfirmModalWithPresets = (props: any) => {
  const { variant, ...other } = props;

  let Icon = null;
  let title = '';
  let submitText = '';
  let color = 'primary';
  let description = '';

  switch (variant) {
    case UPDATE_ONE:
      Icon = <EditOutlinedIcon />;
      title = "Mettre à jour l'élément";
      submitText = 'Mettre à jour';
      color = 'warning';
      description = '';
      break;
    case UPDATE_MANY:
      Icon = <EditOutlinedIcon />;
      title = 'Mettre à jour les éléments';
      submitText = 'Mettre à jour';
      color = 'warning';
      description = '';
      break;
    case DELETE_ONE:
      Icon = <DeleteOutlineIcon />;
      title = 'Supprimer un élément';
      submitText = "Supprimer l'élément";
      color = 'error';
      description = '';
      break;
    case DELETE_MANY:
      Icon = <DeleteOutlineIcon />;
      title = 'Supprimer les éléments';
      submitText = 'Supprimer les éléments';
      color = 'error';
      description = '';
      break;
    case MOVE:
      Icon = <CallSplitIcon />;
      title = 'Déplacer un éléments';
      submitText = 'Déplacer';
      color = 'info';
      description = '';
      break;
    case PUBLISH:
      Icon = <EditOutlinedIcon />;
      title = 'Publier les éléments';
      submitText = 'Publier';
      color = 'success';
      description = '';
      break;
    case UNLIST:
      Icon = <EditOutlinedIcon />;
      title = 'Mettre à jour les éléments';
      submitText = 'Mettre à jour';
      color = 'warning';
      description = '';
      break;
    case UNPUBLISH:
      Icon = <EditOutlinedIcon />;
      title = 'Mettre à jour les éléments';
      submitText = 'Mettre à jour';
      color = 'warning';
      description = '';
      break;
  }
  return (
    <ConfirmModal
      textAlign="center"
      title={title}
      color={color}
      description={description}
      icon={Icon}
      cancelText="Annuler"
      submitText={submitText}
      {...other}
    />
  );
};

export default ConfirmModalWithPresets;

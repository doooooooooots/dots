import { GRAPHQL_REQUESTS, GRAPHQL_ACTIONS } from '@dots.cool/tokens';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import ConfirmModalBase from '../confirm-modal-base/confirm-modal-base';

/**
 *
 * @param props
 * @returns
 */
const ConfirmModal = (props: any) => {
  const { variant, ...other } = props;

  let Icon = null;
  let title = '';
  let submitText = '';
  let color = 'primary';
  let description = '';

  switch (variant) {
    case GRAPHQL_REQUESTS.UpdateOne:
      Icon = <EditOutlinedIcon />;
      title = "Mettre à jour l'élément";
      submitText = 'Mettre à jour';
      color = 'warning';
      description = '';
      break;
    case GRAPHQL_REQUESTS.UpdateMany:
      Icon = <EditOutlinedIcon />;
      title = 'Mettre à jour les éléments';
      submitText = 'Mettre à jour';
      color = 'warning';
      description = '';
      break;
    case GRAPHQL_REQUESTS.DeleteOne:
      Icon = <DeleteOutlineIcon />;
      title = 'Supprimer un élément';
      submitText = "Supprimer l'élément";
      color = 'error';
      description = '';
      break;
    case GRAPHQL_REQUESTS.DeleteMany:
      Icon = <DeleteOutlineIcon />;
      title = 'Supprimer les éléments';
      submitText = 'Supprimer les éléments';
      color = 'error';
      description = '';
      break;
    case GRAPHQL_ACTIONS.Move:
      Icon = <CallSplitIcon />;
      title = 'Déplacer un éléments';
      submitText = 'Déplacer';
      color = 'info';
      description = '';
      break;
    case GRAPHQL_ACTIONS.Publish:
      Icon = <EditOutlinedIcon />;
      title = 'Publier les éléments';
      submitText = 'Publier';
      color = 'success';
      description = '';
      break;
    case GRAPHQL_ACTIONS.Unlist:
      Icon = <EditOutlinedIcon />;
      title = 'Mettre à jour les éléments';
      submitText = 'Mettre à jour';
      color = 'warning';
      description = '';
      break;
    case GRAPHQL_ACTIONS.Unpublish:
      Icon = <EditOutlinedIcon />;
      title = 'Mettre à jour les éléments';
      submitText = 'Mettre à jour';
      color = 'warning';
      description = '';
      break;
  }
  return (
    <ConfirmModalBase
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

export default ConfirmModal;

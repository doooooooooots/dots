import DeleteOne from '../../modals/logic/delete-one';
import DeleteMany from '../../modals/logic/delete-many';

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

const defaultDialogComponents = {
  [UPDATE_ONE]: '',
  [UPDATE_MANY]: '',
  [DELETE_ONE]: DeleteOne,
  [DELETE_MANY]: DeleteMany,
  [MOVE]: '',
  [PUBLISH]: '',
  [UNLIST]: '',
  [UNPUBLISH]: '',
};

export default defaultDialogComponents;

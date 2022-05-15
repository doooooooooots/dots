import {
  UPDATE_ONE,
  UPDATE_MANY,
  DELETE_ONE,
  DELETE_MANY,
  MOVE,
  PUBLISH,
  UNLIST,
  UNPUBLISH,
} from '@keystone-nx/tokens_tpm';

const defaultDialogComponents = {
  [UPDATE_ONE]: '',
  [UPDATE_MANY]: '',
  [DELETE_ONE]: '',
  [DELETE_MANY]: '',
  [MOVE]: '',
  [PUBLISH]: '',
  [UNLIST]: '',
  [UNPUBLISH]: '',
};

export default defaultDialogComponents;

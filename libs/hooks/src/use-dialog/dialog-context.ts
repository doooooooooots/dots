import { createStateContext } from 'react-use';

const initialDialog = {
  open: false,
  form: {},
};

const [useDialogState, SharedDialogProvider] =
  createStateContext(initialDialog);

export { useDialogState };
export default SharedDialogProvider;

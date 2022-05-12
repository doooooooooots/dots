import { Alert } from '@mui/material';
import useMemory from './use-memory';

const withMemoryForm = (Component: any) => {
  const MemorableComp = (props: any) => {
    const { id } = props;
    const { actions, state }: any = useMemory();

    if (!id) return <Alert severity="error">Form id is missing</Alert>;

    return (
      <Component
        {...props}
        defaultValues={state[id]}
        onUnmount={(data: any) => actions.setFormAction({ id, data })}
      />
    );
  };
  return MemorableComp;
};
export default withMemoryForm;

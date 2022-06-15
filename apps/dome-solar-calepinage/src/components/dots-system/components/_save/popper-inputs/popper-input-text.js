import { ProvidePopper, usePopper } from './hooks/use-popper';
import PopperGrowWithClickaway from './components/popper-grow-with-clickaway';
import { Stack } from '@mui/material';
import PopperActions from './components/popper-actions';
import PopperInputButton from './components/button';
import withPopperContext from './components/hoc/withPopperContext';
import PopperTextField from './components/popper-textfield';

const InputWithPopper = (props) => {
  let { initialState } = props;

  return (
    // useContext so we have only one popper at time
    <ProvidePopper initialState={initialState}>
      <PopperInputText {...props} />
    </ProvidePopper>
  );
};

const PopperInputText = (props) => {
  const { noValueText = 'Entrez une valeur' } = props;

  const { onButtonClick, onClose, open, value, onConfirm } = usePopper();

  return (
    <>
      <PopperInputButton
        sx={{ justifyContent: 'flex-start' }}
        onClick={onButtonClick}
        isActive={open}
      >
        {value || noValueText}
      </PopperInputButton>
      <PopperGrowWithClickaway placement="bottom-start">
        <Stack direction="column" p={0.5}>
          <PopperTextField />
          <PopperActions
            variant="icons"
            onConfirm={onConfirm}
            onCancel={onClose}
          />
        </Stack>
      </PopperGrowWithClickaway>
    </>
  );
};

export default withPopperContext(InputWithPopper);

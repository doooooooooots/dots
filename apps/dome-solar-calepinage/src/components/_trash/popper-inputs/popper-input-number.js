import { useCallback } from 'react';
import { Grid, IconButton, Stack, Button, TextField } from '@mui/material';
import PopperGrowWithClickaway from '../../popper-grow-with-clickaway';
import BackspaceIcon from '@mui/icons-material/BackspaceOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PopperInputButton from './components/button';
import { usePopper } from './hooks/use-popper';
import withPopperContext from './components/hoc/withPopperContext';
import PopperTextField from './components/popper-textfield';

const DIGITS = new Array(9).fill(1);
const DIGIT_WIDTH = 80;
const DIGIT_HEIGHT = 36;
const GRID_SPACING = 1;

const DigitButton = ({ sx, ...other }) => (
  <IconButton
    sx={[
      sx,
      {
        width: '100%',
        height: DIGIT_HEIGHT,
        bgcolor: 'background.default',
        fontSize: 18,
        '&:hover': {
          bgcolor: 'background.default',
        },
        '&:active': {
          bgcolor: 'neutral.main',
          color: 'neutral.contrastText',
        },
      },
    ]}
    {...other}
  />
);

function InputNumber(props) {
  const { tooltip = 'number' } = props;

  const {
    open,
    anchorEl,
    value,
    pendingValue,
    setPendingValue,
    onButtonClick,
    onClose,
    onConfirm,
  } = usePopper(false);

  const handleDigitClick = useCallback(
    (value) => () => {
      if (!(value === ',' && pendingValue.indexOf(',') !== -1))
        setPendingValue(`${pendingValue}${value}`);
    },
    [pendingValue, setPendingValue]
  );
  const handleDeleteClick = useCallback(() => {
    if (pendingValue.length)
      setPendingValue(`${pendingValue.slice(0, pendingValue.length - 1)}`);
  }, [pendingValue, setPendingValue]);

  const handleClearClick = useCallback(() => {
    setPendingValue('');
  }, [setPendingValue]);

  return (
    <>
      <PopperInputButton
        tooltip={tooltip}
        onClick={onButtonClick}
        isActive={open}
        sx={{ whiteSpace: 'nowrap' }}
      >
        {value || 'Valeur ?'}
      </PopperInputButton>
      <PopperGrowWithClickaway
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        p={0}
      >
        <Stack p={2} spacing={1}>
          <PopperTextField label="Enter a number" type="number" />
          <Stack
            direction="row"
            p={GRID_SPACING}
            bgcolor={'neutral.background'}
            borderRadius={1}
          >
            <Grid
              container
              sx={{ width: 3 * DIGIT_WIDTH, mr: GRID_SPACING }}
              spacing={GRID_SPACING}
            >
              {DIGITS.map((_, index) => (
                <Grid key={index} item xs={4}>
                  <DigitButton onClick={handleDigitClick(index + 1)}>
                    {index + 1}
                  </DigitButton>
                </Grid>
              ))}
              <Grid item xs={4}>
                <DigitButton onClick={handleDigitClick('00')}>00</DigitButton>
              </Grid>
              <Grid item xs={4}>
                <DigitButton onClick={handleDigitClick(0)}>{0}</DigitButton>
              </Grid>
              <Grid item xs={4}>
                <DigitButton onClick={handleDigitClick(',')}>,</DigitButton>
              </Grid>
            </Grid>
            <Grid
              container
              columns={1}
              sx={{ width: 1 * DIGIT_WIDTH }}
              spacing={GRID_SPACING}
            >
              <Grid item xs={1}>
                <DigitButton onClick={handleDeleteClick}>
                  <BackspaceIcon fontSize="small" />
                </DigitButton>
              </Grid>
              <Grid item xs={1}>
                <DigitButton onClick={handleClearClick}>
                  <RestartAltIcon fontSize="small" />
                </DigitButton>
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onConfirm}
                  sx={{
                    width: '100%',
                    height: DIGIT_HEIGHT * 2 + GRID_SPACING * 8,
                  }}
                >
                  <KeyboardReturnIcon fontSize="small" />
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </PopperGrowWithClickaway>
    </>
  );
}

export default withPopperContext(InputNumber);

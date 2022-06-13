import React, { useCallback, useState } from 'react';
import { Grid, IconButton, Stack, Button, TextField } from '@mui/material';
import PopperGrowWithClickaway from '../popper-grow-with-clickaway';
import usePopper from '../design-system/select-with-autocomplete/hooks/use-popper';
import BackspaceIcon from '@mui/icons-material/BackspaceOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { styled } from '@mui/system';

const DIGITS = new Array(9).fill(1);
const DIGIT_WIDTH = 80;
const DIGIT_HEIGHT = 36;
const GRID_SPACING = 1;

const DigitButton = styled(IconButton)(
  ({ theme }) => `
  width:100%;
  height:${DIGIT_HEIGHT}px;
  background-color: ${theme.palette.background.default};
  font-size:18px;
`
);

function InputNumber(props) {
  const { tooltip = 'number' } = props;

  const [number, setNumber] = useState('');
  const [pendingValue, setPendingValue] = useState('');
  const { open, anchorEl, onOpen, onClose } = usePopper(false);

  const handleOpenClick = useCallback(
    (event) => {
      setPendingValue(number);
      onOpen(event.target);
    },
    [number, onOpen]
  );

  const handleChange = useCallback((event) => {
    setPendingValue(event.target.value);
  }, []);

  const handleDigitClick = useCallback(
    (value) => () => {
      if (!(value === ',' && pendingValue.indexOf(',') !== -1))
        setPendingValue(`${pendingValue}${value}`);
    },
    [pendingValue]
  );
  const handleDeleteClick = useCallback(() => {
    if (pendingValue.length)
      setPendingValue(`${pendingValue.slice(0, pendingValue.length - 1)}`);
  }, [pendingValue]);

  const handleClearClick = useCallback(() => {
    setPendingValue('');
  }, []);

  const onSave = useCallback(
    (event) => {
      setNumber(pendingValue);
      onClose();
    },
    [pendingValue, onClose]
  );

  return (
    <>
      <Button
        tooltip={tooltip}
        className={open ? 'is--focused' : ''}
        onClick={handleOpenClick}
      >
        {number || 'Valeur ?'}
      </Button>
      <PopperGrowWithClickaway
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        p={0}
      >
        <Stack p={2} spacing={1}>
          <TextField
            autoFocus
            value={pendingValue}
            onChange={handleChange}
            label="Enter a number"
            size="small"
          />
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
                  onClick={onSave}
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

export default InputNumber;

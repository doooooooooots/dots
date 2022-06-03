import React, { useCallback, useState } from 'react';
import { Grid, IconButton, Stack, Button, TextField } from '@mui/material';
import PopperGrowWithClickaway from '../../popper-grow-with-clickaway';
import usePopper from '../../../hooks/use-popper';
import BackspaceIcon from '@mui/icons-material/BackspaceOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { styled } from '@mui/system';
import ButtonBase from './button-base';

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

function SelectNumber(props) {
  const { tooltip = 'number' } = props;

  const { open, anchorEl, onOpen, onClose } = usePopper(false);

  const [number, setNumber] = useState('');

  const handleChange = useCallback((event) => {
    setNumber(event.target.value);
  }, []);

  const handleDigitClick = useCallback(
    (value) => () => {
      if (!(value === ',' && number.indexOf(',') !== -1))
        setNumber(`${number}${value}`);
    },
    [number]
  );
  const handleDeleteClick = useCallback(() => {
    if (number.length) setNumber(`${number.slice(0, number.length - 1)}`);
  }, [number]);

  const handleClearClick = useCallback(() => {
    setNumber('');
  }, []);

  return (
    <>
      <ButtonBase
        tooltip={tooltip}
        className={open ? 'is--focused' : ''}
        onClick={onOpen}
      >
        {number || 'Valeur ?'}
      </ButtonBase>
      <PopperGrowWithClickaway
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        p={0}
      >
        <Stack p={2} spacing={1}>
          <TextField
            autoFocus
            value={number}
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
                  onClick={onClose}
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

export default SelectNumber;

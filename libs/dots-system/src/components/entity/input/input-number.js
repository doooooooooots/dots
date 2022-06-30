import React, { useCallback, useEffect, useState } from 'react';
import { Grid, IconButton, Stack, Button, Typography } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/BackspaceOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PopperTextField from '../styled-input';

const DIGITS = new Array(9).fill(1);
const DIGIT_WIDTH = 80;
const DIGIT_HEIGHT = 36;
const GRID_SPACING = 1;

// REF: https://www.sitepoint.com/react-tutorial-build-calculator-app/
// REF: https://stackoverflow.com/questions/6479236/calculate-string-value-in-javascript-not-using-eval

const DigitButton = React.memo(({ sx, ...other }) => (
  <IconButton
    sx={[
      sx,
      {
        width: '100%',
        height: DIGIT_HEIGHT,
        // bgcolor: 'neutral.100',
        color: 'neutral.800',
        fontSize: 18,
        border: 1,
        borderColor: 'neutral.150',
        '&:hover': {
          bgcolor: 'neutral.50',
        },
        '&:active': {
          bgcolor: 'neutral.main',
          color: 'neutral.contrastText',
        },
      },
    ]}
    {...other}
  />
));
DigitButton.displayName = 'DigitButton';

const getValue = (value) => parseInt(value, 10);

function InputNumber(props) {
  const { value, onChange, onSubmit, onCancel } = props;

  const [input, setInput] = useState(`${value}`);

  /**
   * User type value in input
   */
  const handleChange = useCallback((event) => {
    setInput(event.target.value);
  }, []);

  /**
   * User clicks on a digit
   */
  const handleDigitClick = useCallback(
    (_value) => (event) => {
      if (!(_value === '.' && input.indexOf('.') !== -1)) {
        setInput(`${input}${_value}`);
      }
    },
    [input]
  );

  /**
   * User clicks on a delete button
   */
  const handleDeleteClick = useCallback(() => {
    if (input.length) {
      setInput(`${input.slice(0, input.length - 1)}`);
    }
  }, [input]);

  /**
   * User clicks on a reset button
   */
  const handleClearClick = useCallback(() => {
    setInput('');
  }, []);

  /**
   * User clicks on submit button
   */
  const handleSubmit = useCallback(() => {
    onSubmit(getValue(input));
  }, [input, onSubmit]);

  /**
   * Suscribe to each changes
   */
  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(getValue(input));
    }
  }, [input, onChange]);

  return (
    <Stack p={1} pt={2} spacing={1}>
      <Stack>
        <PopperTextField
          label="Enter a number"
          value={input}
          variant="outlined"
          onChange={handleChange}
          onClear={handleClearClick}
          autoFocus
          sx={{
            borderRadius: 1,
            fieldset: {
              // border: 'none',
            },
            input: {
              fontSize: 32,
              width: 3 * DIGIT_WIDTH + 1.5 * GRID_SPACING * 8,
            },
          }}
        />
        <Typography
          variant="caption"
          fontStyle="italic"
          color="neutral.400"
          textAlign="right"
          mt={1}
        >
          3*42+12*(12)+5
        </Typography>
      </Stack>
      <Stack direction="row" bgcolor={'background.default'} borderRadius={1}>
        <Grid
          container
          sx={{ width: 3 * DIGIT_WIDTH, mr: GRID_SPACING }}
          spacing={GRID_SPACING}
        >
          {/* Digit buttons */}
          {DIGITS.map((_, index) => (
            <Grid key={index} item xs={4}>
              <DigitButton onClick={handleDigitClick(index + 1)}>
                {index + 1}
              </DigitButton>
            </Grid>
          ))}

          {/* Double zero button */}
          <Grid item xs={4}>
            <DigitButton onClick={handleDigitClick('00')}>00</DigitButton>
          </Grid>
          {/* Single zero button */}
          <Grid item xs={4}>
            <DigitButton onClick={handleDigitClick(0)}>{0}</DigitButton>
          </Grid>
          {/* Decimal button */}
          <Grid item xs={4}>
            <DigitButton onClick={handleDigitClick('.')}>,</DigitButton>
          </Grid>
        </Grid>

        <Grid
          container
          columns={1}
          sx={{ width: 1 * DIGIT_WIDTH }}
          spacing={GRID_SPACING}
        >
          {/* Erase Button */}
          <Grid item xs={1}>
            <DigitButton onClick={handleDeleteClick}>
              <BackspaceIcon fontSize="small" />
            </DigitButton>
          </Grid>

          {/* Clear Button */}
          <Grid item xs={1}>
            <DigitButton onClick={handleClearClick}>
              <RestartAltIcon fontSize="small" />
            </DigitButton>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
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
  );
}

export default InputNumber;

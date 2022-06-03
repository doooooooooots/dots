import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import React from 'react';
import StepButtons from './StepButtons';

export default function StepDrawerContainer(props) {
  const { onNext, disabled, children } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: 'background.default',
      }}
    >
      <Box
        sx={{
          overflow: 'scroll',
          flex: 1,
          py: 2,
          px: 4,
        }}
      >
        {children}
      </Box>

      {/**
       * Buttons
       */}
      <StepButtons disabled={disabled} onNext={onNext} />
    </Box>
  );
}

StepDrawerContainer.propTypes = {
  onNext: PropTypes.any,
  children: PropTypes.any,
  disabled: PropTypes.any,
};

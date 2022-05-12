import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { createTeleporter } from 'react-teleporter';

const DashBoardNavTeleporter = createTeleporter();

export function DashBoardNavTarget() {
  return (
    <DashBoardNavTeleporter.Target
      as={Box}
      sx={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        mt: '44px',
        pt: '20px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        width: 'inherit'
      }}
    />
  );
}

export function DashBoardNavSource({ children }) {
  return <DashBoardNavTeleporter.Source>{children}</DashBoardNavTeleporter.Source>;
}

DashBoardNavSource.propTypes = {
  children: PropTypes.any
};

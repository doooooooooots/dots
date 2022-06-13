import React from 'react';
import PropTypes from 'prop-types';
import { StepConnector, stepConnectorClasses, Tooltip } from '@mui/material';
import Check from '@mui/icons-material/Check';
import { styled } from '@mui/system';

export function QontoStepIcon(props) {
  const { active, completed, className, label } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <Tooltip title={label}>
          {/* eslint-disable jsx-a11y/control-has-associated-label */}
          {/* eslint-disable jsx-a11y/interactive-supports-focus */}
          <div
            className="QontoStepIcon-circle"
            onKeyPress={() => null}
            role="button"
          />
        </Tooltip>
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

export const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.background.contrast,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.background.contrast,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'ownerState',
})(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  cursor: 'pointer',
  alignItems: 'center',
  ...(ownerState.active && {
    color: theme.palette.dots.primary,
  }),
  '& .QontoStepIcon-completedIcon': {
    color: theme.palette.background.contrast,
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

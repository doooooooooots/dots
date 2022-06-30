import React from 'react';
import { Button, Tooltip } from '@mui/material';

const StyledButton = (props, ref) => {
  const { variant, color, sx = {}, isActive, ...other } = props;
  return (
    <Button
      {...other}
      ref={ref}
      sx={[
        {
          minWidth: 40,
          '&, & .MuiTypography-root': {
            typography: 'body2',
            fontWeight: '500',
            color:
              variant !== 'contained'
                ? `${color}.main`
                : `${color}.contrastText`,
          },
        },
        isActive && {
          bgcolor: `${color}.hover`,
          '&:not, & .MuiTypography-root': {
            color: `${color}.contrastText`,
          },
        },
        sx,
      ]}
      color={color}
      variant={variant}
    />
  );
};

const ButtonWithRef = React.forwardRef(StyledButton);

function AutocompleteButton(props) {
  const {
    // Button
    variant,
    color,
    startIcon,
    endIcon,
    onClick,
    children,
    isActive,
    // Tooltip
    title,
    placement,
    followCursor,
  } = props;

  const Button = (
    <ButtonWithRef
      variant={variant}
      color={color}
      startIcon={!!startIcon && startIcon}
      endIcon={!!endIcon && endIcon}
      onClick={onClick}
      isActive={isActive}
    >
      {children}
    </ButtonWithRef>
  );

  if (title)
    return (
      <Tooltip title={title} placement={placement} followCursor={followCursor}>
        {Button}
      </Tooltip>
    );
  return Button;
}

export default AutocompleteButton;

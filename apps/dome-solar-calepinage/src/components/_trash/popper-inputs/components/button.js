import React from 'react';
import { Button, Tooltip } from '@mui/material';

const StyledButton = (props, ref) => {
  const {
    sx,
    variant = 'standard',
    color = 'neutral',
    isActive,
    ...other
  } = props;
  return (
    <Button
      {...other}
      ref={ref}
      variant={variant}
      color={color}
      sx={[
        sx,
        {
          typography: 'body2',
          minWidth: 40,
          px: 1,
          whiteSpace: 'nowrap',
        },
        isActive && {
          bgcolor: 'neutral.background',
        },
      ]}
    />
  );
};

const ButtonWithRef = React.forwardRef(StyledButton);

function PopperInputButton(props) {
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

export default PopperInputButton;

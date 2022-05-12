import * as React from 'react';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import { Box, Button, ClickAwayListener } from '@mui/material';

// https://mui.com/components/menus/#menulist-composition
export default function ButtonPopper(props) {
  const {
    children,
    color = 'neutral',
    variant = 'text',
    placement = 'bottom-start',
    PopperComponent,
    componentProps = {},
    ...other
  } = props;
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const id = `transition-popper`;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { popper = {}, grow = {}, popperComponent = {} } = componentProps;
  return (
    <>
      <Button
        aria-describedby={id}
        color={color}
        variant={variant}
        onClick={handleClick}
        {...other}
      >
        {children}
      </Button>
      <Popper
        id={id}
        open={!!open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        {...popper}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose} mouseEvent={'onMouseUp'}>
            <Grow {...TransitionProps} timeout={150} {...grow}>
              <Box
                sx={{
                  backgroundColor: 'background.default',
                  boxShadow: (theme) => theme.shadowStyles.stripe,
                  borderRadius: 1,
                }}
              >
                <PopperComponent {...popperComponent} onClose={handleClose} />
              </Box>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}
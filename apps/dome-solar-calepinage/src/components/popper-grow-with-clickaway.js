import { Box, ClickAwayListener, Grow, Popper } from '@mui/material';

function PopperGrowWithClickaway(props) {
  const {
    open,
    onClose,
    anchorEl,
    componentProps = {},
    children,
    sx = {},
  } = props;

  const id = open ? 'popper-grow-with-clickaway' : undefined;
  const { popper = {}, grow = {} } = componentProps;

  return (
    <Popper id={id} open={!!open} anchorEl={anchorEl} transition {...popper}>
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={onClose}>
          <Grow {...TransitionProps} timeout={150} {...grow}>
            <Box
              sx={{
                backgroundColor: 'background.default',
                minWidth: 190,
                borderRadius: 1,
                mt: 1,
                boxShadow: (theme) => theme.shadows[8],
                ...sx,
              }}
            >
              {children}
            </Box>
          </Grow>
        </ClickAwayListener>
      )}
    </Popper>
  );
}

export default PopperGrowWithClickaway;

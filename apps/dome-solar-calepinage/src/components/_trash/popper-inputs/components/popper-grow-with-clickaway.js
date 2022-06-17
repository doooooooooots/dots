import { Box, ClickAwayListener, Grow } from '@mui/material';
import { usePopper } from '../hooks/use-popper';
import Popper from './popper';
import { useTheme } from '@mui/material/styles';

function PopperGrowWithClickaway(props) {
  const {
    componentProps = {},
    placement = 'bottom',
    children,
    sx = {},
  } = props;

  const theme = useTheme();
  const { id, open, onClose, anchorEl } = usePopper();
  const { popper = {}, grow = {} } = componentProps;

  return (
    <Popper
      id={id}
      open={!!open}
      anchorEl={anchorEl}
      placement={placement}
      transition
      {...popper}
    >
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={onClose}>
          <Grow {...TransitionProps} timeout={150} {...grow}>
            <Box
              sx={{
                mt: 0.5,
                bgcolor: 'background.default',
                borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.shadows[5],
                overflow: 'hidden',
                minWidth: 250,
                minheight: 120,
                ...sx,
              }}
            >
              {open && children}
            </Box>
          </Grow>
        </ClickAwayListener>
      )}
    </Popper>
  );
}

export default PopperGrowWithClickaway;

import React, { Fragment, useCallback } from 'react';
import Grow from '@mui/material/Grow';
import { ClickAwayListener, List, ListItem, Popper } from '@mui/material';
import { Box } from '@mui/system';
import StyledListbox from '../../styled-listbox';
import StyledOption from '../../select/styled-option';

const ChipwithPopper = (props) => {
  const { renderChip, options, componentProps = {} } = props;

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
    setOpen((current) => !current);
  }, []);

  const handleClickAway = useCallback((event) => {
    setOpen(false);
  }, []);

  const id = open ? 'chip-status' : undefined;
  const { popper = {}, grow = {} } = componentProps;

  return (
    <>
      {renderChip({
        open: open,
        onOpen: handleClick,
        onClose: handleClickAway,
      })}

      <Popper
        id={id}
        open={!!open}
        anchorEl={anchorEl}
        transition
        sx={{ zIndex: 1300 }}
        {...popper}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Grow {...TransitionProps} timeout={150} {...grow}>
              <Box
                sx={{
                  backgroundColor: 'background.default',
                  minWidth: 190,
                  p: 2,
                  borderRadius: 1,
                  mt: 1,
                  boxShadow: (theme) => theme.shadows[8],
                }}
              >
                <StyledListbox>
                  {options.map((option) => (
                    <StyledOption key={option}>{option}</StyledOption>
                  ))}
                </StyledListbox>
              </Box>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

export default ChipwithPopper;

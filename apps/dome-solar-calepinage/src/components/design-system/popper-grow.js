import { Box, Grow, Popper } from '@mui/material';
import React, { useEffect, useState } from 'react';

const defaultId = 'popper-grow';
const timeout = 250;

function PopperGrow(props) {
  const {
    id = defaultId,
    open,
    anchorEl,
    placement,
    sx = {},
    children,
  } = props;

  const [alreadyOpen, setAlreadyOpen] = useState(false);

  useEffect(() => {
    if (alreadyOpen && open === false) {
      setAlreadyOpen(false);
    }
    if (!alreadyOpen && open === true) {
      setTimeout(() => setAlreadyOpen(true), timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Popper
      id={id}
      open={!!open}
      anchorEl={anchorEl}
      placement={placement}
      modifiers={[
        {
          name: 'computeStyles',
          options: {
            adaptive: false,
          },
        },
      ]}
      transition
      className={alreadyOpen ? 'is--open' : ''}
      sx={{
        '&.is--open': {
          transition: 'transform 0.15s ease-in-out',
        },
      }}
    >
      {({ TransitionProps }) => (
        <Grow direction="left" {...TransitionProps} timeout={timeout}>
          <Box pt={1.4}>
            <Box
              sx={[
                {
                  border: 1,
                  borderColor: 'divider',
                  backgroundColor: 'background.default',
                  boxShadow: (theme) => theme.shadows[18],
                  overflow: 'hidden',
                  borderRadius: 2,
                  pt: 2,
                },
                sx,
              ]}
            >
              {children}
            </Box>
          </Box>
        </Grow>
      )}
    </Popper>
  );
}

export default PopperGrow;

import React, { useCallback, useState } from 'react';
import { Box, Popper, Typography, ClickAwayListener } from '@mui/material';
import ButtonBase from './button-base';

import {
  usePopupState,
  bindPopper,
  bindHover,
} from 'material-ui-popup-state/hooks';

/**
 *
 * @param {*} props
 * @returns
 */
function ButtonPopper(props) {
  const { tooltip, label, children, ...other } = props;

  /**
   * Allow switch between tooltip < > content
   */
  const [isClicked, setIsClicked] = useState(false);
  const toggleClick = useCallback(() => {
    setIsClicked((current) => !current);
  }, []);

  /**
   * Popper state
   */
  const popupState = usePopupState({
    variant: 'popper',
    popupId: `popper-button`,
  });

  /**
   * Extract open from popperState so we can override it
   */
  const { open, ...popperProps } = bindPopper(popupState);

  return (
    <>
      <ButtonBase {...other} onClick={toggleClick} {...bindHover(popupState)}>
        {label}
      </ButtonBase>

      <Popper
        open={isClicked || open}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ]}
        {...popperProps}
      >
        {isClicked ? (
          <ClickAwayListener onClickAway={toggleClick}>
            <Box
              sx={{
                border: 1,
                borderColor: 'divider',
                boxShadow: 8,
                borderRadius: 1,
                minWidth: 300,
                zIndex: (theme) => theme.zIndex.modal,
                fontSize: 13,
                color: 'text.primary',
                backgroundColor: 'background.default',
              }}
            >
              {children}
            </Box>
          </ClickAwayListener>
        ) : tooltip ? (
          <Box
            sx={{
              px: 1,
              py: 0.25,
              minWidth: 40,
              lineHeight: 1,
              borderRadius: 1,
              color: 'text.inverse',
              bgcolor: 'background.dark',
              textAlign: 'center',
            }}
          >
            <Typography variant="caption">{tooltip}</Typography>
          </Box>
        ) : null}
      </Popper>
    </>
  );
}

export default ButtonPopper;

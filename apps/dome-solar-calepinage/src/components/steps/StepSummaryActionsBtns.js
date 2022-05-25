import * as React from 'react';
import { isEmpty } from 'lodash';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useDispatch } from '../store/store';
import { useStore } from './context/useStore';
import { updateEntity } from '../../slices/entity-slice';

const options = [
  'Enregistrer',
  'Enregistrer et régénérer un pdf',
  'Versionner le pdf',
  'Enregistrer et avertir le commerce'
];

export default function StepSummaryActionsBtns() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const dispatch = useDispatch();

  const store = useStore();
  const {
    mediaObjects,
    comments,
    form: { overrideAnalytic }
  } = store;

  const handleSave = React.useCallback(
    (shouldNext = false) => {
      dispatch(
        updateEntity({
          id: store.form.currentLayout.id,
          comments: JSON.stringify(comments),
          overrideAnalytic: JSON.stringify(overrideAnalytic)
        })
      ).then(() => {
        if (shouldNext) {
          if (isEmpty(mediaObjects)) {
            store.addMediaObjectVersion();
          }
          store.next();
        }
      });
    },
    [dispatch, store, comments, overrideAnalytic, mediaObjects]
  );

  const handleClick = () => {
    switch (selectedIndex) {
      case 0:
        return handleSave();
      case 1:
        return handleSave(true);
      case 2:
        store.addMediaObjectVersion();
        return handleSave(true);
      default:
        return null;
    }
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup variant='contained' ref={anchorRef} aria-label='split button'>
        <Button startIcon={<SaveOutlinedIcon fontSize='small' />} onClick={handleClick}>
          {options[selectedIndex]}
        </Button>
        <Button
          size='small'
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label='select merge strategy'
          aria-haspopup='menu'
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id='split-button-menu'>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 3}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

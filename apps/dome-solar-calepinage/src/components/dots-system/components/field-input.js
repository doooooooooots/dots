import {
  Typography,
  Stack,
  TextField,
  IconButton,
  ClickAwayListener,
} from '@mui/material';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { Box } from '@mui/system';

// Icons
import AbcIcon from '@mui/icons-material/Abc';
import PermDataSettingOutlinedIcon from '@mui/icons-material/PermDataSettingOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Filter1OutlinedIcon from '@mui/icons-material/Filter1Outlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

const FieldInput = (props) => {
  const {
    icon,
    label,
    value,
    type = 'text',
    onClick = (event) => null,
    onConfirm = (newValue) => null,
    readOnly,
    isActive,
  } = props;

  const [open, setOpen] = useState(false);
  const [pendingValue, setPendingValue] = useState(value);

  let Icon = icon;
  if (!Icon) {
    switch (type) {
      case 'list':
        Icon = ListOutlinedIcon;
        break;
      case 'dimension':
        Icon = PermDataSettingOutlinedIcon;
        break;
      case 'number':
        Icon = Filter1OutlinedIcon;
        break;
      case 'text':
        Icon = AbcIcon;
        break;
      case 'date':
        Icon = CalendarTodayOutlinedIcon;
        break;
    }
  }

  /**
   * User clicks on value field
   *-> Open popper
   *-> initialize pending value
   */
  const handleOpen = (event) => {
    event.preventDefault();
    setOpen(!readOnly);
    setPendingValue(value);
    if (typeof onClick === 'function') onClick(event);
  };

  /**
   * User clicks on cancel button
   *-> Close poper
   */
  const handleCancel = () => {
    setOpen(false);
  };

  /**
   * User change value in input
   *-> Change pending value
   */
  const handleChange = (event) => {
    if (event.target.type === 'number')
      setPendingValue(parseInt(event.target.value, 10));
    else setPendingValue(event.target.value);
  };

  /**
   * User press enter key
   *-> Trigger confirm
   */
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleConfirm();
    }
  };

  /**
   * User confirms value
   *-> Trigger user callback
   *-> Close popper
   */
  const handleConfirm = () => {
    if (typeof onConfirm === 'function' && pendingValue !== value)
      onConfirm(pendingValue);
    setOpen(false);
  };

  return (
    <Stack direction="row" alignItems="center">
      <Stack
        direction="row"
        spacing={1}
        width={155}
        color="grey.600"
        alignItems="center"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          '& .MuiSvgIcon-root': {
            width: 16,
            height: 16,
          },
        }}
      >
        {!isEmpty(Icon) && <Icon />}
        <Typography
          variant="body2"
          sx={{
            py: 0.5,
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        sx={[
          {
            cursor: 'pointer',
            flex: 1,
            height: 30,
            py: 0.5,
            pl: 1,
            overflow: 'hidden',
            '&:hover': {
              backgroundColor: 'neutral.background',
            },
          },
          open && {
            border: 1,
            boxShadow: 8,
            borderTop: 0,
            borderColor: 'background.default',
            backgroundColor: 'neutral.25',
            py: 0,
            '&  input': {
              typography: 'body2',
              py: '1px',
            },
          },
          isActive && {
            backgroundColor: 'neutral.50',
          },
        ]}
        onClick={!open ? handleOpen : handleCancel}
      >
        {open ? (
          <ClickAwayListener onClickAway={open ? handleConfirm : handleCancel}>
            <Box>
              {['text'].includes(type) && (
                <TextField
                  value={pendingValue}
                  sx={{ height: 22, p: 0 }}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  variant="standard"
                  autoFocus
                />
              )}
              {type === 'date' && (
                <TextField
                  value={pendingValue}
                  sx={{ height: 22, p: 0 }}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                  variant="standard"
                  autoFocus
                />
              )}
              {['number', 'dimension'].includes(type) && (
                <TextField
                  value={pendingValue}
                  type="number"
                  sx={{ height: 22, p: 0 }}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                  variant="standard"
                  autoFocus
                />
              )}
            </Box>
          </ClickAwayListener>
        ) : (
          <Typography
            variant="body2"
            sx={{
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {value}
          </Typography>
        )}
        <Stack
          direction="row"
          sx={[
            {
              visibility: 'hidden',
            },
            open && {
              visibility: 'visible',
            },
          ]}
        >
          <IconButton size="small" color="success" onClick={handleConfirm}>
            <DoneIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={handleCancel}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FieldInput;

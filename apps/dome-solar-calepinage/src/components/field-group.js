import {
  Typography,
  Stack,
  TextField,
  IconButton,
  ClickAwayListener,
} from '@mui/material';
import { isEmpty } from 'lodash';
import { Close, Done } from '@mui/icons-material';
import { useState } from 'react';
import AbcIcon from '@mui/icons-material/Abc';
import PermDataSettingOutlinedIcon from '@mui/icons-material/PermDataSettingOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Filter1OutlinedIcon from '@mui/icons-material/Filter1Outlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';

const FielGroup = (props) => {
  const {
    icon,
    label,
    value,
    type = 'text',
    onConfirm,
    onClick,
    options,
    readOnly,
  } = props;

  const [open, setOpen] = useState(false);
  const [pendingValue, setPendingValue] = useState(value);

  let _icon = icon;
  if (!_icon) {
    switch (type) {
      case 'list':
        _icon = <ListOutlinedIcon />;
        break;
      case 'dimension':
        _icon = <PermDataSettingOutlinedIcon />;
        break;
      case 'number':
        _icon = <Filter1OutlinedIcon />;
        break;
      case 'text':
        _icon = <AbcIcon />;
        break;
      case 'date':
        _icon = <CalendarTodayOutlinedIcon />;
        break;
    }
  }

  const handleClick = (event) => {
    event.preventDefault();
    setOpen(!readOnly && !open);
    if (typeof onClick === 'function') onClick(event);
  };

  const handleChange = (event) => {
    if (event.target.type === 'number')
      setPendingValue(parseInt(event.target.value, 10));
    else setPendingValue(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleConfirm();
    }
  };

  const handleConfirm = () => {
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
        {!isEmpty(_icon) && _icon}
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
      <ClickAwayListener onClickAway={open ? handleClick : () => null}>
        <Stack
          direction="row"
          alignItems="center"
          sx={[
            {
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'neutral.background',
              },
              // borderRadius: 1,
              flex: 1,
              height: 30,
              py: 0.5,
              pl: 1,
              overflow: 'hidden',
            },
            open && {
              backgroundColor: 'neutral.25',
              boxShadow: 8,
              py: 0,
              '&  input': {
                typography: 'body2',
                py: '1px',
              },
            },
          ]}
          onClick={!open ? handleClick : () => null}
        >
          {open ? (
            <>
              {['list', 'text'].includes(type) && (
                <TextField
                  value={pendingValue}
                  sx={{ height: 22, p: 0 }}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  variant="standard"
                  autoFocus
                />
              )}
              {type === 'datepicker' && (
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
            </>
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
              <Done fontSize="small" />
            </IconButton>
            <IconButton size="small" color="error" onClick={handleClick}>
              <Close fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </ClickAwayListener>
    </Stack>
  );
};

export default FielGroup;

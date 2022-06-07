import React, { useCallback, useState } from 'react';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import FlagCircleOutlinedIcon from '@mui/icons-material/FlagCircleOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import NotStartedOutlinedIcon from '@mui/icons-material/NotStartedOutlined';

import usePopper from './select-with-autocomplete/hooks/use-popper';
import ButtonBase from './button-base';
import PopperGrowWithClickaway from '../../popper-grow-with-clickaway';
import PopperList from '../../popper-list';
import SelectOptionItem from './select-option-item--to-delete';

const PROGRESS_VALUES = [
  'inbox',
  'notStarted',
  'scheduled',
  'assigned',
  'inProgress',
  'sent',
  'reviewed',
  'pending',
  'missingInformation',
  'needFixing',
  'done',
  'error',
  'rejected',
  'late',
  'canceled',
  'closed',
];

const PROGRESS_COLORS = {
  notStarted: 'neutral',
  inbox: 'neutral',
  assigned: 'neutral',
  scheduled: 'neutral',
  inProgress: 'info',
  sent: 'info',
  reviewed: 'info',
  pending: 'warning',
  missingInformation: 'warning',
  needFixing: 'warning',
  done: 'success',
  error: 'error',
  rejected: 'error',
  late: 'error',
  canceled: 'neutral',
  closed: 'neutral',
};

const ProgressIcon = ({ variant }) => {
  const color = `${PROGRESS_COLORS[variant]}.main`;
  let Icon = null;
  switch (variant) {
    case 'notStarted':
      Icon = NotStartedOutlinedIcon;
      break;
    case 'inbox':
      Icon = MoveToInboxIcon;
      break;
    case 'assigned':
      Icon = ExploreOutlinedIcon;
      break;
    case 'scheduled':
      Icon = ScheduleOutlinedIcon;
      break;
    case 'inProgress':
      Icon = PendingOutlinedIcon;
      break;
    case 'sent':
      Icon = ArrowCircleRightOutlinedIcon;
      break;
    case 'reviewed':
      Icon = CircleNotificationsOutlinedIcon;
      break;
    case 'missingInformation':
      Icon = HelpOutlineOutlinedIcon;
      break;
    case 'pending':
      Icon = PauseCircleOutlineOutlinedIcon;
      break;
    case 'error':
      Icon = ErrorOutlineOutlinedIcon;
      break;
    case 'rejected':
      Icon = HighlightOffOutlinedIcon;
      break;
    case 'needFixing':
      Icon = BuildCircleOutlinedIcon;
      break;
    case 'canceled':
      Icon = DoNotDisturbAltOutlinedIcon;
      break;
    case 'done':
      Icon = CheckCircleOutlinedIcon;
      break;
    case 'closed':
      Icon = FlagCircleOutlinedIcon;
      break;
    case 'late':
      Icon = AccessAlarmsIcon;
      break;
    default:
      return null;
  }

  return <Icon sx={{ color }} />;
};

function SelectProgress(props) {
  const { tooltip = 'number', defaultValue = 'notStarted' } = props;
  const { open, anchorEl, onOpen, onClose } = usePopper(false);

  const [value, setValue] = useState(defaultValue);

  //* FUNC -- When select a user
  const handleElementClick = useCallback(
    (_value) => () => {
      setValue(_value);
      onClose();
    },
    [onClose]
  );

  return (
    <>
      {/*//* BUTTON */}
      <ButtonBase
        tooltip={value ? value : tooltip}
        startIcon={<ProgressIcon variant={value} />}
        className={open ? 'is--focused' : ''}
        onClick={onOpen}
      />

      {/*//* RESULT */}
      <PopperGrowWithClickaway
        label="Choisir une personne"
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
      >
        <PopperList>
          {PROGRESS_VALUES.map((_progress) => (
            <SelectOptionItem
              key={_progress}
              icon={<ProgressIcon variant={_progress} />}
              onClick={handleElementClick(_progress)}
              primary={_progress}
            />
          ))}
        </PopperList>
      </PopperGrowWithClickaway>
    </>
  );
}

export default SelectProgress;

import React from 'react';
import SelectFromList from './select-with-autocomplete/components/popper-from-list';
import { isEmpty } from 'lodash';
import ButtonBase from './button-base';

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
import SelectItemOption from './select-with-autocomplete/components/item-option';

const labels = [
  {
    title: 'Non traitée',
    icon: 'inbox',
    color: 'neutral',
    description: 'La tâche est encore en inbox',
  },
  {
    title: 'Non commencée',
    icon: 'notStarted',
    color: 'neutral',
    description: "La tâche n'a pas encore été commencée",
  },
  {
    title: 'Assignée',
    icon: 'assigned',
    color: 'neutral',
    description: 'La tâche a été assignée',
  },
  {
    title: 'Programmée',
    icon: 'scheduled',
    color: 'neutral',
    description: 'La tâche a été assignée et mise au planning',
  },
  {
    title: 'En cours',
    icon: 'inProgress',
    color: 'info',
    description: '',
  },
  {
    title: 'En cours1',
    icon: 'inProgress',
    color: 'info',
    description: '',
  },
  {
    title: 'En cours2',
    icon: 'inProgress',
    color: 'info',
    description: '',
  },
  {
    title: 'En cours3',
    icon: 'inProgress',
    color: 'info',
    description: '',
  },
  {
    title: 'En cours4',
    icon: 'inProgress',
    color: 'info',
    description: '',
  },
  {
    title: 'En cours5',
    icon: 'inProgress',
    color: 'info',
    description: '',
  },
  {
    title: 'En cours6',
    icon: 'inProgress',
    color: 'info',
    description: '',
  },
];

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

const title = 'Appliquer un progress à ce projet';
const placeholder = 'Chercher un progress';
const options = labels;
const noOptionsText = 'Pas de progress correspondant';
const defaultButtonText = 'Progress';
const defaultTooltip = 'Add a progress';
const getOptionLabel = (option) => option.title;
const renderButtonText = (value) => (isEmpty(value) ? defaultButtonText : null);
const renderOption = (props, option, { selected }) => (
  <SelectItemOption
    {...props}
    title={option.title}
    icon={<ProgressIcon variant={option?.icon} size="small" />}
    selected={selected}
    tooltip={option.description}
  />
);

const ProgressIcon = ({ variant, size }) => {
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

  return <Icon sx={{ color }} fontSize={size} />;
};

function SelectProgress(props) {
  const { tooltip = defaultTooltip } = props;

  return (
    <SelectFromList
      title={title}
      options={options}
      noOptionsText={noOptionsText}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      inputProps={{ placeholder }}
    >
      {({ value, onClick, open }) => (
        <ButtonBase
          tooltip={isEmpty(value) ? tooltip : value.name}
          startIcon={<ProgressIcon variant={value?.icon} />}
          endIcon={!!value}
          onClick={onClick}
          isActive={open}
          withAddIcon={!value}
        >
          {renderButtonText(value)}
        </ButtonBase>
      )}
    </SelectFromList>
  );
}

export default SelectProgress;

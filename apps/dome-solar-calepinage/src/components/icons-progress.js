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
import Progress from './dots-system/enums/progress';

const { values } = Progress;

const ProgressIcon = ({ stage, color = 'primary' }) => {
  let Icon = null;
  switch (stage) {
    case values.NOT_STARTED:
      Icon = NotStartedOutlinedIcon;
      break;
    case values.INBOX:
      Icon = MoveToInboxIcon;
      break;
    case values.ASSIGNED:
      Icon = ExploreOutlinedIcon;
      break;
    case values.SCHEDULED:
      Icon = ScheduleOutlinedIcon;
      break;
    case values.IN_PROGRESS:
      Icon = PendingOutlinedIcon;
      break;
    case values.SENT:
      Icon = ArrowCircleRightOutlinedIcon;
      break;
    case values.REVIEWED:
      Icon = CircleNotificationsOutlinedIcon;
      break;
    case values.MISSING_INFORMATION:
      Icon = HelpOutlineOutlinedIcon;
      break;
    case values.PENDING:
      Icon = PauseCircleOutlineOutlinedIcon;
      break;
    case values.ERROR:
      Icon = ErrorOutlineOutlinedIcon;
      break;
    case values.REJECTED:
      Icon = HighlightOffOutlinedIcon;
      break;
    case values.NEED_FIXING:
      Icon = BuildCircleOutlinedIcon;
      break;
    case values.CANCELED:
      Icon = DoNotDisturbAltOutlinedIcon;
      break;
    case values.DONE:
      Icon = CheckCircleOutlinedIcon;
      break;
    case values.CLOSED:
      Icon = FlagCircleOutlinedIcon;
      break;
    case values.LATE:
      Icon = AccessAlarmsIcon;
      break;
    default:
      return null;
  }

  return <Icon sx={{ color }} />;
};

export default ProgressIcon;

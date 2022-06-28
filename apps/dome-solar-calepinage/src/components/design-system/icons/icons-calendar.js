import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import EventRepeatOutlinedIcon from '@mui/icons-material/EventRepeatOutlined';
import ScheduleSendOutlinedIcon from '@mui/icons-material/ScheduleSendOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';

const CalendarIcon = ({ variant }) => {
  switch (variant) {
    default:
    case 'reception':
      return <MoveToInboxOutlinedIcon />;
    case 'delivery':
      return <ScheduleSendOutlinedIcon />;
    case 'today':
      return <CalendarTodayIcon />;
    case 'archived':
      return <ArchiveOutlinedIcon />;
    case 'sent':
      return <ForwardToInboxOutlinedIcon />;
    case 'needScheduling':
      return <EventBusyOutlinedIcon />;
    case 'scheduled':
      return <EventOutlinedIcon />;
    case 'recursive':
      return <EventRepeatOutlinedIcon />;
    case 'confirmed':
      return <EventAvailableOutlinedIcon />;
  }
};

CalendarIcon.bindProps = ({ value }) => ({
  variant: value,
});

export default CalendarIcon;

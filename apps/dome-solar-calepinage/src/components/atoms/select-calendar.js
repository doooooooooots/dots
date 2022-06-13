import React, { useState } from 'react';
import frLocale from 'date-fns/locale/fr';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import EventRepeatOutlinedIcon from '@mui/icons-material/EventRepeatOutlined';
import ScheduleSendOutlinedIcon from '@mui/icons-material/ScheduleSendOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import PopperGrowWithClickaway from '../popper-grow-with-clickaway';
import usePopper from './select-with-autocomplete/hooks/use-popper';
import ButtonBase from './button-base';
import { format, formatDistance } from 'date-fns';

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

export default function SelectCalendar(props) {
  const { dateAsDistance, tooltip = 'calendar' } = props;

  const { open, anchorEl, onOpen, onClose } = usePopper(false);

  const [date, setDate] = useState(new Date());

  return (
    <>
      <ButtonBase
        tooltip={tooltip}
        startIcon={<CalendarIcon variant="confirmed" />}
        onClick={onOpen}
        className={open ? 'is--focused' : ''}
      >
        {dateAsDistance
          ? formatDistance(date, new Date(), {
              addSuffix: true,
              locale: frLocale,
            })
          : format(date, 'EEEE dd MMM', {
              locale: frLocale,
            })}
      </ButtonBase>
      <PopperGrowWithClickaway
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        p={0}
      >
        <CalendarPicker date={date} onChange={setDate} />
      </PopperGrowWithClickaway>
    </>
  );
}

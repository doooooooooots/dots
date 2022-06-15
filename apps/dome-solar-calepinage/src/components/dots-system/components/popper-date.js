import React, { useMemo, useState } from 'react';
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { PickersDay } from '@mui/x-date-pickers';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

function getAllDaysInMonth(year, month) {
  const date = new Date(year, month, 1);

  const dates = [];

  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

const DAYS_OF_WEEK = ['L', 'M', 'Me', 'J', 'V', 'S', 'D'];
const MONTHS = [
  'Jan.',
  'Fev',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juil.',
  'Août',
  'Sept.',
  'Oct.',
  'Nov.',
  'Dec.',
];

const extractDateData = (date) => {
  const output = {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
  };
  return {
    ...output,
    offset: new Date(output.year, output.month, 1).getDay(),
  };
};

const DateSwiper = (props) => {
  const { value, onNext, onNextFast, onPrevious, onPreviousFast, onClick } =
    props;
  return (
    <Stack flex={1} border={1} borderColor="divider" borderRadius={1}>
      <Typography
        variant="h5"
        textAlign="center"
        py={2}
        bgcolor="neutral.background"
        onClick={onClick}
        sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'neutral.hover' } }}
      >
        {value}
      </Typography>
      <Divider />
      <Stack direction="row" spacing={0} justifyContent="center">
        {onPreviousFast && (
          <IconButton size="small" onClick={onPreviousFast}>
            <KeyboardDoubleArrowLeftIcon fontSize="inherit" />
          </IconButton>
        )}
        <IconButton size="small" onClick={onPrevious}>
          <ArrowBackIosIcon fontSize="inherit" />
        </IconButton>
        <IconButton size="small" onClick={onNext}>
          <ArrowForwardIosIcon fontSize="inherit" />
        </IconButton>
        {onNextFast && (
          <IconButton size="small" onClick={onNextFast}>
            <KeyboardDoubleArrowRightIcon fontSize="inherit" />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
};

function PopperDate() {
  const [date, setDate] = useState(new Date());

  const [showDate, setShowDate] = useState(() => {
    const today = new Date();
    return extractDateData(today);
  });

  const [view, setView] = useState('days');

  const allDays = useMemo(() => {
    return getAllDaysInMonth(showDate.year, showDate.month);
  }, [showDate]);

  const handlePreviousYearFast = () => {
    setShowDate(({ year, month, date }) => {
      const _date = new Date(year - 10, month, date);
      return extractDateData(_date);
    });
  };
  const handlePreviousYear = () => {
    setShowDate(({ year, month, date }) => {
      const _date = new Date(year - 1, month, date);
      return extractDateData(_date);
    });
  };
  const handleNextYear = () => {
    setShowDate(({ year, month, date }) => {
      const _date = new Date(year + 1, month, date);
      return extractDateData(_date);
    });
  };
  const handleNextYearFast = () => {
    setShowDate(({ year, month, date }) => {
      const _date = new Date(year + 10, month, date);
      return extractDateData(_date);
    });
  };
  const handleNextMonth = () => {
    setShowDate(({ year, month, date }) => {
      const _date = new Date(year, month + 1, date);
      return extractDateData(_date);
    });
  };
  const handlePreviousMonth = () => {
    setShowDate(({ year, month, date }) => {
      const _date = new Date(year, month - 1, date);
      return extractDateData(_date);
    });
  };
  const handleMonthClick = (_month) => () => {
    setShowDate(({ year, month, date }) => {
      const _date = new Date(year, _month, date);
      return extractDateData(_date);
    });
    setView('days');
  };

  return (
    <Stack p={1} spacing={1}>
      <Typography variant="body2">Sélectionnez une date</Typography>
      {/* <Typography variant="body2">{JSON.stringify(showDate)}</Typography> */}

      <Stack direction="row" spacing={1} justifyContent="center">
        <DateSwiper
          value={MONTHS[showDate.month]}
          onPrevious={handlePreviousMonth}
          onNext={handleNextMonth}
          onClick={() => {
            setView('months');
          }}
        />
        <DateSwiper
          value={showDate.year}
          onPreviousFast={handlePreviousYearFast}
          onPrevious={handlePreviousYear}
          onNext={handleNextYear}
          onNextFast={handleNextYearFast}
          onClick={() => {
            setView('years');
          }}
        />
      </Stack>
      {view === 'days' && (
        <>
          <Grid
            container
            display="grid"
            gridTemplateColumns="repeat(7, 1fr)"
            pt={2}
          >
            {DAYS_OF_WEEK.map((weekDay) => (
              <Grid item key={`skeleton-${weekDay}`} textAlign="center">
                <Typography variant="caption" fontWeight="bold">
                  {weekDay}
                </Typography>
              </Grid>
            ))}
            {new Array((showDate.offset > 0 ? showDate.offset : 7) - 1)
              .fill(0)
              .map((_, index) => (
                <Grid item key={`skeleton-${index}`} />
              ))}
            {allDays.map((day, index) => (
              <Grid item key={index}>
                <PickersDay
                  day={day}
                  onDaySelect={(val) => console.log(val)}
                  outsideCurrentMonth={false}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {view === 'months' && (
        <Grid
          container
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          pt={2}
        >
          {MONTHS.map((month, index) => (
            <Grid item key={`skeleton-${month}`} textAlign="center">
              <Button onClick={handleMonthClick(index)}>{month}</Button>
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
}

export default PopperDate;

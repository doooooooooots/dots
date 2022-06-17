import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function BasicTimeline() {
  const handleClickSection = React.useCallback(
    (sectionName) => () => {
      document
        .getElementById(`section-${sectionName}`)
        .scrollIntoView({ behavior: 'smooth' });
    },
    []
  );

  return (
    <Timeline
      sx={{
        mt: 0,
        minWidth: 250,
        '& .MuiTimelineItem-root:before': {
          display: 'none',
        },
        '& .MuiTimelineContent-root': {
          cursor: 'pointer',
        },
      }}
    >
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent onClick={handleClickSection('main')}>
          Informations de
          <br /> base
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent onClick={handleClickSection('steps')}>
          Etape
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent onClick={handleClickSection('dates')}>
          Dates
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent onClick={handleClickSection('address')}>
          Adresse
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent onClick={handleClickSection('field')}>
          Typologie de terrain
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent onClick={handleClickSection('hr')}>
          Gestion
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

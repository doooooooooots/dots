import { Box, Stack } from '@mui/material';
import { useStore } from '../../../contexts/useStore';
import StepSummaryQuantitative from './summary/view-summary-quantitative';
import ViewSummarySlide from './summary/view-summary-slide';

export default function StepSummary() {
  const store = useStore();

  const snaps = store.getSnaps();
  const comments = store.getComments();

  const handleChangeComment = (pageName) => (event) => {
    store.setComment(pageName, event.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      overflow="auto"
      width="100%"
      p={2}
    >
      <Stack spacing={3}>
        {/*//* BILAN MATIERE */}
        <ViewSummarySlide
          name="Bilan"
          comment={comments.quantitative}
          onCommentChange={handleChangeComment('quantitative')}
        >
          <StepSummaryQuantitative />
        </ViewSummarySlide>

        {/*//* DETAILS COLONNES */}
        {Object.entries(snaps).map(([key, item], index) => (
          <ViewSummarySlide
            key={key}
            name={item.name}
            comment={comments[key]}
            onCommentChange={handleChangeComment(key)}
          >
            <Box sx={{ width: '100%', aspectRatio: `${item.aspectRatio}` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={`snap-${index}`}
                style={{ width: '100%' }}
                src={item.snap}
              />
            </Box>
          </ViewSummarySlide>
        ))}
      </Stack>
    </Box>
  );
}

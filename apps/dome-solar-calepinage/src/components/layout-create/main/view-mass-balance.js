import { Stack } from '@mui/material';
import { Box, Container } from '@mui/system';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import Image from 'next/image';
import { useStore } from '../../../contexts/useStore';
import ErrorPage from '../../design-system/screens/error-page';
import StepSummaryQuantitative from './summary/view-summary-quantitative';

const StepMassBalance = () => {
  const { getRelatedData } = useStore();
  const mass = getRelatedData('massBalance');

  if (!isEmpty(mass?.errors)) {
    return (
      <Container sx={{ mt: 4 }}>
        <Box border={1} borderColor="error.50" borderRadius={1}>
          <Stack justifyContent="center">
            <Image
              alt="error image"
              src="/assets/illustrations/error.svg"
              width="300"
              height="300"
            />
          </Stack>
          <ErrorPage message={mass.errors} />
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <StepSummaryQuantitative />
    </Container>
  );
};

export default observer(StepMassBalance);

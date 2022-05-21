import { PAGINATION_DEFAULT_AVAILABLE_TAKES } from '@dots.cool/tokens';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {
  Divider,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { ceil } from 'lodash';
import React, { useCallback } from 'react';

function MainPagination(props: any) {
  const {
    page,
    take,
    onPageNext,
    onPagePrevious,
    onGoTo,
    minPage = 1,
    onTakeChange,
    totalCounts,
  } = props;

  const maxPage = ceil(totalCounts / take);

  const handlePageNext = useCallback(() => {
    onPageNext(maxPage);
  }, [onPageNext, maxPage]);

  const handlePagePrevious = useCallback(() => {
    onPagePrevious(minPage);
  }, [onPagePrevious, minPage]);

  const handleGoToFirst = useCallback(() => {
    onGoTo(minPage);
  }, [minPage, onGoTo]);

  const handleGoToLast = useCallback(() => {
    onGoTo(maxPage);
  }, [maxPage, onGoTo]);

  const handleGoToPage = useCallback(
    (event) => {
      onGoTo(event.target.value, minPage, maxPage);
    },
    [maxPage, minPage, onGoTo]
  );

  const handleTakeChange = useCallback(
    (event) => {
      onTakeChange(event.target.value);
    },
    [onTakeChange]
  );

  return (
    <Stack
      direction="row"
      py={1}
      px={2}
      spacing={0}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Typography>{`${totalCounts} items`}</Typography>
      </Box>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Stack direction="row">
          <IconButton onClick={handleGoToFirst}>
            <KeyboardDoubleArrowLeftIcon />
          </IconButton>
          <IconButton onClick={handlePagePrevious}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TextField
              value={page}
              onChange={handleGoToPage}
              variant="outlined"
              sx={{
                width: 40 + 10 * page.toString().length,
                '& input': { textAlign: 'center' },
              }}
            />
            <Typography>sur</Typography>
            <Typography>{`${maxPage || '?'}`}</Typography>
          </Stack>
          <IconButton onClick={handlePageNext}>
            <KeyboardArrowRightIcon />
          </IconButton>
          <IconButton onClick={handleGoToLast}>
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Box>
        <Select
          id={`pagination-take`}
          labelId={`pagination-take-label`}
          value={take}
          onChange={handleTakeChange}
        >
          {PAGINATION_DEFAULT_AVAILABLE_TAKES.map((value: any) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Stack>
  );
}

export default React.memo(MainPagination);

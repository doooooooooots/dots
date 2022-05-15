import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp';
import { Button, Chip, Divider, IconButton, Stack } from '@mui/material';
import { useCallback } from 'react';
import {
  SortablePopper,
  ButtonPopper,
  FilterAdvanced,
  SortField,
} from '@dots.cool/components';
import useHistory from '../../hooks/use-history';

function MainFilterbar(props: any) {
  const {
    // Sort
    sort,
    sortPinned,
    onSortChange,
    withSort,
    // Filter
    filter = [],
    onFilterChange,
    withFilter,
    // components
    actionText,
    actionPage,
    onSubmitCallback,
  } = props;

  //* HOOKS
  const { push, undo } = useHistory();

  //* ACTIONS
  const handleClickAction = useCallback(() => {
    const handleSubmitCallback = () => {
      undo();
      onSubmitCallback();
    };
    push({
      ...actionPage,
      componentProps: {
        onSubmitSuccessCallback: handleSubmitCallback,
      },
    });
  }, [actionPage, push, undo, onSubmitCallback]);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          '& hr': {
            mx: 0.5,
          },
        }}
      >
        <IconButton size="small">
          <MoreHorizSharpIcon fontSize="inherit" />
        </IconButton>
        <Divider orientation="vertical" variant="middle" flexItem />
        {withSort && (
          <>
            <ButtonPopper
              startIcon={<AddIcon />}
              PopperComponent={SortablePopper}
              componentProps={{
                popperComponent: {
                  list: sort,
                  onSortOrderChange: onSortChange,
                  SortItemComponent: SortField,
                },
              }}
            >
              Ajouter un tri
            </ButtonPopper>
            <Divider orientation="vertical" variant="middle" flexItem />
          </>
        )}
        {withFilter && (
          <>
            {filter.length > 0 && (
              <Stack direction="row" spacing={1}>
                {filter.map((item: string) => (
                  <Chip
                    key={item}
                    color="primary"
                    variant="outlined"
                    size="small"
                    icon={<FilterListIcon fontSize="small" />}
                    label={item}
                  />
                ))}
              </Stack>
            )}
            <ButtonPopper
              startIcon={<AddIcon />}
              PopperComponent={FilterAdvanced}
              componentProps={{
                popperComponent: {
                  filter,
                  onFilterChange,
                },
              }}
            >
              Ajouter un filtre
            </ButtonPopper>
          </>
        )}
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Button variant="contained" size="small" onClick={handleClickAction}>
          {actionText}
        </Button>
      </Stack>
    </Stack>
  );
}

export default MainFilterbar;

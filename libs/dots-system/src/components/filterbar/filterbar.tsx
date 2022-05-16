import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import { Button, Chip, Divider, IconButton, Stack } from '@mui/material';
import { useCallback, useMemo } from 'react';
import {
  SortablePopper,
  ButtonPopper,
  FilterAdvanced,
  SortField,
} from '@dots.cool/components';
import useHistory from '../../hooks/use-history';
import { isEmpty } from 'lodash';
import withContext from '../../hoc/with-context';
import DotsFormCreate from '../../pages/dots-from-create';
import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';

function MainFilterbar(props: any) {
  const {
    context,
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

  const { views, sortableFields } = context;
  const {
    [GRAPHQL_ACTIONS.FindMany]: { fieldNames },
  } = views;

  //* Action button
  const _actionPage = useMemo(() => {
    if (isEmpty(actionPage)) {
      return {
        title: 'create',
        path: 'create',
        Component: withContext('storage')(DotsFormCreate),
        width: 'md',
      };
    }
    return actionPage;
  }, []);

  const handleClickAction = useCallback(() => {
    const handleSubmitCallback = () => {
      undo();
      onSubmitCallback();
    };
    push({
      ..._actionPage,
      componentProps: {
        ...(actionPage?.componentProps || {}),
        onSubmitSuccessCallback: handleSubmitCallback,
      },
    });
  }, [_actionPage, push, undo, onSubmitCallback]);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      px={1}
    >
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
          <SearchIcon fontSize="inherit" />
        </IconButton>
        <Divider orientation="vertical" variant="middle" flexItem />
        {withSort && (
          <>
            <ButtonPopper
              startIcon={isEmpty(sort) ? <AddIcon /> : <SortIcon />}
              variant={isEmpty(sort) ? 'text' : 'chip'}
              PopperComponent={SortablePopper}
              componentProps={{
                popperComponent: {
                  list: sort,
                  sortableFields,
                  onSortOrderChange: onSortChange,
                  SortItemComponent: SortField,
                },
              }}
            >
              {isEmpty(sort)
                ? 'ui.filterbar.sort.add'
                : `tri :${
                    sort.length > 1
                      ? `${sort.length}éléments`
                      : `${sort[0].field}`
                  } `}
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
              ui.filterbar.filter.add
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

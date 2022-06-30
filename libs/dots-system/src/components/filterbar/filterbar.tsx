import { useCallback, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import {
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Box } from '@mui/system';

import { isEmpty } from 'lodash';

import DotsFormCreate from '../../pages/dots-from-create';
import { useHistory } from '../../hooks';

import {
  SortablePopper,
  ButtonPopper,
  FilterAdvanced,
  SortField,
} from '@dots.cool/components';
import { useDots } from '@dots.cool/schema';
import { FORM_MODAL_WIDTH } from '@dots.cool/tokens';
import FormInDialog from '../entity-create/entity-create-in-dialog';
import { Add } from '@mui/icons-material';

const FILTER_MARGIN = 0.5;

function MainFilterbar(props: any) {
  const {
    entityName,
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
  const { push, clear } = useHistory();
  const [mode, setMode] = useState('default');

  const { getSchema } = useDots();
  const { singular } = getSchema(entityName);

  //* Search button
  const handleSearchButtonClick = useCallback(() => {
    setMode((current) => (current === 'default' ? 'edit' : 'default'));
  }, []);

  //* Action button
  // [ ](Adrien): Add component customisation (Filberbar.ActionPage)
  const handleClickAction = useCallback(() => {
    push({
      title: 'create',
      path: `create.${singular}`,
      width: FORM_MODAL_WIDTH,
      Component: DotsFormCreate,
      componentProps: {
        id: `create.${singular}`,
        entityName: singular,
        onSubmitSuccess: () => {
          onSubmitCallback();
          clear();
        },
      },
    });
  }, [onSubmitCallback, push, singular, clear]);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      px={1}
      pt="4px"
    >
      {mode === 'default' ? (
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            '& hr': {
              mx: FILTER_MARGIN,
            },
          }}
        >
          <Button
            startIcon={<SearchIcon fontSize="inherit" />}
            sx={{
              width: 75,
              overflow: 'hidden',
              justifyContent: 'flex-start',
              color: 'neutral.600',
              bgcolor: 'neutral.50',
            }}
            size="small"
            onClick={handleSearchButtonClick}
          >
            <Box
              component={'span'}
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                display: 'block',
              }}
            >
              Rechercher
            </Box>
          </Button>
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
                    sortableFields: [],
                    onSortOrderChange: onSortChange,
                    SortItemComponent: SortField,
                  },
                }}
              >
                {isEmpty(sort)
                  ? 'Ajouter un tri'
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
                    entityName,
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
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            '& hr': {
              mx: FILTER_MARGIN,
            },
          }}
        >
          <TextField
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <IconButton onClick={handleSearchButtonClick}>
            <CloseIcon />
          </IconButton>
        </Stack>
      )}
      <Stack direction="row" alignItems="center" spacing={1}>
        {/* <Button
          size="small"
          variant="outlined"
          startIcon={<SettingsOutlinedIcon />}
        > */}
        {/* ui.filterbar.option */}
        {/* Options */}
        {/* </Button> */}
        {/*  */}
        <Button
          variant="outlined"
          size="small"
          sx={{
            height: 30,
          }}
          startIcon={<Add />}
          onClick={() => {
            push({
              path: entityName,
              title: 'Ajouter une entrée',
              variant: 'create',
              entityName: entityName,
              actionCallback: onSubmitCallback,
            });
          }}
        >
          Créer un nouveau
        </Button>
        {/* <Button variant="contained" size="small" onClick={handleClickAction}>
          {actionText || `ui.filterbar.button.action--default`}
        </Button> */}
      </Stack>
    </Stack>
  );
}

export default MainFilterbar;

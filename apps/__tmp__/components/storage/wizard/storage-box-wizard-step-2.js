import React, { useCallback, useEffect, useMemo } from 'react';
import { Alert, Box, Grid, Stack } from '@mui/material';
import { useDispatch, useSelector } from '_trash/store/store';
import { createSelector } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import { getExpansions } from '_trash/slices/expansion';
import { sortBy } from 'lodash';
import StorageBoxWizardStep1 from './storage-box-wizard-step-1';
import StorageBoxSelectSummary from '../storage-box-select-summary';
import useConnectedForm from '@hooks/use-connected-form';
import { DataGridPro } from '@mui/x-data-grid-pro';
import useConnectedStepper from '@hooks/use-connected-stepper';

const selector = createSelector([(state) => state.expansion.expansions.rows], (expansions) => {
  const expansionSorted = sortBy(expansions, (o) => o.abbreviation);
  return {
    expansions: expansionSorted
  };
});

export default function StorageBoxWizardStep2() {
  const dispatch = useDispatch();
  const { expansions } = useSelector(selector);
  const { current } = useConnectedStepper({ current: 1, first: 1, last: 2 });
  const {
    form = {},
    set,
    handleChange,
    handleChangeToggle
  } = useConnectedForm({
    expansionFrom: '',
    conditionFrom: '',
    numberFrom: '',
    expansionTo: '',
    conditionTo: '',
    numberTo: '',
    expansionIdIn: [],
    sortLogicId: 0
  });

  const { expansionIdIn } = form;

  // *FUNC ---- Selection handler
  const onSelectionModelChange = useCallback(
    (newValue) => {
      set('expansionIdIn', newValue);
    },
    [set]
  );

  // *MEMO ---- Final expansion list
  const selectedExpansions = useMemo(
    () => expansions.filter((item) => expansionIdIn.includes(item.id)),
    [expansions, expansionIdIn]
  );

  // *EFFECT ---- Change Selection
  useEffect(() => {
    const allowedExpansions = expansions
      .filter(
        (item) =>
          isEmpty(form.expansionFrom) ||
          (form.expansionFrom &&
            item.abbreviation >= form.expansionFrom.abbreviation &&
            (isEmpty(form.expansionTo) || item.abbreviation <= form.expansionTo.abbreviation))
      )
      .map((item) => item.id);

    set('expansionIdIn', allowedExpansions);
  }, [expansions, set, form.expansionFrom, form.expansionTo]);

  // *EFFECT ---- Get All expansions
  useEffect(() => {
    dispatch(
      getExpansions(
        {
          filter: {
            gameIdIn: 3
          },
          pagination: {
            first: 600
          }
        },
        ['id', 'abbreviation'],
        'get',
        'rows'
      )
    );
  }, [dispatch]);

  return (
    <Grid
      container
      columnSpacing={2}
      sx={{ height: '100%', overflow: 'hidden', display: 'flex', alignItems: 'stretch' }}
    >
      <Grid item xs={2} />

      {/* STEP 1 -- Fill setting form */}
      {current === 1 && (
        <Grid
          item
          xs={8}
          sx={{
            overflow: 'scroll',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <StorageBoxWizardStep1
            onChange={handleChange}
            onChangeToggle={handleChangeToggle}
            expansions={expansions}
            filter={form}
          />
        </Grid>
      )}

      {/* STEP 2 -- Select expansions */}
      {current === 2 && (
        <>
          <Grid item component={Stack} direction='column' xs={4} sx={{ height: '100%' }}>
            <Alert severity='info' sx={{ mb: 2 }}>
              <Box component='span' sx={{ mr: 1 }}>
                🧐
              </Box>
              2. tu modifies la séléction
            </Alert>
            <Box flexGrow={1}>
              <DataGridPro
                rows={expansions}
                columns={[{ field: 'abbreviation', flex: 1 }]}
                selectionModel={form.expansionIdIn}
                onSelectionModelChange={onSelectionModelChange}
                checkboxSelection
                hideFooter
              />
            </Box>
          </Grid>
          <Grid item component={Stack} direction='column' xs={4} sx={{ height: '100%' }}>
            <StorageBoxSelectSummary selectedExpansions={selectedExpansions} filter={form} />
          </Grid>
        </>
      )}
    </Grid>
  );
}

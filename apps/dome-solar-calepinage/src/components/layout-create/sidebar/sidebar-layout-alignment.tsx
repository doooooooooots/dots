import React, { useCallback } from 'react';
import { useStore } from '../../../contexts/useStore';
import { Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import SidebarLayoutInfobox from './sidebar-layout-infobox';
import AlignmentMap from '../../alignment-map';
import Alignment from '../../_trash/enums/alignment';
import { useMutation } from '@apollo/client';
import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-hot-toast';
import { useDots } from '@dots.cool/schema';

const SidebarAlignment = () => {
  const store = useStore();
  const {
    getAnchorPoint,
    getUserDatas,
    setUserData,
    renderView,
    getMaxCol,
    getMaxRow,
    getCurrentMaxCol,
    getCurrentMaxRow,
    getRelatedData,
    setAnchorPoint,
  } = store;

  const { id } = getRelatedData('layout');

  const {
    Layout: { graphql },
  } = useDots();

  const _mutation = graphql[GRAPHQL_ACTIONS.UpdateOne](`
    id
    alignment
    offsetX
    offsetY
    numberOfColumns
    numberOfLines
  `);

  const [update, { loading }] = useMutation(_mutation);

  const X0 = getUserDatas('X0');
  const Y0 = getUserDatas('Y0');
  const maxCols = getCurrentMaxCol();
  const maxRows = getCurrentMaxRow();

  const anchorPoint = getAnchorPoint();

  const handleAlignmentClick = useCallback(
    (key) => {
      setAnchorPoint(key);
      renderView();
    },
    [renderView, setAnchorPoint]
  );

  // [ ](Adrien): Form is not updating if user changes value from popper
  const { handleSubmit, control } = useForm({
    mode: 'onBlur',
    defaultValues: {
      userMaxCol: maxCols,
      userMaxRow: maxRows,
      X0: X0,
      Y0: Y0,
    },
  });

  const handleSubmitClick = useCallback(
    (data) => {
      setUserData('userMaxCol', data.userMaxCol);
      setUserData('X0', data.X0);
      setUserData('userMaxRow', data.userMaxRow);
      setUserData('Y0', data.Y0);
      renderView();
    },
    [renderView, setUserData]
  );

  const handleSaveClick = useCallback(
    (data) => {
      update({
        variables: {
          data: {
            alignment: anchorPoint,
            offsetX: data.X0,
            offsetY: data.Y0,
            numberOfColumns: data.userMaxCol,
            numberOfLines: data.userMaxRow,
          },
          where: { id: id },
        },
      }).then(() => {
        toast.success('Settings enregistrés');
        handleSubmitClick(data);
        renderView();
      });
    },
    [anchorPoint, handleSubmitClick, id, renderView, update]
  );

  return (
    <>
      <Box p={2}>
        <Typography variant="body1" gutterBottom fontWeight="bold">
          Alignement
        </Typography>
        <Divider />
        <Box textAlign="center" mt={2}>
          <AlignmentMap
            loading={loading}
            active={anchorPoint}
            onClick={handleAlignmentClick}
          />
        </Box>

        <Typography variant="body1" gutterBottom fontWeight="bold" mt={2}>
          Caractéristiques
        </Typography>
        <Divider />
        <Stack spacing={1} mt={3}>
          <Controller
            render={({ field }) => (
              <TextField
                label={`Nombre de colonne.s`}
                size="small"
                type="number"
                fullWidth
                {...field}
                onChange={(e) =>
                  field.onChange(
                    Math.max(Math.min(parseInt(e.target.value), getMaxCol()), 1)
                  )
                }
              />
            )}
            name="userMaxCol"
            control={control}
          />
          {Alignment.isCenter(anchorPoint) ? null : (
            <Controller
              render={({ field }) => (
                <TextField
                  label="Offset X (⟷)"
                  type="number"
                  size="small"
                  fullWidth
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      Math.max(
                        Math.min(parseInt(e.target.value), getUserDatas('Tx')),
                        0
                      )
                    )
                  }
                />
              )}
              name="X0"
              control={control}
            />
          )}
          <Controller
            render={({ field, fieldState: { error } }) => (
              <>
                <TextField
                  label={`Nombre de rangée.s`}
                  size="small"
                  type="number"
                  fullWidth
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      Math.max(
                        Math.min(parseInt(e.target.value), getMaxRow()),
                        1
                      )
                    )
                  }
                />
                {JSON.stringify(error)}
              </>
            )}
            name="userMaxRow"
            control={control}
          />
          {Alignment.isMiddle(anchorPoint) ? null : (
            <Controller
              render={({ field }) => (
                <TextField
                  label="Offset Y (↕︎)"
                  size="small"
                  type="number"
                  fullWidth
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      Math.max(
                        Math.min(parseInt(e.target.value), getUserDatas('Ty')),
                        0
                      )
                    )
                  }
                />
              )}
              name="Y0"
              control={control}
            />
          )}

          <Button
            size="small"
            color="neutral"
            variant="outlined"
            onClick={handleSubmit(handleSubmitClick)}
          >
            Preview
          </Button>

          <LoadingButton
            loading={loading}
            size="small"
            color="primary"
            variant="outlined"
            onClick={handleSubmit(handleSaveClick)}
          >
            Enregistrer
          </LoadingButton>
        </Stack>
      </Box>
      <Divider />
      <SidebarLayoutInfobox />
      <Divider />
    </>
  );
};

export default observer(SidebarAlignment);

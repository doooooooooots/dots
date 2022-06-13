import React, { useCallback } from 'react';
import { useStore } from '../../context/useStore';
import {
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { ALIGNMENTS } from '../../constants/constants';
import ucFirst from '../../utils/uc-first';
import * as AlignmentIcons from '../../icons/alignments-icons';
import SidebarLayoutInfobox from './sidebar-layout-infobox';

const SidebarAlignment = () => {
  const store = useStore();
  const { setUserData, renderView } = store;
  const { handleSubmit, register } = useForm();

  const handleGeneratorAlignmentClick = useCallback(
    (vertKey, horizKey) => () => {
      store.setAnchorPoint(`${vertKey}-${horizKey}`);
      store.renderView();
    },
    [store]
  );

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

  return (
    <>
      <Box p={2}>
        <Typography variant="body1" gutterBottom fontWeight="bold">
          Alignement
        </Typography>
        <Divider />
        <Box textAlign="center" mt={2}>
          {Object.keys(ALIGNMENTS).map((vertKey) => (
            <Box key={vertKey}>
              {ALIGNMENTS[vertKey].map((horizKey) => {
                const Icon =
                  AlignmentIcons[ucFirst(vertKey) + ucFirst(horizKey)];
                return (
                  <IconButton
                    key={horizKey}
                    color="neutral"
                    component="span"
                    sx={[
                      store.getAnchorPoint() === `${vertKey}-${horizKey}` && {
                        color: 'primary.main',
                      },
                    ]}
                    onClick={handleGeneratorAlignmentClick(vertKey, horizKey)}
                  >
                    <Icon />
                  </IconButton>
                );
              })}
            </Box>
          ))}
        </Box>

        <Typography variant="body1" gutterBottom fontWeight="bold" mt={2}>
          Caractéristiques
        </Typography>
        <Divider />
        <Stack spacing={1} mt={3}>
          <TextField
            label="Nombre de colonne.s"
            size="small"
            type="number"
            fullWidth
            {...register('userMaxCol')}
          />
          {store.getAnchorPoint().includes('center') ? null : (
            <TextField
              label="Offset X (⟷)"
              size="small"
              type="number"
              fullWidth
              {...register('X0')}
            />
          )}
          <TextField
            label="Nombre de rangée.s"
            size="small"
            type="number"
            fullWidth
            {...register('userMaxRow')}
          />
          {store.getAnchorPoint().includes('middle') ? null : (
            <TextField
              label="Offset Y (↕︎)"
              size="small"
              type="number"
              fullWidth
              {...register('Y0')}
            />
          )}
          <Button
            size="small"
            variant="outlined"
            onClick={handleSubmit(handleSubmitClick)}
            fullWidth
          >
            Valider
          </Button>
        </Stack>
      </Box>
      <Divider />
      <SidebarLayoutInfobox />
      <Divider />
    </>
  );
};

export default observer(SidebarAlignment);

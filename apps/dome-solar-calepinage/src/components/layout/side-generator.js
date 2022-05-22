import React from 'react';
import { useStore } from '../context/useStore';
import { IconButton, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react';
import { useFormContext } from 'react-hook-form';
import { ALIGNMENTS } from '../../constants';
import ucFirst from '../../utils/uc-first';
import * as AlignmentIcons from '../../icons/AlignmentsIcons';

const SideGenerator = () => {
  const store = useStore();
  const { register } = useFormContext();

  return (
    <>
      <Typography variant="body1" gutterBottom fontWeight="bold">
        Alignement
      </Typography>
      {Object.keys(ALIGNMENTS).map((vertKey) => (
        <Box key={vertKey}>
          {ALIGNMENTS[vertKey].map((horizKey) => {
            const Icon = AlignmentIcons[ucFirst(vertKey) + ucFirst(horizKey)];
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
                onClick={() => store.setAnchorPoint(`${vertKey}-${horizKey}`)}
              >
                <Icon />
              </IconButton>
            );
          })}
        </Box>
      ))}
      <Typography variant="body1" gutterBottom fontWeight="bold" mt={2}>
        Caractéristiques
      </Typography>
      <Stack spacing={1} mt={2}>
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
      </Stack>
    </>
  );
};

export default observer(SideGenerator);

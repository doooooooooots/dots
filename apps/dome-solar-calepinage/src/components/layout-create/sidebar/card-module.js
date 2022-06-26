import PropTypes from 'prop-types';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import React from 'react';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { observer } from 'mobx-react';
import { useStore } from '../../../contexts/useStore';

const CardModule = (props) => {
  const { moduleIndex } = props;
  const store = useStore();

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={1}
      border={1}
      borderRadius={1}
      borderColor="divider"
      justifyContent="space-between"
    >
      <Stack>
        <Stack direction="row" spacing={1}>
          <Typography variant="caption">x</Typography>
          <Typography variant="h6">{store.getPosX(moduleIndex)}</Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography variant="caption">y</Typography>
          <Typography variant="h6">{store.getPosY(moduleIndex)}</Typography>
        </Stack>
      </Stack>

      <Stack textAlign="center">
        <Typography variant="caption">rangée</Typography>
        <Typography variant="h6">{store.getRow(moduleIndex) + 1}</Typography>
      </Stack>

      <Stack textAlign="center">
        <Typography variant="caption">colonne</Typography>
        <Typography variant="h6">{store.getCol(moduleIndex) + 1}</Typography>
      </Stack>

      <Box textAlign="center">
        <Typography variant="h6">
          <IconButton
            onClick={() => {
              store.toggleActive(moduleIndex);
            }}
            size="small"
            sx={{
              color: store.isActive(moduleIndex) ? '#389cff' : '#b7b7b7',
              border: store.isActive(moduleIndex) ? 1 : 1,
            }}
          >
            <PowerSettingsNewOutlinedIcon fontSize="small" />
          </IconButton>
        </Typography>
      </Box>
    </Stack>
  );
};

CardModule.propTypes = {
  moduleIndex: PropTypes.any,
};

export default observer(CardModule);

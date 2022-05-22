/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Dialog,
  Paper,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/EditOutlined';
import { observer } from 'mobx-react';
import { useStore } from '../context/useStore';
import List from '../../../design-system/list';
import FenceIcon from '@mui/icons-material/Fence';

const initialState = {
  width: 500,
  height: 5000,
  x: 2500,
  y: 2500,
};

const SideObstacles = () => {
  const store = useStore();
  const [obstacleForm, setObstacleForm] = useState(initialState);
  const [open, setOpen] = React.useState(false);
  const obstaclesList = store.allObstacles();

  /**
   * Modal
   * ----
   */

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  /**
   * Form
   * ----
   */

  const handleCreate = () => {
    setObstacleForm((current) => ({
      ...current,
      name: `Obstacle ${obstaclesList.length + 1}`,
      id: null,
    }));
    openModal();
  };

  const handleChange = (event) => {
    setObstacleForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  /**
   * Manage Modules
   * ----
   */

  const handleCreateObstacle = () => {
    const allObstacles = [];

    obstaclesList.forEach((elem) => {
      if (
        elem.x === parseInt(obstacleForm.x, 10) &&
        elem.y === parseInt(obstacleForm.y, 10) &&
        elem.width === parseInt(obstacleForm.width, 10) &&
        elem.height === parseInt(obstacleForm.height, 10) &&
        elem.name === obstacleForm.name
      ) {
        allObstacles.push(elem);
      }
    });

    if (allObstacles.length) {
      console.info('Already an obstacle with these Characteristics');
    } else {
      store.addObstacle({ ...obstacleForm });
    }
    setOpen(false);
  };

  const handleRemoveObstacle = useCallback(
    (id) => () => {
      store.removeObstacle(id);
    },
    []
  );

  const handleEditObstacle = useCallback(
    (id) => () => {
      setObstacleForm(store.getObstacleById(id));
      openModal();
    },
    []
  );

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleCreateObstacle();
    }
  };

  return (
    <>
      <Box>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleCreate}
          size="small"
        >
          Ajouter un Obstacle
        </Button>
        <List>
          {obstaclesList.length > 0
            ? obstaclesList.map((obstacle, index) => (
                <ListItem
                  key={obstacle.id}
                  sx={{ py: 0, minHeight: 32 }}
                  secondaryAction={
                    <Stack
                      spacing={1}
                      direction="row"
                      justifyContent="flex-end"
                    >
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={handleEditObstacle(obstacle.id)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={handleRemoveObstacle(obstacle.id)}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  }
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <FenceIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={obstacle.name || `Obstacle ${index}`}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: 'medium',
                    }}
                  />
                </ListItem>
              ))
            : null}
        </List>
      </Box>

      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        onKeyPress={handleKeyPress}
      >
        <Paper sx={{ width: 350, p: 4, margin: 'auto' }}>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {obstacleForm.id ? "Modifier l'obstacle" : 'Créer un obstacle'}
          </Typography>

          <FormControl sx={{ mb: 3 }} fullWidth>
            <InputLabel>Nom de l&apos;obstacle</InputLabel>
            <Input
              label="Nom de l'obstacle"
              id="name"
              name="name"
              type="text"
              defaultValue={obstacleForm.name || ''}
              required
              onChange={handleChange}
            />
          </FormControl>

          <FormControl sx={{ mb: 3 }} fullWidth>
            <InputLabel>Largeur en mm</InputLabel>
            <Input
              label="Largeur en mm"
              id="width"
              name="width"
              type="number"
              defaultValue={obstacleForm.width}
              required
              onChange={handleChange}
            />
          </FormControl>

          <FormControl sx={{ mb: 3 }} fullWidth>
            <InputLabel>Hauteur en mm</InputLabel>
            <Input
              label="Hauteur en mm"
              id="height"
              name="height"
              type="number"
              defaultValue={obstacleForm.height}
              required
              onChange={handleChange}
            />
          </FormControl>

          <FormControl sx={{ mb: 3 }} fullWidth>
            <InputLabel>Position X en mm</InputLabel>
            <Input
              label="Position X en mm"
              id="x"
              name="x"
              type="number"
              defaultValue={obstacleForm.x}
              required
              onChange={handleChange}
            />
          </FormControl>

          <FormControl sx={{ mb: 3 }} fullWidth>
            <InputLabel>Position Y en mm</InputLabel>
            <Input
              label="Position Y en mm"
              id="y"
              name="y"
              type="number"
              defaultValue={obstacleForm.y}
              required
              onChange={handleChange}
            />
          </FormControl>

          <Button
            size="small"
            color="primary"
            variant="outlined"
            style={{ marginBottom: '1rem' }}
            onClick={handleCreateObstacle}
            startIcon={<AddIcon />}
            fullWidth
          >
            {obstacleForm.id ? "Modifier l'obstacle" : "Ajouter l'obstacle"}
          </Button>
        </Paper>
      </Dialog>
    </>
  );
};

SideObstacles.propTypes = {
  store: PropTypes.shape({
    allObstacles: PropTypes.any,
    addObstacle: PropTypes.any,
    removeObstacle: PropTypes.any,
    userDatas: PropTypes.shape({
      Tx: PropTypes.any,
      Ty: PropTypes.any,
    }),
    root: PropTypes.shape({
      obstacles: PropTypes.any,
    }),
  }),
};

export default observer(SideObstacles);

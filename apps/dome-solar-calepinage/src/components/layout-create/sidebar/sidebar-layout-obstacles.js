/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
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
  Divider,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/EditOutlined';
import { observer } from 'mobx-react';
import { useStore } from '../../../contexts/useStore';
import FenceIcon from '@mui/icons-material/Fence';
import { toast } from 'react-hot-toast';
import { gql, useMutation } from '@apollo/client';
import SidebarLayoutInfobox from './sidebar-layout-infobox';
import List from '../../design-system/list';

const UPDATE_ROOF = gql`
  mutation UpdateRoof($where: RoofWhereUniqueInput!, $data: RoofUpdateInput!) {
    updateRoof(where: $where, data: $data) {
      id
    }
  }
`;

const initialState = {
  width: 500,
  height: 5000,
  x: 2500,
  y: 2500,
};

const SidebarObstacles = () => {
  const store = useStore();
  const { getRelatedData } = store;

  const [obstacleForm, setObstacleForm] = useState(initialState);
  const [open, setOpen] = React.useState(false);
  const obstaclesList = store.allObstacles();

  const roof = getRelatedData('roof');

  const [update] = useMutation(UPDATE_ROOF);
  const updateRoof = (obstaclesObj) =>
    toast.promise(
      update({
        variables: {
          where: { id: roof?.id },
          data: { obstacles: obstaclesObj },
        },
      }),
      {
        loading: 'Sauvegarde ...',
        success: 'La toiture a été mise à jour',
        error: 'Erreur lors de la mise à jour',
      }
    );

  /**
   * Modal
   * ----
   */
  const closeModal = () => {
    setOpen(false);
  };

  /**
   * Form
   * ----
   */

  //-> Click on Add Obstacle Btn
  const handleAddButtonClick = () => {
    setObstacleForm((current) => ({
      ...current,
      name: `Obstacle ${obstaclesList.length + 1}`,
      id: null,
    }));
    setOpen(true);
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
      const newObstacles = store.addObstacle({ ...obstacleForm });
      updateRoof(newObstacles);
    }
    setOpen(false);
  };

  const handleRemoveObstacle = useCallback(
    (id) => () => {
      const newObstacles = store.removeObstacle(id);
      updateRoof([...newObstacles]);
    },
    []
  );

  //? Click on Edit button
  const handleEditButtonClick = useCallback(
    (id) => () => {
      setObstacleForm(store.getObstacleById(id));
      setOpen(true);
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
      <Stack spacing={2} p={2}>
        <Typography variant="h6">Gestion des obstacles</Typography>

        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleAddButtonClick}
          size="small"
        >
          Ajouter un Obstacle
        </Button>
      </Stack>

      <Divider />

      <List>
        {obstaclesList.length > 0 ? (
          obstaclesList.map((obstacle, index) => (
            <ListItem
              key={obstacle.id}
              sx={{ py: 0, minHeight: 32 }}
              secondaryAction={
                <Stack spacing={1} direction="row" justifyContent="flex-end">
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={handleEditButtonClick(obstacle.id)}
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
        ) : (
          <Box px={2}>
            <Alert severity="info">
              <Typography variant="body2">
                Cette toiture ne possède pas d&apos;obstacles
              </Typography>
            </Alert>
          </Box>
        )}
      </List>

      <Divider />
      <SidebarLayoutInfobox />
      <Divider />

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

export default observer(SidebarObstacles);

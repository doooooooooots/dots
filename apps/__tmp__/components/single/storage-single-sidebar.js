import React from 'react';
import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material';

function StorageSingleSidebar() {
  return (
    <>
      <Typography variant='h5' pt={2} px={2}>
        Action rapides
      </Typography>
      <Stack mt={1}>
        <Typography variant='h6' pt={1} px={2}>
          Cartes
        </Typography>
        <List component='nav' aria-label='mailbox folders'>
          <ListItem button>
            <ListItemText primary="Ajout à l'unité" />
          </ListItem>
          <ListItem button>
            <ListItemText primary='Ajout en masse' />
          </ListItem>
          <ListItem button>
            <ListItemText primary='Voir toutes les cartes' />
          </ListItem>
        </List>
      </Stack>
      <Stack mt={1}>
        <Typography variant='h6' pt={1} px={2}>
          Extensions
        </Typography>
        <List component='nav' aria-label='mailbox folders'>
          <ListItem button>
            <ListItemText primary="Ajout à l'unité" />
          </ListItem>
          <ListItem button>
            <ListItemText primary='Ajout en masse' />
          </ListItem>
          <ListItem button>
            <ListItemText primary='Voir toutes les extension' />
          </ListItem>
        </List>
      </Stack>
    </>
  );
}

export default StorageSingleSidebar;

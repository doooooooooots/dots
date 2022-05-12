import { LoadingButton } from '@mui/lab';
import { Button, Card, CardActions, CardContent, Container, Grid, Typography, Divider } from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import GameSplitButton from '../../src/components/GameSplitButton';

export default function Settings() {
  const [loading, setLoading] = useState(false);

  const handleUpdateStock = async () => {
    const res = await fetch('/api/update-stock-file', {
      method: 'POST',
      body: JSON.stringify({
        idGame: 3,
        idLanguage: 2
      })
    });
    const body = await res.json();
    console.log(body.data);
  };

  const handleUpdateExpansions = async () => {
    setLoading(true);
    await fetch('/api/update-expansions', {
      method: 'POST',
      body: JSON.stringify({
        idGame: 3
      })
    });
    setLoading(false);
    toast.success('Update ok');
  };

  const handleUpdateGames = async () => {
    setLoading(true);
    await fetch('/api/update-games');
    setLoading(false);
    toast.success('Update ok');
  };

  return (
    <Container maxWidth='lg'>
      <Typography variant='h1' mb={3}>
        Settings
      </Typography>

      <Grid container spacing={2} alignItems={'stretch'}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Stock
              </Typography>
              <Typography gutterBottom variant='body1'>
                Récupérer tout le stock à jour de CardMarket
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant='outlined' onClick={handleUpdateStock}>
                Mettre à jour le Stock
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ mt: 5, mb: 3 }} />

      <Typography variant='h2' gutterBottom>
        Db
      </Typography>

      <Grid container spacing={2} alignItems={'stretch'}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Games
              </Typography>
              <Typography gutterBottom variant='body1'>
                Récupérer la liste des jeux sur CardMarket
              </Typography>
            </CardContent>
            <CardActions>
              <LoadingButton
                onClick={handleUpdateGames}
                loading={loading}
                loadingIndicator='Loading...'
                variant='outlined'
              >
                Mettre à jour les Jeux
              </LoadingButton>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Extensions
              </Typography>
              <Typography gutterBottom variant='body1'>
                Récupérer la liste des extensions sur CardMarket
              </Typography>
            </CardContent>
            <CardActions>
              <GameSplitButton loading={loading} onClick={handleUpdateExpansions} />
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Produits
              </Typography>
              <Typography gutterBottom variant='body1'>
                Récupérer la liste des produits sur CardMarket
              </Typography>
            </CardContent>
            <CardActions>
              <GameSplitButton loading={false} onClick={console.log} disabled />
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Commandes
              </Typography>
              <Typography gutterBottom variant='body1'>
                Récupérer la liste des commandes sur CardMarket
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant='outlined' disabled>
                Mettre à jour les extensions
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

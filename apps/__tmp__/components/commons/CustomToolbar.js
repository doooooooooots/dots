import React, { useCallback } from 'react';
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  Typography,
  Stack,
  DialogActions,
  TextField,
  Checkbox,
  Switch
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import {
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarContainer,
  useGridApiContext,
  useGridState
} from '@mui/x-data-grid-pro';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Condition from '../toggle-condition';
import Language from '../toggle-language';

function GridToolbarFullScreen(props) {
  const { onDelete, onUpdate } = props;
  const apiRef = useGridApiContext();
  const [state] = useGridState(apiRef);

  const [settings, setSettings] = useState({
    condition: 'NM',
    language: 'fr',
    isFirstEd: false,
    confirmMessage: '',
    checked: {
      condition: false,
      language: false,
      isFirstEd: false
    }
  });
  const [open, setOpen] = useState(false);

  const handleOpen = (type) => {
    setOpen(type);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSwitch = React.useCallback((event) => {
    setSettings((current) => ({
      ...current,
      checked: {
        ...current.checked,
        [event.target.name]: event.target.checked
      }
    }));
  }, []);

  const handleCheckbox = React.useCallback((event) => {
    setSettings((current) => ({
      ...current,
      [event.target.name]: event.target.checked
    }));
  }, []);

  const handleChange = React.useCallback((event, newValue) => {
    if (!event.target.value && event.target.value !== '' && !newValue) {
      return;
    }
    setSettings((current) => ({
      ...current,
      [event.target.name]: event.target.value || newValue
    }));
  }, []);

  const handleUpdate = useCallback(() => {
    const languageId = ['en', 'gb', 1].includes(settings.language) ? 1 : 2;
    onUpdate({
      ids: state.selection,
      attributes: {
        ...(settings.checked.condition ? { condition: settings.condition } : {}),
        ...(settings.checked.language ? { languageId } : {}),
        ...(settings.checked.isFirstEd ? { isFirstEd: settings.isFirstEd } : {}),
        ...(settings.checked.comment ? { comments: settings.comment } : {})
      }
    }).then(() => {
      handleClose();
    });
  }, [state.selection, onUpdate, settings]);

  const handleDelete = useCallback(() => {
    onDelete(state.selection).then(() => {
      handleClose();
    });
  }, [state.selection, onDelete]);

  return (
    <>
      <Box
        display='flex'
        justifyContent='flex-start'
        alignItems='center'
        sx={{
          width: '100%',
          borderBottom: 'divider',
          borderRadius: 0,
          px: 1,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Button
          variant='text'
          color='primary'
          onClick={() => handleOpen('update')}
          startIcon={<EditOutlinedIcon />}
          disabled={isEmpty(state.selection)}
        >
          Update
        </Button>
        <Button
          variant='text'
          color='error'
          onClick={() => handleOpen('delete')}
          startIcon={<DeleteIcon />}
          disabled={isEmpty(state.selection)}
        >
          Delete
        </Button>
        <Box>
          <GridToolbarFilterButton sx={{ mr: 1, color: 'text.primary' }} />
          <GridToolbarExport sx={{ mr: 1, color: 'text.primary' }} />
        </Box>
      </Box>

      {/* MODAL */}
      <Dialog open={!!open} maxWidth='md' onClose={handleClose} fullWidth>
        {open === 'update' && (
          <>
            <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider' }}>Modification de masse</DialogTitle>

            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Stack
                spacing={2}
                sx={{
                  '& > div': { alignItems: 'center' },
                  '& > div > h5': { width: 150, textAlign: 'left' }
                }}
              >
                <Stack direction='row' spacing={2}>
                  <Typography variant='h5'>Condition</Typography>
                  <Switch
                    name='condition'
                    inputProps={{ 'aria-label': 'Switch condition' }}
                    checked={settings.checked.condition}
                    onChange={handleSwitch}
                  />
                  {settings.checked.condition && <Condition condition={settings.condition} onChange={handleChange} />}
                </Stack>

                <Stack direction='row' spacing={2}>
                  <Typography variant='h5'>Langue</Typography>
                  <Switch
                    name='language'
                    inputProps={{ 'aria-label': 'Switch language' }}
                    checked={settings.checked.language}
                    onChange={handleSwitch}
                  />
                  {settings.checked.language && <Language language={settings.language} onChange={handleChange} />}
                </Stack>

                <Stack direction='row' spacing={2}>
                  <Typography variant='h5'>is First ?</Typography>
                  <Switch
                    name='isFirstEd'
                    inputProps={{ 'aria-label': 'Switch isFirstEd' }}
                    checked={settings.checked.isFirstEd}
                    onChange={handleSwitch}
                  />
                  {settings.checked.isFirstEd && (
                    <Checkbox name='isFirstEd' checked={settings.isFirstEd} onChange={handleCheckbox} />
                  )}
                </Stack>

                <Stack direction='row' spacing={2}>
                  <Typography variant='h5'>Commentaire</Typography>
                  <Switch
                    name='comment'
                    inputProps={{ 'aria-label': 'Switch comment' }}
                    checked={settings.checked.comment}
                    onChange={handleSwitch}
                  />
                  {settings.checked.comment && (
                    <TextField name='comment' value={settings.comment} onChange={handleChange} fullWidth />
                  )}
                </Stack>
              </Stack>
            </Box>

            <DialogActions>
              <Button onClick={handleClose} color='primary' variant='outlined' sx={{ mr: 2 }}>
                Annuler
              </Button>
              <Button onClick={handleUpdate} color='success' variant='contained' startIcon={<EditOutlinedIcon />}>
                Modifier les cartes
              </Button>
            </DialogActions>
          </>
        )}

        {open === 'delete' && (
          <>
            <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider' }}>
              Euh, t&apos;es en train de faire une dinguerie là ...
            </DialogTitle>
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 2 }}>
                Es-tu sûre de vouloir supprimer ces {state.selection.length} produits ?
              </Typography>
              <Stack direction='row' spacing={2} justifyContent='center' alignItems='center' sx={{ mb: 2 }}>
                <Typography variant='caption'>Écrire COINCOIN dans le bloc pour valider</Typography>
                <TextField name='confirmMessage' placeholder='Ecrire COINCOIN ' onChange={handleChange} />
              </Stack>
              <Stack direction='row' spacing={1} justifyContent='center'>
                <Button onClick={handleClose} color='primary' variant='outlined'>
                  Annuler
                </Button>
                <Button
                  onClick={handleDelete}
                  color='error'
                  variant='contained'
                  disabled={settings.confirmMessage !== 'COINCOIN'}
                  startIcon={<DeleteIcon />}
                >
                  Supprimer les cartes
                </Button>
              </Stack>
            </Box>
          </>
        )}
      </Dialog>
    </>
  );
}

export default function CustomToolbar(props) {
  const { onDelete, onUpdate } = props;
  return (
    <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
      <Box>
        <GridToolbarFullScreen onDelete={onDelete} onUpdate={onUpdate} />
      </Box>
    </GridToolbarContainer>
  );
}

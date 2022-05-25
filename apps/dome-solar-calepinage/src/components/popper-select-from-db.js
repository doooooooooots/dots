import { useQuery } from '@apollo/client';
import { SearchOutlined } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  InputAdornment,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ProgressCircular from '../../design-system/progress-circular';
import { isEmpty } from 'lodash';
import { useStore } from './context/useStore';
import { useCallback, useState } from 'react';
import PopperSectionTitle from './popper-section-title';
import PopperList from './popper-list';

function PopperSelectFromDb(props) {
  const {
    name,
    query,
    icon,
    getDatas,
    getRowDatas,
    canAdd,
    onClick = () => null,
  } = props;

  const store = useStore();

  const [seachInput, setSeachInput] = useState('');

  const { data, loading } = useQuery(query, {
    variables: { take: 4, search: seachInput },
  });

  const handleChangeInput = useCallback((event) => {
    setSeachInput(event.target.value);
  }, []);

  return (
    <>
      <TextField
        type="text"
        placeholder="Rechercher"
        variant="outlined"
        size="small"
        value={seachInput}
        onChange={handleChangeInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),
        }}
        fullWidth
        sx={{ mb: 1, pt: 2, px: 2 }}
      />

      <PopperSectionTitle>
        {seachInput ? 'Résultats' : 'Récents'}
      </PopperSectionTitle>

      {loading && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ProgressCircular />
        </Box>
      )}

      {/*//? If there are results */}
      {!loading && !isEmpty(getDatas(data)) && (
        <>
          <PopperList>
            {getDatas(data).map((item) => {
              const row = getRowDatas(item);
              return (
                <ListItemButton
                  key={row.id}
                  sx={{ py: 0, minHeight: 32 }}
                  onClick={onClick(item)}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
                  <ListItemText
                    primary={row.name}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: 'medium',
                    }}
                  />
                </ListItemButton>
              );
            })}
          </PopperList>
        </>
      )}

      {/*//? If there are no results after research */}
      {!loading && isEmpty(getDatas(data)) && seachInput && (
        <PopperList>
          <ListItemButton sx={{ py: 0, minHeight: 32 }}>
            <ListItemText
              primary="Pas de résultat"
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: 'medium',
                color: 'grey.600',
              }}
            />
          </ListItemButton>
        </PopperList>
      )}

      {/*//? If there are no existing extries and adding is allowed */}
      {!loading && isEmpty(getDatas(data)) && !seachInput && canAdd && (
        <Stack
          p={2}
          spacing={0}
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Typography variant="h3">Hello</Typography>
          <Typography variant="h6">
            Il n&apos;y a pas encore d&apos;entrée
          </Typography>
          <Button
            variant="contained"
            onClick={store.onOpenToClick(name)}
            sx={{ mt: 2 }}
          >
            Ajouter un nouveau
          </Button>
        </Stack>
      )}

      {!loading && canAdd && (
        <PopperList>
          <ListItemButton
            key={'__create_new__'}
            sx={{ py: 0, minHeight: 32 }}
            onClick={store.onOpenToClick(name)}
          >
            <ListItemIcon sx={{ color: 'grey.500' }}>
              <AddIcon />
            </ListItemIcon>
            <ListItemText
              primary={'Ajouter un nouveau'}
              primaryTypographyProps={{
                fontSize: 14,
                color: 'grey.500',
                fontWeight: 'medium',
              }}
            />
          </ListItemButton>
        </PopperList>
      )}
    </>
  );
}

export default PopperSelectFromDb;

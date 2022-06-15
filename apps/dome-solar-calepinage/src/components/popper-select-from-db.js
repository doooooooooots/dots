import { useQuery } from '@apollo/client';
import { SearchOutlined } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import {
  Alert,
  Box,
  Button,
  Divider,
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
import { useStore } from '../contexts/useStore';
import { useCallback, useState } from 'react';
import PopperSectionTitle from './popper-section-title';
import PopperList from './popper-list';
import { observer } from 'mobx-react';

function PopperSelectFromDb(props) {
  const {
    name,
    query,
    icon,
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
      {/*//? Search input */}
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
                <SearchOutlined fontSize="small" />
              </InputAdornment>
            ),
          }}
          fullWidth
          sx={{ mb: 1, pt: 1, px: 2 }}
        />
        <Divider />
        <PopperSectionTitle>
          {seachInput ? 'Résultats' : 'Récents'}
        </PopperSectionTitle>
      </>

      {/*//? Loading */}
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
      {!loading && !isEmpty(data.rows) && (
        <>
          <PopperList>
            {data.rows.map((item) => {
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
      {!loading && isEmpty(data.rows) && seachInput && (
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
      {!loading && isEmpty(data.rows) && !seachInput && (
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
        </Stack>
      )}

      {/*//? Error message */}
      {!loading && isEmpty(data.rows) && !seachInput && !canAdd && (
        <Alert severity="info">
          Vous n&apos;avez pas l&apos;autorisation d&apos;ajouter un élément
        </Alert>
      )}

      {/*//* Action */}
      {canAdd && (
        <>
          <Divider />
          <Button
            onClick={store.onOpenToClick(name)}
            startIcon={<AddIcon fontSize="small" />}
            fullWidth
            sx={{
              color: 'grey.500',
              borderColor: 'grey.500',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'background.default',
              },
            }}
          >
            {`Ajouter un nouveau`}
          </Button>
        </>
      )}
    </>
  );
}

export default observer(PopperSelectFromDb);

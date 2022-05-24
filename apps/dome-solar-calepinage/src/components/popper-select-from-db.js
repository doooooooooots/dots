import { useQuery } from '@apollo/client';
import { SearchOutlined } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import ProgressCircular from '../../design-system/progress-circular';
import { isEmpty } from 'lodash';
import { useStore } from './context/useStore';
import { useCallback, useState } from 'react';

const PopperList = styled(List)(({ theme }) => ({
  '& .MuiListItemButton-root': {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: theme.spacing(2),
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
}));

const PopperSectionTitle = styled((props) => (
  <Typography {...props} variant="overline" />
))(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
}));

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
        sx={{ mb: 1, pt: 2, px: 2, minWidth: 385 }}
      />

      {loading ? (
        <Box
          sx={{
            minHeight: 250,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ProgressCircular />
        </Box>
      ) : (
        <>
          <PopperSectionTitle>
            {seachInput ? 'Résultats' : 'Récents'}
          </PopperSectionTitle>
          <PopperList>
            {!isEmpty(getDatas(data)) ? (
              <>
                {!isEmpty(getDatas(data)) &&
                  getDatas(data).map((item) => {
                    const row = getRowDatas(item);
                    return (
                      <ListItemButton
                        key={row.id}
                        sx={{ py: 0, minHeight: 32 }}
                        onClick={onClick(item)}
                      >
                        <ListItemIcon sx={{ color: 'inherit' }}>
                          {icon}
                        </ListItemIcon>
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
              </>
            ) : (
              <>
                {!seachInput && canAdd ? (
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
                ) : (
                  <ListItem sx={{ py: 0, minHeight: 32 }}>
                    <ListItemText
                      primary="Pas de résultat"
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: 'medium',
                      }}
                    />
                  </ListItem>
                )}
              </>
            )}
          </PopperList>
        </>
      )}

      <PopperList>
        <Divider />
        {canAdd && (
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
        )}
      </PopperList>
    </>
  );
}

export default PopperSelectFromDb;

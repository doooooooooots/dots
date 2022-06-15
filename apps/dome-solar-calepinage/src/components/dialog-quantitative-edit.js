import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Alert,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { useStore } from '../contexts/useStore';

const TAGS = {
  vis: {
    id: '3',
    name: 'Vis',
  },
  rail: {
    id: '4',
    name: 'Rail',
  },
  fixation_universelle: {
    id: '5',
    name: 'Fixation universelle',
  },
  fixation_exterieure: {
    id: '6',
    name: 'Fixation extérieure',
  },
  solar_edge: {
    id: '7',
    name: 'Solar Edge',
  },
  ctm: {
    id: '8',
    name: 'CTM',
    slug: 'ctm',
  },
  ctr: {
    id: '9',
    name: 'CTR',
  },
  other: {
    id: '10',
    name: 'Autres',
  },
};

export default function DialogQuantitativeEdit(props) {
  const { tagName, onClose } = props;
  const store = useStore();

  const currentRef = store.getFinalAnalytic(tagName);

  const [options, setOptions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [localForm, setLocalForm] = React.useState({
    ref: currentRef.ref,
    count: currentRef.count,
    delivery: currentRef.delivery,
  });

  const handleChangeRefGuid = (event) => {
    const ref = options.find((item) => item.guid === event.target.value);
    setLocalForm((current) => ({
      ...current,
      ref,
    }));
  };
  const handleChangeCount = (event) => {
    setLocalForm((current) => ({
      ...current,
      count: event.target.value,
    }));
  };
  const handleChangeDelivery = (event) => {
    setLocalForm((current) => ({
      ...current,
      delivery: event.target.checked,
    }));
  };

  const handleSave = () => {
    store.setOverrideAnalytic(tagName, {
      ...localForm,
    });
    onClose();
  };

  React.useEffect(() => {
    const asyncFetch = async () => {
      const fetchOptions = {};
      // const fetchOptions = await getEntities(
      //   {
      //     filter: {
      //       typeOf: 'reference',
      //       tagIds: [TAGS[tagName].id],
      //     },
      //   },
      //   ['id', 'guid', 'name']
      // );
      if (fetchOptions?.allEntities) {
        setOptions(fetchOptions?.allEntities);
      }
      setIsLoading(false);
    };
    if (tagName && tagName in TAGS) {
      setIsLoading(true);
      asyncFetch(tagName);
    }
  }, [setOptions, tagName]);

  return (
    <>
      <DialogTitle>Modifier une référence</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Par quelle référence est-ce que je dois modifier ?
        </DialogContentText>
        <Stack spacing={3} sx={{ mt: 3 }} direction="row" alignItems="flex-end">
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Référence</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Référence"
              value={localForm.ref.guid || ''}
              onChange={handleChangeRefGuid}
            >
              {options.map((item) => (
                <MenuItem key={item.id} value={item.guid}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Input
            id="name"
            label="Count"
            type="number"
            variant="standard"
            value={localForm.count}
            onChange={handleChangeCount}
            fullWidth
          />
          <FormControl fullWidth>
            <FormControlLabel
              control={
                <Checkbox
                  checked={localForm.delivery}
                  onChange={handleChangeDelivery}
                />
              }
              label="Livré par DomeSolar"
            />
          </FormControl>
        </Stack>
        <Alert severity="info" sx={{ mt: 2 }}>
          Une référence est manquante ?
        </Alert>
        {isLoading && <CircularProgress />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button variant="contained" onClick={handleSave}>
          Enregistrer
        </Button>
      </DialogActions>
    </>
  );
}

DialogQuantitativeEdit.propTypes = {
  onClose: PropTypes.any,
  tagName: PropTypes.any,
};

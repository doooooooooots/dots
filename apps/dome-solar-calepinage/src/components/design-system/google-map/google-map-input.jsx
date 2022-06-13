import { useCallback, useEffect, useState } from 'react';
import { GoogleMap, Circle, Marker } from '@react-google-maps/api';
import { InfoBox, useLoadScript } from '@react-google-maps/api';
import {
  Button,
  Stack,
  Box,
  Dialog,
  DialogContent,
  Alert,
  Typography,
  Grid,
} from '@mui/material';
import { TextField, Divider } from '@mui/material';
import useMapsGeocode from './hooks/useMapsGeocode';
import { getMyRadius } from './utils/get-my-radius';
import { getZoneData } from './utils/get-zone-data';
import GoogleMapsLogo from './utils/google-maps-logo.svg';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import { ceil } from 'lodash';

const componentPropsDefault = {
  mapBox: {
    sx: {
      height: 450,
    },
  },
  mainBox: {
    sx: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
  },
  input: {
    id: 'addresse',
    label: 'Addresse',
    variant: 'outlined',
    sx: {},
  },
  ridgeHeightInput: {
    id: 'ridgeHeight',
    label: 'ridgeHeight',
    variant: 'outlined',
    sx: {},
  },
  button: {
    variant: 'outlined',
    sx: {},
  },
  map: {
    mapContainerStyle: { width: '100%', height: '100%' },
    options: {
      streetViewControl: false,
      mapTypeId: 'satellite',
    },
  },
  circle: {
    options: {
      strokeColor: '#F0F8FF',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: null,
      fillOpacity: 0.35,
      clickable: false,
      draggable: false,
      editable: false,
      visible: true,
      zIndex: 1,
    },
    sx: {},
  },
  infoBox: {
    sx: {
      backgroundColor: 'white',
      opacity: 0.8,
      padding: 1,
      whiteSpace: 'nowrap',
      fontSize: 15,
      color: 'black',
    },
  },
  marker: {
    icon: '',
    cursor: 'pointer',
  },
};

const GoogleMapInput = (props) => {
  const { onSubmitSuccess, componentProps = componentPropsDefault } = props;

  const { mainBox, input, button, map, circle, infoBox, marker } =
    componentProps;

  //-> Input value
  const [address, setAddress] = useState('');
  const [ridgeHeight, setRidgeHeight] = useState('');
  const [areaSea, setAreaSea] = useState('');
  const [areaWind, setAreaWind] = useState('');
  const [areaSnow, setAreaSnow] = useState('');
  const [areaField, setAreaField] = useState('');
  const [altitude, setAltitude] = useState('');

  //-> Map State
  const [mapState, setMapState] = useState({
    isOpen: false,
    previousValue: '',
  });

  const { getGeocode, geoCode } = useMapsGeocode();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  //* DIALOG
  //? Open or close google map modal
  const handleOpen = useCallback(() => {
    setMapState((current) => ({ ...current, isOpen: true }));
  }, []);
  const handleClose = useCallback(() => {
    setMapState((current) => ({ ...current, isOpen: false }));
  }, []);

  //* INPUT
  //-> Input change
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleRidgeHeightChange = (e) => {
    setRidgeHeight(e.target.value);
  };

  //-> Submit button
  //? If address has changed, send google request
  const handleSubmitClick = useCallback(() => {
    const localState = address;
    if (localState !== mapState.previousValue) {
      setMapState({
        previousValue: localState,
        isOpen: true,
      });
      getGeocode(localState);
    } else {
      handleOpen();
    }
  }, [address, mapState.previousValue, getGeocode, handleOpen]);

  //? Enter key press on address input
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        handleSubmitClick();
      }
    },
    [handleSubmitClick]
  );

  //* FUNC -- HANDLE CLICK ON MAP
  //? Moves the market to the mouse position
  const onMapClick = useCallback(
    (e) => {
      const { lat, lng } = e.latLng;
      getGeocode(`${lat()},${lng()}`);
    },
    [getGeocode]
  );

  //* FUNC -- HANDLE SAVE
  const handleSaveClick = useCallback(() => {
    if (typeof onSubmitSuccess === 'function') {
      const { formatted_address, altitude } = geoCode;
      onSubmitSuccess({
        address: formatted_address,
        areaSea,
        areaWind,
        areaSnow,
        altitude,
      });
    }
  }, [areaSea, areaSnow, areaWind, geoCode, onSubmitSuccess]);

  //* EFFECT -- HANDLE SAVE
  useEffect(() => {
    const { formatted_address, altitude } = geoCode;
    getZoneData(geoCode).then((zones) => {
      const { areaSea, areaWind, areaSnow } = zones;
      setAddress(formatted_address);
      setAreaSea(areaSea);
      setAreaWind(areaWind);
      setAreaSnow(areaSnow);
      setAltitude(ceil(altitude, 2));
    });
  }, [geoCode, onSubmitSuccess]);

  return (
    <Box {...mainBox}>
      <Stack sx={{ mb: 2 }} spacing={2} direction="row">
        <Button
          {...button}
          color="neutral"
          fullWidth
          onClick={handleSubmitClick}
        >
          Définir via
          <Box
            sx={{
              ml: 2,
              width: 120,
              '& img': {
                width: '100%',
              },
            }}
          >
            <img alt="Logo Google Map" src={GoogleMapsLogo} />
          </Box>
        </Button>
      </Stack>

      {/* Print Map */}
      {mapState.isOpen && isLoaded && (
        <Dialog
          open={mapState.isOpen}
          onClose={handleClose}
          fullWidth
          maxWidth="xl"
        >
          <DialogContent sx={{ height: '100vh' }}>
            <Grid container sx={{ height: '100%' }} columnSpacing={2}>
              <Grid item xs>
                <Stack spacing={1} height="100%">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography>
                      <SearchIcon />
                    </Typography>
                    <TextField
                      {...input}
                      size="small"
                      name="address"
                      value={address}
                      onChange={handleAddressChange}
                      onKeyPress={handleKeyPress}
                      fullWidth
                    />
                  </Stack>

                  <Box flex={1}>
                    {/* Error - Google API */}
                    {geoCode.status === 404 && (
                      <span
                        role="img"
                        aria-label="sheep"
                        style={{ fontWeight: 'bold', color: 'red' }}
                      >
                        😰 Désolé mais l`adresse saisie n`est pas reconnue...
                      </span>
                    )}
                    {geoCode.status !== 404 && (
                      <GoogleMap
                        {...map}
                        center={{
                          lat: geoCode.coordinates.lat,
                          lng: geoCode.coordinates.lng,
                        }}
                        zoom={getMyRadius(ridgeHeight).z}
                        onClick={onMapClick}
                      >
                        <Marker
                          {...marker}
                          position={{
                            lat: geoCode.coordinates.lat,
                            lng: geoCode.coordinates.lng,
                          }}
                        />

                        {ridgeHeight > 0 && (
                          <InfoBox
                            closeBoxURL=""
                            position={{
                              lat:
                                geoCode.coordinates.lat -
                                getMyRadius(ridgeHeight).h / 100000,
                              lng: geoCode.coordinates.lng,
                            }}
                          >
                            <Box {...infoBox}>
                              Rayon : {`${getMyRadius(ridgeHeight).h}`}
                            </Box>
                          </InfoBox>
                        )}

                        <Circle
                          {...circle}
                          center={{
                            lat: geoCode.coordinates.lat,
                            lng: geoCode.coordinates.lng,
                          }}
                          options={{
                            ...circle.options,
                            radius: getMyRadius(ridgeHeight).h,
                          }}
                        />
                      </GoogleMap>
                    )}
                  </Box>
                </Stack>
              </Grid>
              <Grid item width={320}>
                <Stack direction="column" spacing={2}>
                  <Typography variant="h5" textAlign="center">
                    Données terrain
                  </Typography>
                  <Divider>
                    <Typography variant="overline">Operator</Typography>
                  </Divider>
                  <TextField
                    label="Catégorie terrain"
                    size="small"
                    name="ridgeHeight"
                    type="number"
                    fullWidth
                    value={areaField}
                    onChange={handleRidgeHeightChange}
                    onKeyPress={handleKeyPress}
                  />
                  <TextField
                    label="Hauteur crête max"
                    size="small"
                    name="ridgeHeight"
                    type="number"
                    fullWidth
                    value={ridgeHeight}
                    onChange={handleRidgeHeightChange}
                    onKeyPress={handleKeyPress}
                  />
                  <Divider>
                    <Typography variant="overline">FROM GOOGLE</Typography>
                  </Divider>
                  <TextField
                    label="Distance à la mer"
                    size="small"
                    name="ridgeHeight"
                    type="number"
                    fullWidth
                    value={areaSea}
                    onChange={handleRidgeHeightChange}
                    onKeyPress={handleKeyPress}
                  />
                  <TextField
                    label="Zone de vent"
                    size="small"
                    name="ridgeHeight"
                    type="number"
                    fullWidth
                    value={areaWind}
                    onChange={handleRidgeHeightChange}
                    onKeyPress={handleKeyPress}
                  />
                  <TextField
                    label="Zone de neige"
                    size="small"
                    name="ridgeHeight"
                    type="number"
                    fullWidth
                    value={areaSnow}
                    onChange={handleRidgeHeightChange}
                    onKeyPress={handleKeyPress}
                  />
                  <TextField
                    label="Altitude"
                    size="small"
                    name="altitude"
                    type="number"
                    fullWidth
                    value={altitude || 0}
                  />
                  <Alert severity="info">
                    {/* Print Google Result */}
                    <Typography variant="body2">
                      {geoCode.formatted_address !== ''
                        ? geoCode.formatted_address
                        : 'Tu peux cliquer sur la carte pour définir un nouveau point'}
                    </Typography>
                  </Alert>
                  <Stack
                    direction="column"
                    spacing={1}
                    flex={1}
                    justifyContent="flex-end"
                  >
                    <Button variant="outlined" onClick={handleClose}>
                      Annuler
                    </Button>
                    <Button variant="contained" onClick={handleSaveClick}>
                      Enregistrer
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default GoogleMapInput;

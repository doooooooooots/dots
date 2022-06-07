import axios from 'axios';
import { useCallback, useState } from 'react';

const useMapsGeocode = () => {
  const badStatus = 'ZERO_RESULTS';
  const goodStatus = 200;

  // Initialize the map on the coordinates of Dome-Solar:
  const [geoCode, setGeoCode] = useState({
    coordinates: { lat: 47.1497306, lng: -1.5458347 },
    country: '',
    locality: '',
    postal_code: '',
    street_number: '',
    route: '',
    status: goodStatus,
    formatted_address: '',
  });

  // Recovery of the altitude corresponding to the desired position:
  const getElevation = async (lat, lng) => {
    const { google } = await window;
    const elevator = new google.maps.ElevationService();
    const elevation = await elevator.getElevationForLocations({
      locations: [{ lat, lng }],
    });
    return elevation.results[0].elevation;
  };

  // Transformation of the array returned by google
  // into an array containing only the necessary values:
  const formatGoogleArray = useCallback((googleArray) => {
    const asyncCall = async () => {
      const dataReformat = googleArray.address_components.reduce(
        (acc, value) => {
          acc[value.types[0]] = value.long_name;
          return acc;
        },
        {}
      );

      const coordinates = googleArray.geometry.location;
      const altitude = await getElevation(coordinates.lat, coordinates.lng);
      const status = goodStatus;
      const formatted_address = googleArray.formatted_address;

      setGeoCode({
        coordinates,
        altitude,
        status,
        formatted_address,
        ...dataReformat,
      });
    };
    asyncCall();
  }, []);

  // Call of the google map geocode API and assignment of the table returned by transformed google:
  const getGeocode = useCallback(
    (address) => {
      const asynCall = async () => {
        const key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

        const myLocatedData = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
        );

        if (myLocatedData.data.status === badStatus) {
          setGeoCode((state) => ({ ...state, status: 404 }));
        } else {
          formatGoogleArray(myLocatedData.data.results[0]);
        }
      };
      asynCall();
    },
    [formatGoogleArray]
  );

  return { getGeocode, geoCode };
};

export default useMapsGeocode;

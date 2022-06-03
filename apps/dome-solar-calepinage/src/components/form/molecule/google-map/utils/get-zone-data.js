import seasideAreaZone from './seaside_area.json';
import windSnowZone from './snow_wind_zone.json';
import regionFrance from './region_france.json';

// Retrieval of information from the areas concerned:
export const getZoneData = async (geoCode) => {
  const areaSea = seasideAreaZone.find((c) => c.city === geoCode.locality);

  const areaWind = windSnowZone.find((c) => c.city === geoCode.locality);

  const availableValues = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D', 'E'];

  const areaSnow = areaWind ? availableValues.indexOf(areaWind.snow) + 1 : 0;

  const department = regionFrance.find(
    (region) => region.name === geoCode.administrative_area_level_2
  );

  return {
    areaSea: areaSea ? 2 : 0,
    areaWind: areaWind ? areaWind.wind : 0,
    areaSnow,
    department: department ? department.number : '',
  };
};

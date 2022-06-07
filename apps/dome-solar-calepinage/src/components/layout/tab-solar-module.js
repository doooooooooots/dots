import { useCallback } from 'react';
import { gql } from '@apollo/client';
import PopperSelectFromDb from '../popper-select-from-db';
import SolarPowerOutlined from '@mui/icons-material/SolarPowerOutlined';
import { useStore } from '../context/useStore';
import { isEmpty } from 'lodash';
import { Stack } from '@mui/material';
import { PAGE_SOLAR_MODULE } from '../../constants/constants';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import FielGroup from '../field-group';
import TabPopperChangeButton from './tab-popper-change-button';

const GET_SOLAR_MODULES = gql`
  query GetSolarModules($search: String, $take: Int) {
    rows: solarModules(
      take: $take
      where: { name: { contains: $search, mode: insensitive } }
    ) {
      id
      name
      lengthX
      lengthY
      lengthZ
      electricalPower
    }
  }
`;

const TabSolarModule = (props) => {
  const { onChange } = props;
  const { getRelatedData, setUserData } = useStore();

  const handleChoiceClick = useCallback(
    (element) => () => {
      setUserData('Mx', element.lengthX);
      setUserData('My', element.lengthY);
      setUserData('Mz', element.lengthZ);
      setUserData('MPw', element.electricalPower);
      onChange(element);
    },
    [onChange, setUserData]
  );

  const solarModule = getRelatedData('solarModule');

  return (
    <>
      {isEmpty(solarModule) ? (
        <PopperSelectFromDb
          name={PAGE_SOLAR_MODULE}
          query={GET_SOLAR_MODULES}
          icon={<SolarPowerOutlined />}
          onClick={handleChoiceClick}
          getRowDatas={(row) => ({
            id: row.id,
            name: row.name,
          })}
          canAdd
        />
      ) : (
        <>
          <Stack p={2} sx={{ minWidth: 385 }} spacing={1}>
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Largeur (⟷)'}
              value={solarModule.lengthX}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Hauteur (↕︎)'}
              value={solarModule.lengthY}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Frame'}
              value={solarModule.frameType}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Puissance électrique'}
              value={solarModule.electricalPower}
            />
          </Stack>
          <TabPopperChangeButton name="solarModule" />
        </>
      )}
    </>
  );
};

export default TabSolarModule;

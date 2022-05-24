import { useCallback } from 'react';
import { gql } from '@apollo/client';
import PopperSelectFromDb from '../popper-select-from-db';
import SolarPowerOutlined from '@mui/icons-material/SolarPowerOutlined';
import { useStore } from '../context/useStore';
import { isEmpty } from 'lodash';
import { Box, Button, Divider, Stack } from '@mui/material';
import { PAGE_SOLAR_MODULE } from '../../constants';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import FielGroup from '../field-group';

const GET_SOLAR_MODULES = gql`
  query GetSolarModules($search: String, $take: Int) {
    solarModules(
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
  const { onClose } = props;
  const { getRelatedData, setRelatedData, setUserData, renderView } =
    useStore();

  const handleChoiceClick = useCallback(
    (element) => () => {
      setUserData('Mx', element.lengthX);
      setUserData('My', element.lengthY);
      setUserData('Mz', element.lengthZ);
      setUserData('MPw', element.electricalPower);
      setRelatedData('solarModule', element);
      renderView();
    },
    [renderView, setRelatedData, setUserData]
  );

  const handleRemoveClick = useCallback(() => {
    setRelatedData('solarModule', {});
  }, [setRelatedData]);

  const solarModule = getRelatedData('solarModule');

  return (
    <>
      {isEmpty(solarModule) ? (
        <PopperSelectFromDb
          name={PAGE_SOLAR_MODULE}
          query={GET_SOLAR_MODULES}
          icon={<SolarPowerOutlined />}
          onClick={handleChoiceClick}
          getDatas={(data) => data?.solarModules}
          getRowDatas={(row) => ({
            id: row.id,
            name: row.name,
          })}
          canAdd
        />
      ) : (
        <Stack p={2} sx={{ minWidth: 385 }} spacing={1}>
          <Stack direction="column">
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
          <Divider />
          <Box>
            <Button
              onClick={handleRemoveClick}
              startIcon={<CompareArrowsOutlinedIcon fontSize="small" />}
              sx={{
                color: 'grey.500',
                borderColor: 'grey.500',
                p: 0,
                px: 1,
              }}
            >
              Changer de panneau solaire
            </Button>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default TabSolarModule;

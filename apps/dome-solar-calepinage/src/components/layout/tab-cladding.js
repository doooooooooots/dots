import React, { useCallback } from 'react';
import { gql } from '@apollo/client';
import PopperSelectFromDb from '../popper-select-from-db';
import CalendarViewWeekOutlined from '@mui/icons-material/CalendarViewWeekOutlined';
import { PAGE_CLADDING } from '../../constants';
import { useStore } from '../context/useStore';
import { isEmpty } from 'lodash';
import { Box, Button, Divider, Stack } from '@mui/material';
import FielGroup from '../field-group';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';

const GET_CLADDINGS = gql`
  query GetCladdings {
    claddings {
      id
      name
      color
      lengthX
      lengthY
      lengthZ
      numberOfWaves
      thickness
      waveBaseWidth
      waveTopWidth
      material
    }
  }
`;

const TabCladding = (props) => {
  const { onClose } = props;
  const { getRelatedData, setRelatedData, setUserData } = useStore();

  const handleChoiceClick = useCallback(
    (element) => () => {
      setUserData('Cx', element.lengthX);
      setUserData('Cy', element.lengthY);
      setUserData('Cz', element.lengthZ);
      setUserData('CnbOfWaves', element.numberOfWaves);
      setRelatedData('cladding', element);
    },
    [setRelatedData, setUserData]
  );

  const handleRemoveClick = useCallback(() => {
    setRelatedData('cladding', {});
  }, [setRelatedData]);

  const cladding = getRelatedData('cladding');

  return (
    <>
      {isEmpty(cladding) ? (
        <PopperSelectFromDb
          name={PAGE_CLADDING}
          query={GET_CLADDINGS}
          icon={<CalendarViewWeekOutlined />}
          getDatas={(data) => data?.claddings}
          getRowDatas={(row) => ({
            id: row.id,
            name: row.name,
          })}
          onClick={handleChoiceClick}
          canAdd
        />
      ) : (
        <Stack p={2} sx={{ minWidth: 385 }} spacing={1}>
          <Stack>
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Color'}
              value={cladding.color}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Largeur (⟷)'}
              value={cladding.lengthX}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Hauteur (↕︎)'}
              value={cladding.lengthY}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={"Hauteur d'ondes"}
              value={cladding.lengthZ}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={"Nombre d'ondes"}
              value={cladding.numberOfWaves}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Epaisseur (↖︎)'}
              value={cladding.thickness}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={"Largeur base d'onde"}
              value={cladding.waveBaseWidth}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={"Largeur hauteur d'onde"}
              value={cladding.waveTopWidth}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Matériel'}
              value={cladding.material}
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
              Changer de bac acier
            </Button>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default TabCladding;

import React, { useCallback } from 'react';
import { gql } from '@apollo/client';
import PopperSelectFromDb from '../popper-select-from-db';
import CalendarViewWeekOutlined from '@mui/icons-material/CalendarViewWeekOutlined';
import { PAGE_CLADDING } from '../../constants';
import { useStore } from '../context/useStore';
import { isEmpty } from 'lodash';
import { Stack } from '@mui/material';
import FielGroup from '../field-group';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import TabPopperChangeButton from './tab-popper-change-button';

const GET_CLADDINGS = gql`
  query GetCladdings {
    rows: claddings {
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
  const { onChange } = props;
  const { getRelatedData, setUserData } = useStore();

  const handleChoiceClick = useCallback(
    (element) => () => {
      setUserData('Cx', element.lengthX);
      setUserData('Cy', element.lengthY);
      setUserData('Cz', element.lengthZ);
      setUserData('CnbOfWaves', element.numberOfWaves);
      onChange(element);
    },
    [onChange, setUserData]
  );

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
        <>
          <Stack p={2} sx={{ minWidth: 385 }} spacing={1}>
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
          <TabPopperChangeButton name="cladding" />
        </>
      )}
    </>
  );
};

export default TabCladding;

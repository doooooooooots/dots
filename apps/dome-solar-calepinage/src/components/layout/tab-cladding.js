import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import PopperSelectFromDb from '../popper-select-from-db';
import CalendarViewWeekOutlined from '@mui/icons-material/CalendarViewWeekOutlined';
import { PAGE_CLADDING } from '../../constants/constants';
import { useStore } from '../../contexts/useStore';
import { isEmpty } from 'lodash';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import TabPopperChangeButton from './tab-popper-change-button';
import toast from 'react-hot-toast';
import FieldGroupContainer from '../dots-system/components/field-container';
import FielInput from '../dots-system/components/field-input';

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

const UPDATE_CLADDING = gql`
  mutation UpdateCladding(
    $where: CladdingWhereUniqueInput!
    $data: CladdingUpdateInput!
  ) {
    updateCladding(where: $where, data: $data) {
      id
    }
  }
`;

const TabCladding = (props) => {
  const { onChange } = props;
  const { getRelatedData, setUserData, updateRelatedData } = useStore();

  const [update] = useMutation(UPDATE_CLADDING);
  const cladding = getRelatedData('cladding');

  // FIXME: Depending on updateRelatedData, value is updated in front end or not
  const handleChangeConfirm = useCallback(
    (key) => async (newValue) => {
      if (cladding?.id) {
        updateRelatedData(`cladding.${key}`, newValue);
        toast.promise(
          update({
            variables: {
              where: { id: cladding?.id },
              data: { [key]: newValue },
            },
          }),
          {
            loading: 'Sauvegarde ...',
            success: 'Le bac a été mis à jour',
            error: 'Erreur lors de la mise à jour',
          }
        );
      }
    },
    [cladding?.id, update, updateRelatedData]
  );

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
          <FieldGroupContainer>
            <FielInput
              icon={<EventNoteOutlinedIcon />}
              label={'Color'}
              value={cladding.color}
              onConfirm={handleChangeConfirm('color')}
            />
            <FielInput
              label={'Largeur (⟷)'}
              value={cladding.lengthX}
              type="dimension"
              onConfirm={handleChangeConfirm('lengthX')}
            />
            <FielInput
              label={'Hauteur (↕︎)'}
              value={cladding.lengthY}
              type="dimension"
              onConfirm={handleChangeConfirm('lengthY')}
            />
            <FielInput
              label={"Hauteur d'ondes"}
              value={cladding.lengthZ}
              type="number"
              onConfirm={handleChangeConfirm('lengthZ')}
            />
            <FielInput
              label={"Nombre d'ondes"}
              value={cladding.numberOfWaves}
              type="number"
              onConfirm={handleChangeConfirm('numberOfWaves')}
            />
            <FielInput
              label={'Epaisseur (↖︎)'}
              value={cladding.thickness}
              type="dimension"
              onConfirm={handleChangeConfirm('thickness')}
            />
            <FielInput
              label={"Largeur base d'onde"}
              value={cladding.waveBaseWidth}
              type="dimension"
              onConfirm={handleChangeConfirm('waveBaseWidth')}
            />
            <FielInput
              label={"Largeur hauteur d'onde"}
              value={cladding.waveTopWidth}
              type="dimension"
              onConfirm={handleChangeConfirm('waveTopWidth')}
            />
            <FielInput
              label={'Matériel'}
              value={cladding.material}
              onConfirm={handleChangeConfirm('material')}
            />
          </FieldGroupContainer>
          <TabPopperChangeButton name="cladding" />
        </>
      )}
    </>
  );
};

export default TabCladding;

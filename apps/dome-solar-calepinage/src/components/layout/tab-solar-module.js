import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import PopperSelectFromDb from '../popper-select-from-db';
import SolarPowerOutlined from '@mui/icons-material/SolarPowerOutlined';
import { useStore } from '../context/useStore';
import { isEmpty } from 'lodash';
import { PAGE_SOLAR_MODULE } from '../../constants/constants';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import FielGroup from '../field-group';
import TabPopperChangeButton from './tab-popper-change-button';
import toast from 'react-hot-toast';
import FieldGroupContainer from './field-group-container';

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
      frameType
      electricalPower
    }
  }
`;

const UPDATE_SOLAR_MODULES = gql`
  mutation UpdateSolarModules(
    $where: SolarModuleWhereUniqueInput!
    $data: SolarModuleUpdateInput!
  ) {
    updateSolarModule(where: $where, data: $data) {
      id
    }
  }
`;

const TabSolarModule = (props) => {
  const { onChange } = props;
  const { getRelatedData, setUserData, updateRelatedData, renderView } =
    useStore();
  const [update] = useMutation(UPDATE_SOLAR_MODULES);

  const solarModule = getRelatedData('solarModule');

  const handleChangeConfirm = useCallback(
    (key) => async (newValue) => {
      if (solarModule?.id) {
        updateRelatedData(`solarModule.${key}`, newValue);
        await update({
          variables: {
            where: { id: solarModule?.id },
            data: { [key]: newValue },
          },
        });
        toast.success('Le panneau a été mis à jour');
        if (key === 'lengthX') setUserData('Mx', newValue);
        if (key === 'lengthY') setUserData('My', newValue);
        if (key === 'lengthZ') setUserData('Mz', newValue);
        if (key === 'electricalPower') setUserData('MPw', newValue);
        if (['lengthX', 'lengthY'].includes(key)) {
          renderView();
        }
      }
    },
    [solarModule?.id, updateRelatedData, update, setUserData, renderView]
  );

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
          <FieldGroupContainer>
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Largeur (⟷)'}
              type="number"
              value={solarModule.lengthX}
              onConfirm={handleChangeConfirm('lengthX')}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Hauteur (↕︎)'}
              type="number"
              value={solarModule.lengthY}
              onConfirm={handleChangeConfirm('lengthY')}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Frame'}
              type="number"
              value={solarModule.frameType}
              onConfirm={handleChangeConfirm('frameType')}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Puissance électrique'}
              type="number"
              value={solarModule.electricalPower}
              onConfirm={handleChangeConfirm('electricalPower')}
            />
          </FieldGroupContainer>
          <TabPopperChangeButton name="solarModule" />
        </>
      )}
    </>
  );
};

export default TabSolarModule;

import React, { useCallback } from 'react';
import { gql } from '@apollo/client';
import PopperSelectFromDb from '../popper-select-from-db';
import SolarPowerOutlined from '@mui/icons-material/SolarPowerOutlined';
import { useStore } from '../context/useStore';
import { isEmpty } from 'lodash';
import { Alert, Stack, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PAGE_SOLAR_MODULE } from '../../constants';

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
  const store = useStore();

  const handleClick = useCallback(
    (element) => () => {
      store.setUserData('Mx', element.lengthX);
      store.setUserData('My', element.lengthY);
      store.setRelatedData('solarModule', element);
      onClose();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store.setUserData]
  );

  return (
    <>
      <PopperSelectFromDb
        name={PAGE_SOLAR_MODULE}
        query={GET_SOLAR_MODULES}
        icon={<SolarPowerOutlined />}
        onClick={handleClick}
        getDatas={(data) => data?.solarModules}
        getRowDatas={(row) => ({
          id: row.id,
          name: row.name,
        })}
        canAdd
      />
      {!isEmpty(store.getRelatedData('solarModule')) && (
        <Alert severity="info">
          <Stack>
            <Typography variant="h6">Actuellement</Typography>
            <Typography>{store.getRelatedData('solarModule').name}</Typography>
            <Typography>
              X: {store.getRelatedData('solarModule').lengthX}
            </Typography>
            <Typography>
              Y: {store.getRelatedData('solarModule').lengthY}
            </Typography>
          </Stack>
        </Alert>
      )}
    </>
  );
};

export default TabSolarModule;

import React, { useCallback } from 'react';
import { gql } from '@apollo/client';
import PopperSelectFromDb from '../popper-select-from-db';
import { People } from '@mui/icons-material';
import { PAGE_PRODUCT } from '../../constants';
import { useStore } from '../context/useStore';
import { isEmpty } from 'lodash';
import { Stack } from '@mui/material';
import FielGroup from '../field-group';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import TabPopperChangeButton from './tab-popper-change-button';

const GET_PRODUCTS = gql`
  query GetProducts {
    rows: products {
      id
      name
      lengthX
      lengthY
      lengthZ
    }
  }
`;

const TabProduct = (props) => {
  const { onChange } = props;
  const { getRelatedData, setUserData } = useStore();

  const handleChoiceClick = useCallback(
    (element) => () => {
      setUserData('Px', element.lengthX);
      setUserData('Py', element.lengthY);
      setUserData('Pz', element.lengthZ);
      onChange(element);
    },
    [onChange, setUserData]
  );

  const product = getRelatedData('product');

  return (
    <>
      {isEmpty(product) ? (
        <PopperSelectFromDb
          name={PAGE_PRODUCT}
          query={GET_PRODUCTS}
          icon={<People />}
          onClick={handleChoiceClick}
          getRowDatas={(row) => ({
            id: row.id,
            name: row.name,
          })}
        />
      ) : (
        <>
          <Stack p={2} sx={{ minWidth: 385 }} spacing={1}>
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Largeur (⟷)'}
              value={product.lengthX}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Hauteur (↕︎)'}
              value={product.lengthY}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Epaisseur (↖︎)'}
              value={product.lengthZ}
            />
          </Stack>
          <TabPopperChangeButton name="product" />
        </>
      )}
    </>
  );
};

export default TabProduct;

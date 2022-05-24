import React, { useCallback } from 'react';
import { gql } from '@apollo/client';
import PopperSelectFromDb from '../popper-select-from-db';
import { People } from '@mui/icons-material';
import { PAGE_PRODUCT } from '../../constants';
import { useStore } from '../context/useStore';
import { isEmpty } from 'lodash';
import { Box, Button, Divider, Stack } from '@mui/material';
import FielGroup from '../field-group';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      lengthX
      lengthY
      lengthZ
    }
  }
`;

const TabProduct = (props) => {
  const { onClose } = props;
  const { getRelatedData, setRelatedData, setUserData, renderView } =
    useStore();

  const handleChoiceClick = useCallback(
    (element) => () => {
      setUserData('Px', element.lengthX);
      setUserData('Py', element.lengthY);
      setUserData('Pz', element.lengthZ);
      setRelatedData('product', element);
      renderView();
    },
    [renderView, setRelatedData, setUserData]
  );

  const handleRemoveClick = useCallback(() => {
    setRelatedData('product', {});
  }, [setRelatedData]);

  const product = getRelatedData('product');

  return (
    <>
      {isEmpty(product) ? (
        <PopperSelectFromDb
          name={PAGE_PRODUCT}
          query={GET_PRODUCTS}
          icon={<People />}
          onClick={handleChoiceClick}
          getDatas={(data) => data?.products}
          getRowDatas={(row) => ({
            id: row.id,
            name: row.name,
          })}
        />
      ) : (
        <>
          <Stack p={2} sx={{ minWidth: 385 }} spacing={1}>
            <Stack>
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
                Changer de produit
              </Button>
            </Box>
          </Stack>
        </>
      )}
    </>
  );
};

export default TabProduct;

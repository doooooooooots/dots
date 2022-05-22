import React from 'react';
import { gql } from '@apollo/client';
import PopperSelectFromDb from '../popper-select-from-db';
import { People } from '@mui/icons-material';
import { PAGE_PRODUCT } from '../../constants';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
    }
  }
`;

const TabProduct = () => {
  return (
    <PopperSelectFromDb
      name={PAGE_PRODUCT}
      query={GET_PRODUCTS}
      icon={<People />}
      getDatas={(data) => data?.products}
      getRowDatas={(row) => ({
        id: row.id,
        name: row.name,
      })}
    />
  );
};

export default TabProduct;

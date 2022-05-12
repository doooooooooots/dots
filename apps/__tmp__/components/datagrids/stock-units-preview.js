import { gql } from '@apollo/client';
import React from 'react';
import Preview from 'src/design-system/datagrid/preview';
import withSmartPagination from 'src/hoc/with-smart-pagination';

const GET_STOCK_UNITS = gql`
  query GetStockUnits(
    $where: StockUnitWhereInput!
    $take: Int
    $skip: Int! = 0
    $orderBy: [StockUnitOrderByInput!]! = []
  ) {
    stockUnits(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
      id
      quantity
      article {
        condition {
          code
        }
      }
    }
  }
`;

const GET_STOCK_UNITS_COUNT = gql`
  query GetStockUnitsCount($where: StockUnitWhereInput!) {
    stockUnitsCount(where: $where)
  }
`;

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'quantity', headerName: 'qty' },
];

const StockUnitsPreview = (props) => {
  return (
    <Preview
      queryData={GET_STOCK_UNITS}
      queryAggregates={GET_STOCK_UNITS_COUNT}
      name="stockUnit"
      title={'Stock units'}
      columns={columns}
      onFullClick
      {...props}
    />
  );
};

export default withSmartPagination(StockUnitsPreview);

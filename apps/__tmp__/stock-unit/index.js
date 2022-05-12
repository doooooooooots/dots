import React from 'react';
import Layout from '@components/layouts/Layout';
import extractColumns from '@components/columns/extract-columns';
import { STOCK_UNIT_COLUMNS } from '@components/columns/stock-unit-column';
import StockUnitMany from '@components/datagrid/stock-unit-many';

const columns = extractColumns(STOCK_UNIT_COLUMNS, [
  'id',
  'name',
  'image',
  'expAbbreviation',
  'number',
  'condition',
  'isFirstEd',
  'quantity',
  'offers'
]);

//! Langage Management logic
const query = `
  id
  article {
    product {
      number
      expansion {
        abbreviation
      }
      locals( where: { language: { code: { equals: $lang } } }) {
        name
      }
      image {
        url
      }
    }
    language {
      code
    }
    condition {
      code
    }
    isFirstEd
  }
  quantity
  offers {
  id
  }
  offersCount
`;

const StockUnits = (props) => {
  return <StockUnitMany {...props} columns={columns} query={query} lang={'fr'} />;
};

StockUnits.getLayout = (page) => <Layout>{page}</Layout>;
export default StockUnits;

// TODO(Adrien): Import SSR LOGIC -- see getStaticObjects in pages/_utils

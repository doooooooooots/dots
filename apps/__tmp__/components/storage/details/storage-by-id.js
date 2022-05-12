// import ArticleFilterBar from '@components/ArticleFilterBar';
// import PricingMain from '@components/pricing/pricing-main';
// import SellMass from '@components/sell/sell-mass';
// import StorageBoxDialogSellUnit from '@components/sell/sell-unit';
// import TabWizard from '@components/racks/tab-wizard';
import { gql, useQuery } from '@apollo/client';
import { useHistory } from '@hooks/use-history-shared';
import createArticleColumns from '@helpers/stock-units/columns';
import CreateStockUnit from '@components/forms/stock-unit-create-row';
import LayoutDialog from '@components/layouts/layout-dialog';
import LayoutMain from '@components/layouts/layout-main';
import Main from 'src/design-system/datagrid/main';
import React, { useCallback, useMemo } from 'react';
import StorageActionbar from './storage-details-actionbar';
import StorageModals from './storage-details-modals';
import withSmartness from 'src/hoc/with-smartness';

const GET_STOCK_UNITS_BY_STORAGE_ID = gql`
  query getArticles(
    $storageId: ID!
    $take: Int = 50
    $skip: Int = 0
    $lang: String = "fr"
    $orderBy: [StockUnitOrderByInput!]! = []
  ) {
    stockUnits(where: { storage: { id: { equals: $storageId } } }, take: $take, skip: $skip, orderBy: $orderBy) {
      id
      article {
        product {
          number
          expansion {
            abbreviation
          }
          locals(where: { language: { code: { equals: $lang } } }) {
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
    }
  }
`;

const GET_STOCK_UNITS_COUNT = gql`
  query getStockUnits($storageId: ID!) {
    stockUnitsCount(where: { storage: { id: { equals: $storageId } } })
  }
`;

function StorageByID(props) {
  const { storage, page, skip, take, filter, sort, ...methods } = props;
  const { push } = useHistory();

  const { loading, error, data, refetch } = useQuery(GET_STOCK_UNITS_BY_STORAGE_ID, {
    variables: { storageId: storage.id, take, skip, where: filter, orderBy: sort },
    skip: !storage.id
  });

  const { data: aggregate } = useQuery(GET_STOCK_UNITS_COUNT, {
    variables: { storageId: storage.id },
    skip: !storage.id
  });

  const views = [];

  const columns = useMemo(
    () =>
      createArticleColumns([
        'nameFr',
        'image',
        'number',
        'expAbbreviation',
        'condition',
        'isFirstEd',
        'languageId',
        'quantity',
        'priceSuggested',
        'comment',
        'offers'
      ]),
    []
  );

  const handleClickAction = useCallback(
    () =>
      push({
        path: '',
        title: 'Créer un stock unit',
        component: <CreateStockUnit onSubmitCallback={refetch} />
      }),
    [push, refetch]
  );

  if (loading) return <LayoutMain>Loading...</LayoutMain>;
  if (error) return <LayoutMain>{`Error! ${error.message}`}</LayoutMain>;

  return (
    <>
      <LayoutMain>
        <Main
          loading={loading}
          views={views}
          rows={data.stockUnits || []}
          columns={columns}
          page={page}
          totalCounts={aggregate?.stockUnitsCount ?? 0}
          take={take}
          filter={filter}
          sort={sort}
          actionText='Créer'
          onActionClick={handleClickAction}
          renderModals={(methods) => <StorageModals {...methods} />}
          components={{
            Toolbar: StorageActionbar
          }}
          {...methods}
        />
      </LayoutMain>

      {/* CREATE DIALOG */}
      <LayoutDialog maxWidth='lg' fullWidth />
    </>
  );
}

export default withSmartness(StorageByID);

// *FUNC -- onUpdate
// const handleUpdate = (row) => ({
//   id: row.id,
//   condition: row.condition,
//   languageId: row.languageId,
//   isFirstEd: row.isFirstEd,
//   countMkm: row.countMkm,
//   countSpare: row.countSpare,
//   aggregateCount: row.countMkm + row.countSpare
// });

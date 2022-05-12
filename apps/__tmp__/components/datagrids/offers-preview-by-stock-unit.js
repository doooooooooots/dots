import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import OffersCreate from '../forms/offers-create';
import { useHistory } from '@hooks/use-history-shared';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Preview from 'src/design-system/datagrid/preview';
import withSmartPagination from 'src/hoc/with-smart-pagination';

const GET_OFFERS_BY_STOCK_UNIT = gql`
  query getOffersByStockUnit($stockUnitId: ID!, $take: Int, $skip: Int! = 0) {
    offers(where: { stockUnit: { id: { equals: $stockUnitId } } }, take: $take, skip: $skip) {
      id
      status
      eligibleQuantity
      plateform {
        name
      }
      lastPrice {
        value
        createdAt
      }
    }
  }
`;

const GET_OFFER_COUNT = gql`
  query getOffersCount($stockUnitId: ID!) {
    offersCount(where: { stockUnit: { id: { equals: $stockUnitId } } })
  }
`;

const OfferPreviewByStockUnit = (props) => {
  const { stockUnitId, page, skip, take, ...methods } = props;

  const { push, undo } = useHistory();

  const { loading, data, fetchMore } = useQuery(GET_OFFERS_BY_STOCK_UNIT, {
    variables: { stockUnitId, skip, take },
    skip: !stockUnitId
  });

  const { data: aggregates } = useQuery(GET_OFFER_COUNT, {
    variables: { stockUnitId },
    skip: !stockUnitId
  });

  const handleCreateClick = () =>
    push({
      path: 'create',
      title: 'Créer une offre',
      component: (
        <OffersCreate initialValues={{ stockUnit: { connect: { id: stockUnitId } } }} onSubmitSuccessCallback={undo} />
      )
    });

  useEffect(() => {
    fetchMore({ variables: { stockUnitId, skip, take } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchMore, skip, stockUnitId]);

  return (
    <Preview
      loading={loading}
      rows={data?.offers || []}
      columns={[
        { field: 'id', headerName: 'ID' },
        { field: 'eligibleQuantity', headerName: 'qty' },
        { field: 'plateform', headerName: 'plateforme', valueGetter: ({ row }) => row?.plateform?.name },
        { field: 'lastPrice', headerName: 'price', valueGetter: ({ row }) => row?.lastPrice?.value },
        {
          field: 'actions',
          type: 'actions',
          flex: 1,
          align: 'right',
          getActions: () => [
            <GridActionsCellItem key='1' icon={<DeleteOutlineIcon />} onClick={''} label='Ouvrir' showInMenu />,
            <GridActionsCellItem key='2' icon={<DeleteOutlineIcon />} onClick={''} label='Modifier' showInMenu />,
            <GridActionsCellItem key='3' icon={<DeleteOutlineIcon />} onClick={''} label='Supprimer' showInMenu />
          ]
        }
      ]}
      page={page}
      totalCounts={aggregates?.offersCount}
      take={take}
      actionBtn={'Créer une offre'}
      onActionClick={handleCreateClick}
      {...methods}
    />
  );
};

export default withSmartPagination(OfferPreviewByStockUnit);

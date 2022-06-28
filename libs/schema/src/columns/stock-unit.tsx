import { Box, Tooltip, Typography } from '@mui/material';
import { isObject } from 'lodash';
import React from 'react';
import Image from 'next/image';

//ACTIONS
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FieldCountryFlagShow from '../fields/field-country-flag-show';
import FieldConditionShow from '../fields/field-condition-show';
import { formatCurrency } from '@dots.cool/utils';
import FieldIsFirstEdShow from '../fields/field-is-first-ed-show';
import ButtonOpenDetails from '../components/button-open-details';
// import { OfferPreviewByStockUnit } from '@components/datagrid/offers-preview-by-stock-unit';

export const STOCK_UNIT_COLUMNS = {
  from: {
    field: 'from',
    headerName: 'from',
    renderCell: ({ row }) => (
      <FieldCountryFlagShow countryCode={row.seller.address.country} />
    ),
    width: 40,
  },
  productId: {
    field: 'productId',
  },
  number: {
    field: 'number',
    headerName: 'N°',
    width: 60,
    sortable: true,
    valueGetter: ({ row }) => row.article?.product?.number,
  },
  expansion: {
    field: 'expansion',
    valueGetter: ({ row: { expansion } }) =>
      isObject(expansion) ? expansion.abbreviation : expansion,
  },
  expAbbreviation: {
    field: 'product.expansion.abbreviation',
    headerName: 'Exp.',
    type: 'text',
    width: 65,
    editable: false,
    valueGetter: ({ row }) => row.article?.product?.expansion?.abbreviation,
  },
  image: {
    field: 'image',
    headerName: 'Image',
    width: 195,
    sortable: false,
    valueGetter: ({ row }) => row.article?.product?.image?.url,
    renderCell: (params) => (
      <Tooltip
        title={
          <Image
            src={`${params.value}`}
            alt="preview"
            width={251}
            height={364}
            unoptimized
          />
        }
        placement="right-end"
        followCursor
      >
        <Box
          sx={{
            backgroundImage: `url(${params.value})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: '100%',
            width: 230,
          }}
        />
      </Tooltip>
    ),
  },
  name: {
    field: 'name',
    flex: 1,
    valueGetter: ({ row }) => row.article?.product?.locals[0]?.name,
  },
  type: {
    field: 'type',
    headerName: 'type',
    valueGetter: ({ row }) => {
      switch (row.seller.isCommercial) {
        case 0:
        default:
          return '';
        case 1:
          return '💶';
        case 2:
          return '👑';
      }
    },
    renderCell: ({ value }) => <Typography variant="h6">{value}</Typography>,
    width: 40,
  },
  condition: {
    field: 'condition',
    headerName: 'Condition',
    type: 'singleSelect',
    valueOptions: ['NM', 'EX', 'GD', 'LP', 'PL', 'PO'],
    width: 95,
    editable: true,
    renderCell: FieldConditionShow,
    valueGetter: ({ row }) => row.article?.condition?.code,
  },
  price: {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    valueFormatter: ({ value }) => formatCurrency.format(Number(value)),
  },
  rarity: {
    field: 'rarity',
    headerName: 'rarity',
    width: 100,
    editable: false,
    valueGetter: ({ row }) => row.rarity.name,
  },
  isFirstEd: {
    field: 'isFirstEd',
    type: 'boolean',
    headerName: '1st?',
    renderCell: FieldIsFirstEdShow,
    width: 55,
    editable: true,
    valueGetter: ({ row }) => row.article?.isFirstEd,
  },
  languageId: {
    field: 'languageId',
    type: 'singleSelect',
    headerName: 'Langue',
    width: 80,
    editable: true,
    renderCell: ({ value }) => <FieldCountryFlagShow countryCode={value} />,
    valueOptions: ['fr', 'en'],
  },
  comments: {
    field: 'comments',
    headerName: 'Commentaire',
    width: 300,
    editable: true,
  },
  operator: {
    field: 'operator',
    headerName: 'Enregistré par',
    width: 150,
    editable: true,
  },
  quantity: {
    field: 'quantity',
    headerName: 'quantity',
    type: 'number',
    width: 65,
    editable: false,
    valueGetter: ({ row }) => row.quantity,
  },
  aggregateCount: {
    field: 'quantity',
    headerName: 'aggregateCount',
    type: 'number',
    width: 65,
    editable: false,
  },
  countMkm: {
    field: 'countMkm',
    headerName: 'Mkm',
    type: 'number',
    width: 65,
    editable: true,
  },
  count: {
    field: 'count',
    headerName: 'Count',
    type: 'number',
    editable: true,
  },
  countSpare: {
    field: 'countSpare',
    headerName: 'Reserve',
    type: 'number',
    width: 80,
    editable: true,
  },
  username: {
    field: 'username',
    headerName: 'Seller',
    align: 'right',
    flex: 1,
    valueGetter: ({ row }) => row.seller.username,
    width: 180,
  },
  comment: { field: 'comment', width: 280, flex: 1 },
  offers: {
    field: 'offers',
    headerName: 'offres',
    align: 'left',
    flex: 1,
    renderCell: ({ row }) => (
      <ButtonOpenDetails
        path={'offers'}
        title={'Details des offres'}
        component={<OfferPreviewByStockUnit stockUnitId={row.id} />}
        linkText={'Offres'}
        count={row.offersCount}
      />
    ),
  },
};

export const actions = {
  actionAddOffer: {
    getActions: () => [
      <GridActionsCellItem
        key="create"
        label="Create"
        icon={<EditOutlinedIcon />}
      />,
      <GridActionsCellItem
        key="print"
        label="Print"
        icon={<EditOutlinedIcon />}
        showInMenu
      />,
    ],
  },
};

// export const STOCK_UNIT_COLUMNS = {
//   id: {},
//   quantity: {},
//   quantityVariation: {},
//   quantityVariationCount: {},
//   article: {},
//   storage: {},
//   offers: {},
//   offersCount: {},
// };

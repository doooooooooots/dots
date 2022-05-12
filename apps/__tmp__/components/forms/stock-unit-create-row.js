import { Button, Checkbox, Input, Stack, Typography, Box, Chip } from '@mui/material';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { isEmpty } from 'lodash';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import React, { useState } from 'react';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ToggleLanguage from '@components/toggle-language';
import ToggleCondition from '@components/toggle-condition';

const scale = 0.15;

const GET_ARTICLES = gql`
  query GetArticles($where: ArticleWhereInput! = {}) {
    articles(where: $where) {
      id
    }
  }
`;

const GET_STOCK_UNITS = gql`
  query GetStockUnits($where: StockUnitWhereInput!) {
    stockUnits(where: $where) {
      id
      quantity
    }
  }
`;

const CREATE_STOCK_UNIT = gql`
  mutation CreateStockUnit($data: StockUnitCreateInput!) {
    createStockUnit(data: $data) {
      id
    }
  }
`;

const UPDATE_STOCK_UNIT = gql`
  mutation UpdateStockUnit($data: StockUnitUpdateInput!, $where: StockUnitWhereUniqueInput!) {
    updateStockUnit(data: $data, where: $where) {
      id
    }
  }
`;

const DELETE_STOCK_UNIT = gql`
  mutation DeleteStockUnit($where: StockUnitWhereUniqueInput!) {
    deleteStockUnit(where: $where) {
      id
    }
  }
`;

export default function StockUnitCreateRow(props) {
  const { product = {}, storageId, onSubmit } = props;

  const { number, expansion = {}, image = {}, locals = [], rarity = {} } = product;
  const { abbreviation } = expansion;
  const { url } = image;
  const { name: rarityName } = rarity;
  const [local = {}] = locals;
  const { name } = local;

  const [createStockUnit] = useMutation(CREATE_STOCK_UNIT);
  const [updateStockUnit] = useMutation(UPDATE_STOCK_UNIT);
  const [deleteStockUnit] = useMutation(DELETE_STOCK_UNIT);
  const [getArticles] = useLazyQuery(GET_ARTICLES);
  const [getStockUnit] = useLazyQuery(GET_STOCK_UNITS);

  const [cardState, setCardState] = useState({
    count: 1,
    condition: 'NM',
    language: 'fr',
    isSoldable: false,
    isFirstEd: true,
    isSaved: false,
    savedId: null,
    isLoading: false,
    isError: false
  });

  const handleRestartClick = () => {
    setCardState((state) => ({ ...state, isSaved: false, isError: false }));
  };

  // *CREATE NEW  STOCK UNIT
  const createNewStockUnit = async () => {
    const { condition, language, count, isFirstEd, isReverseHolo = false } = cardState;

    const whereStock = { storage: { id: { equals: storageId } } };
    const whereArticle = {
      AND: [
        {
          product: {
            id: { equals: product.id }
          }
        },
        {
          condition: {
            code: { equals: condition }
          }
        },
        {
          language: {
            code: { equals: language }
          }
        },
        { isFirstEd: { equals: isFirstEd } },
        { isReverseHolo: { equals: isReverseHolo } }
      ]
    };

    let {
      data: { stockUnits },
      error
    } = await getStockUnit({
      variables: {
        where: {
          AND: [whereStock, { article: whereArticle }]
        }
      }
    });

    if (error) return false;

    // *1. StockUnit already exists, merge quantities
    // TODO(Adrien): Prompt message to confirm merge or set
    if (!isEmpty(stockUnits)) {
      const { id, quantity } = stockUnits[0];
      const value = quantity + count;
      const res = await updateStockUnit({
        variables: {
          data: { quantityVariations: { create: { value } } },
          where: { id }
        }
      });
      return res.data.updateStockUnit;
    }

    const stockUnit = {
      quantityVariations: { create: { value: count } },
      storage: { connect: { id: storageId } }
    };

    // StockUnit does not exists, check if article exists
    let {
      data: { articles }
    } = await getArticles({
      variables: { where: whereArticle }
    });

    // *2. Article exists (but stock unit does not). Create linked StockUnit
    if (!isEmpty(articles)) {
      const res = await createStockUnit({
        variables: {
          data: {
            ...stockUnit,
            article: { connect: { id: articles[0].id } }
          }
        }
      });
      return res.data.createStockUnit;
    }

    // *3. Article doesn't exist. We create both article and stock unit in a single request.
    const res = await createStockUnit({
      variables: {
        data: {
          ...stockUnit,
          article: {
            create: {
              isFirstEd: isFirstEd,
              isReverseHolo: isReverseHolo,
              product: {
                connect: { id: product.id }
              },
              condition: {
                connect: { code: condition }
              },
              language: {
                connect: { code: language }
              }
            }
          }
        }
      }
    });
    return res.data.createStockUnit;
  };
  const handleClickSave = async () => {
    const res = await createNewStockUnit();
    if (res) {
      onSubmit();
      setCardState((state) => ({
        ...state,
        isSaved: true,
        savedId: res.id,
        isLoading: false
      }));
    } else {
      setCardState((state) => ({
        ...state,
        isLoading: false,
        isError: true
      }));
    }
  };

  // *CANCEL SAVE
  // !It deletes the stock unit, it should decrement qty
  // TODO: Correct behaviour and add automatic deletion if qty is null
  const handleDeleteClick = () => {
    if (cardState.savedId) {
      deleteStockUnit({ variables: { where: { id: cardState.savedId } } }).then((res) => {
        if (res) {
          setCardState((state) => ({
            ...state,
            isSoldable: true,
            isSaved: false,
            savedId: null,
            isLoading: false,
            isError: false
          }));
        }
      });
    }
  };

  // *CHANGE MODE
  const handleClickSoldable = () => {
    setCardState((state) => ({ ...state, isSoldable: !state.isSoldable }));
  };

  // *CHANGE ATTRIBUTES
  const handleChangeCount = (event) => {
    setCardState((state) => ({ ...state, count: Math.max(0, event.target.value) }));
  };
  const handleChangeIsFirstEd = () => {
    setCardState((state) => ({ ...state, isFirstEd: !state.isFirstEd }));
  };
  const handleChangeCondition = (_, newValue) => {
    if (newValue !== null) {
      setCardState((state) => ({ ...state, condition: newValue }));
    }
  };
  const handleChangeLanguage = (_, newValue) => {
    if (newValue !== null) {
      setCardState((state) => ({ ...state, language: newValue }));
    }
  };

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      spacing={2}
      py={1}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        '&:hover': {
          backgroundColor: 'background.paper'
        }
      }}
    >
      <Image alt={name} src={`${url}`} width={251 * scale} height={364 * scale} unoptimized />
      <Stack direction='row' alignItems='center' spacing={2} flex={1}>
        <Typography variant='body2' fontWeight='bold'>
          {number}
        </Typography>
        <Typography variant='body2'>{abbreviation}</Typography>
        {rarityName && <Chip label={rarityName} variant='outlined'></Chip>}
        <Typography variant='body2'>{name}</Typography>
      </Stack>

      {cardState.isSoldable && !cardState.isSaved && !cardState.isError ? (
        <Stack direction='row' spacing={2}>
          <Box display='flex' alignItems='center'>
            <Checkbox checked={cardState.isFirstEd} onClick={handleChangeIsFirstEd} />
            <Typography>
              1<sup>st</sup>
            </Typography>
          </Box>
          <ToggleCondition condition={cardState.condition} onChange={handleChangeCondition} />
          <ToggleLanguage language={cardState.language} onChange={handleChangeLanguage} />
          <Input sx={{ width: 50 }} value={cardState.count} type='number' onChange={handleChangeCount}></Input>
          <Stack direction='row' spacing={1}>
            <Button
              startIcon={<SaveOutlinedIcon />}
              variant='contained'
              onClick={handleClickSave}
              disabled={
                cardState.isLoading || !(cardState.condition !== 1 && cardState.language !== 1 && cardState.count > 0)
              }
            >
              Save
            </Button>
            <IconButton aria-label='cancel' onClick={handleClickSoldable}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
        </Stack>
      ) : (
        <>
          {cardState.isSoldable ? (
            <>
              <Stack direction='row' spacing={1}>
                <Box>{cardState.isError ? '❌' : '✅ '}</Box>
                <Typography variant='body2'>{cardState.isError ? 'erreur' : 'Saved'}</Typography>
              </Stack>
              <Button startIcon={cardState.isError ? '🦆' : '☝️'} variant='outlined' onClick={handleRestartClick}>
                {cardState.isError ? 'Recommencer' : 'Déclinaison'}
              </Button>
              {cardState.savedId && (
                <Button startIcon={'🤦'} color='error' variant='outlined' onClick={handleDeleteClick}>
                  Annuler
                </Button>
              )}
            </>
          ) : (
            <Button onClick={handleClickSoldable}>Ajouter au stock</Button>
          )}
        </>
      )}
    </Stack>
  );
}

StockUnitCreateRow.fragments = {
  product: gql`
    fragment stockUnitCreateRowFragment on Product {
      id
      number
      expansion {
        abbreviation
      }
      image {
        url
      }
      locals(where: { language: { code: { equals: $lang } } }) {
        name
      }
      rarity {
        name
      }
    }
  `
};

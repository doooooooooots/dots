// Types
import type { KeystoneContext } from '@keystone-6/core/types';
import type { Request, Response } from 'express';

import { getExpansionSingles } from 'src/api/mkm-market-place-information';
import { difference, isEmpty, without, uniq } from 'lodash';
import { doByChunks } from '../utils/do-by-chunks';
import { getLanguageCode } from '../utils/get-language';


const formatProduct = (item) => ({
  number: getNumberProduct(item),
  expansion: {
    connect: {
      idMkm: `${item.expansionIdMkm}`
    }
  },
  productModel: {
    connect: {
      idMkm: `${item.idMetaproduct}`
    }
  },
  category: {
    connect: {
      name: `${item.categoryName}`
    }
  },
  rarity: {
    connect: {
      name: `${item.rarity}`
    }
  },
  image: {
    create: item.image
  },
  website: item.website,
  locals: {
    create: item.localization.map((langItem) => ({
      name: langItem.name,
      language: {
        connect: {
          code: getLanguageCode(`${langItem.idLanguage}`)
        }
      }
    }))
  },
  idMkm: `${item.idProduct}`
});

const formatProductModel = (item) => ({
  name: item.locName || item.enName,
  game: { connect: { idMkm: `${item.idGame}` } },
  idMkm: `${item.idMetaproduct}`
});

const formatImage = (item) => ({
  typeOf: 'productPicture',
  extension: '.jpg',
  name: item.locName || item.enName,
  description: '',
  alt: `card picture of ${item.locName || item.enName}`,
  url: `http:${item.image}`
});

export default async function handler(req: Request, res: Response) {
  const context = (req as any).context as KeystoneContext;
  context.db

  const { query = {} } = req;
  const { gameId = 3 } = query;

  const createProducts = async (products) => {
    await apolloClient.mutate({
      mutation: CREATE_PRODUCTS,
      variables: { data: products }
    });
  };

  const createProductModel = async (productModel) => {
    await apolloClient.mutate({
      mutation: CREATE_PRODUCT_MODEL,
      variables: { data: productModel }
    });
  };

  try {
    const { data } = await apolloClient.query({
      query: GET_UNLOADED_EXPANSIONS_FROM_GAME,
      variables: { gameId: `${gameId}` }
    });

    if (!('expansions' in data)) throw new Error('Could not fetch expansions');
    let { expansions } = data

    // FOR EACH UNLOADED EXPANSION
    for (let index = 0; index < expansions.length; index++) {
      const allProductIds = [];
      const allProductModelIds = [];

      const toCreateProducts = [];
      const toCreateProductModels = [];

      // GET EXPANSION SINGLES
      const expansion = expansions[index];
      let products = await getExpansionSingles(expansion.idMkm);
      products = products?.data?.single;

      if (isEmpty(products)) {
        console.log('❌ - erreur avec expansion');
        continue;
      }

      // GET ALL CARDMARKET PRODUCT MODEL IDS AND PRODUCT IDS
      for (let index = 0; index < products.length; index++) {
        const product = products[index];
        allProductIds.push(`${product.idProduct}`);
        allProductModelIds.push(`${product.idMetaproduct}`);
      }

      // GET ALL EXISTING PRODUCT MODEL IDS AND LINKED PRODUCT IDS
      let dbProductModels = await apolloClient.query({
        query: GET_EXISTING_PRODUCT_MODELS_WITH_PRODUCTS,
        variables: { ids: allProductModelIds }
      });

      dbProductModels = dbProductModels.data.productModels;

      const existingProductModelsIds = uniq(dbProductModels.map((item) => item.idMkm));
      const existingProductsIds = uniq(
        dbProductModels.reduce((acc, _productModel) => {
          _productModel.products.forEach((_product) => {
            acc.push(_product.idMkm);
          });
          return acc;
        }, [])
      );

      let toCreateProductModelIds = difference(allProductModelIds, existingProductModelsIds);
      let toCreateProductIds = difference(allProductIds, existingProductsIds);

      for (let index = 0; index < products.length; index++) {
        let product = products[index];
        let metaId = product.idMetaproduct.toString();
        let productId = product.idProduct.toString();

        product.expansionIdMkm = expansion.idMkm;

        if (toCreateProductModelIds.includes(metaId)) {
          toCreateProductModels.push(formatProductModel(product));
          toCreateProductModelIds = without(toCreateProductModelIds, metaId);
        }

        if (toCreateProductIds.includes(productId)) {
          product.image = formatImage(product);
          toCreateProducts.push(formatProduct(product));
          toCreateProductIds = without(toCreateProductIds, productId);
        }
      }

      await doByChunks(createProductModel,toCreateProductModels, 50);
      await doByChunks(createProducts, toCreateProducts, 50);

      await apolloClient.mutate({
        mutation: UPDATE_PRODUCT_LOADED,
        variables: {
          where: { idMkm: expansion.idMkm },
          data: { areProductsLoaded: true }
        }
      });
    }

    return res.status(200).json({ status: 200 });
  } catch (err) {
    return res.status(200).json({ status: 400, error: err });
  }
}
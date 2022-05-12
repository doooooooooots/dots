// TYPES
import type { Request, Response } from 'express';
import { KeystoneContext } from '@keystone-6/core/types';

import { ceil, isEmpty, round } from 'lodash';
import { getLanguageCode } from '../../helpers/get-language';
import { getStockFile } from '../mkm/mkm-stock-management';
import { mean } from 'lodash';
import { makeArticlePid } from '../../helpers/mkm/pids';

// STORAGE
const extractStorageNameFromComment = (comment) => {
  if (comment) {
    const _comment = comment.split('-');
    if (_comment.length > 1) {
      return _comment[0];
    }
  }
  return null;
};
const isExistingStorage = (storageName, storageList) => {
  return storageName && storageList.includes(storageName);
};

// FORMAT
const formatData = (article) => ({
  productId: article['idProduct'],
  conditionCode: article['Condition'],
  languageId: article['Language'],
  isSigned: article['Signed?'] === 'X',
  isFirstEd: article['FirstEd?'] === 'X',
  isAltered: article['Altered?'] === 'X',
  price: ceil(parseFloat(article['Price']), 2),
  quantity: round(parseInt(article['Amount'], 10), 0),
  currencyCode: article['Currency Code'],
  storageName: extractStorageNameFromComment(article['Comments'])
});

// UTILS -- CREATE FUNCTION
const createArticle = (pid: string, data) => ({
  pid,
  status: 'published' as string,
  product: { connect: { idMkm: data.productId } } as object | null,
  condition: { connect: { code: data.conditionCode } } as object | null,
  language: { connect: { code: getLanguageCode(data.languageId) } } as object | null,
  isSigned: data.isSigned as boolean,
  isFirstEd: data.isFirstEd as boolean,
  isAltered: data.isAltered as boolean,
  isFoil: false as boolean,
  isReverseHolo: false as boolean,
  isPlayset: false as boolean,
  stockUnits: {}
});
const createStockUnit = (pid: string, data) => ({
  pid,
  storage: undefined,
  storageName: null,
  quantity: {
    create: {
      value: data.quantity
    }
  },
  offers: {}
});
const createOffer = (pid: string, data) => ({
  pid,
  status: 'published',
  createdBy: null,
  plateform: null,
  prices: {
    create: {
      value: data.price,
      currency: { connect: { code: data.currencyCode } }
    }
  },
  eligibleQuantity: data.quantity
});

// CONNECTS
const connectStorage = (storageName: string) => {
  if (storageName) {
    return { connect: { name: storageName } };
  }
  return undefined;
};

/**
 * * Create articles from stockfile
 * ----
 * @param {*} req
 * @param {*} res
 */

export default async function seedStockfile(req: Request, res: Response) {
  const context = (req as any).context as KeystoneContext;

  const gameId = 3;
  const errors = [];

  // eslint-disable-next-line no-undef
  const toCreateStorage = new Set();

  // GET STOCKFILE FROM MKM
  const { data: stockFile } = await getStockFile({
    idGame: gameId,
    isSealed: false,
    idLanguage: 2
  });

  // GET ALL EXISTING STORAGES
  const storages = await context.prisma.storage.findMany();
  const existingStorageNames = storages.map((item) => item.name);

  // EXTRACT ALL STORAGES TO CREATE
  stockFile.forEach((article) => {
    const storageName = extractStorageNameFromComment(article['Comments']);
    if (storageName && !isExistingStorage(storageName, existingStorageNames)) {
      toCreateStorage.add(storageName);
    }
  });

  // CREATE ALL UNEXISTING STORAGES
  await Promise.all(
    [...toCreateStorage].map(
      async (storage: any) =>
        await context.prisma.storage.createMany({
          data: {
            name: storage.name,
            game: { connect: { idMkm: `${gameId}` } }
          },
          skipDuplicates: true
        })
    )
  );

  // LOOP -- Go through stockfile and create articles with related article items and offers
  const toCreate = stockFile.reduce((acc, _article) => {
    _article = formatData(_article);

    const { productId, conditionCode, languageId, isFirstEd, storageName } = _article;

    if (!productId) return acc;

    const articlePid = makeArticlePid(productId, conditionCode, languageId, isFirstEd);
    const stockUnitPid = '';
    const offerPid = '';

    // ARTICLE
    if (isEmpty(acc[articlePid])) {
      acc[articlePid] = createArticle(articlePid, _article);
    }
    const currentArticle = acc[articlePid];
    const { stockUnits } = currentArticle;

    // STOCK UNITS
    if (isEmpty(stockUnits[stockUnitPid])) {
      const newStockUnit = createStockUnit(stockUnitPid, _article);
      newStockUnit.storage = connectStorage(storageName);
      delete newStockUnit.storageName;
      stockUnits[stockUnitPid] = newStockUnit;
    } else {
      const current = stockUnits[stockUnitPid];
      current.quantity = {
        create: {
          value: _article.quantity + current.quantity.create.value
        }
      };
    }
    const currentStockUnit = stockUnits[stockUnitPid];
    const { offers } = currentStockUnit;

    // OFFER
    if (isEmpty(offers.create)) {
      const newOffer = createOffer(offerPid, _article);
      newOffer.createdBy = { connect: { id: 'cl1y3gok60151iaxw38ijpdzd' } };
      newOffer.plateform = { connect: { pid: 'CM' } };
      offers.create = newOffer;
    } else {
      offers.create.prices.create.value = ceil(mean([offers.create.prices.create.value, _article.price]), 2);
      offers.create.eligibleQuantity = currentStockUnit.quantity.value;
    }

    return acc;
  }, {});

  // CREATE ALL ARTICLES
  try {
    const allArticles = Object.values(toCreate).map((article: any) => ({
      ...article,
      stockUnits: { create: Object.values(article.stockUnits)[0] }
    }));
    for (let index = 0; index < allArticles.length; index = index + 50) {
      const articles = allArticles.slice(index, index + 50);
      await Promise.all(
        articles.map(async (article) => {
          await context.prisma.article.upsert({
            where: { pid: article.pid },
            create: article,
            update: {}
          });
        })
      );
    }
  } catch (err) {
    return res.json({ message: err.message });
  }

  res.status(200).json({ status: 200 });
}

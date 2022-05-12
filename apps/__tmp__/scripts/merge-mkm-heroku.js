import Papa from 'papaparse';
import toast from 'react-hot-toast';
import { createGuidFromHeroku, createGuidFromMKMItem, extractStorageCodeFromComment } from '@utils/create-guid';

Papa.parsePromise = function (file) {
  // eslint-disable-next-line no-undef
  return new Promise(function (complete, error) {
    Papa.parse(file, { download: true, header: true, complete, error });
  });
};

const parseMkm = async () => {
  try {
    const { data: mkm } = await Papa.parsePromise('/stock_merge/mkm_stock.csv');
    mkm.pop();
    const { data: heroku } = await Papa.parsePromise('/stock_merge/heroku_stock.csv');
    heroku.pop();

    const mkmInventory = mkm.reduce((acc, item) => {
      const output = {};
      output.guid = createGuidFromMKMItem(item);
      output.comment = item.Comments ? item.Comments : null;
      output.condition = item.Condition;
      output.countAggregate = parseInt(item.Amount, 10);
      output.isFirstEd = item['FirstEd?'] === 'X';
      output.languageId = parseInt(item.Language, 10);
      output.priceSuggested = null;
      output.productId = parseInt(item.idProduct, 10);
      output.storageBox = extractStorageCodeFromComment(item.Comments);

      if (!acc[output.guid]) {
        acc[output.guid] = output;
        return acc;
      }

      output.countAggregate += acc[output.guid].countAggregate;
      acc[output.guid] = output;
      return acc;
    }, {});

    const herokuInventory = heroku.reduce((acc, item) => {
      const output = {};
      output.guid = createGuidFromHeroku(item);
      output.comment = item.comments;
      output.condition = item.condition;
      output.countAggregate = parseInt(item.count, 10);
      output.isFirstEd = item.is_first_ed === 'True';
      output.languageId = parseInt(item.language_id, 10);
      output.priceSuggested = null;
      output.productId = parseInt(item.product_id, 10);
      output.storageBox = null;

      if (!acc[output.guid]) {
        acc[output.guid] = output;
        return acc;
      }
      output.countAggregate += acc[output.guid].countAggregate;
      acc[output.guid] = output;
      return acc;
    }, {});

    herokuInventory.forEach((item) => {
      if (mkmInventory[item.guid]) {
        mkmInventory[item.guid].countAggregate += item.countAggregate;
      } else {
        mkmInventory[item.guid] = item;
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const mergeMkmHeroku = () => {
  toast.promise(parseMkm('/stock_merge/mkm_stock.csv'), {
    loading: 'saving',
    success: 'Bravo',
    error: 'Loser'
  });
};

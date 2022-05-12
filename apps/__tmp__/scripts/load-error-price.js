import Papa from 'papaparse';
import toast from 'react-hot-toast';
import { doByChunks } from '@utils/do-by-chunks';
import { createMultiple } from '../../_trash/api/api/article-api';

const chunkSave = async (inputArray) => {
  const inputs = inputArray.map((item) => ({
    comments: '!!AUTO!! Price error import',
    condition: item.condition,
    count: parseInt(item.count, 10),
    expansion: item.abbreviation,
    from: 'price-error-csv',
    gameId: parseInt(item.game_id, 10),
    isFirstEd: item.is_first_ed === 'True',
    languageId: parseInt(item.language_id, 10),
    operator: 'bot',
    productId: parseInt(item.product_id, 10)
  }));

  // console.debug(inputs);
  await doByChunks(createMultiple, inputs, 1000);
};

const savePdf = (fileName) =>
  // eslint-disable-next-line no-undef
  new Promise((resolve) => {
    Papa.parse(fileName, {
      download: true,
      header: true,
      complete: function (results) {
        chunkSave(results.data).then(() => {
          resolve();
        });
      }
    });
  });

export const loadPrices = (fileName) => {
  toast.promise(savePdf(fileName), {
    loading: 'saving',
    success: 'Bravo',
    error: 'Loser'
  });
};

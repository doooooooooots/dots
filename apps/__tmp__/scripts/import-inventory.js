import Papa from 'papaparse';
import toast from 'react-hot-toast';
import { doByChunks } from '@utils/do-by-chunks';
import { createMultiple } from '../../_trash/api/api/inventory-api';

const chunkSave = async (inputArray) => {
  const inputs = inputArray.map((item) => ({
    guid: item.guid,
    comment: item.comment_mkm,
    condition: item.condition,
    aggregateCount: parseInt(item.count, 10),
    countMkm: parseInt(item.quantity_mkm, 10),
    countSpare: parseInt(item.count, 10) - parseInt(item.quantity_mkm, 10),
    isFirstEd: item.is_first_ed === 'True',
    languageId: parseInt(item.language_id, 10),
    priceSuggested: parseFloat(item.price),
    productId: parseInt(item.product_id)
  }));

  console.debug(inputs.length);
  // await doByChunks(createMultiple, inputs, 1000);
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

export const importInventory = (fileName) => {
  toast.promise(savePdf(fileName), {
    loading: 'saving',
    success: 'Bravo',
    error: 'Loser'
  });
};

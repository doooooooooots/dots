import { round } from 'lodash';
import Papa, { unparse } from 'papaparse';
import toast from 'react-hot-toast';
import createCSV from '@utils/create-csv-file.js';
import createGuid from '@utils/create-guid';

const chunkSave = async (inputArray) => {
  inputArray.pop();

  const prices = inputArray.map((item) => ({
    guid: createGuid(item),
    price: round(parseFloat(item.prix_a_envoyer), 2),
    comments: item.comments,
    comments_special_cm: item.comments_special_cm,
    comments_special_ad: item.comments_special_ad
  }));

  createCSV(unparse(prices), 'price_list.csv');
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

export const extractPrices = (fileName) => {
  toast.promise(savePdf(fileName), {
    loading: 'saving',
    success: 'Bravo',
    error: 'Loser'
  });
};

import { uniqueId } from 'lodash';
import Papa, { unparse } from 'papaparse';
import toast from 'react-hot-toast';
import createCSV from '@utils/create-csv-file';

const chunkSave = async (inputArray) => {
  const inputs = inputArray.map((item) => ({
    id: uniqueId(),
    name_en: '',
    name_fr: '',
    price: parseFloat(item.price),
    comments: item.comment_mkm,
    count: parseInt(item.count, 10),
    condition: item.condition,
    expansion: '',
    status: '',
    from: '',
    last_edited: '',
    is_signed: '',
    is_first_ed: item.is_first_ed === 'True',
    is_altered: '',
    is_foil: '',
    is_reverse_holo: '',
    is_playset: '',
    game_id: '',
    language_id: parseInt(item.language_id, 10),
    currency_id: '',
    product_id: parseInt(item.product_id, 10),
    seller_id: '',
    created_at: '',
    updated_at: '',
    category_id: ''
  }));

  createCSV(unparse(inputs));
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

export const createImportFile = (fileName) => {
  toast.promise(savePdf(fileName), {
    loading: 'saving',
    success: 'Bravo',
    error: 'Loser'
  });
};

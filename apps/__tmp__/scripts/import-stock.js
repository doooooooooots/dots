import { cloneDeep, round } from 'lodash';
import moment from 'moment';
import Papa, { unparse } from 'papaparse';
import toast from 'react-hot-toast';
import { CONDITIONS } from '../enums/conditions';
import createCSV from '@utils/create-csv-file';
import { createGuidFromSvet } from '@utils/create-guid';

const regex = /^(\([^)]*\)[^[]*\[[^\]]*])/;

const getCommentId = (item) => {
  let comment = item.comments_special_cm;
  if (['Null', null, 'NULL', undefined].includes(comment)) {
    comment = item.comments;
  }
  const match = comment.match(regex);
  if (match && match.length > 1) {
    comment = match[1];
  }
  if (comment === '') {
    return 1;
  }
  if (comment[0] === 'C' || comment.slice(0, 3) === 'Y C' || comment.slice(0, 2) === 'YC') {
    return 2;
  }
  return 1;
};

const getLangId = (lang) => {
  switch (lang) {
    case '2':
      return 1;
    case '1':
      return 2;
    default:
      return 3;
  }
};

const getNbrToSell = (count) => {
  switch (count) {
    case 0:
      return 0;
    case 1:
    case 2:
    case 3:
      return 1;
    case 4:
    case 5:
      return 2;
    case 6:
      return 3;
    case 7:
      return 4;
    case 8:
      return 5;
    case 9:
    case 10:
    case 11:
    case 12:
      return 6;
    case 13:
      return 7;
    case 14:
      return 8;
    default:
      return 9;
  }
};

export const importStock = (fileName) => {
  const chunkSave = async (inputArray) => {
    inputArray.pop();

    const guid = inputArray.reduce((acc, item) => {
      // Format Values
      item.count = parseInt(item.count, 10);
      item.prix_a_envoyer = round(parseFloat(item.prix_a_envoyer), 2);
      item.product_id = parseInt(item.product_id, 10);
      item.guid = createGuidFromSvet(item);

      item.price = item.prix_a_envoyer;

      item.comments_special_ad = item.comments_special_ad === 'NULL' ? null : item.comments_special_ad;
      item.comments_special_cm = item.comments_special_cm === 'NULL' ? null : item.comments_special_cm;
      item.comments = item.comments === 'NULL' ? null : item.comments;
      item.comment_mkm = item.comments || item.comments_special_cm || item.comments_special_ad;

      if (!acc[item.guid]) {
        acc[item.guid] = item;
        return acc;
      }

      item.count += acc[item.guid].count;
      item.price = Math.min(item.price, acc[item.guid].price);
      item.comment = item.comment || acc[item.guid];
      acc[item.guid] = item;
      return acc;
    }, {});

    const inventory = Object.values(guid);

    console.debug(
      inventory.reduce((acc, item) => {
        if ([null, 'null', 'NULL', 'Null', 0, '0', '', NaN, 'NaN'].includes(item.price)) return acc;

        return acc + 1;
      }, 0)
    );

    const { priceError, ...groupByProductId } = inventory.reduce(
      (acc, item) => {
        if ([null, 'null', 'NULL', 'Null', 0, '0', '', 'NaN', NaN].includes(item.price)) {
          acc.priceError.push(item);
          return acc;
        }

        if (!acc[item.product_id]) {
          acc[item.product_id] = { items: [], count: 0 };
        }

        acc[item.product_id].items.push({
          ...item,
          commentId: getCommentId(item)
        });
        acc[item.product_id].count += parseInt(item.count, 10);
        return acc;
      },
      { priceError: [] }
    );

    // Sort items;
    Object.values(groupByProductId).forEach((item) => {
      const { items } = item;
      items.sort((a, b) => {
        let langA = getLangId(a.language_id);
        let langB = getLangId(b.language_id);
        const firstA = [true, 'True', 'TRUE', 'true', 1, '1'].includes(a.is_first_ed) ? 1 : 2;
        const firstB = [true, 'True', 'TRUE', 'true', 1, '1'].includes(b.is_first_ed) ? 1 : 2;

        return (
          a.commentId - b.commentId ||
          langA - langB ||
          firstA - firstB ||
          CONDITIONS.indexOf(a.condition) - CONDITIONS.indexOf(b.condition) ||
          b.count - a.count
        );
      });
    });

    const { toCreate, toDb } = Object.values(groupByProductId).reduce(
      (acc, item) => {
        let toTake = getNbrToSell(item.count);
        for (let i = 0; i < item.items.length; i++) {
          if (toTake === 0) {
            item.items[i].quantity_mkm = 0;
            acc.toDb.push(item.items[i]);
            continue;
          }
          const loopTake = Math.min(toTake, item.items[i].count);
          const copyItem = cloneDeep(item.items[i]);

          if (loopTake === item.items[i].count) {
            acc.toCreate.push(copyItem);
            item.items[i].quantity_mkm = loopTake;
            acc.toDb.push(item.items[i]);
            toTake -= loopTake;
          } else {
            copyItem.count = loopTake;
            acc.toCreate.push(copyItem);
            item.items[i].quantity_mkm = loopTake;
            acc.toDb.push(item.items[i]);
            toTake -= loopTake;
          }
        }
        return acc;
      },
      { toCreate: [], toDb: [] }
    );

    console.debug(toCreate.length);
    createCSV(unparse(toDb), `inventory-${moment().format('YYYY-MM-DD--hh-mm-ss')}.csv`);
    createCSV(unparse(toCreate), 'to-create-mkm.csv');
    createCSV(unparse(priceError), 'price-error.csv');

    return true;

    // const perChunk = 5000; // items per chunk
    // const chunks = filterdArray.reduce((resultArray, item, index) => {
    //   const chunkIndex = Math.floor(index / perChunk);
    //   // Init array
    //   if (!resultArray[chunkIndex]) {
    //     resultArray[chunkIndex] = [];
    //   }
    //   resultArray[chunkIndex].push(item);
    //   return resultArray;
    // }, []);

    // // console.log(chunks.length);
    // // console.log(chunks[0]);

    // for (let i = 0; i < chunks.length; i++) {
    //   // await createProducts(chunks[i]);
    //   // await deleteProducts(chunks[i]);
    //   // toast.success('Chunk ok');
    //   // console.log(chunks[i]);
    // }
    // return true;
  };

  const savePdf = () =>
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

  toast.promise(savePdf(), {
    loading: 'saving',
    success: 'Bravo',
    error: 'Loser'
  });
};

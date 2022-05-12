import { getMultiple as getExpansions } from '../../_trash/api/api/expansion-api';
import { createMultiple as createProducts, deleteMultiple as deleteProducts } from '../../_trash/api/api/product-api';
import Papa from 'papaparse';
import toast from 'react-hot-toast';

export const getCsvProduct = (fileName) => {
  const chunkSave = async (inputArray) => {
    let expansions = await getExpansions(
      {
        pagination: {
          first: 1000000
        }
      },
      ['id']
    );
    expansions = expansions.map((item) => item.id.toString());

    const cleanArray = inputArray.map((item) => ({
      id: parseInt(item.id, 10),
      gameId: parseInt(item.game_id, 10),
      rarityId: parseInt(item.rarity_id, 10),
      expansionId: parseInt(item.expansion_id, 10),
      categoryId: parseInt(item.category_id, 10),
      nameEn: item.name_en,
      nameFr: item.name_fr,
      nameDe: item.name_de,
      nameEs: item.name_es,
      nameIt: item.name_it,
      website: `https://www.cardmarket.com${item.website}`,
      image: `https:${item.image}`,
      number: parseInt(item.number, 10) || null,
      numberText: item.number_text || '',
      isReprintOf: parseInt(item.is_reprint_of, 10) || null
    }));

    const filterdArray = cleanArray.filter(
      (item) =>
        item.gameId &&
        (item.gameId === 6 || item.gameId === 3) &&
        expansions.includes(item.expansionId.toString()) &&
        item.expansionId === 1173
    );

    console.log(Object.values(filterdArray).map((item) => item.nameFr));
    // const ids = filterdArray.map((item) => item.id);

    const perChunk = 5000; // items per chunk
    const chunks = filterdArray.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk);
      // Init array
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }
      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);

    // console.log(chunks.length);
    // console.log(chunks[0]);

    for (let i = 0; i < chunks.length; i++) {
      // await createProducts(chunks[i]);
      // await deleteProducts(chunks[i]);
      // toast.success('Chunk ok');
      // console.log(chunks[i]);
    }
    return true;
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

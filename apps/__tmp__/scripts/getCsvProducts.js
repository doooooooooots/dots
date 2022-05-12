const getCsvProduct = () => {
  setLoading(true);
  const chunkSave = async (inputArray) => {
    let expansions = await getExpansions({}, ['id']);
    expansions = expansions.map((item) => item.id.toString());

    const filterdArray = inputArray.filter(
      (item) =>
        item.game_id &&
        (item.game_id.toString() === '6' || item.game_id === '3') &&
        expansions.includes(item.expansion_id.toString())
    );

    const perChunk = 10000; // items per chunk
    const chunks = filterdArray.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk);
      // Init array
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }
      resultArray[chunkIndex].push({
        id: item.id,
        gameId: item.game_id,
        rarityId: item.rarity_id,
        expansionId: item.expansion_id,
        categoryId: item.category_id,
        nameEn: item.name_en,
        nameFr: item.name_fr,
        nameDe: item.name_de,
        nameEs: item.name_es,
        nameIt: item.name_it,
        website: `https://www.cardmarket.com${item.website}`,
        image: `https:${item.image}`,
        number: parseInt(item.number, 10) || null,
        numberText: item.number_text || null,
        isReprintOf: parseInt(item.is_reprint_of, 10) || null
      });
      return resultArray;
    }, []);

    console.log(chunks.length);

    for (let i = 0; i < chunks.length; i++) {
      // await createProducts(chunks[i]);
      // toast.success('Chunk ok');
      console.log(chunks[i]);
    }
    return true;
  };

  const savePdf = () =>
    // eslint-disable-next-line no-undef
    new Promise((resolve) => {
      Papa.parse('/mkm_products.csv', {
        download: true,
        header: true,
        complete: function (results) {
          chunkSave(results.data).then(() => {
            setLoading(false);
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

const createTasksToPrice = () => {
  setLoading(true);
  const dateExpectedStart = moment().add(1, 'days').format();
  const dateExpectedEnd = moment().add(7, 'days').format();

  const chunkSave = async (inputArray) => {
    let byId = inputArray.reduce((acc, article) => {
      const { product_id, count, condition, is_first_ed, language_id, prix_final, game_id } = article;

      const formatedItem = {
        productId: parseInt(product_id, 10),
        price: round(parseFloat(prix_final), 4),
        condition,
        isFirstEd: is_first_ed?.toLowerCase() === 'true',
        languageId: parseInt(language_id, 10),
        gameId: parseInt(game_id, 10),
        count: parseInt(count, 10),
        comments: '!!! ALGO PRODUCT !!!',
        operator: 'bot_price'
      };

      if (isNaN(formatedItem.price) || formatedItem.price === null) formatedItem.price = 0;

      if (formatedItem.count === 999) {
        formatedItem.condition = 'NM';
        formatedItem.isFirstEd = true;
        formatedItem.languageId = 2;
      }

      if (!formatedItem.productId) return acc;
      if (isNaN(formatedItem.languageId)) return acc;
      if (isNaN(formatedItem.gameId)) return acc;

      if (!acc[formatedItem.productId]) acc[formatedItem.productId] = [];

      acc[formatedItem.productId].push(formatedItem);

      return acc;
    }, {});

    const productIds = Object.keys(byId);

    for (let i = 1; i < productIds.length; i++) {
      const productId = productIds[i];
      const articles = byId[productId];

      for (let j = 0; j < articles.length; j++) {
        const article = articles[j];

        let resArticles = await getArticles(
          {
            filter: {
              productIdIn: productId,
              operatorIn: 'bot_price',
              conditionIn: article.condition,
              languageIdIn: article.languageId,
              isFirstEd: article.isFirstEd
            }
          },
          ['id']
        );
        if (resArticles === false) {
          console.error(`Erreur lors de la récupération des articles  pour ${productId}`);
          continue;
        }

        // pour chaque article, enregistre le prix
        for (let k = 0; k < resArticles.length; k++) {
          console.debug('create price', {
            articleId: resArticles[k].id,
            value: article.price,
            operator: 'bot_price'
          });
          const resPrice = await createPrice({
            articleId: resArticles[k].id,
            value: article.price,
            operator: 'bot_price'
          });
          if (resPrice === false) {
            console.error(`Erreur lors de la création du prix de ${resArticles[k].id}`);
            continue;
          }

          // Et ajoute le aux tâches a exécuter
          console.debug('create task', {
            action: TASKS.toPrice,
            operator: '',
            status: 'not_started',
            targetId: resArticles[k].id,
            dateExpectedEnd,
            dateExpectedStart
          });
          const resTask = await createTask({
            action: TASKS.toPrice,
            operator: '',
            status: 'not_started',
            targetId: resArticles[k].id,
            dateExpectedEnd,
            dateExpectedStart
          });
          if (resTask === false) {
            console.error("Erreur lors de la création d'une tâche");
            continue;
          }
        }
      }
    }
    return true;
  };

  const savePdf = () =>
    // eslint-disable-next-line no-undef
    new Promise((resolve) => {
      Papa.parse('/products_to_price.csv', {
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

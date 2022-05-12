const rollBack = () => {
  getArticles(
    {
      filter: {
        operatorIn: 'bot_price'
      },
      pagination: { first: 10000 }
    },
    ['id', 'operator']
  ).then((res) => {
    const ids = res.map((item) => item.id);
    doByChunks(deleteArticles, ids, 500);
  });
};

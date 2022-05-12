const handleUpdateProductsClick = (gameId) => {
  const asyncRequest = async () => {
    const expansions = await getExpansions({ filter: { gameIdIn: [gameId] } });
    if (!expansions.length) throw new Error('No expansion');
    for (let i = 0; i < expansions.length; i++) {
      const products = await getExpansionSingles(expansions[i].id);
      console.log(products);
      break;
    }
    toast.success('Les produits ont été récupéré');
    toast.error('Problème lors de la mise à jour des produits');
    setLoading(false);
  };
  setLoading(true);
  asyncRequest();
};

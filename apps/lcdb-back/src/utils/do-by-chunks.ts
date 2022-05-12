export const doByChunks = async (asyncFunc, list, perChunk) => {
  const chunks = list.reduce((acc, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);
    // Init array
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(item);
    return acc;
  }, []);

  for (let i = 0; i < chunks.length; i++) {
    await asyncFunc(chunks[i]);
  }
  return true;
};

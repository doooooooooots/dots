const sendByChunk = async (asynFunc: Function, array: any[], chunkSize: number): Promise<boolean> => {
  for (let index = 0; index < array.length; index = index + chunkSize) {
    const chunk = array.slice(index, index + chunkSize);
    await Promise.all(
      chunk.map(async (article) => {
        await asynFunc(article);
      })
    );
  }
  return true;
};

export default sendByChunk;

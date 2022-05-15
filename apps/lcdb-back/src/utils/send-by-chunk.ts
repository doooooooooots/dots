const sendByChunk = async (
  asynFunc: (args: unknown) => unknown,
  array: unknown[],
  chunkSize: number
): Promise<boolean> => {
  for (let index = 0; index < array.length; index = index + chunkSize) {
    const chunk = array.slice(index, index + chunkSize);
    await Promise.all(
      chunk.map(async (chunkItem) => {
        await asynFunc(chunkItem);
      })
    );
  }
  return true;
};

export default sendByChunk;

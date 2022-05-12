import { getMultiple } from '../../_trash/api/api/article-api';
import { createMultiple } from '../../_trash/api/api/task-api';
import { doByChunks } from '@utils/do-by-chunks';

export const articlesToTask = async () => {
  const articles = await getMultiple(
    {
      pagination: {
        first: -1
      },
      filter: {
        fromIn: 'price-error-csv'
      }
    },
    ['id']
  );
  const inputs = articles.map((targetId) => ({
    action: 'to_price',
    comment: '!!BOT - PriceError',
    status: 'not_started',
    targetId: parseInt(targetId.id, 10)
  }));

  await doByChunks(createMultiple, inputs, 1000);
};

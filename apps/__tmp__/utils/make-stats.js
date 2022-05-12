import { minSorted, maxSorted, mean, median, variance, modeSorted, quantileSorted } from 'simple-statistics';
import { round, isEmpty } from 'lodash';

export const makeStats = (list) => {
  if (!list || isEmpty(list)) {
    return {
      min: '-',
      max: '-',
      before_max: '-',
      before2_max: '-',
      mean: '-',
      median: '-',
      variance: '-',
      mode: '-',
      q3: '-',
      p90: '-'
    };
  }

  const prices = list.reduce((acc, item) => {
    for (let i = 0; i < item.count; i++) {
      acc.push(item.price);
    }
    return acc;
  }, []);

  return {
    min: minSorted(prices),
    max: maxSorted(prices),
    //!TODO : Change stats
    before_max: maxSorted(prices),
    before2_max: maxSorted(prices),
    mean: round(mean(prices), 2),
    median: round(median(prices), 2),
    variance: round(variance(prices), 2),
    mode: modeSorted(prices),
    q3: round(quantileSorted(prices, 0.75), 4),
    p90: round(quantileSorted(prices, 0.9), 2)
  };
};

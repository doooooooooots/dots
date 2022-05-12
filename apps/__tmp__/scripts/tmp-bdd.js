import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { getMultiple } from '../../_trash/api/api/price-api';

const fetch = false;

export default function TmpBdd() {
  const ids = [
    28840, 33796, 30054, 32520, 34599, 32674, 32306, 36205, 32884, 31794, 30893, 30316, 31693, 31602, 29729, 32567,
    29811, 35574, 36945, 33298, 29589, 26561, 35746, 28392, 36114, 35690, 31538, 34407, 27286, 27739, 28946, 28020,
    28735, 29157, 36343, 26764, 30304, 31516, 28036, 33412, 28546, 26497, 27341, 27181, 29877, 27935, 32254, 26905,
    33724, 35581, 28364, 34525
  ];

  useEffect(() => {
    const asyncCall = async () => {
      const response = await getMultiple(
        {
          filter: {
            articleIdIn: ids
          },
          pagination: {
            first: 1000
          }
        },
        ['id', 'operator', 'value', 'article {id}']
      );

      let { toDelete, ...other } = response.reduce(
        (acc, item) => {
          if (item.operator === 'bot_price') return acc;
          if (isEmpty(acc[item.article.id])) {
            acc[item.article.id] = {};
            acc[item.article.id].allOperator = [];
          }
          if (acc[item.article.id].allOperator.includes(item.operator)) {
            if (item.value > acc[item.article.id][item.operator].value) {
              acc.toDelete.push(acc[item.article.id][item.operator]);
              acc[item.article.id][item.operator] = item;
              return acc;
            } else {
              acc.toDelete.push(item);
              return acc;
            }
          }
          acc[item.article.id][item.operator] = item;
          acc[item.article.id].allOperator.push(item.operator);
          return acc;
        },
        { toDelete: [] }
      );
      console.log(other);

      const { toDelete: toDeleteFinal, toKeep } = Object.values(other).reduce(
        (acc, item) => {
          if (item.allOperator.length === 1) {
            acc.toKeep.push(item[item.allOperator[0]]);
            return acc;
          }
          if (item.allOperator.includes('Svet')) {
            acc.toKeep.push(item.Svet);
            item.allOperator
              .filter((name) => name !== 'Svet')
              .forEach((name) => {
                acc.toDelete.push(item[name]);
              });
            return acc;
          }
          let keepPrice = 0;
          let keepOperator = 0;
          item.allOperator.forEach((name) => {
            if (item[name].value > keepPrice) {
              keepOperator = name;
              keepPrice = item[name].value;
            }
          });
          acc.toKeep.push(item[keepOperator]);
          item.allOperator
            .filter((name) => name !== keepOperator)
            .forEach((name) => {
              acc.toDelete.push(item[name]);
            });
          return acc;
        },
        { toDelete, toKeep: [] }
      );

      console.debug(('TODELETE ---- ', JSON.stringify(toDeleteFinal.map((item) => item.id))));
      console.debug(('KEEP ---- ', JSON.stringify(toKeep.map((item) => item.id))));
    };
    asyncCall();
  }, []);

  return <div></div>;
}

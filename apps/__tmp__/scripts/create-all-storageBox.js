import { getMultiple } from '../../_trash/api/api/inventory-api';
import { create } from '../../_trash/api/api/storage-box-api';

export const createAllStorageBoxes = async () => {
  const inventories = await getMultiple(
    {
      pagination: {
        first: -1
      }
    },
    ['guid']
  );

  const regex = /(\([a-zA-Z0-9]*\))?([a-zA-Z0-9]+)(\[[a-zA-Z0-9]+\]|\/[a-zA-Z0-9]+)(.*)/;

  const racks = inventories.map((item) => {
    const { guid } = item;
    const storageName = guid.split('-')[0].match(regex);
    console.log(storageName);
    if (storageName) {
      return storageName[2] + storageName[3];
    }
    return null;
  });

  // eslint-disable-next-line no-undef
  const uniqueRacks = [...new Set(racks)];
  console.log(uniqueRacks.sort());
  uniqueRacks.forEach((name) => {
    create({
      name
    });
  });
};

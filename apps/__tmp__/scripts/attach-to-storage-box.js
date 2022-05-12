import { getMultiple, updateMultiple } from '../../_trash/api/api/inventory-api';
import { getMultiple as getStorageBoxes } from '../../_trash/api/api/storage-box-api';

export const attachToStorageBox = async () => {
  const storageBoxes = await getStorageBoxes(
    {
      pagination: {
        first: -1
      }
    },
    ['id', 'name']
  );

  storageBoxes.forEach(async (item) => {
    const inventories = await getMultiple(
      {
        pagination: {
          first: -1
        },
        filter: {
          guidContains: item.name
        }
      },
      ['id']
    );

    const ids = inventories.map((article) => article.id);
    await updateMultiple({
      ids,
      attributes: {
        storageBoxId: item.id
      }
    });
  });
};

import { relationship } from "@keystone-6/core/fields"

export const mediaObject = () => relationship({
  ref: 'MediaObject',
  many: false,
  hooks: {
    afterOperation: async ({
      listKey,
      fieldKey,
      operation,
      item,
      context,
    }) => {
      if (operation === 'create') {
        context.db.MediaObject.updateOne({
          where: { id: item.imageId as string },
          data: {
            backlinks: {
              create: {
                targetId: item.id,
                targetType: listKey,
                targetField:fieldKey
              }
            }
          }
        })
      }
    },
  }
})
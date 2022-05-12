import { relationship } from "@keystone-6/core/fields"

export const updates = {
  updates: relationship({ ref: 'TrackerUpdate', many: true }),
}
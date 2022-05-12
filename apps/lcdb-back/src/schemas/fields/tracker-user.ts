import { relationship } from "@keystone-6/core/fields"

export const createdBy = {
  createdBy: relationship({ ref: 'Person', many: false }),
}

export const updatedBy = {
  updatedBy: relationship({ ref: 'Person', many: false }),
}

export const trackerPerson = {
  ...createdBy,
  ...updatedBy
}
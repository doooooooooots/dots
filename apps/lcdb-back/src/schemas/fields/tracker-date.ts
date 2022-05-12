import { timestamp } from "@keystone-6/core/fields"

export const createdAt = {
  createdAt: timestamp({
    defaultValue: { kind: 'now' },
    db: {
      updatedAt:true
    }
  })
}

export const updatedAt = {
  updatedAt: timestamp({
    defaultValue: { kind: 'now' },
    db: {
      updatedAt:true
    }
  })
}

export const trackerDate = {
  ...updatedAt,
  ...createdAt
}
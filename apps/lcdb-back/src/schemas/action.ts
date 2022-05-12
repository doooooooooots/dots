import { list } from "@keystone-6/core";
import { relationship, text, timestamp } from "@keystone-6/core/fields";

export const Action = list({
  fields: {
    name: text(),
    description: text(),
    action_status: text(),
    result: text(),
    startTime: timestamp(),
    endTime: timestamp(),
    expectedStartTime: timestamp(),
    expectedEndTime: timestamp(),
    agent: relationship({ ref: 'Person.actions', many: false }),
    comments: relationship({ ref: 'Comment', many: true }),
    ratings: relationship({ ref: 'Rating', many: true }),
  },
})
import { list } from "@keystone-6/core";
import { relationship, text, timestamp } from "@keystone-6/core/fields";

export const ControlAction = list({
  fields: {
    name: text(),
    description: text(),
    action_status: text(),
    result: text(),
    start_time: timestamp(),
    end_time: timestamp(),
    expected_start_time: timestamp(),
    expected_end_time: timestamp(),
    agent: relationship({ ref: 'Person', many: false }),
    targetStorage: relationship({ ref: 'Storage', many: false }),
    comments: relationship({ ref: 'Comment', many: true }),
  },
})
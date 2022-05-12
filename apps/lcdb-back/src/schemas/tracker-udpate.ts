import { list } from "@keystone-6/core";
import { updatedAt } from "./fields/tracker-date";
import { updatedBy } from "./fields/tracker-user";

export const TrackerUpdate = list({
  fields: {
    ...updatedAt,
    ...updatedBy
  },
})
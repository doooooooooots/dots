import { createdAt } from "./tracker-date";
import { createdBy } from "./tracker-user";

export const trackerCreate = {
  ...createdAt,
  ...createdBy
}
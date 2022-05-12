export const PROJECT_PROPERTIES = [
  {
    id: "createdAt",
    type: "timestamp",
  },
  {
    id: "updatedAt",
    type: "timestamp",
  },
  {
    id: "name",
    type: "text",
  },
  {
    id: "status",
    type: "select",
  },
  {
    id: "areaWind",
    type: "integer",
  },
  {
    id: "client",
    type: "relationship",
  },
];

export const TYPE_BY_PROPERTY_ID = PROJECT_PROPERTIES.reduce(
  (acc, item) => ({
    ...acc,
    [item.id]: item.type,
  }),
  {}
);

export const PROPERTY_IDS = PROJECT_PROPERTIES.map((item) => item.id);

export default function createSchema<T extends string, U>(entities: {
  [key in T]: U;
}) {
  return entities;
}

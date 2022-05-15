export const GRAPHQL_REQUESTS = {
  FindOne: 'graphql_action_find_one',
  FindMany: 'graphql_action_find_one',
  CreateOne: 'graphql_action_create_one',
  CreateMany: 'graphql_action_create_many',
  UpdateOne: 'graphql_action_update_one',
  UpdateMany: 'graphql_action_update_many',
  DeleteOne: 'graphql_action_delete_one',
  DeleteMany: 'graphql_action_delete_many',
  Count: 'graphql_action_count',
} as const;

export const GRAPHQL_ACTIONS = {
  ...GRAPHQL_REQUESTS,
  MoveOne: 'graphql_action_move_one',
  MoveMany: 'graphql_action_move_many',
  PublishOne: 'graphql_action_publish_one',
  PublishMany: 'graphql_action_publish_many',
  UnpublishOne: 'graphql_action_unpublish_one',
  UnpublishMany: 'graphql_action_unpublish_many',
  UnlistOne: 'graphql_action_unlist_one',
  UnlistMany: 'graphql_action_unlist_many',
};

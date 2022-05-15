import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import DefaultDialogDeleteOne from './dialog-default-delete-one';
import DefaultDialogDeleteMany from './dialog-default-delete-many';
import DefaultDialogUpdateOne from './dialog-default-update-one';
import DefaultDialogUpdateMany from './dialog-default-update-many';
import DefaultDialogPublishOne from './dialog-default-publish-one';
import DefaultDialogPublishMany from './dialog-default-publish-many';
import DefaultDialogUnpublishOne from './dialog-default-unpublish-one';
import DefaultDialogUnpublishMany from './dialog-default-unpublish-many';
import DefaultDialogUnlistOne from './dialog-default-unlist-one';
import DefaultDialogUnlistMany from './dialog-default-unlist-many';
import DefaultDialogMoveOne from './dialog-default-move-one';
import DefaultDialogMoveMany from './dialog-default-move-many';

const DEFAULT_DATAGRID_DIALOGS_COMPONENTS = {
  // ONES
  [GRAPHQL_ACTIONS.UpdateOne]: DefaultDialogUpdateOne,
  [GRAPHQL_ACTIONS.DeleteOne]: DefaultDialogDeleteOne,
  [GRAPHQL_ACTIONS.PublishOne]: DefaultDialogPublishOne,
  [GRAPHQL_ACTIONS.UnpublishOne]: DefaultDialogUnpublishOne,
  [GRAPHQL_ACTIONS.MoveOne]: DefaultDialogMoveOne,
  [GRAPHQL_ACTIONS.UnlistOne]: DefaultDialogUnlistOne,
  // MANY
  [GRAPHQL_ACTIONS.UpdateMany]: DefaultDialogUpdateMany,
  [GRAPHQL_ACTIONS.DeleteMany]: DefaultDialogDeleteMany,
  [GRAPHQL_ACTIONS.PublishMany]: DefaultDialogPublishMany,
  [GRAPHQL_ACTIONS.UnpublishMany]: DefaultDialogUnpublishMany,
  [GRAPHQL_ACTIONS.MoveMany]: DefaultDialogMoveMany,
  [GRAPHQL_ACTIONS.UnlistMany]: DefaultDialogUnlistMany,
};

export default DEFAULT_DATAGRID_DIALOGS_COMPONENTS;

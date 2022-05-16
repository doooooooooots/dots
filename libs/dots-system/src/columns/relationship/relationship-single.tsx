import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';
import { FC } from 'react';
import ButtonOpenRelation from '../../components/button-open-relation';
import { withContext } from '../../hoc';
import { DotsColumnProps } from '../types';
import { EntityKey } from '../../schemas';
import { DotsSinglePage } from '../../pages';
import withMiddleware from '../middlewares/with-middleware';

type relationshipProps = DotsColumnProps & {
  actionText?: string | ((args: GridRenderCellParams) => string);
  count: number | ((args: GridRenderCellParams) => number);
  Component: FC;
};

const relationshipSingle = ({
  field,
  valueGetter,
  filterQuery,
  Component,
  ...props
}: relationshipProps): GridColDef => ({
  renderCell: (params) => {
    const { row } = params;
    let actionText;
    try {
      actionText = valueGetter(params);
      return (
        <ButtonOpenRelation
          actionText={actionText}
          many={false}
          // History props
          path={field}
          title={`Details de ${field}`}
          Component={
            Component || withContext(field as EntityKey)(DotsSinglePage)
          }
          componentProps={{ filter: filterQuery(params) }}
        />
      );
    } catch {
      actionText = 'Add';
      return <div>{`Add ${field}`}</div>;
    }
  },
  field,
  width: 190,
  align: 'left',
  type: 'string',
  ...props,
});

export default withMiddleware(relationshipSingle);

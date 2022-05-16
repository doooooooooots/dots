import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';
import { FC } from 'react';
import ButtonOpenRelation from '../../components/button-open-relation';
import { withContext } from '../../hoc';
import { DotsColumnProps } from '../types';
import { EntityKey } from '../../schemas';
import { DotsIndexPage } from '../../pages';
import withMiddleware from '../middlewares/with-middleware';

type relationshipProps = DotsColumnProps & {
  actionText?: string | ((args: GridRenderCellParams) => string);
  count: number | ((args: GridRenderCellParams) => number);
  Component: FC;
};

const relationshipMany = ({
  field,
  actionText,
  count,
  Component,
  ...props
}: relationshipProps): GridColDef => ({
  renderCell: (params) => {
    const { row } = params;

    let _count;
    if (typeof count === 'function') _count = count(params) as number;
    else _count = count as number;

    return (
      <ButtonOpenRelation
        actionText={actionText || row.__typename}
        count={_count}
        // History props
        path={field}
        title={`Details de ${field}`}
        // TODO(Adrien): Rendering high cost !! (genereate context for each)
        Component={Component || withContext(field as EntityKey)(DotsIndexPage)}
        componentProps={{ filter: { where: { id: row.id } } }}
      />
    );
  },
  field,
  width: 190,
  align: 'left',
  type: 'string',
  ...props,
});

export default withMiddleware(relationshipMany);

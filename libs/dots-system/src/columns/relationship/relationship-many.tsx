import { FC } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';
import ButtonOpenRelation from '../../components/button-open-relation';
import { DotsColumnProps } from '../types';
import { DotsDialogRelationship } from '../../pages';
import withMiddleware from '../middlewares/with-middleware';

type relationshipProps = DotsColumnProps & {
  target: string;
  indexColumn?: string;
  count: number | ((args: GridRenderCellParams) => number);
  Component: FC;
};

const relationshipMany = ({
  field,
  target,
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
        actionText={field}
        count={_count}
        //-> History props
        path={field}
        title={`Details de ${field}`}
        Component={Component || DotsDialogRelationship}
        componentProps={{
          agent: row.__typename.toLowerCase(),
          filterAgent: { id: row.id },
          target: field,
          filter: {},
        }}
        multiple
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

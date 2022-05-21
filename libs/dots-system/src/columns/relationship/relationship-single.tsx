import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';
import { FC } from 'react';
import ButtonOpenRelation from '../../components/button-open-relation';
import { DotsColumnProps } from '../types';
import { DotsSinglePage } from '../../pages';
import withMiddleware from '../middlewares/with-middleware';
import { useContext as getContext } from '../../hoc';

type relationshipProps = DotsColumnProps & {
  target: string;
  indexColumn?: string;
  count: number | ((args: GridRenderCellParams) => number);
  Component: FC;
};

const relationshipSingle = ({
  field,
  target,
  Component,
  ...props
}: relationshipProps): GridColDef => ({
  renderCell: (params) => {
    const { row } = params;
    const { indexColumn } = getContext(target);
    try {
      return (
        <ButtonOpenRelation
          actionText={row[target][indexColumn]}
          // History props
          path={field}
          title={`Details de ${field}`}
          Component={Component || DotsSinglePage}
          componentProps={{
            filter: { where: { id: row[target].id } },
            entityName: target,
          }}
        />
      );
    } catch {
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

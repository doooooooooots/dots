import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';
import { FC } from 'react';
import ButtonOpenDetails from '../../components/button-open-details';
import { withContext } from '../../hoc';
import { DotsColumnProps } from '../types';
import { EntityKey } from '../../schemas';
import { DotsIndexPage } from '../../pages';
import withMiddleware from '../middlewares/with-middleware';

type relashionshipProps = DotsColumnProps & {
  actionText?: string | ((args: GridRenderCellParams) => string);
  count: number | ((args: GridRenderCellParams) => number);
  Component: FC;
};

const relashionship = ({
  field,
  actionText,
  count,
  Component,
  ...props
}: relashionshipProps): GridColDef => ({
  renderCell: (params) => {
    const { row } = params;
    let _count;

    if (typeof count === 'function') _count = count(params) as number;
    else _count = count as number;

    return (
      <ButtonOpenDetails
        actionText={actionText || field}
        count={_count}
        // History props
        path={'cartes'}
        title={'Details du rack'}
        Component={withContext(field as EntityKey)(DotsIndexPage)}
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

export default withMiddleware(relashionship);

import { FC } from 'react';
import { GridColDef } from '@mui/x-data-grid-pro';
import ButtonOpenSingle from '../../components/button-open-single';
import { DotsColumnProps } from '../types';
import withMiddleware from '../middlewares/with-middleware';
import { withContext } from '../../hoc';
import { DotsSinglePage } from '../../pages';

type uniqueIdProps = DotsColumnProps & {
  Component: FC;
};

const uniqueId = ({ Component, ...props }: uniqueIdProps): GridColDef => ({
  renderCell: ({ row }) => (
    <ButtonOpenSingle
      cellText={row.name}
      // History props
      path={'cartes'}
      title={'Details du rack'}
      Component={withContext(row.__typename.toLowerCase() as EntityKey)(
        DotsSinglePage
      )}
      componentProps={{ filter: { where: { id: row.id } } }}
    />
  ),
  type: 'string',
  width: 180,
  ...props,
});

export default withMiddleware(uniqueId);

import { GridColDef } from '@mui/x-data-grid-pro';
import { FC } from 'react';
import ButtonOpenSingle from '../../components/button-open-single';
import { DotsColumnProps } from '../types';
import withMiddleware from '../middlewares/with-middleware';

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
      Component={Component}
      componentProps={{ variables: { where: { id: row.id } } }}
    />
  ),
  type: 'string',
  width: 180,
  ...props,
});

export default withMiddleware(uniqueId);

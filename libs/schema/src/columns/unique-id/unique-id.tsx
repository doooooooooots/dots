import { FC } from 'react';
import { GridColDef } from '@mui/x-data-grid-pro';
import { DotsColumnProps } from '../types';
import withMiddleware from '../middlewares/with-middleware';
import { lcFirst } from '@dots.cool/utils';
import { Button } from '@mui/material';

type uniqueIdProps = DotsColumnProps & {
  Component: FC;
};

const uniqueId = ({ Component, ...props }: uniqueIdProps): GridColDef => ({
  renderCell: ({ row }) => (
    <Button>OK</Button>
    // <ButtonOpenSingle
    //   cellText={row.name}
    //   // History props
    //   path={'cartes'}
    //   title={'Details du rack'}
    //   Component={DotsSinglePage}
    //   componentProps={{
    //     filter: {
    //       where: { id: row.id },
    //     },
    //     entityName: lcFirst(row.__typename),
    //   }}
    // />
  ),
  type: 'string',
  width: 180,
  ...props,
});

export default withMiddleware(uniqueId);

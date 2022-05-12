import { ButtonOpenSingle } from '@dots.cool/dots-system';

const primary = (field, headerName, props) => ({
  field,
  headerName,
  width: 180,
  renderCell: ({ row }) => (
    <ButtonOpenSingle
      cellText={row.name}
      path={'cartes'}
      title={'Details du rack'}
      Component={StorageSingle}
      componentProps={{ id: row.id }}
      linkText={'Cartes'}
      count={row.offersCount}
    />
  ),
});

export default primary;

import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';
import { DotsColumnProps } from '../types';
import withMiddleware from '../middlewares/with-middleware';
import { Chip } from '@mui/material';

type selectProps = DotsColumnProps & {
  multiple: boolean;
  variant: 'string';
};

const Cell = (props) => {
  const { params, variant, valueGetter } = props;
  if (variant === 'chip')
    return (
      <Chip label={valueGetter(params)} color="primary" variant="outlined" />
    );
  return <div>{valueGetter(params)}</div>;
};

const select = ({
  multiple,
  type,
  variant,
  valueGetter,
  ...props
}: selectProps): GridColDef => {
  if (multiple === true) return { ...props, type: 'string' };
  return {
    ...props,
    type: 'singleSelect',
    align: 'center',
    editable: true,
    valueOptions: ['EX', 'NM', 'GD', 'PL', 'LP'],
    renderCell: (params: GridRenderCellParams<Date>) => (
      <Cell valueGetter={valueGetter} variant={variant} params={params} />
    ),
  };
};

export default withMiddleware(select);

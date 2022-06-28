import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import {
  GridRenderCellParams,
  GridColDef,
  useGridApiContext,
} from '@mui/x-data-grid';

function RatingEditInputCell(props: GridRenderCellParams<number>) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  const handleRef = (element: HTMLSpanElement) => {
    if (element) {
      const input = element.querySelector<HTMLInputElement>(
        `input[value="${value}"]`
      );
      input?.focus();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', pr: 2 }}>
      <Rating
        ref={handleRef}
        name="rating"
        precision={1}
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
}

const renderRating: GridColDef['renderCell'] = (
  params: GridRenderCellParams<number>
) => {
  return <Rating readOnly value={params.value} />;
};

const renderRatingEditInputCell: GridColDef['renderCell'] = (params) => {
  return <RatingEditInputCell {...params} />;
};

export { renderRating, renderRatingEditInputCell };
export default RatingEditInputCell;

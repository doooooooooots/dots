import { Box, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid-pro';
import withMiddleware from '../middlewares/with-middleware';
import { DotsColumnProps } from '../types';
import Image from 'next/image';

const image = ({ valueGetter, ...props }: DotsColumnProps): GridColDef => ({
  width: 195,
  sortable: false,
  renderCell: (params) => {
    return (
      <Tooltip
        title={
          <Image
            src={`${valueGetter(params)}`}
            alt="preview"
            width={251}
            height={364}
            unoptimized
          />
        }
        placement="right-end"
        followCursor
      >
        <Box
          sx={{
            backgroundImage: `url(${valueGetter(params)})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: '100%',
            width: 230,
          }}
        />
      </Tooltip>
    );
  },
  headerName: 'Image',
  ...props,
  type: 'string',
});

export default withMiddleware(image);

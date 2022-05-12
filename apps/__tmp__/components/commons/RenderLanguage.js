import Image from 'next/image';
import { Box } from '@mui/system';
import React from 'react';

const getValue = (value) => {
  switch (value) {
    case 1:
    case '1':
    case 'en':
      return 'gb';
    case 2:
    case '2':
      return 'fr';
    default:
      return value;
  }
};

const RenderLanguage = ({ params }) => {
  return (
    <Box m='auto' display='flex' alignItems='center'>
      <Image
        src={`/assets/flags/svg/${getValue(params.value)}.svg`}
        srcSet={`/assets/flags/svg/${getValue(params.value)}.svg 2x`}
        width={20}
        height={15}
        alt={params.value}
        unoptimized
      />
    </Box>
  );
};

export default React.memo(RenderLanguage);

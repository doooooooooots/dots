import React from 'react';
import Image from 'next/image';
import { getLanguageCode } from '@utils/get-language';
import { Box } from '@mui/material';

function FieldCountryFlagShow(props) {
  let { countryCode = 'fr', width = 20, sx = { m: 'auto', display: 'flex', alignItems: 'center' } } = props;

  countryCode = getLanguageCode(countryCode);
  countryCode = countryCode === 'en' ? 'gb' : countryCode;

  return (
    <Box sx={sx}>
      <Image
        src={`/assets/flags/svg/${countryCode}.svg`}
        srcSet={`/assets/flags/svg/${countryCode}.svg 2x`}
        width={width}
        height={(width * 3) / 4}
        alt={countryCode}
        unoptimized
      />
    </Box>
  );
}

export default React.memo(FieldCountryFlagShow);

import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import ConditionTypography from './ConditionTypography';
import FieldCountryFlagShow from '../field-country-flag-show';

export default function CardInfoPictos(props) {
  const { article, variant, colorMode, direction = 'row', hideCondition } = props;

  return (
    <Stack direction={direction} spacing={variant === 'small' ? 1 : 3} alignItems='center' sx={{ lineHeight: 1 }}>
      <Box display='flex'>
        <FieldCountryFlagShow countryCode={article.languageId} width={variant === 'small' ? 40 : 60} />
      </Box>
      <Typography variant={variant === 'small' ? 'body1' : 'h4'} color={colorMode === 'light' ? 'black' : 'white'}>
        {article.isFirstEd ? (
          <>
            ✅ 1<sup>st</sup>
          </>
        ) : (
          ''
        )}
      </Typography>
      {!hideCondition && (
        <ConditionTypography variant={variant === 'small' ? 'body1' : 'h4'} condition={article.condition} />
      )}
    </Stack>
  );
}

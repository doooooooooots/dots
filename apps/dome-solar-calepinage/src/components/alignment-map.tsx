import React from 'react';
import { Box } from '@mui/system';
import AlignmentsIcons from '../icons/alignments-icons';
import { ALIGNMENT_MAP } from './_trash/enums/alignment';
import { IconButton } from '@mui/material';
import Loading from './design-system/screens/loading';

function AlignmentMap(props) {
  const { loading, active, size, onClick } = props;

  return (
    <Box position="relative">
      {loading && (
        <Box position="absolute" width="100%" height="100%">
          <Loading hideTypo sx={{ height: '100%' }} />
        </Box>
      )}
      {ALIGNMENT_MAP.map((verticalMap, index) => {
        return (
          <Box key={index}>
            {verticalMap.map((key) => (
              <IconButton
                key={key}
                size={size}
                disabled={loading}
                sx={[
                  active === key && {
                    color: 'primary.main',
                  },
                ]}
                onClick={() => onClick(key)}
              >
                <AlignmentsIcons variant={key} />
              </IconButton>
            ))}
          </Box>
        );
      })}
    </Box>
  );
}

export default AlignmentMap;

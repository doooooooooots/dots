import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import {
  Alert,
  Box,
  Dialog,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { round } from 'lodash';
import DialogQuantitativeEdit from './DialogQuantitativeEdit';
import useDialog from '../../hooks/use-dialog';
import { useStore } from './context/useStore';

export default function StepSummaryQuantitative(props) {
  const { defaultTargets, analytic, useSolarEdge, sx = {} } = props;
  const { isOpen, onOpen, onClose } = useDialog();
  const [tagName, setTagName] = useState(null);
  const store = useStore();

  const handleEditClick = useCallback(
    (name) => () => {
      setTagName(name);
      onOpen();
    },
    [onOpen, setTagName]
  );

  return (
    <Box sx={sx}>
      <Stack spacing={1}>
        <Typography variant='body2' fontWeight='bold'>
          {`Puissance installée : ${round(analytic?.totalPower, 2)} kWc`}
        </Typography>

        {/* <Typography
          variant="body2"
          fontWeight="bold"
        >
          {`Taille des modules : ${analytic?.totalPower} kWc`}
        </Typography> */}
      </Stack>

      <Divider sx={{ my: 2 }} />

      <TableContainer sx={{ maxWidth: 1400 }}>
        <Table
          sx={{
            minWidth: 650,
            '& .MuiTableBody-root .MuiTableRow-root:hover': {
              backgroundColor: 'grey.100'
            },
            '& .MuiButtonBase-root': {
              visibility: 'hidden'
            },
            '& .MuiTableRow-root:hover .MuiButtonBase-root': {
              visibility: 'visible'
            }
          }}
          size='small'
          aria-label='quantitatif'
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Références</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Désignation</TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Total
              </TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                Livré par Dome Solar
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Module */}
            <TableRow
              sx={{
                '& td, & th': { borderColor: 'grey.300' },
                '&:last-child td, &:last-child th': { border: 0 }
              }}
            >
              <TableCell>Modules</TableCell>
              <TableCell>
                {defaultTargets?.useSolarPanel &&
                  defaultTargets?.useSolarPanel[0] &&
                  defaultTargets.useSolarPanel[0].target.name}
              </TableCell>
              <TableCell align='center'>{analytic.totalModules}</TableCell>
              <TableCell align='right'>-</TableCell>
              <TableCell />
            </TableRow>

            {/* Bac */}
            <TableRow
              sx={{
                '& td, & th': { borderColor: 'grey.800', pb: 2 },
                '&:last-child td, &:last-child th': { border: 0 }
              }}
            >
              <TableCell>Bac</TableCell>
              <TableCell>
                {defaultTargets?.useCladding &&
                  defaultTargets?.useCladding[0] &&
                  defaultTargets.useCladding[0].target.name}
              </TableCell>
              <TableCell align='center'>-</TableCell>
              <TableCell align='right'>-</TableCell>
              <TableCell />
            </TableRow>

            {/* Bilan */}
            {Object.keys(analytic?.bilan.references).map((key, index) => {
              const currentRef = store.getFinalAnalytic(key);
              if (key === 'solar_edge' && !useSolarEdge) return null;
              return (
                <TableRow
                  key={key}
                  sx={{
                    '& td, & th': { borderColor: 'grey.300', ...(index === 0 ? { pt: 2 } : {}) },
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell>
                    {currentRef.ref.guid ?? (
                      <Box sx={{ color: 'red' }} component='span'>
                        Opérateur requis
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>{currentRef.ref.name}</TableCell>
                  <TableCell align='center'>{currentRef.count || '-'}</TableCell>
                  <TableCell align='right'>{currentRef.delivery ? 'X' : ''}</TableCell>
                  <TableCell>
                    <IconButton size='small' onClick={handleEditClick(key)}>
                      <ModeEditOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Alert severity='info' sx={{ mt: 2 }}>
        Vous pouvez modifier le tableau en cliquant directement sur les cellules
      </Alert>

      <Dialog open={isOpen} onClose={onClose} maxWidth='md' fullWidth>
        <DialogQuantitativeEdit tagName={tagName} onClose={onClose} />
      </Dialog>
    </Box>
  );
}

StepSummaryQuantitative.propTypes = {
  defaultTargets: PropTypes.any,
  analytic: PropTypes.any,
  useSolarEdge: PropTypes.any,
  sx: PropTypes.any
};

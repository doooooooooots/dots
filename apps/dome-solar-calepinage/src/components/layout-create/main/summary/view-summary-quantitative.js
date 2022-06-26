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
  Typography,
} from '@mui/material';

import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { isEmpty } from 'lodash';
import useDialog from '../../../../hooks/use-dialog';
import { useStore } from '../../../../contexts/useStore';
import DialogQuantitativeEdit from './dialog-quantitative-edit';

export default function StepSummaryQuantitative() {
  const { isOpen, onOpen, onClose } = useDialog();
  const [tagName, setTagName] = useState(null);
  const { getAllRelatedData, getMassBalance } = useStore();

  const { layout, solarModule, cladding, massBalance } = getAllRelatedData();

  const { balance, modules, totalPower } = getMassBalance();

  const handleEditClick = useCallback(
    (name) => () => {
      setTagName(name);
      onOpen();
    },
    [onOpen, setTagName]
  );

  if (isEmpty(massBalance)) return null;

  return (
    <Box m="auto" width="100%" maxWidth={900}>
      <Stack>
        <Typography variant="body2" fontWeight="bold">
          {`Taille des modules : ${solarModule?.lengthX} x ${solarModule?.lengthY}`}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {`Puissance unitaire : ${solarModule.electricalPower} Wc`}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {`Puissance totale installée : ${totalPower} kWc`}
        </Typography>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <TableContainer>
        <Table
          sx={{
            minWidth: 650,
            '& .MuiTableBody-root .MuiTableRow-root:hover': {
              backgroundColor: 'neutral.25',
            },
            '& .MuiButtonBase-root': {
              visibility: 'hidden',
            },
            '& .MuiTableRow-root:hover .MuiButtonBase-root': {
              visibility: 'visible',
            },
            '& .MuiTableCell-root': {
              py: 1,
            },
            '& .paddingY--0': {
              py: 0,
            },
          }}
          size="small"
          aria-label="quantitatif"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Références</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Désignation</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Total
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
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
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell>Modules</TableCell>
              <TableCell>{solarModule.name}</TableCell>
              <TableCell align="center">{modules.total}</TableCell>
              <TableCell align="right">-</TableCell>
              <TableCell />
            </TableRow>
            {/* Bac */}
            <TableRow
              sx={{
                '& td, & th': { borderColor: 'grey.800', pb: 2 },
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell>Bac</TableCell>
              <TableCell>{cladding.name}</TableCell>
              <TableCell align="center">-</TableCell>
              <TableCell align="right">-</TableCell>
              <TableCell />
            </TableRow>
            {/* Bilan */}
            {!isEmpty(balance) &&
              balance.map(
                (
                  { key, count, delivery, reference: { id, sku, designation } },
                  index
                ) => {
                  if (key === 'solar_edge' && !layout.solarEdge) return null;
                  return (
                    <TableRow
                      key={key}
                      sx={{
                        '& td, & th': {
                          borderColor: 'grey.300',
                          ...(index === 0 ? { pt: 2 } : {}),
                        },
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell>
                        {sku ?? (
                          <Box sx={{ color: 'red' }} component="span">
                            Opérateur requis
                          </Box>
                        )}
                      </TableCell>
                      <TableCell>{designation}</TableCell>
                      <TableCell align="center">{count || '-'}</TableCell>
                      <TableCell align="right">{delivery ? 'X' : ''}</TableCell>
                      <TableCell className="paddingY--0">
                        <IconButton size="small" onClick={handleEditClick(key)}>
                          <ModeEditOutlinedIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
          </TableBody>
        </Table>
      </TableContainer>

      <Alert severity="info" sx={{ mt: 2 }}>
        Vous pouvez modifier le tableau en cliquant directement sur les cellules
      </Alert>

      <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
        <DialogQuantitativeEdit tagName={tagName} onClose={onClose} />
      </Dialog>
    </Box>
  );
}

StepSummaryQuantitative.propTypes = {
  defaultTargets: PropTypes.any,
  analytic: PropTypes.any,
  useSolarEdge: PropTypes.any,
  sx: PropTypes.any,
};

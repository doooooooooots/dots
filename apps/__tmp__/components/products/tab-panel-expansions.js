import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function TabPanelExpansions() {
  const rows = [];

  return (
    <>
      <Typography variant={'h4'}>Extensions</Typography>
      <TableContainer>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Abbreviation</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Date de sortie</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.abbreviation}</TableCell>
                <TableCell>{row.nameFr}</TableCell>
                <TableCell>{row.dateRelease}</TableCell>
                <TableCell align='right'>
                  <IconButton>
                    <MoreHorizIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

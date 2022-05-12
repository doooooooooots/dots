import React from 'react';
import { difference, intersection, union } from 'lodash';
import { Select, MenuItem, Typography, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Box } from '@mui/system';

const ImportCompareFiles = (props) => {
  const { columns, rowsLeft, rowsRight } = props;

  const { control, watch } = useForm();
  const [operation, compareOn] = watch(['operation', 'compareOn']);

  const compareRows = React.useMemo(() => {
    const leftValues = rowsLeft.map((row) => row[compareOn]);
    const rightValues = rowsRight.map((row) => row[compareOn]);

    let compareResults = [];

    switch (operation) {
      case 'difference':
        compareResults = difference(leftValues, rightValues);
        return rowsLeft.filter((row) => compareResults.includes(row[compareOn]));
      case 'intersection':
        compareResults = intersection(leftValues, rightValues);
        return rowsLeft.filter((row) => compareResults.includes(row[compareOn]));
      case 'union':
        compareResults = union(leftValues, rightValues);
        return [];
      case 'concat':
        return [...rowsLeft, ...rowsRight].map((item, index) => {
          item['___ID___'] = index;
          return item;
        });
      default:
        break;
    }
  }, [rowsLeft, rowsRight, compareOn, operation]);

  return (
    <>
      <Stack spacing={2} direction='row'>
        <Controller
          render={({ field }) => (
            <Select {...field} sx={{ minWidth: 250 }}>
              <MenuItem value='union'>Union</MenuItem>
              <MenuItem value='difference'>Difference</MenuItem>
              <MenuItem value='intersection'>Intersection</MenuItem>
              <MenuItem value='concat'>Concat</MenuItem>
            </Select>
          )}
          name='operation'
          control={control}
        />
        <Controller
          render={({ field }) => (
            <Select {...field} sx={{ minWidth: 250 }}>
              {columns.map((col) => (
                <MenuItem key={col} value={col}>
                  {col}
                </MenuItem>
              ))}
            </Select>
          )}
          name='compareOn'
          control={control}
        />
      </Stack>

      <Box height={600}>
        <DataGridPro
          columns={columns.map((item) => ({
            field: item,
            width: 120
          }))}
          rows={compareRows}
        />
      </Box>
    </>
  );
};

export default ImportCompareFiles;

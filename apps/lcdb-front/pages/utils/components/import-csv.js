import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CSVReader from './import-drop-zone';
import { isEmpty } from 'lodash';
import { DataGridPro } from '@mui/x-data-grid-pro';
import {
  Alert,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

export default function ImportCsv(props) {
  const {
    file = {},
    targetColumns,
    onUploadAccepted,
    onColumnMatchChange,
  } = props;

  /**
   * Form
   */

  const { control, handleSubmit, watch } = useForm({
    defaultValues: file.columnsMatch,
  });
  const onSubmit = (data) => console.log(data);

  React.useEffect(() => {
    const subscription = watch((value) => {
      onColumnMatchChange(value);
      setColumnsMatch((current) => ({ ...current, ...value }));
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  /**
   * Datas
   */
  const [columns, setColumns] = React.useState(file.columns || []);
  const [columnsMatch, setColumnsMatch] = React.useState(
    file.columnsMatch || {}
  );
  const [rows, setRows] = React.useState(file.rows || []);
  const [errors, setErrors] = React.useState(file.errors || []);
  const [meta, setMeta] = React.useState(file.meta || []);

  const handleUploadAccepted = React.useCallback(
    (results) => {
      const { data: _data, errors: _errors, meta: _meta } = results;

      setErrors(_errors);
      setMeta(_meta);

      if (isEmpty(_data)) {
        setRows([]);
        setColumns([]);
        return;
      }

      const _rows = _data.map((item, index) => {
        item['___ID___'] = index;
        return item;
      });
      const _columns = Object.keys(_rows[0]).map((item) => ({
        field: item,
        width: 150,
      }));

      setRows(_rows);
      setColumns(_columns);

      onUploadAccepted({
        rows: _rows,
        columns: _columns,
        errors: _errors,
        meta: _meta,
      });
    },
    [onUploadAccepted]
  );

  /**
   * Tabs
   */
  const [tabValue, setTabValue] = React.useState('1');
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const resultColumns = React.useMemo(() => {
    const cols = [
      {
        field: '___ID___',
        headerName: 'row',
        width: 120,
      },
    ];

    Object.values(targetColumns).forEach((col) => {
      if (!isEmpty(columnsMatch)) {
        cols.push({
          field: columnsMatch[col],
          headerName: col,
        });
      }
    });
    return cols;
  }, [columnsMatch, targetColumns]);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
            <Tab label="File" value="1" />
            <Tab label="Transform" value="2" />
            <Tab label="Résults" value="3" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <Box mb={3}>
            {rows.length > 0 && (
              <Alert>
                <Typography>{rows.length}</Typography>
                {meta.length > 0 && (
                  <Typography>{JSON.stringify(meta)}</Typography>
                )}
              </Alert>
            )}
            {errors && errors.length > 0 && (
              <Alert severity="error">{errors.length}</Alert>
            )}
          </Box>
          <CSVReader onUploadAccepted={handleUploadAccepted} />
        </TabPanel>

        <TabPanel value="2">
          <Stack spacing={1}>
            {Object.entries(targetColumns).map(([key, value]) => (
              <Stack key={key} direction="row" alignItems="center" spacing={1}>
                <Typography minWidth={150}>{value}</Typography>
                <Controller
                  render={({ field }) => (
                    <Select {...field} sx={{ minWidth: 250 }}>
                      {columns.map(({ field: col }) => (
                        <MenuItem key={col} value={col}>
                          {col}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  name={value}
                  control={control}
                />
              </Stack>
            ))}
            <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          </Stack>
        </TabPanel>

        <TabPanel value="3">
          <Box height={800}>
            <DataGridPro
              rows={rows}
              columns={resultColumns}
              getRowId={(row) => row['___ID___']}
            />
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

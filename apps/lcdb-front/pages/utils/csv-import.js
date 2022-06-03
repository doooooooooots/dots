import * as React from 'react';
import Box from '@mui/material/Box';
import CSVReader from './components/import-drop-zone';
import { isEmpty, uniqueId } from 'lodash';
import { Container } from '@mui/system';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, Tab } from '@mui/material';
import { unparse } from 'papaparse';
import createCSV from './utils/create-csv-file';
import { formatFromStockToList } from './utils/correspondances/from-stock-to-list';

const ID = '____ID____';

export default function ImportCSV() {
  const [value, setValue] = React.useState('1');
  const [selectionModel, setSelectionModel] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [file, setFile] = React.useState({
    rows: [],
    errors: [],
    meta: [],
    columns: [],
  });
  const { rows, errors, meta, columns } = file;

  const handleFileUploaded = (results) => {
    let _columns = [
      {
        field: ID,
        headerName: 'ID',
        hide: true,
      },
    ];

    if (results?.data) {
      _columns = Object.keys(results?.data[0]).map((field) => ({
        field: field,
        headerName: field,
      }));
    }

    setFile({
      rows: results.data.map((item) => ({
        ...item,
        [ID]: uniqueId(),
      })),
      columns: _columns,
    });
  };

  if (!isEmpty(errors))
    return (
      <pre>
        <code>{JSON.stringify(errors, null, 2)}</code>
      </pre>
    );

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        typography: 'body1',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="File" value="1" />
            <Tab label="Result" value="2" />
            <Tab label="Export" value="3" />
          </TabList>
        </Box>

        {/*//* FILE UPLOAD */}
        <TabPanel value="1">
          <Container maxWidth="lg">
            <CSVReader onUploadAccepted={handleFileUploaded} />
          </Container>
        </TabPanel>
        {/*//* RESULTS */}
        <TabPanel
          value="2"
          sx={{
            '&:not([hidden])': { display: 'flex' },
            height: '100%',
            width: '100%',
          }}
        >
          <Box flexGrow={1}>
            <DataGridPro
              rows={rows}
              columns={columns}
              getRowId={(row) => row[ID]}
              components={{ Toolbar: GridToolbar }}
              onSelectionModelChange={setSelectionModel}
              selectionModel={selectionModel}
              checkboxSelection
            />
          </Box>
        </TabPanel>

        <TabPanel value="3">
          <Box>
            {/* <code>
              <pre>
                {JSON.stringify(
                  columns.map((item) => item.field),
                  null,
                  2
                )}
              </pre>
            </code> */}
          </Box>
          <Box>
            <Button
              variant="outlined"
              onClick={() =>
                createCSV(
                  unparse(
                    formatFromStockToList(
                      rows.filter((row) => selectionModel.includes(row[ID]))
                    )
                  ),
                  'export.csv'
                )
              }
            >
              Export to list
            </Button>
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

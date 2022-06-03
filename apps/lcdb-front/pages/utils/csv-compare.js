import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ImportCsv from './components/import-csv';
import { isEmpty, uniqueId } from 'lodash';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import ImportCompareFiles from './components/import-compare-files';

const formatFile = (file = {}) => {
  const { columnsMatch } = file;

  if (isEmpty(file)) return [];
  if (isEmpty(columnsMatch)) return [];

  const compareColumns = Object.keys(columnsMatch);

  return file.rows.map((row) => {
    const _row = {};
    compareColumns.forEach((col) => {
      _row[col] = row[columnsMatch[col]];
    });
    return _row;
  });
};

export default function LabTabs() {
  const { register, getValues, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  const [tab, setTab] = React.useState('0');
  const handleChangeTab = (_, newValue) => {
    setTab(newValue);
  };

  const [file1, setFile1] = React.useState({});
  const [file2, setFile2] = React.useState({});
  const handleFileUploaded1 = (results) => {
    setFile1(results);
  };
  const handleFileUploaded2 = (results) => {
    setFile2(results);
  };

  const handleColumnsMatchChange1 = React.useCallback((cols) => {
    setFile1((current) => ({
      ...current,
      columnsMatch: { ...current.columnsMatch, ...cols },
    }));
  }, []);
  const handleColumnsMatchChange2 = React.useCallback((cols) => {
    setFile2((current) => ({
      ...current,
      columnsMatch: { ...current.columnsMatch, ...cols },
    }));
  }, []);

  const formattedFile1 = React.useMemo(() => formatFile(file1), [file1]);
  const formattedFile2 = React.useMemo(() => formatFile(file2), [file2]);

  const [inputIds, setInputIds] = React.useState([]);
  const addNewId = () => setInputIds((current) => [...current, uniqueId()]);

  const columns = React.useMemo(() => {
    if (isEmpty(formattedFile1)) return [];
    return Object.keys(formattedFile1[0]);
  }, [formattedFile1]);

  React.useEffect(() => {
    addNewId();
  }, []);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
            <Tab label="Format" value="0" />
            <Tab label="File 1" value="1" />
            <Tab label="File 2" value="2" />
            <Tab label="Operations" value="3" />
          </TabList>
        </Box>

        <TabPanel value="0">
          <Stack spacing={1}>
            {inputIds.map((id, index) => (
              <Stack key={id} direction="row" alignItems="center">
                <Typography width={90}>{`colonne ${index + 1} `}</Typography>
                <TextField {...register(id)} />
              </Stack>
            ))}
            <Box>
              <Button onClick={addNewId}>Add input</Button>
              <Button onClick={handleSubmit(onSubmit)}>Check</Button>
            </Box>
          </Stack>
        </TabPanel>

        <TabPanel value="1">
          <ImportCsv
            file={file1}
            targetColumns={getValues()}
            onUploadAccepted={handleFileUploaded1}
            onColumnMatchChange={handleColumnsMatchChange1}
          />
        </TabPanel>

        <TabPanel value="2">
          <ImportCsv
            file={file2}
            targetColumns={getValues()}
            onUploadAccepted={handleFileUploaded2}
            onColumnMatchChange={handleColumnsMatchChange2}
          />
        </TabPanel>

        <TabPanel value="3">
          <ImportCompareFiles
            columns={columns}
            rowsLeft={formattedFile1}
            rowsRight={formattedFile2}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

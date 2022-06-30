import { Box } from '@mui/system';
import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { useCSVReader, formatFileSize } from 'react-papaparse';
import { Avatar, Button, Stack, Typography } from '@mui/material';

export default function CSVReader(props) {
  const { onUploadAccepted, delimiter = '' } = props;
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader
      onUploadAccepted={onUploadAccepted}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDragLeave={(event) => {
        event.preventDefault();
      }}
      config={{
        delimiter,
        newline: '',
        quoteChar: '"',
        escapeChar: '"',
        header: true,
        transformHeader: undefined,
        dynamicTyping: false,
        preview: 0,
        encoding: 'UTF-8',
        worker: false,
        comments: false,
        step: undefined,
        complete: undefined,
        error: undefined,
        download: false,
        downloadRequestHeaders: undefined,
        skipEmptyLines: true,
        chunk: undefined,
        fastMode: undefined,
        beforeFirstChunk: undefined,
        withCredentials: undefined,
        transform: undefined,
      }}
    >
      {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
        <>
          <Stack
            {...getRootProps()}
            direction={acceptedFile ? 'row' : 'column'}
            alignItems="center"
            justifyContent="center"
            spacing={3}
            sx={[
              {
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: '#CCC',
                borderRadius: 2,
                display: 'flex',
                height: 300,
                justifyContent: 'center',
                padding: 2,
                transition: 'height 0.5s',
                transitionTimingFunction: 'ease-in-out',
                textAlign: 'center',
                mb: 2,
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'neutral.600',
                },
              },
              acceptedFile?.name && {
                height: 90,
                textAlign: 'left',
                justifyContent: 'space-between',
                transitionTimingFunction: 'ease-in-out',
                padding: 3,
              },
            ]}
          >
            <Stack
              spacing={acceptedFile?.name ? 2 : 1}
              direction={acceptedFile?.name ? 'row' : 'column'}
              sx={[
                acceptedFile?.name && {
                  alignItems: 'center',
                },
              ]}
            >
              <Box component="span">
                <CloudUploadOutlinedIcon fontSize="large" />
              </Box>
              <Box>
                <Typography variant="h6" sx={{}}>
                  Select file to upload
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Drop CSV file here or click to upload
                </Typography>
              </Box>
            </Stack>
            <Button variant="outlined">Select file</Button>
          </Stack>

          {/* FILE */}
          {acceptedFile && (
            <Box
              sx={{
                borderRadius: 2,
                bgcolor: 'background.paper',
                overflow: 'hidden',
                boxShadow: 8,
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{
                  p: 3,
                }}
              >
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <InsertDriveFileOutlinedIcon color="#fff" />
                </Avatar>
                <Box flex={1}>
                  <Typography variant="h6">
                    {acceptedFile?.name || 'hello-la-vie.csv'}
                  </Typography>
                  <Typography variant="body2">
                    {formatFileSize(acceptedFile?.size) || '50'}
                  </Typography>
                </Box>
                <Box
                  {...getRemoveFileProps()}
                  sx={{
                    height: 23,
                    right: 6,
                    top: 6,
                    width: 23,
                    cursor: 'pointer',
                    '& .MuiSvgIcon-root:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  <CancelIcon />
                </Box>
              </Stack>
              <Box sx={{ height: 5 }}>
                <ProgressBar />
              </Box>
            </Box>
          )}
        </>
      )}
    </CSVReader>
  );
}

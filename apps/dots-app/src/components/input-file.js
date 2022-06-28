import React, { useCallback, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import {
  Close,
  CloudUploadOutlined,
  InsertDriveFileOutlined,
} from '@mui/icons-material';
import Dropzone from 'react-dropzone';
import { isEmpty } from 'lodash';
import { formatSizeFile } from '@dots.cool/utils';

function removeIndex(array, index) {
  array.splice(index, 1);
  return array;
}

// [ ](Adrien): Link to mutation
function InputFile(props) {
  const { value, onChange, onSubmit, onCancel } = props;
  const [input, setInput] = useState([]);

  const handleChange = useCallback((newFiles) => {
    setInput((current) => [...current, ...newFiles]);
  }, []);

  /**
   * User clicks on a reset button
   */
  const handleDeleteClick = useCallback(
    (index) => () => {
      setInput((current) => removeIndex([...current], index));
    },
    []
  );

  /**
   * Suscribe to each changes
   */
  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(input);
    }
  }, [input, onChange]);

  return (
    <Stack direction="column" p={2} spacing={3}>
      <Dropzone onDrop={handleChange}>
        {(returnProps) => {
          console.log(returnProps);
          const { getRootProps, isDragActive, acceptedFiles } = returnProps;
          const hasFiles = !isEmpty(input);

          return (
            <>
              <Stack
                {...getRootProps()}
                direction={hasFiles ? 'row' : 'column'}
                alignItems="center"
                justifyContent="center"
                spacing={3}
                sx={[
                  {
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: 'neutral.300',
                    borderRadius: 2,
                    display: 'flex',
                    height: 300,
                    minWidth: 450,
                    justifyContent: 'center',
                    padding: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: 'neutral.800',
                    },
                  },
                  isDragActive && {
                    borderColor: 'primary.main',
                  },
                  hasFiles && {
                    height: 90,
                    textAlign: 'left',
                    justifyContent: 'space-between',
                    padding: 3,
                  },
                ]}
              >
                <Stack
                  spacing={hasFiles ? 2 : 1}
                  direction={hasFiles ? 'row' : 'column'}
                  sx={[
                    hasFiles && {
                      alignItems: 'center',
                    },
                  ]}
                >
                  <Box component="span">
                    <CloudUploadOutlined fontSize="large" />
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

                <Button variant="outlined" type="file">
                  Select file
                </Button>
              </Stack>

              {/* FILE */}
              {hasFiles && (
                <Stack>
                  <Typography
                    variant="caption"
                    sx={{ textTransform: 'uppercase' }}
                  >
                    Acceptés
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Stack
                    spacing={1}
                    sx={{
                      '& > div:not(:last-child)': {
                        borderBottom: 1,
                        borderColor: 'divider',
                      },
                    }}
                  >
                    {input.map((file, index) => (
                      <Stack
                        key={file.name}
                        direction="row"
                        alignItems="center"
                        position="relative"
                        py={1}
                        pr={6}
                        spacing={2}
                      >
                        <Avatar
                          sx={{
                            bgcolor: 'primary.main',
                            width: 24,
                            height: 24,
                          }}
                        >
                          <InsertDriveFileOutlined
                            fontSize="inherit"
                            color="#fff"
                          />
                        </Avatar>

                        <Typography
                          variant="body2"
                          sx={{
                            width: 180,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            fontWeight: 'bold',
                          }}
                        >
                          {file.name || 'hello-la-vie.csv'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatSizeFile(file.size)}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={handleDeleteClick(index)}
                          sx={{
                            position: 'absolute',
                            right: 4,
                            cursor: 'pointer',
                            border: 1,
                            borderColor: 'divider',
                            '& .MuiSvgIcon-root:hover': {
                              color: 'primary.main',
                            },
                          }}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              )}
            </>
          );
        }}
      </Dropzone>
    </Stack>
  );
}

export default InputFile;

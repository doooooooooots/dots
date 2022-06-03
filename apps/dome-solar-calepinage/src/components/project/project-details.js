import React, { useCallback } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RoofingIcon from '@mui/icons-material/RoofingOutlined';
import { isEmpty } from 'lodash';
import { DataGridPro } from '@mui/x-data-grid-pro';
import Tag from '../tag';
import { useRouter } from 'next/router';

function ProjectDetails({ project }) {
  const router = useRouter();

  const handleClickButton = useCallback(() => {
    router.push('/layout/create');
  }, [router]);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          width: '100%',
          '&:hover': {
            bgcolor: 'grey.100',
            cursor: 'pointer',
            '& .styled-link': {
              visibility: 'visible',
            },
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack spacing={1}>
            <Typography variant="h6">{project.name}</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Tag type="ref">{project.identifier}</Tag>
              <Tag type="step">{project.step}</Tag>
              {project.typeEmergency && <Tag type="emergency" />}
            </Stack>
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ bgcolor: 'grey.100', p: 2 }}>
        {!isEmpty(project.roofs) ? (
          <Stack
            spacing={3}
            sx={{
              bgcolor: 'background.default',
              p: 2,
              borderRadius: 1,
            }}
          >
            {project.roofs.map((roof) => (
              <Stack key={roof.id}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Stack direction="row" spacing={1}>
                    <RoofingIcon />
                    <Typography>{`${roof.name}`}</Typography>
                  </Stack>
                  <Box>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={handleClickButton}
                    >
                      Créer un calepinage
                    </Button>
                  </Box>
                </Stack>
                <Divider />
                {!isEmpty(roof.layouts) ? (
                  <Box height={250} width="100%">
                    <DataGridPro
                      rows={roof.layouts}
                      columns={[{ field: 'id' }, { field: 'name' }]}
                      componentsProps={{
                        columnMenu: {
                          background: 'red',
                        },
                      }}
                    />
                  </Box>
                ) : (
                  <Alert severity="info">
                    <Stack spacing={1}>
                      <Typography variant="body2">
                        Il n&apos;y a pas encore de calepinage associée au
                        projet
                      </Typography>
                    </Stack>
                  </Alert>
                )}
              </Stack>
            ))}
          </Stack>
        ) : (
          <Stack
            sx={{
              bgcolor: 'background.default',
              p: 2,
              borderRadius: 1,
            }}
          >
            <Alert severity="info">
              <Stack spacing={1}>
                <Typography variant="body2">
                  Il n&apos;y a pas encore de toiture associée au projet
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" size="small">
                    Créer une toiture
                  </Button>
                  <Button variant="contained" size="small">
                    Créer un calepinage
                  </Button>
                </Stack>
              </Stack>
            </Alert>
          </Stack>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

export default ProjectDetails;

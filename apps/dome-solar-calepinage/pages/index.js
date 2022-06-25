import * as React from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { gql, useQuery } from '@apollo/client';
import { isEmpty } from 'lodash';
import { AuthGuard } from '../src/components/authentication/auth-guard';
import ProjectFormCreate from '../src/components/layout-create/forms/project-create';
import ProjectDetails from '../src/components/project/project-details';
import NoProject from './project/no-project';
import InputNumber from '../src/components/design-system/popper-inputs/popper-input-number';
import SelectTags from '../src/components/molecule/tag/select-tag-multiple';

import SelectTag from '../src/components/molecule/tag/select-tag-single';
import InputWithPopper from '../src/components/design-system/popper-inputs/popper-input-text';
import SelectPerson from '../src/components/_trash/person/select-person';
import CustomizedHook from '../src/components/design-system/select-with-autocomplete/select-custom';

const GET_LAST_PROJECTS = gql`
  query GetLastProjects(
    $where: ProjectWhereInput!
    $orderBy: [ProjectOrderByInput!]!
    $skip: Int! = 0
    $take: Int
  ) {
    projects(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {
      id
      name
      identifier
      step
      typeEmergency
      roofs {
        id
        name
        layouts {
          id
          name
        }
      }
    }
  }
`;

export default function Home() {
  const [open, setOpen] = React.useState(false);

  const [params, setParams] = React.useState({
    where: {},
    orderBy: [],
    take: 15,
    skip: 0,
  });

  const {
    data = {},
    loading,
    error,
    refetch,
  } = useQuery(GET_LAST_PROJECTS, {
    variables: {
      where: params.where,
      orderBy: params.orderBy,
      take: params.take,
      skip: params.skip,
    },
  });

  const handleChange = React.useCallback(
    (param) => (event) => {
      setParams((current) => ({
        ...current,
        where: { ...current.where, [param]: { in: [`${event.target.value}`] } },
      }));
    },
    []
  );

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  React.useEffect(() => {
    refetch({
      where: params.where,
      orderBy: params.orderBy,
      take: params.take,
      skip: params.skip,
    });
  }, [params, refetch]);

  return (
    <>
      <Stack as={Container} spacing={1}>
        {/*//* TopBar */}
        <Stack
          direction="row"
          spacing={2}
          py={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4" sx={{ minWidth: 200 }}>
            Dome solar
          </Typography>
          <Box>
            <Button onClick={handleOpen} variant="contained" size="small">
              Creér un projet
            </Button>
          </Box>
        </Stack>
        <Divider />
        {/*//* Filters */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ flex: 1 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Status"
              onChange={handleChange('status')}
            >
              <MenuItem value={'status_draft'}>Draft</MenuItem>
              <MenuItem value={'status_available'}>Available</MenuItem>
              <MenuItem value={'status_archived'}>Archived</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="demo-simple-select-label">Attribué à</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Attribué à"
              onChange={handleChange('hasTechnician')}
            >
              <MenuItem value={10}>Malo</MenuItem>
              <MenuItem value={20}>Yannis</MenuItem>
              <MenuItem value={30}>Paul</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="demo-simple-select-label">Etape</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Etape"
              onChange={handleChange('step')}
            >
              <MenuItem value={10}>Pre-étude à faire</MenuItem>
              <MenuItem value={20}>Pré-étude envoyée</MenuItem>
              <MenuItem value={20}>Pré-étude valiée</MenuItem>
              <MenuItem value={30}>CF à faire</MenuItem>
              <MenuItem value={30}>CF envoyé</MenuItem>
              <MenuItem value={30}>CF validé</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Divider />
        {/*//* Résults */}
        <Stack direction="row" spacing={1}>
          <SelectTag />
          <SelectTags />
          <SelectPerson />
          {/* <CustomizedHook /> */}
          <InputNumber />
          <InputWithPopper />
          {/*
          <AutocompletePeople label="People" multiple />
          <SelectProgress />
          <SelectProgressSave />
          <SelectEmergency severity={3} />
          <SelectPerson label="People" multiple />
          <SelectTag />
          <SelectStep />
          <SelectReaction variant="+1" />
          <SelectStatus />
          <SelectCalendar dateAsDistance />
          <SelectNumber />

          <GitHubLabel />

          <ButtonStar isActive />
          <ButtonFavorite isActive />
          <ButtonTask variant="outlined" />
          <ButtonError />
          <ButtonComment />
          <ButtonAction />
          <ButtonAnalytic />
          <ButtonIdea />
          <ButtonNotification />
          <ButtonFile />
          <ButtonPin />
          <ButtonHistory />
          <ButtonExpense />
          <ButtonBug />
        */}
        </Stack>
        {/* <Stack my={2}>
          {error && (
            <Alert severity="error">Erreur pendant le chargement</Alert>
          )}
          {loading && <div>Loading...</div>}
          {!error && !loading && !isEmpty(data.projects) && (
            <>
              {data.projects.map((project) => (
                <ProjectDetails key={project.id} project={project} />
              ))}
            </>
          )}
          {!error && !loading && isEmpty(data.projects) && <NoProject />}
        </Stack> */}
      </Stack>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
        <DialogTitle>Créer un projet</DialogTitle>
        <Divider />
        <DialogContent sx={{ bgcolor: 'grey.100' }}>
          <ProjectFormCreate />
        </DialogContent>
      </Dialog>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <AuthGuard>{page}</AuthGuard>;
};

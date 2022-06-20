import React, { useCallback, useState } from 'react';
import { Container } from '@mui/system';
import Field from '../src/components/dots-system/components/field';
import FieldContainer from '../src/components/dots-system/components/container';
import {
  Alert,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { gql, useMutation, useQuery } from '@apollo/client';
import toast from 'react-hot-toast';
import { useDots } from '../src/components/dots-system/context/dots-context';
import ShareIcon from '@mui/icons-material/Share';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ButtonEnum from '../src/components/dots-system/components/button-enum';
import ButtonLink from '../src/components/dots-system/components/button-link';
import ButtonAutomation from '../src/components/dots-system/components/button-automation';

const GET_LAST_PROJECT = gql`
  query GetLastProject($take: Int, $skip: Int = 0) {
    projects(take: $take, skip: $skip) {
      id
      name
      identifier
      step
      dateReception
      dateDelivery
      typeEmergency
      altitude
      areaField
      areaWind
      areaSea
      areaSnow
      hasCommercial {
        id
        givenName
        familyName
      }
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation updateProject(
    $where: ProjectWhereUniqueInput!
    $data: ProjectUpdateInput!
  ) {
    updateProject(where: $where, data: $data) {
      id
      name
      identifier
      step
      dateReception
      dateDelivery
      status
      typeEmergency
      altitude
      areaField
      areaWind
      areaSea
      areaSnow
      hasCommercial {
        id
        givenName
        familyName
      }
    }
  }
`;

function Test() {
  const { Project } = useDots();
  const { fields } = Project;

  const [loadingSave, setLoadingSave] = useState(false);

  /**
   * Get element infos
   */
  const { data, loading, error } = useQuery(GET_LAST_PROJECT, {
    variables: { take: 1 },
  });

  /**
   * Send updates to db
   */
  const [update] = useMutation(UPDATE_PROJECT);
  const handleChangeConfirm = useCallback(
    async (key, newValue) => {
      if (data?.projects[0]?.id) {
        setLoadingSave(key);
        toast.promise(
          update({
            variables: {
              where: { id: data?.projects[0]?.id },
              data: { [key]: newValue },
            },
          }).then(() => setLoadingSave(false)),
          {
            loading: 'Sauvegarde ...',
            success: 'Le projet a été mis à jour',
            error: 'Erreur lors de la mise à jour',
          }
        );
      }
    },
    [data?.projects, update]
  );

  /**
   *! TMP -- Send updates to db
   */
  const handleChange = async (data) => console.log(data);

  return (
    <Container sx={{ pt: 6 }}>
      {loading && 'Loading...'}
      {error && (
        <Alert severity="error">
          <pre>
            <code>{JSON.stringify(error, null, 2)}</code>
          </pre>
        </Alert>
      )}
      {data?.projects && (
        <FieldContainer>
          <Stack
            direction="row"
            py={1}
            justifyContent="space-between"
            spacing={1}
            pb={4}
          >
            <Typography variant="h5">{data.projects[0].name}</Typography>
            <Stack direction="row" spacing={1} maxHeight={35}>
              <Button
                startIcon={<ShareIcon />}
                variant="outlined"
                size="small"
                color="neutral"
              >
                Share
              </Button>
              <Button
                startIcon={<InfoIcon />}
                variant="outlined"
                size="small"
                color="neutral"
              >
                Info
              </Button>
              <IconButton
                size="small"
                color="neutral"
                sx={{ border: 1, borderColor: 'neutral.200' }}
              >
                <MoreHorizIcon />
              </IconButton>
            </Stack>
          </Stack>

          {fields.map(({ name, type, label, options, multiple }) => {
            const fieldProps = {
              type: type,
              name: name,
              label: label,
            };

            if (type === 'select' || type === 'relationship') {
              fieldProps.options = options;
              fieldProps.multiple = multiple;
            }

            return (
              <Field
                key={name}
                value={data.projects[0][name]}
                loading={loadingSave === name}
                onChange={handleChangeConfirm}
                {...fieldProps}
              />
            );
          })}
        </FieldContainer>
      )}
      {/* <Divider sx={{ my: 5 }} /> */}
      {/* <Stack direction="row" spacing={1}>
        <ButtonEnum />
        <ButtonLink />
        <ButtonAutomation />
      </Stack>
      <FieldContainer>
        <Field
          type="number"
          value={3}
          label="Number value"
          onChange={handleChange}
        />
        <Field
          type="link"
          value={{ __typename: 'Person', id: 'cl48da1cf0586uw13ruqfjox7' }}
          label="Link value"
          entity="Person"
          onChange={handleChange}
        />
        <Field
          type="reaction"
          options="reaction"
          value={100}
          label="Progress"
          onChange={handleChange}
        />
        <Field
          type="checkbox"
          value="TODO"
          label="Dimension value"
          onChange={handleChange}
        />
        <Field
          type="tag"
          value="TODO"
          label="Tag value"
          onChange={handleChange}
        />
      </FieldContainer> */}
    </Container>
  );
}

export default Test;

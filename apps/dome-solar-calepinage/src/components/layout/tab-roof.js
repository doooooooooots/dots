import { gql, useQuery } from '@apollo/client';
import { useStore } from '../context/useStore';
import { isEmpty } from 'lodash';
import {
  Box,
  Alert,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Divider,
  Button,
} from '@mui/material';
import { observer } from 'mobx-react';
import PopperList from '../popper-list';
import RoofingIcon from '@mui/icons-material/Roofing';
import { useCallback } from 'react';
import FielGroup from '../field-group';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';

const GET_ROOF = gql`
  query GetRoofs($id: ID!) {
    roofs(where: { project: { id: { equals: $id } } }) {
      id
      name
      roofTypology
      lengthX
      lengthY
      purlinType
      purlinBetweenAxis
      purlinThickness
      incline
      ridgeHeight
    }
  }
`;

const TabRoof = (props) => {
  const { onClose } = props;
  const { getRelatedData, setRelatedData } = useStore();
  const project = getRelatedData('project');

  const roof = getRelatedData('roof');

  const { data, loading, error } = useQuery(GET_ROOF, {
    variables: { id: project?.id },
    skip: !project?.id,
  });

  const handleRemoveClick = useCallback(() => {
    setRelatedData('roof', {});
  }, [setRelatedData]);

  const handleChoiceClick = useCallback(
    (element) => () => {
      setRelatedData('roof', element);
    },
    [setRelatedData]
  );

  return (
    <Stack spacing={1} sx={{ p: 2, minWidth: 385 }}>
      {isEmpty(project) && (
        <Box py={3}>
          <Alert severity="error">
            Vous devez d&apos;abord choisir un projet avant de pouvoir
            séléctionner ou créer une toiture
          </Alert>
        </Box>
      )}
      {!isEmpty(project) && isEmpty(roof) && (
        <PopperList>
          {data &&
            data.roofs.map((roof) => (
              <ListItemButton
                key={'__create_new__'}
                sx={{ py: 0, minHeight: 32 }}
                onClick={handleChoiceClick(roof)}
              >
                <ListItemIcon>
                  <RoofingIcon />
                </ListItemIcon>
                <ListItemText
                  primary={roof.name}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: 'medium',
                  }}
                />
              </ListItemButton>
            ))}
        </PopperList>
      )}
      {!isEmpty(project) && !isEmpty(roof) && (
        <Stack direction="column" mt={2}>
          <FielGroup icon={<RoofingIcon />} label={'name'} value={roof.name} />
          <FielGroup
            icon={<RoofingIcon />}
            label={'roofTypology'}
            value={roof.roofTypology}
          />
          <FielGroup
            icon={<RoofingIcon />}
            label={'lengthX'}
            value={roof.lengthX}
          />
          <FielGroup
            icon={<RoofingIcon />}
            label={'lengthY'}
            value={roof.lengthY}
          />
          <FielGroup
            icon={<RoofingIcon />}
            label={'purlinType'}
            value={roof.purlinType}
          />
          <FielGroup
            icon={<RoofingIcon />}
            label={'purlinBetweenAxis'}
            value={roof.purlinBetweenAxis}
          />
          <FielGroup
            icon={<RoofingIcon />}
            label={'purlinThickness'}
            value={roof.purlinThickness}
          />
          <FielGroup
            icon={<RoofingIcon />}
            label={'incline'}
            value={roof.incline}
          />
          <FielGroup
            icon={<RoofingIcon />}
            label={'ridgeHeight'}
            value={roof.ridgeHeight}
          />
        </Stack>
      )}
      {!isEmpty(roof) && (
        <>
          <Divider />
          <Box>
            <Button
              onClick={handleRemoveClick}
              startIcon={<CompareArrowsOutlinedIcon fontSize="small" />}
              sx={{
                color: 'grey.500',
                borderColor: 'grey.500',
                p: 0,
                px: 1,
              }}
            >
              Changer de projet
            </Button>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default observer(TabRoof);

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
} from '@mui/material';
import { observer } from 'mobx-react';
import PopperList from '../popper-list';
import RoofingIcon from '@mui/icons-material/Roofing';
import FielGroup from '../field-group';
import { useCallback } from 'react';
import TabPopperChangeButton from './tab-popper-change-button';

const GET_ROOF = gql`
  query GetRoofs($id: ID!) {
    rows: roofs(where: { project: { id: { equals: $id } } }) {
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
  const { onChange } = props;
  const { getRelatedData, setUserData, setObstacles } = useStore();

  const handleChoiceClick = useCallback(
    (element) => () => {
      setUserData('Tx', element.lengthX);
      setUserData('Ty', element.lengthY);
      try {
        setObstacles(JSON.parse(element.obstacles || '[]'));
      } catch (err) {
        console.log('JSON error');
      }
      onChange(element);
    },
    [onChange, setObstacles, setUserData]
  );

  const project = getRelatedData('project');
  const roof = getRelatedData('roof');

  //* REQUEST - Get projet related roofs
  const { data, loading, error } = useQuery(GET_ROOF, {
    variables: { id: project?.id },
    skip: !project?.id,
  });

  if (loading) return 'loading';

  return (
    <>
      {/* WARNING */}
      {isEmpty(project) && (
        <Box py={4}>
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

      {/* Choice details */}
      {!isEmpty(project) && !isEmpty(roof) && (
        <>
          <Stack sx={{ p: 2, minWidth: 385 }}>
            <FielGroup
              icon={<RoofingIcon />}
              label={'name'}
              value={roof.name}
            />
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
          <TabPopperChangeButton name="roof" />
        </>
      )}
    </>
  );
};

export default observer(TabRoof);

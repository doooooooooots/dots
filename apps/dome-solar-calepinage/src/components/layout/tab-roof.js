import { gql, useMutation, useQuery } from '@apollo/client';
import { useStore } from '../context/useStore';
import { isEmpty } from 'lodash';
import {
  Box,
  Alert,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  CircularProgress,
  Stack,
} from '@mui/material';
import { observer } from 'mobx-react';
import PopperList from '../popper-list';
import RoofingIcon from '@mui/icons-material/Roofing';
import FielGroup from '../field-group';
import { useCallback } from 'react';
import TabPopperChangeButton from './tab-popper-change-button';
import toast from 'react-hot-toast';
import FieldGroupContainer from './field-group-container';
import AddIcon from '@mui/icons-material/Add';

const GET_ROOF = gql`
  query GetRoofs($id: ID!) {
    roofs(where: { project: { id: { equals: $id } } }) {
      id
      name
      typology
      lengthX
      lengthY
      purlinType
      purlinBetweenAxis
      purlinThickness
      incline
      ridgeHeight
      obstacles
      cladding {
        id
        name
        numberOfWaves
        lengthX
        lengthY
        lengthZ
        thickness
      }
    }
  }
`;

const UPDATE_ROOF = gql`
  mutation UpdateRoof($where: RoofWhereUniqueInput!, $data: RoofUpdateInput!) {
    updateRoof(where: $where, data: $data) {
      id
    }
  }
`;

const TabRoof = (props) => {
  const { onChange } = props;
  const {
    getRelatedData,
    setRelatedData,
    setUserData,
    setObstacles,
    updateRelatedData,
    reloadSize,
    onOpenToClick,
  } = useStore();

  const [update] = useMutation(UPDATE_ROOF);
  const project = getRelatedData('project');
  const roof = getRelatedData('roof');

  const handleChangeConfirm = useCallback(
    (key) => async (newValue) => {
      if (roof?.id) {
        updateRelatedData(`roof.${key}`, newValue);
        toast.promise(
          update({
            variables: {
              where: { id: roof?.id },
              data: { [key]: newValue },
            },
          }),
          {
            loading: 'Sauvegarde ...',
            success: 'La toiture a été mise à jour',
            error: 'Erreur lors de la mise à jour',
          }
        );
        if (key === 'lengthX') setUserData('Tx', newValue);
        if (key === 'lengthY') setUserData('Ty', newValue);
        if (['lengthX', 'lengthY'].includes(key)) {
          reloadSize();
        }
      }
    },
    [roof?.id, setUserData, update, updateRelatedData, reloadSize]
  );

  const handleChoiceClick = useCallback(
    (element) => () => {
      setUserData('Tx', element.lengthX);
      setUserData('Ty', element.lengthY);
      setUserData('Cx', element.cladding?.lengthY);
      setUserData('Cy', element.cladding?.lengthY);
      setUserData('CnbOfWaves', element.cladding?.lengthY);
      setRelatedData('cladding', element.cladding || null);
      setObstacles(element.obstacles || []);
      onChange(element);
    },
    [onChange, setObstacles, setRelatedData, setUserData]
  );

  //* REQUEST - Get projet related roofs
  const { data, loading, error } = useQuery(GET_ROOF, {
    variables: { id: project?.id },
    skip: !project?.id,
  });

  if (loading)
    return (
      <Stack height={120} alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    );

  return (
    <>
      {/* WARNING */}
      {isEmpty(project) && (
        <Box px={1} py={3}>
          <Alert severity="error">
            Vous devez d&apos;abord choisir un projet avant de pouvoir
            séléctionner ou créer une toiture
          </Alert>
        </Box>
      )}

      {!isEmpty(project) && isEmpty(roof) && (
        <>
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
          <Divider />
          <Button
            onClick={onOpenToClick('roof')}
            startIcon={<AddIcon fontSize="small" />}
            fullWidth
            sx={{
              color: 'grey.500',
              borderColor: 'grey.500',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'background.default',
              },
            }}
          >
            {`Ajouter un nouveau`}
          </Button>
        </>
      )}

      {/* Choice details */}
      {!isEmpty(project) && !isEmpty(roof) && (
        <>
          <FieldGroupContainer>
            <FielGroup
              label={'Name'}
              value={roof.name}
              onConfirm={handleChangeConfirm('name')}
            />
            <FielGroup
              label={'Typology'}
              type="list"
              value={roof.roofTypology}
              onConfirm={handleChangeConfirm('typology')}
            />
            <FielGroup
              label={'Hauteur'}
              type="dimension"
              value={roof.lengthX}
              onConfirm={handleChangeConfirm('lengthX')}
            />
            <FielGroup
              label={'Largeur'}
              type="dimension"
              value={roof.lengthY}
              onConfirm={handleChangeConfirm('lengthY')}
            />
            <FielGroup
              label={'Type de panne'}
              type="list"
              value={roof.purlinType}
              onConfirm={handleChangeConfirm('purlinType')}
            />
            <FielGroup
              label={'Entre axes'}
              type="dimension"
              value={roof.purlinBetweenAxis}
              onConfirm={handleChangeConfirm('purlinBetweenAxis')}
            />
            <FielGroup
              label={'Epaisseur des pannes'}
              type="dimension"
              value={roof.purlinThickness}
              onConfirm={handleChangeConfirm('purlinThickness')}
            />
            <FielGroup
              label={'Pente'}
              type="dimension"
              value={roof.incline}
              onConfirm={handleChangeConfirm('incline')}
            />
            <FielGroup
              label={'Hauteur de crête'}
              type="dimension"
              value={roof.ridgeHeight}
              onConfirm={handleChangeConfirm('ridgeHeight')}
            />
            <FielGroup
              label={'Bac acier'}
              icon={<RoofingIcon />}
              value={roof?.cladding?.name}
              onConfirm={handleChangeConfirm('Cladding')}
            />
          </FieldGroupContainer>
          <TabPopperChangeButton name="roof" />
        </>
      )}
    </>
  );
};

export default observer(TabRoof);

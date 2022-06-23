import { gql, useMutation, useQuery } from '@apollo/client';
import { useStore } from '../../contexts/useStore';
import { isEmpty } from 'lodash';
import {
  Box,
  Alert,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Stack,
  CircularProgress,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react';
import PopperList from '../popper-list';
import RoofingIcon from '@mui/icons-material/Roofing';
import FielInput from '../dots-system/components/field-input';
import { useCallback, useState } from 'react';
import TabPopperChangeButton from './tab-popper-change-button';
import toast from 'react-hot-toast';
import FieldGroupContainer from '../dots-system/components/container';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FieldSelect from '../_trash/field-select';

const GET_LAYOUTS = gql`
  query GetLayouts($id: ID!) {
    layouts(where: { roof: { id: { equals: $id } } }) {
      id
      name
      solarModule {
        id
        name
        lengthX
        lengthY
        electricalPower
        frameType
      }
      product {
        id
        name
        lengthX
        lengthY
        lengthZ
      }
      pdf {
        id
        name
        url
      }
    }
  }
`;

const UPDATE_LAYOUT = gql`
  mutation UpdateLayout(
    $where: LayoutWhereUniqueInput!
    $data: LayoutUpdateInput!
  ) {
    updateLayout(where: $where, data: $data) {
      id
    }
  }
`;

const GET_PEOPLE = gql`
  query GetPeople(
    $where: PersonWhereInput! = {}
    $orderBy: [PersonOrderByInput!]! = []
    $take: Int
    $skip: Int! = 0
  ) {
    options: people(
      where: $where
      take: $take
      skip: $skip
      orderBy: $orderBy
    ) {
      id
      givenName
      familyName
    }
  }
`;

const TabLayout = (props) => {
  const { onChange } = props;

  //* Store
  const { getRelatedData, setRelatedData, onOpenToClick, updateRelatedData } =
    useStore();
  const roof = getRelatedData('roof');
  const layout = getRelatedData('layout');

  //* Popper
  const [anchorEl, setAnchorEl] = useState(null);
  const [popper, setPopper] = useState(null);

  const handleClick = (key) => (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setPopper(key);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'input-popper' : undefined;

  //* Request - Get projet related roofs
  const [update] = useMutation(UPDATE_LAYOUT);

  const { data, loading, error } = useQuery(GET_LAYOUTS, {
    variables: { id: roof?.id },
    skip: !roof?.id,
  });

  //* Interactions
  const handleChangeConfirm = useCallback(
    (key) => async (newValue) => {
      if (layout?.id) {
        updateRelatedData(`layout.${key}`, newValue);
        toast.promise(
          update({
            variables: {
              where: { id: layout?.id },
              data: { [key]: newValue },
            },
          }),
          {
            loading: 'Sauvegarde ...',
            success: 'Le layout a été mis à jour',
            error: 'Erreur lors de la mise à jour',
          }
        );
      }
    },
    [layout?.id, updateRelatedData, update]
  );

  const handleChoiceClick = useCallback(
    (element) => () => {
      setRelatedData('solarModule', element.solarModule);
      setRelatedData('product', element.product);
      onChange(element);
    },
    [onChange, setRelatedData]
  );

  //* Render
  if (loading)
    return (
      <Stack height={120} alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    );

  return (
    <>
      {/**
       * Warning Message
       */}
      {isEmpty(roof) && (
        <Box px={1} py={3}>
          <Alert severity="error">
            Vous devez d&apos;abord choisir une toiture avant de pouvoir
            séléctionner ou créer un calepinage
          </Alert>
        </Box>
      )}

      {!isEmpty(roof) && isEmpty(layout) && isEmpty(data?.layouts) && (
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <Typography>Pas de résultat</Typography>
        </Box>
      )}

      {/**
       * Choice List
       */}
      {!isEmpty(roof) && isEmpty(layout) && (
        <>
          {!isEmpty(data?.layouts) && (
            <PopperList>
              {data &&
                data?.layouts?.map((layout) => (
                  <ListItemButton
                    key={'__create_new__'}
                    sx={{ py: 0, minHeight: 32 }}
                    onClick={handleChoiceClick(layout)}
                  >
                    <ListItemIcon>
                      <RoofingIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={layout.name}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: 'medium',
                      }}
                    />
                  </ListItemButton>
                ))}
            </PopperList>
          )}

          <Divider />

          {/**
           *  Create Button
           */}
          <Button
            onClick={onOpenToClick('layout')}
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

      {/**
       *  Current choice details
       */}
      {!isEmpty(roof) && !isEmpty(layout) && (
        <>
          <FieldGroupContainer>
            <FielInput
              icon={<RoofingIcon />}
              label={'name'}
              value={layout.name}
              onConfirm={handleChangeConfirm('name')}
            />
            <FieldSelect
              icon={<AccountCircleOutlinedIcon />}
              label={'Opérateur'}
              value={
                layout?.operator?.length && layout?.operator[0]?.familyName
              }
              onClick={handleClick('operator')}
              onConfirm={handleChangeConfirm('operator')}
              query={GET_PEOPLE}
              where={{}}
              take={10}
              skip={0}
              orderBy={[]}
              onClose={(values) => {
                handleChangeConfirm('operator')(values);
                handleClick()();
              }}
              getOptionLabel={(option) =>
                `${option.givenName} ${option.familyName}`
              }
              renderOptionProps={(option, selected) => ({
                primary: option.givenName,
                secondary: option.familyName,
                selected,
              })}
            />
          </FieldGroupContainer>

          <TabPopperChangeButton name="layout" />
        </>
      )}
    </>
  );
};

export default observer(TabLayout);

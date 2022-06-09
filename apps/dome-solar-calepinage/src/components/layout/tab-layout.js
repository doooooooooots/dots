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
  Stack,
  CircularProgress,
  ClickAwayListener,
} from '@mui/material';
import { observer } from 'mobx-react';
import PopperList from '../popper-list';
import RoofingIcon from '@mui/icons-material/Roofing';
import FielGroup from '../field-group';
import { useCallback, useState } from 'react';
import TabPopperChangeButton from './tab-popper-change-button';
import toast from 'react-hot-toast';
import FieldGroupContainer from './field-group-container';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AutocompleteFromQuery from '../autocomplete-from-query';
import Popper from '../popper-styled';

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
    $where: RoofWhereUniqueInput!
    $data: RoofUpdateInput!
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
  const {
    getRelatedData,
    setRelatedData,
    setUserData,
    onOpenToClick,
    updateRelatedData,
    reloadSize,
  } = useStore();

  const [anchorEl, setAnchorEl] = useState(null);
  const [popper, setPopper] = useState(null);

  const handleClick = (key) => (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setPopper(key);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'input-popper' : undefined;

  const [update] = useMutation(UPDATE_LAYOUT);
  const roof = getRelatedData('roof');
  const layout = getRelatedData('layout');

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
      setRelatedData('solarModule', element.solarModule);
      setRelatedData('product', element.product);
      onChange(element);
    },
    [onChange, setRelatedData]
  );

  //* REQUEST - Get projet related roofs
  const { data, loading, error } = useQuery(GET_LAYOUTS, {
    variables: { id: roof?.id },
    skip: !roof?.id,
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
      {isEmpty(roof) && (
        <Box px={1} py={3}>
          <Alert severity="error">
            Vous devez d&apos;abord choisir une toiture avant de pouvoir
            séléctionner ou créer un calepinage
          </Alert>
        </Box>
      )}

      {!isEmpty(roof) && isEmpty(layout) && (
        <>
          <PopperList>
            {data &&
              data.layouts.map((layout) => (
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
          <Divider />
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

      {/* Choice details */}
      {!isEmpty(roof) && !isEmpty(layout) && (
        <>
          <FieldGroupContainer>
            <FielGroup
              icon={<RoofingIcon />}
              label={'name'}
              value={layout.name}
              onConfirm={handleChangeConfirm('name')}
            />
            <FielGroup
              icon={<AccountCircleOutlinedIcon />}
              label={'Opérateur'}
              value={'Adrien Euverte'}
              onClick={handleClick('operator')}
              onConfirm={handleChangeConfirm('operator')}
              readOnly
            />
          </FieldGroupContainer>
          <TabPopperChangeButton name="layout" />
          <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
            <ClickAwayListener onClickAway={handleClick}>
              <Stack bgcolor="background.default" minWidth={238} boxShadow={12}>
                {popper === 'operator' && (
                  <AutocompleteFromQuery
                    query={GET_PEOPLE}
                    where={{}}
                    take={10}
                    skip={0}
                    orderBy={[]}
                    multiple
                    onClose={(values) => {
                      console.log(values);
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
                )}
              </Stack>
            </ClickAwayListener>
          </Popper>
        </>
      )}
    </>
  );
};

export default observer(TabLayout);

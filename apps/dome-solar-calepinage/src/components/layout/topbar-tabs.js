import React, { useCallback } from 'react';
import {
  Button,
  Stack,
  Divider,
  Alert,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';

// Constants
import { TOPBAR_SIZE } from '../../constants/constants';

// Icons
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

// Tabs
import TabEntity from './tab-entity';

// Hooks
import { useStore } from '../../contexts/useStore';
import { useRouter } from 'next/router';

//Utils
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-hot-toast';
import { useKey } from 'react-use';
import Kbd from '../design-system/kbd/kbd';
import PopperGrow from '../design-system/popper-grow';
import panels from './data/panels';
import PopperTop from './popper-top';

const id = 'transition-popper';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      ariaLabelledby={`simple-tab-${index}`}
      sx={{ padding: 0, minWidth: 385, maxWidth: 425 }}
      {...other}
    >
      {value === index && <>{children}</>}
    </Box>
  );
}

function TopBar() {
  // Manage tab state
  const [currentTab, setCurrentTab] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const store = useStore();
  const { getRelatedData, setRelatedData, renderView } = store;

  /**
   * User clicks on home icon
   */
  const router = useRouter();
  const handleClickHome = () => router.push('/');

  /**
   * User clicks on tab
   */
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
    setAnchorEl(event.currentTarget);
  };

  /**
   * User clicks on element in list
   */
  const handleChange = useCallback(
    (data) => {
      setRelatedData(currentTab, data);
      renderView();
    },
    [setRelatedData, currentTab, renderView]
  );

  /**
   * User clicks on Edit button
   */
  const handleRemove = useCallback(() => {
    setRelatedData(currentTab, {});

    if (currentTab === 'project') {
      ['roof', 'cladding', 'layout', 'solarModule', 'product'].forEach((item) =>
        setRelatedData(item, null)
      );
    }
    if (currentTab === 'roof') setRelatedData('cladding', null);
  }, [currentTab, setRelatedData]);

  /**
   * User clicks on close Button
   */
  const handleCloseButtonClick = () => {
    setCurrentTab('');
  };

  /**
   * User clicks on Cmd + s
   */
  useKey('s', (event) => {
    if (event.metaKey) {
      event.preventDefault();
      toast.error('Rien a sauvegarder');
    }
  });

  return (
    <>
      {/*//* MenuBar */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          px: 2,
          height: (theme) => theme.spacing(TOPBAR_SIZE),
          overflow: 'hidden',
        }}
      >
        <Stack direction="row" py={1} spacing={1} alignItems="center">
          {/*//* Home button */}
          <Button
            startIcon={<HomeOutlinedIcon fontSize="small" />}
            size="small"
            color="neutral"
            onClick={handleClickHome}
          >
            Accueil
          </Button>

          <ToggleButtonGroup
            value={currentTab}
            exclusive
            onChange={handleChangeTab}
            aria-label="text alignment"
          >
            {/*//* Pannels */}
            {panels.map(({ name, Icon }) => {
              const related = getRelatedData(name);
              const _isEmpty = isEmpty(related);

              return (
                <ToggleButton
                  key={`button-${name}`}
                  value={name}
                  aria-label={name}
                  sx={[
                    !_isEmpty && {
                      color: 'success.dark',
                    },
                    {
                      maxWidth: 220,
                      typography: 'body2',
                      textTransform: 'none',
                      px: 1,
                      py: '4px',
                      cursor: 'pointer',
                      '&.Mui-selected': {
                        bgcolor: 'primary.background',
                        color: 'primary.main',
                        '&:hover': {
                          bgcolor: 'primary.100',
                        },
                        '& .MuiSvgIcon-root': {
                          color: 'primary.main',
                        },
                      },
                    },
                  ]}
                >
                  {!_isEmpty ? (
                    <CheckIcon color="success" fontSize="small" />
                  ) : (
                    <AddIcon color="neutral" fontSize="small" />
                  )}
                  <Box
                    sx={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                  >
                    {_isEmpty
                      ? `Ajouter un ${name}`
                      : (related && related.name) || name}
                  </Box>
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Stack>

        <Stack direction="row">
          <Button color="neutral" size="small">
            <Kbd shortcut="s" useCmd>
              Sauvegarder
            </Kbd>
          </Button>
        </Stack>
      </Stack>

      {/*//* Popper */}
      <PopperGrow
        id={id}
        open={!!currentTab}
        anchorEl={anchorEl}
        onClose={handleCloseButtonClick}
        placement={'bottom-start'}
        sx={{ minWidth: 425, p: 0 }}
      >
        {/*//* Content */}
        {panels.map(({ name, query, title, Icon, dependencies }) => {
          let canLoad = true;
          const value = getRelatedData(name);

          if (!isEmpty(dependencies)) {
            canLoad = dependencies.reduce(
              (acc, dependency) => acc * !isEmpty(getRelatedData(dependency)),
              canLoad
            );
          }

          return (
            <TabPanel key={name} value={currentTab} index={name}>
              {canLoad ? (
                <>
                  <PopperTop
                    title={title}
                    HomeIcon={Icon}
                    onClose={handleCloseButtonClick}
                    onClickBack={handleRemove}
                    showBackButton={Boolean(value)}
                  />
                  <TabEntity
                    select={name}
                    query={query}
                    value={value}
                    onChange={handleChange}
                    onLoadSuccess={handleChange}
                  />
                  {isEmpty(value) && (
                    <>
                      <Divider />
                      <Button
                        size="small"
                        color="neutral"
                        onClick={handleCloseButtonClick}
                        startIcon={<AddIcon />}
                        fullWidth
                      >
                        Créer un nouveau
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <Alert key={name} severity="error">
                  Vous devez d&apos;abord selectionner :{' '}
                  {dependencies.join(', ')}
                </Alert>
              )}
            </TabPanel>
          );
        })}
      </PopperGrow>
    </>
  );
}

export default observer(TopBar);

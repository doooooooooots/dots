import React, { useCallback } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import {
  Button,
  IconButton,
  Stack,
  Typography,
  Divider,
  Chip,
} from '@mui/material';
import { styled } from '@mui/system';

// Icons
import AddIcon from '@mui/icons-material/Add';
import CalendarViewWeekOutlinedIcon from '@mui/icons-material/CalendarViewWeekOutlined';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SolarPowerIcon from '@mui/icons-material/SolarPowerOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

// Constants
import { TOPBAR_SIZE } from '../../constants/constants';

// Tabs
import TabSolarPanel from './tab-solar-module';
import TabCladding from './tab-cladding';
import TabProject from './tab-project';
import TabProduct from './tab-product';
import TabRoof from './tab-roof';

// Components
import PopperGrow from '../../../design-system/popper-grow';

// Hooks
import { useAuth } from '../../hooks/use-auth';
import { useStore } from '../context/useStore';
import { useRouter } from 'next/router';

//Utils
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-hot-toast';

const id = 'transition-popper';

const panels = [
  { name: 'project', Icon: <InfoIcon /> },
  { name: 'roof', Icon: <InfoIcon /> },
  { name: 'cladding', Icon: <CalendarViewWeekOutlinedIcon /> },
  { name: 'solarModule', Icon: <SolarPowerIcon /> },
  { name: 'product', Icon: <StarBorderIcon /> },
];

const StyledTabPanel = styled(TabPanel)({
  padding: 0,
  minWidth: 385,
  maxWidth: 400,
});

function TopBar() {
  const [value, setValue] = React.useState('project');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const { logout } = useAuth();
  const store = useStore();
  const router = useRouter();

  const handleTabClick = (newValue) => (event) => {
    event.stopPropagation();
    setValue(newValue);
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleSelectElement = useCallback(
    (pageName) => (element) => {
      store.setRelatedData(pageName, element);
      store.renderView();
    },
    [store]
  );

  const handleDeleteButtonClick = useCallback(
    (pageName) => () => {
      store.setRelatedData(pageName, {});
      if (pageName === 'project') store.setRelatedData('roof', {});
      store.setIsPassingTests(false);
    },
    [store]
  );

  const handleClickHome = () => router.push('/');

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/authentication/login').catch(console.error);
    } catch (err) {
      console.error(err);
      toast.error('Unable to logout.');
    }
  };

  return (
    <TabContext value={value}>
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
          <IconButton size="small" onClick={handleClickHome}>
            <HomeOutlinedIcon fontSize="small" />
          </IconButton>
          <Divider orientation="vertical" variant="middle" flexItem />

          {/*//* Pannels */}
          {panels.map((item) => {
            const isActive = open && item.name === value;
            const _isEmpty = isEmpty(store.getRelatedData(item.name));
            const related = store.getRelatedData(item.name);

            return (
              <Chip
                key={`button-${item.name}`}
                icon={isActive || !_isEmpty ? item.Icon : <AddIcon />}
                label={
                  _isEmpty
                    ? `Ajouter un ${item.name}`
                    : (related && related.name) || item.name
                }
                color={isActive || !_isEmpty ? 'primary' : 'neutral'}
                variant={isActive ? 'contained' : 'outlined'}
                onClick={handleTabClick(item.name)}
                deleteIcon={isActive ? <KeyboardArrowDownIcon /> : undefined}
                onDelete={
                  _isEmpty
                    ? isActive
                      ? handleTabClick(item.name)
                      : undefined
                    : handleDeleteButtonClick(item.name)
                }
                size="small"
                sx={[
                  { px: 0.5 },
                  _isEmpty && {
                    border: 0,
                  },
                ]}
              />
            );
          })}
          {/* <IconButton size="small" onClick={handleLogout}>
            <LogoutIcon fontSize="small" />
          </IconButton> */}
        </Stack>

        {/*//* Poppers */}
        <PopperGrow
          id={id}
          open={!!open}
          anchorEl={anchorEl}
          onClose={handleClose}
          placement={'bottom-start'}
        >
          {/*//? TopBar */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px={2}
          >
            <Typography variant="h6">{value}</Typography>
            <Button
              aria-label="delete"
              size="small"
              onClick={handleClose}
              endIcon={<CloseIcon fontSize="inherit" />}
              sx={{ py: 0.25, px: 2 }}
            >
              Fermer
            </Button>
          </Stack>

          {/*//* Content */}
          <StyledTabPanel value="project">
            <TabProject
              onChange={handleSelectElement('project')}
              onClose={handleClose}
            />
          </StyledTabPanel>
          <StyledTabPanel value="roof">
            <TabRoof
              onChange={handleSelectElement('roof')}
              onClose={handleClose}
            />
          </StyledTabPanel>
          <StyledTabPanel value="solarModule">
            <TabSolarPanel
              onChange={handleSelectElement('solarModule')}
              onClose={handleClose}
            />
          </StyledTabPanel>
          <StyledTabPanel value="product">
            <TabProduct
              onChange={handleSelectElement('product')}
              onClose={handleClose}
            />
          </StyledTabPanel>
          <StyledTabPanel value="cladding">
            <TabCladding
              onChange={handleSelectElement('cladding')}
              onClose={handleClose}
            />
          </StyledTabPanel>
        </PopperGrow>
      </Stack>
    </TabContext>
  );
}

export default observer(TopBar);

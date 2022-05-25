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
import TabProject from './tab-project';
import TabSolarPanel from './tab-solar-module';
import TabProduct from './tab-product';
import TabCladding from './tab-cladding';
import { Add, Close } from '@mui/icons-material';
import CalendarViewWeekOutlinedIcon from '@mui/icons-material/CalendarViewWeekOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SolarPowerIcon from '@mui/icons-material/SolarPowerOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react-lite';
import PopperGrow from '../../../design-system/popper-grow';
import { useStore } from '../context/useStore';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useRouter } from 'next/router';
import { TOPBAR_SIZE } from '../../constants';
import TabRoof from './tab-roof';

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
  const store = useStore();
  const router = useRouter();

  const handleClick = (newValue) => (event) => {
    event.stopPropagation();
    setValue(newValue);
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleDeleteButtonClick = useCallback(
    (pageName) => () => {
      store.setRelatedData(pageName, {});
      store.setIsPassingTests(false);
    },
    [store]
  );

  const handleClickHome = () => router.push('/');

  const handleClose = () => {
    setOpen(false);
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

            return (
              <Chip
                key={`button-${item.name}`}
                icon={isActive || !_isEmpty ? item.Icon : <Add />}
                label={_isEmpty ? `Ajouter un ${item.name}` : item.name}
                color={isActive || !_isEmpty ? 'primary' : 'neutral'}
                variant={isActive ? 'contained' : 'outlined'}
                onClick={handleClick(item.name)}
                deleteIcon={isActive ? <KeyboardArrowDownIcon /> : undefined}
                onDelete={
                  _isEmpty
                    ? isActive
                      ? handleClick(item.name)
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
              endIcon={<Close fontSize="inherit" />}
              sx={{ py: 0.25, px: 2 }}
            >
              Fermer
            </Button>
          </Stack>

          {/*//? Content */}
          <StyledTabPanel value="project">
            <TabProject onClose={handleClose} />
          </StyledTabPanel>
          <StyledTabPanel value="roof">
            <TabRoof onClose={handleClose} />
          </StyledTabPanel>
          <StyledTabPanel value="solarModule">
            <TabSolarPanel onClose={handleClose} />
          </StyledTabPanel>
          <StyledTabPanel value="product">
            <TabProduct onClose={handleClose} />
          </StyledTabPanel>
          <StyledTabPanel value="cladding">
            <TabCladding onClose={handleClose} />
          </StyledTabPanel>
        </PopperGrow>
      </Stack>
    </TabContext>
  );
}

export default observer(TopBar);

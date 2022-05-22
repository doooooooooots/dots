import React from 'react';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { Button, IconButton, Stack, Typography, Divider } from '@mui/material';
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

const id = 'transition-popper';

const panels = [
  { name: 'project', Icon: <InfoIcon /> },
  { name: 'solarModule', Icon: <SolarPowerIcon /> },
  { name: 'product', Icon: <StarBorderIcon /> },
  { name: 'cladding', Icon: <CalendarViewWeekOutlinedIcon /> },
];

const StyledTabPanel = styled(TabPanel)({
  padding: 0,
  minWidth: 250,
});

function LinksButtons() {
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

  const handleClickHome = () => router.push('/');

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TabContext value={value}>
      <Stack direction="row" py={1} spacing={1} alignItems="center">
        <IconButton size="small" onClick={handleClickHome}>
          <HomeOutlinedIcon fontSize="small" />
        </IconButton>
        <Divider orientation="vertical" variant="middle" flexItem />
        {panels.map((item) => {
          const isActive = open && item.name === value;
          const _isEmpty = isEmpty(store.getRelatedData(item.name));
          return (
            <Button
              key={`button-${item.name}`}
              color={isActive || !_isEmpty ? 'primary' : 'neutral'}
              variant={
                (isActive && 'contained') || (!_isEmpty && 'outlined') || 'text'
              }
              startIcon={isActive || !_isEmpty ? item.Icon : <Add />}
              endIcon={isActive ? <KeyboardArrowDownIcon /> : false}
              size="small"
              onClick={handleClick(item.name)}
              sx={[
                {
                  minHeight: 'auto',
                  p: '2px 8px',
                  borderRadius: '50px',
                },
              ]}
            >
              {_isEmpty
                ? `Ajouter un ${item.name}`
                : store.getRelatedData(item.name).name}
            </Button>
          );
        })}
      </Stack>

      {/* Popper */}
      <PopperGrow
        id={id}
        open={!!open}
        anchorEl={anchorEl}
        onClose={handleClose}
        placement={'bottom-start'}
      >
        <Stack direction="row" justifyContent="space-between" px={2}>
          <Typography variant="h6">{value}</Typography>
          <IconButton aria-label="delete" size="small" onClick={handleClose}>
            <Close fontSize="inherit" />
          </IconButton>
        </Stack>
        <StyledTabPanel value="project">
          <TabProject />
        </StyledTabPanel>
        <StyledTabPanel value="solarModule">
          <TabSolarPanel onClose={handleClose} />
        </StyledTabPanel>
        <StyledTabPanel value="product">
          <TabProduct />
        </StyledTabPanel>
        <StyledTabPanel value="cladding">
          <TabCladding />
        </StyledTabPanel>
      </PopperGrow>
    </TabContext>
  );
}

export default observer(LinksButtons);

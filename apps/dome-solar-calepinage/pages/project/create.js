import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProjectStep1 from '../../src/components/form/project-1-basic-infos';
import ProjectStep2 from '../../src/components/form/project-2-timing';
import ProjectStep3 from '../../src/components/form/project-3-field';
import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledTab = styled((props) => {
  const { title, description, ...other } = props;
  return (
    <Tab
      {...other}
      label={
        <Stack>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="caption">{description}</Typography>
        </Stack>
      }
    />
  );
})(({ theme }) => ({
  border: '1px solid',
  borderColor: `${theme.palette.divider}`,
  alignItems: 'flex-start',
  textAlign: 'left',
  minWidth: 200,
}));

export default function ProjectCreate() {
  const [currentTab, setCurrentTab] = React.useState('1');
  const [store, setStore] = React.useState({ test1: '', test2: '', test3: '' });

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const onSubmit = (data) => {
    setStore({
      ...store,
      ...data,
    });
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <StyledTab
              title="Informations de base"
              description="description"
              value="1"
            />
            <StyledTab title="Gestion" description="description" value="2" />
            <StyledTab title="Localité" description="description" value="3" />
            <StyledTab title="Pige" description="description" value="4" />
            <StyledTab title="Bilan" description="description" value="5" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <ProjectStep1 onSubmit={onSubmit} store={store} />
        </TabPanel>
        <TabPanel value="2">
          <ProjectStep2 onSubmit={onSubmit} store={store} />
        </TabPanel>
        <TabPanel value="3">
          <ProjectStep3 onSubmit={onSubmit} store={store} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

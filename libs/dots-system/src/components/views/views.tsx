import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { Button, BrowserTab, BrowserTabs } from '@dots.cool/components';

const MainViews = (props: any) => {
  const { views, currentView, onViewChange } = props;

  const handleTabsChange = (_: any, value: any) => {
    onViewChange(value);
  };

  return (
    <Stack direction="row">
      <BrowserTabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        variant="scrollable"
        scrollButtons="auto"
        textColor="primary"
        value={currentView}
      >
        {views &&
          views.map((view) => (
            <BrowserTab key={view.id} label={view.label} value={view.value} />
          ))}
      </BrowserTabs>

      <Stack
        direction="row"
        alignItems="center"
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          flex: 1,
        }}
      >
        <Box px={1} borderRight="1px solid" borderColor="divider">
          <Button color="primary" startIcon={<AddIcon fontSize="small" />}>
            Créer une vue
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default React.memo(MainViews);

import { AppBar, Button, Stack, styled, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Link from '../link';

const MenuButton = styled(Button)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 14,
  color: theme.palette.text.primary,
  borderRadius: 20,
  padding: '2px 10px',
}));

function LayoutAppBar(props) {
  const { children } = props;
  return (
    <AppBar sx={{ boxShadow: 0 }}>
      <Toolbar
        variant="dense"
        sx={{
          bgcolor: 'background.default',
          justifyContent: 'space-between',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        {/* <ToggleGameConnected /> */}
        <Stack direction="row" spacing={1} ml={2}>
          {[
            ['Produits', '/products'],
            ['Stock', '/racks'],
            ['Pricer', '/pricing'],
            ['Tasks', '/tasks'],
            // ['Settings', '/settings']
          ].map(([page, url]) => (
            <MenuButton key={page} href={url} component={Link}>
              {page}
            </MenuButton>
          ))}
        </Stack>
        <Box>{children}</Box>
      </Toolbar>
    </AppBar>
  );
}

export default React.memo(LayoutAppBar);

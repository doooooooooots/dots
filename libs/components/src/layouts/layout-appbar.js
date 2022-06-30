import {
  AppBar,
  Button,
  Chip,
  Divider,
  Stack,
  styled,
  Toolbar,
} from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
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
        <Stack direction="row" spacing={1} ml={2} alignItems="center">
          <Image
            src="/assets/logo/dots-logo.svg"
            alt="logo"
            width={80}
            height={25}
          />
          <Chip
            size="small"
            variant="outlined"
            label="alpha 0.0.1"
            sx={{ fontSize: 11, py: 0, lineHeight: 1, height: 19 }}
          />
          <Divider orientation="vertical" flexItem sx={{ pl: 2 }} />
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

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
} from '@mui/material';

function MainHeaderColumnPopper(props: any) {
  const { anchorEl, onClose } = props;

  const open = Boolean(anchorEl);
  const id = open ? 'datagrid-header-popover' : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Box
        sx={{
          minWidth: 250,
          py: 1,
          px: 1,
          '& > *': { borderRadius: 1 },
          '& .MuiListItemIcon-root': {
            m: 0,
          },
        }}
      >
        <MenuItem>
          <ListItemIcon sx={{ pr: 2 }}>
            <FilterAltOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Ajouter un filtre" />
        </MenuItem>
        <Divider sx={{ my: '4px!important' }} />
        <MenuItem>
          <ListItemIcon sx={{ pr: 2 }}>
            <ArrowUpwardIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Trier (asc)" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon sx={{ pr: 2 }}>
            <ArrowDownwardIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Trier (desc)" />
        </MenuItem>
        <Divider sx={{ my: '4px!important' }} />
        <MenuItem>
          <ListItemIcon sx={{ pr: 2 }}>
            <VisibilityOffOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Cacher" />
        </MenuItem>
      </Box>
    </Popover>
  );
}

export default MainHeaderColumnPopper;

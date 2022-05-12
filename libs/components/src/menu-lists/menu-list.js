import { Add, MoreHorizOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import * as React from 'react';
import { ButtonAction } from '../buttons';

const MoreButton = styled(Button)(
  ({ theme }) => `
  color: ${theme.palette.neutral[500]};
  justify-content:flex-start;
  padding: 4px 4px;
  min-width:auto;

  &:hover {
    background-color: ${theme.palette.background.alternative};
  }
`
);

export default function MenuList(props) {
  const { variant, actions, children, fullWidth } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let ButtonComponent = Button;
  let IconComponent = null;
  let buttonText = children;

  switch (variant) {
    case 'row':
      ButtonComponent = ButtonAction;
      IconComponent = <Add />;
      break;
    case 'more':
      ButtonComponent = MoreButton;
      buttonText = <MoreHorizOutlined />;
      break;
    default:
      break;
  }

  return (
    <>
      <ButtonComponent
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={IconComponent}
        {...props}
        fullWidth={fullWidth}
      >
        {buttonText}
      </ButtonComponent>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: {
            minWidth: 250,
            maxWidth: '100%',
            p: 1,
          },
        }}
      >
        {actions &&
          actions.map((action) => {
            if (!action) return null;

            let Icon = action.icon;

            return (
              <MenuItem
                key={action.label}
                onClick={() => {
                  handleClose();
                  action.onClick();
                }}
              >
                {Icon && (
                  <ListItemIcon>
                    <Icon fontSize="small" />
                  </ListItemIcon>
                )}
                <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                  {action.label}
                </ListItemText>
                {action.shortcut && (
                  <Typography variant="body2" color="text.secondary">
                    {action.shortcut}
                  </Typography>
                )}
              </MenuItem>
            );
          })}
      </Menu>
    </>
  );
}

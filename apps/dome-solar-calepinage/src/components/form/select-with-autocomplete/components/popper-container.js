import { styled } from '@mui/system';
import { autocompleteClasses } from '@mui/material/Autocomplete';

const PopperContainer = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  flex: 1,
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: 'none',
    margin: 0,
    color: 'inherit',
    fontSize: 13,
    overflow: 'hidden',
    height: '100%',
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.background.default,
    padding: 0,
    maxHeight: 'none',
    height: '100%',
    [`& .${autocompleteClasses.option}`]: {
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: 8,
      borderBottom: `1px solid  ${theme.palette.divider}`,
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
        {
          backgroundColor: theme.palette.action.hover,
        },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
}));

export default PopperContainer;

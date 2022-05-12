import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const SwitchIcon = styled(Switch, {
  shouldForwardProp: (prop) => prop !== 'iconActive' && prop !== 'iconInactive' && prop !== 'color'
})(({ theme, iconActive, iconInactive, color = 'primary' }) => {
  const bgColor = theme.palette[color].main;

  return {
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb': {
          backgroundColor: bgColor,
          '&:before': {
            backgroundImage: `url('${iconActive || ''}')`
          }
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
        }
      }
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.primary.main,
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('${iconInactive || ''}')`
      }
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2
    }
  };
});

export default SwitchIcon;

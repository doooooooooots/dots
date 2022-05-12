// Colors
const grey = {
  0: '#FFFFFF',
  25: '#F6F6F9',
  50: '#F0F2F4',
  75: '#EAEDF0',
  100: '#E1E5EA',
  150: '#D3D9DF',
  200: '#C4CCD4',
  300: '#A6B2BF',
  400: '#8999A9',
  500: '#6B8094',
  600: '#566676',
  700: '#404D59',
  800: '#2B333B',
  900: '#151A1E',
  950: '#0B0D0F',
  1000: '#000000'
};
const blue = {
  25: '#F0F2FF',
  50: '#E5E9FF',
  100: '#CCD3FF',
  200: '#99A8FF',
  300: '#667CFF',
  400: '#3350FF',
  500: '#0025FF',
  600: '#001ECC',
  700: '#001799',
  800: '#000F66',
  900: '#000833'
};
const yellow = {
  25: '#FFFEF0',
  50: '#FFFDE6',
  100: '#FEFCCD',
  200: '#FEF89A',
  300: '#FDF568',
  400: '#FDF135',
  500: '#FCEE03',
  600: '#CABE02',
  700: '#978F02',
  800: '#655F01',
  900: '#323001'
};
const green = {
  25: '#F2FDF9',
  50: '#E9FBF5',
  100: '#D3F8EB',
  200: '#A7F1D7',
  300: '#7BEAC3',
  400: '#50E2AF',
  500: '#24DB9B',
  600: '#1DAF7C',
  700: '#1C7D5C',
  800: '#0E583E',
  900: '#072C1F'
};
const red = {
  25: '#FDF2F2',
  50: '#FBE9E9',
  100: '#F8D3D3',
  200: '#F1A7A7',
  300: '#EA7B7B',
  400: '#E25050',
  500: '#DB2424',
  600: '#AF1D1D',
  700: '#7D1C1C',
  800: '#841515',
  900: '#2C0707'
};
const orange = {
  25: '#FDFAF2',
  50: '#FBF4E9',
  100: '#F8E8D3',
  200: '#F1D1A7',
  300: '#EABB7B',
  400: '#E2A450',
  500: '#DB8D24',
  600: '#AF711D',
  700: '#845515',
  800: '#58380E',
  900: '#2C1C07'
};
const blueAlt = {
  25: '#F1F5FD',
  50: '#E8EFFC',
  100: '#D1DFFA',
  200: '#A3BEF5',
  300: '#759EF0',
  400: '#477EEB',
  500: '#195EE6',
  600: '#144BB8',
  700: '#0F388A',
  800: '#0A255C',
  900: '#05132E'
};
const tags = [
  '#F8F1D3',
  '#F8E2D3',
  '#E2F8D3',
  '#D3F8D3',
  '#D3F8E2',
  '#D3F1F8',
  '#D3F1F8',
  '#D3E2F8',
  '#D3D3F8',
  '#E2D3F8',
  '#F1D3F8',
  '#F8D3F1',
  '#F8D3D3',
  '#F8D3E2'
];

const common = {
  black: '#000',
  white: '#fff'
};

// App
const text = {
  primary: grey[800],
  secondary: grey[600],
  inverse: grey[200],
  disabled: grey[300],
  light: grey[50],
  dark: grey[900]
};
const background = {
  default: common.white,
  paper: common.white
};
const divider = grey[75];

// Variants
const neutral = {
  main: grey[500],
  light: grey[300],
  dark: grey[700],
  contrastText: text.dark,
  ...grey
};

const primary = {
  main: blue[500],
  light: blue[300],
  dark: blue[700],
  contrastText: text.light,
  ...blue
};

const secondary = {
  main: yellow[500],
  light: yellow[300],
  dark: yellow[700],
  contrastText: text.dark,
  ...yellow
};

const success = {
  main: green[500],
  light: green[300],
  dark: green[700],
  contrastText: text.dark,
  ...green
};

const info = {
  main: blueAlt[500],
  light: blueAlt[300],
  dark: blueAlt[700],
  contrastText: text.dark,
  ...blueAlt
};

const warning = {
  main: orange[500],
  light: orange[300],
  dark: orange[700],
  contrastText: text.dark,
  ...orange
};

const error = {
  main: red[500],
  light: red[300],
  dark: red[700],
  contrastText: text.dark,
  ...red
};

export const lightThemeOptions = {
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: background.default,
          height: 44,
          '&.MuiPaper-root': {
            boxShadow: `inset 0 -1px ${neutral[200]}`
          }
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[500],
          color: background.default
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-filledDefault': {
            backgroundColor: neutral[200],
            '& .MuiChip-deleteIcon': {
              color: neutral[400]
            }
          },
          '&.MuiChip-outlinedDefault': {
            '& .MuiChip-deleteIcon': {
              color: neutral[300]
            }
          }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            opacity: 1,
            color: text.secondary
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: divider
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: 'solid',
          borderWidth: 1
        }
      }
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: 'solid',
          borderWidth: 1
        }
      }
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: neutral[500]
        },
        track: {
          backgroundColor: neutral[400],
          opacity: 1
        }
      }
    },
    MuiDataGrid: {
      styleOverrides: {
        columnHeaders: {
          borderTop: `1px solid ${divider}`,
          borderBottom: `1px solid ${divider}`
        },
        columnHeader: {
          borderRight: `1px solid ${divider}`,
          '&:focus': {
            outline: 'none'
          },
          '&:hover': {
            backgroundColor: neutral[25],
            cursor: 'pointer'
          },
          '& .MuiDataGrid-iconSeparator': {
            fill: neutral[200]
          }
        },
        cell: {
          borderBottomColor: divider,
          // borderRight: `1px solid ${divider}`,
          '&:hover': {
            backgroundColor: neutral[50]
          },
          '&:focus, &:focus-within': {
            outline: `solid ${neutral[500]} 1px`
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: neutral[400]
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[100],
          '.MuiTableCell-root': {
            color: neutral[700]
          }
        }
      }
    }
  },
  palette: {
    mode: 'light',
    action: {
      active: neutral[500],
      focus: 'rgba(55, 65, 81, 0.12)',
      hover: 'rgba(55, 65, 81, 0.04)',
      selected: 'rgba(55, 65, 81, 0.08)',
      disabledBackground: 'rgba(55, 65, 81, 0.12)',
      disabled: 'rgba(55, 65, 81, 0.26)'
    },
    background,
    divider,
    error,
    info,
    neutral,
    primary,
    secondary,
    success,
    text,
    warning,
    tags
  },
  shadows: [
    'none',
    '0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)',
    '0px 1px 2px rgba(100, 116, 139, 0.12)',
    '0px 1px 4px rgba(100, 116, 139, 0.12)',
    '0px 1px 5px rgba(100, 116, 139, 0.12)',
    '0px 1px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 6px rgba(100, 116, 139, 0.12)',
    '0px 3px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
    '0px 5px 12px rgba(100, 116, 139, 0.12)',
    '0px 5px 14px rgba(100, 116, 139, 0.12)',
    '0px 5px 15px rgba(100, 116, 139, 0.12)',
    '0px 6px 15px rgba(100, 116, 139, 0.12)',
    '0px 7px 15px rgba(100, 116, 139, 0.12)',
    '0px 8px 15px rgba(100, 116, 139, 0.12)',
    '0px 9px 15px rgba(100, 116, 139, 0.12)',
    '0px 10px 15px rgba(100, 116, 139, 0.12)',
    '0px 12px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 13px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 14px 24px -8px rgba(100, 116, 139, 0.25)',
    '0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)'
  ],
  shadowStyles: {
    stripe: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
    trello: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
    mac: 'rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px',
    airbnb: 'rgba(0, 0, 0, 0.08) 0px 4px 12px',
    morph: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset'
  }
};

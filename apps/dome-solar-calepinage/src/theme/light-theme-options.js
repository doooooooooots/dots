// Colors

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
  '#F8D3E2',
];

const neutralTints = {
  main: '#9CA3AF',
  light: '#F3F4F6',
  dark: '#D1D5DB',
  contrastText: '#111827',
  50: '#fafafa',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
};

const background = {
  default: '#FFFFFF',
  alternative: '#F3F4F6',
  paper: '#FFFFFF',
  topBar: '#f6f8fa',
};

const divider = '#E6E8F0';

const neutral = {
  main: neutralTints[800],
  light: neutralTints[700],
  dark: neutralTints[900],
  contrastText: '#FFFFFF',
};

const primary = {
  main: '#0024F9',
  light: '#828DF8',
  dark: '#3832A0',
  contrastText: '#FFFFFF',
};

const secondary = {
  main: '#ffff00',
  light: '#ffff00',
  dark: '#ffff00',
  contrastText: neutralTints[900],
};

const success = {
  main: '#14B8A6',
  light: '#43C6B7',
  dark: '#0E8074',
  contrastText: '#FFFFFF',
};

const info = {
  main: '#2196F3',
  light: '#64B6F7',
  dark: '#0B79D0',
  contrastText: '#FFFFFF',
};

const warning = {
  main: '#FFB020',
  light: '#FFBF4C',
  dark: '#B27B16',
  contrastText: '#FFFFFF',
};

const error = {
  main: '#D14343',
  light: '#DA6868',
  dark: '#922E2E',
  contrastText: '#FFFFFF',
};

const text = {
  primary: '#121828',
  secondary: '#65748B',
  light: '#C1C5CB',
  disabled: 'rgba(55, 65, 81, 0.48)',
};

export const lightThemeOptions = {
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'neutralTints' },
          style: {
            backgroundColor: neutralTints[100],
          },
        },
        {
          props: { variant: 'outlined.action' },
          style: {
            border: `1px solid ${neutralTints[500]}`,
            color: `${neutralTints[600]}`,
            padding: 2,
            paddingLeft: 16,
            paddingRight: 16,
          },
        },
      ],
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: neutralTints[500],
          color: '#FFFFFF',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        cell: {
          // borderRight: "1px solid",
          borderColor: neutralTints[200],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-filledDefault': {
            backgroundColor: neutralTints[200],
            '& .MuiChip-deleteIcon': {
              color: neutralTints[400],
            },
          },
          '&.MuiChip-outlinedDefault': {
            '& .MuiChip-deleteIcon': {
              color: neutralTints[300],
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            opacity: 1,
            color: text.secondary,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: divider,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: 'solid',
          borderWidth: 1,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: 'solid',
          borderWidth: 1,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: neutralTints[500],
        },
        track: {
          backgroundColor: neutralTints[400],
          opacity: 1,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${divider}`,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: neutralTints[100],
          '.MuiTableCell-root': {
            color: neutralTints[700],
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: neutralTints[900],
        },
      },
    },
  },
  palette: {
    action: {
      active: neutralTints[500],
      focus: 'rgba(55, 65, 81, 0.12)',
      hover: 'rgba(55, 65, 81, 0.04)',
      selected: 'rgba(55, 65, 81, 0.08)',
      disabledBackground: 'rgba(55, 65, 81, 0.12)',
      disabled: 'rgba(55, 65, 81, 0.26)',
    },
    background,
    divider,
    error,
    info,
    mode: 'light',
    neutralTints,
    neutral,
    primary,
    secondary,
    success,
    text,
    warning,
    tags,
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
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
  ],
};

import {
  createTheme as createMuiTheme,
  responsiveFontSizes as responsiveFontSizesFunc,
} from '@mui/material/styles';
import { baseThemeOptions } from './base-theme-options/base-theme-options';
import { darkThemeOptions } from './dark-theme-options/dark-theme-options';
import { lightThemeOptions } from './light-theme-options/light-theme-options';

interface ThemeConfigType {
  direction: 'ltr' | 'rtl';
  responsiveFontSizes: boolean;
  mode: 'light' | 'dark';
}

const createTheme = ({
  mode,
  direction,
  responsiveFontSizes,
}: ThemeConfigType) => {
  let theme = createMuiTheme(
    baseThemeOptions,
    mode === 'dark' ? darkThemeOptions : lightThemeOptions,
    {
      direction: direction,
    }
  );

  if (responsiveFontSizes) {
    theme = responsiveFontSizesFunc(theme);
  }

  return theme;
};

export default createTheme;

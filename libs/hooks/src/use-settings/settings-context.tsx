import { createContext, useEffect, useState } from 'react';
import {
  SettingContext,
  SettingProviderProps,
  Settings,
} from './settings-context-types';

const initialSettings = {
  direction: 'ltr',
  responsiveFontSizes: true,
  theme: 'light',
};

export const restoreSettings = () => {
  let settings = null;

  try {
    const storedData = window.localStorage.getItem('settings');

    if (storedData) {
      settings = JSON.parse(storedData);
    } else {
      settings = {
        direction: 'ltr',
        responsiveFontSizes: true,
        theme: window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light',
      };
    }
  } catch (err) {
    console.error(err);
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return settings;
};

export const storeSettings = (settings: object) => {
  window.localStorage.setItem('settings', JSON.stringify(settings));
};

export const SettingsContext: SettingContext = createContext({
  settings: initialSettings,
  saveSettings: (settings: Settings) => {
    return settings;
  },
});

const SettingsProvider = (props: SettingProviderProps) => {
  const { children } = props;
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    const restoredSettings = restoreSettings();
    if (restoredSettings) {
      setSettings(restoredSettings);
    }
  }, []);

  const saveSettings = (updatedSettings: Settings) => {
    setSettings(updatedSettings);
    storeSettings(updatedSettings);
    return updatedSettings;
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        saveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
export const SettingsConsumer = SettingsContext.Consumer;

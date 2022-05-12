import { createContext, FunctionComponent, useEffect, useState } from 'react';

const initialSettings = {
  direction: 'ltr',
  responsiveFontSizes: true,
  theme: 'light',
};

type SettingType = typeof initialSettings;

export const restoreSettings = () => {
  let settings = null;

  try {
    const storedData = globalThis.localStorage.getItem('settings');

    if (storedData) {
      settings = JSON.parse(storedData);
    } else {
      settings = {
        direction: 'ltr',
        responsiveFontSizes: true,
        theme: globalThis.matchMedia('(prefers-color-scheme: dark)').matches
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

export const storeSettings = (settings: SettingType) => {
  globalThis.localStorage.setItem('settings', JSON.stringify(settings));
};

export const SettingsContext = createContext({
  settings: initialSettings,
  saveSettings: (updatedSettings: SettingType) => {
    return;
  },
});

export const SettingsProvider = (props: {
  children: FunctionComponent<any>;
}) => {
  const { children } = props;
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    const restoredSettings = restoreSettings();

    if (restoredSettings) {
      setSettings(restoredSettings);
    }
  }, []);

  const saveSettings = (updatedSettings: SettingType) => {
    setSettings(updatedSettings);
    storeSettings(updatedSettings);
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

export const SettingsConsumer = SettingsContext.Consumer;

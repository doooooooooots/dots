export type Settings = {
  direction: string;
  responsiveFontSizes: boolean;
  theme: string;
};

export type SettingContext = React.Context<{
  settings: Settings;
  saveSettings: (settings: Settings) => Settings;
}>;

export type SettingProviderProps = {
  children: React.ReactElement<any, any>;
};

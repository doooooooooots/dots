import { useContext } from 'react';
import { SettingsContext } from './settings-context';

const useSettings = () => useContext(SettingsContext);
export default useSettings;

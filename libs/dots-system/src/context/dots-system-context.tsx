import {
  SettingsConsumer,
  SettingsProvider,
  DialogProvider,
} from '@dots.cool/hooks';
import { KBarProvider } from 'kbar';
import HistoryProvider from '../hooks/use-history/history-context';
import { MemoryProvider } from '@dots.cool/form-builder';
import { Toaster } from 'react-hot-toast';
import CommandBar from './kbar';

const DotsSystemProvider = ({ actions, children }) => {
  return (
    <SettingsProvider>
      <HistoryProvider>
        <MemoryProvider>
          <DialogProvider>
            <KBarProvider actions={actions}>{children}</KBarProvider>
          </DialogProvider>
        </MemoryProvider>
      </HistoryProvider>
    </SettingsProvider>
  );
};

export { SettingsConsumer, Toaster, DotsSystemProvider, CommandBar };

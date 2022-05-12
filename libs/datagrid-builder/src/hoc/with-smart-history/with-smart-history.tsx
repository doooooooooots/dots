import { FunctionComponent } from 'react';
import SharedHistoryProvider from './use-history/history-context';
import HistoryBrowser from './history-browser';

// TODO(Adrien) : Add props customisation
const withSmartHistory = (
  Component: FunctionComponent<any>
): FunctionComponent<any> => {
  const HistoricableComponent = (props: any) => {
    return (
      <SharedHistoryProvider>
        <Component {...props} />
        <HistoryBrowser maxWidth="lg" fullWidth />
      </SharedHistoryProvider>
    );
  };
  return HistoricableComponent;
};

export default withSmartHistory;

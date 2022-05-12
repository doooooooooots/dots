import { FunctionComponent } from 'react';
import SharedHistoryProvider from '../../hooks/use-history/history-context';
import HistoryBrowser from '../../components/history-browser/history-browser';

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

export interface HistoryItem {
  title: string;
  path: string;
  component: React.Component;
}

export interface HistoryState {
  path: string[];
  past: HistoryItem[];
  present: HistoryItem | null;
  future: HistoryItem[];
}

export interface HistoryAction {
  type: string;
  payload?: HistoryItem | number | null;
}

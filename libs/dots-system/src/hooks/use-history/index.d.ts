import { FC } from 'react';

export interface HistoryItem {
  path: string;
  title: string;
  Component: FC;
  componentProps?: {
    [key: string]: unknown;
  };
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

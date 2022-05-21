import { FC } from 'react';

export interface HistoryItem {
  path: string;
  title: string;
  Component: FC;
  componentProps?: {
    [key: string]: unknown;
  };
  width?: 'sm' | 'md' | 'lg' | 'xl' = 'xl';
}

export interface HistoryState {
  paths: string[];
  past: HistoryItem[];
  present: HistoryItem | null;
  future: HistoryItem[];
}

export interface HistoryAction {
  type: string;
  payload?: HistoryItem | number | string | null;
}

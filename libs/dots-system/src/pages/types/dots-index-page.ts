import { GRAPHQL_REQUESTS, VIEW_MODES } from '@dots.cool/tokens';
import { HistoryItem } from '../../hooks/use-history/index.d';
import {
  DocumentNode,
  OperationVariables,
  TypedDocumentNode,
} from '@apollo/client';

export interface DotsIndexPageProps {
  variant: 'details' | 'preview';
  entityName: string;

  // --Data
  query: string;
  columns: string[];
  rowsQuery: DocumentNode | TypedDocumentNode<unknown, OperationVariables>;
  rowsGetter: (data: unknown) => unknown;
  aggregateQuery: DocumentNode | TypedDocumentNode<unknown, OperationVariables>;
  aggregateGetter: (data: unknown) => unknown;
  variables: {
    where?: object;
    take?: number;
    skip?: number;
    orberBy?: object;
    [key: string]: object | number | undefined;
  };

  // --Filter
  filter: { [key: string]: unknown };
  onFilterChange: (args: unknown[]) => void;
  withFilter: boolean;

  // --Sort
  sort: { field: string; direction: string }[];
  sortPinned: string[];
  onSortChange: (args: unknown[]) => void;
  withSort: boolean;

  // --Pagination
  page: number;
  onPageNext: (args: unknown[]) => void;
  onPagePrevious: (args: unknown[]) => void;
  onGoTo: (args: unknown[]) => void;
  take: number;
  onTakeChange: (args: unknown[]) => void;
  skip: number;
  hidePagination: boolean;

  // --Tabs
  views: unknown[];
  currentView: string;
  onViewChange: (args: unknown[]) => void;
  hideViews: boolean;

  // --Toolbar
  selectionModel: string[];
  onSelectionModelChange: (args: string[]) => void;
  open: keyof typeof GRAPHQL_REQUESTS | '';
  onOpenDialog: (action: string) => () => void;
  onCloseDialog: () => void;
  hideDialog: boolean;

  // --ViewMode
  viewMode: typeof VIEW_MODES[keyof typeof VIEW_MODES] | '';
  onViewModeChange: (viewMode: string) => void;

  // --Lang
  lang: string;

  // --Components
  components: { [key: string]: React.FC };
  componentProps: {
    filterBar?: {
      actionText?: string;
      actionPage?: HistoryItem;
    };
    datagrid?: {
      components;
      componentProps;
    };
    dialog?: {
      components;
    };
    topbar?: {
      title: string;
      actionText: string;
      actionPage: HistoryItem;
      fullscreenPage: HistoryItem;
    };
  };
}

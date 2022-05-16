import { EntityContext } from '../../schemas';
import { HistoryItem } from '../../hooks/use-history';
import { GRAPHQL_REQUESTS, VIEW_MODE } from '@dots.cool/tokens';

export interface DotsIndexPageProps {
  variant: 'details' | 'preview';
  context: EntityContext;

  // --Data
  query: string;
  columns: string[];

  // --Filter
  filter: { [key: string]: unknown };
  onFilterChange: (args: unknown[]) => void;
  withFilter: boolean;

  // --Sort
  sort: { [key: string]: unknown };
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

  // --Toolbar
  selectionModel: string[];
  onSelectionModelChange: (args: string[]) => void;
  open: keyof typeof GRAPHQL_REQUESTS | '';
  onOpenDialog: (action: string) => () => void;
  onCloseDialog: () => void;
  hideDialog: boolean;

  // --ViewMode
  viewMode: VIEW_MODE;
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

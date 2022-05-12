export interface MainDatagridType {
  columns;
  rows;
  actions;
  loading;
  onUpdate;
  hideToolbar;
  hideEdition;
  components;
  renderModals;
}

export interface onActionClickPropsType {
  path: string;
  title: string;
  component: React.ReactNode;
  componentProps: actionComponentPropsType;
}

export interface actionComponentPropsType {
  onSubmitCallback: () => void;
}

export interface actionSuccessType {
  onSubmitCallback: () => void;
}

export interface actionPropsType {
  title: string;
  path: string;
}

export interface MainFilterbar {
  filterList: string[];
  actionText: string;
  actionProps: actionPropsType;
  ActionComponent: React.ReactNode;
  actionComponentProps: actionComponentPropsType;
  onActionClick: (props: onActionClickPropsType) => void;
  onActionSuccess: actionSuccessType;
}

export interface Components {
  TabBar?: React.ReactNode;
  FilterBar?: React.ReactNode;
  Datagrid?: React.ReactNode;
  Pagination?: React.ReactNode;
}
export interface ComponentProps {
  tabBar?;
  filterBar?;
  datagrid?;
  pagination?;
}

export interface CreateDatagridManyProps {
  singular: string;
  plurial: string;
  graphql: object;
  defaultComponents: Components;
  defaultComponentProps: ComponentProps;
}

export interface DatagridManyProps {
  query: string;
  columns: object[];
  where: object;
  onWhereChange: any;
  page: number;
  onPageNext: any;
  onPagePrevious: any;
  onGoTo: any;
  take: number;
  onTakeChange: any;
  skip: number = 0;
  sort: any;
  sortPinned: any;
  onSortChange: any;
  views: any;
  currentView: any;
  onViewChange: any;
  lang: string;
  components: Components = {};
  componentProps: ComponentProps = {};
}

interface ComponentsType {
  TabBar?: React.ReactNode;
  FilterBar?: React.ReactNode;
  Datagrid?: React.ReactNode;
  Pagination?: React.ReactNode;
}

interface ComponentPropsType {
  tabBar?;
  filterBar?;
  datagrid?;
  pagination?;
}

export interface graphqlType {
  findOne: (query: string) => DocumentNode;
  findMany: (query: string, lang?: boolean) => DocumentNode;
  count: () => DocumentNode;
  createOne: (query: string) => DocumentNode;
  createMany: () => object;
  updateOne: () => object;
  updateMany: () => object;
  deleteOne: () => object;
  deleteMany: () => object;
}

export interface createDatagridManyProps {
  singular: string;
  plurial: string;
  graphql: graphqlType;
  defaultComponents: ComponentsType;
  defaultComponentProps: ComponentPropsType;
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

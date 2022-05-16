import { useQuery } from '@apollo/client';
import { Box, Divider, Stack } from '@mui/material';
import { DialogConfirm, LayoutMain } from '@dots.cool/components';
import { useMemo } from 'react';
import withDotsSystem from '../hoc/with-dots-system';
import { GRAPHQL_REQUESTS, VIEW_MODES } from '@dots.cool/tokens';
import DEFAULT_COMPONENTS from '../components/default-components/default-components';

// Types
import { DotsIndexPageProps } from './types/dots-index-page';
import { isEmpty } from 'lodash';

const DotsIndexPage = (props: DotsIndexPageProps): JSX.Element => {
  const {
    variant = 'details',
    context,
    // Data
    query: _query,
    columns: _columns,
    // Filter
    filter,
    onFilterChange,
    withFilter,
    // Sort
    sort,
    sortPinned,
    onSortChange,
    withSort,
    // Pagination
    page,
    onPageNext,
    onPagePrevious,
    onGoTo,
    take,
    onTakeChange,
    skip = 0,
    hidePagination,
    // Tabs
    views,
    currentView,
    onViewChange,
    // Toolbar
    selectionModel,
    onSelectionModelChange,
    open,
    onOpenDialog,
    onCloseDialog,
    hideDialog,
    // viewMode
    viewMode,
    onViewModeChange,
    // Lang
    lang,
    // Components
    components = {},
    componentProps = {},
  } = props;

  //* COLUMNS & QUERY
  const _columnNames =
    _columns || context.views[GRAPHQL_REQUESTS.FindMany].fieldNames;
  const query = _query || context.views[GRAPHQL_REQUESTS.FindMany].query;

  const columns = _columnNames.map(
    (columnName: string) => context.columns[columnName]
  );

  //* QUERIES
  const { graphql, plurial } = context;

  const {
    [GRAPHQL_REQUESTS.FindMany]: findMany,
    [GRAPHQL_REQUESTS.Count]: countQuery,
  } = graphql;

  const mainQuery = useMemo(
    () => findMany(query, !!lang),
    [query, findMany, lang]
  );

  const _sort = sort.map(({ field, direction }) => ({
    [field]: direction,
  }));

  // -- Variables
  const variables = { skip, take, where: {}, orderBy: _sort, lang: '' };
  if (lang) {
    variables.lang = lang;
  }

  // -- Request
  const { loading, error, data, refetch } = useQuery(mainQuery, {
    variables: variables,
  });

  const aggregateQuery = useMemo(() => countQuery(), [countQuery]);
  const { data: aggregate } = useQuery(aggregateQuery, {
    variables: { where: {} },
  });

  // *COMPONENTS
  const mergedComponents = useMemo(
    () => ({
      ...DEFAULT_COMPONENTS,
      ...components,
    }),
    [components]
  );

  //* RENDER
  if (error || isEmpty(columns))
    return <LayoutMain>{`Error! oups`}</LayoutMain>;

  // -- COMPONENT-PROPS
  // -- Extract components
  const {
    ViewBar,
    FilterBar,
    Datagrid,
    Pagination,
    Toolbar,
    DialogContent,
    Cards,
    Topbar,
  } = mergedComponents;

  // -- Extract components props
  const {
    filterBar: filterBarProps,
    datagrid: datagridProps,
    dialog: dialogProps,
    topbar: topbarProps,
  } = componentProps;

  const DataViewerComponent = (
    <>
      <Box sx={{ flex: 1 }}>
        {viewMode === VIEW_MODES.Table && (
          <Datagrid
            query={query}
            graphql={graphql}
            lang={lang}
            rows={data?.[`${plurial}`] || []}
            columns={columns}
            loading={loading}
            selectionModel={selectionModel}
            onSelectionModelChange={onSelectionModelChange}
            onSubmitCallBack={refetch}
            components={datagridProps?.components}
            componentProps={datagridProps?.componentProps}
          />
        )}
        {viewMode === VIEW_MODES.Card && <Cards rows={data?.[`${plurial}`]} />}
      </Box>

      {!hidePagination && (
        <>
          <Divider />
          <Pagination
            page={page}
            take={take}
            onPageNext={onPageNext}
            onPagePrevious={onPagePrevious}
            onGoTo={onGoTo}
            onTakeChange={onTakeChange}
            totalCounts={aggregate?.[`${plurial}Count`] ?? 0}
          />
        </>
      )}
    </>
  );

  return (
    <>
      {variant === 'details' && (
        <Stack direction="column" height="100%" overflow="hidden">
          <ViewBar
            context={context}
            views={views}
            currentView={currentView}
            onViewChange={onViewChange}
          />
          <FilterBar
            context={context}
            // Sort
            sort={sort}
            sortPinned={sortPinned}
            onSortChange={onSortChange}
            withSort={withSort}
            // Filter
            filter={filter}
            onFilterChange={onFilterChange}
            withFilter={withFilter}
            // Action Btn
            actionText={filterBarProps?.actionText}
            actionPage={filterBarProps?.actionPage}
            onSubmitCallback={refetch}
          />
          <Divider />
          <Toolbar
            context={context}
            // Selection actions
            selectionModel={selectionModel}
            onActionClick={onOpenDialog}
            // ViewMode
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
          />
          {DataViewerComponent}
        </Stack>
      )}

      {variant === 'preview' && (
        <>
          <Topbar
            context={context}
            title={topbarProps?.title || plurial}
            actionText={topbarProps?.actionText}
            actionPage={topbarProps?.actionPage}
            fullscreenPage={topbarProps?.fullscreenPage}
          />
          <Stack height={400} mt={2}>
            {DataViewerComponent}
          </Stack>
        </>
      )}

      {!hideDialog && DialogContent && (
        <DialogConfirm open={!!open} onClose={onCloseDialog}>
          {open && (
            <DialogContent
              context={context}
              target={selectionModel}
              query={query}
              graphql={graphql}
              lang={lang}
              open={open}
              onSubmitCallback={refetch}
              onClose={onCloseDialog}
              components={dialogProps?.components || {}}
            />
          )}
        </DialogConfirm>
      )}
    </>
  );
};

export default withDotsSystem(DotsIndexPage);

import { useQuery } from '@apollo/client';
import { Box, Divider, Stack } from '@mui/material';
import { DialogConfirm, LayoutMain } from '@dots.cool/components';
import { useMemo } from 'react';
import _defaultComponents from '../components/default-components/default-components';
import withDotsSystem from '../hoc/with-dots-system';
import { GRAPHQL_REQUESTS, VIEW_MODES } from '@dots.cool/tokens';

// Types
import { DotsIndexPageProps } from './dots-index-page.d';

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
  const _columnNames = _columns || context.defaultColumns;
  const query = _query || context.defaultFindManyQuery;

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

  // -- Variables
  const variables = { skip, take, where: {}, orderBy: sort, lang: '' };
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
      ..._defaultComponents,
      ...components,
    }),
    [components]
  );

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

  //* RENDER
  if (error) return <LayoutMain>{`Error! ${error.message}`}</LayoutMain>;

  return (
    <>
      {variant === 'details' && (
        <Stack direction="column" height="100%" overflow="hidden">
          <ViewBar
            views={views}
            currentView={currentView}
            onViewChange={onViewChange}
          />
          <FilterBar
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

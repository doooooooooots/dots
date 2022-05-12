import { useQuery } from '@apollo/client';
import { Box, Divider, Stack } from '@mui/material';
import { DialogConfirm, LayoutMain } from '@dots.cool/components';
import { useMemo } from 'react';
import _defaultComponents from '../../libs/dots-system/src/components/default-components/default-components';
import withSmartness from '../hoc/with-smartness';
import {
  COUNT,
  FIND_MANY,
  VIEW_MODE_CARD,
  VIEW_MODE_TABLE,
} from '@dots.cool/tokens';

export default function createPageMany({
  singular,
  plurial,
  graphql,
  variant,
  defaultComponents = {},
  defaultComponentProps = {},
}: any) {
  // Generate component
  const IndexPage = (props: any) => {
    const {
      // Data
      query = 'id',
      columns = [{ field: 'id', headerName: 'ID' }],
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

    //* QUERIES
    const { [FIND_MANY]: findMany, [COUNT]: count } = graphql;
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

    const aggregateQuery = useMemo(() => count(), [count]);
    const { data: aggregate } = useQuery(aggregateQuery, {
      variables: { where: {} },
    });

    // *COMPONENTS
    const mergedComponents = useMemo(
      () => ({
        ..._defaultComponents,
        ...defaultComponents,
        ...components,
      }),
      [components]
    );

    // -- COMPONENT-PROPS
    const mergedProps = useMemo(
      () => ({
        ...defaultComponentProps,
        ...componentProps,
      }),
      [componentProps]
    );

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
    } = mergedProps;

    const DataViewerComponent = (
      <>
        <Box sx={{ flex: 1 }}>
          {viewMode === VIEW_MODE_TABLE && (
            <Datagrid
              rows={data?.[`${plurial}`] || []}
              columns={columns}
              loading={loading}
              selectionModel={selectionModel}
              onSelectionModelChange={onSelectionModelChange}
              onOpenDialog={onOpenDialog}
              components={datagridProps.components}
              componentProps={datagridProps.componentProps}
            />
          )}
          {viewMode === VIEW_MODE_CARD && <Cards rows={data?.[`${plurial}`]} />}
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
              actionText={filterBarProps.actionText}
              actionPage={filterBarProps.actionPage}
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
              title={topbarProps.title || plurial}
              actionText={topbarProps.actionText}
              actionPage={topbarProps.actionPage}
              fullscreenPage={topbarProps.fullscreenPage}
            />
            <Stack height={400} mt={2}>
              {DataViewerComponent}
            </Stack>
          </>
        )}

        {!hideDialog && DialogContent && (
          <DialogConfirm open={!!open} onClose={onCloseDialog}>
            <DialogContent
              graphql={graphql}
              query={query}
              lang={lang}
              open={open}
              selectionModel={selectionModel}
              onSubmitCallback={refetch}
              onClose={onCloseDialog}
              components={dialogProps.components}
              componentProps={dialogProps.componentProps}
            />
          </DialogConfirm>
        )}
      </>
    );
  };
  // Enhance with logic
  return withSmartness(IndexPage);
}

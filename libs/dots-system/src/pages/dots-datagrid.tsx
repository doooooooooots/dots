import { Box, Divider, Stack } from '@mui/material';
import { DialogConfirm, LayoutMain } from '@dots.cool/components';
import withDotsSystem from '../hoc/with-dots-system';
import { VIEW_MODES } from '@dots.cool/tokens';
import DEFAULT_COMPONENTS from '../components/default-components/default-components';

// Types
import { DotsIndexPageProps } from './types/dots-index-page';
import { isEmpty } from 'lodash';
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

const DotsDatagrid = (props: DotsIndexPageProps): JSX.Element => {
  const {
    variant = 'details',
    entityName,
    // Data
    rowsQuery,
    rowsGetter,
    aggregateQuery,
    aggregateGetter,
    columns,
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

  //* SORT
  //-> Sort from sort HOC
  const _sort = sort.map(({ field, direction }) => ({
    [field]: direction,
  }));

  //* WHERE
  //-> Where from where HOC
  const where = filter;
  // const where = {};

  //* REQUESTS
  //-> Create variable object
  const variables = { skip, take, where: where, orderBy: _sort, lang: '' };
  if (lang) {
    variables.lang = lang;
  }

  //-> GET FindMany datas && extract rows
  const { loading, error, data, refetch } = useQuery(rowsQuery, {
    variables: variables,
  });
  const rows = useMemo(() => rowsGetter(data), [rowsGetter, data]);

  //-> GET Aggregates && extract total count
  const { data: aggregate } = useQuery(aggregateQuery, {
    variables: { where: where },
  });
  const totalCounts = useMemo(
    () => aggregateGetter(aggregate),
    [aggregateGetter, aggregate]
  );

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

  // [ ](Adrien): Extract to a component
  const DataViewerComponent = (
    <>
      <Box sx={{ flex: 1 }}>
        {viewMode === VIEW_MODES.Table && (
          <Datagrid
            rows={rows}
            columns={columns}
            loading={loading}
            selectionModel={selectionModel}
            onSelectionModelChange={onSelectionModelChange}
            onSubmitCallBack={refetch}
            components={datagridProps?.components}
            componentProps={datagridProps?.componentProps}
          />
        )}
        {viewMode === VIEW_MODES.Card && <Cards rows={rows} />}
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
            totalCounts={totalCounts}
          />
        </>
      )}
    </>
  );

  // [ ](Adrien): Extract variants to component
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
            entityName={entityName}
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
            title={topbarProps?.title}
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
            // [ ](Adrien): Need query here for cache purpose
            <DialogContent
              entityName={entityName}
              target={selectionModel}
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

export default withDotsSystem(DotsDatagrid);

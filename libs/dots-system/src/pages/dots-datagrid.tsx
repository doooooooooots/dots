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

// [ ](Adrien): Check why request is send each time
const DotsDatagrid = (props: DotsIndexPageProps): JSX.Element => {
  const {
    variant = 'details',
    entityName,
    // Data
    columns,
    rowsQuery,
    rowsGetter,
    variables,
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
    hideViews,
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
  const _sort = useMemo(
    () =>
      sort.map(({ field, direction }) => ({
        [field]: direction,
      })),
    [sort]
  );

  //* WHERE
  //-> Where from where HOC
  // const where = filter;
  const where = useMemo(() => ({}), []);

  //* REQUESTS
  //-> GET FindMany datas && extract rows
  const { loading, error, data, refetch } = useQuery(rowsQuery, {
    variables: {
      ...(variables || {}),
      ...((lang && { lang: lang }) || {}),
      skip: skip,
      take: take,
      where: where,
      orderBy: _sort,
    },
  });
  const [rows, rowsCount] = useMemo(
    () => rowsGetter(data) || [],
    [rowsGetter, data]
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
            totalCounts={rowsCount}
          />
        </>
      )}
    </>
  );

  // [ ](Adrien): Extract variants to component
  return (
    <>
      {variant === 'details' && (
        <Stack direction="column" height="100%" overflow="hidden" width="100%">
          {!hideViews && (
            <ViewBar
              views={views}
              currentView={currentView}
              onViewChange={onViewChange}
            />
          )}
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

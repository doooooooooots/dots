import { Box, Divider, Stack } from '@mui/material';
import { DialogConfirm, ErrorPage, LayoutMain } from '@dots.cool/components';
import withDotsSystem from '../hoc/with-dots-system';
import { GRAPHQL_REQUESTS, VIEW_MODES } from '@dots.cool/tokens';
import DEFAULT_COMPONENTS from '../components/default-components/default-components';

// Types
import { isEmpty } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DotsIndexPageProps } from '../types/dots-index-page';
import { useDots } from '@dots.cool/schema';
import toast from 'react-hot-toast';
import FieldInput from '../components/entity/field/field-input';

const ENABLE_VIEWS = false;

// [ ](Adrien): Check why request is send each time
const DotsDatagrid = (props: DotsIndexPageProps): JSX.Element => {
  const {
    variant = 'details',
    entityName,

    // Data
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

  // Use to show user save loading state on enum and relationship cells
  const [loadingSave, setLoadingSave] = useState('');

  const { getSchema } = useDots();
  const {
    graphql,
    columnApi,
    fragments: { [variant]: query = '' },
  } = getSchema(entityName);

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

  //* QUERY --- FIND MANY
  //-> GET FindMany datas && extract rows
  const findMany = graphql[GRAPHQL_REQUESTS.FindMany](query);
  const { loading, error, data, refetch } = useQuery(findMany, {
    variables: {
      ...(variables || {}),
      ...((lang && { lang: lang }) || {}),
      skip: skip,
      take: take,
      where: where,
      orderBy: _sort,
    },
  });
  const rows = data?.rows;
  const rowsCount = data?.count;

  //* MUTATION --- UPDATE ONE
  const _mutation = graphql[GRAPHQL_REQUESTS.UpdateOne](query);
  const [update] = useMutation(_mutation);

  // -> Function which save data for one cell
  const saveData = useCallback(
    (id, key) => (newValue: unknown) => {
      setLoadingSave(`${id}_${key}`);
      toast.promise(
        update({
          variables: {
            where: { id: id },
            data: { [key]: newValue },
          },
        }).then(({ data }) => {
          refetch();
          setLoadingSave('');
        }),
        {
          loading: 'Sauvegarde ...',
          success: 'La cellule a été mise à jour',
          error: 'Erreur lors de la mise à jour',
        }
      );
    },
    [refetch, update]
  );

  // *COMPONENTS
  const mergedComponents = useMemo(
    () => ({
      ...DEFAULT_COMPONENTS,
      ...components,
    }),
    [components]
  );

  // *COLUMNS
  const _columns = useMemo(
    () =>
      columnApi.getColumnsFromFragment(variant).map((column) => {
        const { field, type, options } = column;

        return {
          ...column,
          align: 'left',
          type: 'text',
          renderCell: ({ id, value }: { id: string; value: number }) => (
            <FieldInput
              name={field}
              loading={loadingSave === `${id}_${field}`}
              type={type}
              value={value}
              options={options}
              variant="button"
              onChange={saveData(id, field)}
            />
          ),
        };
      }),
    [columnApi, loadingSave, variant, saveData]
  );

  //* RENDER
  if (error)
    return (
      <LayoutMain>
        <ErrorPage message="Error while fetching data or in columns creation. Check dots-datagrid" />
      </LayoutMain>
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

  // [ ](Adrien): Extract to a component
  const DataViewerComponent = (
    <>
      <Box sx={{ flex: 1 }}>
        {viewMode === VIEW_MODES.Table && (
          <Datagrid
            rows={rows || []}
            columns={_columns}
            entityName={entityName}
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
            loading={loading}
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
          {ENABLE_VIEWS && !hideViews && (
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

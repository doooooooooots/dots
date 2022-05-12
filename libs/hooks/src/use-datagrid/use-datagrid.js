import { useCallback } from 'react';
import { useMap } from 'react-use';

const useDatagrid = () => {
  const [map, { set, setAll, reset }] = useMap({
    isLoading: false,
    rows: [],
    page: [],
    pageSize: 50,
    selectionModel: [],
    sortModel: []
  });

  const onPageChange = useCallback(
    (newModel) => {
      set('page', newModel);
    },
    [set]
  );

  const onPageSizeChange = useCallback(
    (newModel) => {
      set('pageSize', newModel);
    },
    [set]
  );

  const onSelectionModelChange = useCallback(
    (newModel) => {
      set('selectionModel', newModel);
    },
    [set]
  );

  const onSortModelChange = useCallback(
    (newModel) => {
      set('sortModel', newModel);
    },
    [set]
  );

  const loadRows = useCallback(
    (rows) => {
      set('rows', rows);
    },
    [set]
  );

  const load = useCallback(
    (params) => {
      setAll(params);
    },
    [setAll]
  );

  return {
    // Attributes
    isLoading: map.isLoading,
    rows: map.rows,
    page: map.page,
    pageSize: map.pageSize,
    selectionModel: map.selectionModel,
    sortModel: map.sortModel,
    // Methods
    reset,
    load,
    loadRows,
    onPageChange,
    onPageSizeChange,
    onSelectionModelChange,
    onSortModelChange
  };
};

export default useDatagrid
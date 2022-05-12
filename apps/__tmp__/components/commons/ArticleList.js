import React, { useCallback, useMemo } from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useDispatch, useSelector } from '_trash/store/store';
import { setValue } from '_trash/slices/article';

export default function ListArticles(props) {
  const { columns, filterRowList, ...other } = props;
  const dispatch = useDispatch();
  const { articles, selectionModel } = useSelector((state) => state.article);
  const { rows: storeRows } = articles;

  const rows = useMemo(() => {
    if (filterRowList && filterRowList.length) {
      return storeRows.filter((item) => !filterRowList.includes(item.id));
    }
    return storeRows;
  }, [storeRows, filterRowList]);

  const handleSelectionModelChange = useCallback(
    (newModel) => {
      dispatch(setValue('selectionModel', newModel));
    },
    [dispatch]
  );

  return (
    <DataGridPro
      sx={{ height: '100%', borderRadius: 3 }}
      rows={rows}
      columns={columns}
      density='compact'
      selectionModel={selectionModel}
      onSelectionModelChange={handleSelectionModelChange}
      // sortModel={sortModel}
      // onSortModelChange={(model) => setSortModel(model)}
      // getRowClassName={(params) => {
      //   let output = '';
      //   if (
      //     params.row.condition === article.condition &&
      //     params.row.isFirstEd === article.isFirstEd &&
      //     params.row.language.idLanguage === article.languageId
      //   ) {
      //     output += 'is--cool ';
      //   }
      //   if (params.row.price >= global.q3) {
      //     output += 'is--highlighted';
      //   }
      //   if (!output) {
      //     return 'is--different';
      //   }
      //   return output;
      // }}
      {...other}
    />
  );
}

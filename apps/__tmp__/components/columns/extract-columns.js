const extractColumns = (columns, columnNames = ['id'], showId = true) => {
  const output = [];
  columnNames.forEach((columnName) => {
    if (!(columnName === 'id' && !showId)) {
      if (columnName in columns) {
        output.push(columns[columnName]);
      } else {
        output.push({ field: columnName, headerName: columnName });
      }
    }
  });
  return output.filter((i) => i);
};

export default extractColumns;

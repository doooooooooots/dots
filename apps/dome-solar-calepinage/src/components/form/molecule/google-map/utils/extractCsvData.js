import Papa from 'papaparse';

/**
 * Format csv file into an object array
 * */

export const extractCsvData = async (csvData) => {
  const response = await fetch(csvData);
  const reader = response.body.getReader();
  const result = await reader.read(); // raw array
  const decoder = new TextDecoder('iso-8859-1');
  const csv = decoder.decode(result.value); // the csv text
  const results = Papa.parse(csv, { header: true }); // addressect with { data, errors, meta }
  const myCsvReformat = results.data; // array of addressects
  return myCsvReformat;
};

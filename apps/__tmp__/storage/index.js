import React from 'react';
import extractColumns from '../../src/components/columns/extract-columns';
import { STORAGE_COLUMNS } from '../../src/components/columns/storage-columns';
import StorageMany from '../../src/components/datagrids/storage-many';
import Layout from '../../src/components/layouts/layout';
const query = `
  id
  name
  game {
    name
  }
`;

const columns = extractColumns(STORAGE_COLUMNS, ['id', 'name', 'game']);

const Storages = (props) => {
  return <StorageMany {...props} columns={columns} query={query} />;
};

Storages.getLayout = (page) => <Layout>{page}</Layout>;
export default Storages;

// TODO(Adrien): Import SSR LOGIC -- see getStaticObjects in pages/_utils

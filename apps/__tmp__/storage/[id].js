import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../src/components/layouts/layout';
import LayoutMain from '../../src/components/layouts/layout-main';
import StorageSingle from '../../src/components/single/storage-single';

const Storage = (props) => {
  const { query } = useRouter();
  const { id } = query;
  return (
    <StorageSingle
      {...props}
      query={'id name game { name }'}
      where={{ id }}
      skip={!id}
    />
  );
};

Storage.getLayout = (page) => (
  <Layout>
    <LayoutMain>{page}</LayoutMain>
  </Layout>
);
export default Storage;

// TODO(Adrien): Import SSR LOGIC -- see getStaticObjects in pages/_utils

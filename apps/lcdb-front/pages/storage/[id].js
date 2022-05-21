import StorageSingle from '@components/single/storage-single';
import { Layout, LayoutMain } from '@dots.cool/components';
import { useRouter } from 'next/router';
import React from 'react';

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

// [ ](Adrien): Import SSR LOGIC -- see getStaticObjects in pages/_utils

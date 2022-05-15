import React from 'react';
import StorageFormCreate from '../../src/components/d_formulaire/storage-form-create';

const formatDatas = () => {
  // if (!data) return undefined;
  // const _data = { ...data };
  // const { prices, plateform } = _data;
  // // Transform to connect
  // if (plateform && plateform.id) {
  //   _data.plateform = { connect: { id: plateform.id } };
  // } else {
  //   delete _data.plateform;
  // }
  // if (prices) {
  //   _data.prices = { create: { value: parseInt(prices, 10) } };
  // }
  // // Format datas
  // _data.eligibleQuantity = parseInt(_data.eligibleQuantity, 10);
  // return await createOffer({ variables: { data: _data } });
};

function createPage() {
  return <StorageFormCreate id="single-storage-create" />;
}

export default createPage;

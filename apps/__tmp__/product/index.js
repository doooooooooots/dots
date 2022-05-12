import React from 'react';
import Layout from '@components/layouts/Layout';
import { PRODUCT_DEFAULT_COLUMNS } from 'src/constants';
import Products from '@components/products/products';
import ProductCreate from '@components/forms/product-create';

const components = {
  action: ProductCreate
};

function ProductsIndex(props) {
  return (
    <Products columns={PRODUCT_DEFAULT_COLUMNS} actionText='Créer un produit' components={components} {...props} />
  );
}

ProductsIndex.getLayout = (page) => <Layout>{page}</Layout>;
export default ProductsIndex;

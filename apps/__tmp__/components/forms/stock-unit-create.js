import * as React from 'react';
import { Container, Stack } from '@mui/material';
import { debounce, isEmpty } from 'lodash';
import { gql, useQuery } from '@apollo/client';
import formatNumber from '@helpers/product/format-number';
import Input from '@mui/material/Input';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import StockUnitCreateRow from '@components/forms/stock-unit-create-row';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';

const DEBOUNCE_TIME = 400;

const GET_PRODUCT_BY_SEARCH = gql`
  query searchProductByNumber($where: ProductWhereInput! = {}, $lang: String) {
    products(where: $where, take: 10) {
      ...stockUnitCreateRowFragment
    }
  }
  ${StockUnitCreateRow.fragments.product}
`;

export default function StockUnitCreate(props) {
  const { onSubmitCallback } = props;

  const router = useRouter();
  const { id } = router.query;

  const {
    loading,
    error,
    data = {},
    refetch
  } = useQuery(GET_PRODUCT_BY_SEARCH, {
    variables: { where: {}, $lang: 'fr' }
  });

  // *FUNC - Listen input changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedRefetch = React.useCallback(
    debounce((where) => refetch(where), DEBOUNCE_TIME),
    []
  );
  const handleChange = (event) => {
    const { value } = event.target;

    let search = value.replace(' ', '-').split('-');
    let expansion = { abbreviation: { contains: search[0], mode: 'insensitive' } };
    let number = { contains: formatNumber(search[1]), mode: 'insensitive' };

    let _where = {};
    if (search[1]) {
      _where = { AND: [{ number }, { expansion }] };
    } else {
      _where = { expansion };
    }
    debouncedRefetch({ where: _where });
  };

  // *FUNC - Listen input changes
  const handleSubmit = () => {
    if (onSubmitCallback && typeof onSubmitCallback === 'function') onSubmitCallback();
  };

  const { products } = data;
  if (error) return `Error! ${error.message}`;

  return (
    <Container maxWidth='lg'>
      <Stack direction='row' alignItems='flex-end' spacing={2} mb={3}>
        <Input
          startAdornment={<SearchOutlinedIcon />}
          placeholder='ex: ABYR-001 (ou) ABYR-1 (ou) ABYR 001 (ou) ABYR 1'
          onChange={handleChange}
          fullWidth
        />
      </Stack>
      {!isEmpty(products) ? (
        products.map((product) => (
          <StockUnitCreateRow key={product.id} product={product} storageId={id} onSubmit={handleSubmit} />
        ))
      ) : (
        <>{loading ? 'Loading...' : 'Doh !'}</>
      )}
      <Box mt={2}>Pagination</Box>
    </Container>
  );
}

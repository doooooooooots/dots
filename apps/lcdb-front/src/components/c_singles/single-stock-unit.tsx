import React from 'react';
import withQuery from '../b_hoc/with-query';
import { FIND_MANY } from '@dots.cool/tokens';

function SingleStockUnit(props) {
  const { loading, data, refetch } = props;
  return (
    <div>
      <code>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </code>
    </div>
  );
}

export default withQuery('category')(true)(FIND_MANY)(SingleStockUnit);

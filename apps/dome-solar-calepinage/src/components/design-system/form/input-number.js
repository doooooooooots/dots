import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../context/useStore';

const InputNumber = (props) => {
  const { element } = props;

  const store = useStore();

  const handleChange = (e) => {
    if (e.target.name === 'userMaxCol') {
      store.setUserData(
        'userMaxCol',
        Math.min(Math.max(1, e.target.value), store.maxCol)
      );
      return true;
    }

    if (e.target.name === 'userMaxRow') {
      store.setUserData(
        'userMaxRow',
        Math.min(Math.max(1, e.target.value), store.maxRow)
      );
      return true;
    }

    if (e.target.name === 'PigeX0' && store.getUserDatas('isPigeSymetrical')) {
      store.setUserData('PigeX1', parseFloat(e.target.value, 10) || 0);
    }

    if (e.target.name === 'PigeMX0' && store.getUserDatas('isPigeSymetrical')) {
      store.setUserData('PigeMX1', parseFloat(e.target.value, 10) || 0);
    }

    store.setUserData(e.target.name, parseFloat(e.target.value, 10) || 0);
    return true;
  };

  return (
    <Input
      id={element.id}
      name={element.id}
      label={element.id}
      type={element.type}
      value={store.userDatas[element.id] || ''}
      onChange={handleChange}
      disabled={
        !!(
          (element.id === 'PigeMX1' &&
            store.getUserDatas('isPigeSymetrical')) ||
          (element.id === 'PigeX1' && store.getUserDatas('isPigeSymetrical'))
        )
      }
      required
    />
  );
};

InputNumber.propTypes = {
  element: PropTypes.any,
};

export default observer(InputNumber);

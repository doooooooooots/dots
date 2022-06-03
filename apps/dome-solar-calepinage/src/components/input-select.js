import React from 'react';
import { MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { useStore } from './context/useStore';

const InputSelect = (props) => {
  const { element } = props;

  const options = [];

  const store = useStore();

  const handleChange = (e) => {
    store.setUserData(e.target.name, parseFloat(e.target.value, 10));
  };

  Object.entries(element.options).forEach(([key, value]) => {
    options.push(
      <MenuItem key={key} value={key}>
        {value}
      </MenuItem>
    );
  });

  return (
    <Select
      labelId={`label-${element.id}`}
      id={element.id}
      name={element.id}
      value={store.userDatas[element.id] || 0}
      onChange={handleChange}
      size='small'
      required
    >
      {options}
    </Select>
  );
};

InputSelect.propTypes = {
  element: PropTypes.any
};

export default observer(InputSelect);

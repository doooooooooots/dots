import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from './context/useStore';

const InputString = (props) => {
  const { element } = props;

  const store = useStore();

  const handleChange = (e) => {
    store.setUserData(e.target.name, e.target.value, false);
  };

  return (
    <TextField
      id={element.id}
      name={element.id}
      label={element.label}
      variant='standard'
      size='small'
      // placeholder={element.label}
      type={element.type}
      value={store.userDatas[element.id] || ''}
      onChange={handleChange}
      sx={{ mt: 2 }}
      fullWidth
    />
  );
};

InputString.propTypes = {
  element: PropTypes.any
};

export default observer(InputString);

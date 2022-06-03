import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from './context/useStore';

const InputCheckbox = (props) => {
  const { element } = props;

  const store = useStore();

  const handleChange = (e) => {
    store.setUserData(e.target.name, e.target.checked, false);
    if (e.target.name === 'isPigeSymetrical' && e.target.checked) {
      store.setUserData('PigeX1', store.getUserDatas('PigeX0'));
      store.setUserData('PigeMX1', store.getUserDatas('PigeMX0'));
    }
  };

  return (
    <FormControlLabel
      control={
        <Checkbox id={element.id} name={element.id} onChange={handleChange} checked={!!store.userDatas[element.id]} />
      }
      label={element.id}
    />
  );
};

InputCheckbox.propTypes = {
  element: PropTypes.any
};

export default observer(InputCheckbox);

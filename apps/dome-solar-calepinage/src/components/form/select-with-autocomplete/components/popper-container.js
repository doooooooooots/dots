import React from 'react';
import PopperList from './popper-list';

export default function PopperContainer(props) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <PopperList {...other} />;
}

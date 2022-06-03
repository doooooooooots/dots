import React from 'react';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import ButtonBase from './button-base';

function ButtonFile(props) {
  const { tooltip = 'file', count = 0 } = props;

  return (
    <ButtonBase tooltip={tooltip} icon={<AttachFileOutlinedIcon />}>
      {count}
    </ButtonBase>
  );
}

export default ButtonFile;

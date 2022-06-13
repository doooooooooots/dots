import React from 'react';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import ButtonBase from './button-base';

function ButtonFile(props) {
  const { tooltip = 'file', count = 0, variant = 'outlined' } = props;

  return (
    <ButtonBase
      tooltip={tooltip}
      startIcon={<AttachFileOutlinedIcon />}
      variant={variant}
    >
      {count}
    </ButtonBase>
  );
}

export default ButtonFile;

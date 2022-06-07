import React from 'react';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import ButtonBase from './button-base';

function ButtonAnalytic(props) {
  const { tooltip = 'analytic', count = 0, variant = 'outlined' } = props;

  return (
    <ButtonBase
      tooltip={tooltip}
      startIcon={<InsertChartOutlinedOutlinedIcon />}
      variant={variant}
    >
      {count}
    </ButtonBase>
  );
}

export default ButtonAnalytic;

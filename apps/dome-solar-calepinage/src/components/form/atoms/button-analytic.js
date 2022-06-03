import React from 'react';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import ButtonBase from './button-base';

function ButtonAnalytic(props) {
  const { tooltip = 'analytic', count = 0 } = props;

  return (
    <ButtonBase tooltip={tooltip} icon={<InsertChartOutlinedOutlinedIcon />}>
      {count}
    </ButtonBase>
  );
}

export default ButtonAnalytic;

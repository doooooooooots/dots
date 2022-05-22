import React from 'react';
import { gql } from '@apollo/client';
import PopperSelectFromDb from '../popper-select-from-db';
import CalendarViewWeekOutlined from '@mui/icons-material/CalendarViewWeekOutlined';
import { PAGE_CLADDING } from '../../constants';

const GET_CLADDINGS = gql`
  query GetCladdings {
    claddings {
      id
      name
    }
  }
`;

const TabCladding = () => {
  return (
    <PopperSelectFromDb
      name={PAGE_CLADDING}
      query={GET_CLADDINGS}
      icon={<CalendarViewWeekOutlined />}
      getDatas={(data) => data?.claddings}
      getRowDatas={(row) => ({
        id: row.id,
        name: row.name,
      })}
      canAdd
    />
  );
};

export default TabCladding;

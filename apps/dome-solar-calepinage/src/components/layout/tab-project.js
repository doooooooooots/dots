import React, { useCallback } from 'react';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { People } from '@mui/icons-material';
import PopperSelectFromDb from '../popper-select-from-db';
import { PAGE_PROJECT } from '../../constants';

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      status
      city
      identifier
      name
      status
      dateReception
      dateDelivery
    }
  }
`;

const TabProject = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleClick = useCallback(
    (element) => () => {
      console.log(element);
    },
    []
  );

  return (
    <PopperSelectFromDb
      name={PAGE_PROJECT}
      query={GET_PROJECTS}
      variables={{ id }}
      icon={<People />}
      skip={!id}
      onClick={handleClick}
      getDatas={(data) => data?.projects}
      getRowDatas={(row) => ({
        id: row.id,
        name: row.name,
      })}
      canAdd
    />
  );
};

export default TabProject;

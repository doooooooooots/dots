import React from 'react';
import { Alert, Typography, Button } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../context/useStore';
import { gql, useLazyQuery, useQuery } from '@apollo/client';

const IS_ALLOWED = gql`
  query IsAllowed($data: JSON) {
    isAllowed(data: $data) {
      message
      status
      errors
      data
    }
  }
`;

// const fetchTest = async (bodyObj) => {
//   const myHeaders = new Headers();
//   myHeaders.append('Content-Type', 'application/json');

//   var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: JSON.stringify(bodyObj),
//     redirect: 'follow',
//   };

//   const res = await fetch(
//     'https://dome-solar-backoffice--staging.herokuapp.com/api/is-allowed',
//     requestOptions
//   );

//   return await res.json();
// };

function SidebarLayoutTest() {
  const { getAllRelatedData, setIsPassingTests } = useStore();
  const [checkIsAllowed] = useLazyQuery(IS_ALLOWED);

  const handleTestButtonClick = React.useCallback(async () => {
    const relatedData = getAllRelatedData();
    const test = await checkIsAllowed({ variables: { data: relatedData } });
    console.log(test);
    setIsPassingTests(true);
  }, [setIsPassingTests, getAllRelatedData]);

  return (
    <Alert severity="error">
      <Typography variant="body2" sx={{ mb: 2 }}>
        Le calepinage n&apos;a pas été testé avec les paramètres actuels
      </Typography>
      <Button
        size="small"
        variant="outlined"
        color="error"
        onClick={handleTestButtonClick}
      >
        Vérifier
      </Button>
    </Alert>
  );
}

export default observer(SidebarLayoutTest);

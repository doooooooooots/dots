import React from 'react';
import {
  Alert,
  Typography,
  Button,
  Stack,
  Avatar,
  IconButton,
  Divider,
} from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../contexts/useStore';
import { gql, useLazyQuery } from '@apollo/client';
import { Box } from '@mui/system';
import { isEmpty } from 'lodash';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import pluralize from 'pluralize';

const formatData = ({
  project: { areaSea, areaSnow, areaWind, areaField, altitude },
  solarModule: { lengthX, lengthY, lengthZ, frameType },
  cladding: {
    numberOfWaves,
    lengthZ: _cLengthZ,
    lengthY: _cLengthY,
    thickness,
  },
  roof: { purlinBetweenAxis },
}) => ({
  local: 'fr',
  project: {
    areaSea,
    areaSnow,
    areaWind,
    areaField,
    altitude,
  },
  solarModule: {
    lengthX,
    lengthY,
    lengthZ,
    frameType,
  },
  cladding: {
    numberOfWaves,
    lengthY: _cLengthY,
    lengthZ: _cLengthZ,
    thickness,
  },
  roof: {
    purlinBetweenAxis,
  },
});

const IS_ALLOWED = gql`
  query IsAllowed($data: JSON) {
    isAllowed(data: $data) {
      data
      errors
      message
      status
    }
  }
`;

const TestResult = (props) => {
  const { product, isPassingChecks, infos } = props;
  return (
    <Box boxShadow={8} p={1} borderRadius={1}>
      {/**
       * Error summary
       */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar
          sx={{
            bgcolor: isPassingChecks ? 'success.main' : 'error.main',
            width: 30,
            height: 30,
          }}
        >
          {isPassingChecks ? <CheckIcon /> : <CloseIcon />}
        </Avatar>
        <Box flex={1}>
          <Typography variant="body2" fontWeight="bold" lineHeight={1}>
            {product}
          </Typography>
          <Typography variant="caption" lineHeight={1}>
            {pluralize('erreur', infos.length, true)}
          </Typography>
        </Box>
        <Box>
          <IconButton size="small">
            <ErrorOutlineIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Stack>

      {/**
       * Error details
       */}
      {infos.length > 0 && (
        <>
          <Divider variant="middle" sx={{ my: 1 }} />
          <Typography variant="body2" fontWeight="bold">
            Détails:
          </Typography>
          <Stack spacing={1} as="ul">
            {infos.map((info, index) => (
              <Typography key={index} component="li" variant="caption">
                {info}
              </Typography>
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
};

function SidebarLayoutTest() {
  const { getAllRelatedData, getRelatedData, setRelatedData, isPassingTests } =
    useStore();
  const [checkIsAllowed, { loading, error }] = useLazyQuery(IS_ALLOWED);

  const tests = getRelatedData('tests');

  /**
   * Send test to API when button is clicked
   */
  const handleTestButtonClick = React.useCallback(async () => {
    const { project, solarModule, roof = {} } = getAllRelatedData();
    const { cladding } = roof;

    if (!(project && solarModule && cladding && roof)) return;

    const { data } = await checkIsAllowed({
      variables: { data: formatData({ project, solarModule, cladding, roof }) },
    });

    if (!isEmpty(data) && isEmpty(data?.isAllowed?.errors))
      setRelatedData('tests', data?.isAllowed?.data);
  }, [getAllRelatedData, checkIsAllowed, setRelatedData]);

  /**
   * Render
   */
  if (loading) return 'loading...';
  if (error) return 'Error...';

  return (
    <Box p={2}>
      {isEmpty(tests) ? (
        <Alert severity="error">
          <Typography variant="body2" sx={{ mb: 2 }}>
            Le calepinage n&apos;a pas été testé avec les paramètres actuels
          </Typography>
        </Alert>
      ) : (
        <Box>
          {tests?.map(({ product, isPassingChecks, info }, index) => (
            <TestResult
              key={index}
              product={product}
              isPassingChecks={isPassingChecks}
              infos={info}
            />
          ))}
        </Box>
      )}
      <Divider sx={{ my: 2 }} />
      <Button
        size="small"
        variant="outlined"
        color="error"
        onClick={handleTestButtonClick}
        disabled={isPassingTests()}
      >
        Vérifier
      </Button>
    </Box>
  );
}

export default observer(SidebarLayoutTest);

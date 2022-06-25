import React from 'react';
import { Stack, Divider, Alert } from '@mui/material';
import { useStore } from '../../../contexts/useStore';
import { useMutation, gql } from '@apollo/client';
import { toast } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';

// Icons
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';

const CREATE_LAYOUT = gql`
  mutation CreateLayout($data: LayoutCreateInput!) {
    layout: createLayout(data: $data) {
      id
      massBalance
    }
  }
`;

const UPDATE_LAYOUT = gql`
  mutation UpdateLayout(
    $where: LayoutWhereUniqueInput!
    $data: LayoutUpdateInput!
  ) {
    layout: updateLayout(where: $where, data: $data) {
      id
      massBalance
    }
  }
`;

function SidebarLayoutExport() {
  const store = useStore();
  const {
    setIsLoading,
    resetSnaps,
    countToSnap,
    setCurrentPage,
    getRelatedData,
    getSummaryModules,
    setRelatedData,
    isPassingTests,
  } = store;

  const layout = getRelatedData('layout');

  //-> Functions
  const [createLayout, { loading }] = useMutation(CREATE_LAYOUT);
  const [updateLayout, { loading: loadingUpdate }] = useMutation(UPDATE_LAYOUT);

  const handleSave = React.useCallback(async () => {
    const getModuleSummary = getSummaryModules();

    const project = getRelatedData('project');
    const { id: roofId } = getRelatedData('roof');
    const { id: solarModuleId } = getRelatedData('solarModule');
    const { id: productId } = getRelatedData('product');

    let variables = {
      data: {
        name: `${project?.name || ''} - Calepinage`,
        moduleQuantity: {
          top: getModuleSummary.top,
          middle: getModuleSummary.middle,
          bottom: getModuleSummary.bottom,
        },
        solarEdge: false,
        roof: {
          connect: {
            id: roofId,
          },
        },
        product: {
          connect: {
            id: productId,
          },
        },
        solarModule: {
          connect: {
            id: solarModuleId,
          },
        },
      },
    };

    let func = null;
    if (layout?.id) {
      variables.where = { id: layout.id };
      func = updateLayout;
    } else {
      func = createLayout;
    }

    const response = await toast.promise(func({ variables: variables }), {
      loading: 'Sauvegarde ...',
      success: 'Le layout a été mis à jour',
      error: 'Erreur lors de la mise à jour',
    });

    setRelatedData('massBalance', response?.data?.layout?.massBalance || '[]');
  }, [
    createLayout,
    getRelatedData,
    getSummaryModules,
    layout?.id,
    setRelatedData,
    updateLayout,
  ]);

  const handleSaveClick = async () => {
    await handleSave();
    setCurrentPage('massBalance');
  };

  const handleGeneratePdfClick = async () => {
    await handleSave();
    setIsLoading(true);
    resetSnaps();
    await countToSnap({
      id: 'global',
      name: 'Global view',
    });
    setCurrentPage('rails');
  };

  return (
    <>
      {!isPassingTests() && (
        <Stack spacing={1} p={1}>
          <Alert severity="error">
            Attention, le calepinage n&apos;a pas passé les tests
          </Alert>

          <Alert severity="info">
            Le calepinage sera sauvegardé automatiquement avant d&apos;effectuer
            les actions
          </Alert>
        </Stack>
      )}
      <Divider flexItem />

      <Stack justifyContent="flex-start" alignItems="flex-start">
        <LoadingButton
          size="small"
          variant="standard"
          loading={loading || loadingUpdate}
          loadingPosition="start"
          startIcon={<RemoveRedEyeOutlinedIcon />}
          endIcon={<ArrowForwardIosOutlinedIcon />}
          onClick={handleSaveClick}
          fullWidth
          sx={{
            justifyContent: 'flex-start',
            '& .MuiButton-endIcon': {
              marginLeft: 'auto',
            },
          }}
        >
          Voir le bilan matière
        </LoadingButton>

        <Divider flexItem />

        <LoadingButton
          size="small"
          variant="standard"
          loading={loading || loadingUpdate}
          loadingPosition="start"
          startIcon={<PictureAsPdfOutlinedIcon />}
          endIcon={<ArrowForwardIosOutlinedIcon />}
          onClick={handleGeneratePdfClick}
          fullWidth
          sx={{
            justifyContent: 'flex-start',
            '& .MuiButton-endIcon': {
              marginLeft: 'auto',
            },
          }}
        >
          Générer le pdf
        </LoadingButton>
        <Divider flexItem />
      </Stack>
    </>
  );
}

export default SidebarLayoutExport;

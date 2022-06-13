import React from 'react';
import { Stack, Button, Divider, Alert } from '@mui/material';
import { useStore } from '../../context/useStore';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { useMutation, gql } from '@apollo/client';
import { toast } from 'react-hot-toast';

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

  const handleSaveClick = React.useCallback(async () => {
    const getModuleSummary = getSummaryModules();

    const project = getRelatedData('project');
    const { id: roofId } = getRelatedData('roof');
    const { id: solarModuleId } = getRelatedData('solarModule');
    const { id: productId } = getRelatedData('product');

    let variables = {
      data: {
        name: `${project?.name || ''} - Calepinage`,
        status: 'status_draft',
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

    setRelatedData(
      'massBalance',
      JSON.parse(response?.data?.layout?.massBalance || '[]')
    );
  }, [
    createLayout,
    getRelatedData,
    getSummaryModules,
    layout?.id,
    setRelatedData,
    updateLayout,
  ]);

  const handleGeneratePdfClick = async () => {
    setIsLoading(true);
    resetSnaps();
    await countToSnap({
      id: 'global',
      name: 'Global view',
    });
    setCurrentPage('rails');
    // Switch form page to page
  };

  return (
    <>
      {!isPassingTests() && (
        <Alert severity="warning">
          Attention, le calepinage n&apos;a pas passé les tests
        </Alert>
      )}

      <Stack justifyContent="flex-start" alignItems="flex-start">
        <Button
          size="small"
          variant="standard"
          startIcon={<RemoveRedEyeOutlinedIcon />}
          endIcon={<ArrowForwardIosOutlinedIcon />}
          onClick={handleSaveClick}
        >
          Voir le bilan matière
        </Button>
        <Divider flexItem />
        <Button
          size="small"
          variant="standard"
          startIcon={<PictureAsPdfOutlinedIcon />}
          endIcon={<ArrowForwardIosOutlinedIcon />}
          onClick={handleGeneratePdfClick}
        >
          Générer le pdf
        </Button>
        <Divider flexItem />
      </Stack>
    </>
  );
}

export default SidebarLayoutExport;

import * as React from 'react';
import { useStore } from '../context/useStore';
import { observer } from 'mobx-react';
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Stack,
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AccordeonGenerator from './accordeon-generator';
import AccordeonObstacle from './accordeon-obstacle';
import SideInfobox from './sidebar-layout-infobox';
import SidebarLayoutTest from './sidebar-layout-test';
import { gql, useMutation } from '@apollo/client';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { Box } from '@mui/system';
import toast from 'react-hot-toast';

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

function SideDefault() {
  const store = useStore();
  const { getRelatedData } = store;

  const layout = getRelatedData('layout');

  //-> Accordeons - Manage accordeon states
  const [expanded, setExpanded] = React.useState('');
  const handleChangeTab = (panel) => (_, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  //-> Dialog
  const [open, setOpen] = React.useState(false);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  //-> Functions
  const [createLayout, { loading }] = useMutation(CREATE_LAYOUT);
  const [updateLayout, { loading: loadingUpdate }] = useMutation(UPDATE_LAYOUT);

  const handleSaveClick = React.useCallback(async () => {
    const getModuleSummary = store.getSummaryModules();

    const project = store.getRelatedData('project');
    const { id: roofId } = store.getRelatedData('roof');
    const { id: solarModuleId } = store.getRelatedData('solarModule');
    const { id: productId } = store.getRelatedData('product');

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

    store.setRelatedData(
      'massBalance',
      JSON.parse(response?.data?.layout?.massBalance || '[]')
    );
  }, [createLayout, layout?.id, store, updateLayout]);

  const handleGeneratePdfClick = async () => {
    store.setIsLoading(true);
    store.resetSnaps();
    await store.countToSnap({
      id: 'global',
      name: 'Global view',
    });
    store.setCurrentPage('rails');
    // Switch form page to page
  };

  return (
    <>
      {/*//* Generator */}
      <AccordeonGenerator
        expanded={expanded === 'generator'}
        onChange={handleChangeTab('generator')}
      />
      {/*//* Obstacles */}
      <AccordeonObstacle
        expanded={expanded === 'obstacles'}
        onChange={handleChangeTab('obstacles')}
      />

      {/*//* Info box */}
      <SideInfobox />
      <Divider />

      {/*//* Actions */}
      <Box p={2}>
        {!store.isPassingTests() ? (
          <SidebarLayoutTest />
        ) : (
          <Alert severity="success">Tests ok</Alert>
        )}
      </Box>

      <Divider />

      {store.isPassingTests() && (
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
        </Stack>
      )}

      <Divider flexItem />
      <Stack p={2}>
        <Button
          aria-label="delete"
          size="small"
          variant="contained"
          onClick={handleSaveClick}
          startIcon={<SaveOutlinedIcon fontSize="inherit" />}
        >
          Enregistrer
        </Button>
      </Stack>

      {/*//* Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogContent>
          <pre>
            <code>
              {JSON.stringify(store.getRelatedData('massBalance'), null, 2)}
            </code>
          </pre>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default observer(SideDefault);

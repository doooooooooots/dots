import * as React from 'react';
import { useStore } from '../context/useStore';
import { observer } from 'mobx-react';
import { Button, Dialog, DialogContent, Divider, Stack } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AccordeonGenerator from './accordeon-generator';
import AccordeonObstacle from './accordeon-obstacle';
import SideInfobox from './sidebar-layout-infobox';
import SidebarLayoutTest from './sidebar-layout-test';
import { gql, useMutation } from '@apollo/client';
import { isEmpty } from 'lodash';

const CREATE_LAYOUT = gql`
  mutation CreateLayout($data: LayoutCreateInput!) {
    createLayout(data: $data) {
      id
      massBalance
    }
  }
`;

function SideDefault() {
  const store = useStore();

  const [expanded, setExpanded] = React.useState('panel2');

  const handleChange = (panel) => (_, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const open = !isEmpty(store.getRelatedData('massBalance'));

  const handleClose = React.useCallback(() => {
    store.setRelatedData('massBalance', {});
  }, [store]);

  const [createLayout, { loading }] = useMutation(CREATE_LAYOUT);

  const handleSaveClick = React.useCallback(async () => {
    const getModuleSummary = store.getSummaryModules();
    const project = store.getRelatedData('project');
    const { id: roofId } = store.getRelatedData('roof');
    const { id: claddingId } = store.getRelatedData('cladding');
    const { id: solarModuleId } = store.getRelatedData('solarModule');
    const { id: productId } = store.getRelatedData('product');
    const response = await createLayout({
      variables: {
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
          cladding: {
            connect: {
              id: claddingId,
            },
          },
          solarModule: {
            connect: {
              id: solarModuleId,
            },
          },
        },
      },
    });

    store.setRelatedData(
      'massBalance',
      JSON.parse(response?.data?.createLayout?.massBalance || '[]')
    );
  }, [createLayout, store]);

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
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      />
      {/*//* Obstacles */}
      <AccordeonObstacle
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      />
      {/*//* Info box */}
      <SideInfobox />
      <Divider />

      {/*//* Actions */}
      {!store.isPassingTests() ? (
        <Stack p={2} spacing={1}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<SaveOutlinedIcon />}
            onClick={handleSaveClick}
            fullWidth
          >
            Calculer le bilan matière
          </Button>
          <Button
            size="small"
            variant="contained"
            startIcon={<SaveOutlinedIcon />}
            onClick={handleGeneratePdfClick}
            fullWidth
          >
            Générer le pdf
          </Button>
        </Stack>
      ) : (
        <SidebarLayoutTest />
      )}

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

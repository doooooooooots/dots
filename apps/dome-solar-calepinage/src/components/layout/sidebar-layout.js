import * as React from 'react';
import { useStore } from '../context/useStore';
import { observer } from 'mobx-react';
import { Button, Divider, Stack } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AccordeonRoof from './accordeon-roof';
import AccordeonGenerator from './accordeon-generator';
import AccordeonObstacle from './accordeon-obstacle';
import SideInfobox from './sidebar-layout-infobox';
import SidebarLayoutTest from './sidebar-layout-test';
import { gql, useMutation } from '@apollo/client';

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
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [createLayout, { loading }] = useMutation(CREATE_LAYOUT);

  const handleSaveClick = React.useCallback(async () => {
    const getModuleSummary = store.getSummaryModules();
    const { id: roofId } = store.getRelatedData('roof');
    const { id: claddingId } = store.getRelatedData('cladding');
    const { id: solarModuleId } = store.getRelatedData('solarModule');
    const response = await createLayout({
      variables: {
        data: {
          name: 'test',
          status: 'status_draft',
          lengthX: store.getUserDatas('Tx'),
          lengthY: store.getUserDatas('Ty'),
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
    store.setRelatedData('massBalance', response);
  }, [createLayout, store]);

  const handleGeneratePdfClick = async () => {
    store.resetSnaps();
    store.setIsLoading(true);
    await store.snapRailsAndGenerator();
    store.setIsLoading(false);
    store.setCurrentPage('preview');
  };

  return (
    <>
      {/* Roof */}
      <AccordeonRoof
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      />
      {/* Generator */}
      <AccordeonGenerator
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      />
      {/* Obstacles */}
      <AccordeonObstacle
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      />
      <SideInfobox />
      <Divider />
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
    </>
  );
}

export default observer(SideDefault);

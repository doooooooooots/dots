import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import SideRoof from './side-roof';
import { round } from 'lodash';
import SideObstacles from './side-obstacles';
import { useStore } from '../context/useStore';
import { observer } from 'mobx-react';
import { Box } from '@mui/system';
import { Alert, Button, Divider, Stack } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const SideGenerator = dynamic(() => import('./side-generator'), { ssr: false });

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:before': {
    display: 'none',
  },
  '& .MuiButtonBase-root': {
    minHeight: theme.spacing(4),
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
    marginTop: 0,
    marginBottom: 0,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function SideDefault() {
  const [expanded, setExpanded] = React.useState('panel1');
  const store = useStore();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      {/* Roof */}
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Toiture</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SideRoof />
        </AccordionDetails>
      </Accordion>

      {/* Generator */}
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Générateur</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SideGenerator />
        </AccordionDetails>
      </Accordion>

      {/* Obstacles */}
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Obstacles</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SideObstacles />
        </AccordionDetails>
      </Accordion>

      {/* Tests */}
      <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Tests</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Alert severity="error">
            <Typography sx={{ mb: 2 }}>
              Le calepinage n&apos;a pas été testé
            </Typography>
            <Button
              size="small"
              variant="outlined"
              color="error"
              startIcon={<SaveOutlinedIcon />}
              onClick={() => store.setCurrentPage('render')}
            >
              Check
            </Button>
          </Alert>
        </AccordionDetails>
      </Accordion>

      <Box p={2}>
        <Typography variant="h6">
          Nombre de panneaux : {store.totalModules()}
        </Typography>
        <Typography>Colonnes : {store.getCurrentMaxCol()}</Typography>
        <Typography>Rangées : {store.getCurrentMaxRow()}</Typography>
        <Typography>
          Puissance totale :{' '}
          {round(
            store.totalModules() *
              (parseInt(store.getUserDatas('MPw'), 10) / 1000),
            2
          )}
          kWc
        </Typography>
      </Box>
      <Divider />
      <Stack p={2} spacing={1}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<VisibilityOutlinedIcon />}
          onClick={() => store.setCurrentPage('preview')}
          fullWidth
        >
          Preview
        </Button>
        <Button
          size="small"
          variant="contained"
          startIcon={<SaveOutlinedIcon />}
          onClick={() => store.setCurrentPage('render')}
          fullWidth
        >
          Enregistrer
        </Button>
      </Stack>
    </>
  );
}

export default observer(SideDefault);

import { Box } from '@mui/material';

export default function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      flex={1}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}

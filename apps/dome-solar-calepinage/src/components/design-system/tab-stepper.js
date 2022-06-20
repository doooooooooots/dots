import { Stack, Tab, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledTab = styled((props) => {
  const { title, description, ...other } = props;
  return (
    <Tab
      {...other}
      label={
        <Stack>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="caption">{description}</Typography>
        </Stack>
      }
    />
  );
})(({ theme }) => ({
  border: '1px solid',
  borderColor: `${theme.palette.divider}`,
  alignItems: 'flex-start',
  textAlign: 'left',
  minWidth: 200,
}));

export default StyledTab;

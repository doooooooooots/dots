import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { isEmpty } from 'lodash';

const TagTooltip = (props) => {
  const { value } = props;

  if (isEmpty(value)) return 'Ajouter un tag';

  return (
    <Stack py="4px" spacing={'3px'}>
      {value.map((label) => (
        <Box
          key={label.name}
          sx={{
            height: 20,
            minWidth: 140,
            padding: '.15em 4px',
            fontWeight: 600,
            lineHeight: '15px',
            borderRadius: '2px',
            color: (theme) => theme.palette.getContrastText(label.color),
          }}
          style={{
            backgroundColor: label.color,
          }}
        >
          {label.name}
        </Box>
      ))}
    </Stack>
  );
};

export default TagTooltip;

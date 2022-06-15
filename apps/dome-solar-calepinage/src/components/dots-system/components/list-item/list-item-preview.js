import React from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const SelectItemPreview = (props) => {
  const {
    title,
    Icon,
    selected,
    followCursor,
    hideStartIcon,
    onDelete,
    ...other
  } = props;

  const theme = useTheme();

  const RenderComponent = (
    <Stack
      direction="row"
      as="li"
      alignItems="center"
      borderBottom={1}
      px={1}
      borderColor="divider"
      {...other}
    >
      {Boolean(Icon) && Icon}
      <Box
        sx={{
          flexGrow: 1,
          ml: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
          '& span': {
            color: theme.palette.text.secondary,
          },
        }}
      >
        {title}
      </Box>

      <IconButton size="small" className="icon--deselect" onClick={onDelete}>
        <CloseIcon fontSize="inherit" />
      </IconButton>
    </Stack>
  );

  return RenderComponent;
};

SelectItemPreview.bindProps = (getters, option, state) => ({
  Icon: getters.icon(option),
  title: getters.primary(option),
  selected: state.selected,
});

export default SelectItemPreview;

import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import useHistory from '../../hoc/with-smart-history/use-history';
import { useCallback } from 'react';

function Topbar(props) {
  const { title, actionText, actionPage, fullscreenPage } = props;

  const { push } = useHistory();

  const handleActionClick = useCallback(() => {
    push(actionPage);
  }, [actionPage, push]);

  const handleFullscreenClick = useCallback(() => {
    push(fullscreenPage);
  }, [fullscreenPage, push]);

  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="h4">{title}</Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Button onClick={handleActionClick}>{actionText}</Button>
        <Divider orientation="vertical" flexItem />
        <Box>
          <IconButton onClick={handleFullscreenClick}>
            <OpenInFullIcon />
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  );
}

export default Topbar;

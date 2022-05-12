import * as React from 'react';
import { useDispatch, useSelector } from '_trash/store/store';
import ButtonFilterReset from './ButtonFilterReset';
import { resetArticleFilter } from '../../_trash/slices/article';
import { Stack } from '@mui/material';
import AutocompleteExpansion from './AutocompleteExpansion';

export default function ArticleSearchBar(props) {
  const { flex } = props;
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.app);

  const handleResetClick = () => {
    dispatch(resetArticleFilter());
  };

  return (
    <Stack
      direction='row'
      alignItems='center'
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        flexGrow: flex ? 1 : 0
      }}
    >
      <ButtonFilterReset onClick={handleResetClick} />
      <AutocompleteExpansion query={searchQuery} />
    </Stack>
  );
}

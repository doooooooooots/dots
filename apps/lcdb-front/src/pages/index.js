import { ButtonPopper } from '@dots.cool/components';
import { useState } from 'react';
import { Box } from '@mui/system';
import dynamic from 'next/dynamic';

const SortablePopper = dynamic(
  () => import('../components/no-ssr-patch/sortable-popper'),
  {
    ssr: false,
  }
);

const Hello = ({ item }) => <Box>{`title is ${item.title}`}</Box>;

function Test() {
  const [list, setList] = useState([
    { id: 'a', title: 'ok' },
    { id: 'b', title: 'lol' },
    { id: 'c', title: 'youpi' },
  ]);

  return (
    <Box p={12}>
      <ButtonPopper
        PopperComponent={SortablePopper}
        componentProps={{
          popperComponent: {
            list: list,
            onSortOrderChange: setList,
            SortItemComponent: Hello,
          },
        }}
      >
        Click
      </ButtonPopper>
    </Box>
  );
}

export default Test;

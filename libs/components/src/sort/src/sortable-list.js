import { Stack } from '@mui/material';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import PortalAwareItem from './sortable-item-portal-aware';

function SortableList(props) {
  const { list = [], SortItemComponent } = props;
  return (
    <Droppable droppableId="droppable">
      {(droppableProvided) => (
        <Stack
          spacing={0}
          width={400}
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
        >
          {list.map((item, index) => (
            <Draggable draggableId={item.id} index={index} key={item.id}>
              {(draggableProvided, draggableSnapshot) => (
                <PortalAwareItem
                  item={item}
                  provided={draggableProvided}
                  snapshot={draggableSnapshot}
                  SortItemComponent={SortItemComponent}
                />
              )}
            </Draggable>
          ))}
          {droppableProvided.placeholder}
        </Stack>
      )}
    </Droppable>
  );
}

export default SortableList;

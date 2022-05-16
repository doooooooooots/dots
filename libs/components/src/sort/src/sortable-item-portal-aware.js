import DragIndicatorSharpIcon from '@mui/icons-material/DragIndicatorSharp';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const PortalAwareItem = (props) => {
  const {
    provided,
    snapshot,
    SortItemComponent,
    item,
    onSortOrderChange,
    sortableFields,
  } = props;
  const usePortal = snapshot.isDragging;

  const [isMounted, setIsMounted] = useState(false);
  const [portal, setPortal] = useState(null);

  const child = (
    <ListItem
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      sx={{
        p: 0,
        backgroundColor: 'background.default',
      }}
    >
      <ListItemIcon>
        <DragIndicatorSharpIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText
        primary={
          <SortItemComponent
            item={item}
            onChange={onSortOrderChange}
            sortableFields={sortableFields}
          />
        }
      />
    </ListItem>
  );

  useEffect(() => {
    if (!isMounted) {
      const portal = document.createElement('div');

      if (!document.body) {
        throw new Error('body not ready for portal creation!');
      }
      document.body.appendChild(portal);
      setIsMounted(true);
      setPortal(portal);
    }
  }, [isMounted]);

  if (!usePortal || !portal) {
    return child;
  }

  // if dragging - put the item in a portal
  return ReactDOM.createPortal(child, portal);
};

export default PortalAwareItem;

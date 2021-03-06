// @flow
import { Button, Stack } from '@mui/material';
import { useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import reorder from './reorder';
import SortableList from './sortable-list';
import { isEmpty } from 'lodash';
import { useMemo } from 'react';

export default function SortablePopper(props) {
  const {
    list,
    sortableFields,
    isCombineEnabled,
    onSortOrderChange,
    SortItemComponent,
    onClose,
  } = props;

  function onDragStart() {
    // Add a little vibration if the browser supports it.
    // Add's a nice little physical feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  }

  function onDragEnd(result) {
    // combining item
    if (result.combine) {
      // super simple: just removing the dragging item
      const newList = [...list];
      newList.splice(result.source.index, 1);
      onSortOrderChange(newList);
      return;
    }

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newList = reorder(
      list,
      result.source.index,
      result.destination.index
    );

    onSortOrderChange(newList);
  }

  const availableFields = useMemo(() => {
    const currentSortFields = list.map((sortItem) => sortItem.field);
    return sortableFields.filter(
      (fieldName) => !currentSortFields.includes(fieldName)
    );
  }, [sortableFields, list]);

  const handleAddSortClick = useCallback(() => {
    // [ ](Adrien) : Check why spread operator onmy cause error
    onSortOrderChange((current) => {
      if (isEmpty(current))
        return [
          {
            id: `${current.length}`,
            field: availableFields[0],
            direction: 'asc',
          },
        ];
      return [
        ...current,
        {
          id: `${current.length}`,
          field: availableFields[0],
          direction: 'asc',
        },
      ];
    });
  }, [availableFields, onSortOrderChange]);

  return (
    <>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <Button variant="text" onClick={onClose}>
            Fermer
          </Button>
          <SortableList
            list={list}
            onSortOrderChange={onSortOrderChange}
            isCombineEnabled={isCombineEnabled}
            SortItemComponent={SortItemComponent}
            sortableFields={sortableFields}
          />
        </Stack>
      </DragDropContext>
      <Button disabled={isEmpty(availableFields)} onClick={handleAddSortClick}>
        Add Sort
      </Button>
    </>
  );
}

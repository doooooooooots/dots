import { isEmpty, uniqueId } from 'lodash';
import { useCallback, useMemo } from 'react';
import {
  AND,
  CONTAINS,
  DEFAULT,
  DEFAULT_OPERATOR_BY_TYPE,
  DEFAULT_VALUE_BY_TIMESTAMP_TYPE,
  DEFAULT_VALUE_BY_TYPE,
  EMPTY,
  IS_EMPTY,
  IS_NOT_EMPTY,
  IS_NOT_WITHIN,
  IS_WITHIN,
  NULL,
  TYPE_BY_PROPERTY_ID,
} from '../../constants';
import Rules from '../rules/rules-block';

interface FilterAdvancedProps {
  filter;
  onFilterChange;
}

const initialState = {
  operator: 'and',
  filters: [],
  byId: {},
};

export default function FilterAdvanced(props: FilterAdvancedProps) {
  const { entityName, filter = initialState, onFilterChange } = props;

  const addToParent = useCallback(
    (id, parentId) => {
      if (parentId) {
        filter.byId[parentId].filters.push(id);
      } else {
        filter.filters.push(id);
      }
    },
    [filter]
  );

  const removeFromParent = useCallback(
    (id, parentId) => {
      if (parentId) {
        filter.byId[parentId].filters = filter.byId[parentId].filters.filter(
          (_id) => _id !== id
        );
      } else {
        filter.filters = filter.filters.filter((_id) => _id !== id);
      }
    },
    [filter]
  );

  // Create Rule and attach to parentId
  const createRule = useCallback(
    (parentId) => {
      const id = uniqueId();
      filter.byId[id] = {
        id,
        parentId,
        property: 'name',
        filter: {
          operator: CONTAINS,
          value: '',
        },
      };
      return id;
    },
    [filter]
  );

  // Create Block and attach to parentId
  const createBlock = useCallback(
    (parentId, childId = undefined) => {
      const id = uniqueId();

      if (!childId) {
        childId = createRule(id);
      }

      filter.byId[id] = {
        id,
        parentId,
        operator: AND,
        filters: [childId],
      };
      return id;
    },
    [filter, createRule]
  );

  const handleAddRuleClick = useCallback(
    (parentId) => () => {
      const id = createRule(parentId);
      addToParent(id, parentId);
      onFilterChange({ ...filter });
    },
    [filter, createRule, addToParent, onFilterChange]
  );

  const handleAddBlockClick = useCallback(
    (parentId) => () => {
      const id = createBlock(parentId);
      addToParent(id, parentId);
      onFilterChange({ ...filter });
    },
    [filter, createBlock, addToParent, onFilterChange]
  );

  const deleteItem = useCallback(
    (id) => {
      const parentId = filter.byId[id].parentId;

      // Delete childs
      if (filter.byId[id].filters) {
        filter.byId[id].filters.forEach((itemId) => {
          deleteItem(itemId);
        });
      }
      // Delete From Parents
      removeFromParent(id, parentId);
      // delete element
      delete filter.byId[id];

      return filter;
    },
    [filter, removeFromParent]
  );

  const deleteEmptyBlocks = useCallback(
    (id) => {
      if (!id) return;
      const parentId = filter.byId[id].parentId;
      if (filter.byId[id].filters && filter.byId[id].filters.length === 0) {
        removeFromParent(id, parentId);
        delete filter.byId[id];
        deleteEmptyBlocks(parentId);
      }
    },
    [filter, removeFromParent]
  );

  const handleDeleteClick = useCallback(
    (id) => () => {
      const parentId = filter.byId[id].parentId;
      const newFilter = deleteItem(id);
      deleteEmptyBlocks(parentId);
      onFilterChange({ ...newFilter });
    },
    [filter, deleteEmptyBlocks, deleteItem, onFilterChange]
  );

  const handleChangeToGroupClick = useCallback(
    (id) => () => {
      const parentId = filter.byId[id].parentId;

      // Create newBlock Block
      const blockId = createBlock(parentId, id);

      // Remplace id in parent
      if (parentId) {
        filter.byId[parentId].filters = filter.byId[parentId].filters.map(
          (itemId) => (itemId === id ? blockId : itemId)
        );
      } else {
        filter.filters = filter.filters.map((itemId) =>
          itemId === id ? blockId : itemId
        );
      }

      // Remplace parentId in Rule
      filter.byId[id].parentId = blockId;

      onFilterChange({ ...filter });
    },
    [filter, createBlock, onFilterChange]
  );

  const handleChangeBlockOperator = useCallback(
    (id) => (newValue) => {
      if (id) {
        filter.byId[id].operator = newValue;
      } else {
        filter.operator = newValue;
      }
      onFilterChange({ ...filter });
    },
    [filter, onFilterChange]
  );

  const handleChangeProperty = useCallback(
    (id) => (newValue) => {
      const old = filter.byId[id].property;
      if (old === newValue) {
        return;
      }
      const type = TYPE_BY_PROPERTY_ID[newValue];
      const defaultOperator = DEFAULT_OPERATOR_BY_TYPE[type];
      const defaultValue = DEFAULT_VALUE_BY_TYPE[type];
      filter.byId[id].property = newValue;
      filter.byId[id].filter.operator = defaultOperator;
      filter.byId[id].filter.value = defaultValue;
      onFilterChange({ ...filter });
    },
    [filter, onFilterChange]
  );

  const handleChangeRuleOperator = useCallback(
    (id) => (newValue) => {
      const old = filter.byId[id].filter.operator;
      if (old === newValue) {
        return;
      }

      filter.byId[id].filter.operator = newValue;

      if ([IS_WITHIN, IS_NOT_WITHIN].includes(newValue)) {
        filter.byId[id].filter.value =
          DEFAULT_VALUE_BY_TIMESTAMP_TYPE[IS_WITHIN];
      } else if ([IS_WITHIN, IS_NOT_WITHIN].includes(old)) {
        filter.byId[id].filter.value = DEFAULT_VALUE_BY_TIMESTAMP_TYPE[DEFAULT];
      } else if ([IS_EMPTY, IS_NOT_EMPTY].includes(old)) {
        filter.byId[id].filter.value = EMPTY;
      } else if ([IS_EMPTY, IS_NOT_EMPTY].includes(newValue)) {
        filter.byId[id].filter.value = NULL;
      }
      onFilterChange({ ...filter });
    },
    [filter, onFilterChange]
  );

  const handleChangeRuleValue = useCallback(
    (id) => (newValue) => {
      filter.byId[id].filter.value = newValue;
      onFilterChange({ ...filter });
    },
    [filter, onFilterChange]
  );

  const filterTree = useMemo(() => {
    if (!filter) return [];

    const makeTree = (item) => {
      if (isEmpty(item)) return initialState;

      const { operator, filters } = item;

      const tree = filters.reduce((acc, currentId) => {
        const current = filter.byId[currentId];
        if ('filters' in current) {
          acc.push(makeTree(current));
        } else {
          acc.push(current);
        }
        return acc;
      }, []);

      return {
        id: item.id,
        operator,
        filters: tree,
      };
    };

    return makeTree(filter);
  }, [filter]);

  return (
    <Rules
      entityName={entityName}
      onAddRuleClick={handleAddRuleClick}
      onAddBlockClick={handleAddBlockClick}
      onDeleteClick={handleDeleteClick}
      onChangeToGroupClick={handleChangeToGroupClick}
      onChangeBlockOperator={handleChangeBlockOperator}
      onChangeRuleOperator={handleChangeRuleOperator}
      onChangeRuleValue={handleChangeRuleValue}
      onChangeProperty={handleChangeProperty}
      items={filterTree}
    />
  );
}

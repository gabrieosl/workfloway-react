import React, { useEffect, useState, useCallback, useMemo } from 'react';

import { MdCheck, MdClose } from 'react-icons/all';
import produce from 'immer';
import { useNavigation } from '../../context/NavigationContext';
import { useSelection } from '../../context/SelectionContext';

import List from '../../components/List';

import { Container, SelectionPanel, ActiveFilters } from './styles';

interface ItemData {
  id: string;
  name: string;
  lastObservation?: {
    type_id: string;
    created_at: Date;
    user: {
      name: string;
    };
  };
  lastSubmission?: {
    repetition: number;
  };
}

interface FilterData {
  [key: string]: { column: string; operation: string; value: string };
}

const Dashboard: React.FC = () => {
  const { setPage } = useNavigation();
  const { isSelected, addToSelection, removeFromSelection } = useSelection();

  const [items, setItems] = useState<ItemData[]>([]);
  const [filters, setFilters] = useState<FilterData>({
    filter1: {
      column: 'status',
      operation: '=',
      value: 'fgadfg to load',
    },
  });

  const isAllMarked = useMemo(() => !items.find(item => !isSelected(item.id)), [
    isSelected,
    items,
  ]);

  const handleToggleMarkAll = useCallback(() => {
    if (!isAllMarked) {
      addToSelection(items);
    } else {
      removeFromSelection(items);
    }
  }, [addToSelection, isAllMarked, items, removeFromSelection]);

  useEffect(() => setPage('dashboard'), [setPage]);

  const handleRemoveFilter = useCallback(
    key => {
      const item = document.getElementById(key);
      if (!item) {
        return;
      }

      item.className = 'removed';
      setTimeout(() => {
        setFilters(
          produce(filters, draft => {
            delete draft[key];
            return draft;
          }),
        );
      }, 200);
    },
    [filters],
  );

  return (
    <Container>
      <SelectionPanel isAllMarked={isAllMarked}>
        <strong>List of Products</strong>
        <section>
          <button type="button">Filters</button>
          <input type="options" />
        </section>
        <button type="button" id="mark-all" onClick={handleToggleMarkAll}>
          <MdCheck size={25} />
          <MdCheck size={25} />
        </button>
      </SelectionPanel>
      {!!Object.keys(filters).length && (
        <ActiveFilters>
          <span>Active filters:</span>
          {Object.keys(filters).map(key => (
            <div key={key} id={key}>
              <span>{`${filters[key].column} ${filters[key].operation} ${filters[key].value}`}</span>
              <button type="button" onClick={() => handleRemoveFilter(key)}>
                <MdClose />
              </button>
            </div>
          ))}
        </ActiveFilters>
      )}
      <List items={items} setItems={setItems} />
    </Container>
  );
};

export default Dashboard;

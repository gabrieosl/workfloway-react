import React, { useEffect, useState, useCallback, useMemo } from 'react';

import {
  FiPlus,
  GrEdit,
  MdCheck,
  MdClose,
  MdAdd,
  FiList,
} from 'react-icons/all';
import produce from 'immer';
import { useNavigation } from '../../context/NavigationContext';
import { useSelection } from '../../context/SelectionContext';

import List from '../../components/ItemsList';

import { Container, SelectionPanel, ActiveFilters } from './styles';
import api from '../../services/api';

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

const Selection: React.FC = () => {
  const { setPage } = useNavigation();
  const { selection, toogleSelection } = useSelection();

  const [filters, setFilters] = useState<FilterData>({
    filter1: {
      column: 'status',
      operation: '=',
      value: 'fgadfg to load',
    },
    filter2: {
      column: 'status',
      operation: '=',
      value: 'dfbfbfbd',
    },
    filter3: {
      column: 'status',
      operation: '=',
      value: 'fsdfsdfdsfewr',
    },
    filter4: {
      column: 'status',
      operation: '=',
      value: 'ghjgjghj',
    },
    filter5: {
      column: 'status',
      operation: '=',
      value: '34wersdfre',
    },
    filter6: {
      column: 'status',
      operation: '=',
      value: 'wit9wpto',
    },
  });

  useEffect(() => setPage('selection'), [setPage]);

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
      <SelectionPanel>
        <strong>List of Products</strong>
        <section>
          <button type="button">Filters</button>
          <input type="options" />
        </section>
        <button type="button" id="add-selection">
          <FiPlus />
          <FiList size={25} />
          {!!selection.length && <span>{selection.length}</span>}
        </button>
        <button type="button" id="mark-all">
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
      <List items={selection} setItems={setItems} />
    </Container>
  );
};

export default Selection;

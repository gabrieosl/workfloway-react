import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { parseISO, formatDistance } from 'date-fns';

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
import { useTypes } from '../../context/TypesContext';

import { Container, SelectionPanel, ActiveFilters, List, Item } from './styles';
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

const Dashboard: React.FC = () => {
  const { setPage } = useNavigation();
  const { getTypeName } = useTypes();
  const [currentPage, setCurrentpage] = useState(1);
  const [size] = useState(15);
  const [items, setItems] = useState<ItemData[]>([]);
  const [marked, setMarked] = useState<string[]>([]);
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

  const isAllMarked = useMemo(
    () => !items.find(item => !marked.includes(item.id)),
    [items, marked],
  );
  const isAnyMarked = useMemo(
    () => !!items.find(item => marked.includes(item.id)),
    [items, marked],
  );

  const formatTime = useCallback(date => {
    return formatDistance(parseISO(date), new Date(), {
      addSuffix: true,
    });
  }, []);

  const handleToggleMarkAll = useCallback(() => {
    if (isAllMarked) {
      setMarked([]);
    } else {
      setMarked(items.map(item => item.id));
    }
  }, [isAllMarked, items]);

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

  const handleMark = useCallback(
    id => {
      setMarked(
        produce(marked, draft => {
          const index = draft.findIndex(mk => mk === id);
          if (index >= 0) {
            draft.splice(index, 1);
          } else {
            draft.push(id);
          }
          return draft;
        }),
      );
    },
    [marked],
  );

  const handleLoadMoreItems = useCallback(() => {
    if (currentPage > 0) {
      api
        .get(`/subjects?page=${currentPage + 1}&size=${size}`)
        .then(response => {
          if (response.data.length > 0) {
            setItems(
              produce(items, draft => {
                draft.push(...response.data);
              }),
            );
          }
          if (response.data.length < size) {
            setCurrentpage(-1);
          }
        });
      setCurrentpage(currentPage + 1);
    }
  }, [currentPage, items, size]);

  useEffect(() => {
    api.get(`/subjects?page=${currentPage}&size=${size}`).then(response => {
      setItems(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <SelectionPanel isAllMarked={isAllMarked} isAnyMarked={isAnyMarked}>
        <strong>List of Products</strong>
        <section>
          <button type="button">Filters</button>
          <input type="options" />
        </section>
        <button type="button" id="add-selection">
          <FiPlus />
          <FiList size={25} />
          {!!marked.length && <span>{marked.length}</span>}
        </button>
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
      <List>
        {items.map(item => (
          <Item key={item.id} marked={marked.includes(item.id)}>
            <strong>{item.name}</strong>
            <span>
              {item.lastObservation
                ? getTypeName(item.lastObservation.type_id)
                : '---'}
            </span>
            <small>
              {item.lastSubmission ? item.lastSubmission.repetition : '0'}
            </small>
            <div>
              {item.lastObservation && (
                <>
                  <p>
                    <GrEdit />
                    {item.lastObservation.user.name}
                  </p>
                  <p>{formatTime(item.lastObservation.created_at)}</p>
                </>
              )}
            </div>
            <button type="button" onClick={() => handleMark(item.id)}>
              <MdCheck size={25} />
            </button>
          </Item>
        ))}
        {currentPage > 0 ? (
          <button type="button" onClick={handleLoadMoreItems}>
            <MdAdd size={30} />
          </button>
        ) : (
          <div />
        )}
      </List>
    </Container>
  );
};

export default Dashboard;

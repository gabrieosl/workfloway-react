import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { MdCheck, MdClose, MdAdd } from 'react-icons/all';
import produce from 'immer';

import { useNavigation } from '../../context/NavigationContext';
import { useSelection } from '../../context/SelectionContext';
import api from '../../services/api';

import List from '../../components/List';
import CreateObservation from '../../components/CreateObservation';
import CreateProduct from '../../components/CreateProduct';

import { Container, SelectionPanel, ActiveFilters } from './styles';
import CreateNewPopup from '../../components/CreateNewPopup';

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
  tags: {
    tagId: string;
    value: string;
  }[];
}

interface FilterData {
  [key: string]: { column: string; operation: string; value: string };
}

const Dashboard: React.FC = () => {
  const { setPage } = useNavigation();
  const { isSelected, addToSelection, removeFromSelection } = useSelection();

  const [currentPage, setCurrentpage] = useState(1);
  const [size] = useState(15);
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
  }, [currentPage, items, setItems, size]);

  useEffect(() => {
    api.get(`/subjects?page=${currentPage}&size=${size}`).then(response => {
      setItems(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container>
        <SelectionPanel isAllMarked={isAllMarked}>
          <strong>List of Products</strong>
          <section>
            <button type="button">Filters</button>
            <input type="options" />
          </section>
          <CreateNewPopup text="New Product">
            <CreateProduct />
          </CreateNewPopup>
          <button
            type="button"
            className="mark-all"
            onClick={handleToggleMarkAll}
          >
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
        <List items={items}>
          {currentPage > 0 && (
            <button type="button" onClick={handleLoadMoreItems}>
              <MdAdd size={30} />
            </button>
          )}
        </List>
      </Container>
      <CreateObservation initialTypeSelectedId="b1dcfa79-d1ff-4922-b482-ad5629c970a3" />
    </>
  );
};

export default Dashboard;

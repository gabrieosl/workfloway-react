import React, { useCallback, useState, useEffect } from 'react';
import { GrEdit, MdCheck, MdAdd } from 'react-icons/all';
import { parseISO, formatDistance } from 'date-fns';

import { produce } from 'immer';
import { useTypes } from '../../context/TypesContext';
import { useSelection } from '../../context/SelectionContext';

import { Container, Item } from './styles';
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
interface ListProps {
  items: ItemData[];
  setItems(items: ItemData[]): void;
}
const List: React.FC<ListProps> = ({ items, setItems }) => {
  const { selection, toogleSelection } = useSelection();
  const { getTypeName } = useTypes();

  const [currentPage, setCurrentpage] = useState(1);
  const [size] = useState(15);

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

  const formatTime = useCallback(date => {
    return formatDistance(parseISO(date), new Date(), {
      addSuffix: true,
    });
  }, []);

  useEffect(() => {
    api.get(`/subjects?page=${currentPage}&size=${size}`).then(response => {
      setItems(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {items.map(item => (
        <Item key={item.id} selected={selection.includes(item.id)}>
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
          <button type="button" onClick={() => toogleSelection(item.id)}>
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
    </Container>
  );
};

export default List;

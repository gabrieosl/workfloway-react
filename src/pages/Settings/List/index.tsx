import React, { useState, useCallback } from 'react';

import { MdDelete, MdEdit, MdCheck, MdClose } from 'react-icons/md';
import { Container, Item, ItemButtonsHolder } from './styles';

interface ListProps {
  items: {
    id: string;
    name: string;
  }[];
  handleEdit(id: string): void;
  handleDelete(id: string): void;
}

const List: React.FC<ListProps> = ({ items, handleEdit, handleDelete }) => {
  const [toDelete, setToDelete] = useState('');

  const confirmDeletion = useCallback(
    (id: string) => {
      handleDelete(id);
      setToDelete('');
    },
    [handleDelete],
  );

  return (
    <Container>
      {items.map(item => (
        <Item>
          <strong>{item.name}</strong>
          <ItemButtonsHolder>
            {toDelete === item.id ? (
              <>
                <strong>Confirm?</strong>
                <button
                  className="confirm"
                  type="button"
                  onClick={() => confirmDeletion(item.id)}
                >
                  <MdCheck />
                </button>
                <button
                  className="delete"
                  type="button"
                  onClick={() => setToDelete('')}
                >
                  <MdClose />
                </button>
              </>
            ) : (
              <>
                <button
                  className="edit"
                  type="button"
                  onClick={() => handleEdit(item.id)}
                >
                  <MdEdit />
                </button>
                <button
                  className="delete"
                  type="button"
                  onClick={() => setToDelete(item.id)}
                >
                  <MdDelete />
                </button>
              </>
            )}
          </ItemButtonsHolder>
        </Item>
      ))}
    </Container>
  );
};

export default List;

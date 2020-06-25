import React from 'react';

import { MdDelete, MdEdit } from 'react-icons/md';
import { Container, Item } from './styles';

interface ListProps {
  items: {
    id: string;
    name: string;
  }[];
  handleEdit(id: string): void;
  handleDelete(id: string): void;
}

const List: React.FC<ListProps> = ({ items, handleEdit, handleDelete }) => {
  return (
    <Container>
      {items.map(item => (
        <Item>
          <strong>{item.name}</strong>
          <div>
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
              onClick={() => handleDelete(item.id)}
            >
              <MdDelete />
            </button>
          </div>
        </Item>
      ))}
    </Container>
  );
};

export default List;

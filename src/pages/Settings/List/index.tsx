import React, { useState, useMemo, useCallback } from 'react';
import { MdDelete, MdEdit, MdCheck, MdClose } from 'react-icons/md';

import { Container, Item, ItemButtonsHolder } from './styles';

interface ListProps {
  items: {
    id: string;
    name: string;
  }[];
  handleUpdate(id: string, newData: unknown): void;
  handleDelete(id: string): void;
}

interface CRUDController {
  id?: string;
  mode?: 'update' | 'delete';
  value?: string;
}

const List: React.FC<ListProps> = ({ items, handleUpdate, handleDelete }) => {
  console.log('items: ', items);
  const [triggeredAction, setTriggeredAction] = useState<CRUDController>({});

  const isUpdating = useMemo(() => triggeredAction.mode === 'update', [
    triggeredAction,
  ]);

  const confirmDeletion = useCallback(() => {
    if (!triggeredAction.id) {
      return;
    }
    handleDelete(triggeredAction.id);
    setTriggeredAction({});
  }, [handleDelete, triggeredAction.id]);

  const confirmUpdate = useCallback(() => {
    if (!triggeredAction.id) {
      return;
    }
    handleUpdate(triggeredAction.id, { name: triggeredAction.value });
    setTriggeredAction({});
  }, [handleUpdate, triggeredAction.id, triggeredAction.value]);

  const handleTextChange = useCallback(
    e => setTriggeredAction({ ...triggeredAction, value: e.target.value }),
    [triggeredAction],
  );

  return (
    <Container>
      {items.map(item => (
        <Item>
          {triggeredAction.id === item.id ? (
            <>
              {isUpdating ? (
                <input
                  value={triggeredAction.value}
                  onChange={handleTextChange}
                />
              ) : (
                <strong>
                  Confirm ? (All items having this tag will lose it)
                </strong>
              )}
              <ItemButtonsHolder>
                <button
                  className="confirm"
                  type="button"
                  onClick={isUpdating ? confirmUpdate : confirmDeletion}
                >
                  <MdCheck />
                </button>
                <button
                  className="delete"
                  type="button"
                  onClick={() => setTriggeredAction({})}
                >
                  <MdClose />
                </button>
              </ItemButtonsHolder>
            </>
          ) : (
            <>
              <strong>{item.name}</strong>
              <ItemButtonsHolder>
                <button
                  className="edit"
                  type="button"
                  onClick={() =>
                    setTriggeredAction({
                      id: item.id,
                      mode: 'update',
                      value: item.name,
                    })
                  }
                >
                  <MdEdit />
                </button>
                <button
                  className="delete"
                  type="button"
                  onClick={() =>
                    setTriggeredAction({ id: item.id, mode: 'delete' })
                  }
                >
                  <MdDelete />
                </button>
              </ItemButtonsHolder>
            </>
          )}
        </Item>
      ))}
    </Container>
  );
};

export default List;

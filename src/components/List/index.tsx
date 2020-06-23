import React, { useCallback, useMemo } from 'react';
import { GrEdit, MdCheck, MdClose } from 'react-icons/all';
import { parseISO, formatDistance } from 'date-fns';

import { useTypes } from '../../context/TypesContext';
import { useSelection } from '../../context/SelectionContext';

import { Container, Item } from './styles';

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
  type?: 'show' | 'select';
}

const List: React.FC<ListProps> = ({ items, type = 'show', children }) => {
  const { toogleSelection, isSelected } = useSelection();
  const { getTypeName } = useTypes();

  const isRemovable = useMemo(() => type === 'select', [type]);

  const formatTime = useCallback(date => {
    return formatDistance(parseISO(date), new Date(), {
      addSuffix: true,
    });
  }, []);

  return (
    <Container>
      {items.map(item => (
        <Item
          key={item.id}
          selected={isSelected(item.id)}
          isRemovable={isRemovable}
        >
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
          <button type="button" onClick={() => toogleSelection(item)}>
            {isRemovable ? <MdClose size={25} /> : <MdCheck size={25} />}
          </button>
        </Item>
      ))}
      {children}
    </Container>
  );
};

export default List;

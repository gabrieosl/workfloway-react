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
  tags: {
    tagId: string;
    value: string;
  }[];
}
interface ListProps {
  items: ItemData[];
  type?: 'show' | 'select';
}

const List: React.FC<ListProps> = ({ items, type = 'show', children }) => {
  const { toogleSelection, isSelected } = useSelection();
  const { getTypeName, getTagName } = useTypes();

  const isRemovable = useMemo(() => type === 'select', [type]);

  const formatTime = useCallback(date => {
    return formatDistance(parseISO(date), new Date(), {
      addSuffix: true,
    });
  }, []);

  return (
    <Container>
      {items.length > 0 ? (
        items.map(item => (
          <Item
            key={item.id}
            selected={isSelected(item.id)}
            isRemovable={isRemovable}
          >
            <strong>
              {item.name}
              <div className="tags-holder">
                {item.tags &&
                  item.tags
                    // .sort((a, b) => {
                    //   if (a.value < b.value) return -1;
                    //   if (a.value > b.value) return 1;
                    //   return 0;
                    // })
                    .map(tag => (
                      <div className="tag">
                        <strong>{getTagName(tag.tagId)}</strong>
                        <small>{tag.value}</small>
                      </div>
                    ))}
              </div>
            </strong>
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
        ))
      ) : (
        <section>
          <h1>Empty</h1>
        </section>
      )}
      {children}
    </Container>
  );
};

export default List;

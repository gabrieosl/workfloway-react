import React, { useCallback, useState, useMemo } from 'react';
import {
  GrEdit,
  MdCheck,
  MdClose,
  MdAdd,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  FaRegCommentDots,
} from 'react-icons/all';
import { parseISO, formatDistance } from 'date-fns';

import { useBase } from '../../hooks/base';
import { useSelection } from '../../hooks/selection';

import { Container, Item } from './styles';

interface ObservationData {
  type_id: string;
  created_at: Date;
  comment: string;
  value: string;
  user: {
    name: string;
  };
}

interface ItemData {
  id: string;
  name: string;
  observations: ObservationData[];
  lastObservation?: ObservationData;
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
  loadMoreItems?: () => void;
}

const List: React.FC<ListProps> = ({ items, loadMoreItems, type = 'show' }) => {
  const { toogleSelection, isSelected } = useSelection();
  const { getNameById } = useBase();
  const [idShowingDetails, setIdShowingDetails] = useState('');

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
          <>
            <Item
              key={item.id}
              selected={isSelected(item.id)}
              isRemovable={isRemovable}
              onClick={() => toogleSelection(item)}
            >
              <button
                type="button"
                className="show-item-details"
                onClick={() => setIdShowingDetails(item.id)}
              >
                {idShowingDetails === item.id ? (
                  <MdKeyboardArrowDown />
                ) : (
                  <MdKeyboardArrowRight />
                )}
              </button>
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
                          <strong>{getNameById(tag.tagId, 'tags')}</strong>
                          <small>{tag.value}</small>
                        </div>
                      ))}
                </div>
              </strong>
              <span>
                {item.lastObservation
                  ? getNameById(item.lastObservation.type_id, 'types')
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
              <button type="button">
                {isRemovable ? <MdClose size={25} /> : <MdCheck size={25} />}
              </button>
            </Item>
            {idShowingDetails === item.id && (
              <div className="item-details">
                {item.observations.map(observation => (
                  <div className="item-details-observation">
                    <span>{getNameById(observation.type_id, 'types')}</span>
                    <p>
                      <GrEdit />
                      {observation.value}
                    </p>
                    <p>
                      <FaRegCommentDots />
                      {observation.comment}
                    </p>
                    <p>{formatTime(observation.created_at)}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        ))
      ) : (
        <section>
          <h1>Empty</h1>
        </section>
      )}
      {loadMoreItems && (
        <button type="button" className="load-more" onClick={loadMoreItems}>
          <MdAdd />
        </button>
      )}
    </Container>
  );
};

export default List;

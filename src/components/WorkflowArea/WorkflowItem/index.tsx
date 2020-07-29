import React, { useMemo } from 'react';
import { useDrop, useDrag, DragSourceMonitor } from 'react-dnd';
import { MdKeyboardArrowDown, MdRemoveCircle, GrDrag } from 'react-icons/all';

import { useWorkflow } from '../../../hooks/WorkflowContext';
import { Container } from './styles';

type WorkflowItemProps = {
  name: string;
  typeId?: string;
  id: string;
  isDraggable?: boolean;
  isDropable?: boolean;
};

const WorkflowItem: React.FC<WorkflowItemProps> = ({
  id,
  typeId,
  name,
  isDraggable = true,
  isDropable = true,
  children,
}) => {
  const { updateItem, removeItem } = useWorkflow();

  const [{ isDragging }, drag] = useDrag({
    item: { id, typeId, name, type: typeId ? 'OBSERVATION_TYPE' : 'OTHER' },
    end: (item, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        updateItem(item, dropResult);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ canDrop, isOver, item }, drop] = useDrop({
    accept: 'OBSERVATION_TYPE',
    drop: () => ({ id, typeId, name }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    }),
  });

  const dropRef = useMemo(() => {
    if (!isDragging && isDropable) {
      return drop;
    }
    return null;
  }, [drop, isDragging, isDropable]);

  const isActive = useMemo(() => canDrop && isOver, [canDrop, isOver]);

  return (
    <Container ref={dropRef} isActive={isActive} isDragging={isDragging}>
      {!isDragging && (
        <>
          <MdKeyboardArrowDown className="arrow" />
          {isActive && <section />}
          <main id={id} ref={isDraggable ? drag : null}>
            {children || <GrDrag className="drag-icon" size={15} />}
            {name}
            {isDraggable ? (
              <button type="button" onClick={() => removeItem(id)}>
                <MdRemoveCircle />
              </button>
            ) : (
              <div />
            )}
          </main>
        </>
      )}
    </Container>
  );
};

export default WorkflowItem;

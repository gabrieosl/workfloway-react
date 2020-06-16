import React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { uuid } from 'uuidv4';

import { useWorkflow } from '../../../../context/WorkflowContext';

import { Container } from './styles';

type ObservationTypeProps = {
  id: string;
  name: string;
};

const ObservationType: React.FC<ObservationTypeProps> = ({ id, name }) => {
  const { pushItem } = useWorkflow();
  const [{ isDragging }, drag] = useDrag({
    item: {
      typeId: id,
      name,
      type: 'OBSERVATION_TYPE',
    },
    end: (item, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        pushItem({ ...item, id: uuid() }, dropResult);
        // alert(`You dropped ${item.name} into ${dropResult.id}!`);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Container ref={drag} isDragging={isDragging} id={id}>
      {name}
    </Container>
  );
};

export default ObservationType;

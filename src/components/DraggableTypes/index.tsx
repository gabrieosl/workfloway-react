import React from 'react';

import { useBase } from '../../hooks/base';

import Draggable from './Draggable';
import { Container, ObservationTypesWrapper } from './styles';

const DraggableTypes: React.FC = () => {
  const { types } = useBase();

  return (
    <Container>
      <h1>Observation types</h1>
      <ObservationTypesWrapper>
        {types.map(obsType => (
          <Draggable key={obsType.id} id={obsType.id} name={obsType.name} />
        ))}
      </ObservationTypesWrapper>
    </Container>
  );
};

export default DraggableTypes;

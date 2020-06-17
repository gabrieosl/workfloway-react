import React from 'react';

import { useTypes } from '../../context/TypesContext';

import Draggable from './Draggable';
import { Container, ObservationTypesWrapper } from './styles';

const DraggableTypes: React.FC = () => {
  const { types } = useTypes();

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

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import WorkflowArea from '../WorkflowArea';
import DraggableTypes from '../DraggableTypes';
import { Container } from './styles';

const WorflowEditor: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <WorkflowArea />
        <DraggableTypes />
      </Container>
    </DndProvider>
  );
};

export default WorflowEditor;

import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaPlus, BsPlayFill } from 'react-icons/all';

import api from '../../services/api';
import { useWorkflow } from '../../context/WorkflowContext';

import WorkflowItem from './components/WorkflowItem';
import ObservationType from './components/ObservationType';
import {
  Container,
  WorkflowArea,
  ObservationTypes,
  ObservationTypesWrapper,
} from './styles';

interface ObservationTypeItem {
  id: string;
  name: string;
}

const WorflowMaker: React.FC = () => {
  const [observationTypes, setObservationTypes] = useState<
    ObservationTypeItem[]
  >([]);
  const { workflow } = useWorkflow();

  useEffect(() => {
    api.get('/observationtypes').then(response => {
      if (response.status === 200) {
        setObservationTypes(response.data);
      }
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <WorkflowArea>
          <WorkflowItem
            id="start"
            name="start"
            isDraggable={false}
            isDropable={false}
          >
            <BsPlayFill />
          </WorkflowItem>
          {workflow.map(workflowItem => (
            <WorkflowItem
              key={workflowItem.id}
              id={workflowItem.id}
              typeId={workflowItem.typeId}
              name={workflowItem.name}
            />
          ))}
          <WorkflowItem id="end" name="end" isDraggable={false} />
        </WorkflowArea>
        <ObservationTypes>
          <ObservationTypesWrapper>
            <h1>Observations</h1>
            {observationTypes.map(obsType => (
              <ObservationType
                key={obsType.id}
                id={obsType.id}
                name={obsType.name}
              />
            ))}

            <button type="button">
              <FaPlus />
            </button>
          </ObservationTypesWrapper>
        </ObservationTypes>
        {/* To be moved out */}
        {/* <Selection>
          <span>Seleçao atual:</span>
          <aside>4 objs.</aside>
        </Selection> */}
      </Container>
    </DndProvider>
  );
};

export default WorflowMaker;

import React from 'react';
import { BsPlayFill, FaStop } from 'react-icons/all';

import { useWorkflow } from '../../hooks/workflow';
import WorkflowItem from './WorkflowItem';

import { Container } from './styles';

const WorkflowArea: React.FC = () => {
  const { workflow } = useWorkflow();

  return (
    <Container>
      <WorkflowItem
        id="start"
        name="start"
        isDraggable={false}
        isDropable={false}
      >
        <BsPlayFill color="#00b300" />
      </WorkflowItem>
      {workflow.content.map(workflowItem => (
        <WorkflowItem
          key={workflowItem.id}
          id={workflowItem.id}
          typeId={workflowItem.typeId}
          name={workflowItem.name}
        />
      ))}
      <WorkflowItem id="end" name="end" isDraggable={false}>
        <FaStop color="#b30000" size={20} />
      </WorkflowItem>
    </Container>
  );
};

export default WorkflowArea;

import React, { useEffect } from 'react';

import { useNavigation } from '../../context/NavigationContext';

import WorkflowEditor from '../../components/WorkflowEditor';

import { Container, WorkflowSelector } from './styles';

const Workflows: React.FC = () => {
  const { setPage } = useNavigation();

  useEffect(() => setPage('workflows'), [setPage]);

  return (
    <Container>
      <WorkflowSelector />
      <WorkflowEditor />
    </Container>
  );
};

export default Workflows;

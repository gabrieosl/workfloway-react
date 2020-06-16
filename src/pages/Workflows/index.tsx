import React, { useEffect } from 'react';

import { useNavigation } from '../../context/NavigationContext';

import WorkflowMaker from '../../components/WorkflowMaker';

import { Container, Main } from './styles';
import Selection from '../../components/Selection';

const Workflows: React.FC = () => {
  const { setPage } = useNavigation();

  useEffect(() => setPage('workflows'), [setPage]);

  return (
    <Container>
      <Main>
        <WorkflowMaker />
        <Selection />
      </Main>
    </Container>
  );
};

export default Workflows;

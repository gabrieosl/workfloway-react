import React from 'react';

import WorkflowMaker from '../../components/WorkflowMaker';

import { Container, Main } from './styles';
import Header from '../../components/Header';
import Selection from '../../components/Selection';

const Workflows: React.FC = () => {
  return (
    <Container>
      <Header />
      <Main>
        <WorkflowMaker />
        <Selection />
      </Main>
    </Container>
  );
};

export default Workflows;

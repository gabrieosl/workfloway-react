import React from 'react';

import SubjectsViewer from '../../components/SubjectsViewer';

import { Container, Main } from './styles';
import Header from '../../components/Header';
import Selection from '../../components/Selection';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header />
      <Main>
        <SubjectsViewer />
        <Selection />
      </Main>
    </Container>
  );
};

export default Dashboard;

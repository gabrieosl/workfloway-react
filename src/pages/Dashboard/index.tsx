import React, { useEffect } from 'react';

import { useNavigation } from '../../context/NavigationContext';

import SubjectsViewer from '../../components/SubjectsViewer';

import { Container } from './styles';
import Selection from '../../components/Selection';

const Dashboard: React.FC = () => {
  const { setPage } = useNavigation();

  useEffect(() => setPage('dashboard'), [setPage]);

  return (
    <Container>
      <SubjectsViewer />
      <Selection />
    </Container>
  );
};

export default Dashboard;

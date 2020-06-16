import React, { useEffect } from 'react';

import { useNavigation } from '../../context/NavigationContext';

import { Container } from './styles';

const Activities: React.FC = () => {
  const { setPage } = useNavigation();

  useEffect(() => setPage('activities'), [setPage]);

  return <Container>ACTIVITIES PAGE</Container>;
};

export default Activities;

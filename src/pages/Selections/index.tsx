import React, { useEffect } from 'react';

import { useNavigation } from '../../context/NavigationContext';

import { Container } from './styles';

const Selections: React.FC = () => {
  const { setPage } = useNavigation();

  useEffect(() => setPage('selections'), [setPage]);

  return <Container>SELECTIONS PAGE</Container>;
};

export default Selections;

import React from 'react';

import { GoChecklist } from 'react-icons/all';
import { Container } from './styles';

const Selection: React.FC = () => {
  return (
    <Container>
      <GoChecklist />
      <span>25</span>
    </Container>
  );
};

export default Selection;

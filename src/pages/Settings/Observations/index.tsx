import React from 'react';

import { useTypes } from '../../../context/TypesContext';

import List from '../List';

// import { Container } from './styles';

const Observations: React.FC = () => {
  const { types } = useTypes();
  return (
    <List items={types} handleDelete={id => null} handleEdit={id => null} />
  );
};

export default Observations;

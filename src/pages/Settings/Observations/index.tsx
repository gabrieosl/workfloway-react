import React from 'react';

import List from '../List';

// import { Container } from './styles';

const Observations: React.FC = () => {
  return (
    <List
      items={[
        { name: 'abc', id: '123' },
        { name: 'abc', id: '123' },
        { name: 'abc', id: '123' },
      ]}
      handleDelete={id => null}
      handleEdit={id => null}
    />
  );
};

export default Observations;

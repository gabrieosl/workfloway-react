import React from 'react';

import Sider from '../../../components/Sider';
import Header from '../../../components/Header';
import { Container, Main } from './styles';

const Default: React.FC = ({ children }) => {
  return (
    <Container>
      <Sider />
      <Main>
        <Header />
        {children}
        {/* <div className="example" /> */}
      </Main>
    </Container>
  );
};

export default Default;

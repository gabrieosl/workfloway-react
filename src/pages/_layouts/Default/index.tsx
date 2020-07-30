import React from 'react';

import Sider from '../../../components/Sider';
import Header from '../../../components/Header';
import { Container, Main, PageComponent } from './styles';

const Default: React.FC = ({ children }) => {
  return (
    <Container>
      <Sider />
      <Main>
        <Header />
        <PageComponent>{children}</PageComponent>
      </Main>
    </Container>
  );
};

export default Default;

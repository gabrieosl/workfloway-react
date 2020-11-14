import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import Sider from '../../../components/Sider';
import Header from '../../../components/Header';
import { Container, Main, PageTitle, PageComponent } from './styles';

const Default: React.FC = ({ children }) => {
  const { path } = useRouteMatch();

  return (
    <Container>
      <Sider />
      <Main>
        <Header />
        <PageTitle>{path}</PageTitle>
        <PageComponent>{children}</PageComponent>
      </Main>
    </Container>
  );
};

export default Default;

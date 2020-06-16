import React from 'react';

import { NavigationProvider } from '../../../context/NavigationContext';

import Sider from '../../../components/Sider';
import Header from '../../../components/Header';
import { Container, Main } from './styles';

const Default: React.FC = ({ children }) => {
  return (
    <NavigationProvider>
      <Container>
        <Sider />
        <Main>
          <Header />
          {children}
        </Main>
      </Container>
    </NavigationProvider>
  );
};

export default Default;

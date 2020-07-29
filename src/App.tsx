import 'dotenv/config';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Hooks from './hooks';
import GlobalStyle from './styles/global';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <Hooks>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Hooks>
      <GlobalStyle />
      <ToastContainer />
    </>
  );
};

export default App;

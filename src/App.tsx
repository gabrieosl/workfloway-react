import 'dotenv/config';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './context/AuthContext';
import { TypesProvider } from './context/TypesContext';
import GlobalStyle from './styles/global';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <TypesProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </TypesProvider>
      </AuthProvider>
      <GlobalStyle />
      <ToastContainer />
    </>
  );
};

export default App;

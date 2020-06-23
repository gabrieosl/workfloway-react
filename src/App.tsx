import 'dotenv/config';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './context/AuthContext';
import { TypesProvider } from './context/TypesContext';
import { SelectionProvider } from './context/SelectionContext';
import GlobalStyle from './styles/global';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <TypesProvider>
          <SelectionProvider>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </SelectionProvider>
        </TypesProvider>
      </AuthProvider>
      <GlobalStyle />
      <ToastContainer />
    </>
  );
};

export default App;

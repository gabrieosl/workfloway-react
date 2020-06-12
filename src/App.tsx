import 'dotenv/config';

import React from 'react';
import { Router } from 'react-router-dom';
// import { PersistGate } from 'redux-persist/integration/react';
// import { Provider } from 'react-redux';

import history from './services/history';
import GlobalStyle from './styles/global';

// import { store, persistor } from './store';
import Routes from './routes';

const App: React.FC = () => {
  return (
    // <Provider store={store}>
    // <PersistGate persistor={persistor}>
    <Router history={history}>
      <Routes />
      <GlobalStyle />
    </Router>
    // </PersistGate>
    // </Provider>
  );
};

export default App;

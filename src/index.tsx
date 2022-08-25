import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import { store } from './redux/store';
import './globalStyles/style.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  /* HashRouter only for normal working in github */
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);

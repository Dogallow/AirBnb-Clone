import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import * as createUser from './store/users'
import ModalProvider from './context/Modal';


const store = configureStore()

if(process.env.NODE_ENV !== 'production'){
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store
  window.sessionActions = sessionActions;
  // window.createUser = createUser
}

function Root ()  {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          
            <App />
        
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root/>
  </React.StrictMode>,
  document.getElementById('root')
);

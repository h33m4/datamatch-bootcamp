import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {BrowserRouter} from 'react-router-dom';

import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import { createStore, combineReducers } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase';

import { composeWithDevTools } from 'redux-devtools-extension';

const firebaseConfig = {
    apiKey: "AIzaSyDypEIto-2k6g8eSoyVxbOcGa0WGsG6D6w",
    authDomain: "bootcamp-pt1.firebaseapp.com",
    databaseURL: "https://bootcamp-pt1-default-rtdb.firebaseio.com",
    projectId: "bootcamp-pt1",
    storageBucket: "bootcamp-pt1.appspot.com",
    messagingSenderId: "82302162584",
    appId: "1:82302162584:web:33568156b4d50d0536a2ed"
  };

firebase.initializeApp(firebaseConfig);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer
  });
  
// Create store with reducers /removed initial state/
const store = createStore(rootReducer, composeWithDevTools());

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
}

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
  };

ReactDOM.render(
    <Provider store={store}>
       <ReactReduxFirebaseProvider {...rrfProps}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
       </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);

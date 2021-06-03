import React, { useState } from 'react';
import {applyMiddleware, createStore} from 'redux'
import { Provider} from 'react-redux'
import mainReducer from './redux/reducers/mainReducer'
import thunk from 'redux-thunk'
import App2 from './App2'

const reduxStore = createStore(mainReducer,applyMiddleware(thunk))

const App = () => {
  return (
    <Provider store={reduxStore}>
      <App2/>
    </Provider>
  );
}


export default App

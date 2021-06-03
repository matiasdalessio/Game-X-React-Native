
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GameStore from './screens/gameScreens/GameStore'
import { applyMiddleware, createStore } from 'redux';
import mainReducer from './redux/reducers/mainReducer'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import GamesAll from './screens/gameScreens/GamesAll';

const myStore = createStore(mainReducer, applyMiddleware(thunk))
export default function App() {
  return (
    <Provider store={myStore}>
      {/* <GamesAll /> */}
    </Provider>
  );
}


export default App

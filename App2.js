import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigatorDrawer from './navigation/NavigatorDrawer';
import NavigatorBottomTab from './navigation/NavigatorBottomTab';
import { ActivityIndicator, StatusBar } from 'react-native';
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const App2 = (props) => {

  return (
      <NavigationContainer>
        <StatusBar/>
        <NavigatorBottomTab/>
      </NavigationContainer>
  );
}

const mapStateToProps = state => {
  return{
    hola:"hola"
    // user: state.authReducer.user,
  }
}

const mapDispatchToProps = {
  // signInLS: authActions.signInLS
  hola2:"hola"
}

export default connect(mapStateToProps,mapDispatchToProps)(App2)

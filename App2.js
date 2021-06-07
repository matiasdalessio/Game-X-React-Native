import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigatorDrawer from './navigation/NavigatorDrawer';
import { ActivityIndicator, StatusBar } from 'react-native';
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import NavigatorBottomTab from './navigation/NavigatorBottomTab';
import Toast from 'react-native-toast-message'
import Loader from './screens/Loader';

const App2 = (props) => {
  return (
      <NavigationContainer>
        {/* <StatusBar /> */}
        <NavigatorBottomTab />
        {/* <Loader/> */}
        <Toast ref={(ref)=>Toast.setRef(ref)}/>
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

}

export default connect(mapStateToProps,mapDispatchToProps)(App2)

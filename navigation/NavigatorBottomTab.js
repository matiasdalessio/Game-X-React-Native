import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import SignOptions from "../screens/SignOptions";
import Index from "../screens/Index";
import GameStore from "../screens/gameScreens/GameStore";
import GamesAll from '../screens/gameScreens/GamesAll';
import Game from '../screens/gameScreens/Game';
import { Icon } from "react-native-elements";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();


const TabNavigator = ()=>{

    const MiddleIcon = ({ navigation }) => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('store')}
            style={styles.container}>
                <Icon  onPress={() => navigation.navigate('store')} name="shopping-outline" type="material-community" color="black" size={30}/>
          </TouchableOpacity>
        );
      };
      
      const SignInIcon = ()=>{
        return <View style={{width:0,height:0}} />
      }


      const Navigation = (props)=>{
          return(
          <View style={styles.tabBar}>
                <TouchableOpacity activeOpacity={.8} onPress={()=>props.navigation.navigate("home")}>
                    <Icon name="home-outline" type="material-community" size={42} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.container} activeOpacity={.8} onPress={()=> props.navigation.navigate("store")}>
                    <Icon  name="shopping-outline" type="material-community" color="black" size={30}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.8} onPress={()=>props.navigation.navigate("signOptions")}>
                    <Icon name="account-outline" type="material-community" size={42} />
                </TouchableOpacity>              
            </View>
          )

      }


      return (
        <Tab.Navigator tabBar={props=><Navigation {...props}/> } >
            <Tab.Screen name="home" component={Index}/>

             <Tab.Screen name="store" component={GameStore}/> 

            <Tab.Screen name="signUp" component={SignUp}/> 

            <Tab.Screen name="signIn" component={SignIn}/> 

             <Tab.Screen name="signOptions" component={SignIn}/>

            <Tab.Screen name="gameAll" component={GamesAll}/>

            <Tab.Screen name="game" component={Game}/>

        </Tab.Navigator>
    )
}


const styles = StyleSheet.create({
    centerIcon:{
        transform:[{translateY:hp('0%')}],
        // position:'absolute'
    },
    container: {
        position: 'absolute',
        top: wp('-10%'),
        left:wp('40%'),
        height: wp('20%'),
        width: wp('20%'),
        borderRadius: wp('20%'),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0,
        shadowRadius: 4.65,
        elevation: 7,
        flex: 1,
        zIndex:100
    },
    imageContainer: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 30,
        height: 30,
    },  
    tabBar:{
        width:wp('100%'),
        height:hp('6.5%'),
        position:'relative',
        flexDirection:'row',
        justifyContent:'space-around',
        overflow:'visible'
        // backgroundColor:'red',
    },
    middleIcon:{
        padding:20,
        transform:[{translateY:hp('-2%')}],
        backgroundColor:'red',
        borderRadius:wp('100%'),
    }
})


export default TabNavigator

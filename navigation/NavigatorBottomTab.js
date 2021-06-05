import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Keyboard, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import SignOptions from "../screens/SignOptions";
import Index from "../screens/Index";
import GameStore from "../screens/gameScreens/GameStore";
import GamesAll from '../screens/gameScreens/GamesAll';
import Game from '../screens/gameScreens/Game';
import Store from '../screens/Store';
import Cart from '../screens/Cart';
import { Icon } from "react-native-elements";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
import HardwareStore from "../screens/hardwareScreens/HardwareStore";
import IndividualHardware from "../screens/hardwareScreens/IndividualHardware";
import { connect } from "react-redux";

const Tab = createBottomTabNavigator();


const TabNavigator = (propsComponente)=>{

    const [show, setShow] = useState(true)


    useEffect(()=>{
        Keyboard.addListener('keyboardDidShow',()=>{
            setShow(false)
        })
        Keyboard.addListener('keyboardDidHide',()=>{
            setShow(true)
        })
        return()=>{
            Keyboard.removeAllListeners('keyboardDidShow')
            Keyboard.removeAllListeners('keyboardDidHide')
        }
    },[])

    const Navigation = (props)=>{
          return(show ?
          <View style={styles.tabBar}>
                <TouchableOpacity activeOpacity={.8} onPress={()=>props.navigation.navigate("home")}>
                    <Icon name="home-outline" type="material-community" size={42} />
                </TouchableOpacity>
                    <Icon style={{opacity:0}} name="shopping-outline" type="material-community" color="black" size={42}/>
                <TouchableOpacity style={{position:'relative'}} activeOpacity={.8} onPress={()=> !propsComponente.userLogged ? props.navigation.navigate("signIn"): null }>
                   { !propsComponente.userLogged ? 
                    <Icon name="account-outline" type="material-community" size={42} style={styles.avatar}/>
                    :<Image source={{uri:'https://game-x-arg.herokuapp.com'+propsComponente.userLogged.avatar}} style={styles.avatar}/>
                   }
                </TouchableOpacity>              
                <TouchableOpacity style={styles.container} activeOpacity={.8}  onPress={()=> props.navigation.navigate("storeMain")}>
                    <Icon  name="shopping-outline" type="material-community" color="black" size={30}/>
                </TouchableOpacity>
//                 <TouchableOpacity activeOpacity={.8} onPress={()=>props.navigation.navigate("cart")}>
//                     <Icon name="account-outline" type="material-community" size={42} />
//                 </TouchableOpacity>
            </View>
            : null
          )

      }


      return (
        <Tab.Navigator tabBar={props=><Navigation {...props}/> } >

            <Tab.Screen name="home" component={Index}/>

             <Tab.Screen name="store" component={GameStore}/>

             <Tab.Screen name="storeMain" component={Store}/> 

            <Tab.Screen name="signOptions" component={SignOptions}/>

            <Tab.Screen name="signUp" component={SignUp}/>

            <Tab.Screen name="signIn" component={SignIn}/>
          
            <Tab.Screen name="gameAll" component={GamesAll}/>

            <Tab.Screen name="game" component={Game}/>

            <Tab.Screen name="hardware" component={IndividualHardware}/>

            <Tab.Screen name="hardwareAll" component={HardwareStore}/>

            <Tab.Screen name="cart" component={Cart}/>

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
    },
    avatar:{
        width:wp('13%'),
        height:wp('13%'),
        borderRadius:wp('100%'),
    }
})

const mapStateToProps = state => {
    return {
        userLogged : state.userReducer.userLogged
    }
}

export default connect(mapStateToProps)(TabNavigator)
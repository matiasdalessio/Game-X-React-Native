import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import SignOptions from "../screens/SignOptions";
import Index from "../screens/Index";
import GameStore from "../screens/gameScreens/GameStore";
import { Icon } from "react-native-elements";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
// https://dribbble.com/shots/7046707-Nav-Bar-Animation

const Tab = createBottomTabNavigator();


const TabNavigator = ()=>{


    const MiddleIcon = ({ navigation }) => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('store')}
            style={styles.container}>
            {/* <View style={styles.imageContainer}> */}
                <Icon  onPress={() => navigation.navigate('store')} name="shopping-outline" type="material-community" color="black" size={30}/>
            {/* </View> */}
          </TouchableOpacity>
        );
      };
      
    return (
        <Tab.Navigator tabBarOptions={{showLabel:false}}>
            <Tab.Screen name="home" component={Index} options={{
                // tabBarIcon:()=>{<FontAwesome5 name="book-medical" size={24} color="red" />},
                tabBarLabel:()=>null,
                tabBarIcon:()=><Icon name="home-outline" type="material-community" size={42} />
                // tabBarButton:()=><FontAwesome5 name="book-medical" size={24} color="red" />,
                // tabBarBadge:()=><FontAwesome5 name="book-medical" size={24} color="red" />,
                // tabBarBadgeStyle:()=><FontAwesome5 name="book-medical" size={24} color="red" />
            }}/>
           { 2 + 2 === 5 && <Tab.Screen name="signOptions" component={SignIn} options={{
                tabBarLabel:()=>null,
                tabBarIcon:()=><Icon name="account-circle" size={24} reverse />,
                tabBarVisible:false
                // tabBarVisibilityAnimationConfig:(props)=>{console.log(props)}
            }}/> }
            <Tab.Screen name="store" component={GameStore} options={({ navigation }) => {
                    return {
                        tabBarIcon: () => <MiddleIcon navigation={navigation} />,
                    }
            }} /> 
            {2 + 2 === 5 && <Tab.Screen name="signIn" component={SignIn} options={{
                tabBarLabel:()=>null,
                tabBarIcon:()=>null,
            }}/> }
            <Tab.Screen name="signUp" component={SignUp} options={{
                tabBarIcon:()=><Icon name="account-outline" type="material-community" size={42} />,
            }}/> 
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
        bottom: wp('2.5%'),
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
    },
    icon: {
        width: 40,
        height: 40,
        tintColor: '#fff',
        alignContent: 'center',
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
})

export default TabNavigator;




// {
//     home: {
//         screen: home,
//         navigationOptions: {
//             tabBarIcon: () => <FontAwesome5 name="book-medical" size={24} color="#CDCCCE" />
//         },
//     },
//     Measures: {
//         screen: signIn,
//         navigationOptions: {
//             tabBarIcon: () => <FontAwesome5 name="heartbeat" size={24} color="#CDCCCE" />
//         }
//     },
//     Add: {
//         screen: () => <View></View>,
//         navigationOptions: {
//             tabBarIcon: ()=>{
//                 return <View style={styles.button}>
//                             <FontAwesome5 name="plus" size={24} color="red" />
//                         </View>
//             }

//         }
//     },
//     Treatment: {
//         screen: signUp,
//         navigationOptions: {
//             tabBarIcon: () => <FontAwesome5 name="band-aid" size={24} color="#CDCCCE" />
//         }
//     },
//     Profile: {
//         screen: signOptions,
//         navigationOptions: {
//             tabBarIcon: () => <FontAwesome5 name="user" size={24} color="#CDCCCE" />
//         }
//     }
// },
// {
//     tabBarOptions: {
//         showLabel: true
//     }
// }
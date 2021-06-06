import React, { useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Index from '../screens/Index';
import { Image, ScrollView, StyleSheet, View, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Cart from '../screens/Cart';



const Drawer = createDrawerNavigator();

const NavigatorDrawer = (props) => {

    // const logOut  = ()=>{
    //     props.logOut()
    // }

    const header = ({navigation})=>{
        return (
        <DrawerContentScrollView>
            <View style={styles.header}>
                <View style={styles.contenedorImagen}>
                    { 
                    !props.user ?<>
                        <TouchableWithoutFeedback onPress={()=> navigation.navigate('signin')  }>
                            <Icon name='account-circle' type='material' size={styles.iconoUsuario.fontSize} style={styles.iconoUsuario}/>
                        </TouchableWithoutFeedback>
                        <View>
                                <Text style={styles.userName}>
                                    Welcome!
                                </Text>
                        </View>
                    </>
                    : <>
                    <TouchableWithoutFeedback>
                        {/* <Image source={{uri:props.user.image}} style={styles.imagenUsuario}/> */}
                    </TouchableWithoutFeedback>
                    <View>
                        <Text style={styles.userName}>
                            Welcome!
                        </Text>
                        {/* <Text style={styles.userNameBottom}>
                            {props.user.firstName}
                        </Text> */}
                    </View>
                </>
                    }
                </View>

            </View>
            <View style={styles.body}>
                <TouchableHighlight>
                        <DrawerItem 
                        style={styles.drawerItemStyle} 
                        label="Home"
                        icon={ () => <Icon 
                            name="home"
                            type='material'
                            color='#00aced'
                        />}
                        onPress={()=> navigation.navigate('home')}
                        />
                    </TouchableHighlight>
                <TouchableHighlight >
                    <DrawerItem 
                    style={styles.drawerItemStyle} 
                    label="Cities"
                    icon={ () => <Icon 
                    name="explore"
                    type='material'
                    color='#00aced'
                    />}
                    onPress={()=> navigation.navigate('cities')}
                    />
                </TouchableHighlight>
            </View>
            <View style={styles.footer}>
                 { props.user ? <TouchableHighlight style={styles.drawerItemStyleLogOut} >
                    <DrawerItem 
                    style={styles.drawerItemStyle} 
                    label="Log Out"
                    icon={ () => <Icon 
                    name="logout"
                    type='material'
                    reverseColor
                    />}
                    onPress={logOut}
                    />
                </TouchableHighlight>
                : null    
            }
            </View>
        </DrawerContentScrollView>)
    }
  return (
      <Drawer.Navigator drawerContent={header} initialRouteName="home" drawerType="front" edgeWidth={15} drawerStyle={styles.drawerStyle}>
        <Drawer.Screen name="home" component={Index} />
        <Drawer.Screen name="cart" component={Cart}/>
        {!props.user ? 
        <>
            <Drawer.Screen name="signIn" component={SignIn}/>
            <Drawer.Screen name="signUp" component={SignUp}/>
        </>
        :null
        }
        {/* <Drawer.Screen name="city" component={City}/> */}
        {/* <Drawer.Screen name="itineraryInfo" component={ItineraryMoreInfo}/> */}
      </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
    drawerStyle:{
        width:'65%',
        height:hp('100%'),
        justifyContent:'space-between'
        // backgroundColor: '#rgba(255,255,255,0.9)'
    },
    drawerItemStyle:{
        marginLeft:wp('7.5%'),
    },
    drawerItemStyleLogOut:{
        marginTop:hp('10%')
    },
    header:{
        width:wp('100%'),
        height:hp('15%'),
        borderBottomWidth:2,
        borderBottomColor:'#3bc9f3'
        // backgroundColor:'wheat'
    },
    contenedorImagen:{
        width:'100%',
        height:'50%',
        marginLeft:wp('5%'),
        marginTop:wp('5%'),
        flexDirection:'row',
        alignItems:'center',
        
    },
    iconoUsuario:{
        fontSize:60,

    },
    imagenUsuario:{
        width:wp('18%'),
        height:wp('18%'),
        backgroundColor:'#3bc9f3',
        borderRadius:wp('100%')
    },
    userName:{
        marginLeft:wp('5%'),
        marginVertical:5,
        fontSize:wp('5%'),
        // backgroundColor: "#DDDDDD",
    },
    userNameBottom:{
        marginLeft:wp('5%'),
        marginVertical:5,
        fontSize:wp('6.5%'),
        textAlign:'center'
    },
    body:{
        width:'100%',
        height:hp('60%')
    },
    footer:{    
        height:hp('20%'),
        width:'100%',
        
    }
})

const mapStateToProps = state =>{
    return {
        // user: state.authReducer.user
    }
}

const mapDispatchToProps = {
    // logOut: authActions.signOut
}


export default connect(mapStateToProps, mapDispatchToProps)(NavigatorDrawer)
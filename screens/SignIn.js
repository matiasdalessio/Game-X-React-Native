import React, { useEffect, useState } from 'react'
import { Keyboard, View, StyleSheet, ScrollView, Text, ImageBackground, Image, TouchableHighlight, TextInput, TouchableOpacity, TouchableWithoutFeedback, ToastAndroid } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
import { Tile, Button, Icon } from 'react-native-elements';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions'
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message'
import * as Google from "expo-google-app-auth";


const SignIn = (props)=>{
    const [user, setUser] = useState({userName:"",password:""})
    const [loading, setLoading] = useState(false)

    const showToast = () => { ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT); }; 
    const showToastWithGravity = () => { ToastAndroid.showWithGravity( 'All Your Base Are Belong To Us', ToastAndroid.SHORT, ToastAndroid.CENTER ); }; 
    const showToastWithGravityAndOffset = () => { ToastAndroid.showWithGravityAndOffset( 'A wild toast appeared!', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50 ); };


    const Flechas = ()=>{
        const lineas = {
            width:wp('42.5%'),
            height:hp('.6%'),
            backgroundColor:'rgb(255,200,0)',
            flexDirection:'row',
            position:'relative',
            borderBottomRightRadius:wp('100%'),
            borderBottomLeftRadius:wp('100%')
        }
        const linesContainer = {
            width:wp('100%'),
            flexDirection:'row',
            justifyContent:'space-evenly',
            // position:'relative',
            marginBottom:hp('1%')
        }
        const arrowLeft = {
            width:wp('5%'),
            height:hp('.6%'),
            backgroundColor:'rgb(255,200,0)',
            position:'absolute',
            top:hp('.8%'),
            left:wp('41.2%'),
            transform:[{rotateZ:'50deg'}],
            borderRadius:wp('10%')
        }
        const arrowRight = {
            width:wp('5%'),
            height:hp('.6%'),
            backgroundColor:'rgb(255,200,0)',
            position:'absolute',
            top:hp('.8%'),
            left:wp('43.9%'),
            transform:[{rotateZ:'-50deg'}],
            borderRadius:wp('10%')
        }



        return (<View style={linesContainer}>
            <View style={lineas}>
                <View style={arrowLeft}></View>
                <View style={arrowRight}></View>
            </View>
            <View style={lineas}>
            </View>
        </View>
        )
    }
    const readInput = (e,field)=>{
        setUser({
            ...user,
            [field]:e
        })
    }
    const toastF = (type,title,text,visibilityTime,autoHide,onShow,onHide,onPress)=>{
        return Toast.show({
            type,
            text1:title,
            text2:text,
            visibilityTime,
            autoHide,
            onShow,
            onHide,
            onPress
        })
    }
    // Toast.show({
    //     type: 'success | error | info',
    //     position: 'top | bottom',
    //     text1: 'Hello',
    //     text2: 'This is some something 👋',
    //     visibilityTime: 4000,
    //     autoHide: true,
    //     topOffset: 30,
    //     bottomOffset: 40,
    //     onShow: () => {},
    //     onHide: () => {},
    //     onPress: () => {}
    // })
    const signIn = (googleUser)=>{
        let userInfo = googleUser ? googleUser : user
        setLoading(true)
        const sendLogIn = async () => {
            const respuesta = await props.logUser(userInfo)
            if (!respuesta) {
                console.log(respuesta)
                toastF('error','Error','Error trying to connect with server',2500,true)
            } else if (respuesta.error) {
                console.log("error")
                setLoading(false)
                toastF('error','Error','Username or password Incorrect',2500,true)
            } else {
                toastF('success','Welcome','Welcome to Game-X',2500,true)
                setLoading(false)
                setUser({userName:"",password:""})
                props.navigation.navigate('home')
            }   
        }
            sendLogIn()
    }

    // import React from "react";
    // import { StyleSheet, View, Button } from "react-native";
    
    // const LoginScreen = ({ navigation }) => {
      const signInAsync = async () => {
        console.log("LoginScreen.js 6 | loggin in");
        setLoading(true)
        try {
          const { type, user } = await Google.logInAsync({
            // iosClientId: `<YOUR_IOS_CLIENT_ID>`,
            androidClientId: `382714051375-l6ppnha19bouskqa43p1kt5n1m0b61hr.apps.googleusercontent.com`,
          });
    
          if (type === "success") {
            // Then you can use the Google REST API
            console.log("LoginScreen.js 17 | success, navigating to profile");
            // navigation.navigate("Profile", { user });
            signIn({userName:user.email,password:"matias"+user.id,country:'null'})
          }
        } catch (error) {
          console.log("LoginScreen.js 19 | error with login", error);
        }
      };
    
    //   return (
    //     <View style={styles.container}>
    //       <Button title="Login with Google" onPress={signInAsync} />
    //     </View>
    //   );
    // };
    
    // export default LoginScreen;
    
    // const styles = StyleSheet.create({});






    return (
        <ScrollView>
            <ImageBackground source={require('../assets/stormDragon.jpg')} style={styles.fondo}>
            {loading &&<ActivityIndicator animating={true} color="white" size={30} style={{zIndex:100,position:'absolute',left:wp('45%'),top:hp('44%')}}/>}
                <View style={styles.fondo}>
                    <View style={styles.legend}>
                        <Text style={styles.legendText}>Your Legend Starts Here </Text>
                        <Flechas />
                        <Flechas />
                    </View>
                    <View style={styles.inputsContainer}>
                        <View style={styles.inputIconCtn}>
                            <Icon name="account-circle" color="white" size={30}/>
                            <TextInput style={styles.inputs} placeholder="Username" value={user.userName} placeholderTextColor='rgba(255,255,255,.7)'   keyboardType="default" onChangeText={(e)=>readInput(e,"userName")} />
                        </View>
                        <View style={styles.inputIconCtn}>
                            <Icon name="vpn-key" color="white" size={30}/> 
                            <TextInput style={styles.inputs} placeholder="password" secureTextEntry value={user.password} placeholderTextColor='rgba(255,255,255,.7)'  keyboardType="default" onChangeText={(e)=>readInput(e,"password")} />
                        </View>
                        <TouchableOpacity activeOpacity={.5} style={styles.signInButton} onPress={signIn}>
                            <Text style={styles.signInButtonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.otherSignInOptions}>
                        <TouchableOpacity activeOpacity={.6} style={styles.signInOption} onPress={signInAsync}>
                            <Icon name="google-plus" type="material-community" color="#ec4e1d" size={40}/>
                            <Text style={styles.signInOptionText}>Sign in with Google</Text> 
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.6} style={styles.signInOption}>
                            <Icon name="facebook" type="material-community" color="#4064ac" size={40}/>
                            <Text style={styles.signInOptionText}>Sign in with Facebook</Text> 
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity activeOpacity={.7}>
                            <Text style={styles.footerTextPwd}>Forgot password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.7} onPress={()=>props.navigation.navigate('signUp')}>
                            <Text style={styles.footerTextChange}>New Here? Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

const styles=StyleSheet.create({
    fondo:{
        width:wp('100%'),
        height:hp('99.8'),
        backgroundColor:'rgba(0,0,0,0.3)'
    },
    legend:{
        width:wp('100%'),
        height:wp('25%'),
        // backgroundColor:'red',
        justifyContent:'flex-end'
    },
    legendText:{
        fontSize:wp('7.5%'),
        textAlign:'center',
        color:'white',
        fontWeight:'bold'
    },
    inputsContainer:{
        width:wp('100%'),
        height:hp('30%'),
        // backgroundColor:'red',
        marginTop:hp('14%'),
        alignItems:'center',
        marginBottom:hp('2.5%')
    },
    inputIconCtn:{
        flexDirection:'row',
        width:wp('90%'),
        height:hp('7%'),
        alignItems:'center',
        borderWidth:wp('.6'),
        borderRadius:wp('100%'),
        backgroundColor:'rgba(21, 40, 109,0.4)',
        paddingLeft:wp('5%'),
        marginBottom:hp('2.5%'),
        borderColor:'white'
    },
    inputs:{
        color:'white',
        fontWeight:'bold',
        fontSize:wp('5%'),
        paddingLeft:wp('5%')
    },
    signInButton:{
        width:wp('50%'),
        height:hp('8%'),
        borderColor:'rgba(255,255,255,0.7)',
        borderWidth:wp('1%'),
        borderRadius:wp('100%'),
        backgroundColor:'rgba(21, 40, 109,0.4)',
        marginTop:hp('2.5%'),
        justifyContent:'center'
    },
    signInButtonText:{
        fontSize:wp('8%'),
        color:'white',
        textAlign:'center'
    },
    otherSignInOptions:{
        width:wp('100%'),
        alignItems:'center',
        paddingTop:hp('3%'),
        // backgroundColor:'red'
    },
    signInOption:{
        width:wp('90%'),
        height:hp('7%'),
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:wp('100%'),
        marginBottom:hp('2.5%'),
    },
    signInOptionText:{
        fontSize:wp('6%'),
        fontWeight:'bold',
        paddingLeft:wp('2.5%')
    },
    footer:{
        width:wp('100%'),
        height:hp('10%'),
        // backgroundColor:'red',
        justifyContent:'space-between',
        flexDirection:'row',
        paddingHorizontal:wp('5%'),
        alignItems:'flex-end'
    },
    footerTextPwd:{
        color:'white',
        fontSize:wp('5%'),

    },
    footerTextChange:{
        color:'white',
        fontSize:wp('5%'),
        fontWeight:'bold',
        textDecorationLine:'underline',
    }

})

const mapStateToProps = state => {
    return {
    userLogged: state.userReducer.userLogged,
    // navigationRedux: state.navigationReducer.navigationRedux
    }
    }
    const mapDispatchToProps = {
    newUser: userActions.newUser,
    logUser: userActions.logUser
    }
    
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

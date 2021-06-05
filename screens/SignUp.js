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

const SignUp = (props)=>{
    const [user, setUser] = useState({userName:"",password:""})
    const [loading, setLoading] = useState(false)

    const showToast = () => { ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT); }; 
    const showToastWithGravity = () => { ToastAndroid.showWithGravity( 'All Your Base Are Belong To Us', ToastAndroid.SHORT, ToastAndroid.CENTER ); }; 
    const showToastWithGravityAndOffset = () => { ToastAndroid.showWithGravityAndOffset( 'A wild toast appeared!', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50 ); };


    const Flechas = ()=>{
        const lineas = {
            width:wp('42.5%'),
            height:hp('.6%'),
            backgroundColor:'#a4f7f7',
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
            backgroundColor:'#a4f7f7',
            position:'absolute',
            top:hp('.8%'),
            left:wp('41.2%'),
            transform:[{rotateZ:'50deg'}],
            borderRadius:wp('10%')
        }
        const arrowRight = {
            width:wp('5%'),
            height:hp('.6%'),
            backgroundColor:'#a4f7f7',
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
    const signIn = ()=>{
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
        const sendLogIn = async () => {
            setLoading(true)
            let userInfo = user
            const respuesta = await props.logUser(user)
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


    return (
        <ScrollView>
            <ImageBackground source={require('../assets/night.jpg')} style={styles.fondo}>
            {loading &&<ActivityIndicator animating={true} color="white" size={30} style={{zIndex:100,position:'absolute',left:wp('45%'),top:hp('44%')}}/>}
                <View style={styles.fondo}>
                    <View style={styles.legend}>
                        <Text style={styles.legendText}>This Is Only The Beginning </Text>
                        <Flechas />
                        <Flechas />
                    </View>
                    <View style={styles.inputsContainer}>
                        <View style={styles.inputIconCtn}>
                            <Icon name="account-circle" color="white" size={30}/>
                            <TextInput style={styles.inputs} placeholder="Choose your Username" value={user.userName} placeholderTextColor='rgba(255,255,255,.7)'   keyboardType="default" onChangeText={(e)=>readInput(e,"userName")} />
                        </View>
                        <View style={styles.inputIconCtn}>
                            <Icon name="account-circle" color="white" size={30}/>
                            <TextInput style={styles.inputs} placeholder="E-Mail" value={user.userName} placeholderTextColor='rgba(255,255,255,.7)'   keyboardType="default" onChangeText={(e)=>readInput(e,"email")} />
                        </View>
                        <View style={styles.inputIconCtn}>
                            <Icon name="vpn-key" color="white" size={30}/> 
                            <TextInput style={styles.inputs} placeholder="Password" secureTextEntry value={user.password} placeholderTextColor='rgba(255,255,255,.7)'  keyboardType="default" onChangeText={(e)=>readInput(e,"password")} />
                        </View>
                        <TouchableOpacity activeOpacity={.5} style={styles.signInButton} onPress={signIn}>
                            <Text style={styles.signInButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                        {/* PICKER COUNTRY Y PICKER IMAGE */}
                    </View>
                    <View style={styles.otherSignInOptions}>
                        {/* <TouchableOpacity activeOpacity={.6} style={styles.signInOption}>
                            <Icon name="google-plus" type="material-community" color="#ec4e1d" size={40}/>
                            <Text style={styles.signInOptionText}>Sign in with Google</Text> 
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.6} style={styles.signInOption}>
                            <Icon name="facebook" type="material-community" color="#4064ac" size={40}/>
                            <Text style={styles.signInOptionText}>Sign in with Facebook</Text> 
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity activeOpacity={.7}>
                            {/* <Text style={styles.footerTextPwd}>Forgot password?</Text> */}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.7} onPress={()=>props.navigation.navigate('signIn')}>
                            <Text style={styles.footerTextChange}>Have Account? Sign In</Text>
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
    
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

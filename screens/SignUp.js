import React, { useEffect, useState } from 'react'
import { Keyboard, View, StyleSheet, ScrollView, Text, ImageBackground, Image, TouchableHighlight, TextInput, TouchableOpacity, TouchableWithoutFeedback, ToastAndroid, Alert } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
import { Tile, Button, Icon } from 'react-native-elements';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions'
import Toast from 'react-native-toast-message'
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker'
import axios from 'axios';

const SignUp = (props)=>{
    const [newUser, setNewUser] = useState({userName:"",password:"",country:"",email:""})
    const [loading, setLoading] = useState(false)
    const [emailSignUp, setEmailSignUp] = useState(false)
    const [countries, setCountries] = useState([])
    
    const showToast = () => { ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT); }; 
    const showToastWithGravity = () => { ToastAndroid.showWithGravity( 'All Your Base Are Belong To Us', ToastAndroid.SHORT, ToastAndroid.CENTER ); }; 
    const showToastWithGravityAndOffset = () => { ToastAndroid.showWithGravityAndOffset( 'A wild toast appeared!', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50 ); };
    
    useEffect(()=>{
        axios.get(`https://restcountries.eu/rest/v2/all`)
        .then(response => setCountries(response.data))
        .catch(error => console.log(error))
    },[])
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState('');

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
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

    const Flechas = ()=>{
        const lineas = {
            width:wp('42.5%'),
            height:hp('.6%'),
            backgroundColor:'#0fd4bc',
            flexDirection:'row',
            position:'relative',
            borderBottomRightRadius:wp('100%'),
            borderBottomLeftRadius:wp('100%')
        }
        const linesContainer = {
            width:wp('100%'),
            flexDirection:'row',
            justifyContent:'space-evenly',
            marginBottom:hp('1%')
        }
        const arrowLeft = {
            width:wp('5%'),
            height:hp('.6%'),
            backgroundColor:'#0fd4bc',
            position:'absolute',
            top:hp('.8%'),
            left:wp('41.2%'),
            transform:[{rotateZ:'50deg'}],
            borderRadius:wp('10%')
        }
        const arrowRight = {
            width:wp('5%'),
            height:hp('.6%'),
            backgroundColor:'#0fd4bc',
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
        setNewUser({
            ...newUser,
            [field]:e
        })
    }

    const signUp = async (googleUser) => {
        setLoading(true)
        const formData = new FormData()
        formData.append('userName', newUser.userName)
        formData.append('avatar', pickedImagePath) 
        formData.append('country', newUser.country)
        formData.append('email', newUser.email)
        formData.append('password', newUser.password)
        let userInfo = !googleUser ? formData : googleUser
             const respuesta = await props.newUser(userInfo)
                 if (!respuesta) {
                    toastF('error','Error',"Error triying to connect with server",2500,true)
                    setLoading(false)

                 }else if (respuesta.message) {
                     toastF('error','Error',respuesta.message,2500,true)
                    setLoading(false)
                 } else {
                     switch(respuesta){
                         case 'The E-mail is already in use':
                            toastF('error','The E-mail is already in use','Try another one!',2500,true)
                            setLoading(false)
                             break
                         case 'There was an error in the register.':
                            toastF('error','There was an error in the register.','Please verify all the required fields are completed.',3500,true)
                            setLoading(false)
                             break
                         default:
                            toastF('success','Welcome','Welcome to Game-X',2500,true)
                            setLoading(false)

                     }
                 }
     }

     const signUpAsync = async () => {
        setLoading(true)
        try {
          const { type, user } = await Google.logInAsync({
            androidClientId: `382714051375-l6ppnha19bouskqa43p1kt5n1m0b61hr.apps.googleusercontent.com`,
          });
    
          if (type === "success") {
            signUp({userName:user.email,password:"matias"+user.id,country:'null',imageUrl:user.photoUrl,avatar:user.photoUrl})
          }
        } catch (error) {
          console.log("SignIn.js 142 | error with login", error);
        }
      };

      const changeImage = ()=>{
          Alert.alert(null,'Select Your Avatar',[{
              text:'Pic from the Gallery',
              onPress:()=>showImagePicker(),
          },
          {
              text:'Take a Pic with Camera',
              onPress:()=>openCamera()
          }
        ],{cancelable:true})
      }

      console.log(newUser)
    return (
        <ScrollView>
            <ImageBackground source={require('../assets/night.jpg')} style={styles.fondo}>
            {loading && <ActivityIndicator animating={true} color="red" size={50} style={{zIndex:100,position:'absolute',left:wp('40%'),top:hp('44%')}}/>}
                <View style={styles.fondo}>
                    <View style={styles.legend}>
                        <Text style={styles.legendText}>This Is Only The Beginning </Text>
                        <Flechas />
                        <Flechas />
                    </View>
                {
                    emailSignUp ? <>
                    <View style={styles.imageContainer}>
                    {
                        pickedImagePath !== '' ? 
                        <TouchableOpacity onPress={changeImage} activeOpacity={.7}>
                        <Image 
                        source={{ uri: pickedImagePath }}
                        style={styles.image}
                        />
                        </TouchableOpacity>
                        :<TouchableOpacity onPress={changeImage} activeOpacity={.7}>
                            <Icon  name="camera-wireless" type="material-community" size={50} reverse/>
                        </TouchableOpacity>
                    }
                    </View>
                    <View style={styles.inputsContainer}>
                        <View style={styles.inputIconCtn}>
                            <Icon name="account-circle" color="white" size={30}/>
                            <TextInput style={styles.inputs} placeholder="Choose your Username" value={newUser.userName} placeholderTextColor='rgba(255,255,255,.7)'   keyboardType="default" onChangeText={(e)=>readInput(e,"userName")} />
                        </View>
                        <View style={styles.inputIconCtn}>
                            <Icon name="email" color="white" size={30}/>
                            <TextInput style={styles.inputs} placeholder="E-Mail" value={newUser.email} placeholderTextColor='rgba(255,255,255,.7)'   keyboardType="email-address" onChangeText={(e)=>readInput(e,"email")} />
                        </View>
                        <View style={styles.inputIconCtn}>
                            <Icon name="vpn-key" color="white" size={30}/> 
                            <TextInput style={styles.inputs} placeholder="Password" secureTextEntry value={newUser.password} placeholderTextColor='rgba(255,255,255,.7)'  keyboardType="default" onChangeText={(e)=>readInput(e,"password")} />
                        </View>
                        <View style={styles.imagesPickerCtn}>
                            <TouchableOpacity onPress={showImagePicker}>
                                <View style={styles.imageIconsCtn}>
                                    <Icon name="image-multiple" color="white" type="material-community" size={30}/> 
                                    <Text style={styles.imagePickersText}> Gallery</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={openCamera}>
                                <View style={styles.imageIconsCtn}>
                                    <Icon name="camera-iris" color="white" type="material-community" size={30}/> 
                                    <Text style={styles.imagePickersText}> Take a Pic</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.countryPickerCtn}>
                            <Picker
                            style={styles.pickerStyle}
                            selectedValue={newUser.country}
                            onValueChange={(itemValue)=>setNewUser({
                                ...newUser,
                                country:itemValue
                                })
                            }
                            mode="dropdown"
                            >  
                            <Picker.Item label="Select your country" value="-"/>
                                {
                                countries.length > 0 ?
                                    countries.map((country,index) =>{
                                        return(
                                            <Picker.Item color="black" key={index} style={styles.itemPickerInd} label={country.name} value={country.name}/>
                                        )
                                    })
                                :null
                                }
                            </Picker>
                        </View>
                        
                    

                        <TouchableOpacity activeOpacity={.5} style={styles.signInButton} onPress={()=>signUp()}>
                            <Text style={styles.signInButtonText}>Sign Up</Text>
                        </TouchableOpacity>

                        {/* PICKER COUNTRY Y PICKER IMAGE */}

                    </View>

                </> 
                :<View style={styles.otherSignInOptions}>
                            <Text style={[styles.signInOptionText,{color:'white',marginBottom:hp('7%'),marginTop:hp('10%')}]}>Create account . . . </Text> 
                        <TouchableOpacity activeOpacity={.6} style={[styles.signInOption,{backgroundColor:'rgba(255,255,255,0.7)'}]} onPress={()=>setEmailSignUp(!emailSignUp)}>
                            <Icon name="email" type="material-community" color="#06a" size={40}/>
                            <Text style={styles.signInOptionText}>Sign Up with Email</Text> 
                        </TouchableOpacity>
                            <Text style={[styles.signInOptionText,{color:'white',marginVertical:hp('2.5%'),fontSize:wp('10%')}]}>Or...</Text> 
                        {/* <TouchableOpacity activeOpacity={.6} style={styles.signInOption}>
                            <Icon name="facebook" type="material-community" color="#4064ac" size={40}/>
                            <Text style={styles.signInOptionText}>Sign in with Facebook</Text> 
                        </TouchableOpacity> */}
                        <TouchableOpacity activeOpacity={.6} style={styles.signInOption}>
                            <Icon name="google-plus" type="material-community" color="#ec4e1d" size={40}/>
                            <Text style={styles.signInOptionText}>Sign Up with Google</Text> 
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.6} style={styles.signInOption}>
                            <Icon name="facebook" type="material-community" color="#4064ac" size={40}/>
                            <Text style={styles.signInOptionText}>Sign Up with Facebook</Text> 
                        </TouchableOpacity>
                    </View>
}
                    <View style={styles.footer}>
                        {   emailSignUp ?
                            <TouchableOpacity activeOpacity={.7} onPress={()=> setEmailSignUp(!emailSignUp)}>
                                <Text style={styles.footerTextPwd}>Go Back</Text>
                            </TouchableOpacity>
                            :<TouchableOpacity activeOpacity={.7} onPress={()=>props.navigation.navigate('signIn')}>
                                <Text style={styles.footerTextPwd}>Have Account?</Text>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity activeOpacity={.7} onPress={()=>props.navigation.navigate('signIn')}>
                            <Text style={[styles.footerTextChange,{marginRight:wp('5%')}]}>Or Sign In</Text>
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
        height:hp('50%'),
        // backgroundColor:'red',
        marginTop:hp('5%'),
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
    imageIconsCtn:{
        flexDirection:'row',
        width:wp('42.5%'),
        height:hp('7%'),
        alignItems:'center',
        borderWidth:wp('.6'),
        borderRadius:wp('100%'),
        backgroundColor:'rgba(21, 40, 109,0.4)',
        // paddingLeft:wp('2.5%'),
        marginBottom:hp('2.5%'),
        borderColor:'white',
        justifyContent:'center'
    },
    imagesPickerCtn:{
        flexDirection:'row',
        width:wp('90%'),
        height:hp('10%'),
        alignItems:'center',
        justifyContent:'space-around'
    },
    imagePickersText:{
        color:'white',
        fontSize:wp('6%')
    },
    inputs:{
        color:'white',
        fontWeight:'bold',
        fontSize:wp('5%'),
        paddingLeft:wp('5%'),
        width:'100%',
        height:'100%'
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
    },
    imageContainer: {
        width:wp('100%'),
        alignItems:'center',
        justifyContent:'center',
        height:hp('10%'),
        marginTop:hp('3%'),
    },
    image: {
        width: wp('25%'),
        height: wp('25%'),
        resizeMode: 'cover',
        borderRadius:wp('100%')
      },
      countryPickerCtn:{
        //   flexDirection:'row',
          width:wp('90%'),
          height:hp('7%'),
          alignItems:'center',
          justifyContent:'center',
          borderWidth:wp('.6'),
          borderRadius:wp('100%'),
          backgroundColor:'rgba(21, 40, 109,0.4)',
          paddingLeft:wp('5%'),
          marginBottom:hp('2.5%'),
          borderColor:'white'
      },
      pickerStyle:{
          width:'100%',
          height:'50%',
        //   backgroundColor:'red',
        //   textAlign:'center',
          color:'white',
        //   backgroundColor:'red'
        borderColor:'red',
        borderWidth:2
        //   fontSize:wp('10%')
      },
      itemPickerInd:{
          fontSize:50
      },
      

})

const mapStateToProps = state => {
    return {
    userLogged: state.userReducer.userLogged,
    // navigationRedux: state.navigationReducer.navigationRedux
    }
    }
    const mapDispatchToProps = {
    newUser: userActions.newUser
    }
    
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

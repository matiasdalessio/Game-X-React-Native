import React, { useEffect } from 'react'
import {View,StyleSheet, ScrollView, Text, ImageBackground, Image, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
import { Tile, Button } from 'react-native-elements';


const Index = (props)=>{
    useEffect(()=>{
            // props.addListener('focus',)
    })
    console.log(props)
        return (<>
                <View style={[styles.View]}> 
                <ImageBackground source={require('../assets/fondo.png')} style={styles.tileStyle}>
                    <TouchableOpacity style={styles.logo} activeOpacity={.5} onPress={()=>console.log("hola")}>
                        <Image source={require('../assets/logoGif.gif')} style={styles.logo}/>
                    </TouchableOpacity>
                    <Text style={styles.titleStyleFirstView}>Dive in Game-X-State</Text>
                </ImageBackground>
                  {/* <Tile
                        style={styles.tileStyle}
                        activeOpacity={1}
                        imageSrc={require('../assets/fondo.png')}
                        title="Dive in Game-X-State"
                        titleStyle={styles.titleStyleFirstView}
                        featured
                        titleNumberOfLines={2}
                        height={hp('55%')}
                    /> */}
                    
                    <Tile
                        imageSrc={require('../assets/fondoRobot.jpg')}
                        activeOpacity={.9}
                        height={hp('45%')}
                        title="GET STARTED!"
                        featured
                        titleStyle={styles.titleStyle}
                        overlayContainerStyle={styles.contentViewStylesSecondView}
                        onPress={()=>props.navigation.navigate('signOptions')}
                    />
                  
            </View>
               

            </>
    )   
        }

const styles = StyleSheet.create({
     View: {
       backgroundColor: '#f4f4f4',
       width:wp('100%'),
       height:hp('100%)')
     },
     logo:{
         width:wp('15%'),
         height:wp('15%'),
     },
     titleStyle:{
         fontSize:wp('8%'),
         borderRadius:120,
         borderWidth:wp('1%'),
        //  borderStyle:'dashed',
         borderColor:'white',
         padding:wp('3%'),
         backgroundColor:'rgba(0,150,120,0.7)',
         color:'rgba(255,255,255,0.9)',
         textAlignVertical:'center',
         transform:[{translateY:hp('2.5%')},{translateX:wp('0%')}],
     },
     tileStyle:{
         borderBottomWidth:3,
         borderStyle:'solid',
         borderColor:'white',
         height:hp('55%'),
         position:'relative'
     },
     contentViewStylesSecondView:{
         justifyContent:'flex-end',
        },
    titleStyleFirstView:{
        width:wp('50%'),
        // transform:[{translateY:hp('21%')},{translateX:wp('50%')}],
        fontSize:wp('7%'),
        textAlign:'center',
        color:'white',
        position:'absolute',
        top:hp('21%'),
        left:wp('50%')
    },

})

const mapStateToProps = state =>{
    return{
        // user : state.authReducer.user
    }
}

const mapDispatchToProps = {
    // getAllCitiesReference: citiesActions.getAllCities,
    
  };

export default connect(mapStateToProps,mapDispatchToProps)(Index)
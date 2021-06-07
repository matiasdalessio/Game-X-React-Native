
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View , ImageBackground , Image , TouchableOpacity , ScrollView , StatusBar, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import hardwareActions from '../../redux/actions/hardwareActions'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInput, Button } from 'react-native-paper';
import gameStyles from '../../styles/gameStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../Loader';
import FabUserLogged from '../../components/FabUserLogged'

const myIcon = <Icon name="rocket" size={30} color="#900" />;

    
    
    const App = (props)=> {
      
  
  let imageBanner = { uri: 'https://as.com/meristation/imagenes/2019/04/24/noticias/1556084573_597025_1556084668_noticia_normal.jpg' }
  
    const theScrollView = useRef()

    useEffect(() => {
      props.loadHardware()
      props.navigation.addListener('focus',()=>{
            if(theScrollView.current){
                theScrollView.current.scrollTo({x:0,y:0,animated:false})
            }
        })
    }, [])
  let hardwareToMap 

  !props.filteredHardware.length ? hardwareToMap = props.allHardware : hardwareToMap = props.filteredHardware

  if(!props.allHardware.length && !hardwareToMap.length){
    return (<View style={{ backgroundColor: '#061320', width: wp('100%'), height: hp('100%'), alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size={'large'} color='white' />
              {/* <Loader /> */}
            </View>)
  }

  return (

      <>
    <ScrollView style={{ backgroundColor: '#061320' }} ref={theScrollView}>
        <ImageBackground source={imageBanner} style={[gameStyles.container, { alignItems: 'center', justifyContent: 'center', margin: 0, height: hp('40%'),marginBottom:hp('2.5%')}]}>
            <Text style={[gameStyles.titleMain,{fontSize:wp('11%'),fontWeight:'bold',color:'whitesmoke',textDecorationLine:'underline'}]}>Your Next Console</Text>
            <TextInput style={gameStyles.inputSearch} placeholder="Search Consoles" theme={{ colors: { primary: '#0BC6C3' } }} mode="flat" selectionColor="black" underlineColor="#0BC6C3" right={<TextInput.Icon name="magnify" size={40} />} onChangeText={(e) => props.getfilteredHardware(e)} />
        </ImageBackground>
      <View style={{ backgroundColor: '#061320', flexDirection: 'row', flexWrap: 'wrap', margin: 0,paddingBottom:hp('5%') }}>

          {
          hardwareToMap.map(hardware =>{
            return(

              <View key={hardware._id} style={gameStyles.card}>
                <TouchableHighlight onPress={() => props.navigation.navigate('hardware', {hardware})}>
                  <ImageBackground source={{ uri: hardware.imageBanner }} style={[gameStyles.imageGameIB,{backgroundColor:'white'}]}>
                    <Text style={[gameStyles.titleCard,{backgroundColor:'rgba(0,0,0,0.7)'}]}>{hardware.productName}</Text>
                  </ImageBackground>
                </TouchableHighlight>
              </View>
            )
        })}
      </View>
    </ScrollView>
    {props.userLogged && <FabUserLogged />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  backgroundImage: {
    height: 50,
    width: 50
  },
  titulo: {
    color: 'white',
    fontSize: 25,
    marginBottom: 20,
    textAlign: 'center'
  },
  tituloPrincipal:{
    color: 'white',
    fontSize: 40,
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center'
  },
  cajita:{
      width: 350 , 
      height: 350,
      justifyContent: 'center',
      alignItems: 'center'
  },
  foto:{
      width: 250,
      height: 250,
      marginBottom: 5,
  },
  inputSearch:{
    width: '60%',
    textAlign: 'center',
    height:40,
    color: 'white',
     borderWidth: 2,
     borderColor: 'white'
  },
});

const mapStateToProps = (state) =>{
    return {
      allHardware: state.hardwareReducer.allHardwares,
      filteredHardware: state.hardwareReducer.filteredHardware,
      userLogged: state.userReducer.userLogged

    }
}

const mapDispatchToProps = {
    loadHardware: hardwareActions.loadHardwares,
    getfilteredHardware: hardwareActions.getfilteredHardware,
}

export default connect(mapStateToProps , mapDispatchToProps)(App)


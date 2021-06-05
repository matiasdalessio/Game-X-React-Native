
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { StyleSheet, Text, View , ImageBackground , Image , TouchableOpacity , ScrollView , StatusBar, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import hardwareActions from '../../redux/actions/hardwareActions'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const IndividualHarware = (props)=> {
    //const [IndividualHardware , setIndividualHardware] = useState([])
    const [hardware, setHardware] = useState({})
    useEffect(()=>{
        setHardware(props.route.params.hardware)
    },[props.route.params])

    useEffect(()=>{
        props.navigation.addListener('blur',()=>{
            setHardware({})
        })
        return ()=>{
            props.navigation.removeListener('blur')
        }
    },[])

    if(!hardware.productName){
        return (<View style={{ backgroundColor: '#061320', width: wp('100%'), height: hp('100%'), alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={'large'} color='white' />
                </View>)
    }
  return (
    <>
    <ScrollView>
        <View style={styles.container}>
            <Text style={styles.titulo}> {hardware.productName} </Text>
            <View style={styles.container}>
                <Image style={styles.foto} source={{uri: hardware.imageBanner}} />
            </View>
            <Text style={styles.tituloSecundario}>Caracteristicas:</Text>
            <Text style={styles.tituloTerciario}>Brand: {hardware.brand}</Text>
            <Text style={styles.tituloTerciario}>Features:</Text>
            {
                hardware.features.map((feature , index) =>{
                    return(
                        <Text style={styles.text} key={index}>{feature}</Text>
                    )
                })
            }
            <Text style={styles.tituloTerciario}>Description:</Text>
            <Text style={styles.text}>{hardware.description}</Text>
            <Text style={styles.tituloTerciario}>Stock: {hardware.stock}</Text>
            <Text style={styles.tituloTerciario}>Price: ${hardware.price}</Text>
            <TouchableOpacity style={styles.button}>
                <Button title='Buy'/>
            </TouchableOpacity>
        </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#4121B5',
  },
  foto:{
      width: 250,
      height: 250,
  },
  titulo:{
      fontSize: 35,
      textAlign: 'center',
      marginTop: 12,
      marginBottom: 12,
      fontWeight: 'bold',
  },
  tituloSecundario:{
      fontSize: 25,
      marginTop: 10,
      marginBottom: 10,
      color: 'white',
      textDecorationLine: 'underline'
  },
  tituloTerciario:{
      fontSize: 20,
      color: 'white',
      marginBottom: 10,
      textDecorationLine: 'underline'
  },
  button:{
      marginTop: 15,
      width: '50%'
  },
  text:{
      color: 'white',
      fontSize: 18,
      marginBottom: 5
  }
});

const mapStateToProps = (state) =>{
    return {
        allHardware: state.hardwareReducer.allHardwares
    }
}

const mapDispatchToProps = {
    loadHardware: hardwareActions.loadHardwares
}

export default connect(mapStateToProps , mapDispatchToProps)(IndividualHarware)

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , ImageBackground , Image , TouchableOpacity , ScrollView , StatusBar, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import hardwareActions from './redux/actions/hardwareActions'

const IndividualHarware = (props)=> {
    //const [IndividualHardware , setIndividualHardware] = useState([])
    useEffect(()=>{
        props.loadHardware()
    },[])
    console.log("soy un elemento" , props.allHardware[0])
  return (
    <>
    <StatusBar barStyle="light-content" />
    <ScrollView>
        <View style={styles.container}>
            <Text style={styles.titulo}> {props.allHardware[0].productName} </Text>
            <View style={styles.container}>
                <Image style={styles.foto} source={{uri: props.allHardware[0].imageBanner}} />
            </View>
            <Text style={styles.tituloSecundario}>Caracteristicas:</Text>
            <Text style={styles.tituloTerciario}>Brand: {props.allHardware[0].brand}</Text>
            <Text style={styles.tituloTerciario}>Features:</Text>
            {
                props.allHardware[0].features.map((feature , index) =>{
                    return(
                        <Text style={styles.text} key={index}>{feature}</Text>
                    )
                })
            }
            <Text style={styles.tituloTerciario}>Description:</Text>
            <Text style={styles.text}>{props.allHardware[0].description}</Text>
            <Text style={styles.tituloTerciario}>Stock: {props.allHardware[0].stock}</Text>
            <Text style={styles.tituloTerciario}>Price: ${props.allHardware[0].price}</Text>
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
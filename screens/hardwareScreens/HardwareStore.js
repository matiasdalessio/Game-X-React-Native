
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , ImageBackground , Image , TouchableOpacity , ScrollView , StatusBar, TextInput } from 'react-native';
import { connect } from 'react-redux';
import hardwareActions from '../../redux/actions/hardwareActions'

const App = (props)=> {
   const [allHardwares , setAllHardwares] = useState([])
    useEffect(()=>{
        props.loadHardware()
    },[])
    let arrayAux = []
    if(props.filteredHardware.length == 0){
      arrayAux = props.allHardware
    }else{
      arrayAux = props.filteredHardware
    }
  return (
      <>
    <StatusBar barStyle="light-content" />
    <ScrollView>
      <ImageBackground source={require('../../assets/fondo.png')} style={styles.container}>
          <Text style={styles.tituloPrincipal}>Hardware Store</Text>
          <TextInput style={styles.inputSearch} 
          placeholder="Search Hardware"
          onChangeText={ (value)=> props.getfilteredHardware(value)} />
          {
          arrayAux.map(hardware =>{
            return(
              <TouchableOpacity key={hardware._id} style={styles.cajita} onPress={
                ()=> alert("hola mundo")
              }>
                <Text style={styles.titulo}>{hardware.productName}</Text>
                <Image source={{uri: hardware.imageBanner}} style={styles.foto}/>
              </TouchableOpacity>
            )
        })}
      </ImageBackground>
    </ScrollView>

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
        filteredHardware: state.hardwareReducer.filteredHardware
    }
}

const mapDispatchToProps = {
    loadHardware: hardwareActions.loadHardwares,
    getfilteredHardware: hardwareActions.getfilteredHardware
}

export default connect(mapStateToProps , mapDispatchToProps)(App)

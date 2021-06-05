import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , ImageBackground , Image , TouchableOpacity , ScrollView , StatusBar, TextInput, Button , Alert } from 'react-native';
import { connect } from 'react-redux';

const Formulario = ()=>{
    const [newSell , setNewSell] = useState({
        firstName: '',
        lastName: '',
        city: '',
        cellphoneNumber: '',
        direction: ''
    })
    const leerInput = ( e , campo) =>{
        setNewSell({
            ...newSell,
            [campo]: e
        })
    }
    const imprimirInfo =()=>{
        Alert.alert(
            "Estas Seguro?",
            `la info a enviar es: firstName: ${newSell.firstName} , lastName: ${newSell.lastName} , cellphoneNumber: ${newSell.cellphoneNumber}`,
            [
                {text: 'Si' , onPress: ()=>{
                    console.log("soy newSell" , newSell)
                }},
                {text: 'No'}
            ]
        )
    }
    return(
        <>
        <StatusBar barStyle="light-content" />
        <View style={Styles.container}>
            <Text style={Styles.titulo}>01- Basic Information</Text>
            <Text style={Styles.tituloSecundario}>First Name:</Text>
            <TextInput style={Styles.input}
            placeholder="Please Insert Your First Name"
            placeholderTextColor= 'grey'
            onChangeText={(e)=>leerInput(e , 'firstName')}/>
            <Text style={Styles.tituloSecundario}>Last Name:</Text>
            <TextInput style={Styles.input}
            placeholder="Please Insert Your Last Name"
            placeholderTextColor='grey'
            onChangeText={(e)=>leerInput(e , 'lastName')}/>
            <Text style={Styles.tituloSecundario}>City:</Text>
            <TextInput style={Styles.input}
            placeholder="Please Insert Your City"
            placeholderTextColor='grey'
            onChangeText={(e)=>leerInput(e , 'city')}/>
            <Text style={Styles.tituloSecundario}>Cellphone number:</Text>
            <TextInput style={Styles.input}
            placeholder="Please Insert Your Cellphone Number"
            placeholderTextColor='grey'
            onChangeText={(e)=>leerInput(e , 'cellphoneNumber')}
            keyboardType={'number-pad'}/>
            <Text style={Styles.tituloSecundario}>Direction:</Text>
            <TextInput style={Styles.input}
            placeholder="Please Insert Your Direction"
            placeholderTextColor='grey'
            onChangeText={(e)=>leerInput(e , 'direction')}/>
        </View>
            <Button title="Enviar" onPress={imprimirInfo} />

        </>
    )
}

const Styles = StyleSheet.create({
    input:{
        borderWidth: 2,
        borderColor: 'black',
        width: '80%',
        height: 40,
        textAlign: 'center',
    },
    container:{
        flex: 1,
        backgroundColor: '#4217DD',
        alignItems: 'center'
    },
    titulo:{
        fontSize: 35,
        textTransform: 'capitalize',
        marginTop: 20
    },
    tituloSecundario:{
        fontSize: 20,
        color: 'white',
        marginBottom: 10,
        marginTop: 20
    }
})

export default Formulario
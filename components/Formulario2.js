import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , ImageBackground , Image , TouchableOpacity , ScrollView , StatusBar, TextInput, Button , Alert } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios'

const Formulario2 = () =>{
    const [allHardware , setAllHarware] = useState([])
    useEffect(()=>{
        fetch('https://game-x-arg.herokuapp.com/api/hardware')
        .then(datos => datos.json())
        .then(respuesta => setAllHarware(respuesta.response))
    },[])
    let nameBuyer = "Nicolas"
    let directionBuyer = "mitre 1495"
    let contactNumber = "2994386053"
    let creditCard = "5258 5515 7577 5747"

    const buy = ()=>{
        alert("compra satisfactoria")
    }
    const cancel = () =>{
        alert("cancelado")
    }
    return (
        <>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
            <Text style={styles.titulo}>This is your order Information</Text>
            <Text style={styles.texto}>Product Name: {allHardware[0].productName}</Text>
            <Text style={styles.texto}>Total price: {allHardware[0].price}</Text>
            <Text style={styles.texto}>With your card finished in: {creditCard}</Text>
            <Text style={styles.texto}>To deliver in: {directionBuyer}</Text>
            <Text style={styles.texto}>Contact Number: {contactNumber}</Text>
            <Text style={styles.texto}>This could only be recieved by {nameBuyer} or other person who validates his identity with ID and sign the delivery order.
            if you agree with this terms , and all this information seems correct, please click the "Buy" button to finish the process</Text>
            <TouchableOpacity onPress={buy}>
                <Text style={styles.button}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancel}>
                <Text style={styles.button}>Cancel</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}
const styles = StyleSheet.create({
    titulo:{
        fontWeight: 'bold',
        fontSize: 45,
        marginTop: 10,
        marginBottom: 15,
        textAlign: 'center'
    },
    texto:{
        fontSize: 20,
        marginBottom: 20
    },
    container:{
        flex: 1 , 
        backgroundColor: '#39DD17'
    },
    button:{
        marginBottom: 10
    }
})
export default Formulario2
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import axios from 'axios'

const Formulario2 = (props) => {
    const [allHardware, setAllHarware] = useState([])
    const [buyerInfo, setBuyerInfo] = useState(null)
    useEffect(() => {
        setBuyerInfo(props.route.params.newSell)
        fetch('https://game-x-arg.herokuapp.com/api/hardware')
            .then(datos => datos.json())
            .then(respuesta => setAllHarware(respuesta.response))
    }, [])

    const buy = () => {
        Alert.alert("compra satisfactoria")
    }
    const cancel = () => {
       Alert.alert(
        "Cancel Purchase",
        `Are you sure you want to cancel the purchase?`,
        [
            {text: 'YES', onPress: () => props.navigationRedux.navigate('storeMain') 
            },
            {text: 'NO'}
        ]
       )
    }
    return (
        <>
            <StatusBar barStyle="light-content" />
            {buyerInfo &&
            (<View style={styles.container}>
                <Text style={styles.titulo}>This is your order Information</Text>
            <View style={{ paddingLeft: wp('7%'), paddingRight: wp('7%')}}>
            <Text style={styles.texto}>This could only be recieved by {`${buyerInfo.firstName} ${buyerInfo.lastName}`} or other person who validates his identity with ID and sign the delivery order.</Text>
                <Text style={styles.texto}>Product Name: Play 5</Text>
                <Text style={styles.texto}>Total price: chorrocientos dolares</Text>
                <Text style={styles.texto}>To deliver in: {buyerInfo.direction}</Text>
                <Text style={styles.texto}>Contact Number: {buyerInfo.phone}</Text>
                <Text style={styles.texto}>if you agree with this terms , and all this information seems correct, please click the "Finish Buy" button to finish the process</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Button color="green" mode="contained" style={{ marginRight: 15 }} onPress={buy} >Finish Buy</Button>
                <Button color="red" mode="contained" style={{ marginRight: 15 }} onPress={cancel}>Cancel Buy</Button>
                </View>
            </View>
        </View>)}
        </>
    )
}
const styles = StyleSheet.create({
    titulo: {
        fontWeight: 'bold',
        fontSize: hp('4.5%'),
        marginTop: 10,
        marginBottom: 15,
        textAlign: 'center',
        color: 'white'
    },
    texto: {
        fontSize: hp('2.5%'),
        marginBottom: 20,
        color: 'white'
    },
    container: {
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: '#061320',
        justifyContent:'center'
    },
    button: {
        marginBottom: 10
    }
})
const mapStateToProps = state => {
    return {
    navigationRedux: state.navigationReducer.navigationRedux
    }
    }
    
export default connect(mapStateToProps, null)(Formulario2)
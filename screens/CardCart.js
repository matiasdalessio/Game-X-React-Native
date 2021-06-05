import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import gameStyles from '../styles/gameStyles';
import { Button } from 'react-native-paper';
//
const CardCart = (props) => {
    const { productCart, allCartLength } = props
    console.log('hola cart');

    return (
        <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', borderRadius: 15, margin: 'auto', marginLeft: wp('10%'), marginRight: wp('5%'), marginTop: hp('5%') }}>
            <View style={{ flexDirection: 'row', width: '40%' }}>
                <View style={[gameStyles.card, { width: wp('25%'), height: hp('15%') }]}>
                    <ImageBackground source={{ uri: productCart.imageBanner }} style={[gameStyles.imageGameIBMain, { width: wp('25%'), height: hp('15%') }]}>
                    </ImageBackground>
                </View>
                <View style={{ justifyContent: 'space-between' }}>
                    <Text style={{ color: 'black', fontSize: hp('2%') }}>{productCart.title}</Text>
                    <Text style={{ color: '#A3EEE9', fontSize: hp('3%'), textAlign: 'right' }}>${Math.ceil(productCart.price - ((productCart.price * productCart.discount) / 100))}</Text>
                </View>
            </View>
            <View>
                <Button color="rgb(87, 202, 87)" dark={true} mode="contained" onPress={() => props.navigation.navigate('store')}>+</Button>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text>2</Text>
                </View>
                <Button color="rgb(87, 202, 87)" dark={true} mode="contained" onPress={() => props.navigation.navigate('store')}>-</Button>
            </View>
        </View>
    );
}

export default CardCart
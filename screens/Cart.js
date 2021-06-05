import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import gameStyles from '../styles/gameStyles';
import { Button } from 'react-native-paper';
import { Icon } from 'react-native-elements'
import { Image } from 'react-native';
import { ActivityIndicator } from 'react-native';
import CartEmpty from './CartEmpty';
import CardCart from './CardCart';
const Cart = (props) => {
    if (props.allCart) {
        let total = props.allCart.reduce((total, game) => total + Math.ceil(game.price - ((game.price * game.discount) / 100)), 0); //0 es el inicio
    console.log( total );
    }
    let imageBanner = { uri: 'https://image.api.playstation.com/cdn/UP0001/CUSA05904_00/IKYAgcRh0k3IOklJSDoNBTk5t5MSm7KE.png' }
    return (
        <>
            {(props.allCart.length === 0 || !props.allCart)  
                ? (<CartEmpty navigation={props.navigation} />)
                : (
                    props.allCart.map(productCart => {
                        return (
                            <View key={productCart._id} style={{ backgroundColor: '#061320', height: hp('100%') }}>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('90%'), paddingTop: hp('3%') }}>
                                        <Text style={{ color: 'white', fontSize: hp('3%') }}>Cart</Text>
                                        <Text style={{ color: 'white', fontSize: hp('3%') }}>Total</Text>
                                    </View> 
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('95%') }}>
                                        <Text style={{ color: 'white', fontSize: hp('3%') }}>{props.allCart.length} Items</Text>
                                        <Text style={{ color: '#A3EEE9', fontSize: hp('3%') }}>${props.allCart && props.allCart.reduce((total, game) => total + Math.ceil(game.price - ((game.price * game.discount) / 100)), 0)}</Text>
                                    </View>
                                </View>
                                <ScrollView>
                                    {props.allCart.map(productCart => {
                                        return (<CardCart key={productCart._id} productCart={productCart} allCartLength={props.allCart.length} navigation={props.navigation} />)
                                    })}
                                </ScrollView>
                                <View style={{ backgroundColor: 'white', paddingBottom: hp('6%') }}>
                                    <Button color="rgb(87, 202, 87)" dark={true} mode="contained" style={{ marginTop: 15 }} onPress={() => props.navigation.navigate('store')}>Finish Buy</Button>
                                </View>
                            </View>
                        )
                    })
                )
            }
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        allGames: state.gamesReducer.allGames,
        preLoader: state.gamesReducer.preLoader,
        allCart: state.cartReducer.allCart
    }
}

export default connect(mapStateToProps, null)(Cart)
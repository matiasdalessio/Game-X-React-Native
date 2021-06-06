import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import gameStyles from '../styles/gameStyles';
import { Button } from 'react-native-paper';
import cartActions from '../redux/actions/cartActions';

const CardCart = (props) => {
    const { productCart, sendSubTotal } = props
    
    const [cantidadAMostrar, setCantidadAMostrar]=useState(1)

    useEffect(()=>{
        productCart.discount 
            ? sendSubTotal(( productCart.price - productCart.price * productCart.discount / 100) * cantidadAMostrar, productCart._id)
            : sendSubTotal(productCart.price * cantidadAMostrar, productCart._id)      
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cantidadAMostrar])

    if (cantidadAMostrar === 0) {
        props.deleteToCart(productCart._id)
    }
    let discount = productCart.discount ? (productCart.price - productCart.price * productCart.discount / 100).toFixed(0) * cantidadAMostrar: productCart.price * cantidadAMostrar
    return (
        <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', borderRadius: 15, margin: 'auto', marginLeft: wp('10%'), marginRight: wp('5%'), marginTop: hp('5%') }}>
            <View style={{ flexDirection: 'row', width: '40%' }}>
                <View style={[gameStyles.card, { width: wp('25%'), height: hp('15%') }]}>
                    <ImageBackground source={{ uri: productCart.imageBanner }} style={[gameStyles.imageGameIBMain, { width: wp('25%'), height: hp('15%') }]}>
                    </ImageBackground>
                </View>
                <View style={{ justifyContent: 'space-between' }}>
                    <Text style={{ color: 'black', fontSize: hp('2%') }}>{productCart.title}</Text>
                    <Text style={{ color: 'black', fontSize: hp('3%'), textAlign: 'right' }}>${discount}</Text>
                </View>
            </View>
            <View>
                <Button color="rgb(87, 202, 87)" dark={true} mode="contained" onPress={ ()=>setCantidadAMostrar(cantidadAMostrar+1)}>+
                </Button>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text>
                        {cantidadAMostrar}
                    </Text>
                </View>
                <Button color="rgb(87, 202, 87)" dark={true} mode="contained" onPress={()=> setCantidadAMostrar(cantidadAMostrar-1)}>-
                </Button>
            </View>
        </View>
    );
}
// const mapStateToProps = (state) => {
//     return {
//         allGames: state.gamesReducer.allGames,
//         preLoader: state.gamesReducer.preLoader,
//         allCart: state.cartReducer.allCart
//     }
// }
const mapDispatchToProps = {
    addToCart: cartActions.addToCart,
    deleteToCart: cartActions.deleteToCart
}

export default connect(null, mapDispatchToProps)(CardCart)
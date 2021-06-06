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
import Toast from 'react-native-toast-message'

const Cart = (props) => {

    const toastF = (type,title,text,visibilityTime,autoHide,onShow,onHide,onPress)=>{
        return Toast.show({
            type,
            text1:title,
            text2:text,
            visibilityTime,
            autoHide,
            onShow,
            onHide,
            onPress
        })
    }


    const [cart, setCart] = useState([])
    useEffect(() => {
        setCart(props.allCart)
        
    }, [props])

    const [total, setTotal] = useState(0)
    const arraySubTotales = []
    cart.length && cart.map(art => arraySubTotales.push({ id: art._id, subtotal: art.discount ? (art.price - art.price * art.discount / 100) : art.price }))

    const elProblema =()=>{

        cart.map(art =>{
            if (arraySubTotales.some(articulo => articulo.id !== art._id) ) {

                arraySubTotales.push({ id: art._id, subtotal: art.discount ? (art.price - art.price * art.discount / 100) : art.price })
                return art
            }
            return art
        })
    }
    const sendSubTotal = (precioSub, idArt) => {
        arraySubTotales.map(art => {
            if (idArt === art.id) {
                art.subtotal = precioSub
                return art
            }
            return art
        })
        var sumSubTotal = 0
        arraySubTotales.map(art =>{
            sumSubTotal += art.subtotal
            return null
        })
        setTotal(sumSubTotal)


    }
    
    return (
        <>
            {(cart.length == 0)
                ? (<CartEmpty navigation={props.navigation} />)
                : (
                    <View style={{ backgroundColor: '#061320', height: hp('100%') }}>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('90%'), paddingTop: hp('3%') }}>
                                <Text style={{ color: 'white', fontSize: hp('3%') }}>Cart</Text>
                                <Text style={{ color: 'white', fontSize: hp('3%') }}>Total</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('95%') }}>
                                <Text style={{ color: 'white', fontSize: hp('3%') }}>{cart.length} Items</Text>
                                <Text style={{ color: '#A3EEE9', fontSize: hp('3%') }}>${total.toFixed(0)}</Text>
                            </View>
                        </View>
                        <ScrollView>
                            {cart.map(productCart => {
                                return (<CardCart key={productCart._id} productCart={productCart} sendSubTotal={sendSubTotal} />)
                            })}
                        </ScrollView>
                        <View style={{ backgroundColor: 'white', paddingBottom: hp('6%'), flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button color="rgb(87, 202, 87)" dark={true} mode="contained" style={{ marginTop: 15, marginLeft: 10 }} onPress={() => props.userLogged ? props.navigation.navigate('formulario',{totalPrice:total}) : toastF('error','Error','You must be logged to proceed the transaction.',3000,true,null,null,()=>props.navigation.navigate('signIn'))}>Finish Buy</Button>
                            <Button color="#061320" dark={true} mode="contained" style={{ marginTop: 15, marginRight: 10 }} onPress={() =>  props.navigation.navigate('storeMain')}>Go to Store</Button>
                        </View>
                    </View>
                )
            }
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        allCart: state.cartReducer.allCart,
        userLogged: state.userReducer.userLogged
    }
}

export default connect(mapStateToProps, null)(Cart)
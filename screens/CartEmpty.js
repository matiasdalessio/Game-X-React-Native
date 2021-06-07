import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from 'react-native-paper';
import { Icon } from 'react-native-elements'
const CartEmpty = (props) => {

    return (
        <View style={{backgroundColor:'#061320', height:hp('100%')}}>
            <View style={{alignItems:'center'}}>
                <View style={{flexDirection:'row', justifyContent:'space-between',width: wp('90%'), paddingTop: hp('3%')}}>
                    <Text style={{color:'white', fontSize:hp('3%')}}>Cart</Text>
                    <Text style={{color:'white', fontSize:hp('3%')}}>Total</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between',width: wp('95%')}}>
                    <Text style={{color:'white', fontSize:hp('3%')}}>0 Items</Text>
                    <Text style={{color:'#A3EEE9', fontSize:hp('3%')}}>$000</Text>
                </View>
            </View>
            <View style={{alignItems:'center', flex:1, justifyContent:'center'}}>
                <Icon name='cart-arrow-down' type='font-awesome-5' color='white' size={200} />
                <Text style={{color:'white', fontSize:hp('3%')}}>Your Cart is Empty</Text>
                <Button color="white" mode="contained" style={{ marginTop: 15 }} onPress={() => props.navigation.navigate('storeMain')}>Go to Store</Button>
            </View>
        </View>
    );
}
const mapStateToProps = (state) => {
    return {
        allGames: state.gamesReducer.allGames,
        preLoader: state.gamesReducer.preLoader,
    }
}

export default connect(mapStateToProps, null)(CartEmpty)

import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { StyleSheet, Text, View , ImageBackground , Image , TouchableOpacity , ScrollView , StatusBar, TextInput } from 'react-native';
import { connect } from 'react-redux';
import hardwareActions from '../../redux/actions/hardwareActions'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements'
import gameStyles from '../../styles/gameStyles';
import { Button } from 'react-native-paper';
import cartActions from '../../redux/actions/cartActions'

const IndividualHarware = (props)=> {
    const [hardware, setHardware] = useState({})
    useEffect(()=>{
        setHardware(props.route.params.hardware)
    },[props.route.params])

    useEffect(()=>{
        props.navigation.addListener('blur',()=>{
            setHardware({})
        })
        return ()=>{
            props.navigation.removeListener('blur')
        }
    },[])
    const [inCart, setInCart] = useState(false)
    const addToCart = () => {
        setInCart(!inCart)
        props.addToCart(hardware)
    }
    const removeToCart = () => {
        setInCart(!inCart)
        props.deleteToCart(hardware._id)
    }
    if(!hardware.productName){
        return (<View style={{ backgroundColor: '#061320', width: wp('100%'), height: hp('100%'), alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={'large'} color='white' />
                </View>)
    }
    
  return (
    <>
    
    <ScrollView style={{ backgroundColor: '#061320' }}>
                    <ImageBackground source={{ uri: hardware.imageBanner }} style={[gameStyles.containerGame, { alignItems: 'center', justifyContent: 'center' }]}></ImageBackground>
                    <View style={{ alignItems: 'center', padding: 8 }}>
                        <View style={{ width: wp('80%') }}>
                            <Text style={{ fontSize: hp('4%'), color: 'white' }}>{hardware.productName}</Text>
                            <Text style={{ fontSize: hp('3%'), color: 'white' }}>Brand: {hardware.brand}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', padding: 8 }}>
                        <View style={{ width: wp('80%'), borderColor: 'white', borderWidth: 1, borderRadius: 10 }}>
                            <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name='shopping-bag' type='font-awesome-5' color='white' />
                                <Text style={{ fontSize: hp('3%'), color: 'white', marginLeft: 10, marginRight: 5 }}>${hardware.price}</Text>
                            </View>
                            
                            {!inCart
                                ? (<View style={{ padding: hp('2%'), flexDirection: 'row' }}>
                                    <Button icon="cart" color="green" mode="contained" style={{ marginRight: 15 }} onPress={addToCart}>Add To Cart</Button>
                                </View>)
                                : (<View style={{ padding: hp('2%'), flexDirection: 'row' }}>
                                    <Button icon="cart" color="red" mode="contained" style={{ marginRight: 15 }} onPress={removeToCart} >Remove From Cart</Button>
                                </View>)
                            }

                        </View>
                        <View style={{ padding: hp('4%'), flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={{ fontSize: hp('2%'), color: 'white', marginBottom: hp('1%') }}>Feature:</Text>
                            <View style={{ flexDirection: 'column', paddingLeft: '1%' }}>
                                {hardware.features.map(feature => {
                                    return (
                                        <View key={feature} style={{ padding: hp('1%'), marginLeft: hp('1%'), marginRight: hp('1%'), borderColor: 'white', borderWidth: 1, marginBottom: hp('2%') }}>
                                            <Text style={{ color: 'white' }}>{feature}</Text>
                                        </View>
                                    )
                                })}
                            </View>                
                        </View>
                        <View style={{ padding: hp('2%'), flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={{ fontSize: hp('3%'), color: 'white', marginBottom: hp('1%') }}>Description:</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ padding: hp('1%'), marginLeft: hp('1%'), marginRight: hp('1%'), borderColor: 'white', borderWidth: 1 }}>
                                    <Text style={{ color: 'white' }}>{hardware.description}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: hp('2%'), paddingBottom: hp('5%') }}>
                        <Button color="white" mode="contained" onPress={() => props.navigation.navigate('storeMain')}>Go To hardware</Button>
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
    loadHardware: hardwareActions.loadHardwares,
    addToCart: cartActions.addToCart,
    deleteToCart: cartActions.deleteToCart
}

export default connect(mapStateToProps , mapDispatchToProps)(IndividualHarware)
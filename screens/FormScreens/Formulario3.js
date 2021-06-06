import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import axios from 'axios'
import { FancyAlert, LoadingIndicator } from 'react-native-expo-fancy-alerts';
import Toast from 'react-native-toast-message'
import { Icon } from 'react-native-elements';
import buyActions from '../../redux/actions/buyActions'
import cartActions from '../../redux/actions/cartActions';

const Formulario3 = (props) => {
    const [allHardware, setAllHarware] = useState([]);
    const [buyerInfo, setBuyerInfo] = useState(null);
    const [totalPrice,setTotalPrice] = useState();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [creditCardInfo, setCreditCardInfo] = useState(null);

    useEffect(() => {
        setBuyerInfo(props.route.params.newSell)
        setCreditCardInfo(props.route.params.creditCard)
        setTotalPrice(props.route.params.totalPrice)
    }, [props.allCart])

    const toggleAlert = React.useCallback(() => {
      setVisible(!visible);
    }, [visible]);

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


    const buy = async() => {
        setLoading(true)
        const dataToSend = {...creditCardInfo,...buyerInfo, userId:props.userLogged.id,total:totalPrice,products:props.allCart,email:props.userLogged.email}
        let token=props.userLogged.token
        const respuesta = await props.createOrder(dataToSend,token)
      if(respuesta.success){
        props.deleteCart()
        setLoading(false)
        setVisible(true)
        setTimeout(()=>{
            setVisible(false)
            props.navigation.navigate('home')
        },4000)
      }else{
        setLoading(false)
        toastF('error','Something went wrong',"Try again in a few moment",3000,true)
      }
        
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
                <Text style={styles.texto}>{props.allCart.length > 1 ? "Products list" :"Product name"}: {
                    props.allCart.map(articulo => "  "+(articulo.productName|| articulo.title) )
                }</Text>
                <Text style={styles.texto}>Total price: ${totalPrice}</Text>
                <Text style={styles.texto}>To deliver in: {buyerInfo.direction}</Text>
                <Text style={styles.texto}>Contact Number: {buyerInfo.phone}</Text>
                <Text style={styles.texto}>E-Mail: {props.userLogged.email}</Text>
                <Text style={styles.texto}>if you agree with this terms , and all this information seems correct, please click the "Finish Buy" button to finish the process</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Button color="red" mode="contained" style={{ marginRight: 15 }} onPress={cancel}>Cancel Buy</Button>
                <Button color="green" mode="contained" style={{ marginRight: 15 }} onPress={buy} >Finish Buy</Button>
                </View>
                <FancyAlert visible={loading} icon={<View></View>}>
                    <LoadingIndicator visible={loading} />
                </FancyAlert>
                <FancyAlert
                    visible={visible}
                    icon={<View style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#15286d',
                        borderRadius: 50,
                        width: '100%',
                      }}><Icon name="verified" type="material" color="#57cb3a" size={42}/></View>}
                      style={{ backgroundColor: 'white' }}
                    style={{ backgroundColor: 'white' }}
                    onPress={toggleAlert}
                >
                    <Text style={{ marginTop: -16, marginBottom: 32, textAlign:'center', fontSize:wp('5%'),fontWeight:'bold' }}>Thank you very much {buyerInfo.firstName} for your purchase. Here is the tracking ID {props.userLogged.token.slice(0,8)} to track your purchase.</Text>
                </FancyAlert>
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
    navigationRedux: state.navigationReducer.navigationRedux,
    allCart: state.cartReducer.allCart,
    userLogged: state.userReducer.userLogged
    }
}
const mapDispatchToProps = {

    createOrder: buyActions.createOrder,
    deleteCart: cartActions.deleteCart

}
export default connect(mapStateToProps, mapDispatchToProps)(Formulario3)
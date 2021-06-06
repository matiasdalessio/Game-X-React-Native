import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import gameStyles from '../../styles/gameStyles';
import cartActions from '../../redux/actions/cartActions';
import { Button } from 'react-native-paper';
import { Icon } from 'react-native-elements'
import { Image } from 'react-native';
import { ActivityIndicator } from 'react-native';
import FabUserLogged from '../../components/FabUserLogged'
// {props.userLogged && <FabUserLogged />}

const Game = (props) => {
    let imageBanner = { uri: 'https://image.api.playstation.com/cdn/UP0001/CUSA05904_00/IKYAgcRh0k3IOklJSDoNBTk5t5MSm7KE.png' }
    const [game, setGame] = useState(null)
    const [view, setView] = useState({ show: false, textBtn: 'View More' })
    const [inCart, setInCart] = useState(false)

    useEffect(() => {
        setInCart(false)
        setGame(props.route.params.game)
        if (props.allCart && game) {
            let gameInCart = props.allCart.find(productCart => productCart._id === game._id) 
            gameInCart ? setInCart(true): setInCart(false)
        }
    }, [props.route.params])
    const addToCart = () => {
        setInCart(!inCart)
        props.addToCart({...game, cantidad:1})
    }
    const removeToCart = () => {
        setInCart(!inCart)
        props.deleteToCart(game._id)
    }

    return (
        <>
            {game ?
                <ScrollView style={{ backgroundColor: '#061320' }}>
                    <ImageBackground source={{ uri: game.imageBanner }} style={[gameStyles.containerGame, { alignItems: 'center', justifyContent: 'center' }]}></ImageBackground>
                    <View style={{ alignItems: 'center', padding: 8 }}>
                        <View style={{ width: wp('80%') }}>
                            <Text style={{ fontSize: hp('4%'), color: 'white' }}>{game.title}</Text>
                            <Text style={{ fontSize: hp('3%'), color: 'white' }}>{game.developer}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', padding: 8 }}>
                        <View style={{ width: wp('80%'), borderColor: 'white', borderWidth: 1, borderRadius: 10 }}>
                            <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name='shopping-bag' type='font-awesome-5' color='white' />
                                {game.discount > 0
                                    ? (
                                        <>
                                            <Text style={{ fontSize: hp('3%'), color: 'white', marginLeft: 10, marginRight: 5 }}>${(game.price - ((game.price * game.discount) / 100).toFixed(0))}</Text>
                                            <Text style={{ fontSize: hp('3%'), color: 'rgba(223, 217, 217, 0.578)', textDecorationLine: 'line-through', marginLeft: 5, marginRight: 5 }}>${game.price}</Text>
                                        </>
                                    )
                                    : (<Text style={{ fontSize: hp('3%'), color: 'white', marginLeft: 10, marginRight: 5 }}>${game.price}</Text>)

                                }
                            </View>
                            {!inCart
                                ? (<View style={{ padding: hp('2%'), flexDirection: 'row' }}>
                                    <Button icon="cart" color="green" mode="contained" style={{ marginRight: 15 }} onPress={addToCart}>Add To Cart</Button>
                                </View>)
                                : (<View style={{ padding: hp('2%'), flexDirection: 'row' }}>
                                    <Button icon="cart" color="red" mode="contained" style={{ marginRight: 15 }} onPress={removeToCart} >Remove To Cart</Button>
                                </View>)
                            }

                        </View>
                    </View>
                    <View style={{ padding: hp('2%') }}>
                        <ScrollView horizontal>
                            {game.imagesBackground.map((image, i) => {
                                return (
                                    <Image key={i} source={{ uri: image }} style={{ width: wp('86%'), height: hp('25%'), marginRight: hp('2%') }} />
                                )
                            })}
                        </ScrollView>
                    </View>
                    <View style={{ padding: hp('2%'), flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: hp('2%'), color: 'white' }}>PEGI:</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View key={game.PEGI} style={{ padding: hp('1%'), marginLeft: hp('1%'), marginRight: hp('1%'), borderColor: 'white', borderWidth: 1 }}>
                                <Text style={{ color: 'white' }}>{game.PEGI}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: hp('2%'), flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: hp('2%'), color: 'white' }}>Genre:</Text>
                        <View style={{ flexDirection: 'row' }}>
                            {game.genre.map(genre => {
                                return (
                                    <View key={genre} style={{ padding: hp('1%'), marginLeft: hp('1%'), marginRight: hp('1%'), borderColor: 'white', borderWidth: 1 }}>
                                        <Text style={{ color: 'white' }}>{genre}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{ padding: hp('2%'), flexDirection: 'row', width: wp('80%') }}>
                        <Text style={{ fontSize: hp('2%'), color: 'white' }}>Platforms:</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {game.platform.map(platform => {
                                return (
                                    <View key={platform} style={{ padding: hp('1%'), marginLeft: hp('1%'), marginRight: hp('1%'), borderColor: 'white', borderWidth: 1 }}>
                                        <Text style={{ color: 'white' }}>{platform}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{ padding: hp('2%'), width: wp('80%'), flexDirection: 'row' }}>
                        <Text style={{ fontSize: hp('2%'), color: 'white' }}>Description:</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ padding: hp('1%'), marginLeft: hp('1%'), marginRight: hp('1%'), borderColor: 'white', borderWidth: 1 }}>
                                <Text style={{ color: 'white', textAlign: 'justify' }}>{game.description}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: hp('2%'), paddingBottom: hp('5%') }}>
                        <Button color="white" mode="contained" onPress={() => props.navigation.navigate('gameStore')}>Go To Games</Button>
                    </View>
                </ScrollView>
                : <ActivityIndicator />
            }
{props.userLogged && <FabUserLogged />}

        </>
    );
}
const mapStateToProps = (state) => {
    return {
        allGames: state.gamesReducer.allGames,
        preLoader: state.gamesReducer.preLoader,
        allCart: state.cartReducer.allCart,
        userLogged: state.userReducer.userLogged

    }
}
const mapDispatchToProps = {
    addToCart: cartActions.addToCart,
    deleteToCart: cartActions.deleteToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
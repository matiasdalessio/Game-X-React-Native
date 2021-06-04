import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import gameStyles from '../../styles/gameStyles';
import { Button } from 'react-native-paper';
import { Icon } from 'react-native-elements'
import { Image } from 'react-native';
import { ActivityIndicator } from 'react-native';
const Game = (props) => {
    let imageBanner = { uri: 'https://image.api.playstation.com/cdn/UP0001/CUSA05904_00/IKYAgcRh0k3IOklJSDoNBTk5t5MSm7KE.png' }
    const [game, setGame] = useState(null)
    const [view, setView] = useState({ show: false, textBtn: 'View More' })
    // console.log(props.route.params);
    // console.log(props.allGames);
    useEffect(() => {
        let gameDetails = props.allGames.find(game => game._id === props.route.params.idGame)
        setGame(gameDetails)
    }, [props.route.params.idGame])
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
                                            <Text style={{ fontSize: hp('3%'), color: 'white', marginLeft: 10, marginRight: 5 }}>${Math.ceil(game.price - ((game.price * game.discount) / 100))}</Text>
                                            <Text style={{ fontSize: hp('3%'), color: 'rgba(223, 217, 217, 0.578)', textDecorationLine: 'line-through', marginLeft: 5, marginRight: 5 }}>${game.price}</Text>
                                        </>
                                    )
                                    : (<Text style={{ fontSize: hp('3%'), color: 'white', marginLeft: 10, marginRight: 5 }}>${game.price}</Text>)

                                }
                            </View>
                            <View style={{ padding: hp('2%'), flexDirection: 'row' }}>
                                <Button icon="cart" color="white" mode="contained" style={{ marginRight: 15 }} >Add To Cart</Button>
                            </View>
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
                    <View style={{ padding: hp('2%'), paddingBottom:hp('5%') }}>
                        <Button color="white" mode="contained"  onPress={() => props.navigation.navigate('store')}>Go To Games</Button>
                    </View>
                </ScrollView>
                : <ActivityIndicator />
            }

        </>
    );
}
const mapStateToProps = (state) => {
    return {
        allGames: state.gamesReducer.allGames,
        preLoader: state.gamesReducer.preLoader,
    }
}

export default connect(mapStateToProps, null)(Game)
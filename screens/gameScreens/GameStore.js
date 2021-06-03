import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import gamesActions from '../../redux/actions/gamesActions';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import gameStyles from '../../styles/gameStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const GameStore = (props) => {
    useEffect(() => {
        props.loadGames()
    }, [])
    let cities = [
        {
            src: 'https://image.api.playstation.com/cdn/UP0001/CUSA05904_00/IKYAgcRh0k3IOklJSDoNBTk5t5MSm7KE.png',
            header: 'FarCry 5',
            id: 1
        },
    ]
    let imageBanner = { uri: 'https://i.imgur.com/hJc9aCe.png' }
    let imageGame = { uri: cities[0].src }
    let popularGames = !props.preLoader ? props.allGames.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 3) : props.allGames
    let recentGames = !props.preLoader ? props.allGames.filter(game => game.year >= 2021) : props.allGames
    let retroGames = !props.preLoader ? props.allGames.filter(game => game.year <= 2014).slice(0, 4) : props.allGames
    return (
        <ScrollView>
            <ImageBackground source={imageBanner} style={[gameStyles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={gameStyles.titleMain}>Game Store</Text>
                {/* <TextInput style={gameStyles.inputSearch} placeholder="Search Games" theme={{ colors: { primary: '#0BC6C3' } }} mode="flat" selectionColor="black" underlineColor="#0BC6C3" right={<TextInput.Icon name="magnify" size={40} />} /> */}
            </ImageBackground>
            {/*--------------------- Primer layout ------------------*/}
            {!props.preLoader
                ? <View style={[gameStyles.layoutRecentGames, { paddingTop: hp('3%'), paddingBottom: hp('3%') }]}>
                    <View style={gameStyles.containerCardsMain}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: hp('2%') }}>
                            <Text Icon="dog" style={gameStyles.titleSecundary}>Popular Games</Text>
                            <Button color="white" mode="contained" style={{marginRight:15}}>See All</Button>
                        </View>
                        <View style={[gameStyles.card, { width: wp('95%'), height: hp('25%') }]}>
                            <ImageBackground source={{ uri: popularGames[0].imagesBackground[0] }} style={gameStyles.imageGameIBMain}>
                                <Text style={gameStyles.titleCard}>{cities[0].header}</Text>
                            </ImageBackground>
                        </View>
                    </View>
                    <View style={[gameStyles.card, { marginTop: 5, backgroundColor: '#061320' }]}>
                        <ImageBackground source={{ uri: popularGames[1].imageBanner }} style={gameStyles.imageGameIB}>
                        </ImageBackground>
                    </View>
                    <View style={[gameStyles.card, { marginTop: 5 }]}>
                        <ImageBackground source={{ uri: popularGames[2].imageBanner }} style={gameStyles.imageGameIB}>
                        </ImageBackground>
                    </View>
                </View> : null}
            {/*--------------------- Segundo layout ------------------*/}
            <View style={[gameStyles.containerCards, { paddingTop: hp('3%'), paddingBottom: hp('3%') }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: hp('2%') }}>
                    <Text Icon="dog" style={gameStyles.titleSecundary}>Recent Games</Text>
                    <Button color="white" mode="contained" style={{marginRight:15}}>See All</Button>
                </View>
                <ScrollView horizontal>
                    {recentGames
                        ? recentGames.map(game => {
                            return (
                                <View key={game._id} style={gameStyles.card}>
                                    <ImageBackground source={{ uri: game.imageBanner }} style={gameStyles.imageGameIB}>
                                        <Text style={gameStyles.titleCard}>{game.title}</Text>
                                    </ImageBackground>
                                </View>
                            )
                        })
                        : null
                    }
                </ScrollView>
            </View>
            {/*--------------------- Ultimo layout ------------------*/}
            <View style={[gameStyles.containerCardsTwo, { paddingTop: hp('3%'), paddingBottom: hp('3%') }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: hp('2%') }}>
                    <Text Icon="dog" style={gameStyles.titleSecundary}>Retro Games</Text>
                    <Button color="white" mode="contained" style={{marginRight:15}}>See All</Button>
                </View>
                <View style={gameStyles.layoutRecentGames}>
                    {retroGames
                        ? retroGames.map(game => {
                            return (
                                <View key={game._id} style={[gameStyles.card, { marginTop: 5 }]}>
                                    <ImageBackground source={{ uri: game.imageBanner }} style={gameStyles.imageGameIB}>
                                        <Text style={gameStyles.titleCard}>{game.title}</Text>
                                    </ImageBackground>
                                </View>
                            )
                        })
                        : null
                    }
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomEndRadius: 50,
    },
});

const mapStateToProps = (state) => {
    return {
        allGames: state.gamesReducer.allGames,
        preLoader: state.gamesReducer.preLoader,
    }
}
const mapDispatchToProps = {
    loadGames: gamesActions.loadGames
}
export default connect(mapStateToProps, mapDispatchToProps)(GameStore)

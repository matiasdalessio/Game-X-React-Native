import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import gamesActions from '../../redux/actions/gamesActions';
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import gameStyles from '../../styles/gameStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
const myIcon = <Icon name="rocket" size={30} color="#900" />;
const GameStore = (props) => {
    useEffect(() => {
        props.loadGames()
        props.filterGames('')

    }, [])
    const [infoBtn, setInfoBtn] = useState({ textBtn: 'See More', value: 'add' })
    let cities = [
        {
            src: 'https://image.api.playstation.com/cdn/UP0001/CUSA05904_00/IKYAgcRh0k3IOklJSDoNBTk5t5MSm7KE.png',
            header: 'FarCry 5',
            id: 1
        },
    ]
    const viewInfo = () => {
        if (props.gamesFiltered.length >= 76) {
            setInfoBtn({
                textBtn: 'See Less',
                value: ''
            })
            props.filterGames(infoBtn.value)
            return false
        }
        if (props.gamesFiltered.length < 76) {
            setInfoBtn({ textBtn: 'See More', value: 'add' })
            props.filterGames(infoBtn.value)
        }


    }
    let imageBanner = { uri: 'https://i.imgur.com/CwK1hlp.png' }
    return (
        <>
            {props.preLoader
                ? (<View style={{ backgroundColor: '#061320', width: wp('100%'), height: hp('100%'), alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={'large'} color='white' />
                </View>)
                : (
                    <ScrollView style={{ backgroundColor: '#061320' }}>
                        <ImageBackground source={imageBanner} style={[gameStyles.container, { alignItems: 'center', justifyContent: 'center', margin: 0, height: hp('45%') }]}>
                            <Text style={gameStyles.titleMain}>State of Play</Text>
                            <TextInput style={gameStyles.inputSearch} placeholder="Search Games" theme={{ colors: { primary: '#0BC6C3' } }} mode="flat" selectionColor="black" underlineColor="#0BC6C3" right={<TextInput.Icon name="magnify" size={40} />} onChangeText={(e) => props.filterGames(e)} />
                        </ImageBackground>
                        <View style={{ backgroundColor: '#061320', flexDirection: 'row', flexWrap: 'wrap', margin: 0 }}>
                            {!props.preLoader
                                ? props.gamesFiltered.map(game => {
                                    return (
                                        <View key={game._id} style={gameStyles.card}>
                                            <TouchableHighlight onPress={() => props.navigation.navigate('game', { idGame: game._id })}>
                                                <ImageBackground source={{ uri: game.imageBanner }} style={gameStyles.imageGameIB}>
                                                    <Text style={gameStyles.titleCard}>{game.title}</Text>
                                                </ImageBackground>
                                            </TouchableHighlight>
                                        </View>
                                    )
                                })
                                : <ActivityIndicator />
                            }
                        </View>
                        <Button color="white" mode="contained" style={{ margin: 15 }} onPress={viewInfo}>{props.gamesFiltered.length >= 76 ? 'See Less' : 'See More'}</Button>
                    </ScrollView>
                )
            }
        </>
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
        gamesFiltered: state.gamesReducer.gamesFiltered,
        preLoader: state.gamesReducer.preLoader,
    }
}
const mapDispatchToProps = {
    loadGames: gamesActions.loadGames,
    filterGames: gamesActions.filterGames
}
export default connect(mapStateToProps, mapDispatchToProps)(GameStore)

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInput,Button  } from 'react-native-paper';
import gameStyles from '../../styles/gameStyles';
const GameStore = () => {
    let cities = [
        {
            src: 'https://image.api.playstation.com/cdn/UP0001/CUSA05904_00/IKYAgcRh0k3IOklJSDoNBTk5t5MSm7KE.png',
            header: 'FarCry 5',
            id: 1
        },
    ]
    let imageBanner = { uri: 'https://i.imgur.com/hJc9aCe.png' }
    let imageGame = { uri: cities[0].src }
    return (
        <ScrollView>
            <ImageBackground source={imageBanner} style={[gameStyles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={gameStyles.titleMain}>Store Game</Text>
                {/* <TextInput style={gameStyles.inputSearch} placeholder="Search Games" theme={{ colors: { primary: '#0BC6C3' } }} mode="flat" selectionColor="black" underlineColor="#0BC6C3" right={<TextInput.Icon name="magnify" size={40} />} /> */}
            </ImageBackground>
            <View style={gameStyles.containerCards}>
                <Text Icon="dog" style={gameStyles.titleSecundary}>Popular Games</Text>
                <ScrollView horizontal>
                    <View style={gameStyles.card}>
                        <ImageBackground source={imageGame} style={gameStyles.imageGameIB}>
                            <Text style={gameStyles.titleCard}>{cities[0].header}</Text>
                        </ImageBackground>
                    </View>
                </ScrollView>
            </View>
            <View style={gameStyles.containerCards}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text Icon="dog" style={gameStyles.titleSecundary}>Recent Games</Text>
                    <Button color="white" mode="contained">See All</Button>
                </View>
                <View style={gameStyles.layoutRecentGames}>
                    <View style={gameStyles.boxOne}>
                        <View></View>
                        <View></View>
                    </View>
                    <View style={gameStyles.boxTwo}></View>
                    <View style={gameStyles.boxOne}>
                        <View></View>
                        <View></View>
                    </View>
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

export default GameStore;

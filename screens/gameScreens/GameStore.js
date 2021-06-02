import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import gameStyles from '../../styles/gameStyles';
const GameStore = () => {
    const { width, height } = useWindowDimensions()
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
            <ImageBackground source={imageBanner} style={[{ width: width * 1, height: height * .4, backgroundColor: '#061320' }, styles.container]}>
                <Text style={gameStyles.titleMain}>Store Game</Text>
                <TextInput style={{ width: width * .9, textAlign: 'center',height:40 }} placeholder="Search Games" theme={{ colors: { primary: '#0BC6C3' } }} mode="flat" selectionColor="black" underlineColor="#0BC6C3" right={<TextInput.Icon name="magnify" size={40} />} />
            </ImageBackground>
            <View style={{ backgroundColor: '#061320' }}>
                <ScrollView horizontal>
                    <View style={gameStyles.card}>
                        <ImageBackground source={imageGame} style={gameStyles.imageGameIB}>
                            <Text style={gameStyles.titleCard}>{cities[0].header}</Text>
                        </ImageBackground>
                    </View>
                </ScrollView>
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

import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { ImageBackgroundBase } from 'react-native';
import { Image } from 'react-native';
const GameStore = (props) => {
    useEffect(() => {
        // props.loadGames()
        // props.filterGames('')

    }, [])
    const [infoBtn, setInfoBtn] = useState({ textBtn: 'See More', value: 'add' })

    let imageBannerMain = { uri: 'https://i.pinimg.com/originals/24/3a/0f/243a0ff31e6628b8b43bed92019fe689.jpg' }
    let imageBanner = { uri: 'https://i.imgur.com/U3y5sIx.png' }
    let imageBanner2 = { uri: 'https://i.imgur.com/TdKEvLv.png' }
    return (
        <ImageBackground source={imageBannerMain} style={{ width: wp('100%'), height: hp('100%'), backgroundColor: '#061320', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontSize: hp('12%'), marginBottom: hp('3%') ,textAlign: 'center' }}>Store</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableHighlight onPress={() => props.navigation.navigate('store')}>
                    <View style={[styles.box, {borderWidth:1, borderColor:'white', borderRadius: 20 }]}>
                        <Text style={{ color: 'white', fontSize: hp('3%'), textAlign: 'center' }}>Games</Text>
                        <Image source={imageBanner} style={{ width: wp('45%'), height: hp('40%'), borderRadius: 20 }} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => props.navigation.navigate('store')}>
                    <View style={[styles.box, {borderWidth:1, borderColor:'white', borderRadius: 20 }]}>
                        <Text style={{ color: 'white', fontSize: hp('3%'), textAlign: 'center' }}>Hardwares</Text>
                        <Image source={imageBanner2} style={{ width: wp('45%'), height: hp('40%'), borderRadius: 20 }} />
                    </View>
                </TouchableHighlight>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomEndRadius: 50,
    },
    box: {
        shadowColor: "white",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
    }
});

const mapStateToProps = (state) => {
    return {
        allGames: state.gamesReducer.allGames,
        gamesFiltered: state.gamesReducer.gamesFiltered,
        preLoader: state.gamesReducer.preLoader,
    }
}
// const mapDispatchToProps = {
//     loadGames: gamesActions.loadGames,
//     filterGames: gamesActions.filterGames
// }
export default connect(mapStateToProps, null)(GameStore)

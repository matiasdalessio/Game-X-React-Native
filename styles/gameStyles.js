import { StyleSheet } from 'react-native';

const gameStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleMain: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 30,
        fontSize: 30,
        color: 'white'
    },
    imageGameIB: {
        width: 180,
        height: 250,
        justifyContent:'flex-end',
        resizeMode: 'cover'
    },
    card: {
        width: 180,
        height: 250,
        margin: 10,
        borderRadius: 5,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    titleCard:{
        color:'white',
        padding:4,
        fontSize:15,
        backgroundColor:'rgba(0, 0, 0, 0.201)',
        textAlign:'center'
    }
});

export default gameStyles;
import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const gameStyles = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: hp('40%'),
        backgroundColor: '#061320' 
    },
    titleMain: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 30,
        fontSize: hp('7%'),
        color: 'white'
    },
    titleSecundary:{
        fontSize:hp('3%'),
        color:'white',
        marginLeft: wp('3%')
    }
    ,
    imageGameIBMain: {
        width: wp('95%'),
        height: 250,
        justifyContent:'flex-end',
        resizeMode: 'cover'
    },
    imageGameIB: {
        width: 180,
        height: 250,
        justifyContent:'flex-end',
        resizeMode: 'cover'
    },
    containerCardsMain:{
        backgroundColor: '#061320',
        width: wp('100%'),
    }
    ,
    containerCards:{
        backgroundColor: '#061320',
        paddingLeft: wp('4%'),
        paddingTop:wp('4%'),
        paddingBottom:wp('4%'),
    }
    ,
    containerCardsTwo:{
        backgroundColor: '#061320',
        paddingTop:wp('4%'),
        paddingBottom:wp('4%'),
    }
    ,
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
    },
    inputSearch:{
        width: wp('90%'),
        textAlign: 'center',
        height:40 
    },
    layoutRecentGames:{
        width: wp('100%'),
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
        justifyContent:'space-evenly',
        backgroundColor:'#061320'
    },
    boxTwo:{
        width:wp('90%'),
        height: hp('25%')
    }
});

export default gameStyles;
import React from 'react'
import { FAB, Portal, Provider } from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
import {Image} from 'react-native'
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';
import { View } from 'react-native';

const FabPortal = (props) => {
    const [state, setState] = React.useState({ open: false });
  
    const onStateChange = ({ open }) => setState({ open });
  
    const { open } = state;
    
    const logo={
      width:'310%',
      height:'310%',
      position:'absolute',
      top:-25,
      right:-25,
   }
   const fabStyle={
    backgroundColor:'transparent',
    width:wp('20%'),
    height:wp('20%'),
    alignItems:'center',
    justifyContent:'center',
    borderRadius:wp('100%'),
    position:'absolute',
    bottom:hp('25%'),
    left:wp('74%'),
    
  }
  const gif = {
    width:wp('20%'),
    height:wp('20%'),
    position:'absolute',
    top:0,
    right:0
  }

  const containerStyles = {
    paddingBottom:'120%',
  }

  if(props.userLogged){
    return (<Image source={require('../assets/logoGif.gif')} style={gif}/>)
  }

    return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          fabStyle={fabStyle}
          icon={()=> <Image source={require('../assets/logoGif.gif')} style={logo}/>}
          style={containerStyles}
          actions={[
          {
              icon: ()=> <Icon name="microsoft-xbox-controller" type="material-community" size={25}/>,
              label: 'Games',
              // color:'rgb(250,160,0)',
              onPress: () => props.navigationRedux.navigate('gameStore'),
              small: false,
          },
          {
              icon:()=> <Icon name="sony-playstation" type="material-community" size={25}/>,
              label: 'Consoles',
              small: false,
              onPress: () => props.navigationRedux.navigate('hardwareAll'),
          },
          {
            icon:()=> <Icon name="cart" type="material-community" size={25}/>,
            label: 'Cart',
            small: true,
            onPress: () => props.navigationRedux.navigate('cart'),
          },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
    );
  }

const mapStateToProps = state => {
    return{
      userLogged : state.userReducer.userLogged,
      navigationRedux: state.navigationReducer.navigationRedux
    }
  }
const mapDispatchToProps = {
     removeUserInfo: userActions.removeUserInfo
}

export default connect(mapStateToProps,mapDispatchToProps)(FabPortal)
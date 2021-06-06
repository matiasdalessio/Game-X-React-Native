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
    bottom:hp('30%'),
    left:wp('74%')
  }

  const containerStyles = {
    paddingBottom:hp('55%'),
    // transform:[{rotateX:50}]
    // position:'absolute',
    // bottom:hp('70%'),
    // left:wp('75%')
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
            icon:()=> <Icon name="sony-playstation" type="material-community" size={25}/>,
            label: 'Cart',
            small: false,
            onPress: () => props.navigationRedux.navigate('cart'),
          },
          {
            icon:()=>{
              return props.userLogged ? 
              <Icon name="logout" color="black" /> 
              : <View /> }, 
              label: props.userLogged ? "Log Out" : null,
            onPress: () => props.removeUserInfo(),
            style:!props.userLogged && {opacity:0}
          }

          //   {
          //     icon: 'star',
          //     label: 'Star',
          //     onPress: () => console.log('Pressed star'),
          //   },
            
            
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
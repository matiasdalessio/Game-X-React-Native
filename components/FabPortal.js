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
    left:wp('74%')
  }

  const containerStyles = {
    paddingBottom:hp('62.5%'),
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
              icon: 'star',
              label: 'Wishlist',
              color:'rgb(250,160,0)',
              onPress: () => console.log('Pressed Wishlist'),
              small: false,
          },
          {
              icon: 'cart',
              label: 'Cart',
              onPress: () => console.log('Pressed Cart'),
          },
          {
              icon:()=>{return <Icon name="logout" color="black"/>}, 
              onPress: () => props.removeUserInfo()
          },

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
    }
  }
const mapDispatchToProps = {
  removeUserInfo: userActions.removeUserInfo
}

export default connect(mapStateToProps,mapDispatchToProps)(FabPortal)
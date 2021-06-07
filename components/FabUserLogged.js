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
      width:'300%',
      height:'300%',
      position:'absolute',
      top:-15,
      right:-25,
   }
   const fabStyle={
    backgroundColor:'transparent',
    width:wp('20%'),
    height:wp('20%'),
    alignItems:'center',
    justifyContent:'center',
    borderRadius:wp('100%'),
    // position:'absolute',
    // bottom:0,
    // right:0
  }

  const containerStyles = {
      zIndex:100,
    //   paddingBottom:'10%'
  }
    return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          fabStyle={fabStyle}
          icon={()=> <Image source={{uri:props.userLogged.imageUrl === "" || !props.userLogged.imageUrl ? 'https://game-x-arg.herokuapp.com'+props.userLogged.avatar : props.userLogged.imageUrl }} style={logo}/>}
          style={containerStyles}
          actions={[
            {
                icon:()=>{
                  return props.userLogged ? 
                  <Icon name="logout" color="black" /> 
                  : <View /> }, 
                //   label: props.userLogged ? "Log Out" : null,
                onPress: () => props.removeUserInfo(),
                style:!props.userLogged && {opacity:0}
            },
          {
              icon:()=> <Icon name="sony-playstation" type="material-community" size={25}/>,
              label: 'Consoles',
              small: true,
              onPress: () => props.navigationRedux.navigate('hardwareAll'),
          },
          {
            icon: ()=> <Icon name="microsoft-xbox-controller" type="material-community" size={25}/>,
            label: 'Games',
            // color:'rgb(250,160,0)',
            onPress: () => props.navigationRedux.navigate('gameStore'),
            small: false,
        },
        //   {
        //     icon:()=> <Icon name="cart" type="material-community" size={25}/>,
        //     label: 'Cart',
        //     small: true,
        //     onPress: () => props.navigationRedux.navigate('cart'),
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
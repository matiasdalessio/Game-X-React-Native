import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FabPortal from "../components/FabPortal";
import userActions from "../redux/actions/userActions";

const Index = (props) => {
  // console.log(props)
  useEffect(() => {
    if (props.loadNavigation && props.navigation) {
      props.loadNavigation(props.navigation);
    }
  });
  return (
    <>
      <View style={[styles.View, { position: "relative" }]}>
        <ImageBackground
          source={require("../assets/fondo.png")}
          style={styles.firstBgStyle}
        >
            {/* <Text style={styles.titleStyleFirstView}>Dive in Game-X-State</Text> */}
            <TouchableOpacity
              style={styles.getStarted}
              activeOpacity={0.5}
              onPress={() =>
                !props.userLogged
                ? props.navigation.navigate("signIn")
                : props.navigation.navigate("gameStore")
              }
              >
              <Text style={styles.getStartedText}>GET STARTED!</Text>
            </TouchableOpacity>
          </ImageBackground>
        <FabPortal />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  View: {
    backgroundColor: "#f4f4f4",
    width: wp("100%"),
    height: hp("100%)"),
  },
  getStartedText: {
    width: wp("65%"),
    fontSize: wp("8%"),
    top:hp("80%"),
    left:wp("18%"),
    borderRadius: 120,
    borderWidth: wp("1%"),
    borderColor: "white",
    padding: wp("1.5%"),
    backgroundColor: "rgba(0,150,120,0.7)",
    color: "rgba(255,255,255,0.9)",
    textAlignVertical: "center",
    textAlign: "center",
  },
  firstBgStyle: {
    borderBottomWidth: 3,
    borderStyle: "solid",
    borderColor: "white",
    height: hp("100%"),
    width:wp('100%'),
    position: "relative",
  },
  secondBgStyle: {
    borderBottomWidth: 3,
    borderStyle: "solid",
    borderColor: "white",
    height: hp("45%"),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    //  position:'relative'
  },
  titleStyleFirstView: {
    width: wp("50%"),
    fontSize: wp("7%"),
    textAlign: "center",
    color: "white",
    fontWeight:'bold',
    position: "absolute",
    top: hp("60%"),
    left: wp("25%"),
  },
  getStarted: {
    marginBottom: "35%",
  },
});

const mapStateToProps = (state) => {
  return {
    userLogged: state.userReducer.userLogged,
  };
};

const mapDispatchToProps = {
  loadNavigation: userActions.loadNavigation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

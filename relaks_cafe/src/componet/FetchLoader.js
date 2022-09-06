import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
//import LottieView from 'lottie-react-native';


const Feching_Loader = () => {

    return(
        <View style={[StyleSheet.absoluteFillObject,styles.appButtonContainer]}>
            {/* <LottieView source={require('../assert/images/ahxdJFxTc5.json')} autoPlay loop  /> */}
        </View>
    )

}

const styles = StyleSheet.create({
    appButtonContainer: {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex : 1
      },
      appButtonText: {
        fontSize: 15,
        color: "#000",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }
  });

export default Feching_Loader;
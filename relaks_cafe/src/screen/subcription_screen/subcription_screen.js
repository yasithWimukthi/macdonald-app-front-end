import React, { PropTypes, Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const subcriptionScreen = () => {
    return(
        <View style={Styles.main}>
            <View style={Styles.titelMain}>
                <View style={Styles.titelHolder}>
                        <View style={Styles.titelContent}>
                            <Text style={Styles.TitelText}>Keep me in the know</Text>
                        </View>
                        <View style={Styles.titelDetilasContent}>
                            <Text style={Styles.subTextText}>To subscribe / unsubscribe from email communications and </Text>
                            <View style={Styles.titelSSubContent}>
                                <Text style={Styles.subTextText}>personalised marketing please vist our </Text>
                                <Text style={Styles.subTextHyperText}>perferce page</Text>
                            </View>
                        </View>
                </View>
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
       // backgroundColor: "#FFFFFF",
        backgroundColor: "#F5F5F5",
        //flexDirection: 'row',
        alignContent: 'center',
        //alignItems: 'center'
    },
    titelMain : {
        width:wp('100%'),
        height:hp('30%'),
        alignItems:'center',
        justifyContent:'center'
    },
    titelHolder : {
        width:wp('90%'),
        height:hp('20%'),
        justifyContent:'center'
    },
    titelContent : {
        width:wp('90%'),
        height:hp('8%'),
    },
    titelDetilasContent : {
        width:wp('90%'),
        height:hp('10%'),
       
    },
    titelSSubContent : {
        width:wp('90%'),
        alignItems:'center',
        flexDirection:'row'
    },
    TitelText: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 18,
        color: '#000',
        letterSpacing: 0.04,
    },
    subTextText: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 12,
        color: '#000',
        letterSpacing: 0.04,
    },
    subTextHyperText: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 12,
        color: 'blue',
        letterSpacing: 0.04,
        textDecorationLine: 'underline',
    },

});

export default subcriptionScreen;
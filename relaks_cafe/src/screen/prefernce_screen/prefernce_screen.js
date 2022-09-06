import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';


const TitelView = () => {
    return (
        <View style={Styles.titelContainer}>
            <View style={Styles.titelHolder}>
                <View style={Styles.titelConte}>
                    <Text style={Styles.defulat_text}>Set your preferences</Text>
                </View>
            </View>
        </View>
    );
}


const PushNotificationTile = () => {
    return (
        <View style={Styles.pushContainer}>
            <View style={Styles.titelHolder}>
                <View style={Styles.pushConte}>
                    <View style={Styles.pushtextHolder}>
                        <Text style={Styles.defulat_text_Info}>Push Noftifications</Text>
                    </View>
                    <View style={Styles.pushIconHolder}>
                        <Icon color="#000" name="right" size={20} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const EmailTitle = () => {
    return (
        <View style={Styles.pushContainer}>
            <View style={Styles.titelHolder}>
                <View style={Styles.pushConte}>
                    <View style={Styles.pushtextHolder}>
                        <Text style={Styles.defulat_text_Info}>Email</Text>
                    </View>
                    <View style={Styles.pushIconHolder}>
                        <Icon color="#000" name="right" size={20} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const perferce_screen = () => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={Styles.main}>
                <TitelView />
                <PushNotificationTile />
                <EmailTitle />
            </View>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        //flexDirection: 'row',
        alignContent: 'center',
        //alignItems: 'center'
    },
    titelContainer: {
        width: wp('100%'),
        height: hp('15%'),
        alignItems: 'center',
        justifyContent: 'center',
        // borderBottomWidth : 1,
        // borderBottomColor : '#c0c0c0'
    },
    pushContainer: {
        width: wp('100%'),
        height: hp('15%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#c0c0c0'
    },
    titelHolder: {
        width: wp('90%'),
        height: hp('12%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    titelConte: {
        width: wp('90%'),
        height: hp('10%'),
        justifyContent: 'center'
    },
    pushConte: {
        width: wp('90%'),
        height: hp('10%'),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    defulat_text: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 21,
        color: '#000',
        letterSpacing: 0.3,

    },
    pushIconHolder: {
        width: wp('15%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    pushtextHolder: {
        width: wp('75%'),
        height: hp('10%'),
        justifyContent: 'center'
    },
    defulat_text_Info: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 15,
        color: '#000',
        letterSpacing: 0.3,

    },

});

export default perferce_screen;
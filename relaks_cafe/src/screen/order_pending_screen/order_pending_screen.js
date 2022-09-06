import React, { PropTypes, Component, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import ProcessImage from '../../assert/images/process_image.jpg'

const OderDatilsTile = ({ orderState }) => {
    return (
        <View style={Styles.titelContainer}>
            <View style={Styles.titelHolder}>
                <View style={Styles.ImageContainer}>
                    <Image style={Styles.imageStyle} source={ProcessImage} />
                </View>
                <View style={Styles.textHolder}>
                    <Text style={Styles.textStyles}>{"Your Order is " + orderState + "..."}</Text>
                </View>

            </View>
        </View>
    );
}


const Order_Pendding_Screen = (...props) => {


    // alert(JSON.stringify(props[0].orderStatus));
    // console.log(JSON.stringify(props));

    const [orderStatus, setOrderStatus] = useState(props[0].orderStatus);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={Styles.main}>
                <OderDatilsTile orderState={orderStatus} />
            </View>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignContent: 'center',
        justifyContent: 'center'
    },
    titelContainer: {
        width: wp('100%'),
        height: hp('35%'),
        alignItems: 'center',
        justifyContent: 'center',
        // borderBottomWidth : 1,
        // borderBottomColor : '#c0c0c0'
    },
    titelHolder: {
        width: wp('90%'),
        height: hp('33%'),
        alignItems: 'center',
        justifyContent: 'center',
        // borderBottomWidth : 1,
        // borderBottomColor : '#c0c0c0'
    },
    ImageContainer: {
        width: wp('90%'),
        height: hp('28%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    textHolder: {
        width: wp('90%'),
        height: hp('10%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        width: "100%",
        height: "90%",
        resizeMode: 'contain',
    },
    textStyles: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 21,
        color: '#000',
        letterSpacing: 0.2,
    }
});

export default Order_Pendding_Screen;
import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';

import {FONT_BOLD,FONT_LIGHT} from '../../assert/key/key';

const SingleFaqTile = ({titel}) => {
    return(
        <View style={Styles.FAQSingaleContainer}>
            <View style={Styles.FAQSingaleHolder}>
                <View style={Styles.FAQTextHolder}>
                    <Text style={Styles.FAQSingleText}>{titel}</Text>
                </View>
                <View style={Styles.FAQIconHolder}>
                    <Icon color="red" name="down" size={20} />
                </View>
            </View>
        </View>
    );
}


const FAQ_Titel = () => {
    return(
        <View style={Styles.FAQTitelContainer}>
            <View style={Styles.FAQTitelHolder}>
                <View style={Styles.FAQTitelTextHolder}>
                    <Text style={Styles.FAQTitelText}>My Relaka's app FAQ</Text>
                </View>
                <View style={Styles.FAQTitelSubTextHolder}>
                    <Text style={Styles.FAQSubText}>Select the topic that you're wondering about, then </Text>
                    <Text style={Styles.FAQSubText}>browse the questions to find answer.</Text>
                </View>
            </View>
        </View>
    );
}



const FAQ_Screen = () => {
    return(
        <View style={Styles.main}>
            <FAQ_Titel/>
            <View style={{ flex :1,alignItems:'center' }}>
                    <SingleFaqTile titel={"How to use my Relaka's app"} />
                    <SingleFaqTile titel={"Payment"} />
                    <SingleFaqTile titel={"Drive Thru"} />
                    <SingleFaqTile titel={"Managing your payement cards"} />
                    <SingleFaqTile titel={"Managing your account, username and password"} />
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignContent: 'center',
    },
    FAQTitelContainer : {
        width: wp('100%'),
        height: hp('25%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor : '#F5F5F5',
        borderBottomWidth:1,

    },
    FAQTitelHolder : {
        width: wp('90%'),
        height: hp('22%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    FAQTitelTextHolder : {
        width: wp('90%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    FAQTitelSubTextHolder : {
        width: wp('90%'),
        height: hp('8%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    FAQTitelText : {
        fontFamily: FONT_BOLD,// 'NexaTextDemo-Bold',
        fontSize: 24,
        color: '#000',
        letterSpacing: 0.04,
    },
    FAQSubText : {
        fontFamily: FONT_LIGHT, //'NexaTextDemo-Light',
        fontSize: 13,
        color: '#000',
        letterSpacing: 0.04,
    },
    FAQSubMainText : {
        fontFamily: FONT_LIGHT, // 'NexaTextDemo-Light',
        fontSize: 16,
        color: '#000',
        letterSpacing: 0.04,
    },
    FAQSingaleContainer : {
        width: wp('100%'),
        height: hp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor : '#F5F5F5',
       // borderWidth:1,
       borderBottomWidth:1

    },
    FAQSingaleHolder : {
        width: wp('90%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'

    },
    FAQTextHolder : {
        width: wp('80%'),
        height: hp('8%'),
        justifyContent: 'center',
    },
    FAQIconHolder : {
        width: wp('10%'),
        height: hp('8%'),
        alignItems:'center',
        justifyContent: 'center',
    },
    FAQSingleText : {
        fontFamily: FONT_LIGHT , //'NexaTextDemo-Light',
        fontSize: 16,
        color: '#000',
        letterSpacing: 0.04,
    },
    
});

export default FAQ_Screen;
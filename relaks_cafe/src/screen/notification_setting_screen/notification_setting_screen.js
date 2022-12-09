import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text,TouchableOpacity, SafeAreaView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import {FONT_BOLD,FONT_LIGHT} from '../../assert/key/key';

const TitelTikeView = () => {
    return(
        <View style={Styles.titelContainer}>
            <View style={Styles.titelHolder}>
                <View style = {Styles.titelConte}>
                    <Text style={Styles.defulat_text}>We'll send you push notifications {"\n"}about great new deals you won't {"\n"}want to miss</Text>
                </View>
            </View>
        </View>
    );
}

const ConditionView = () => {
    return(
        <View style={Styles.conditionContainer}>
            <View style={Styles.ConditionHolder}>
                <View style={Styles.ConditionConte}>
                    <Text style={Styles.condition_text}>In order to change your device notification settings, {"\n"}follow the steps below.</Text>
                </View>
                <View style={Styles.ConditionConte}>
                    <Text style={Styles.condition_text}>1. Open settings, then tap on the Relaks App</Text>
                </View>
                <View style={Styles.ConditionConte}>
                    <Text style={Styles.condition_text}>2. Tap on Notifications then tap on the Allow {"\n"}Notification toggle.</Text>
                </View>
            </View>
        </View>
    );
}

const BootomBtn = () => {
    return(
        <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={() => { alert("ypu press login") }}>
                <View style={ [Styles.btnBorder,{backgroundColor:'yellow',borderWidth:0}]}>
                    <View style={Styles.btn_icon_holder}>
                        {/* <Icon color="#4285F4" name="google" size={30} /> */}
                    </View>
                    <View style={Styles.btn_text_holder_login}>
                        <Text style={Styles.brtn_text_content}>Change My Settings</Text>
                    </View>
                    <View style={Styles.btn_icon_holder}>
                        {/* <Icon color="#000" name="right" size={30} /> */}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const notificationSetting = () =>{
    return(
        <SafeAreaView style={{ flex:1 }}>
        <View style={Styles.main}>
            <TitelTikeView />
            <ConditionView/>
            <BootomBtn/>
        </View>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    main : {
        flex: 1,
        backgroundColor: "#FFFFFF",
        //flexDirection: 'row',
        alignContent: 'center',
        //alignItems: 'center'
    },
    titelContainer : {
        width:wp('100%'),
        height:hp('25%'),
        alignItems:'center',
        justifyContent:'center',
        // borderBottomWidth : 1,
        // borderBottomColor : '#c0c0c0'
    },
    pushContainer : {
        width:wp('100%'),
        height:hp('20%'),
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth : 1,
        borderBottomColor : '#c0c0c0'
    },
    titelHolder : {
        width:wp('90%'),
        height:hp('20%'),
        alignItems:'center',
        justifyContent:'center'
    },
    titelConte : {
        width:wp('90%'),
        height:hp('20%'),
        justifyContent:'center'
    },
    defulat_text: {
        fontFamily: FONT_BOLD, // 'NexaTextDemo-Bold',
        fontSize: 21,
        color: '#000',
        letterSpacing: 0.3,

    },
    conditionContainer : {
        width:wp('100%'),
        height:hp('30%'),
        alignItems:'center',
        justifyContent:'center',
        // borderBottomWidth : 1,
        // borderBottomColor : '#c0c0c0'
    },
    ConditionHolder : {
        width:wp('90%'),
        height:hp('25%'),
        alignItems:'center',
    },
    ConditionConte : {
        width:wp('90%'),
        justifyContent:'center',
        marginTop:hp('2%'),
        marginBottom:hp('1%'),
    },
    condition_text: {
        fontFamily: FONT_LIGHT, // 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.04,

    },
    btnContainer: {
        //flex: 1,
        width: wp('100%'),
        height: hp('8%'),
        // backgroundColor:'pink',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
    },
    btnBorder: {
        width: wp("90%"),
        height: hp('7%'),
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },
    btn_icon_holder : {
        width: "20%",
        height: hp('5%'),
        alignItems:'center'
,        justifyContent:'center'
    },
    btn_text_holder : {
        width: "60%",
        height: hp('5%'),
        justifyContent:'center'
    },
    btn_text_holder_login : {
        width: "60%",
        height: hp('5%'),
        justifyContent:'center',
        alignItems:'center'
    },
    brtn_text_content : {
        fontFamily: FONT_BOLD, // 'NexaTextDemo-Bold',
        fontSize: 16,
        color: '#000'
    },
});


export default notificationSetting;
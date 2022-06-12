import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import ToggleSwitch from 'toggle-switch-react-native'

const TitelView = () => {
    return (
        <View style={Styles.titelContainer}>
            <View style={Styles.titelHolder}>
                <View style={Styles.titelConte}>
                    <Text style={Styles.defulat_text}>Personal Setting</Text>
                </View>
                <View style={Styles.titelConteSub}>
                    <Text style={Styles.defulat_text_sub}>We respect and value your privacy & personal {"\n"}data. </Text>
                </View>
            </View>
        </View>
    );
}

const DescriptionTextView = () => {
    return (
        <View style={Styles.DesciptionContainer}>
            <View style={Styles.DesciptionHolder}>
                <View style={Styles.DesciptionText1Holder}>
                    <Text style={Styles.decriptionText}>California Residents: You have privacy rights with respect to {"\n"}your personal infomation we collect.
                        If you wannt to receive access to your personal infomation, have your personal {"\n"}infomation deleted or out from
                        the sale of your personal {"\n"}infomation, please click "Right Center" below and you will {"\n"}be taken to the
                        Relaka's CCPA Rights Center in order to {"\n"}make your request.
                    </Text>
                </View>
                <View style={Styles.DesciptionText2Holder}>
                    <Text style={Styles.decriptionText}>You can find our privacy paractices on Relaka's</Text>
                    <Text style={Styles.decriptionTextUnderLine}>Privacy Statement.</Text>
                </View>
            </View>
        </View>
    );
}

const DapView = () => {
    return (
        <View style={Styles.DAPContainer}>
            <View style={Styles.DAPHolder}>
                <View style={Styles.DAPTextInfoHolder}>
                    <Text style={Styles.subtextBold}>NOT USED IN DAP US</Text>
                </View>
                <View style={Styles.DAPTextSubInfoHolder}>
                    <View style={Styles.subDapTextView}>
                        <Text style={Styles.subtextlight}>NOT USED IN DAP US</Text>
                    </View>
                    <View style={Styles.subDapToggleView}>
                    <ToggleSwitch
                        isOn={false}
                        onColor="#FFD800"
                        offColor="#c0c0c0"
                        label=""
                        labelStyle={{ color: "black", fontWeight: "900" }}
                        size="large"
                        onToggle={isOn => console.log("changed to : ", isOn)}
                    />
                    </View>
                </View>
            </View>
        </View>
    );
}

const RightCenterView = () => {
    return(
        <View style={Styles.rightCenterContainer}>
            <View style={Styles.rightCenterHolder}>
                <View style={Styles.rightCenterRowCont}>
                    <Icon color="#EB1F25" name="link" size={20} />
                    <Text style={Styles.righttextlight}>Right Center</Text>
                </View>
            </View>
        </View>
    );
}

const PrivencySettingScreen = () => {
    return (
        <View style={Styles.main}>
            <TitelView />
            <DescriptionTextView />
            <DapView/>
            <View style={{ flex : 1,  alignItems: 'center', justifyContent: 'center', }}>
                <RightCenterView/>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignContent: 'center',
    },
    titelContainer: {
        width: wp('100%'),
        height: hp('18%'),
        alignItems: 'center',
        justifyContent: 'center',
        // borderBottomWidth : 1,
        // borderBottomColor : '#c0c0c0'
    },
    titelHolder: {
        width: wp('90%'),
        height: hp('16%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    titelConte: {
        width: wp('90%'),
        height: hp('8%'),
        justifyContent: 'center'
    },
    titelConteSub: {
        width: wp('90%'),
        height: hp('6%'),
        justifyContent: 'center'
    },
    defulat_text: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 21,
        color: '#000',
        letterSpacing: 0.3,

    },
    defulat_text_sub: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 15,
        color: '#000',
        letterSpacing: 0.3,

    },
    DesciptionContainer: {
        width: wp('100%'),
        height: hp('30%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#c0c0c0'
    },
    DesciptionHolder: {
        width: wp('90%'),
        height: hp('28%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    DesciptionText1Holder: {
        width: wp('90%'),
        height: hp('20%'),
        justifyContent: 'center',
    },
    DesciptionText2Holder: {
        width: wp('90%'),
        height: hp('6%'),
        justifyContent: 'center',
    },
    decriptionText: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 12,
        color: '#000',
        letterSpacing: 0.2,
    },
    decriptionTextUnderLine: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 12,
        color: '#EB1F25',
        letterSpacing: 0.2,
        textDecorationLine: 'underline',
    },
    DAPContainer: {
        width: wp('100%'),
        height: hp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#c0c0c0'
    },
    DAPHolder: {
        width: wp('90%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    DAPTextInfoHolder: {
        width: wp('90%'),
        height: hp('4%'),
        justifyContent: 'center',
    },
    DAPTextSubInfoHolder: {
        width: wp('90%'),
        height: hp('4%'),
        justifyContent: 'center',
        flexDirection:'row'
    },
    subDapTextView: {
        width: wp('60%'),
        height: hp('3%'),
        justifyContent: 'center',
    },
    subDapToggleView: {
        width: wp('30%'),
        height: hp('3%'),
        justifyContent: 'center',
        alignItems:'flex-end'
    },
    subtextBold : {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 15,
        color: '#000',
        letterSpacing: 0.2,
    },
    subtextlight : {
        fontFamily: 'NexaTextDemo-light',
        fontSize: 13,
        color: '#000',
        letterSpacing: 0.2,
    },
    rightCenterContainer : {
        width: wp('100%'),
        height: hp('4%'),
        justifyContent: 'center',
        alignItems:'center'
    },
    rightCenterHolder : {
        width: wp('90%'),
        height: hp('3%'),
        justifyContent: 'center',
        alignItems:'center'
    },
    rightCenterRowCont : {
        width: wp('90%'),
        height: hp('3%'),
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'row'

    },
    righttextlight : {
        fontFamily: 'NexaTextDemo-light',
        fontSize: 14,
        color: '#EB1F25',
        letterSpacing: 0.2,
        textDecorationLine: 'underline',
    },
});

export default PrivencySettingScreen;
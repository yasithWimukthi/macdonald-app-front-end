import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity,TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';


const TitelContainer = () => {
    return(
        <View style={Styles.TitelContainer}>
            <View style={Styles.TitelHolder}>
                <View style={Styles.TitelTextHolder}>
                    <Text style={Styles.titel_text_Info}>Enter</Text>
                </View>
                <View style={Styles.TitelSubTextHolder}>
                    <Text style={Styles.titel_sub_text_Info}>Enter your code to redeem voucher </Text>
                </View>
            </View>
        </View>
    );
}


const InputTile = () => {
    return(
        <View style={Styles.InputContainer}>
            <View style={Styles.InputHolder}>
                <View style={Styles.InputUiHolder}>
                    <TextInput placeholder='Voucher Code' placeholderTextColor="#000" style={Styles.defulatTextInput} />
                </View>
                <Text style={Styles.input_text_Info}>Could should be 12 characters long, Only alph numeric characters are allowed.</Text>
            </View>
        </View>
    );
}

const HelpBtn = () => {
    return(
        <View style={Styles.HelpContainer}>
            <View style={Styles.HelptHolder}>
                <Text style={Styles.subTextHyperText}>Need Help?</Text>
                <Icon color="#000" name="arrowdown" size={20} />
            </View>
        </View>
    );
}

const BootomBtn = () => {
    return(
        <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={() => { alert("you press Next") }}>
                <View style={ [Styles.btnBorder,{backgroundColor:'yellow',borderWidth:0}]}>
                    <View style={Styles.btn_icon_holder}>
                        {/* <Icon color="#4285F4" name="google" size={30} /> */}
                    </View>
                    <View style={Styles.btn_text_holder_login}>
                        <Text style={Styles.brtn_text_content}>Next</Text>
                    </View>
                    <View style={Styles.btn_icon_holder}>
                        {/* <Icon color="#000" name="right" size={30} /> */}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const Voucher_Screen = () => {
    return(
        <View style={Styles.main}>
            <TitelContainer/>
            <InputTile/>
            <View style={{ flex : 1,alignItems:'center',justifyContent:'center' }}>
                <HelpBtn/>
            </View>
            <BootomBtn/>
        </View>
    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignContent: 'center',
    },
    TitelContainer : {
        width: wp('100%'),
        height: hp('15%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    TitelHolder : {
        width: wp('90%'),
        height: hp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    TitelTextHolder : {
        width: wp('90%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    TitelSubTextHolder : {
        width: wp('90%'),
        height: hp('3%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    titel_text_Info: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 21,
        color: '#000',
        letterSpacing: 0.3,

    },
    titel_sub_text_Info: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 16,
        color: '#000',
        letterSpacing: 0.3,

    },
    InputContainer : {
        width: wp('100%'),
        height: hp('15%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    InputHolder : {
        width: wp('90%'),
        height: hp('13%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    InputUiHolder : {
        width: wp('90%'),
        height: hp('6%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    defulatTextInput:{
        width: wp('90%'),
        height: 40,
        borderBottomColor: '#000',
        borderBottomWidth: 1
    },
    input_text_Info: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 12,
        color: '#000',
        letterSpacing: 0.3,

    },
    HelpContainer : {
        width: wp('100%'),
        height: hp('8%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    HelptHolder : {
        width: wp('90%'),
        height: hp('6%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    subTextHyperText: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.04,
        textDecorationLine: 'underline',
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
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 16,
        color: '#000'
    },
});

export default Voucher_Screen;
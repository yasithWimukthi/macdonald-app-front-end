import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity,TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';

import app_logo from '../../assert/images/splash_app_logo.png';

import {FONT_BOLD, FONT_LIGHT} from '../../assert/key/key';

const TitelContainer = () => {
    return(
        <View style={Styles.tittelContainer}>
            <View style={Styles.tittelHolder}>
                <View style={Styles.titelImageHolder}>
                    <Image source={{uri: 'tabbar_icon'}} style={Styles.app_logs } />
                </View>
                <View style={Styles.titelTextsHolder}>
                    <View style={Styles.titelTextsHolder}>
                        <Text style={Styles.mainTitelText}>Hello!</Text>
                        <Text style={Styles.subInfoText}>We'd love to get feedback from you on our {"\n"}app. The more details you can provide, the {"\n"}better.</Text>
                        <View style={Styles.titelTextsIconHolder}>
                            <Icon color="#FFF" name="infocirlceo" size={20} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const FormTabContainer = () => {
    return(
        <View style={Styles.fomeContainer}>
            <View elevation={2} style={Styles.fomeholder}>
                <View style={Styles.formTitelHolder}>
                    <Text style={Styles.FormITitelInfoText}>Who we are speaking with?</Text>
                </View>
                <View style={Styles.formInputHolder}>
                    <TextInput placeholder='Name' placeholderTextColor="#000" style={Styles.defulatTextInput} />
                </View>
                <View style={Styles.formInputHolder}>
                    <TextInput placeholder='Email (required)' placeholderTextColor="#000" style={Styles.defulatTextInput} />
                    <Text style={Styles.FormSubInfoText}>So we're able to reply</Text>
                </View>

                <View style={Styles.formBtnHolder}>
                    <Text style={Styles.FormBtnInfoText}>Next</Text>
                </View>
            </View>
        </View>
    );
}


const WriteToUs_Screen = () => {
    return(
        <View style={Styles.main}>
            <TitelContainer />
            <FormTabContainer/>
        </View>
    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignContent: 'center',
    },
    tittelContainer : {
        width: wp('100%'),
        height: hp('25%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#525252'
    },
    tittelHolder : {
        width: wp('90%'),
        height: hp('20%'),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    titelImageHolder : {
        width: wp('20%'),
        height: hp('18%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    app_logs : {
        width:wp('18%'),
        height:hp('9%'),
        borderRadius:hp('5%'),
        alignContent:'center',
        alignItems:'center',
        resizeMode: "contain",
    },
    titelTextsHolder : {
        width: wp('70%'),
        height: hp('18%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    titelTextsHolder : {
        width: wp('70%'),
        height: hp('16%'),
        justifyContent: 'center',
    },
    titelTextsIconHolder : {
        width: wp('70%'),
        height: hp('4%'),
        alignItems:'flex-end',
        justifyContent: 'center',
    },
    mainTitelText : {
        fontFamily: FONT_LIGHT, // 'NexaTextDemo-Light',
        fontSize: 16,
        color: '#FFF',
        letterSpacing: 0.3,
        marginBottom:wp('3%')
    },
    subInfoText : {
        fontFamily: FONT_LIGHT, // 'NexaTextDemo-Light',
        fontSize: 13,
        color: '#FFF',
        letterSpacing: 0.2,
    },
    fomeContainer : {
        width: wp('100%'),
        height: hp('35%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    fomeholder : {
        width: wp('90%'),
        height: hp('30%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#FFF'
    },
    defulatTextInput:{
        width: wp('80%'),
        height: 40,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        fontFamily: FONT_LIGHT, // 'NexaTextDemo-Light',
        color: '#000'
    },
    formTitelHolder : {
        width: wp('80%'),
        height: hp('5%'),
        justifyContent: 'center',
        marginBottom:hp('1.5%'),
    },
    formInputHolder : {
        width: wp('80%'),
        height: hp('7%'),
        justifyContent: 'center',
        marginBottom:hp('1.5%'),
    },
    formBtnHolder : {
        width: wp('80%'),
        height: hp('5%'),
        justifyContent: 'center',
        alignItems:'flex-end',
        marginRight:wp('7%'),
        marginBottom:hp('1.5%'),

    },
    FormITitelInfoText : {
        fontFamily: FONT_LIGHT, // 'NexaTextDemo-Light',
        fontSize: 15,
        color: '#000',
        letterSpacing: 0.2,
    },
    FormBtnInfoText : {
        fontFamily: FONT_LIGHT, // 'NexaTextDemo-Light',
        fontSize: 15,
        color: 'blue',
        letterSpacing: 0.2,
    },
    FormSubInfoText : {
        fontFamily: FONT_LIGHT, // 'NexaTextDemo-Light',
        fontSize: 13,
        color: '#000',
        letterSpacing: 0.2,
        marginTop:wp('2%'),
    },
});

export default WriteToUs_Screen;
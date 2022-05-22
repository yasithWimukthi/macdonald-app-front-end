import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Feather';



const TitelView = () => {
    return (
        <View style={Styles.titelContainer}>
            <View style={Styles.titelHolder}>
                <Text style={Styles.titelText}>Register</Text>
                <Text style={Styles.requredText}>*Indicates required field</Text>
            </View>
        </View>
    );
}


const FirstFormContent = () => {
    return (
        <View style={Styles.frist_form_container}>
            <View style={Styles.input_holder}>
                <View style={Styles.inputContainer_Row}>
                    <TextInput placeholder='*Frist Name' placeholderTextColor="#000" style={Styles.defulatTextInput} />
                </View>
                <View style={Styles.inputContainer_Row}>
                    <TextInput placeholder='*Last Name' placeholderTextColor="#000" style={Styles.defulatTextInput} />
                </View>
                <View style={Styles.inputContainer_Row}>
                    <TextInput placeholder='*Email' placeholderTextColor="#000" style={Styles.defulatTextInput} />
                </View>
                <View style={Styles.inputContainer_Row_icon}>
                    <View style={Styles.subinputContainer}>
                        <TextInput
                            style={Styles.defulatTextInput}
                            placeholder='*Password'
                            placeholderTextColor="#000"
                        />
                        <Icons style={Styles.icon} color="#000" name="eye-off" size={20} />
                    </View>
                </View>
                <View style={Styles.textRow_for_content}>
                    <View style={[Styles.instutionTitelContainer, { height: hp('5%') }]}>
                        <Text style={Styles.insturtionTitel}>Plase ensure you use a unique password and change it {"\n"}frequently</Text>
                    </View>
                    <View style={Styles.instutionTitelContainer}>
                        <Text style={Styles.insturtionDetails}>password must be 8 to 16 characters</Text>
                    </View>
                    <View style={Styles.instutionTitelContainer}>
                        <Text style={Styles.insturtionDetails}>include upper and lower case characters</Text>
                    </View>
                    <View style={Styles.instutionTitelContainer}>
                        <Text style={Styles.insturtionDetails}>include one number</Text>
                    </View>
                    <View style={Styles.instutionTitelContainer}>
                        <Text style={Styles.insturtionDetails}>include one special character</Text>
                    </View>
                </View>

                <View style={[Styles.inputContainer_Row_icon, { marginTop: hp('4%') }]}>
                    <View style={Styles.subinputContainer}>
                        <TextInput
                            style={Styles.defulatTextInput}
                            placeholder='*Confirm Password'
                            placeholderTextColor="#000"
                        />
                        <Icons style={Styles.icon} color="#000" name="eye-off" size={20} />
                    </View>
                </View>

                <View style={[Styles.inputContainer_Row, { height: hp('5%') }]}>
                    <TextInput placeholder='*Postalcode (incl. space)' placeholderTextColor="#000" style={Styles.defulatTextInput} />
                    <Text style={[Styles.insturtionDetails, { fontSize: 12, letterSpacing: 0.10, marginTop: 10 }]}>Providing your postalcode helps us find the nearest Relaks cafe to you </Text>
                </View>

            </View>
        </View>
    );
}

const PerferContent = () => {
    return (
        <View style={Styles.perferContainer}>
            <View style={Styles.preferHolder}>
                <View style={Styles.instutionTitelContainer}>
                    <Text style={Styles.insturtionTitel}>Preference</Text>
                </View>
                <View style={Styles.instutionTitelContainer}>
                    <Text style={Styles.insturtionDetails}>*Indicates required fields</Text>
                </View>

                <View style={Styles.preferCheckBoxHolder}>
                    <View style={Styles.preferCheckBox_icon_holder}>

                    </View>
                    <View style={Styles.preferCheckBox_text_holder}>
                        <Text style={Styles.preferCheckBox_text_content}>I would like to receive news and offers from {"\n"}Relaks by e-mail and I confirm I am 18 years {"\n"} or older.</Text>
                    </View>
                    <View style={Styles.preferCheckBox_icon_holder}>
                        <Icon color="#000" name="questioncircleo" size={20} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const TermsAndCondition = () => {
    return (
        <View style={Styles.termsAnsCondContainer}>
            <View style={Styles.termsAnsCondHolder}>
                <View style={Styles.instutionTitelContainer}>
                    <Text style={Styles.insturtionTitel}>Terms & Conditions</Text>
                </View>
                <View style={Styles.instutionTitelContainer}>
                    <Text style={Styles.insturtionDetails}>*Indicates required fields</Text>
                </View>

                <View style={Styles.termsAnsCondCheckBoxHolder}>
                    <View style={Styles.termsAnsCondCheckBox_icon_holder}>

                    </View>
                    <View style={Styles.termsAnsCondCheckBox_text_holder}>
                        <Text style={Styles.preferCheckBox_text_content}>*I agree not to use the app while driving  {"\n"} or older.</Text>
                    </View>

                </View>
                <View style={Styles.termsAnsCondCheckBoxHolder}>
                    <View style={Styles.termsAnsCondCheckBox_icon_holder}>

                    </View>
                    <View style={Styles.termsAnsCondCheckBox_text_holder}>
                        <Text style={Styles.preferCheckBox_text_content}>*I confirm I am 18 year old or older than and {"\n"} I agree with Relaks.</Text>
                        <View style={{ flexDirection:'row' }}>
                            <Text style={Styles.hiyperlink_text}>Terms&Conditions </Text>
                            <Text style={Styles.preferCheckBox_text_content}>& </Text>
                            <Text style={Styles.hiyperlink_text}>Privacy Statement </Text>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    );
}


const BtnLoginView = () => {
    return (
        <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={() => { alert("ypu press login") }}>
                <View style={ [Styles.btnBorder,{backgroundColor:'yellow',borderWidth:0}]}>
                    <View style={Styles.btn_icon_holder}>
                        {/* <Icon color="#4285F4" name="google" size={30} /> */}
                    </View>
                    <View style={Styles.btn_text_holder_login}>
                        <Text style={Styles.brtn_text_content}>Create Account</Text>
                    </View>
                    <View style={Styles.btn_icon_holder}>
                        {/* <Icon color="#000" name="right" size={30} /> */}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const signup_form_screen = () => {
    return (
        <View style={Styles.main}>
            <ScrollView>
                <TitelView />
                <FirstFormContent />
                <PerferContent />

                <TermsAndCondition />

                <BtnLoginView/>
            </ScrollView>
        </View>
    );
}

const Styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: "#FFF",
        alignContent: 'center',
        

    },
    titelContainer: {
        width: wp('100%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    titelHolder: {
        width: wp('90%'),
        height: hp('7%'),
    },
    titelText: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 28,
        color: '#000',
    },
    requredText: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
    },
    frist_form_container: {
        width: wp('100%'),
        height: hp('80%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    input_holder: {
        width: wp('90%'),
        height: hp('20%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    subinputContainer: {
        justifyContent: 'center',
    },
    inputContainer_Row: {
        width: wp('90%'),
        height: hp('4%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('3%'),
        marginBottom: hp('2%'),
    },
    inputContainer_Row_icon: {
        width: wp('90%'),
        height: hp('4%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('3%'),
        marginBottom: hp('2%'),

    },
    defulatTextInput: {
        width: wp('90%'),
        height: 40,
        borderBottomColor: '#000',
        borderBottomWidth: 1
    },
    icon: {
        position: 'absolute',
        right: 10,

    },
    textRow_for_content: {
        height: hp('20%'),
        width: wp('90%'),

    },
    instutionTitelContainer: {
        height: hp('4%'),
        width: wp('90%'),
        justifyContent: 'center',
    },
    insturtionTitel: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 16,
        color: '#000',
    },
    insturtionDetails: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
    },
    perferContainer: {
        height: hp('22%'),
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    preferHolder: {
        width: wp('90%'),
        height: hp('15%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    preferCheckBoxHolder: {
        width: wp("90%"),
        height: hp('15%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    preferCheckBox_icon_holder: {
        width: "10%",
        height: hp('13%'),
        alignItems: 'center'
        , justifyContent: 'center'
    },
    preferCheckBox_text_holder: {
        width: "80%",
        height: hp('13%'),
        justifyContent: 'center'
    },
    preferCheckBox_text_content: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 13,
        color: '#000',
        letterSpacing: 0.05,
    },
    termsAnsCondContainer: {
        height: hp('25%'),
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    termsAnsCondHolder: {
        width: wp('90%'),
        height: hp('20%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    termsAnsCondCheckBoxHolder: {
        width: wp("90%"),
        height: hp('7%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    termsAnsCondCheckBox_icon_holder: {
        width: "10%",
        height: hp('5%'),
        alignItems: 'center'
        , justifyContent: 'center'
    },
    termsAnsCondCheckBox_text_holder: {
        width: "90%",
        height: hp('5%'),
        justifyContent: 'center'
    },
    btnContainer: {
        //flex: 1,
        width: wp('100%'),
        height: hp('8%'),
        // backgroundColor:'pink',
        alignItems: 'center',
        justifyContent: 'center'
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
    hiyperlink_text: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: 'blue',
        textDecorationLine: 'underline'
    },

});

export default signup_form_screen;

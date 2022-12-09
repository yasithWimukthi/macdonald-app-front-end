import React, { PropTypes, Component, useState } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import { Actions } from 'react-native-router-flux';

import { Funtion_Reset_Pasword } from '../../assert/networks/api_calls';
import AwesomeAlert from 'react-native-awesome-alerts';

import { useSelector, useDispatch } from 'react-redux';

import NetInfo from "@react-native-community/netinfo";

import {FONT_BOLD,FONT_LIGHT} from '../../assert/key/key';

const TitelView = () => {
    return (
        <View style={Styles.textContainer}>
            <View style={Styles.textHolder}>
                <View>
                    <Text style={Styles.reset_text_content}>Reset Your Password</Text>
                </View>
            </View>
        </View>
    );
}

const FormViews = ({ updateShow, updateTitel, updateMessage, resetTokens }) => {

    const { user } = useSelector(state => state.userReducer);

    const [newPassword, setNewPassword] = useState("");
    const [newREPassword, setRENewPassword] = useState("");
    const [viewPass, setViewPass] = useState(true);
    const [viewREPass, setREViewPass] = useState(true);

    function validPassword() {
        if (newPassword != null || newPassword != "") {
            if (newREPassword != null || newREPassword != "") {
                if (newPassword == newREPassword) {
                    callingResetAPI();
                } else {
                    //password not match
                    updateTitel("Error");
                    updateMessage("Password Not Match, Please try again.");
                    updateShow(true);
                }
            } else {
                //enter re password
                updateTitel("Error");
                updateMessage("Please Re-Enter New Password");
                updateShow(true);
            }
        } else {
            //enter new password
            updateTitel("Error");
            updateMessage("Please Enter New Password");
            updateShow(true);
        }
    }

    function callingResetAPI() {

        var brToken = user.token;
        var dats = {
            "token": resetTokens,
            "email": user.email,
            "password": newPassword
        }

        NetInfo.fetch().then(state => {

            if (state.isConnected) {

                Funtion_Reset_Pasword(dats, brToken).then((respose) => {
                    if (respose.code == '200') {
                        updateTitel("Successfull");
                        updateMessage("Password reset successfully.");
                        updateShow(true);

                        setTimeout(() => { Actions.auth(); }, 1000);

                    } else {
                        updateTitel("Error");
                        updateMessage("Unable to reset your password, try again");
                        updateShow(true);
                    }
                }).catch((error) => {
                    console.log("error happen when update password " + error);
                    updateTitel("Error");
                    updateMessage("Something went wrong, try again");
                    updateShow(true);
                });

            } else {
                updateTitel("Error");
                updateMessage("Please connect your device to internet");
                updateShow(true);
            }
        });
    }

    return (
        <View style={Styles.formContainer}>
            <View style={Styles.formHolder}>

                <View style={[Styles.inputContainer_Row_icon, { marginTop: hp('4%') }]}>
                    <View style={Styles.subinputContainer}>
                        <TextInput
                            style={Styles.defulatTextInput}
                            secureTextEntry={viewPass}
                            placeholder='New Password'
                            placeholderTextColor="#000"
                            onChangeText={(values) => { setNewPassword(values); }}
                            value={newPassword}
                        />

                        <View style={Styles.icon}>
                            <TouchableOpacity onPress={() => { setViewPass(!viewPass) }}>
                                <Icon color="#000" name={(viewPass) ? "eye-off" : "eye"} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={[Styles.inputContainer_Row_icon, { marginTop: hp('4%') }]}>
                    <View style={Styles.subinputContainer}>
                        <TextInput
                            style={Styles.defulatTextInput}
                            secureTextEntry={viewREPass}
                            placeholder='Confirm Password'
                            placeholderTextColor="#000"
                            onChangeText={(values) => { setRENewPassword(values); }}
                            value={newREPassword}
                        />

                        <View style={Styles.icon}>
                            <TouchableOpacity onPress={() => { setREViewPass(!viewREPass) }}>
                                <Icon color="#000" name={(viewREPass) ? "eye-off" : "eye"} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


                <TouchableOpacity onPress={() => { validPassword(); }}>
                    <View style={[Styles.btnBorder, { backgroundColor: '#EB1F25', borderWidth: 0, marginTop: hp('4%') }]}>
                        <View style={Styles.btn_icon_holder}>
                            {/* <Icon color="#4285F4" name="google" size={30} /> */}
                        </View>
                        <View style={Styles.btn_text_holder_login}>
                            <Text style={Styles.brtn_text_content}>Rest Password</Text>
                        </View>
                        <View style={Styles.btn_icon_holder}>
                            {/* <Icon color="#000" name="right" size={30} /> */}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Reset_Password_Screen = () => {


    //need to get token from url

    const [resetToken, setResetToken] = useState("");
    const [showOk, setShowOk] = useState(false);
    const [modelTitel, setModelTitel] = useState("");
    const [modelMessage, setModelMessage] = useState("");

    return (
        <SafeAreaView style={{ flex:1 }}>
        <View style={Styles.main}>
            <TitelView />

            <FormViews resetTokens={resetToken} updateShow={setShowOk} updateTitel={setModelTitel} updateMessage={setModelMessage} />

            <AwesomeAlert
                show={showOk}
                showProgress={false}
                title={modelTitel}
                message={modelMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                cancelText="cancel"
                confirmText="Ok"
                confirmButtonColor="red" //#DD6B55
                onCancelPressed={() => {
                    showOk(false);
                }}
                onConfirmPressed={() => {
                    showOk(false);
                }}
            />

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
    textContainer: {
        width: wp('100%'),
        height: hp('30%'),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',

    },
    textHolder: {
        width: wp('90%'),
        height: hp('28%'),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',

    },
    formContainer: {
        width: wp('100%'),
        height: hp('40%'),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    formHolder: {
        width: wp('90%'),
        height: hp('38%'),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
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
        borderBottomWidth: 1,
        fontFamily:  FONT_LIGHT, //'NexaTextDemo-Light',
        color: '#000'
    },
    icon: {
        position: 'absolute',
        right: 10,

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
        justifyContent: 'center'
    },
    btn_icon_holder: {
        width: "20%",
        height: hp('5%'),
        alignItems: 'center'
        , justifyContent: 'center'
    },
    btn_text_holder: {
        width: "60%",
        height: hp('5%'),
        justifyContent: 'center'
    },
    btn_text_holder_login: {
        width: "60%",
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    brtn_text_content: {
        fontFamily: FONT_BOLD,// 'NexaTextDemo-Bold',
        fontSize: 16,
        color: '#000'
    },
    reset_text_content: {
        fontFamily: FONT_BOLD, // 'NexaTextDemo-Bold',
        fontSize: 18,
        color: '#000'
    },
});

export default Reset_Password_Screen;
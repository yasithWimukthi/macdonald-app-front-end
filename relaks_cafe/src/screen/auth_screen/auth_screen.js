import React, { PropTypes, Component, useState } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

//import {Funtion_Auth,Funtion_FaceBook_Register} from '../../assert/networks/api_calls';
import NetInfo from "@react-native-community/netinfo";
import { Funtion_Auth } from '../../assert/networks/api_calls';
import SweetAlert from 'react-native-sweet-alert';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-spinkit';

import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/actions';

import { StoreUserInfo } from '../../assert/storeage/data_store';


const RulesTexts = () => {
    return (
        <View style={Styles.textContainer}>
            <View style={Styles.text_holder}>
                <Text style={Styles.defulat_text}>By logging in, I agree with Relaks's</Text>
                <View style={Styles.textRow}>
                    <Text style={Styles.hiyperlink_text}>Terms & Conditions </Text>
                    <Text style={Styles.defulat_text}>and </Text>
                    <Text style={Styles.hiyperlink_text}>Privacy Policy</Text>
                </View>
            </View>
        </View>
    );
}



const FormView = ({ username, passwords, updateUserName, updatePassowrd }) => {

    const [userName, setUserName] = useState(username);
    const [password, setPassword] = useState(passwords);

    const [viewPass, setViewPass] = useState(true);

    return (
        <View style={Styles.inputContainer}>
            <View style={Styles.input_holder}>
                <View style={Styles.inputContainer_Row}>
                    <TextInput placeholder='Email' keyboardType='email-address' value={userName} onChangeText={(values) => { setUserName(values); updateUserName(values) }} placeholderTextColor="#000" style={Styles.defulatTextInput} />
                </View>
                <View style={Styles.inputContainer_Row_icon}>
                    <View style={Styles.subinputContainer}>
                        <TextInput
                            style={Styles.defulatTextInput}
                            secureTextEntry={viewPass}
                            placeholder='Password'
                            value={password}
                            onChangeText={(values) => { setPassword(values); updatePassowrd(values) }}
                            placeholderTextColor="#000"
                        />
                        <View style={Styles.icon}>
                            <TouchableOpacity onPress={() => { setViewPass(!viewPass) }}>
                                <Icons color="#000" name={(viewPass) ? "eye-off" : "eye"} size={20} />
                            </TouchableOpacity>
                        </View>
                        {/* <Icons style={Styles.icon} color="#000" name="eye-off" size={20} /> */}
                    </View>
                </View>
                <TouchableOpacity onPress={() => { Actions.forgetPass(); }}>
                    <View style={Styles.textRow_for}>
                        <Text style={Styles.hiyperlink_text}>Forget Password</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    );
}


const BtnFaceBookView = ({ facebook_onpress }) => {
    return (
        <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={facebook_onpress}>
                <View style={Styles.btnBorder}>
                    <View style={Styles.btn_icon_holder}>
                        <Icon color="#4267B2" name="facebook-square" size={30} />
                    </View>
                    <View style={Styles.btn_text_holder}>
                        <Text style={Styles.brtn_text_content}>Sign up with facebook</Text>
                    </View>
                    <View style={Styles.btn_icon_holder}>
                        <Icon color="#000" name="right" size={30} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const BtnGoogleView = () => {
    return (
        <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={() => { alert("ypu press me") }}>
                <View style={Styles.btnBorder}>
                    <View style={Styles.btn_icon_holder}>
                        <Icon color="#4285F4" name="google" size={30} />
                    </View>
                    <View style={Styles.btn_text_holder}>
                        <Text style={Styles.brtn_text_content}>Sign up with Google</Text>
                    </View>
                    <View style={Styles.btn_icon_holder}>
                        <Icon color="#000" name="right" size={30} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const BtnLoginView = ({ funtions }) => {
    return (
        <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={funtions}>
                <View style={[Styles.btnBorder, { backgroundColor: '#EB1F25', borderWidth: 0 }]}>
                    <View style={Styles.btn_icon_holder}>
                        {/* <Icon color="#4285F4" name="google" size={30} /> */}
                    </View>
                    <View style={Styles.btn_text_holder_login}>
                        <Text style={Styles.brtn_text_content}>Login</Text>
                    </View>
                    <View style={Styles.btn_icon_holder}>
                        {/* <Icon color="#000" name="right" size={30} /> */}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const AuthScreen = () => {

    const { user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [uName, setUName] = useState("");
    const [uPass, setUPass] = useState("");
    const [show, setShow] = useState(false);
    const [showOk, setShowOk] = useState(false);
    const [modelTitel, setModelTitel] = useState("");
    const [modelMessage, setModelMessage] = useState("");

    //spiner contex
    const [spinerType, setSpinerType] = useState("ThreeBounce");
    const [spinerColour, setSpinerColour] = useState('red');
    const [spinerSize, setSpinerSize] = useState(100);
    const [spinerVisible, setSpinerVisible] = useState(false);

    function login() {

        var user = {
            "email": uName,
            "password": uPass
        };

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                //var response = Funtion_Auth(user);
                Funtion_Auth(user).then((response) => {
                    //alert("response " + JSON.stringify(response));
                    //
                    setSpinerVisible(true);
                    //setShow(true);
                    console.log("response " + JSON.stringify(response));
                    //Actions.authenticated();

                    if (response.code == '200') {
                        //sucessfully created
                        var dts = response.responce;
                        var us = {
                            "firstName": dts.data.firstName,
                            "lastName": dts.data.lastName,
                            "loginType": dts.data.loginType,
                            "email": uName,
                            "token": dts.token
                        }

                        dispatch(setUserInfo(us));

                        StoreUserInfo(us);

                        setModelTitel("Successfully");
                        setModelMessage("user auth sucess!");
                        setShowOk(true);
                        setSpinerVisible(false);

                        setTimeout(() => { Actions.authenticated(); }, 1000);
                        //need to set bear token to state and save in local


                    } else if (response.code == '400') {
                        // alredy on user
                        setModelTitel("Error");
                        setModelMessage("Form Validation error!");
                        setShow(true);
                        setSpinerVisible(false);
                        //alert("Alredy used this email, try again");
                    } else if (response.code == '401') {
                        setModelTitel("Error");
                        setModelMessage("Invalid Email Or Password!");
                        setShow(true);
                        setSpinerVisible(false);
                        //alert("Invalid Email Or Password");
                    } else if (response.code == '500') {
                        setModelTitel("Error");
                        setModelMessage("Something went wrong, try again later");
                        setShow(true);
                    }

                }).catch((error) => {
                    console.log("error " + JSON.stringify(error));
                });

            } else {
                alert("net not conntectd");
                //show error alert for not connect to internet
            }
        });
    }

    function validationForm() {
        if (uName != "") {
            if (uPass != "") {
                login();
            } else {
                //show alert for password error
                alert("please fill password");
            }
        } else {
            //show alert for username error
            alert("please fill user name");
        }
    }

    function facebookLogin() {
        NetInfo.fetch().then(state => {

            if (state.isConnected) {
                // var response = Funtion_FaceBook_Register();

            } else {
                //show error alert for not connect to internet
            }
        });
    }

    return (
        <View style={Styles.main}>
            <View style={[Styles.screenTitel, { marginTop: hp('1%'), marginBottom: hp('1.5%') }]}>
                <RulesTexts />
            </View>

            <View style={[Styles.screenTitel, { marginTop: hp('1%'), marginBottom: hp('1.5%') }]}>
                <FormView username={uName} passwords={uPass} updateUserName={setUName} updatePassowrd={setUPass} />
            </View>

            <View style={Styles.screenTitel}>
                <BtnFaceBookView facebook_onpress={() => { facebookLogin(); }} />
            </View>

            <BtnGoogleView />
            <View style={[Styles.screenTitel, { position: 'absolute', bottom: 0 }]}>
                <BtnLoginView funtions={() => { validationForm(); }} />
            </View>

            <AwesomeAlert
                show={show}
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
                    setShow(false);
                }}
                onConfirmPressed={() => {
                    setShow(false);
                }}
            />
            <AwesomeAlert
                show={showOk}
                showProgress={false}
                title={modelTitel}
                message={modelMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={false}
                cancelText="cancel"
                confirmText="Ok"
                confirmButtonColor="red" //#DD6B55
                onCancelPressed={() => {
                    setShowOk(false);
                }}
                onConfirmPressed={() => {
                    setShowOk(false);
                }}
            />

            {(spinerVisible) ?
                <View
                    style={{
                        flex: 1,
                        position: "absolute",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0.8,
                        width: wp("100%"),
                        height: hp("100%"),
                        backgroundColor: "#000000"
                    }}
                >

                    <View style={Styles.activityindicator_view}>
                        <ActivityIndicator animating size="large" color="#F5FCFF" />
                        <Text
                            style={{
                                color: "#000000"
                            }}
                        >
                            loading
                        </Text>
                    </View>
                </View>
                : null}

        </View>
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
    defulat_text: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.3,

    },
    text_holder: {
        width: wp('90%'),
        height: hp('7%'),
        justifyContent: 'center',
    },
    hiyperlink_text: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#EB1F25',
        textDecorationLine: 'underline'
    },
    textContainer: {
        width: wp('100%'),
        height: hp('10%'),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',

    },
    textRow: {
        width: wp('90%'),
        flexDirection: 'row'
    },
    inputContainer: {
        width: wp('100%'),
        height: hp('25%'),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
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
    textRow_for: {
        marginTop: 5,
        paddingTop: 8,
        width: wp('90%'),
    },
    btnPallet: {

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
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 16,
        color: '#000'
    },
    screenTitel: {
        marginTop: hp('3%'),
        marginBottom: hp('3%'),
    },
    spinerStyle: {
        flex: 1,
        width: wp('100%'),
        height: hp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#AF000000', //#0000ffff #d35400
        position: 'absolute',
        top: 0,

    },
    activityindicator_view: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 100,
        opacity: 1,
        borderRadius: 20
    }
});


export default AuthScreen;
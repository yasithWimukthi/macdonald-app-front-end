import React, { PropTypes, Component, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator, Linking, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

//import {Funtion_Auth,Funtion_FaceBook_Register} from '../../assert/networks/api_calls';
import NetInfo from "@react-native-community/netinfo";
import { Funtion_Auth, Funtion_FaceBook_Register, Funtion_Google_Register } from '../../assert/networks/api_calls';
import AwesomeAlert from 'react-native-awesome-alerts';

import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/actions';

import { StoreUserInfo } from '../../assert/storeage/data_store';

const SOKCET_SERVER_ADDRESS = "http://cafeappapi-env.eba-5w53m5sm.eu-west-2.elasticbeanstalk.com";
import GET_TOKEN from '../../assert/networks/dataAccess';

import PushNotification, { Importance } from 'react-native-push-notification';
import { io, Socket } from 'socket.io-client';

import RefundPayement from '../../componet/refundPayemnt';

import SafeAreaView from 'react-native-safe-area-view';
import { body } from 'koa/lib/response';

//import Feching_Loader from '../../componet/FetchLoader';

import { InAppBrowser } from 'react-native-inappbrowser-reborn'


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


const BtnFaceBookView = ({ setSpinerVisible }) => {

    function facebookLogin() {
        NetInfo.fetch().then(state => {

            if (state.isConnected) {
                // var response = Funtion_FaceBook_Register();
                //social
                setSpinerVisible(true);
                Funtion_FaceBook_Register().then((response) => {
                    //check fetching
                    setSpinerVisible(false);
                    var htmlView = response.responce;
                    Actions.social({ "webViews": htmlView });
                }).catch((err) => {
                    setSpinerVisible(false);
                    console.log("error happen when facebook register" + err);
                });

            } else {
                //show error alert for not connect to internet
            }
        });
    }

    return (
        <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={() => { facebookLogin(); }}>
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

const BtnGoogleView = ({ setSpinerVisible }) => {

    function googleLogin() {
        //alert("calling");
        // console.log("calling google");
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                // var response = Funtion_FaceBook_Register();
                //social
                //Actions.social();
                setSpinerVisible(true);
                Funtion_Google_Register().then((response) => {
                    //check fetching
                    setSpinerVisible(false);
                    var htmlView = response.responce;
                    Actions.social({ "webViews": htmlView });
                }).catch((err) => {
                    setSpinerVisible(false);
                    console.log("error happen when google register" + err);
                });

            } else {
                //show error alert for not connect to internet
            }
        });
    }

    const handleOpenURL = async ({ url }) => {
        //const { nativeEvent } = syntheticEvent;
        console.log("end " + url);
    };

    const getDeepLink = (path = '') => {
        const scheme = 'https';
        const prefix =
            Platform.OS === 'android' ? `${scheme}://api.relaksradiocafe.com` : `${scheme}://`;
        console.log("paths " + path);
        return prefix + path;
    };

    useEffect(() => {
        // Your code here
        Linking.addEventListener('url', handleOpenURL);
    }, []);

    const sleep = (timeout = 100) =>
        new Promise(resolve => setTimeout(resolve, timeout));

    async function callingVies() {

        // try {
        //     const loginUrl = 'https://api.relaksradiocafe.com/api/v1/auth/google';
        //     var dpLink = getDeepLink('/api/v1/auth/google/success');
        //     const url = `${loginUrl}?redirect_url=${encodeURIComponent(dpLink)}`;
        //     const result = await InAppBrowser.openAuth(loginUrl, dpLink, {
        //         // iOS Properties
        //         ephemeralWebSession: false,
        //         // Android Properties
        //         showTitle: false,
        //         enableUrlBarHiding: true,
        //         enableDefaultShare: false,
        //       });
        //       await sleep(800);
        //       console.log("response "+JSON.stringify(result));
        // } catch (error) {
        //     console.log("error "+error);
        // }
        const loginUrl = 'https://api.relaksradiocafe.com/api/v1/auth/google';
        //const redirectUrl = 'relaks_cafe://auth'
        const urlInApp = `${loginUrl}`;
        try {
            if (await InAppBrowser.isAvailable()) {
                const result = await InAppBrowser.openAuth(urlInApp);
                console.log(result);

            } else {
                alert('Not supported :/');
            }
        } catch (error) {
            console.error(error);
            alert('Something’s wrong with the app :(');
        }
    }

    return (
        <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={() => {
                //Linking.openURL('https://api.relaksradiocafe.com/api/v1/auth/google'); 
                //googleLogin();
                callingVies();
                // var dpLink = getDeepLink('/api/v1/auth/google/success');
                // InAppBrowser.openAuth(`https://api.relaksradiocafe.com/api/v1/auth/google?redirect_uri=${dpLink}`,dpLink, {
                //     // iOS Properties
                //     ephemeralWebSession: false,
                //     // Android Properties
                //     showTitle: false,
                //     enableUrlBarHiding: true,
                //     enableDefaultShare: false
                // }).then((response) => {
                //     console.log("response " + JSON.stringify(response));
                //     InAppBrowser.closeAuth();
                // }).catch((err)=>{
                //     console.log("error happe google auth "+err);
                // })
                // ;

            }}>
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

    const [tokens, setTokens] = useState(""); //GET_TOKEN


    function login() {

        var users = {
            "email": uName,
            "password": uPass
        };

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                setSpinerVisible(true);
                Funtion_Auth(users).then((response) => {
                    console.log("response " + JSON.stringify(response));

                    if (response.code == '200') {
                        //sucessfully created
                        var dts = response.responce;
                        var us = {
                            "ids": "0",
                            "firstName": dts.data.firstName,
                            "lastName": dts.data.lastName,
                            "loginType": dts.data.loginType,
                            "email": uName,
                            "token": dts.token,
                            "mobile": dts.data.mobile,
                        }

                        setTokens(dts.token);

                        dispatch(setUserInfo(us));

                        StoreUserInfo(us);

                        setModelTitel("Successfully");
                        setModelMessage("user auth sucess!");
                        setSpinerVisible(false);
                        setShowOk(true);


                        setTimeout(() => { Actions.authenticated(); }, 1000);
                        //need to set bear token to state and save in local


                    } else if (response.code == '400') {
                        // alredy on user
                        setModelTitel("Error");
                        setModelMessage("Form Validation error!");
                        setSpinerVisible(false);
                        setShow(true);

                    } else if (response.code == '401') {
                        setModelTitel("Error");
                        setModelMessage("Invalid Email Or Password!");
                        setSpinerVisible(false);
                        setShow(true);

                    } else if (response.code == '500') {
                        setModelTitel("Error");
                        setModelMessage("Something went wrong, try again later");
                        spinerVisible(false);
                        setShow(true);

                    }

                }).catch((error) => {
                    console.log("error " + JSON.stringify(error));
                    spinerVisible(false);
                });

            } else {
                // alert("net not conntectd");
                //show error alert for not connect to internet
                setModelTitel("Error");
                setModelMessage("Please check your device internet connection");
                setShow(true);
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






    useEffect(() => {
        const SOCKETS = io(SOKCET_SERVER_ADDRESS, {
            auth: {
                //token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpbmVzaG1hZHVzaGFua2Fnc3MyMDE1QGdtYWlsLmNvbSIsImlhdCI6MTY1NTIwMDk3MSwiZXhwIjoxNjU1ODA1NzcxfQ.UaCqLjffAg9PNBuWRFk8T9HtSkQcEOtvjXntRzb_LcM'
                token: tokens,
            }
        });

        SOCKETS.on('connect', (response) => {
            console.log("connect " + SOCKETS.id);
        });
        SOCKETS.on('order-status', (response) => {
            console.log('message :' + JSON.stringify(response));
            //{"data":"Your order has been accepted"}
            //{"data":"Your order has been cancelled","refId":"12332322332333"}
            var rep = JSON.stringify(response);
            console.log("pass " + response.data);

            if (response.data == "Your order has been accepted") {
                // sucess
                //showAppPushNotification("Oder Accepted", response.data, "accept", "0", "order");
                showAppPushNotification("Oder Accepted", "your order is accepted successfully.", "accept", "0", "order");
            } else {
                //cancel
                //showAppPushNotification("Oder Cancelled", response.data, "cancel", response.refId, "order");
                showAppPushNotification("Oder Cancelled", "Your order has been canceled, Thanks for connecting with relaks radio cafe.", "cancel", response.refId, "order");
                RefundPayement(response.refId).then((response) => {

                    console.log("resposne refund " + JSON.stringify(response))

                    if (response.status == "succeeded") {
                        console.log("refund sucess");
                    } else {
                        console.log("refund failed");
                    }
                }).catch((error) => {
                    console.log("error happen when create fefund " + error);
                });
            }
        });
        SOCKETS.on('table-reserve', (response) => {
            console.log("socket is on " + SOCKETS.id);
            console.log('message: ' + response);

            //showAppPushNotification("Tabel Reservation Cancel", "your tabel reservation has been cancel", "accept", "0", "tabel");
            showAppPushNotification("Tabel Reservation Canceled", "Your tabel reservation is canceled, Thanks for connecting with relaks redio cafe", "accept", "0", "tabel");

        });
    }, [tokens]);


    function showAppPushNotification(titel, message, status, ref, type) {

        console.log("calling push notification " + titel + " " + message);

        PushNotification.localNotification({
            /* Android Only Properties */
            channelId: "1995", // (required) channelId, if the channel doesn't exist, notification will not trigger.
            ticker: "Relaks Notification Ticker", // (optional)
            showWhen: true, // (optional) default: true
            autoCancel: true, // (optional) default: true
            largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
            largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
            smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
            bigText: message, // (optional) default: "message" prop
            subText: "Order Status", // (optional) default: none
            bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
            bigLargeIcon: "ic_launcher", // (optional) default: undefined
            bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
            color: "red", // (optional) default: system default
            vibrate: false, // (optional) default: true
            vibration: 0, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            priority: "default", // (optional) set notification priority, default: high
            visibility: "private", // (optional) set notification visibility, default: private
            ignoreInForeground: false,// (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
            onlyAlertOnce: true, // (optional) alert will open only once with sound and notify, default: false

            when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
            usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
            timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

            actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
            invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

            /* iOS only properties */
            category: "Relakas", // (optional) default: empty string
            subtitle: "My Order", // (optional) smaller title below notification title

            /* iOS and Android properties */
            id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            title: titel, // (optional)
            message: message, // (required)
            picture: "https://www.example.tld/picture.jpg", // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
            userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
            playSound: true, // (optional) default: true
            soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            //number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
            repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info. 
            repeatTime: 1,
            data: {
                "status": status,
                "ref": ref,
                "type": type
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
                <BtnFaceBookView setSpinerVisible={setSpinerVisible} />
            </View>

            <View>
                <BtnGoogleView setSpinerVisible={setSpinerVisible} />
            </View>

            <View style={[Styles.screenTitel, { height: hp('4%') }]}>

            </View>

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
            {/* <Feching_Loader/> */}
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
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        //zIndex:1
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
                // <Feching_Loader/>
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
        //alignItems: 'center',
        height: hp("100%"),
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
        borderBottomWidth: 1,
        fontFamily: 'NexaTextDemo-Light',
        color: '#000'
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
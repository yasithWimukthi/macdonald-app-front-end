import React, { PropTypes, Component, useState } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

//import {Funtion_Auth,Funtion_FaceBook_Register} from '../../assert/networks/api_calls';
import NetInfo from "@react-native-community/netinfo";
import { Funtion_Auth } from '../../assert/networks/api_calls';



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

    return (
        <View style={Styles.inputContainer}>
            <View style={Styles.input_holder}>
                <View style={Styles.inputContainer_Row}>
                    <TextInput placeholder='Email' value={userName} onChangeText={(values) => { setUserName(values); updateUserName(values) }} placeholderTextColor="#000" style={Styles.defulatTextInput} />
                </View>
                <View style={Styles.inputContainer_Row_icon}>
                    <View style={Styles.subinputContainer}>
                        <TextInput
                            style={Styles.defulatTextInput}
                            secureTextEntry={true}
                            placeholder='Password'
                            value={password}
                            onChangeText={(values) => { setPassword(values); updatePassowrd(values) }}
                            placeholderTextColor="#000"
                        />
                        <Icons style={Styles.icon} color="#000" name="eye-off" size={20} />
                    </View>
                </View>
                <View style={Styles.textRow_for}>
                    <Text style={Styles.hiyperlink_text}>Forget Password</Text>
                </View>
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
                <View style={[Styles.btnBorder, { backgroundColor: 'yellow', borderWidth: 0 }]}>
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

    const [uName, setUName] = useState("");
    const [uPass, setUPass] = useState("");

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
                    console.log("response " + JSON.stringify(response));
                     Actions.authenticated();
                    
                    if (response.status == '201') {
                        //sucessfully created
                        Actions.authenticated();
                    } else if (response.status == '409') {
                        // alredy on user
                        alert("Alredy used this email, try again");
                    } else if (response.status == '400') {
                        // request body validation
                        alert("Form Validation error");
                    }else if (response.status == '401'){
                        alert("Invalid Email Or Password");
                    }
                    
                }).catch((error) => {
                    console.log("error " + JSON.stringify(error));
                });


                // if(response.status == '201'){
                //     //sucessfully created
                // }else if (response.status == '409'){
                //     // alredy on user
                // }else if (response.status == '400') {
                //     // request body validation
                // }

                // Actions.authenticated();

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

                // if(response.status == '201'){
                //     //sucessfully created
                // }else if (response.status == '409'){
                //     // alredy on user
                // }else if (response.status == '400') {
                //     // request body validation
                // }

                //  Actions.authenticated();

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

        </View>
    );
}

// class authscreen extends Component {

//     constructor(props) {
//         super(props);
//     }

//     render() {

//         return (

//         );
//     }
// }

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
    }
});


export default AuthScreen;
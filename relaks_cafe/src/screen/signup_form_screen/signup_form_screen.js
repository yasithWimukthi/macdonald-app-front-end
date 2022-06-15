import React, { PropTypes, Component, useState } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Feather';
import { Checkbox } from 'native-base';

import { Funtion_Register } from '../../assert/networks/api_calls';
import NetInfo from "@react-native-community/netinfo";
import AwesomeAlert from 'react-native-awesome-alerts';

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


const FirstFormContent = ({ fname, lname, mail, pass, repass, postal_code, mobile, updateMobile, updateFname, updateLname, updateEmail, updatePass, updateRePass, updatePostalCode }) => {

    const [uFName, setUFName] = useState(fname);
    const [uLName, setULName] = useState(lname);
    const [uEmail, setUEmail] = useState(mail);
    const [uPassword, setUPassword] = useState(pass);
    const [uRePassword, setURePassword] = useState(repass);
    const [uPostal, setUPostal] = useState(postal_code);
    const [uContact, setUContact] = useState(mobile);

    const [viewPass, setViewPass] = useState(true);
    const [viewRePass, setReViewPass] = useState(true);

    return (
        <View style={Styles.frist_form_container}>
            <View style={Styles.input_holder}>
                <View style={Styles.inputContainer_Row}>
                    <TextInput placeholder='*Frist Name' onChangeText={(values) => { setUFName(values); updateFname(values); }} value={uFName} placeholderTextColor="#000" style={Styles.defulatTextInput} />
                </View>
                <View style={Styles.inputContainer_Row}>
                    <TextInput placeholder='*Last Name' onChangeText={(values) => { setULName(values); updateLname(values); }} value={uLName} placeholderTextColor="#000" style={Styles.defulatTextInput} />
                </View>
                <View style={Styles.inputContainer_Row}>
                    <TextInput placeholder='*Email' keyboardType='email-address' onChangeText={(values) => { setUEmail(values); updateEmail(values); }} value={uEmail} placeholderTextColor="#000" style={Styles.defulatTextInput} />
                </View>
                <View style={Styles.inputContainer_Row}>
                    <TextInput placeholder='*Mobile Number' keyboardType='numeric' maxLength={13} onChangeText={(values) => { setUContact(values); updateMobile(values); }} value={uContact} placeholderTextColor="#000" style={Styles.defulatTextInput} />
                </View>
                <View style={Styles.inputContainer_Row_icon}>
                    <View style={Styles.subinputContainer}>
                        <TextInput
                            style={Styles.defulatTextInput}
                            placeholder='*Password'
                            secureTextEntry={viewPass}
                            placeholderTextColor="#000"
                            onChangeText={(values) => { setUPassword(values); updatePass(values); }}
                            value={uPassword}
                        />
                        <View style={Styles.icon}>
                            <TouchableOpacity onPress={() => { setViewPass(!viewPass) }}>
                                <Icons color="#000" name={(viewPass) ? "eye-off" : "eye"} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={Styles.textRow_for_content}>
                    <View style={[Styles.instutionTitelContainer, { height: hp('6%') }]}>
                        <Text style={Styles.insturtionTitel}>Plase ensure you use a unique password and change it frequently</Text>
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
                            secureTextEntry={viewRePass}
                            placeholder='*Confirm Password'
                            placeholderTextColor="#000"
                            onChangeText={(values) => { setURePassword(values); updateRePass(values); }}
                            value={uRePassword}
                        />

                        <View style={Styles.icon}>
                            <TouchableOpacity onPress={() => { setReViewPass(!viewRePass) }}>
                                <Icons color="#000" name={(viewRePass) ? "eye-off" : "eye"} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={[Styles.inputContainer_Row, { height: hp('6%') }]}>
                    <TextInput placeholder='*Postalcode (incl. space)' onChangeText={(values) => { setUPostal(values); updatePostalCode(values); }} value={uPostal} placeholderTextColor="#000" style={Styles.defulatTextInput} />
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

const TermsAndCondition = ({ driving_condtion, age_condition, updateDrivingCondtion, updateAgeCondtion }) => {

    const [drivingCondition, setDrivingCondition] = useState(driving_condtion);
    const [ageCondition, setAgeCondition] = useState(age_condition);

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
                        {/* <Checkbox size="md" value={drivingCondition} onChange={(value)=>{setDrivingCondition(value); updateDrivingCondtion(value);}} accessibilityLabel="" /> */}
                    </View>
                    <View style={Styles.termsAnsCondCheckBox_text_holder}>
                        <Text style={Styles.preferCheckBox_text_content}>*I agree not to use the app while driving  {"\n"} or older.</Text>
                    </View>

                </View>
                <View style={Styles.termsAnsCondCheckBoxHolder}>
                    <View style={Styles.termsAnsCondCheckBox_icon_holder}>
                        {/* <Checkbox size="md" value={ageCondition} onChange={(value)=>{setAgeCondition(value); updateAgeCondtion(value);}} accessibilityLabel="" /> */}
                    </View>
                    <View style={Styles.termsAnsCondCheckBox_text_holder}>
                        <Text style={Styles.preferCheckBox_text_content}>*I confirm I am 18 year old or older than and {"\n"} I agree with Relaks.</Text>
                        <View style={{ flexDirection: 'row' }}>
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


const BtnLoginView = ({ onpress_funtion }) => {
    return (
        <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={onpress_funtion}>
                <View style={[Styles.btnBorder, { backgroundColor: '#EB1F25', borderWidth: 0 }]}>
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

    const [user_Fname, setUserFname] = useState("");
    const [user_Lname, setUserLname] = useState("");
    const [user_Email, setUserEmail] = useState("");
    const [user_Password, setUserPassword] = useState("");
    const [user_RePassword, setUserRePassword] = useState("");
    const [user_PostalCode, setUserPostalCode] = useState("");
    const [user_Contact, setUserContact] = useState("");
    const [driving, setDriving] = useState(true);
    const [age, setAge] = useState(true);


    const [show, setShow] = useState(false);
    const [showRE, setShowRE] = useState(false);
    const [modelTitel, setModelTitel] = useState("");
    const [modelMessage, setModelMessage] = useState("");





    function registerUser() {


        var user = {
            "f_name": user_Fname,
            "l_name": user_Lname,
            "email": user_Email,
            "password": user_Password,
            "contact": user_Contact,
            "postal": user_PostalCode
        }

        console.log("user create " + JSON.stringify(user));

        NetInfo.fetch().then(state => {

            if (state.isConnected) {
                Funtion_Register(user).then((response) => {
                    // alert("response " + JSON.stringify(response));
                    console.log("response " + JSON.stringify(response));
                    //Actions.auth();
                    if (response.code == '201') {
                        //sucessfully created
                        setModelTitel("Successfully");
                        setModelMessage("user registered sucess!");
                        setShow(true);
                        Actions.auth();
                    } else if (response.code == '409') {
                        // alredy on user
                        setModelTitel("Error");
                        setModelMessage("Alredy used this email or mobile number, try again");
                        setShow(true);
                        ///alert("Alredy used this email, try again");
                    } else if (response.code == '400') {
                        // alert("Form Validation error");
                        setModelTitel("Error");
                        setModelMessage("Form Validation error");
                        setShow(true);
                        // request body validation
                    } else if (response.code == '500') {
                        setModelTitel("Error");
                        setModelMessage("Something went wrong, try again later");
                        setShow(true);
                    }
                }).catch((error) => {
                    console.log("error " + JSON.stringify(error));
                });


            } else {
                //show error alert for not connect to internet
                setModelTitel("Error");
                setModelMessage("Please check your device connection");
                setShow(true);
            }
        });
    }

    function validateForm() {
        if (user_Fname != null || user_Fname != "") {
            if (user_Lname != null || user_Lname != "") {
                if (user_Email != null || user_Email != "") {
                    if (user_Password != null || user_Password != "") {
                        if (user_RePassword != null || user_RePassword != "") {
                            if (user_Password == user_RePassword) {
                                if (user_PostalCode != null || user_PostalCode != "") {
                                    if (user_Contact != null || user_Contact != "") {
                                        const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                                        var validate = !(!user_Contact || regex.test(user_Contact) === false);
                                        if (validate) {
                                            registerUser();
                                        } else {
                                            // not valida uk number
                                            setModelTitel("Error");
                                            setModelMessage("Please enter valid uk mobile number");
                                            setShowRE(true);
                                        }

                                    } else {
                                        setModelTitel("Error");
                                        setModelMessage("Please enter mobile number");
                                        setShowRE(true);
                                    }
                                } else {
                                    //show alert for error user postal code
                                   // alert("fill user postal code");
                                    setModelTitel("Error");
                                    setModelMessage("Please enter postal code");
                                    setShowRE(true);
                                }
                            } else {
                                //show alert for error password not match
                                //alert("password not match");
                                setModelTitel("Error");
                                setModelMessage("password not match, plase try again");
                                setShowRE(true);
                            }
                        } else {
                            //show alert for error user repass
                           // alert("fill user re enter password");
                            setModelTitel("Error");
                            setModelMessage("Please re-enter password");
                            setShowRE(true);
                        }
                    } else {
                        //show alert for error user password
                        //alert("fill user passsword");
                        setModelTitel("Error");
                        setModelMessage("Please enter password ");
                        setShowRE(true);
                    }
                } else {
                    //show alert for error user email
                    //alert("fill user email");
                    setModelTitel("Error");
                    setModelMessage("Please enter email address");
                    setShowRE(true);
                }
            } else {
                //show alert for error user lname
                //alert("fill user last name");
                setModelTitel("Error");
                setModelMessage("Please enter last name");
                setShowRE(true);
            }
        } else {
            //show alert for error user fname
            //alert("fill user frist name");
            setModelTitel("Error");
            setModelMessage("Please enter frist name");
            setShowRE(true);
        }
    }

    return (
        <View style={Styles.main}>
            <ScrollView>
                <TitelView />
                <FirstFormContent fname={user_Fname} updateFname={setUserFname} lname={user_Lname} updateLname={setUserLname} mail={user_Email} updateEmail={setUserEmail} pass={user_Password} updatePass={setUserPassword} repass={user_RePassword} updateRePass={setUserRePassword} postal_code={user_PostalCode} updatePostalCode={setUserPostalCode} mobile={user_Contact} updateMobile={setUserContact} />
                <PerferContent />

                <TermsAndCondition driving_condtion={driving} updateDrivingCondtion={setDriving} age_condition={age} updateAgeCondtion={setAge} />

                <BtnLoginView onpress_funtion={() => { validateForm(); }} />

            </ScrollView>
            <AwesomeAlert
                show={show}
                showProgress={false}
                title={modelTitel}
                message={modelMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
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
                show={showRE}
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
                    setShowRE(false);
                }}
                onConfirmPressed={() => {
                    setShowRE(false);
                }}
            />
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
        height: hp('90%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    input_holder: {
        width: wp('90%'),
        height: hp('88%'),
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
    hiyperlink_text: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#EB1F25',
        textDecorationLine: 'underline'
    },

});

export default signup_form_screen;

import React, { PropTypes, Component, useState } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import { Funtion_Update_Profile_Info } from '../../assert/networks/api_calls';
import AwesomeAlert from 'react-native-awesome-alerts';
import { setUserInfo } from '../../redux/actions';
import { StoreUserInfo } from '../../assert/storeage/data_store';
import { Actions } from 'react-native-router-flux';

const TitelView = () => {
    return (
        <View style={Styles.titelContainer}>
            <View style={Styles.titelHolder}>
                <View style={Styles.titelConte}>
                    <Text style={Styles.defulat_text}>Personal Setting</Text>
                </View>
            </View>
        </View>
    );
}

const RegisterTypeView = ({ type }) => {
    return (
        <View style={Styles.titelContainer}>
            <View style={Styles.titelHolder}>
                <View style={Styles.titelConte}>
                    {
                        (type == "email") ? <Icon color="#EB1F25" name="mail" size={30} /> : null
                    }
                    {
                        (type == "facebook") ? <Icon color="#4267B2" name="facebook-square" size={30} /> : null
                    }
                    {
                        (type == "google") ? <Icon color="#4285F4" name="googleplus" size={30} /> : null
                    }

                    {/* <Icon color="#4267B2" name="facebook-square" size={30} /> */}
                    <Text style={Styles.defulat_text_Info}>{"Register with " + type}</Text>
                </View>
            </View>
        </View>
    );
}
const NameView = ({ userName, editState, updateFName, updateLname }) => {
    return (
        <View style={Styles.titelContainer}>
            <View style={Styles.titelHolder}>
                {/* <View style={Styles.titelConte}> */}

                {
                    (editState) ?
                        <View style={[Styles.titelConte, { flexDirection: 'row', alignItems: 'center' }]}>
                            <View style={Styles.boxView}>
                                <TextInput style={[Styles.defulatTextInput, { width: wp('40%') }]} placeholderTextColor={"#000"} placeholder='Enter Frist Name' onChangeText={(text) => { updateFName(text) }} />
                            </View>
                            <View style={Styles.boxView}>
                                <TextInput style={[Styles.defulatTextInput, { width: wp('40%') }]} placeholderTextColor={"#000"} placeholder='Enter Last Name' onChangeText={(text) => { updateLname(text) }} />
                            </View>


                        </View>
                        :
                        <View style={Styles.titelConte}>
                            <Text style={Styles.defulat_text_label}>Name</Text>
                            <Text style={Styles.defulat_text_Info}>{userName}</Text>
                        </View>
                }

                {/* </View> */}
            </View>
        </View>
    );
}
const EmailView = ({ emails, editState, updateEmail }) => {
    return (
        <View style={Styles.titelContainer}>
            <View style={Styles.titelHolder}>
                <View style={Styles.titelConte}>
                    <Text style={Styles.defulat_text_label}>Email</Text>
                    <Text style={Styles.defulat_text_Info}>{emails}</Text>
                </View>
            </View>
        </View>
    );
}

const MobileViews = ({ mobileNumber, editState, updateMobile }) => {
    return (
        <View style={Styles.titelContainer}>
            <View style={Styles.titelHolder}>
                {
                    (editState) ?
                        <View style={Styles.titelConte}>
                            <TextInput style={Styles.defulatTextInput} placeholderTextColor={"#000"} placeholder='Enter Contact Number (+441111111111)' onChangeText={(text) => { updateMobile(text) }} />
                        </View>
                        :
                        <View style={Styles.titelConte}>
                            <Text style={Styles.defulat_text_label}>Mobile Number</Text>
                            <Text style={Styles.defulat_text_Info}>{mobileNumber}</Text>
                        </View>
                }
                {/* <View style={Styles.titelConte}>
                    
                    
                </View> */}
            </View>
        </View>
    );
}

const PasswordViews = ({ updatePassword }) => {
    return (
        <View style={Styles.titelContainer}>
            <View style={Styles.titelHolder}>
                <View style={Styles.titelConte}>
                    <Text style={Styles.defulat_text_label}>New Password</Text>
                    <TextInput style={Styles.defulatTextInput} placeholderTextColor={"#000"} placeholder='Enter your new password' onChangeText={(text) => { updatePassword(text) }} />
                </View>
            </View>
        </View>
    );
}

const BtnLoginView = ({ typeText, funtions }) => {
    return (
        <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={funtions}>
                <View style={[Styles.btnBorder, { backgroundColor: '#EB1F25', borderWidth: 0 }]}>
                    <View style={Styles.btn_icon_holder}>
                        {/* <Icon color="#4285F4" name="google" size={30} /> */}
                    </View>
                    <View style={Styles.btn_text_holder_login}>
                        <Text style={Styles.brtn_text_content}>{typeText}</Text>
                    </View>
                    <View style={Styles.btn_icon_holder}>
                        {/* <Icon color="#000" name="right" size={30} /> */}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const Personal_Setting_Screen = () => {

    const { user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [fristName, setFristName] = useState("");
    const [lnameName, setLastName] = useState("");
    const [emailAdd, setEmailAdd] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [password, setPassword] = useState("");
    const [enableEdit, setEnableEdit] = useState(false);

    const [show, setShow] = useState(false);
    const [modelTitel, setModelTitel] = useState("");
    const [modelMessage, setModelMessage] = useState("");

    function updateProfile() {

        var updateObj = null;

        if (fristName != null && fristName != "") {
            updateObj = {
                "firstName": fristName,
                "lastName": lnameName,
            }
        }

        if (contactNumber != null && contactNumber != "") {
            updateObj.mobile = contactNumber;
        }

        if (password != null && password != "") {
            updateObj.password = password
        }

        if (updateObj != null) {
            sendDataToServer(updateObj);
            setEnableEdit(false);
        } else {
            setEnableEdit(false);
        }


    }

    function enableEditinfo() {
        setEnableEdit(true);
    }


    function sendDataToServer(pramObj) {
        //alert("send obj " + JSON.stringify(pramObj));
        Funtion_Update_Profile_Info(pramObj, user.token).then((response) => {
            console.log("response " + JSON.stringify(response));
            if (response.code == "200") {
                //User update sucessfully


                //update user obj
                var dts = response.responce;
                var us = {
                    "ids": dts.data.id,
                    "firstName": dts.data.firstName,
                    "lastName": dts.data.lastName,
                    "loginType": dts.data.loginType,
                    "email": user.email,
                    "token": user.token,
                    "mobile": dts.data.mobile
                }

                console.log("update info " + JSON.stringify(us));

                dispatch(setUserInfo(us));

                StoreUserInfo(us);

                setModelTitel("SuccessFully");
                setModelMessage("User update successfully");
                setShow(true);

                Actions.pop();

            } else if (response.code == "400") {
                //Request body validation failed
                setModelTitel("Error");
                setModelMessage("Request body validation failed");
                setShow(true);
            } else if (response.code == "401") {
                //Authentication failed
                setModelTitel("Error");
                setModelMessage("Authentication failed");
                setShow(true);
            } else if (response.code == "403") {
                //No access rights
                setModelTitel("Error");
                setModelMessage("No access rights");
                setShow(true);
            } else if (response.code == "409") {
                //User exist with same mobile
                setModelTitel("Error");
                setModelMessage("User exist with same mobile. please try another");
                setShow(true);
            }
        }).catch((error) => {
            console.log("error happen when profile update " + error);
        });
    }

    return (
        <View style={Styles.main}>
            <ScrollView>
                <TitelView />
                <RegisterTypeView type={user.loginType} />
                <NameView userName={user.firstName + " " + user.lastName} editState={enableEdit} updateFName={setFristName} updateLname={setLastName} />
                <EmailView emails={user.email} editState={enableEdit} updateEmail={setEmailAdd} />
                <MobileViews mobileNumber={user.mobile} editState={enableEdit} updateMobile={setContactNumber} />

                {
                    (enableEdit) ? <PasswordViews updatePassword={setPassword} /> : null
                }


            </ScrollView>
            <View style={Styles.screenTitel}>
                <BtnLoginView typeText={(enableEdit) ? "Update Profile" : "Edit Profile"} funtions={() => { (enableEdit) ? updateProfile() : enableEditinfo() }} />
            </View>
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
    titelContainer: {
        width: wp('100%'),
        height: hp('15%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#c0c0c0'
    },
    titelHolder: {
        width: wp('90%'),
        height: hp('12%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    titelConte: {
        width: wp('90%'),
        height: hp('10%'),
        justifyContent: 'center'
    },
    defulat_text: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 21,
        color: '#000',
        letterSpacing: 0.3,

    },
    defulat_text_label: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 15,
        color: '#000',
        letterSpacing: 0.3,

    },
    defulat_text_Info: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 15,
        color: '#000',
        letterSpacing: 0.3,

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
        position: 'absolute',
        bottom: 0
    },
    defulatTextInput: {
        width: wp('90%'),
        height: 40,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        fontFamily: 'NexaTextDemo-Light',
        color: '#000'
    },
    boxView: {
        width: wp('45%'),
        alignItems: 'center',
        justifyContent: 'center'
    }

});


export default Personal_Setting_Screen;
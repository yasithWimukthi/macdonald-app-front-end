import React, { PropTypes, Component, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity,ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import {Funtion_FaceBook_Register, Funtion_Google_Register} from '../../assert/networks/api_calls';

import SafeAreaView from 'react-native-safe-area-view';

const BtnEmailView = () => {
    return (
        <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={()=>{Actions.Register();}}>
                <View style={Styles.btnBorder}>
                    <View style={Styles.btn_icon_holder}>
                        <Icon color="#000" name="mail" size={30} />
                    </View>
                    <View style={Styles.btn_text_holder}>
                        <Text style={Styles.brtn_text_content}>Register with email</Text>
                    </View>
                    <View style={Styles.btn_icon_holder}>
                        <Icon color="#000" name="right" size={30} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const BtnFaceBookView = ({setSpinerVisible}) => {

    function regFacebook (){
        setSpinerVisible(true);
        Funtion_FaceBook_Register().then((response)=>{
            setSpinerVisible(false);
            Actions.social({"webViews" : response.responce});
        }).catch((error)=>{
            setSpinerVisible(false);
            console.log("error happen when fb register "+error);
        })
    }

    return (
        <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={()=>{regFacebook();}}>
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

const BtnGoogleView = ({setSpinerVisible}) => {

    function registerGooogle(){
        try {
            setSpinerVisible(true);
            Funtion_Google_Register().then((response)=>{
                setSpinerVisible(false);
                Actions.social({"webViews" : response.responce});
            }).catch((err)=>{
                setSpinerVisible(false);
                console.log("error happen register google "+err);
            });
        } catch (error) {
            console.log("error "+error);
        }
    }

    return (
        <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={()=>{ registerGooogle(); }}>
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

const TitelTextContent = () => {
    return(
        <View style={Styles.titelTextContainer}>
            <View style={Styles.titelTextHolder}>
                <Text style={Styles.titel_text_content}>Register to  place oders, save your favorite resturent or {"\n"} meals, have access to deals and so much more ...</Text>
            </View>
        </View>
    );
}

const LineSpliter = () => {
    return(
        <View style={Styles.lineSpliterContainer}>
            <View style={Styles.lineSpliterHoder}>
                <View style={Styles.lineSpliter_line}/>
                <Text style={Styles.lineSpliter_text_content}> or </Text>
                <View style={Styles.lineSpliter_line}/>
            </View>
        </View>
    )
}


const SignupScreen = () => {

    const [spinerVisible, setSpinerVisible] = useState(false);

    return (
        <View style={Styles.main}>

            <View style={Styles.screenTitel}>
                <TitelTextContent/>
            </View>
            
            <View style={Styles.screenTitel}>
                <BtnEmailView />
            </View>
            
            <LineSpliter/>


            <View style={Styles.screenTitel}>
                <BtnFaceBookView setSpinerVisible={setSpinerVisible}/>
            </View>

            
            <BtnGoogleView setSpinerVisible={setSpinerVisible}/>

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
        //backgroundColor: "red",
        //flexDirection: 'row',
        alignContent: 'center',
        //alignItems: 'center'

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
    brtn_text_content : {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 16,
        color: '#000'
    },
    titelTextContainer : {
        width: wp('100%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    titelTextHolder : {
        width: wp('90%'),
        //height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    titel_text_content : {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 13,
        color: '#000',
        letterSpacing : 0.25,
    },
    lineSpliterContainer : {
        width: wp('100%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    lineSpliterHoder : {
        width: wp('40%'),
        height: hp('3%'),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    lineSpliter_line : {
        width:wp('10%'),
        borderBottomColor: '#000',
        borderBottomWidth: 1,
    },
    lineSpliter_text_content : {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 16,
        color: '#000',
        //letterSpacing : 0.25,
    },
    screenTitel : {
        marginTop : hp('3%'),
        marginBottom : hp('3%'),
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


export default SignupScreen;
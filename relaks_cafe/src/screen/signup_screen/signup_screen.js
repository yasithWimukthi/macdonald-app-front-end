import React, { PropTypes, Component, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity,ActivityIndicator,Linking,Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import {Funtion_FaceBook_Register, Funtion_Google_Register} from '../../assert/networks/api_calls';

import SafeAreaView from 'react-native-safe-area-view';

import { InAppBrowser } from 'react-native-inappbrowser-reborn';

import {FONT_BOLD,FONT_LIGHT} from '../../assert/key/key';

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

const BtnGoogleView = ({setSpinerVisible, setModelTitel, setModelMessage, setShowOk, setShow}) => {


    const handleOpenURL = async ({ url }) => {
        console.log("end " + url);

       // Actions.auth();
    };

    useEffect(() => {
        // Your code here
        Linking.addEventListener('url', handleOpenURL);
    }, []);

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

    const getDeepLink = (path = '') => {
        const scheme = 'relakscafe';
        // const prefix =
        //     Platform.OS === 'android' ? `${scheme}://demo/` : `${scheme}://`;
        const prefix =
             Platform.OS === 'android' ? `${scheme}://demo/` : `${scheme}://`;
        console.log("paths " + prefix + path);
        return prefix + path;
    };

    async function callingVies() {

        const browserConfig = {
            // iOS Properties
            dismissButtonStyle: 'cancel',
            preferredBarTintColor: '#453AA4',
            preferredControlTintColor: 'white',
            readerMode: false,
            animated: true,
            modalPresentationStyle: 'overFullScreen',
            modalTransitionStyle: 'partialCurl',
            modalEnabled: true,
            // Android Properties
            showTitle: false,
            toolbarColor: '#f2f2f2',
            secondaryToolbarColor: 'white',
            enableUrlBarHiding: true,
            enableDefaultShare: false,
            forceCloseOnRedirection: false,
            // Specify full animation resource identifier(package:anim/name)
            // or only resource name(in case of animation bundled with app).
            animations: {
              startEnter: 'slide_in_right',
              startExit: 'slide_out_left',
              endEnter: 'slide_in_left',
              endExit: 'slide_out_right',
            },
            waitForRedirectDelay: true ? 1000 : 0,
          };

        const loginUrl = 'https://api.relaksradiocafe.com/api/v1/auth/google/'; //https://chootyputha.github.io/webpages_checks/
        const redirectUrl = getDeepLink();
        const urlInApp = `${loginUrl}?redirect_url=${encodeURIComponent(redirectUrl)}`;
        console.log("url "+urlInApp);
        try {
            if (await InAppBrowser.isAvailable()) {
                const result = await InAppBrowser.openAuth(urlInApp,redirectUrl,browserConfig);
                if (result.type == 'success'  ) {
                    setModelTitel("Successfully");
                    setModelMessage("user google signup sucess!");
                    setSpinerVisible(false);
                    setShowOk(true);

                    setTimeout(() => { Actions.auth(); }, 1000);

                } else {
                    setSpinerVisible(false);
                    if(Platform.OS === 'android'){
                        //setModelTitel("Error");
                        //setModelMessage("Something went wrong, try again later ssss");
                        //setShow(false);
                    }else{
                        setModelTitel("Error");
                        setModelMessage("Something went wrong, try again later ssss");
                        setShow(true);
                    }
                    
                }
            } else {
                alert('Not supported :/');
            }
        } catch (error) {
            console.error(error);
            //alert('Something’s wrong with the app :(');
        }
    }

    return (
        <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={()=>{ callingVies(); }}>
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
    const [show, setShow] = useState(false);
    const [showOk, setShowOk] = useState(false);
    const [modelTitel, setModelTitel] = useState("");
    const [modelMessage, setModelMessage] = useState("");

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

            
            <BtnGoogleView setSpinerVisible={setSpinerVisible} setModelMessage={setModelMessage} setModelTitel={setModelTitel} setShow={setShow} setShowOk={setShowOk}/>

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
        fontFamily: FONT_BOLD, // 'NexaTextDemo-Bold',
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
        fontFamily: FONT_LIGHT, // 'NexaTextDemo-Light',
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
        fontFamily: FONT_LIGHT, // 'NexaTextDemo-Light',
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
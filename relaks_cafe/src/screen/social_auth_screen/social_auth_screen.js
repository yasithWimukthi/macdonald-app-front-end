import React, { PropTypes, Component, useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { WebView } from 'react-native-webview';

import NetInfo from "@react-native-community/netinfo";

import DeviceInfo from 'react-native-device-info';
import { Actions } from 'react-native-router-flux';
import AwesomeAlert from 'react-native-awesome-alerts';

const Social_Auth_Screen = ({ ...props }) => {

    const [responseView, setResponseView] = useState(props.webViews);
    const [agentInfo, setAgentInfo] = useState();
    const [showOk, setShowOk] = useState(false);
    const [modelTitel, setModelTitel] = useState("");
    const [modelMessage, setModelMessage] = useState("");

    useEffect(() => {
        console.log("parm " + props.webViews);
        getDevicseData();
    });

    async function getDevicseData() {
        var info = await DeviceInfo.getUserAgent();
        setAgentInfo(info);
        console.log("useraget info " + JSON.stringify(info));
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={Styles.main}>
                {/* <WebView source={{ uri: 'https://google.com/' }} /> */}
                 <WebView
                    //originWhitelist={['*']} 
                    source={{ uri: 'https://api.relaksradiocafe.com/api/v1/auth/google' }}
                    //source={{ html: responseView }}
                    //userAgent={agentInfo}
                    //applicationNameForUserAgent={'relakscafe/1.0.0'}
                    //userAgent="Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
                    // userAgent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"
                    // userAgent={'Mozilla/5.0 (Linux; Android 8.1.0; Android SDK built for x86 Build/OSM1.180201.021; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.98 Mobile Safari/537.36'}
                    //userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
                    //userAgent={"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"} 
                    //userAgent="Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
                    userAgent={"Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"}
                    originWhitelist={["https://*", "http://*", "file://*", "sms://*"]}
                    //applicationNameForUserAgent={"relaks_cafe/1.0.0"}
                    automaticallyAdjustContentInsets = {false}
                    onError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent
                        console.log('WebView error: ', nativeEvent);
                    }}
                    onLoadEnd={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        console.log("end " + nativeEvent.url);
                        if (nativeEvent.url == "https://api.relaksradiocafe.com/api/v1/auth/google/success") {
                            console.log("redirct to auth page");
                            setModelTitel("Successfully");
                            setModelMessage("user auth sucess using google!");
                            setShowOk(true);
                            setTimeout(() => { setShowOk(false); Actions.auth(); }, 2000);
                            
                        }
                    }}
                    onMessage={(e) => {
                        let { data } = e.nativeEvent;
                        console.log("message " + data);
                    }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                // setSupportMultipleWindows={true} */}

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
            </View>
        </SafeAreaView>
    )
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

});

export default Social_Auth_Screen;
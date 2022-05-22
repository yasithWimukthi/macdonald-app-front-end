import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/AntDesign';



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

const FormView = () => {
    return (
        <View style={Styles.inputContainer}>
            <View style={Styles.input_holder}>
                <View style={Styles.inputContainer_Row}>
                    <TextInput placeholder='Email' placeholderTextColor="#000" style={Styles.defulatTextInput} />
                </View>
                <View style={Styles.inputContainer_Row_icon}>
                    <View style={Styles.subinputContainer}>
                        <TextInput
                            style={Styles.defulatTextInput}
                            placeholder='Password'
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


const BtnFaceBookView = () => {
    return (
        <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={() => { alert("ypu press me") }}>
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

const BtnLoginView = () => {
    return (
        <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={() => { alert("ypu press login") }}>
                <View style={ [Styles.btnBorder,{backgroundColor:'yellow',borderWidth:0}]}>
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

const authscreen = () => {
    return (
        <View style={Styles.main}>
            <View style={[Styles.screenTitel,{marginTop:hp('1%'),marginBottom:hp('1.5%')}]}>
                <RulesTexts />
            </View>
            
            <View style={[Styles.screenTitel,{marginTop:hp('1%'),marginBottom:hp('1.5%')}]}>
                <FormView />
            </View>
            
            <View style={Styles.screenTitel}>
                <BtnFaceBookView/>
            </View>
           
            <BtnGoogleView/>
            <View style={[Styles.screenTitel,{position: 'absolute',bottom:0}]}>
                <BtnLoginView/>
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
        color: 'blue',
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
        alignItems:'center',
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
        marginTop : hp('3%'),
        marginBottom:hp('2%'),
    },
    inputContainer_Row_icon: {
        width: wp('90%'),
        height: hp('4%'),
        alignItems:'center',
        justifyContent: 'center',
        marginTop : hp('3%'),
        marginBottom:hp('2%'),

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
    screenTitel : {
        marginTop : hp('3%'),
        marginBottom : hp('3%'),
    }
});


export default authscreen;
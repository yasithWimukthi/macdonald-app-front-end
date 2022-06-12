import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';



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

const BtnFaceBookView = () => {
    return (
        <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={()=>{alert("ypu press me")}}>
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
            <TouchableOpacity onPress={()=>{alert("ypu press me")}}>
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


const signupscreen = () => {

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
                <BtnFaceBookView/>
            </View>

            
            <BtnGoogleView/>


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
    }


});


export default signupscreen;
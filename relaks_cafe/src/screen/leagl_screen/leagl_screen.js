import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';



const HeaderContainer = () => {
    return(
        <View elevation={2} style={Styles.titelContainer}>
            <View style={Styles.titelHolder}>
                    <View style={Styles.titelMainHeder}>
                        <Text style={Styles.titel_main_text}>Careers, Contact & Legal</Text>
                    </View>
                    <View style={Styles.titelSubHeder}>
                        <Text style={Styles.titel_sub_text}>© 2022 Relaks</Text>
                    </View>
                    <View style={Styles.titelSubHeder}>
                        <Text style={Styles.titel_sub_text}>App Version 1.0.0</Text>
                    </View>
            </View>
        </View>
    );
}

const PrivanceyTitel = () => {
    return(
        <View style={Styles.privanceyTitelView}>
            <View style={Styles.privanceyTitelHolder}>
                <View style={Styles.privancyTitel}>
                    <Text>Privacy Statement</Text>
                </View>
                <View style={Styles.privanceyIcon}>
                    <Icon color="#000" name="right" size={20} />
                </View>
            </View>
        </View>
    );
}

const ConditionTile = () => {
    return(
        <View style={Styles.privanceyTitelView}>
            <View style={Styles.privanceyTitelHolder}>
                <View style={Styles.privancyTitel}>
                    <Text>Terms & Conditions</Text>
                </View>
                <View style={Styles.privanceyIcon}>
                    <Icon color="#000" name="right" size={20} />
                </View>
            </View>
        </View>
    );
}

const Leagle_Screen = () => {
    return (
        <View style={Styles.main}>
            <HeaderContainer/>
            <View style={Styles.container}>
            <PrivanceyTitel/>
            <ConditionTile/>
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        //backgroundColor: "#FFFFFF",
        //flexDirection: 'row',
        alignContent: 'center',
        //alignItems: 'center'
    },
    titelContainer : {
        width:wp('100%'),
        height:hp('25%'),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: "#FFFFFF",
        // borderBottomWidth : 1,
        // borderBottomColor : '#c0c0c0'
    },
    titelHolder : {
        width:wp('90%'),
        height:hp('23%'),
        alignItems:'center',
        justifyContent:'center',
    },
    titelMainHeder : {
        width:wp('90%'),
        height:hp('6%'),
        alignItems:'center',
        justifyContent:'center',
    },
    titelSubHeder : {
        width:wp('90%'),
        height:hp('3%'),
        alignItems:'center',
        justifyContent:'center',
    },
    titel_main_text: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 22,
        color: '#000',
        letterSpacing: 0.04,

    },
    titel_sub_text: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.04,

    },
    privanceyTitelView : {
        width:wp('100%'),
        height:hp('10%'),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: "#FFFFFF",
        borderBottomWidth : 1,
        borderBottomColor : '#c0c0c0',
        marginTop:hp('2%')
    },
    privanceyTitelHolder : {
        width:wp('90%'),
        height:hp('8%'),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: "#FFFFFF",
        flexDirection:'row'
    },
    privancyTitel:{
        width:wp('70%'),
        height:hp('6%'),
        justifyContent:'center',
    },
    privanceyIcon : {
        width:wp('20%'),
        height:hp('6%'),
        justifyContent:'center',
        alignItems:'flex-end'
    },
    container : {
        flex : 1,
        backgroundColor:'#FFF',
        marginTop:hp('0.5%'),
    }
});

export default Leagle_Screen;
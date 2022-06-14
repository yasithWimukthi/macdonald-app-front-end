import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';

const TitelView = () => {
    return(
        <View style={Styles.titelContainer}>
            <View style={Styles.titelHolder}>
                <View style = {Styles.titelConte}>
                    <Text style={Styles.defulat_text}>Personal Setting</Text>
                </View>
            </View>
        </View>
    );
}

const RegisterTypeView = ({type}) => {
    return(
        <View style={Styles.titelContainer}>
            <View style={Styles.titelHolder}>
                <View style = {Styles.titelConte}>
                    <Icon color="#4267B2" name="facebook-square" size={30} />
                    <Text style={Styles.defulat_text_Info}>{"Register with "+type}</Text>
                </View>
            </View>
        </View>
    );
}
const NameView = ({userName}) => {
    return(
        <View style={Styles.titelContainer}>
            <View style={Styles.titelHolder}>
                <View style = {Styles.titelConte}>
                    <Text style={Styles.defulat_text_label}>Name</Text>
                    <Text style={Styles.defulat_text_Info}>{userName}</Text>
                </View>
            </View>
        </View>
    );
}
const EmailView = ({emails}) => {
    return(
        <View style={Styles.titelContainer}>
            <View style={Styles.titelHolder}>
                <View style = {Styles.titelConte}>
                    <Text style={Styles.defulat_text_label}>Email</Text>
                    <Text style={Styles.defulat_text_Info}>Personal Setting</Text>
                </View>
            </View>
        </View>
    );
}



const personal_setting_screen = () => {

    const { user } = useSelector(state => state.userReducer);

    return(
        <View style={Styles.main}>
            <TitelView />
            <RegisterTypeView type={user.loginType}/>
            <NameView userName={user.firstName+" "+user.lastName}/>
            <EmailView emails={user.email}/>
        </View>
    );
}

const Styles = StyleSheet.create({
    main : {
        flex: 1,
        backgroundColor: "#FFFFFF",
        //flexDirection: 'row',
        alignContent: 'center',
        //alignItems: 'center'
    },
    titelContainer : {
        width:wp('100%'),
        height:hp('15%'),
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth : 1,
        borderBottomColor : '#c0c0c0'
    },
    titelHolder : {
        width:wp('90%'),
        height:hp('12%'),
        alignItems:'center',
        justifyContent:'center'
    },
    titelConte : {
        width:wp('90%'),
        height:hp('10%'),
        justifyContent:'center'
    },
    defulat_text: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 21,
        color: '#000',
        letterSpacing: 0.3,

    },
    defulat_text_label: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 13,
        color: '#000',
        letterSpacing: 0.3,

    },
    defulat_text_Info: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 15,
        color: '#000',
        letterSpacing: 0.3,

    },

    
});


export default personal_setting_screen;
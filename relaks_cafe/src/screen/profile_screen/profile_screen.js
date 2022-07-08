import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';

import { Actions } from 'react-native-router-flux';

import { useSelector, useDispatch } from 'react-redux';
import { setCartItems, setAddressInfo, setFavAddressInfo, setUserInfo } from '../../redux/actions';

const ProfileTitel = ({ username }) => {

    const dispatch = useDispatch();

    function signOutFromAccount() {
        var users = {
            "ids": "0",
            "firstName": "",
            "lastName": "",
            "loginType": "",
            "email": "",
            "token": "",
            "mobile": ""
        };

        var itemss = {
            "isDelivery": false,
            "refId": "",
            "noOfItems": 0,
            "totalPrice": 0.00,
            "promotionId": 0,
            "location": {
                "latitude": "34.052235",
                "longitude": "-118.243683"
            },
            "foodItems": []
        };

        var address = {
            "mainAddress": "Plase select Location",
            "subAddress": "tap on change location",
            "location": {
                "latitude": "34.052235",
                "longitude": "-118.243683"
            }
        }
        var favaddress = {
            "favAdd": []
        }

        dispatch(setCartItems(itemss));
        dispatch(setAddressInfo(address));
        dispatch(setFavAddressInfo(favaddress));
        dispatch(setUserInfo(users));

        Actions.auth();
        
    }


    return (

        <View style={Styles.TitelConatiner}>
            <View style={Styles.TitelHolder}>
                <View style={Styles.TitelTextHolder}>
                    <Text style={Styles.TitelBoldTexts}>Your Profile</Text>
                </View>
                <View style={Styles.TitelNameHolder}>
                    <View style={Styles.TitelNameConatiner}>
                        <Text style={Styles.TitelSubTexts}>{username}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { signOutFromAccount(); }}>
                        <View style={Styles.TitelSignConatiner}>
                            <Text style={Styles.TitelSubUnderTexts}>Sign out</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
}


const PersonalSettingTile = () => {
    return (
        <TouchableOpacity onPress={() => { Actions.Personal(); }}>
            <View style={Styles.TileConatiner}>
                <View style={Styles.TileHolder}>
                    <View style={Styles.TileIconHolder}>
                        <Icon color="#000" name="bars" size={20} />
                    </View>
                    <View style={Styles.TileTextHolder}>
                        <Text style={Styles.TitelTexts}>Personal Settings</Text>
                    </View>
                    <View style={Styles.TileIconHolder}>
                        <Icon color="#000" name="right" size={20} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const PrivanceyTile = () => {
    return (
        <TouchableOpacity onPress={() => { Actions.privancy(); }}>
            <View style={Styles.TileConatiner}>
                <View style={Styles.TileHolder}>
                    <View style={Styles.TileIconHolder}>
                        <Icon color="#000" name="lock" size={20} />
                    </View>
                    <View style={Styles.TileTextHolder}>
                        <Text style={Styles.TitelTexts}>Privacy</Text>
                    </View>
                    <View style={Styles.TileIconHolder}>
                        <Icon color="#000" name="right" size={20} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const PaymentTile = () => {
    return (
        <TouchableOpacity onPress={() => { Actions.privancy(); }}>
            <View style={Styles.TileConatiner}>
                <View style={Styles.TileHolder}>
                    <View style={Styles.TileIconHolder}>
                        <Icon color="#000" name="creditcard" size={20} />
                    </View>
                    <View style={Styles.TileTextHolder}>
                        <Text style={Styles.TitelTexts}>Payment Methods</Text>
                    </View>
                    <View style={Styles.TileIconHolder}>
                        <Icon color="#000" name="right" size={20} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const CommunicationTile = () => {
    return (
        <TouchableOpacity onPress={() => { Actions.writeUs(); }}>
            <View style={Styles.TileConatiner}>
                <View style={Styles.TileHolder}>
                    <View style={Styles.TileIconHolder}>
                        <Icon color="#000" name="mail" size={20} />
                    </View>
                    <View style={Styles.TileTextHolder}>
                        <Text style={Styles.TitelTexts}>Communications</Text>
                    </View>
                    <View style={Styles.TileIconHolder}>
                        <Icon color="#000" name="right" size={20} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const DeleteAccountTile = () => {
    return (
        <View style={Styles.DeleteConatiner}>
            <View style={Styles.DeleteHolder}>

                <View style={Styles.DeleteTextHolder}>
                    <Text style={Styles.DeleteTexts}>Delete account</Text>
                </View>

            </View>
        </View>
    );
}

const profile_screen = () => {

    const { user } = useSelector(state => state.userReducer);

    return (
        <View style={Styles.main}>
            <ProfileTitel username={user.firstName + " " + user.lastName} />
            <PersonalSettingTile />
            <PrivanceyTile />
            <PaymentTile />
            <CommunicationTile />
            <DeleteAccountTile />

        </View>
    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignContent: 'center',
    },
    TitelConatiner: {
        width: wp('100%'),
        height: hp('15%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    TitelHolder: {
        width: wp('90%'),
        height: hp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    TitelTextHolder: {
        width: wp('90%'),
        height: hp('3%'),
        justifyContent: 'center',
    },
    TitelNameHolder: {
        width: wp('90%'),
        height: hp('3%'),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    TitelNameConatiner: {
        width: wp('70%'),
        height: hp('2%'),
        justifyContent: 'center',
        alignItems: "flex-start"
    },
    TitelSignConatiner: {
        width: wp('20%'),
        height: hp('2%'),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    TitelBoldTexts: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 21,
        color: '#000',
        letterSpacing: 0.04,
    },
    TitelSubTexts: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.04,
    },
    TitelSubUnderTexts: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#EB1F25',
        letterSpacing: 0.04,
        textDecorationLine: 'underline',
    },
    TileConatiner: {
        width: wp('100%'),
        height: hp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#c0c0c0',
    },
    TileHolder: {
        width: wp('90%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    TileIconHolder: {
        width: wp('10%'),
        height: hp('8%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    TileTextHolder: {
        width: wp('70%'),
        height: hp('8%'),
        justifyContent: 'center',
    },
    TitelTexts: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.04,
        marginLeft: wp('2%')
    },
    DeleteConatiner: {
        width: wp('100%'),
        height: hp('8%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    DeleteHolder: {
        width: wp('90%'),
        height: hp('6%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    DeleteTextHolder: {
        width: wp('90%'),
        height: hp('6%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    DeleteTexts: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 13,
        color: '#EB1F25',
        letterSpacing: 0.04,
        marginLeft: wp('2%'),
        textDecorationLine: 'underline',

    },

});


export default profile_screen;
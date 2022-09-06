import React, { PropTypes, Component, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


import { Actions } from 'react-native-router-flux';

import { useSelector, useDispatch } from 'react-redux';

//const Tab = createBottomTabNavigator();

const home_screen = () => {

    const { items } = useSelector(state => state.userReducer);

    const [visbile, setVisible] = useState((items.foodItems.length > 0) ? true : false);

    const [totals, setTolats] = useState(items.totalPrice);

    useEffect(()=>{
       // alert("calling");
        setVisible((items.foodItems.length > 0) ? true : false);
        setTolats(items.totalPrice);
    });

    return (
        
        <View>
            {
                (visbile) ? <View style={Styles.cartTile}>
                    <View style={Styles.cartTile_holder}>
                        <View style={Styles.cartTile_info_holder}>
                            <View style={Styles.cartTile_tesxts_holder}>
                                <Text style={Styles.itemText}>{items.foodItems.length + " items"}</Text>
                            </View>
                            <View style={Styles.cartTile_tesxts_holder}>
                                <Text style={Styles.totalText}>{"€ :" + totals}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => { Actions.Cart(); }}>
                            <View style={Styles.cartTile_btn_holder}>
                                <View style={Styles.btn_holder}>
                                    <Text style={[Styles.itemText,{color: '#000',}]}>View Cart</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> : null
            }

        </View>

        // </NavigationContainer >

    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        // backgroundColor: "#FFFFFF",
        backgroundColor: "#F5F5F5",
        //flexDirection: 'row',
        alignContent: 'center',
        //alignItems: 'center'
    },
    bootmIconHolder: {
        width: wp('20%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    app_logs: {
        width: wp('5%'),
        height: hp('3%'),
        alignContent: 'center',
        alignItems: 'center',
        resizeMode: "contain",
    },
    tabBartext: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 12,
        color: '#757575',
        letterSpacing: 0.04,
    },
    cartTile: {
        width: wp('100%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: hp('8%'),
        // backgroundColor:'#f5f5f5'
    },
    cartTile_holder: {
        width: wp('90%'),
        height: hp('8%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a5a6a5',
        borderRadius: 5,
        flexDirection: 'row'
    },
    cartTile_info_holder: {
        width: wp('60%'),
        height: hp('8%'),
        justifyContent: 'center',
    },
    cartTile_tesxts_holder: {
        width: wp('50%'),
        height: hp('3%'),
        justifyContent: 'center',
        marginLeft:10,
    },
    cartTile_btn_holder: {
        width: wp('30%'),
        height: hp('8%'),
        justifyContent: 'center',
    },
    itemText: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#fff',
        letterSpacing: 0.04,
    },
    totalText: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 14,
        color: '#fff',
        letterSpacing: 0.04,
    },
    btn_holder: {
        width: wp('28%'),
        height: hp('7%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'red'
    },

});

export default home_screen;
import React, { PropTypes, Component, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/Fontisto';

import Home_Tab_Screen from '../Tabs/home_tab_screen';
import Order_Tab_Screen from '../Tabs/order_tab_screen';
import More_Tab_Screen from '../Tabs/more_tab_screen';
import Deals_Tab_Screen from '../Tabs/deals_tab_screen';
import Resent_Tab_Screen from '../Tabs/resent_tab_screen';
import Tabel_Reservation_Screen from '../Tabs/tabel_reservation_screen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SweetAlert from 'react-native-sweet-alert';
import { FloatingAction } from "react-native-floating-action";
import { Actions } from 'react-native-router-flux';


import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/actions';

const Tab = createBottomTabNavigator();

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
        <NavigationContainer style={Styles.main}>

            <Tab.Navigator tabBarOptions={{ showLabel: false }}>
                <Tab.Screen name="Home" component={Home_Tab_Screen} options={({ route }) => ({
                    tabBarIcon: ({ focused }) => {

                        return (
                            <View style={Styles.bootmIconHolder}>
                                {/* <Icon color="#000" name="home" size={20} /> */}
                                <Image source={{ uri: (focused) ? 'bottombar' : 'home_inactive' }} style={Styles.app_logs} />
                                <Text style={[Styles.tabBartext, { color: (focused) ? "#EB1F25" : "#757575" }]}>Home</Text>
                            </View>
                        );
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false
                })}
                />
                <Tab.Screen name="Tabel" component={Tabel_Reservation_Screen} options={({ route }) => ({
                    tabBarIcon: ({ focused }) => {

                        return (
                            <View style={Styles.bootmIconHolder}>
                                {/* <Icon color="#000" name="team" size={20} /> */}
                                {/* <Image source={{ uri: (focused) ? 'bottombar' : 'home_inactive' }} style={Styles.app_logs} /> */}
                                {
                                    (focused) ? <Icon color="#EB1F25" name="team" size={20} /> : <Icon color="#757575" name="team" size={20} />
                                }
                                <Text style={[Styles.tabBartext, { color: (focused) ? "#EB1F25" : "#757575" }]}>Tabel</Text>
                            </View>
                        );
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false
                })}
                />
                <Tab.Screen name="Order" component={Order_Tab_Screen} options={({ route }) => ({
                    tabBarIcon: ({ focused }) => {

                        return (
                            <View style={Styles.bootmIconHolder}>
                                <Image source={{ uri: (focused) ? 'order_active' : 'order_inactive' }} style={Styles.app_logs} />
                                <Text style={[Styles.tabBartext, { color: (focused) ? "#EB1F25" : "#757575" }]}>Order</Text>
                            </View>
                        );
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false
                })} />
                <Tab.Screen name="Deals" component={Deals_Tab_Screen} options={({ route }) => ({
                    tabBarIcon: ({ focused }) => {

                        return (
                            <View style={Styles.bootmIconHolder}>
                                <Image source={{ uri: (focused) ? 'deals_active' : 'deal_inactive' }} style={Styles.app_logs} />
                                <Text style={[Styles.tabBartext, { color: (focused) ? "#EB1F25" : "#757575" }]}>Deals</Text>
                            </View>
                        );
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false
                })} />
                <Tab.Screen name="Recents" component={Resent_Tab_Screen} options={({ route }) => ({
                    tabBarIcon: ({ focused }) => {

                        return (
                            <View style={Styles.bootmIconHolder}>
                                <Image source={{ uri: (focused) ? 'recent_active' : 'recent_inactive' }} style={Styles.app_logs} />
                                <Text style={[Styles.tabBartext, { color: (focused) ? "#EB1F25" : "#757575" }]}>Recents</Text>
                            </View>
                        );
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false
                })} />
                <Tab.Screen name="More" component={More_Tab_Screen} options={({ route }) => ({
                    tabBarIcon: ({ focused }) => {

                        return (
                            <View style={Styles.bootmIconHolder}>
                                <Image source={{ uri: (focused) ? 'more_active' : 'more_inactive' }} style={Styles.app_logs} />
                                <Text style={[Styles.tabBartext, { color: (focused) ? "#EB1F25" : "#757575" }]} >More</Text>
                            </View>
                        );
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false
                })} />
            </Tab.Navigator>

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


        </NavigationContainer >

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
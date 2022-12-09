import React, { PropTypes, Component, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/AntDesign';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Actions } from 'react-native-router-flux';

import {FONT_BOLD,FONT_LIGHT} from '../assert/key/key';


const Tab = createBottomTabNavigator();


const BottomBarView = ({ navigation }) => {

    const [homeSelect, setHomeSelect] = useState(false);
    const [orderSelect, setOrderSelect] = useState(false);
    const [moreSelect, setMoreSelect] = useState(false);
    const [tabelSelect, setTableSelect] = useState(false);
    const [dealsSelect, setDelasSelect] = useState(false);
    const [recentSelect, setRecentSelect] = useState(false);

    function setSelectionsTile(name) {
        if (name == "home") {
            setHomeSelect(!homeSelect);
            setOrderSelect(false);
            setMoreSelect(false);
            setTableSelect(false);
            setDelasSelect(false);
            setRecentSelect(false);

            Actions.dashbord({goto:'Home'});
        } else if (name == "order") {
            setHomeSelect(false);
            setOrderSelect(!orderSelect);
            setMoreSelect(false);
            setTableSelect(false);
            setDelasSelect(false);
            setRecentSelect(false);

            Actions.dashbord({goto:'Order'});
        } else if (name == "tabel") {
            setHomeSelect(false);
            setOrderSelect(false);
            setMoreSelect(false);
            setTableSelect(!tabelSelect);
            setDelasSelect(false);
            setRecentSelect(false);

            Actions["Order-IcagZ6kZaW2uxkp1CM3V2"]();

        } else if (name == "deals") {
            setHomeSelect(false);
            setOrderSelect(false);
            setMoreSelect(false);
            setTableSelect(false);
            setDelasSelect(!dealsSelect);
            setRecentSelect(false);

            Actions.dashbord({goto:'Deals'});
        } else if (name == "recent") {
            setHomeSelect(false);
            setOrderSelect(false);
            setMoreSelect(false);
            setTableSelect(false);
            setDelasSelect(false);
            setRecentSelect(!recentSelect);
            
            Actions.dashbord({goto:'Recents'});
        } else if (name == "more") {
            setHomeSelect(false);
            setOrderSelect(false);
            setMoreSelect(!moreSelect);
            setTableSelect(false);
            setDelasSelect(false);
            setRecentSelect(false);

            Actions.dashbord({goto:'More'});

        }
    }


    return (
        <View elevation={4} style={Styles.main}>
            <View style={Styles.mainHolder}>
                <TouchableOpacity onPress={() => { setSelectionsTile("home"); }}>
                    <View style={Styles.bootmIconHolder}>
                        <Image source={{ uri: (homeSelect) ? 'bottombar' : 'home_inactive' }} style={Styles.app_logs} />
                        <Text style={[Styles.tabBartext, { color: (homeSelect) ? "#EB1F25" : "#757575" }]}>Home</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelectionsTile("tabel"); }}>
                    <View style={Styles.bootmIconHolder}>
                        {
                            (tabelSelect) ? <Icon color="#EB1F25" name="team" size={20} /> : <Icon color="#757575" name="team" size={20} />
                        }
                        <Text style={[Styles.tabBartext, { color: (tabelSelect) ? "#EB1F25" : "#757575" }]}>Tabel</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelectionsTile("order"); }}>
                    <View style={Styles.bootmIconHolder}>
                        <Image source={{ uri: (orderSelect) ? 'order_active' : 'order_inactive' }} style={Styles.app_logs} />
                        <Text style={[Styles.tabBartext, { color: (orderSelect) ? "#EB1F25" : "#757575" }]}>Order</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelectionsTile("deals"); }}>
                    <View style={Styles.bootmIconHolder}>
                        <Image source={{ uri: (dealsSelect) ? 'deals_active' : 'deal_inactive' }} style={Styles.app_logs} />
                        <Text style={[Styles.tabBartext, { color: (dealsSelect) ? "#EB1F25" : "#757575" }]}>Deals</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelectionsTile("recent"); }}>
                    <View style={Styles.bootmIconHolder}>
                        <Image source={{ uri: (recentSelect) ? 'recent_active' : 'recent_inactive' }} style={Styles.app_logs} />
                        <Text style={[Styles.tabBartext, { color: (recentSelect) ? "#EB1F25" : "#757575" }]}>Recents</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelectionsTile("more"); }}>
                    <View style={Styles.bootmIconHolder}>
                        <Image source={{ uri: (moreSelect) ? 'more_active' : 'more_inactive' }} style={Styles.app_logs} />
                        <Text style={[Styles.tabBartext, { color: (moreSelect) ? "#EB1F25" : "#757575" }]} >More</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    main: {
        width: wp('100%'),
        height: hp('6%'),
        backgroundColor: "#FFF", //F5F5F5
        alignContent: 'center',
        justifyContent: 'center'
    },
    mainHolder: {
        width: wp('100%'),
        height: hp('5%'),
        backgroundColor: "#FFF", //F5F5F5
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    bootmIconHolder: {
        width: wp('16.6%'),
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
        fontFamily: FONT_LIGHT,//'NexaTextDemo-Light',
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
        marginLeft: 10,
    },
    cartTile_btn_holder: {
        width: wp('30%'),
        height: hp('8%'),
        justifyContent: 'center',
    },
    itemText: {
        fontFamily: FONT_LIGHT,//  'NexaTextDemo-Light',
        fontSize: 14,
        color: '#fff',
        letterSpacing: 0.04,
    },
    totalText: {
        fontFamily: FONT_BOLD,// 'NexaTextDemo-Bold',
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

export default BottomBarView;
import React, { PropTypes, Component } from 'react';
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

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SweetAlert from 'react-native-sweet-alert';
import { FloatingAction } from "react-native-floating-action";
import { Actions } from 'react-native-router-flux';


const Tab = createBottomTabNavigator();

const actions = [
    {
      text: "Radio",
      icon: require("../../assert/images/splash_app_logo.png"),
      name: "bt_language",
      position: 1
    },
    
  ];
  const actions2 = [
    {
      text: "Cart",
      icon: require("../../assert/images/splash_app_logo.png"),
      name: "Cart",
      position: 1
    },
    
  ];

const home_screen = () => {


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

            {/* <FloatingAction
                actions={()=>{Actions.Cart();}}
                onPressItem={name => {
                    console.log(`selected button: ${name}`);
                }}
            /> */}
            <FloatingAction
                actions={actions2}
                onPressItem={name => {
                    console.log(`selected button: ${name}`);
                    if(name == "Cart"){
                        Actions.Cart();
                    }
                }}
            />

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
    }
});

export default home_screen;
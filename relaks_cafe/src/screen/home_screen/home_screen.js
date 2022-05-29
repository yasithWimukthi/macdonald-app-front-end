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

const Tab = createBottomTabNavigator();

const home_screen = () => {


    return (
        <NavigationContainer style={Styles.main}>

            <Tab.Navigator tabBarOptions={{ showLabel: false }}>
                <Tab.Screen name="Home" component={Home_Tab_Screen} options={({ route }) => ({
                    tabBarIcon: ({ focused }) => {

                        return (
                            <View style={Styles.bootmIconHolder}>
                                <Icon color="#000" name="home" size={20} />
                                <Text>Home</Text>
                            </View>
                        );
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
                />
                <Tab.Screen name="Order" component={Order_Tab_Screen} options={({ route }) => ({
                    tabBarIcon: ({ focused }) => {

                        return (
                            <View style={Styles.bootmIconHolder}>
                                <Icon3 color="#000" name="fast-food-outline" size={20} />
                                <Text>Order</Text>
                            </View>
                        );
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })} />
                <Tab.Screen name="Deals" component={Deals_Tab_Screen} options={({ route }) => ({
                    tabBarIcon: ({ focused }) => {

                        return (
                            <View style={Styles.bootmIconHolder}>
                                <Icon2 color="#000" name="tag" size={30} />
                                <Text>Deals</Text>
                            </View>
                        );
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })} />
                <Tab.Screen name="Recents" component={Resent_Tab_Screen} options={({ route }) => ({
                    tabBarIcon: ({ focused }) => {

                        return (
                            <View style={Styles.bootmIconHolder}>
                                <Icon4 color="#000" name="history" size={20} />
                                <Text>Recents</Text>
                            </View>
                        );
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })} />
                <Tab.Screen name="More" component={More_Tab_Screen} options={({ route }) => ({
                    tabBarIcon: ({ focused }) => {

                        return (
                            <View style={Styles.bootmIconHolder}>
                                <Icon color="#000" name="ellipsis1" size={20} />
                                <Text>More</Text>
                            </View>
                        );
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })} />
            </Tab.Navigator>

        </NavigationContainer>
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
    bootmIconHolder : {
        width:wp('20%'),
        height:hp('5%'),
        alignItems:'center',
        justifyContent:'center'
    }
});

export default home_screen;
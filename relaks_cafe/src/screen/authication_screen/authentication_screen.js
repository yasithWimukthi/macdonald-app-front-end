import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AuthScreen from '../auth_screen/auth_screen';
import SignUp from '../signup_screen/signup_screen';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const authenticationscreen = () => {
    return (
        <NavigationContainer style={Styles.main}>
            <Tab.Navigator>
                <Tab.Screen name="Log in"  component={AuthScreen} />
                <Tab.Screen name="Register" component={SignUp} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        //backgroundColor: "#FFFFFF",
        backgroundColor: 'white',
        alignItems: 'center'
    }
});


export default authenticationscreen;
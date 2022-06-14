/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { PropTypes, Component, useState } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { io, Socket } from 'socket.io-client';

import SplashScreeen from './src/screen/splash_screen/splash_screen';
import AuthenticationScreen from './src/screen/authication_screen/authentication_screen';
import AuthScreen from './src/screen/auth_screen/auth_screen';
import RegisterScreen from './src/screen/signup_screen/signup_screen';
import SignupFormScreen from './src/screen/signup_form_screen/signup_form_screen';
import Home_Screen from './src/screen/home_screen/home_screen';
import Personal_Setting_Screen from './src/screen/personal_setting_screen/personal_setting_screen';
import PreferceScreen from './src/screen/prefernce_screen/prefernce_screen';
import NotificationSettingScreen from './src/screen/notification_setting_screen/notification_setting_screen';
import Leagle_Screen from './src/screen/leagl_screen/leagl_screen';
import Menu_Screen from './src/screen/menu_screen/menu_screen';
import SubcriptionScreen from './src/screen/subcription_screen/subcription_screen';
import Profile_Screen from './src/screen/profile_screen/profile_screen';
import Voucher_Screen from './src/screen/voucher_screen/voucher_screen';
import FAQ_Screen from './src/screen/faq_screen/faq_screen';
import SingleMenuItemScreen from './src/screen/MenuList_screen/MenuList_screen';
import WriteToUs_Screen from './src/screen/WriteToUs_Screen/WriteToUs_Screen';
import PrivencySettingScreen from './src/screen/Privancy_Setting/Privancy_Setting_Screen';
import Single_FoodInfo_Screen from './src/screen/single_food_item_screen/single_food_item_screen';
import Tabel_Reservation_Screen from './src/screen/Tabs/tabel_reservation_screen';
import Cart_Screen from './src/screen/cart_screen/cart_screen';
import StripeGateway from './src/screen/stripegateway_screen/stripegateway_screen';
import Single_Tranding_Screen from './src/screen/trinding_item_screen/trinding_item_screen';
import Location_Pickup_Screen from './src/screen/Location_pickup_screen/location_pickup_screen';
import Search_Address_Screen from './src/screen/Location_pickup_screen/serch_address_screen';
import Current_Location_Pick_Screen from './src/screen/Location_pickup_screen/curren_location_screen';
import Single_Deals_Info_Screen from './src/screen/single_deals_screen/single_deals_screen';
import Order_Pendding_Screen from './src/screen/order_pending_screen/order_pending_screen';
import Reset_Password_Screen from './src/screen/reset_password_screen/reset_password_screen';
import Request_Reset_Password_Screen from './src/screen/request_password_reset_screen/request_password_reset_screen';

import { Stack, Router, Scene } from 'react-native-router-flux';

import app_logo from './src/assert/images/splash_app_logo.png';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Provider } from 'react-redux';
import { Store } from './src/redux/store';
import { useEffect } from 'react';


const SOKCET_SERVER_ADDRESS = "https://cafe-app-352118.el.r.appspot.com";

const SOCKETS = io(SOKCET_SERVER_ADDRESS, {
  auth: {
    token: 'eyJhbGciOiJIU67vQVtXk'
  },
  extraHeaders: {
    device_id: "MOBILEAPP",
  },
});

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    console.log("start sokets ");
    SOCKETS.on('connect', () => {
      console.log("socket is on " + SOCKETS.id);
      SOCKETS.on('push', (msg) => {
        console.log('message: ' + msg);
      });

    });
  });

  return (
    <Provider store={Store}>
      <Router uriPrefix={'abcd.com'} >
        <Stack key="root">
          <Scene
            key="splash"
            type="replace"
            component={SplashScreeen}
            initial
            hideNavBar={true}
          />
          <Scene
            key="auth"
            type="replace"
            component={AuthenticationScreen}
            hideNavBar={true}
            panHandlers={null}
          />
          <Scene
            key="authenticated"
            type="replace"
            renderTitle={() => (
              <View style={styles.navBarStyles}>
                <View style={styles.app_logs_holder}>
                  <Image source={{ uri: 'tabbar_icon' }} style={styles.app_logs} />
                </View>
              </View>
            )}
            panHandlers={null}
          >
            <Scene
              key="dashbord"
              title=""
              component={Home_Screen}
              renderTitle={() => (
                <View style={styles.navBarStyles}>
                  <View style={styles.app_logs_holder}>
                    <Image source={{ uri: 'tabbar_icon' }} style={styles.app_logs} />
                  </View>
                </View>
              )}
              hideNavBar={true}
              initial
            />

          </Scene>
          <Scene
            key="MenuList"
            component={SingleMenuItemScreen}
            title=""
          //backButtonTextStyle = {{color:'#FFFFFF'}}
          //barButtonIconStyle={{ tintColor: '#fff' }}
          //titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
          // navigationBarStyle = {{backgroundColor : '#5B0492'}}
          //backButtonTintColor = '#fff'
          //leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
          //hideNavBar={true}
          />
          <Scene
            key="writeUs"
            component={WriteToUs_Screen}
            title=""
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            // barButtonIconStyle={{ tintColor: '#fff' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            // backButtonTintColor = '#fff'
            // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
            hideNavBar={true}
          />
          <Scene
            key="privancy"
            component={PrivencySettingScreen}
            title=""
            backButtonTextStyle={{ color: '#000' }}
            barButtonIconStyle={{ tintColor: '#000' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            navigationBarStyle={{ backgroundColor: '#FFF' }}
            backButtonTintColor='#000'
            leftButtonStyle={{ color: '#000', tintColor: '#000' }}
            hideNavBar={true}
          />
          <Scene
            key="FAQ"
            component={FAQ_Screen}
            title=""
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            // barButtonIconStyle={{ tintColor: '#fff' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            // backButtonTintColor = '#fff'
            // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
            hideNavBar={true}
          />
          <Scene
            key="Voucher"
            component={Voucher_Screen}
            title=""
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            // barButtonIconStyle={{ tintColor: '#fff' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            // backButtonTintColor = '#fff'
            // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
            hideNavBar={true}
          />
          <Scene
            key="Profile"
            component={Profile_Screen}
            title=""
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            // barButtonIconStyle={{ tintColor: '#fff' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            // backButtonTintColor = '#fff'
            // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
            hideNavBar={true}
          />
          <Scene
            key="Sub"
            component={SubcriptionScreen}
            title=""
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            // barButtonIconStyle={{ tintColor: '#fff' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            // backButtonTintColor = '#fff'
            // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
            hideNavBar={true}
          />
          <Scene
            key="Legal"
            component={Leagle_Screen}
            title=""
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            // barButtonIconStyle={{ tintColor: '#fff' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            // backButtonTintColor = '#fff'
            // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
            hideNavBar={true}
          />
          <Scene
            key="Notifi"
            component={NotificationSettingScreen}
            title=""
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            // barButtonIconStyle={{ tintColor: '#fff' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            // backButtonTintColor = '#fff'
            // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
            hideNavBar={true}
          />
          <Scene
            key="Perfer"
            component={PreferceScreen}
            title=""
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            // barButtonIconStyle={{ tintColor: '#fff' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            // backButtonTintColor = '#fff'
            // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
            hideNavBar={true}
          />
          <Scene
            key="Personal"
            component={Personal_Setting_Screen}
            title=""
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            // barButtonIconStyle={{ tintColor: '#fff' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            // backButtonTintColor = '#fff'
            // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
            hideNavBar={true}
          />
          <Scene
            key="Register"
            component={SignupFormScreen}
            title=""
          // backButtonTextStyle = {{color:'#FFFFFF'}}
          // barButtonIconStyle={{ tintColor: '#fff' }}
          // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
          // navigationBarStyle = {{backgroundColor : '#5B0492'}}
          // backButtonTintColor = '#fff'
          // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
          // hideNavBar={true}
          />
          <Scene
            key="FullMenu"
            component={Menu_Screen}
            title=""
          // backButtonTextStyle = {{color:'#FFFFFF'}}
          // barButtonIconStyle={{ tintColor: '#fff' }}
          // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
          // navigationBarStyle = {{backgroundColor : '#5B0492'}}
          // backButtonTintColor = '#fff'
          // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
          // hideNavBar={true}
          />
          <Scene
            key="Tabel"
            component={Tabel_Reservation_Screen}
            title=""
          // backButtonTextStyle = {{color:'#FFFFFF'}}
          // barButtonIconStyle={{ tintColor: '#fff' }}
          // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
          // navigationBarStyle = {{backgroundColor : '#5B0492'}}
          // backButtonTintColor = '#fff'
          // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
          // hideNavBar={true}
          />
          <Scene
            key="SingleFood"
            component={Single_FoodInfo_Screen}
            title=""
          // backButtonTextStyle = {{color:'#FFFFFF'}}
          // barButtonIconStyle={{ tintColor: '#fff' }}
          // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
          // navigationBarStyle = {{backgroundColor : '#5B0492'}}
          // backButtonTintColor = '#fff'
          // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
          // hideNavBar={true}
          />
          <Scene
            key="Cart"
            component={Cart_Screen}
            title=""
          // backButtonTextStyle = {{color:'#FFFFFF'}}
          // barButtonIconStyle={{ tintColor: '#fff' }}
          // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
          // navigationBarStyle = {{backgroundColor : '#5B0492'}}
          // backButtonTintColor = '#fff'
          // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
          // hideNavBar={true}
          />
          <Scene
            key="Pay"
            component={StripeGateway}
            title=""
          // backButtonTextStyle = {{color:'#FFFFFF'}}
          // barButtonIconStyle={{ tintColor: '#fff' }}
          // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
          // navigationBarStyle = {{backgroundColor : '#5B0492'}}
          // backButtonTintColor = '#fff'
          // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
          // hideNavBar={true}
          />
          <Scene
            key="Tranding"
            component={Single_Tranding_Screen}
            title=""
          // backButtonTextStyle = {{color:'#FFFFFF'}}
          // barButtonIconStyle={{ tintColor: '#fff' }}
          // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
          // navigationBarStyle = {{backgroundColor : '#5B0492'}}
          // backButtonTintColor = '#fff'
          // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
          // hideNavBar={true}
          />
          <Scene
            key="Location"
            component={Location_Pickup_Screen}
            title=""
          // backButtonTextStyle = {{color:'#FFFFFF'}}
          // barButtonIconStyle={{ tintColor: '#fff' }}
          // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
          // navigationBarStyle = {{backgroundColor : '#5B0492'}}
          // backButtonTintColor = '#fff'
          // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
          // hideNavBar={true}
          />
          <Scene
            key="Address"
            component={Search_Address_Screen}
            title=""
          // backButtonTextStyle = {{color:'#FFFFFF'}}
          // barButtonIconStyle={{ tintColor: '#fff' }}
          // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
          // navigationBarStyle = {{backgroundColor : '#5B0492'}}
          // backButtonTintColor = '#fff'
          // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
          // hideNavBar={true}
          />
          <Scene
            key="CurrentLoc"
            component={Current_Location_Pick_Screen}
            title=""
          // backButtonTextStyle = {{color:'#FFFFFF'}}
          // barButtonIconStyle={{ tintColor: '#fff' }}
          // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
          // navigationBarStyle = {{backgroundColor : '#5B0492'}}
          // backButtonTintColor = '#fff'
          // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
          // hideNavBar={true}
          />
          <Scene
            key="SingleDeal"
            component={Single_Deals_Info_Screen}
            title=""
          // backButtonTextStyle = {{color:'#FFFFFF'}}
          // barButtonIconStyle={{ tintColor: '#fff' }}
          // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
          // navigationBarStyle = {{backgroundColor : '#5B0492'}}
          // backButtonTintColor = '#fff'
          // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
          // hideNavBar={true}
          />
          <Scene
            key="OrderSt"
            component={Order_Pendding_Screen}
            title=""
          // backButtonTextStyle = {{color:'#FFFFFF'}}
          // barButtonIconStyle={{ tintColor: '#fff' }}
          // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
          // navigationBarStyle = {{backgroundColor : '#5B0492'}}
          // backButtonTintColor = '#fff'
          // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
          // hideNavBar={true}
          />

          <Scene
            key="resetPass"
            component={Reset_Password_Screen}
            path={"/password-reset/?q=token&q=username"}
            title=""
          // backButtonTextStyle = {{color:'#FFFFFF'}}
          // barButtonIconStyle={{ tintColor: '#fff' }}
          // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
          // navigationBarStyle = {{backgroundColor : '#5B0492'}}
          // backButtonTintColor = '#fff'
          // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
          // hideNavBar={true}
          />
          <Scene
            key="forgetPass"
            component={Request_Reset_Password_Screen}
            title=""
          // backButtonTextStyle = {{color:'#FFFFFF'}}
          // barButtonIconStyle={{ tintColor: '#fff' }}
          // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
          // navigationBarStyle = {{backgroundColor : '#5B0492'}}
          // backButtonTintColor = '#fff'
          // leftButtonStyle = {{color : '#fff',tintColor : '#fff'}}
          // hideNavBar={true}
          />


        </Stack>
      </Router>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  app_logs: {
    width: wp('10%'),
    height: hp('5%'),
    alignContent: 'center',
    alignItems: 'center',
    resizeMode: "contain",
  },
  app_logs_holder: {
    width: wp('10%'),
    height: hp('5%'),
    alignContent: 'center',
    alignItems: 'center',
  },
  navBarStyles: {
    width: wp('100%'),
    height: hp('8%'),
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;

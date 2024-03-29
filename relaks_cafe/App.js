/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { PropTypes, Component, useState, useEffect } from 'react';
//import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Platform
} from 'react-native';


import { io, Socket, Manager } from 'socket.io-client';

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
import Add_ToFav_Location_Screen from './src/screen/Location_pickup_screen/add_toFav_location_screen';
import Social_Auth_Screen from './src/screen/social_auth_screen/social_auth_screen';


import { Stack, Router, Scene, ActionConst } from 'react-native-router-flux';

import app_logo from './src/assert/images/splash_app_logo.png';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Provider } from 'react-redux';
import { Store } from './src/redux/store';

import NotificationHandler from './src/assert/notification/notficationHandler';
import PushNotification, { Importance } from 'react-native-push-notification';

import RefundPayement from './src/componet/refundPayemnt';


const SOKCET_SERVER_ADDRESS = "http://cafeappapi-env.eba-5w53m5sm.eu-west-2.elasticbeanstalk.com";

import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/AntDesign';

import {FONT_BOLD,FONT_LIGHT} from './src/assert/key/key';


//tab screen
import Home_Tab_Screen from './src/screen/Tabs/home_tab_screen';
import Deals_Tab_Screen from './src/screen/Tabs/deals_tab_screen';
import Order_Tab_Screen from './src/screen/Tabs/order_tab_screen';
import Resent_Tab_Screen from './src/screen/Tabs/resent_tab_screen';
import More_Tab_Screen from './src/screen/Tabs/more_tab_screen';

const TabIcon = ({ focused, title }) => {

  var imageName = null;
  var colors = null;

  switch (title) {
    case "Home":
      imageName = (focused) ? 'bottombar' : 'home_inactive';
      colors = null;
      break;
    case "Tabel":
      imageName = (focused) ? 'team' : 'team';
      colors = (focused) ? '#EB1F25' : '#757575';
      break;
    case "Order":
      imageName = (focused) ? 'order_active' : 'order_inactive';
      colors = null;
      break;
    case "Deals":
      imageName = (focused) ? 'deals_active' : 'deal_inactive';
      colors = null;
      break;
    case "Recents":
      imageName = (focused) ? 'recent_active' : 'recent_inactive';
      colors = null;
      break;
    case "More":
      imageName = (focused) ? 'more_active' : 'more_inactive';
      colors = null;
      break;
  }


  return (
    <View style={styles.bootmIconHolder}>
      {
        (title != "Tabel") ? <Image source={{ uri: imageName }} style={styles.app_logss} /> : <Icon color={colors} name={imageName} size={20} />
      }
      <Text style={[styles.tabBartext, { color: (focused) ? "#EB1F25" : "#757575" }]}>{title}</Text>
    </View>

  );
}




const App = () => {
  // const App: () => Node = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  const [tokens, setTokens] = useState("");

  useEffect(() => {

    const handler = new NotificationHandler();

    PushNotification.configure({
      onRegister: handler.onRegister.bind(handler),

      onNotification: handler.onNotification.bind(handler),

      onAction: handler.onAction.bind(handler),

      onRegistrationError: handler.onRegistrationError.bind(handler),

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,

      //requestPermissions: true
      requestPermissions: Platform.OS === 'ios',
    });

    getToken();
    createChannel();


    const SOCKETS = io(SOKCET_SERVER_ADDRESS, {
      auth: {
        token: tokens,
      }
    });

    SOCKETS.on('connect', (response) => {
      console.log("connect " + SOCKETS.id);
    });
    SOCKETS.on('order-status', (response) => {
      console.log("linging");
      console.log("socket is on " + SOCKETS.id);
      console.log('message :' + JSON.stringify(response));
      //{"data":"Your order has been accepted"}
      //{"data":"Your order has been cancelled","refId":"12332322332333"}
      var rep = JSON.stringify(response);
      console.log("pass " + response.data);

      if (response.data == "Your order has been accepted") {
        // sucess
        showAppPushNotification("Oder Accepted", "your order is accepted successfully.", "accept", "0", "order");
      } else {
        //cancel
        showAppPushNotification("Oder Cancelled", "Your order has been canceled, Thanks for connecting with relaks radio cafe.", "cancel", response.refId, "order");
        RefundPayement(response.refId).then((response) => {

          console.log("resposne refund " + JSON.stringify(response))

          if (response.status == "succeeded") {
            console.log("refund sucess");
          } else {
            console.log("refund failed");
          }
        }).catch((error) => {
          console.log("error happen when create fefund " + error);
        });
      }


    });
    SOCKETS.on('table-reserve', (response) => {
      console.log("socket is on " + SOCKETS.id);
      console.log('message: ' + response);

      showAppPushNotification("Tabel Reservation Canceled", "Your tabel reservation is canceled, Thanks for connecting with relaks redio cafe", "accept", "0", "tabel");

    });

    //showAppPushNotification();
  }, [tokens]);


  function getToken() {

    AsyncStorage.getItem('UserInfo').then((user) => {

      if (user != null) {
        console.log("local if data " + JSON.stringify(user));
        console.log("home screen");

        var dumy = JSON.parse(user);

        setTokens(dumy.token);
        console.log("store " + JSON.stringify(userObj));

      } else {
        console.log("local else data " + JSON.stringify(user));
        console.log("auth screen");
      }
    });
  }

  function createChannel() {
    PushNotification.createChannel({
      channelId: "1995", // (required)
      channelName: "Relakas channel", // (required)
      channelDescription: "Relakas food app notification channel", // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.DEFAULT, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  function showAppPushNotification(titel, message, status, ref, type) {

    console.log("calling push notification " + titel + " " + message);

    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: "1995", // (required) channelId, if the channel doesn't exist, notification will not trigger.
      ticker: "Relaks Notification Ticker", // (optional)
      showWhen: true, // (optional) default: true
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
      largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      bigText: message, // (optional) default: "message" prop
      subText: "Order Status", // (optional) default: none
      bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
      bigLargeIcon: "ic_launcher", // (optional) default: undefined
      bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
      color: "red", // (optional) default: system default
      vibrate: false, // (optional) default: true
      vibration: 0, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      priority: "default", // (optional) set notification priority, default: high
      visibility: "private", // (optional) set notification visibility, default: private
      ignoreInForeground: false,// (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
      onlyAlertOnce: true, // (optional) alert will open only once with sound and notify, default: false

      when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

      actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

      /* iOS only properties */
      category: "Relakas", // (optional) default: empty string
      subtitle: "My Order", // (optional) smaller title below notification title

      /* iOS and Android properties */
      id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: titel, // (optional)
      message: message, // (required)
      picture: "https://www.example.tld/picture.jpg", // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
      userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: true, // (optional) default: true
      soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      //number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info. 
      repeatTime: 1,
      data: {
        "status": status,
        "ref": ref,
        "type": type
      }
    });
  }

  return (
    <Provider store={Store}>
      <Router uriPrefix={'https://api.relaksradiocafe.com'} >
        <Stack key="root" headerLayoutPreset="center">
          <Scene
            key="splash"
            type="replace"
            component={SplashScreeen}
            initial
            hideNavBar={true}
          />
          <Scene
            key="auth"
            path={"/api/v1/auth/google/success"}
            type="replace"
            component={AuthenticationScreen}
            hideNavBar={true}
            panHandlers={null}
          />

          <Scene
            key="authenticated"
            type="replace"
            tabs={true}
            showLabel={false}
            renderTitle={() => (
              <View style={styles.navBarStyles}>
                <View style={styles.app_logs_holder}>
                  <Image source={{ uri: 'tabbar_icon' }} style={styles.app_logs} />
                </View>
              </View>
            )}
            panHandlers={null}
          >

            {/* <Scene
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
            /> */}

            <Scene key="homeTab" title="Home" icon={TabIcon} type='refresh' >
              <Scene
                key="HomeTab"
                component={Home_Tab_Screen}
                title="Home"
                hideNavBar={true}
              />

              <Scene
                key="MenuList"
                component={SingleMenuItemScreen}
                title=""
                hideNavBar={true}
              />

              <Scene
                key="FullMenu"
                component={Menu_Screen}
                title=""
                // backButtonTextStyle = {{color:'#FFFFFF'}}
                barButtonIconStyle={{ tintColor: '#EB1F25' }}
                // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
                // navigationBarStyle = {{backgroundColor : '#5B0492'}}
                backButtonTintColor='#EB1F25'
                leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
                hideNavBar={true}
              />

              <Scene
                key="SingleFood"
                component={Single_FoodInfo_Screen}
                title=""
                // backButtonTextStyle = {{color:'#FFFFFF'}}
                barButtonIconStyle={{ tintColor: '#EB1F25' }}
                // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
                // navigationBarStyle = {{backgroundColor : '#5B0492'}}
                backButtonTintColor='#EB1F25'
                leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
                hideNavBar={true}
              />

              <Scene
                key="SingleDeal"
                component={Single_Deals_Info_Screen}
                title=""
                navigationBarStyle={{ backgroundColor: '#FFF' }}
                barButtonIconStyle={{ tintColor: '#EB1F25' }}
                backButtonTintColor='#EB1F25'
                leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
                hideNavBar={true}
              />

              <Scene
                key="Tranding"
                component={Single_Tranding_Screen}
                title=""
                // backButtonTextStyle = {{color:'#FFFFFF'}}
                barButtonIconStyle={{ tintColor: '#EB1F25' }}
                // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
                // navigationBarStyle = {{backgroundColor : '#5B0492'}}
                backButtonTintColor='#EB1F25'
                leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
                hideNavBar={true}
              />

            </Scene>
            <Scene key="tableTab" title="Tabel" icon={TabIcon}>
              <Scene
                key="TabelTab"
                component={Tabel_Reservation_Screen}
                title="Tabel"
                hideNavBar={true}
                activeTintColor="#EB1F25"
                showLabel={false}
              />
            </Scene>
            <Scene key="orderTab" title="Order" icon={TabIcon}>
              <Scene
                key="OrderTab"
                component={Order_Tab_Screen}
                title="Order"
                hideNavBar={true}
                activeTintColor="#EB1F25"
                showLabel={false}
              />
            </Scene>
            <Scene key="dealTab" title="Deals" icon={TabIcon}>
              <Scene
                key="DealsTab"
                component={Deals_Tab_Screen}
                title="Deals"
                hideNavBar={true}
                activeTintColor="#EB1F25"
                showLabel={false}
              />
            </Scene>
            <Scene key="recentsTab" title="Recents" icon={TabIcon} showLabel={false}>
              <Scene
                key="RecentsTab"
                component={Resent_Tab_Screen}
                title="Recents"
                hideNavBar={true}
                activeTintColor="#EB1F25"
              />
            </Scene>
            <Scene key="moreTab" title="More" icon={TabIcon}>
              <Scene
                key="MoreTab"
                component={More_Tab_Screen}
                title="More"
                hideNavBar={true}
                activeTintColor="#EB1F25"
                showLabel={false}
              />



            </Scene>
          </Scene>

          {/* </Scene> */}

          <Scene
            key="writeUs"
            component={WriteToUs_Screen}
            title="Write To Us"
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            // backButtonTintColor = '#fff'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
            //hideNavBar={true}
            back={true}
          />
          <Scene
            key="privancy"
            component={PrivencySettingScreen}
            title="Privancy Setting"
            backButtonTextStyle={{ color: '#000' }}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            navigationBarStyle={{ backgroundColor: '#FFF' }}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
            //hideNavBar={true}
            back={true}
          />
          <Scene
            key="FAQ"
            component={FAQ_Screen}
            title="FAQs"
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
            //hideNavBar={true}
            back={true}
          />
          <Scene
            key="Voucher"
            component={Voucher_Screen}
            title="Claim Vouchers"
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
            //hideNavBar={true}
            back={true}
          />
          <Scene
            key="Profile"
            component={Profile_Screen}
            title="Profile Info"
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
            //hideNavBar={true}
            back={true}
          />
          <Scene
            key="Personal"
            component={Personal_Setting_Screen}
            title="Personal Settings"
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
            //hideNavBar={true}
            back={true}
          />
          <Scene
            key="Sub"
            component={SubcriptionScreen}
            title="Claim Subcriptions"
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
            //hideNavBar={true}
            back={true}
          />
          <Scene
            key="Legal"
            component={Leagle_Screen}
            title="Leagl Infomations"
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
            //hideNavBar={true}
            back={true}
          />
          <Scene
            key="Notifi"
            component={NotificationSettingScreen}
            title="Notification Settings"
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
            //hideNavBar={true}
            back={true}
          />
          <Scene
            key="Perfer"
            component={PreferceScreen}
            title="Perferces Infomations"
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
            //hideNavBar={true}
            back={true}
          />

          <Scene
            key="Register"
            component={SignupFormScreen}
            title=""
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
            // hideNavBar={true}
            back={true}
          />

          <Scene
            key="Tabel"
            component={Tabel_Reservation_Screen}
            title=""
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
          // hideNavBar={true}
          />

          <Scene
            key="Cart"
            component={Cart_Screen}
            title="Cart Infomations"
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
            // hideNavBar={true}
            back={true}
          />
          <Scene
            key="Pay"
            component={StripeGateway}
            title="Card Informations"
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
            // hideNavBar={true}
            back={true}
          />

          <Scene
            key="Location"
            component={Location_Pickup_Screen}
            title=""
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
            // hideNavBar={true}
            back={true}
          />
          <Scene
            key="Address"
            component={Search_Address_Screen}
            title=""
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
            // hideNavBar={true}
            back={true}
          />
          <Scene
            key="CurrentLoc"
            component={Current_Location_Pick_Screen}
            title="Current Locations Info"
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
            // hideNavBar={true}
            back={true}
          />

          <Scene
            key="OrderSt"
            component={Order_Pendding_Screen}
            title="Order Status"
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
          // hideNavBar={true}
          back={true}
          />

          <Scene
            key="resetPass"
            component={Reset_Password_Screen}
            path={"/password-reset/?q=token&q=username"}
            title=""
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
          // hideNavBar={true}
          />
          <Scene
            key="forgetPass"
            component={Request_Reset_Password_Screen}
            title=""
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
            // hideNavBar={true}
            back={true}
          />
          <Scene
            key="LocationFav"
            component={Add_ToFav_Location_Screen}
            title="Favorite Locations"
            // backButtonTextStyle = {{color:'#FFFFFF'}}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            // titleStyle = {{color : '#ffffff',fontFamily : 'Roboto-Regular',}}
            // navigationBarStyle = {{backgroundColor : '#5B0492'}}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
            // hideNavBar={true}
            back={true}
          />
          <Scene
            key="social"
            title={"Social Login"}
            component={Social_Auth_Screen}
            //hideNavBar={true}
            //panHandlers={null}
            backButtonTintColor='#EB1F25'
            leftButtonStyle={{ color: '#EB1F25', tintColor: '#EB1F25' }}
            barButtonIconStyle={{ tintColor: '#EB1F25' }}
            back={true}
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
    width: "100%", //wp('100%')
    height: hp('7.5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bootmIconHolder: {
    width: wp('17%'),
    height: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  app_logss: {
    width: wp('5%'),
    height: hp('3%'),
    alignContent: 'center',
    alignItems: 'center',
    resizeMode: "contain",
  },
  tabBartext: {
    fontFamily: FONT_LIGHT, // 'NexaTextDemo-Light',
    fontSize: 12,
    color: '#757575',
    letterSpacing: 0.04,
  },
});

export default App;

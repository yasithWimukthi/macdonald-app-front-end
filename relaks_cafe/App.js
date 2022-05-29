/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

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

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    //  <SplashScreeen/>
    //  <RegisterScreen/>
     <PrivencySettingScreen/>
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
});

export default App;

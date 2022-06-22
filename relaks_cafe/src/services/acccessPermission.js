import { Platform, Alert, Linking } from "react-native";
import { checkMultiplePermission } from "./requestPermission";
import * as RNPermissions from "react-native-permissions";

const CheckLocationPermission = async () => {

    const FINE_LOCATION = Platform.OS === 'ios' ? [] : [RNPermissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]; 
    const COARSE_LOCATION = Platform.OS === 'ios' ? [] : [RNPermissions.PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION];
    const BACKGROUND_LOCATION = Platform.OS === 'ios' ? [] : [RNPermissions.PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION];

    const RESULT_FINE_LOCATION = await checkMultiplePermission(FINE_LOCATION);
    const RESULT_COARSE_LOCATION = await checkMultiplePermission(COARSE_LOCATION);
   // const RESULT_BACKGROUND_LOCATION = await checkMultiplePermission(BACKGROUND_LOCATION);

    // if (!RESULT_FINE_LOCATION) {
    //     Alert.alert(
    //         'Permission Request',
    //         'Please allow permission to access Location',
    //         [
    //             {
    //                 text: 'Go to Settings',
    //                 onPress: () => {
    //                     Linking.openSettings();
    //                 },
    //             },
    //             {
    //                 text: 'Cancel',
    //                 style: 'cancel',
    //               },
    //         ],
    //         { cancelable: false });
    // }

    // if (!RESULT_COARSE_LOCATION) {
    //     Alert.alert(
    //         'Permission Request',
    //         'Please allow permission to access Coarse Location',
    //         [
    //             {
    //                 text: 'Go to Settings',
    //                 onPress: () => {
    //                     Linking.openSettings();
    //                 },
    //             },
    //             {
    //                 text: 'Cancel',
    //                 style: 'cancel',
    //               },
    //         ],
    //         { cancelable: false });
    // }

    // if (!RESULT_BACKGROUND_LOCATION) {
    //     Alert.alert(
    //         'Permission Request',
    //         'Please allow permission to access BackGround Location',
    //         [
    //             {
    //                 text: 'Go to Settings',
    //                 onPress: () => {
    //                     Linking.openSettings();
    //                 },
    //             },
    //             {
    //                 text: 'Cancel',
    //                 style: 'cancel',
    //               },
    //         ],
    //         { cancelable: false });
    // }

    var permissions = {
        "RESULT_FINE_LOCATION" : RESULT_FINE_LOCATION,
        "RESULT_COARSE_LOCATION" : RESULT_COARSE_LOCATION,
       // "RESULT_BACKGROUND_LOCATION" : RESULT_BACKGROUND_LOCATION,
    }

    return permissions;


}

const CheckPushNotificationPermission = async () => {
    
    const VIBRATE = Platform.OS === 'ios' ? [] : [];
    const RECEIVE_BOOT_COMPLETED = Platform.OS === 'ios' ? [] : [];

    if (!VIBRATE) {
        // Alert.alert(
        //     'Permission Request',
        //     'Please allow permission to on vibration',
        //     [
        //         {
        //             text: 'Go to Settings',
        //             onPress: () => {
        //                 Linking.openSettings();
        //             },
        //         },
        //         {
        //             text: 'Cancel',
        //             style: 'cancel',
        //           },
        //     ],
        //     { cancelable: false });
    }

    if (!RECEIVE_BOOT_COMPLETED) {
        // Alert.alert(
        //     'Permission Request',
        //     'Please allow permission to show pushnotification',
        //     [
        //         {
        //             text: 'Go to Settings',
        //             onPress: () => {
        //                 Linking.openSettings();
        //             },
        //         },
        //         {
        //             text: 'Cancel',
        //             style: 'cancel',
        //           },
        //     ],
        //     { cancelable: false });
    }


}

export {CheckLocationPermission};
export {CheckPushNotificationPermission};

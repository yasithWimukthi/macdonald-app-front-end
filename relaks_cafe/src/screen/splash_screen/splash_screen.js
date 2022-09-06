import React, { PropTypes, Component, useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Actions } from 'react-native-router-flux';

//import fils
import app_logo from '../../assert/images/splash_app_logo.png';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo, setCartItems,setFavAddressInfo,setAddressInfo } from '../../redux/actions';

import { io, Socket } from 'socket.io-client';

const SplashScreen = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        chakLocal();

    });

    function chakLocal() {
        setTimeout(() => {
            // Add your logic for the transition

            AsyncStorage.getItem('OrderInfo').then((cart) => {
                if (user != null) {
                    var dumy = JSON.parse(cart);
                    var carObj = {
                        "isDelivery": dumy.isDelivery,
                        "refId": dumy.refId,
                        "noOfItems": parseInt(dumy.noOfItems),
                        "totalPrice": parseFloat(dumy.totalPrice),
                        "promotionId": parseInt(dumy.promotionId),
                        "location": {
                            "latitude": dumy.location.latitude,
                            "longitude": dumy.location.longitude,
                        },
                        "foodItems": dumy.foodItems,
                    }

                    dispatch(setCartItems(carObj));
                } else {
                }

            });

            AsyncStorage.getItem('UserInfo').then((user) => {

                if (user != null) {
                    console.log("local if data " + JSON.stringify(user));
                    console.log("home screen");

                    var dumy = JSON.parse(user);

                    var userObj = {
                        "firstName": dumy.firstName,
                        "lastName": dumy.lastName,
                        "loginType": dumy.loginType,
                        "email": dumy.email,
                        "token": dumy.token,
                        "mobile": dumy.mobile
                    }
                    console.log("store " + JSON.stringify(userObj));
                    dispatch(setUserInfo(userObj));
                    //Actions.resetPass();
                    Actions.authenticated();
                    //Actions.MenuList({ cat_id: "1"});
                } else {
                    console.log("local else data " + JSON.stringify(user));
                    console.log("auth screen");
                   Actions.auth();
                  //Actions.authenticated();
                }
            });

            AsyncStorage.getItem('favAddress').then((favAddress) => {
                if (favAddress != null) {
                    var dumy = JSON.parse(favAddress);
                    //console.log("datass "+JSON.stringify(dumy.favAdd));
                    var objs = {
                        "favAdd" : dumy.favAdd,
                    }
                    //objs.favAdd.push(dumy.favAdd);
                    dispatch(setFavAddressInfo(objs));
                } else {
                }

            });

            AsyncStorage.getItem('addressInfo').then((addressInfo) => {
                if (addressInfo != null) {
                    var dumy = JSON.parse(addressInfo);
                    console.log("datass "+JSON.stringify(dumy));
                    // var objs = {
                    //     "favAdd" : dumy.favAdd,
                    // }
                    dispatch(setAddressInfo(dumy));
                } else {
                }

            });

        }, 3000);
    }

    return (
        <View style={Styles.main}>
            <Image source={app_logo} style={Styles.app_logs} />
        </View>
    );
}

// class splashscreeen extends Component {

//     constructor(props) {
//         super(props);
//     }

//     componentDidMount() {
//         // Start counting when the page is loaded

//         let dispatch = useDispatch();
//         this.timeoutHandle = setTimeout(() => {
//             // Add your logic for the transition

//             AsyncStorage.getItem('UserInfo').then((user) => {
//                 console.log("local data " + JSON.stringify(user));

//                 if (user != null) {
//                     console.log("local if data " + JSON.stringify(user));
//                     console.log("home screen");

//                     var userObj = {
//                         "firstName": user.firstName,
//                         "lastName": user.lastName,
//                         "loginType": user.loginType,
//                         "email": user.email,
//                         "token": user.token
//                     }

//                     console.log("store " + JSON.stringify(userObj));
//                     dispatch(setUserInfo(userObj));
//                     Actions.authenticated();
//                 } else {
//                     console.log("local else data " + JSON.stringify(user));
//                     console.log("auth screen");
//                     Actions.auth();
//                 }

//             });
//         }, 3000);
//     }

//     async checkLocal() {
//         await AsyncStorage.getItem('UserInfo').then((user) => {
//             console.log("local data " + JSON.stringify(user));
//             //return JSON.parse(user);
//             return user;
//             // if (user !== null) {
//             //     console.log(" data "+JSON.parse(user));
//             //     //global.from_reset = 2;

//             //     return JSON.parse(user);
//             // }
//             // else {
//             //     return null;
//             //    // global.from_reset = 0;
//             // }
//         });
//     }

//     componentWillUnmount() {
//         clearTimeout(this.timeoutHandle);
//     }

//     render() {
//         return (
//             <View style={Styles.main}>
//                 <Image source={app_logo} style={Styles.app_logs} />
//             </View>
//         );
//     }

// }

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    app_logs: {
        flex: 1,
        width: wp('40%'),
        height: hp('30%'),
        alignContent: 'center',
        alignItems: 'center',
        resizeMode: "contain",
    }
});

export default SplashScreen;

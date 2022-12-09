import React, { PropTypes, Component, useEffect, useState, } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Button, FlatList, Alert, Linking, Platform, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import { CheckLocationPermission } from '../../services/acccessPermission';
import Geolocation from '@react-native-community/geolocation';

import { PlaceAPI } from '../../assert/key/key';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setAddressInfo, setCartItems, setFavAddressInfo } from '../../redux/actions';
import { StoreFavAddressInfo, StoreAddressInfo } from '../../assert/storeage/data_store';

import * as RNPermissions from "react-native-permissions";
import { checkMultiplePermission } from "../../services/requestPermission";
import AwesomeAlert from 'react-native-awesome-alerts';

import {FONT_BOLD, FONT_LIGHT } from '../../assert/key/key';

const MapTile = ({ favName }) => {

    const { items, address, favaddress } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [latitute, setLatitute] = useState(6.7646273);
    const [longitute, setLongitude] = useState(80.0106965);

    useEffect(() => {
        //check permissoion
        //request permission
        //get current location
        checkLocationPermissions();

    }, []);

    async function checkLocationPermissions() {

        const FINE_LOCATION = Platform.OS === 'ios' ? [RNPermissions.PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] : [RNPermissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
        const COARSE_LOCATION = Platform.OS === 'ios' ? [RNPermissions.PERMISSIONS.IOS.LOCATION_ALWAYS] : [RNPermissions.PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION];
        RNPermissions.checkMultiple(FINE_LOCATION).then((result) => {
            // alert("finlocation " + JSON.stringify(result));
            console.log("finlocation " + JSON.stringify(result['android.permission.ACCESS_FINE_LOCATION']));
            if (Platform.OS === 'android') {
                //android
                if (result['android.permission.ACCESS_FINE_LOCATION'] === 'granted') {

                    RNPermissions.checkMultiple(COARSE_LOCATION).then((res) => {
                        if (Platform.OS === 'android') {
                            if (res['android.permission.ACCESS_COARSE_LOCATION'] === 'granted') {
                                getCurrentLocationInfo();
                            } else {
                                //reqst
                                Alert.alert(
                                    'Permission Request',
                                    'Please allow permission to access Location',
                                    [
                                        {
                                            text: 'Go to Settings',
                                            onPress: () => {
                                                Linking.openSettings();
                                            },
                                        },
                                        {
                                            text: 'Cancel',
                                            style: 'cancel',
                                        },
                                    ],
                                    { cancelable: false });
                            }
                        } else {
                            //ios
                            if (res['ios.permission.LOCATION_ALWAYS'] === 'granted') {

                            } else {

                            }
                        }
                    }).catch((erros) => {
                        console.log("when use location error " + JSON.stringify(erros));
                    });

                } else {
                    //request
                    Alert.alert(
                        'Permission Request',
                        'Please allow permission to COARSE Location',
                        [
                            {
                                text: 'Go to Settings',
                                onPress: () => {
                                    Linking.openSettings();
                                },
                            },
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                        ],
                        { cancelable: false });
                }
            } else {
                //ios
                if (result['ios.permission.LOCATION_WHEN_IN_USE'] === 'granted') {

                } else {
                    //request
                }
            }
        }).catch((error) => {
            //alert("finlocation error " + JSON.stringify(error));
            console.log("finlocation error " + JSON.stringify(error));
        })

    }

    function getCurrentLocationInfo() {
        Geolocation.getCurrentPosition((position) => {
            var latitute = position.coords.latitude;
            var longitute = position.coords.longitude;

            console.log("data " + latitute + " logi " + longitute);
            setLatitute(latitute);
            setLongitude(longitute);


        }, (error) => {
            console.log("get current location error " + error);
        },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            });
    }

    function updateDragLocation(coord) {

        setLatitute(coord.latitude);
        setLongitude(coord.longitude);

        console.log("drag location " + JSON.stringify(coord));

        getRelatedAddressForCoordinate(coord.latitude, coord.longitude);

    }

    function getRelatedAddressForCoordinate(latitute, longitute) {

        var codes = latitute + "," + longitute;

        // console.log("checks " + codes);

        axios.request({
            method: "POST",
            url: `https://maps.googleapis.com/maps/api/geocode/json?key=${PlaceAPI}&latlng=${codes}`,
        }).then((response) => {
            //console.log("data from coodeinates api " + JSON.stringify(response.data.results[0].formatted_address));
            var address_Info = response.data.results[0].formatted_address;
            var orderObj = {
                "isDelivery": items.isDelivery,
                "refId": items.refId,
                "noOfItems": items.noOfItems, //qty
                "totalPrice": items.totalPrice,
                "promotionId": items.promotionId,
                "location": {
                    "latitude": latitute,
                    "longitude": longitute
                },
                "foodItems": items.foodItems,
            };

            var addressObj = {
                "mainAddress": address_Info,
                "subAddress": "",
                "location": {
                    "latitude": latitute,
                    "longitude": longitute
                }
            }

            var fav_list = favaddress.favAdd;

            console.log("ref list " + JSON.stringify(fav_list));

            // const tempFavArry = fav_list.filter(item => item.favName == "defult");

            var favAddress = {
                "favName": favName,
                "mainAddress": address_Info,
                "subAddress": "",
                "location": {
                    "latitude": latitute,
                    "longitude": longitute
                }
            }

            var objs = {
                "favAdd": fav_list
            }

            objs.favAdd.push(favAddress);

            //fav_list.push(favAddress);

            dispatch(setCartItems(orderObj));
            dispatch(setAddressInfo(addressObj));
            dispatch(setFavAddressInfo(objs));
            StoreFavAddressInfo(objs);
            StoreAddressInfo(addressObj);

        }).catch((error) => {
            console.log("error happen when get address locartion " + error);
        });
    }

    return (
        <View style={Styles.mapTileContainer}>
            <View style={Styles.mapTileHolder}>
                <MapView
                    style={Styles.mapViews}
                    initialRegion={{
                        latitude: latitute,
                        longitude: longitute,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >

                    <Marker
                        coordinate={{
                            latitude: latitute,
                            longitude: longitute,
                        }}
                        //onSelect={e => { console.log('onSelect' + e) }}
                        // onDrag={e => { console.log(('onDrag', e)) }}
                        // onDragStart={e => { console.log(('onDragStart', e)) }}
                        onDragEnd={(e) => { updateDragLocation(e.nativeEvent.coordinate) }}
                        onPress={e => { console.log(('onPress', e)) }}
                        draggable
                    />

                </MapView>
            </View>
        </View>
    );

}

const SearchViewInputTile = ({ updateList, updateVisible, updatefavName }) => {

    const { items, address, favaddress } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [place, setPlace] = useState("");
    const [locationNam, setLocationNam] = useState("");

    const [placeList, setPlaceList] = useState([]);

    const serachLocation = async (text) => {

        //console.log("calling serch " + text);

        setPlace(text);
        updateVisible(true);

        axios.request({
            method: "POST",
            url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${PlaceAPI}&input=${place}`,
        }).then((response) => {

            //console.log("data from place api " + JSON.stringify(response.data.status));
            updateList(response.data.predictions);
            setPlaceList(response.data.predictions);

        }).catch((error) => {
            console.log("error happen when get address locartion " + error);
        });
    }

    const getGeoCodeByPlaceId = async (placeID, address1, address2) => {
        axios.request({
            method: "POST",
            url: `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeID}&key=${PlaceAPI}`,
        }).then((response) => {

            //console.log("data from place geo " + JSON.stringify(response.data));
            //alert("geo code " + JSON.stringify(response.data.results[0].geometry.location));

            var logitute = response.data.results[0].geometry.location.lng;
            var latititue = response.data.results[0].geometry.location.lat;

            var orderObj = {
                "isDelivery": items.isDelivery,
                "refId": items.refId,
                "noOfItems": items.noOfItems, //qty
                "totalPrice": items.totalPrice,
                "promotionId": items.promotionId,
                "location": {
                    "latitude": latititue,
                    "longitude": logitute
                },
                "foodItems": items.foodItems,
            };

            var addressObj = {
                "mainAddress": address1,
                "subAddress": address2,
                "location": {
                    "latitude": latititue,
                    "longitude": logitute
                }
            }

            //check defulat one remove
            // added newly added location
            var fav_list = favaddress.favAdd;

            console.log("favsss " + JSON.stringify(favaddress));

            //  const tempFavArry = fav_list.filter(item => item.favName == "defult");

            var favAddress = {
                "favName": locationNam,
                "mainAddress": address1,
                "subAddress": address2,
                "location": {
                    "latitude": latititue,
                    "longitude": logitute
                }
            }
            var objs = {
                "favAdd": fav_list
            }

            objs.favAdd.push(favAddress);
            // fav_list.push(favAddress);

            dispatch(setCartItems(orderObj));
            dispatch(setAddressInfo(addressObj));
            dispatch(setFavAddressInfo(objs));
            StoreFavAddressInfo(objs);
            StoreAddressInfo(addressObj);

            setPlace("");
            setPlace(address1);


            // alert("done, state update");
            //redirct to prevois screen

        }).catch((error) => {
            console.log("error happen when get address locartion " + error);
        });
    }

    return (
        <View style={Styles.searchInputContainer}>
            <View style={Styles.searchInputHolder}>
                <View style={Styles.searchHolder}>
                    <TextInput
                        style={Styles.serachTextInput}
                        placeholder="Location Name"
                        placeholderTextColor="#000"
                        value={locationNam}
                        onChangeText={(text) => { setLocationNam(text); updatefavName(text); }}

                    />
                </View>
                <View style={Styles.searchHolder}>
                    <TextInput
                        style={Styles.serachTextInput}
                        placeholder="Search for an address"
                        placeholderTextColor="#000"
                        value={place}
                        onChangeText={(text) => { serachLocation(text); }}

                    />
                </View>
            </View>

            <View style={Styles.ListContainer}>
                <View style={Styles.ListHolder}>
                    <FlatList
                        data={placeList}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => {
                            // console.log("data " + item.place_id);
                            return (
                                <TouchableOpacity onPress={() => { getGeoCodeByPlaceId(item.place_id, item.structured_formatting.main_text, item.description) }}>
                                    <View style={Styles.resultInputContainer}>
                                        <View style={Styles.resultInputHolder}>
                                            <View style={Styles.iconHolder}>
                                                <View style={Styles.roundView}>
                                                    <Icon color="#000" name="enviroment" size={30} />
                                                </View>
                                            </View>
                                            <View style={Styles.infoHolder}>
                                                <Text style={Styles.resultTextBold}>{item.structured_formatting.main_text}</Text>
                                                <Text style={Styles.resultTextLight}>{item.description}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}

                    />
                </View>
            </View>

        </View>
    );
}

const BtnAddFavView = ({ funtions }) => {
    return (
        <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={funtions}>
                <View style={[Styles.btnBorder, { backgroundColor: '#EB1F25', borderWidth: 0 }]}>
                    <View style={Styles.btn_icon_holder}>
                        {/* <Icon color="#4285F4" name="google" size={30} /> */}
                    </View>
                    <View style={Styles.btn_text_holder_login}>
                        <Text style={Styles.brtn_text_content}>Add To Favourite</Text>
                    </View>
                    <View style={Styles.btn_icon_holder}>
                        {/* <Icon color="#000" name="right" size={30} /> */}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const Add_ToFav_Location_Screen = () => {

    const [showResult, setShowResult] = useState(false);
    const [listResult, setListResult] = useState([]);

    const [favNm, setFavNm] = useState("");

    const { favaddress } = useSelector(state => state.userReducer);

    const [show, setShow] = useState(false);
    const [modelTitel, setModelTitel] = useState("");
    const [modelMessage, setModelMessage] = useState("");

    function addToFavLocations() {
        //update redux store
        //save local fav list

        if (favNm != null && favNm != "") {
            StoreFavAddressInfo(favaddress);
            //alert("successfully added to fav");
            setModelTitel("successfull");
            setModelMessage("successfully added to fav list");
            setShow(true);
        } else {
            setModelTitel("Plase fill favourite name");
            setModelMessage("Before add to favorite, plase give a fav name.");
            setShow(true);
        }


    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={Styles.main}>
                <SearchViewInputTile updateList={setListResult} updateVisible={setShowResult} updatefavName={setFavNm} />

                <MapTile favName={favNm} />

                <BtnAddFavView funtions={() => { addToFavLocations(); Actions.pop(); }} />

                <AwesomeAlert
                    show={show}
                    showProgress={false}
                    title={modelTitel}
                    message={modelMessage}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    cancelText="cancel"
                    confirmText="Ok"
                    confirmButtonColor="red" //#DD6B55
                    onCancelPressed={() => {
                        setShow(false);
                    }}
                    onConfirmPressed={() => {
                        setShow(false);
                    }} />

            </View>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        //flexDirection: 'row',
        alignContent: 'center',
        //alignItems: 'center'
    },
    mapTileContainer: {
        width: wp('100%'),
        height: hp('40%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    mapTileHolder: {
        width: wp('90%'),
        height: hp('38%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapViews: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    searchInputContainer: {
        width: wp('100%'),
        height: hp('60%'),
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    searchInputHolder: {
        width: wp('90%'),
        height: hp('18%'),
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    searchHolder: {
        width: wp('90%'),
        height: hp('8%'),
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 2,
        marginTop: 3,
        borderColor: '#f5f5f5'
    },
    serachTextInput: {
        fontFamily: FONT_BOLD ,// 'NexaTextDemo-Bold',
        fontSize: 15,
        color: '#000',
        letterSpacing: 0.04,
        marginLeft: 10,
    },
    resultInputContainer: {
        width: wp('100%'),
        height: hp('10%'),
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        // backgroundColor: 'yellow',
        marginTop: 3,
        marginBottom: 2,
        borderRadius: 5,
    },
    resultInputHolder: {
        width: wp('90%'),
        height: hp('8%'),
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink',
        flexDirection: 'row'
    },
    iconHolder: {
        width: wp('15%'),
        height: hp('6%'),
        justifyContent: 'center',
        //backgroundColor: '#FFF',
    },
    infoHolder: {
        width: wp('65%'),
        height: hp('6%'),
        justifyContent: 'center',
        //backgroundColor: '#FFF',
    },
    roundView: {
        width: wp('12%'),
        height: hp('6%'),
        borderRadius: hp('6%'),
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        alignItems: 'center'
    },
    resultTextBold: {
        fontFamily: FONT_BOLD, // 'NexaTextDemo-Bold',
        fontSize: 15,
        color: '#000',
        letterSpacing: 0.04,
        marginLeft: 5,
    },
    resultTextLight: {
        fontFamily: FONT_LIGHT , // 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.04,
        marginLeft: 5,
    },
    ListContainer: {
        width: wp('100%'),
        height: hp('35%'),
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#FFF'
    },
    ListHolder: {
        width: wp('90%'),
        height: hp('35%'),
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    btnContainer: {
        //flex: 1,
        width: wp('100%'),
        height: hp('8%'),
        // backgroundColor:'pink',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
    },
    btnBorder: {
        width: wp("90%"),
        height: hp('7%'),
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_icon_holder: {
        width: "20%",
        height: hp('5%'),
        alignItems: 'center'
        , justifyContent: 'center'
    },
    btn_text_holder: {
        width: "60%",
        height: hp('5%'),
        justifyContent: 'center'
    },
    btn_text_holder_login: {
        width: "60%",
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    brtn_text_content: {
        fontFamily: FONT_BOLD, // 'NexaTextDemo-Bold',
        fontSize: 16,
        color: '#000'
    },
    screenTitel: {
        marginTop: hp('3%'),
        marginBottom: hp('3%'),
    },
});

export default Add_ToFav_Location_Screen;
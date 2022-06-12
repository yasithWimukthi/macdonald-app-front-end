import React, { PropTypes, Component, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Button, FlatList, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { PlaceAPI } from '../../assert/key/key';

import { useSelector, useDispatch } from 'react-redux';
import { setAddressInfo, setCartItems } from '../../redux/actions';

const AddressTile = () => {
    return (
        <View style={Styles.resultInputContainer}>
            <View style={Styles.resultInputHolder}>
                <View style={Styles.iconHolder}>
                    <View style={Styles.roundView}>
                        <Icon color="#000" name="enviroment" size={30} />
                    </View>
                </View>
                <View style={Styles.infoHolder}>
                    <Text style={Styles.resultTextBold}>Address</Text>
                    <Text style={Styles.resultTextLight}>Sub Address</Text>
                </View>
            </View>
        </View>
    );
}

const SearchViewInputTile = ({ updateList, updateVisible }) => {

    const { items, address } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [place, setPlace] = useState("");

    const [placeList, setPlaceList] = useState([]);

    const serachLocation = async (text) => {
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

            console.log("data from place geo " + JSON.stringify(response.data));
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

            dispatch(setCartItems(orderObj));
            dispatch(setAddressInfo(addressObj));

            alert("done, state update");
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
                        placeholder="Search for an address"
                        placeholderTextColor="#000"
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
                            console.log("data " + item.place_id);
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

const Search_Address_Screen = () => {

    const [showResult, setShowResult] = useState(false);
    const [listResult, setListResult] = useState([]);

    return (
        <View style={Styles.main}>
            <SearchViewInputTile updateList={setListResult} updateVisible={setShowResult} />
            {/* <AddressTile /> */}



        </View>
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
    searchInputContainer: {
        width: wp('100%'),
        height: hp('100%'),
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    searchInputHolder: {
        width: wp('90%'),
        height: hp('10%'),
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    searchHolder: {
        width: wp('90%'),
        height: hp('8%'),
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#f5f5f5'
    },
    serachTextInput: {
        fontFamily: 'NexaTextDemo-Bold',
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
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 15,
        color: '#000',
        letterSpacing: 0.04,
        marginLeft: 5,
    },
    resultTextLight: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.04,
        marginLeft: 5,
    },
    ListContainer: {
        width: wp('100%'),
        height: hp('70%'),
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#FFF'
    },
    ListHolder: {
        width: wp('90%'),
        height: hp('70%'),
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
});

export default Search_Address_Screen;
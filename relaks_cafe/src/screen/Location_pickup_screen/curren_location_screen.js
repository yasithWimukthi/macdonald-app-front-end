import React, { PropTypes, Component, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Button, FlatList, SafeAreaView,Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { position } from 'native-base/lib/typescript/theme/styled-system';

const MapTile = () => {

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [coordinates, setCoordinates] = useState([]);
    const [region, setRegion] = useState([]);

    const _goToInitialLocation = () => {
        let initialRegion = Object.assign({}, region);
        initialRegion["latitudeDelta"] = 0.005;
        initialRegion["longitudeDelta"] = 0.005;
        this.mapView.animateToRegion(initialRegion, 2000);
    }

    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                var dt = {
                    "latitude": position.coords.latitude,
                    "longitude": position.coords.longitude
                }
                let region = {
                    "latitude": parseFloat(position.coords.latitude),
                    "longitude": parseFloat(position.coords.longitude),
                    "latitudeDelta": 5,
                    "longitudeDelta": 5
                };
                setRegion(region);
                setCoordinates(dt);
            },
            error => {
                console.log("get current location error " + error);
            },
            {
                showLocationDialog: true,
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 0
            }
        );
    }, []);



    return (
        <MapView
            //provider={PROVIDER_GOOGLE}
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null }
            style={{ flex: 1 }}
            initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 5,
                longitudeDelta: 5
            }}
            // initialRegion={region}
            followUserLocation={true}
            showsUserLocation={true}
        // onMapReady={_goToInitialLocation}
        >
            <Marker
                coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                }}></Marker>
        </MapView>
    );
}


const Current_Location_Pick_Screen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={Styles.main}>
                <MapTile />
            </View>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        //flexDirection: 'row',
        alignContent: 'center',
        //alignItems: 'center'
    },
});

export default Current_Location_Pick_Screen;
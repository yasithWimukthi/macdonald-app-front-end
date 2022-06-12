import React, { PropTypes, Component, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Button, FlatList, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';



const SearchTileView = () => {
    return (
        <TouchableOpacity onPress={()=>{Actions.Address();}}>
            <View style={Styles.main_Container}>
            <View style={Styles.main_Holder}>
                <View style={Styles.continer_Holder}>
                    <View style={Styles.TileIconHolder}>
                        <Icon color="#000" name="enviroment" size={30} />
                    </View>
                    <View style={Styles.TileTextHolder}>
                        <Text style={Styles.textView}>Search for an address</Text>
                    </View>
                    <View style={Styles.TileIconHolder2}>
                        <Icon color="#000" name="search1" size={20} />
                    </View>
                </View>
            </View>
        </View>
        </TouchableOpacity>
    );
}

const CurrentLocationTileView = () => {
    return (
        <TouchableOpacity onPress={()=>{Actions.CurrentLoc();}}>
            <View style={Styles.main_Container}>
            <View style={Styles.main_Holder}>
                <View style={Styles.continer_Holder}>
                    <View style={Styles.TileIconHolder}>
                        <Icon color="#000" name="find" size={30} />
                    </View>
                    <View style={Styles.TileTextHolder}>
                        <Text style={Styles.textView}>Current Location</Text>
                    </View>
                    <View style={Styles.TileIconHolder}>
                        {/* <Icon color="#000" name="search1" size={20} /> */}
                    </View>
                </View>
            </View>
        </View>
        </TouchableOpacity>
    );
}


const Location_Pickup_Screen = () => {
    return (
        <View style={Styles.main}>
            <SearchTileView />
            <CurrentLocationTileView />

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
    main_Container: {
        width: wp('100%'),
        height: hp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    main_Holder: {
        width: wp('100%'),
        height: hp('10%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'

    },
    continer_Holder: {
        width: wp('90%'),
        height: hp('10%'),
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#fff',
        flexDirection: 'row'

    },
    TileIconHolder: {
        width: wp('20%'),
        height: hp('8%'),
        justifyContent: 'center',
        alignItems:'center',
    },
    TileIconHolder2: {
        width: wp('20%'),
        height: hp('8%'),
        justifyContent: 'center',
        alignItems:'flex-end',
    },
    TileTextHolder: {
        width: wp('50%'),
        height: hp('8%'),
        justifyContent: 'center',
    },
    textView: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 15,
        color: '#000',
        letterSpacing: 0.04,
    }
});

export default Location_Pickup_Screen;
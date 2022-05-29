import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import { Container } from 'native-base';

const TitelComponet = () => {
    return (
        <View style={Styles.titel_content}>
            <View style={Styles.titel_hold}>
                <Text style={Styles.titel_heder}>Strat an Order</Text>
            </View>
            <View style={Styles.titel_discription_holder}>
                <Text style={Styles.titel_description}>product pricing and avalibility may change depend upon {"\n"}your location.</Text>
            </View>
        </View>
    );
}

const PicupTiles = () => {
    return (
        <View style={Styles.tileHolder}>
            <View style={Styles.tileContent}>
                <View style={Styles.tile_row}>
                    {/* add picup icon */}

                </View>
                <View style={Styles.tile_row_text}>
                    <Text style={Styles.titel_description_hed}>PickUp</Text>
                    <Text style={Styles.titel_description}>2 BELLFIELD INTERCHANGE SERVICE {"\n"}KILMARNROCK,</Text>
                </View>
                <View style={Styles.tile_row}>
                    <Icon color="#000" name="right" size={40} />
                </View>
            </View>
        </View>
    );
}

const DelivaryTile = () => {
    return (
        <View style={Styles.tileHolder}>
            <View style={Styles.tileContent}>
            <View style={Styles.tile_row}>
                    {/* add picup icon */}
                </View>
                <View style={Styles.tile_row_text}>
                    <Text style={Styles.titel_description_hed}>RcDelivery</Text>
                    <Text style={Styles.titel_description}>Delivery/service fee will apply.</Text>
                </View>
                <View style={Styles.tile_row}>
                <Icon color="#000" name="right" size={40} />
                </View>
            </View>
        </View>
    );
}

const BottomDescriptionTile = () => {
    return (
        <View style={Styles.bottomDescription}>
            <View style={Styles.bottomDescriptionContent}>
                <View>
                    <Text style={Styles.titel_botttom_titel}>RcDelivery</Text>
                </View>
                <View>
                    <Text style={Styles.titel_botttom_description}>Available at parcitipating Relaks Delivery prices may be higher than {"\n"} resturents, Price promtion may not apply, Uber Eats delivery/service {"\n"} frees will apply. </Text>
                </View>
            </View>
        </View>
    );
}


function resent_tab_screen() {
    return (
        <View style={Styles.main}>
            <View style={Styles.titel_holder}>
                <TitelComponet />
            </View>
            <View style={Styles.titel_holder}>
                <PicupTiles />
            </View>
            <View style={Styles.titel_holder}>
                <DelivaryTile />
            </View>
            <View style={Styles.titel_holder}>
                <BottomDescriptionTile />
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        //flexDirection: 'row',
        alignContent: 'center',
        //alignItems: 'center'
    },
    titel_holder: {
        width: wp('100%'),
        height: hp('20%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    titel_content: {
        width: wp('90%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    titel_hold: {
        width: wp('90%'),
        height: hp('5%'),
        justifyContent: 'center'
    },
    titel_discription_holder: {
        width: wp('90%'),
        height: hp('5%'),
        justifyContent: 'center'
    },
    titel_heder: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 20,
        color: '#000',
        letterSpacing: 0.25,
    },
    titel_description: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.25,
    },
    titel_description_hed: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 16,
        color: '#000',
        letterSpacing: 0.25,
    },
    tileHolder: {
        width: wp('100%'),
        height: hp('20%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    tileContent: {
        width: wp('90%'),
        height: hp('18%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp('5%'),
        backgroundColor: '#FFF',
        flexDirection: 'row'
    },
    bottomDescription: {
        width: wp('100%'),
        height: hp('20%'),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    },
    bottomDescriptionContent: {
        width: wp('90%'),
        height: hp('15%'),
        //alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    },
    titel_botttom_description: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 12,
        color: '#000',
        letterSpacing: 0.15,
    },
    titel_botttom_titel: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 13,
        color: '#000',
        letterSpacing: 0.25,
    },
    tile_row : {
        width: wp('10%'),
        height: hp('15%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    tile_row_text : {
        width: wp('70%'),
        height: hp('15%'),
       // alignItems: 'center',
        justifyContent: 'center',
    }

});

export default resent_tab_screen;
import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/EvilIcons';


const TitelsComponet = () => {
    return (
        <View style={Styles.titel_content}>
            <View style={Styles.titel_holder}>
                <View style={Styles.titel_con}>
                    <Text style={Styles.titelUI}>Deals</Text>
                </View>
            </View>
        </View>
    );
}

const Details_tile = () => {
    return (
        <View style={Styles.tileConten}>
            <View elevation={2} style={Styles.tileHolder}>
                <Image resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: wp('5%') }} source={{ uri: 'https://st4.depositphotos.com/14582236/22073/v/950/depositphotos_220731050-stock-illustration-cold-brewed-coffee-banner-ads.jpg' }} />
                <View style={Styles.titelUIBtn}>
                    <Text style={Styles.Btn_ui}>Start Earing</Text>
                </View>
            </View>
            <View style={Styles.tileDescriptionHolder}>
                <Text style={Styles.details_ui}>* Offer valid only for full-price Relacas Cafe drinks.</Text>
                <Text style={Styles.details_ui}>Valid at part RcD true 31/05/2022</Text>
            </View>
        </View>
    );
}

const BannerComponet = () => {
    return (
        <View style={Styles.tileConten}>
            <View elevation={2} style={Styles.bannerHolder}>
                <View style={Styles.bannerImageHolder}>
                    <Image style={{ width: '100%', height: '100%', borderRadius: wp('1%') }} source={{ uri: 'https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg' }} resizeMode='cover' />
                </View>
                <View style={Styles.bannerDetailsHolder}>
                    <View style={Styles.bannerRowDteials}>
                        <Icon color="#FFE800" name="tag" size={25} />
                        <Text style={Styles.bannertextBold}>Pickup Only</Text>
                    </View>
                    <View style={Styles.bannerDteials}>
                        <Text style={Styles.bannertextBold}>99p Quarter PounderTM with {'\n'} Cheese! </Text>
                    </View>
                    <View style={Styles.bannerDteials}>
                        <Text style={Styles.bannertextLight}>Make it a Relaca's Monday! {'\n'}Order and pick-up now! </Text>
                    </View>
                    <View style={[Styles.bannerDteials, { marginTop: hp('2%') }]}>
                        <Text style={Styles.bannertextLightInfo}>Expire Today </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

function deals_tab_screen() {
    return (
        <View style={Styles.main}>
            {/* <TitelsComponet /> */}
            <View >
                <Details_tile />
            </View>

            <View style={{ marginTop: hp('3%') }}>
                <BannerComponet />
            </View>

            <View style={{ marginTop: hp('1%') }}>
                <BannerComponet />
            </View>


        </View>

    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        //backgroundColor: "#F5F5F5",
        //flexDirection: 'row',
        alignContent: 'center',
        //alignItems: 'center'
    },
    titel_content: {
        width: wp('100%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    titel_holder: {
        width: wp('90%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    titel_con: {
        width: wp('90%'),
        height: hp('3%'),
    },
    titelUI: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 18,
        color: '#000',
        letterSpacing: 0.25,
    },
    tileConten: {
        width: wp('100%'),
        height: hp('25%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    tileHolder: {
        width: wp('90%'),
        height: hp('22%'),
        //alignItems:'center',
        justifyContent: 'center',
        borderRadius: wp('2%'),
        //backgroundColor:'#FFE800'
    },
    bannerHolder: {
        width: wp('90%'),
        height: hp('20%'),
        //alignItems:'center',
        justifyContent: 'center',
        borderRadius: wp('2%'),
        backgroundColor: '#FFF',
        flexDirection:'row'
    },
    tileDescriptionHolder: {
        width: wp('90%'),
        height: hp('2%'),
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: hp('2%'),
    },
    titelUIBtn: {
        width: wp('30%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderRadius: wp('3%'),
        position: 'absolute',
        left: 50,
        bottom: 50,
        top: 100

    },
    Btn_ui: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.25,
    },
    details_ui: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 12,
        color: '#000',
        letterSpacing: 0.25,
    },
    bannerImageHolder: {
        width: wp('30%'),
        height: hp('20%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    bannerDetailsHolder: {
        width: wp('60%'),
        height: hp('20%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    bannerRowDteials: {
        width: wp('60%'),
        height: hp('3%'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'flex-start'
    },
    bannerDteials: {
        width: wp('60%'),
        height: hp('4%'),
        flexDirection: 'row',
        justifyContent: 'center',
    },
    bannertextBold: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 13,
        color: '#000',
        letterSpacing: 0.25,
    },
    bannertextLight: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 13,
        color: '#000',
        letterSpacing: 0.25,
    },
    bannertextLightInfo: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 12,
        color: '#000',
        letterSpacing: 0.25,
    }
});

export default deals_tab_screen;
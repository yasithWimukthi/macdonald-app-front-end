import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';


const BannerTile = () => {
    return (
        <View style={Styles.BtileConten}>
            <View style={Styles.BtileHolder}>
                <Image resizeMode='cover' style={{ width: '100%', height: '100%', }} source={{ uri: 'https://st4.depositphotos.com/14582236/22073/v/950/depositphotos_220731050-stock-illustration-cold-brewed-coffee-banner-ads.jpg' }} />
                <View style={Styles.BtitelUIBtn}>
                    <Text style={Styles.Btn_ui}>Add to Bag</Text>
                </View>
            </View>
        </View>
    );
}


const MenuTile = () => {
    return (
        <View style={Styles.MenuContainer}>
            <View style={Styles.MenuHolder}>
                <View style={Styles.MenuTitelHolder}>
                    <View style={[Styles.MenuSingleTitelHolder, { alignItems: 'flex-start' }]}>
                        <Text style={Styles.menu_titel}>Menu</Text>
                    </View>
                    <View style={[Styles.MenuSingleTitelHolder, { alignItems: 'flex-end', }]}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={Styles.menu_titel_scond}>Full menu</Text>
                            <Icon color="#4267B2" name="arrowright" size={20} />
                        </View>
                    </View>
                </View>

                <View style={Styles.muneItemCoitainer}>
                    <View style={{ flexDirection: 'row' }}>
                    <ScrollView horizontal>
                        <View style={Styles.menuItemSingleTileConatiner}>
                            <View style={Styles.menuItemSingleTileHolder}>
                                <Image resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: wp('2%') }} source={{ uri: 'https://www.mashed.com/img/gallery/what-you-dont-know-about-mcdonalds-hotcakes/intro-1553105326.jpg' }} />
                            </View>
                            <View style={Styles.menuItemSingleTextHolder}>
                                <Text style={Styles.menu_item_name}>Pancakes</Text>
                            </View>
                        </View>

                        <View style={Styles.menuItemSingleTileConatiner}>
                            <View style={Styles.menuItemSingleTileHolder}>
                                <Image resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: wp('2%') }} source={{ uri: 'https://www.mashed.com/img/gallery/what-you-dont-know-about-mcdonalds-hotcakes/intro-1553105326.jpg' }} />
                            </View>
                            <View style={Styles.menuItemSingleTextHolder}>
                                <Text style={Styles.menu_item_name}>Pancakes</Text>
                            </View>
                        </View>

                        <View style={Styles.menuItemSingleTileConatiner}>
                            <View style={Styles.menuItemSingleTileHolder}>
                                <Image resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: wp('2%') }} source={{ uri: 'https://www.mashed.com/img/gallery/what-you-dont-know-about-mcdonalds-hotcakes/intro-1553105326.jpg' }} />
                            </View>
                            <View style={Styles.menuItemSingleTextHolder}>
                                <Text style={Styles.menu_item_name}>Pancakes</Text>
                            </View>
                        </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View>

    );
}

const DealsTile = () => {
    return (
        <View style={Styles.MenuContainer}>
            <View style={Styles.MenuHolder}>
                <View style={Styles.MenuTitelHolder}>
                    <View style={[Styles.MenuSingleTitelHolder, { alignItems: 'flex-start' }]}>
                        <Text style={Styles.menu_titel}>Deals</Text>
                    </View>
                    <View style={[Styles.MenuSingleTitelHolder, { alignItems: 'flex-end', }]}>
                        <View style={{ flexDirection: 'row' }}>
                            {/* <Text style={Styles.menu_titel_scond}>Full menu</Text>
                            <Icon color="#4267B2" name="arrowright" size={20} /> */}
                        </View>
                    </View>
                </View>

                <View style={Styles.muneItemCoitainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <ScrollView horizontal>
                            <View style={Styles.menuItemSingleTileConatiner}>
                                <View style={Styles.menuItemSingleTileHolder}>
                                    <Image resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: wp('2%') }} source={{ uri: 'https://www.mashed.com/img/gallery/what-you-dont-know-about-mcdonalds-hotcakes/intro-1553105326.jpg' }} />
                                </View>
                                <View style={Styles.menuItemSingleTextHolder}>
                                    <Text style={Styles.menu_item_name}>Pancakes</Text>
                                </View>
                            </View>

                            <View style={Styles.menuItemSingleTileConatiner}>
                                <View style={Styles.menuItemSingleTileHolder}>
                                    <Image resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: wp('2%') }} source={{ uri: 'https://www.mashed.com/img/gallery/what-you-dont-know-about-mcdonalds-hotcakes/intro-1553105326.jpg' }} />
                                </View>
                                <View style={Styles.menuItemSingleTextHolder}>
                                    <Text style={Styles.menu_item_name}>Pancakes</Text>
                                </View>
                            </View>

                            <View style={Styles.menuItemSingleTileConatiner}>
                                <View style={Styles.menuItemSingleTileHolder}>
                                    <Image resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: wp('2%') }} source={{ uri: 'https://www.mashed.com/img/gallery/what-you-dont-know-about-mcdonalds-hotcakes/intro-1553105326.jpg' }} />
                                </View>
                                <View style={Styles.menuItemSingleTextHolder}>
                                    <Text style={Styles.menu_item_name}>Pancakes</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View>
    );
}


const RewardTile = () => {
    return (
        <View style={Styles.tileConten}>
            <View style={[Styles.RewrdtileDescriptionHolder, { marginBottom: hp('1%') }]}>
                <Text style={Styles.menu_titel}>Your RcCafe Rewards</Text>
            </View>
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


const TrandingTile = () => {
    return (
        <View style={Styles.TrandingtileConten}>

            <View style={Styles.MenuTitelHolder}>
                <View style={[Styles.MenuSingleTitelHolder, { alignItems: 'flex-start' }]}>
                    <Text style={Styles.menu_titel}>Tranding</Text>
                </View>
                <View style={[Styles.MenuSingleTitelHolder, { alignItems: 'flex-end', }]}>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <Text style={Styles.menu_titel_scond}>Full menu</Text>
                            <Icon color="#4267B2" name="arrowright" size={20} /> */}
                    </View>
                </View>
            </View>

            <View elevation={2} style={Styles.tileHolder}>
                <Image resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: wp('5%') }} source={{ uri: 'https://st4.depositphotos.com/14582236/22073/v/950/depositphotos_220731050-stock-illustration-cold-brewed-coffee-banner-ads.jpg' }} />

                <View style={Styles.titelUIText}>
                    <Text style={Styles.Btn_ui_Bold}>Festival Snack</Text>
                </View>

                <View style={[Styles.titelUIBtn, { color: '#FFE800', }]}>
                    <Text style={Styles.Btn_ui}>Order Now</Text>
                </View>
            </View>

            <View elevation={2} style={Styles.tileHolder}>
                <Image resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: wp('5%') }} source={{ uri: 'https://st4.depositphotos.com/14582236/22073/v/950/depositphotos_220731050-stock-illustration-cold-brewed-coffee-banner-ads.jpg' }} />

                <View style={Styles.titelUIText}>
                    <Text style={Styles.Btn_ui_Bold}>Festival Snack</Text>
                </View>

                <View style={[Styles.titelUIBtn, { color: '#FFE800', }]}>
                    <Text style={Styles.Btn_ui}>Order Now</Text>
                </View>
            </View>

            <View style={Styles.tileDescriptionHolder}>
                <Text style={Styles.details_ui}>* Offer valid only for full-price Relacas Cafe drinks.</Text>
                <Text style={Styles.details_ui}>Valid at part RcD true 31/05/2022</Text>
            </View>

            {/* <View elevation={2} style={Styles.tileHolder}>
                <Image resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: wp('5%') }} source={{ uri: 'https://st4.depositphotos.com/14582236/22073/v/950/depositphotos_220731050-stock-illustration-cold-brewed-coffee-banner-ads.jpg' }} />

                <View style={Styles.titelUIText}>
                    <Text style={Styles.Btn_ui_Bold}>Festival Snack</Text>
                </View>

                <View style={[Styles.titelUIBtn,{color: '#FFE800',}]}>
                    <Text style={Styles.Btn_ui}>Order Now</Text>
                </View>
            </View>
            <View style={Styles.tileDescriptionHolder}>
                <Text style={Styles.details_ui}>* Offer valid only for full-price Relacas Cafe drinks.</Text>
                <Text style={Styles.details_ui}>Valid at part RcD true 31/05/2022</Text>
            </View> */}

        </View>
    );
}


function home_tab_screen() {
    return (

        <View style={Styles.main}>
            <ScrollView>
                <BannerTile />
                <MenuTile />
                <DealsTile />
                <RewardTile />

                <TrandingTile />

            </ScrollView>
        </View>

    );
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        // backgroundColor: "#FFFFFF",
        backgroundColor: "#F5F5F5",
        //flexDirection: 'row',
        alignContent: 'center',
        //alignItems: 'center'
    },
    BtileConten: {
        width: wp('100%'),
        height: hp('25%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    BtileHolder: {
        width: wp('100%'),
        height: hp('25%'),
        //alignItems:'center',
        justifyContent: 'center',
        // borderRadius: wp('2%'),
        //backgroundColor:'#FFE800'
    },
    bannerHolder: {
        width: wp('90%'),
        height: hp('20%'),
        //alignItems:'center',
        justifyContent: 'center',
        borderRadius: wp('2%'),
        backgroundColor: '#FFF',
        flexDirection: 'row'
    },
    tileDescriptionHolder: {
        width: wp('90%'),
        height: hp('2%'),
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: hp('2%'),
        marginBottom: hp('2%'),
    },
    RewrdtileDescriptionHolder: {
        width: wp('90%'),
        height: hp('3%'),
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    BtitelUIBtn: {
        width: wp('30%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderRadius: wp('3%'),
        position: 'absolute',
        left: 50,
        bottom: 50,
        top: 115

    },
    Btn_ui_Bold: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 18,
        color: '#FFF',
        letterSpacing: 0.25,
    },
    MenuContainer: {
        width: wp('100%'),
        height: hp('30%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    MenuHolder: {
        width: wp('90%'),
        height: hp('28%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    MenuTitelHolder: {
        width: wp('90%'),
        height: hp('4%'),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    MenuSingleTitelHolder: {
        width: wp('45%'),
        height: hp('3%'),
        justifyContent: 'center',
    },
    menu_titel: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 18,
        color: '#000',
        letterSpacing: 0.25,
    },
    menu_titel_scond: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#4267B2',
        letterSpacing: 0.25,
    },
    muneItemCoitainer: {
        width: wp('90%'),
        height: hp('24%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuItemSingleTileConatiner: {
        width: wp('41%'),
        height: hp('22%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuItemSingleTileHolder: {
        width: wp('40%'),
        height: hp('20%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp('2%'),
        borderWidth: 1,
        borderColor: 'red'

    },
    menuItemSingleTextHolder: {
        width: wp('40%'),
        height: hp('2%'),
        justifyContent: 'center',

    },
    menu_item_name: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.25,
    },
    tileConten: {
        width: wp('100%'),
        height: hp('30%'),
        alignItems: 'center',
        justifyContent: 'center',
        //  backgroundColor:'pink'
    },
    TrandingtileConten: {
        width: wp('100%'),

        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('2%')
    },
    tileHolder: {
        width: wp('90%'),
        height: hp('20%'),
        //alignItems:'center',
        justifyContent: 'center',
        borderRadius: wp('2%'),
        //backgroundColor:'#FFE800'
        marginTop: hp('1%'),
        marginBottom: hp('1%')
    },
    bannerHolder: {
        width: wp('90%'),
        height: hp('20%'),
        //alignItems:'center',
        justifyContent: 'center',
        borderRadius: wp('2%'),
        backgroundColor: '#FFF',
        flexDirection: 'row'
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
    titelUIText: {
        width: wp('50%'),
        height: hp('5%'),
        justifyContent: 'center',
        //backgroundColor: '#FFF',
        borderRadius: wp('3%'),
        position: 'absolute',
        left: 50,
        bottom: 130,
        top: 30

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

});

export default home_tab_screen;
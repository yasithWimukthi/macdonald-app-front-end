import React, { PropTypes, Component, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, Platform, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import ZigzagView from "react-native-zigzag-view"
import { Actions } from 'react-native-router-flux';

import { Funtion_Get_Home_Menu_List, Funtion_Get_Home_Tranding_List, Funtion_Get_Home_Deals_List } from '../../assert/networks/api_calls';
import NetInfo from "@react-native-community/netinfo";
import Geolocation from '@react-native-community/geolocation';

import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/actions';

const BannerTile = () => {
    return (
        <ZigzagView
            backgroundColor="#E9E9E9"
            surfaceColor="#FFF"
            bottom={true}
            top={false}
        >
            <View style={Styles.BtileConten}>
                <View style={Styles.BtileHolder}>
                    <Image resizeMode='cover' style={{ width: '100%', height: '100%', }} source={{ uri: 'https://st4.depositphotos.com/14582236/22073/v/950/depositphotos_220731050-stock-illustration-cold-brewed-coffee-banner-ads.jpg' }} />
                    {/* <View style={Styles.BtitelUIBtn}>
                        <Text style={Styles.Btn_ui}>Add to Bag</Text>
                    </View> */}
                </View>
            </View>
        </ZigzagView>
    );
}

const MenuTile = ({ menuList }) => {
    return (
        <View style={Styles.MenuContainer}>
            <View style={Styles.MenuHolder}>
                <View style={Styles.MenuTitelHolder}>
                    <View style={[Styles.MenuSingleTitelHolder, { alignItems: 'flex-start' }]}>
                        <Text style={Styles.menu_titel}>Menu</Text>
                    </View>
                    <View style={[Styles.MenuSingleTitelHolder, { alignItems: 'flex-end', }]}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => { Actions.FullMenu(); }}>
                                <Text style={Styles.menu_titel_scond}>Full menu</Text>
                            </TouchableOpacity>
                            <Icon color="#EB1F25" name="arrowright" size={20} />
                        </View>
                    </View>
                </View>

                <View style={Styles.muneItemCoitainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <ScrollView horizontal>

                            <FlatList
                                horizontal
                                data={menuList}
                                // keyExtractor={item => item.id}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity onPress={() => { Actions.MenuList({ cat_id: item.id }); }}>
                                            <View style={Styles.menuItemSingleTileConatiner}>
                                                <View style={Styles.menuItemSingleTileHolder}>
                                                    {/* <Image resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: wp('2%') }} source={{ uri: 'https://www.mashed.com/img/gallery/what-you-dont-know-about-mcdonalds-hotcakes/intro-1553105326.jpg' }} /> */}
                                                    <Image resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: wp('2%') }} source={{ uri: item.imgUrl }} />
                                                </View>
                                                <View style={Styles.menuItemSingleTextHolder}>
                                                    <Text style={Styles.menu_item_name}>{item.name}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}

                            />



                            {/* <View style={Styles.menuItemSingleTileConatiner}>
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
                            </View> */}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View>

    );
}

const DealsTile = ({ dealList }) => {

    // const { items } = useSelector(state => state.userReducer);
    // const dispatch = useDispatch();

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

                            <FlatList
                                horizontal
                                data={dealList}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity onPress={() => { 
                                            //addDealToCart(item); 
                                            Actions.SingleDeal({dealObj:item});
                                            }}>
                                            <View style={Styles.menuItemSingleTileConatiner}>
                                                <View style={Styles.menuItemSingleTileHolder}>
                                                    <Image resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: wp('2%') }} source={{ uri: item.imgUrl }} />
                                                </View>
                                                <View style={Styles.menuItemSingleTextHolder}>
                                                    {/* <Text style={Styles.menu_item_name}>{item.description}</Text> */}
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}

                            />
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
                <Text style={Styles.menu_titel}>Relaks Radio Café Rewards</Text>
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


const TrandingTile = ({ trandingList }) => {
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

            <ScrollView>
                <FlatList
                    data={trandingList}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => { Actions.Tranding({ foodId: item.foodItemId }); }}>
                                <View elevation={2} style={Styles.tileHolder}>
                                    <Image resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: wp('5%') }} source={{ uri: 'https://st4.depositphotos.com/14582236/22073/v/950/depositphotos_220731050-stock-illustration-cold-brewed-coffee-banner-ads.jpg' }} />

                                    <View style={Styles.titelUIText}>
                                        <Text style={Styles.Btn_ui_Bold}>{""}</Text>
                                    </View>

                                    <View style={[Styles.titelUIBtn, { color: '#FFE800', }]}>
                                        <Text style={Styles.Btn_ui}>Order Now</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}

                />
            </ScrollView>
            <View style={Styles.tileDescriptionHolder}>
                <Text style={Styles.details_ui}>* Offer valid only for full-price Relacas Cafe drinks.</Text>
                <Text style={Styles.details_ui}>Valid at part RcD true 31/05/2022</Text>
            </View>
        </View>
    );
}


function Home_Tab_Screen() {


    const [menuList, setMenuList] = useState([]);
    const [dealsList, setDealsList] = useState([]);
    const [trandingList, setTrandingList] = useState([]);
    const [
        currentLongitude,
        setCurrentLongitude
    ] = useState('...');
    const [
        currentLatitude,
        setCurrentLatitude
    ] = useState('...');
    const [
        locationStatus,
        setLocationStatus
    ] = useState('');

    useEffect(() => {

        getMenuInfo();
        getDealsInfo();
        getTrandingInfo();

    }, []);

    function getMenuInfo() {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                // var response = Funtion_Get_Home_Menu_List();
                Funtion_Get_Home_Menu_List().then((response) => {
                    // alert("menu list " + JSON.stringify(response));
                    //console.log("menu list " + JSON.stringify(response));
                    setMenuList(response.data);
                }).catch((error) => {
                    console.log("error " + JSON.stringify(error));
                });

                // if(response.status == '200'){
                //     //sucessfully created
                // }else if (response.status == '401'){
                //     // token expire redirct to login page
                // }else if (response.status == '500') {
                //     // request body validation
                // }

            } else {
                //show error alert for not connect to internet
            }
        });
    }

    function getDealsInfo() {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                // var response = Funtion_Get_Home_Deals_List();

                Funtion_Get_Home_Deals_List().then((response) => {
                    //alert("deals list " + JSON.stringify(response));
                    // console.log("deals list " + JSON.stringify(response));
                    setDealsList(response.data);
                }).catch((error) => {
                    console.log("error " + JSON.stringify(error));
                });

                // if(response.status == '200'){
                //     //sucessfully created
                // }else if (response.status == '401'){
                //     // token expire redirct to login page
                // }else if (response.status == '500') {
                //     // request body validation
                // }

            } else {
                //show error alert for not connect to internet
            }
        });
    }

    function getTrandingInfo() {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                // var response = Funtion_Get_Home_Tranding_List();
                Funtion_Get_Home_Tranding_List().then((response) => {
                    //alert("tranding list " + JSON.stringify(response));
                    //console.log("tranding list " + JSON.stringify(response));
                    setTrandingList(response.data);
                }).catch((error) => {
                    console.log("error " + JSON.stringify(error));
                });

                // if(response.status == '200'){
                //     //sucessfully created
                // }else if (response.status == '401'){
                //     // token expire redirct to login page
                // }else if (response.status == '500') {
                //     // request body validation
                // }

            } else {
                //show error alert for not connect to internet
            }
        });
    }

    return (

        <View style={Styles.main}>
            <ScrollView>
                <BannerTile />
                <MenuTile menuList={menuList} />
                <DealsTile dealList={dealsList} />
                {/* <RewardTile /> */}
                <TrandingTile trandingList={trandingList} />

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
        backgroundColor: '#EB1F25',
        borderRadius: wp('5%'),
        position: 'absolute',
        left: 50,
        bottom: 50,
        top: 115

    },
    Btn_ui_Bold: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 26,
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
        color: '#EB1F25',
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
        borderColor: '#EB1F25'

    },
    menuItemSingleTextHolder: {
        width: wp('40%'),
        height: hp('2%'),
        justifyContent: 'center',

    },
    menu_item_name: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 12,
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
        backgroundColor: '#EB1F25',
        borderRadius: wp('5%'),
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
        borderRadius: wp('5%'),
        position: 'absolute',
        left: 50,
        bottom: 130,
        top: 30

    },
    Btn_ui: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#FFF',
        letterSpacing: 0.25,
    },
    details_ui: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 12,
        color: '#000',
        letterSpacing: 0.25,
    },

});

export default Home_Tab_Screen;
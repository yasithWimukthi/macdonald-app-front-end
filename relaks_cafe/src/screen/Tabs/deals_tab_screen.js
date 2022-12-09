import React, { PropTypes, Component, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/EvilIcons';

import { Funtion_Get_Deals_Info_List } from '../../assert/networks/api_calls';
import NetInfo from "@react-native-community/netinfo";

import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/actions';

import { Actions } from 'react-native-router-flux';
import AwesomeAlert from 'react-native-awesome-alerts';

import {FONT_BOLD,FONT_LIGHT} from '../../assert/key/key';


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

const BannerComponet = ({ dealList }) => {

    const { items } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    function addDealToCart(deal) {
        var portionLit = items.foodItems;

        var seleted_po = {
            "id": deal.id,
            "quantity": 1,
            "portionId": "1", //selectdPortion.id
            "note": " ",
            "itemName": deal.description,
            "image": deal.imgUrl,
            "cal": "1000",
            "potionName": " ",
            "potionPrice": (parseInt(deal.totalPrice) - (parseInt(deal.totalPrice) * parseInt(deal.discount) / 100))
        };

        if (portionLit.length == 0) {
            portionLit.push(seleted_po);
        } else {
            portionLit.forEach(element => {
                if (element.id == seleted_po.id) {
                    element.quantity = element.quantity + seleted_po.quantity;
                    element.note = element.note != "" ? element.note + seleted_po.note : note
                } else {
                    portionLit.push(seleted_po);
                }
            });
        }

        console.log("portion array " + JSON.stringify(portionLit));


        var orderObj = {
            // "type": items.type != "" ? items.type : "order", //"order"
            "isDelivery": (items.isDelivery) ? true : false,
            "refId": "",
            "noOfItems": items.noOfItems + 1, //qty
            "totalPrice": items.totalPrice,
            "promotionId": 0,
            "location": {
                "latitude": items.location.latitude,
                "longitude": items.location.longitude
            },
            "foodItems": portionLit,
        };

        dispatch(setCartItems(orderObj));
    }

    return (
        <FlatList
            data={dealList}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => {
                        //addDealToCart(item); 
                        Actions.SingleDeal({ dealObj: item });
                    }}>
                        <View style={Styles.tileConten}>
                            <View elevation={2} style={Styles.bannerHolder}>
                                <View style={Styles.bannerImageHolder}>
                                    <Image style={{ width: '100%', height: '100%', borderRadius: wp('1%') }} source={{ uri: item.imgUrl }} resizeMode='cover' />
                                </View>
                                <View style={Styles.bannerDetailsHolder}>
                                    <View style={Styles.bannerRowDteials}>
                                        <View style={{ alignItems: 'flex-start', width: wp('6%'), }}>
                                            <Icon color="#FFE800" name="tag" size={25} />
                                        </View>
                                        <View style={{ width: wp('50%'), }}>
                                            <Text style={Styles.bannertextBold}>Pickup Only</Text>
                                        </View>
                                    </View>
                                    <View style={Styles.bannerDteials}>
                                        <View style={{ width: wp('54%'), }}>
                                            <Text style={Styles.bannertextBold}>{item.totalPrice}</Text>
                                        </View>
                                    </View>
                                    <View style={Styles.bannerDteials}>
                                        <View style={{ width: wp('54%'), }}>
                                            <Text style={Styles.bannertextLight}>{item.description}</Text>
                                        </View>
                                    </View>
                                    <View style={[Styles.bannerDteials, { marginTop: hp('2%') }]}>
                                        <View style={{ width: wp('54%'), }}>
                                            <Text style={Styles.bannertextLightInfo}>{"Expire " + item.expiryDate} </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }}

        />
    );
}

function Deals_Tab_Screen() {

    const { items } = useSelector(state => state.userReducer);

    const [visbile, setVisible] = useState((items.foodItems.length > 0) ? true : false);

    const [totals, setTolats] = useState(items.totalPrice);

    const [dealsList, setDealsList] = useState([]);
    const [show, setShow] = useState(false);
    const [modelTitel, setModelTitel] = useState("");
    const [modelMessage, setModelMessage] = useState("");

    useEffect(() => {
        setVisible((items.foodItems.length > 0) ? true : false);
        setTolats(items.totalPrice);
        getBannerInfo();
    });

    function getBannerInfo() {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                // var response = Funtion_Get_Deals_Info_List();

                Funtion_Get_Deals_Info_List().then((response) => {
                    if (response.code == '200') {
                        setDealsList(response.responce.data);
                    } else if (response.code == '406') {
                        setModelTitel("Error");
                        setModelMessage("Catogery Limit Invalid!");
                        setShow(true);
                        //show eorr
                    } else if (response.code == '500') {
                        //server error
                        setModelTitel("Error");
                        setModelMessage("Something went wrong, try again later");
                        setShow(true);
                    }
                    //setDealsList(response.data);
                }).catch((error) => {
                    console.log("error on deal list screen " + error);
                });

            } else {
                //show error alert for not connect to internet
                setModelTitel("Error");
                setModelMessage("Please check your device connection");
                setShow(true);
            }
        });
    }




    return (
        <View style={Styles.main}>
            <ScrollView>
                <View >
                    <Details_tile />
                </View>

                <View style={{ marginTop: hp('3%') }}>
                    <BannerComponet dealList={dealsList} />
                </View>
            </ScrollView>
            <AwesomeAlert
                show={show}
                showProgress={false}
                title={modelTitel}
                message={modelMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="cancel"
                confirmText="Ok"
                confirmButtonColor="red" //#DD6B55
                onCancelPressed={() => {
                    setShow(false);
                }}
                onConfirmPressed={() => {
                    setShow(false);
                }}
            />
            {
                (visbile) ? <View style={Styles.cartTile}>
                    <View style={Styles.cartTile_holder}>
                        <View style={Styles.cartTile_info_holder}>
                            <View style={Styles.cartTile_tesxts_holder}>
                                <Text style={Styles.itemText}>{items.foodItems.length + " items"}</Text>
                            </View>
                            <View style={Styles.cartTile_tesxts_holder}>
                                <Text style={Styles.totalText}>{"€ :" + totals}</Text>
                            </View>
                        </View>
                        <TouchableOpacity  onPress={() => { Actions.Cart(); }}>
                            <View style={Styles.cartTile_btn_holder}>
                                <View style={Styles.btn_holder}>
                                    <Text style={[Styles.itemText, { color: '#000', }]}>View Cart</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> : null
            }
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
        fontFamily: FONT_BOLD,// 'NexaTextDemo-Bold',
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
        flexDirection: 'row'
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
        backgroundColor: '#EB1F25',
        borderRadius: wp('5%'),
        position: 'absolute',
        left: 50,
        bottom: 50,
        top: 100

    },
    Btn_ui: {
        fontFamily: FONT_LIGHT, // 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#FFF',
        letterSpacing: 0.25,
    },
    details_ui: {
        fontFamily: FONT_LIGHT, // 'NexaTextDemo-Light',
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
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    bannerDteials: {
        width: wp('60%'),
        height: hp('4%'),
        flexDirection: 'row',
        justifyContent: 'center',
    },
    bannertextBold: {
        fontFamily: FONT_BOLD, // 'NexaTextDemo-Bold',
        fontSize: 13,
        color: '#000',
        letterSpacing: 0.25,
    },
    bannertextLight: {
        fontFamily: FONT_LIGHT, // 'NexaTextDemo-Light',
        fontSize: 13,
        color: '#000',
        letterSpacing: 0.25,
    },
    bannertextLightInfo: {
        fontFamily: FONT_LIGHT, // 'NexaTextDemo-Light',
        fontSize: 12,
        color: '#000',
        letterSpacing: 0.25,
    },
    cartTile: {
        width: wp('100%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: hp('1%'),
        // backgroundColor:'#f5f5f5'
    },
    cartTile_holder: {
        width: wp('90%'),
        height: hp('8%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a5a6a5',
        borderRadius: 5,
        flexDirection: 'row',
    },
    cartTile_info_holder: {
        width: wp('60%'),
        height: hp('8%'),
        justifyContent: 'center',
    },
    cartTile_tesxts_holder: {
        width: wp('50%'),
        height: hp('3%'),
        justifyContent: 'center',
        marginLeft: 10,
    },
    cartTile_btn_holder: {
        width: wp('30%'),
        height: hp('8%'),
        justifyContent: 'center',
        //backgroundColor:'#EB1F25'
    },
    itemText: {
        fontFamily: FONT_LIGHT, // 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#fff',
        letterSpacing: 0.04,
    },
    totalText: {
        fontFamily: FONT_BOLD, // 'NexaTextDemo-Bold',
        fontSize: 14,
        color: '#fff',
        letterSpacing: 0.04,
    },
    btn_holder: {
        width: wp('28%'),
        height: hp('7%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'red'
    },
});

export default Deals_Tab_Screen;
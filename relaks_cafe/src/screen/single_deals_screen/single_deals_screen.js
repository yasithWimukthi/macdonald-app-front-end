import React, { PropTypes, Component, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';

import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/actions';
import {StoreOderInfo} from '../../assert/storeage/data_store';

import AwesomeAlert from 'react-native-awesome-alerts';
import { Actions } from 'react-native-router-flux';

const DealName = ({ dealName }) => {
    return (
        <View style={Styles.foodName_Container}>
            <View style={Styles.foodName_Holder}>
                <View style={Styles.foodName_view}>
                    <Text style={Styles.foodName_text}>{dealName}</Text>
                </View>
            </View>
        </View>
    );
}
const DealImage = ({ imageUrl }) => {
    return (
        <View style={Styles.Image_Container}>
            <View style={Styles.Image_Holder}>
                <Image resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: wp('5%') }} source={{ uri: imageUrl }} />
            </View>
        </View>
    );
}


const PortionTiles = ({ menuList }) => {

    return (
        <FlatList
            data={menuList}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => {
                        //Actions.MenuList({ cat_id: item.id });
                    }}>
                        <View style={Styles.ExpolurMenuContent}>
                            <View style={Styles.ExpolurMenuHolder}>
                                <View style={Styles.ExpolurMenuImageHolder}>
                                    <Image resizeMode='cover' style={{ width: '90%', height: '100%', borderRadius: wp('2%') }} source={{ uri: item.foodItem.imgUrl }} />
                                </View>
                                <View style={Styles.ExpolurMenuTextHolder}>
                                    <Text style={Styles.MenuTextBold}>{item.foodItem.name}</Text>
                                </View>
                                <View style={Styles.ExpolurMenuIconHolder}>
                                    {/* <Icon color="#000" name="right" size={25} /> */}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }}

        />
    );
}


const AddToCartBtn = ({ funtions, protionCount }) => {
    return (
        <View style={Styles.btnContainer}>
            <TouchableOpacity disabled={protionCount != 0 ? false : true} onPress={funtions}>
                <View style={[Styles.btnBorder, { backgroundColor: protionCount != 0 ? '#EB1F25' : '#f5f5f5', borderWidth: 0 }]}>
                    <View style={Styles.btn_icon_holder}>
                        {/* <Icon color="#4285F4" name="google" size={30} /> */}
                    </View>
                    <View style={Styles.btn_text_holder_login}>
                        <Text style={Styles.brtn_text_content}>Add to buket</Text>
                    </View>
                    <View style={Styles.btn_icon_holder}>
                        {/* <Icon color="#000" name="right" size={30} /> */}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const Single_Deals_Info_Screen = ({ ...props }) => {

    const { items } = useSelector(state => state.userReducer);

    const dispatch = useDispatch();

    const [dealInfo, setDealInfo] = useState(props.dealObj);

    const [show, setShow] = useState(false);
    const [modelTitel, setModelTitel] = useState("");
    const [modelMessage, setModelMessage] = useState("");

    const [visbile, setVisible] = useState((items.foodItems.length > 0) ? true : false);

    const [totals, setTolats] = useState(items.totalPrice);

    useEffect(() => {
        setVisible((items.foodItems.length > 0) ? true : false);
        setTolats(items.totalPrice);
    });

    function addToCartDealsInfo(deals) {

        var obj = {
            "id": deals.id,
            "quantity": 1,
            "portionId": 0,
            "note": " ",
            "itemName": deals.description,
            "image": deals.imgUrl,
            "cal": " ",
            "potionName": " ",
            "potionPrice": parseInt(deals.totalPrice),
            "dealID": deals.id,
            "dealType": "deal",
            "dealItem": deals.promotionItems,
        }

        var list = items.foodItems;


        if (list.length == 0) {
            list.push(obj);
        } else {
            var updte_st = true;
            list.forEach(element => {
                if (element.id == obj.id & element.dealType == "deal") {
                    element.quantity = element.quantity + 1;
                    element.note = element.note != "" ? element.note + obj.note : " ";
                    updte_st = false;
                } else {

                }
            });
            if (updte_st) {
                list.push(obj);
            }

        }
        var orderObj = {
            "isDelivery": items.isDelivery,
            "refId": "",
            "noOfItems": items.noOfItems, //qty
            "totalPrice": (parseInt(items.totalPrice) + parseInt(deals.totalPrice)),
            "promotionId": items.promotionId,
            "location": {
                "latitude": items.location.latitude,
                "longitude": items.location.longitude
            },
            "foodItems": list,
        };
        dispatch(setCartItems(orderObj));
        StoreOderInfo(orderObj);

        setModelTitel("Deal Added");
        setModelMessage("Deal added to your cart!");
        setShow(true);
    }

    return (
        <View style={Styles.main}>
            <DealName dealName={dealInfo.description} />
            <DealImage imageUrl={dealInfo.imgUrl} />
            <PortionTiles menuList={dealInfo.promotionItems} />
            <AddToCartBtn protionCount={dealInfo.promotionItems.length} funtions={() => { addToCartDealsInfo(dealInfo); }} />

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
                        <TouchableOpacity onPress={() => { Actions.Cart(); }}>
                            <View style={Styles.cartTile_btn_holder}>
                                <View style={Styles.btn_holder}>
                                    <Text style={[Styles.itemText,{color: '#000',}]}>View Cart</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> : null
            }

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
                }}
            />

        </View>
    )
}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        //flexDirection: 'row',
        alignContent: 'center',
        //alignItems: 'center'
    },
    foodName_Container: {
        width: wp('100%'),
        height: hp('20%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    foodName_Holder: {
        width: wp('90%'),
        height: hp('18%'),
        justifyContent: 'center',
    },
    foodName_view: {
        width: wp('90%'),
        height: hp('15%'),
        justifyContent: 'center',
    },
    foodName_text: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 28,
        color: '#000',
        letterSpacing: 0.04,
    },
    portion_Container: {
        width: wp('100%'),
        height: hp('15%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    portion_Holder: {
        width: wp('90%'),
        height: hp('12%'),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    single_portion_View: {
        width: wp('28%'),
        height: hp('10%'),
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#f5f5f5",
        borderRadius: wp('3%'),
    },
    single_portion_info_holder: {
        width: wp('25%'),
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    single_portion_text: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.04,
    },
    Image_Container: {
        width: wp('100%'),
        height: hp('35%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    Image_Holder: {
        width: wp('90%'),
        height: hp('32%'),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    Qty_Container: {
        width: wp('100%'),
        height: hp('20%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    Qty_Holder: {
        width: wp('90%'),
        height: hp('18%'),
        justifyContent: 'center',
    },
    Qty_Input_View: {
        marginTop: 10,
        width: wp('90%'),
        height: hp('6%'),
        justifyContent: 'center',
    },
    qty_input_text: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.04,
    },
    Qty_Input_holder: {
        width: wp('60%'),
        height: hp('6%'),
        justifyContent: 'center',
        margin: 1,
        flexDirection: 'row'
    },
    Qty_Input_holder2: {
        width: wp('30%'),
        height: hp('6%'),
        justifyContent: 'center',
    },
    Qty_single_tite: {
        width: wp('15%'),
        height: hp('6%'),
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3
    },
    qty_text: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 18,
        color: '#000',
        letterSpacing: 0.04,
    },
    btnContainer: {
        //flex: 1,
        width: wp('100%'),
        height: hp('8%'),
        // backgroundColor:'pink',
        alignItems: 'center',
        justifyContent: 'center'
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
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 16,
        color: '#000'
    },
    screenTitel: {
        marginTop: hp('3%'),
        marginBottom: hp('3%'),
        position: 'absolute',
        bottom: 0
    },
    ExpolurMenuContent: {
        width: wp('100%'),
        height: hp('12%'),
        justifyContent: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
    },
    ExpolurMenuHolder: {
        width: wp('90%'),
        height: hp('10%'),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    ExpolurMenuImageHolder: {
        width: wp('20%'),
        height: hp('8%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    ExpolurMenuTextHolder: {
        width: wp('60%'),
        height: hp('8%'),
        justifyContent: 'center',
        marginLeft: wp('2%')
    },
    ExpolurMenuIconHolder: {
        width: wp('10%'),
        height: hp('8%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    MenuTextBold: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 18,
        color: '#000',
        letterSpacing: 0.25,
    },
    cartTile: {
        width: wp('100%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: hp('8%'),
        // backgroundColor:'#f5f5f5'
    },
    cartTile_holder: {
        width: wp('90%'),
        height: hp('8%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a5a6a5',
        borderRadius: 5,
        flexDirection: 'row'
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
        marginLeft:10,
    },
    cartTile_btn_holder: {
        width: wp('30%'),
        height: hp('8%'),
        justifyContent: 'center',
    },
    itemText: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#fff',
        letterSpacing: 0.04,
    },
    totalText: {
        fontFamily: 'NexaTextDemo-Bold',
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

export default Single_Deals_Info_Screen;
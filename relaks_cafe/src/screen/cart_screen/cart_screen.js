import React, { PropTypes, Component, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Button, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';

import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/actions';

const Details_View = () => {
    return (
        <View style={Styles.detail_Container}>
            <View style={Styles.detail_Holder}>
                <View style={Styles.detail_row_holder}>
                    <View style={Styles.detail_icon_holder}>
                        <Image source={{ uri: 'pickup' }} style={Styles.pickup} />
                    </View>
                    <View style={Styles.detail_dtails_holder}>
                        <Text style={Styles.cartInfos}>Pickup</Text>
                        <Text style={Styles.subCartInfo}>Adress</Text>
                    </View>
                    <View style={Styles.detail_change_holder}>
                        <Text style={Styles.chageText}>Change</Text>
                    </View>
                </View>
                <View style={Styles.desciption}>
                    <Text style={Styles.subCartInfo}>Adults need around 2000 kcal per day, Equalent to {'\n'}B400KJ. Additional nutrition information is avalible {'\n'}in the more tab of your app.</Text>
                </View>
            </View>
        </View>
    );
}

const ItemTile = ({ portionList }) => {

    const { items } = useSelector(state => state.userReducer);
    const [qty, setQty] = useState(1);
    const [editEnable, setEditEnable] = useState(false);
    const [editStatus, setEditStatus] = useState("Edit");
    const dispatch = useDispatch();

    function updatePortion(item) {

        if (editStatus == "Edit") {
            setQty(item.quantity);
            setEditStatus("Update");
            setEditEnable(!editEnable);
        } else {
            var obj = {
                "id": item.id,
                "quantity": qty,
                "portionId": item.portionId,
                "note": item.note,
                "itemName": item.itemName,
                "image": item.image,
                "cal": item.cal,
                "potionName": item.potionName,
                "potionPrice": item.potionPrice
            }

            var list = items.foodItems;

            const filteredItems = list.filter(item => item.id !== obj.id);

            list = filteredItems;
        
            list.push(obj);

            var orderObj = {
                "isDelivery": items.isDelivery,
                "refId": "",
                "noOfItems": items.noOfItems, //qty
                "totalPrice": (items.totalPrice + ((qty * parseInt(item.potionPrice) - parseInt(item.potionPrice)))),
                "promotionId": items.promotionId,
                "location": {
                    "latitude": items.location.latitude,
                    "longitude": items.location.longitude
                },
                "foodItems": list,
            };
            dispatch(setCartItems(orderObj));
            setEditStatus("Edit");
            setEditEnable(!editEnable);
            

        }

    }

    function removePortion(seleted_po) {
        var list = items.foodItems;
        const filteredItems = list.filter(item => item.id !== seleted_po.id);
        var orderObj = {
            "isDelivery": items.isDelivery,
            "refId": "",
            "noOfItems": items.noOfItems, //qty
            "totalPrice": (items.totalPrice - (parseInt(seleted_po.quantity) * (parseInt(seleted_po.potionPrice)))),
            "promotionId": items.promotionId,
            "location": {
                "latitude": items.location.latitude,
                "longitude": items.location.longitude
            },
            "foodItems": filteredItems,
        };
        dispatch(setCartItems(orderObj));
    }

    return (

        <View style={{ flex: 1 }}>

            <ScrollView>

                <FlatList
                    data={portionList}
                    // keyExtractor={item => item.id}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => { }}>
                                <View style={Styles.item_Container}>
                                    <View style={Styles.item_Holder_views}>
                                        <View style={Styles.item_Holder}>
                                            <View style={Styles.item_details_Holder}>
                                                <View style={Styles.item_single_Holder2}>
                                                    <View style={Styles.item_info_Holder}>
                                                        <Text style={Styles.productInfo}>{item.itemName}</Text>
                                                    </View>
                                                    <View style={[Styles.item_info_Holder, { flexDirection: 'row', alignItems: 'flex-start' }]}>
                                                        <TouchableOpacity onPress={() => { updatePortion(item); }}>
                                                            <View style={Styles.button_Holder}>
                                                                <Text>{editStatus}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { removePortion(item); }}>
                                                            <View style={Styles.button_Holder}>
                                                                <Text>Remove</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View style={Styles.item_single_Holder}>
                                                    <View style={Styles.item_info_Holder2}>
                                                        <Text>{"€" + (parseFloat(item.potionPrice) * parseFloat(item.quantity))}</Text>
                                                    </View>
                                                    <View style={Styles.item_info_Holder2}>
                                                        <Text>{item.cal + " Kcal"}</Text>
                                                    </View>
                                                    <View style={Styles.item_info_Holder2}>
                                                        {
                                                            (!editEnable) ? <Text>{"Item Qty " + item.quantity}</Text> :
                                                                <View style={[Styles.Qty_Input_View, { flexDirection: 'row' }]}>
                                                                    <View style={Styles.Qty_Input_holder}>
                                                                        <View style={Styles.Qty_single_tite}>
                                                                            <TouchableOpacity onPress={() => {
                                                                                if (qty == 1) {
                                                                                    setQty(1);
                                                                                } else {
                                                                                    setQty(qty - 1);
                                                                                }
                                                                            }}>
                                                                                <Icon color="#000" name="minuscircle" size={20} />
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        <View style={[Styles.Qty_single_tite, { borderWidth: 2, borderColor: '#f5f5f5', borderRadius: 5 }]}>
                                                                            <Text style={Styles.qty_text}>{qty}</Text>
                                                                        </View>
                                                                        <View style={Styles.Qty_single_tite}>
                                                                            <TouchableOpacity onPress={() => { setQty(qty + 1); }}>
                                                                                <Icon color="#000" name="pluscircle" size={20} />
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </View>
                                                                    <View style={Styles.Qty_Input_holder2}>

                                                                    </View>
                                                                </View>
                                                        }

                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        );
                    }}

                />

            </ScrollView>


        </View>



    );
}

const ProcessCheckOutBtn = ({funtions,totalPrice}) => {
    return (
        <View style={Styles.btnContainer}>
            <TouchableOpacity  onPress={funtions}>
                <View style={Styles.btnBorder}>
                    <View style={Styles.btn_icon_holder}>
                        {/* <Icon color="#4285F4" name="google" size={30} /> */}
                    </View>
                    <View style={Styles.btn_text_holder_login}>
                        <Text style={Styles.brtn_text_content}>{"checkout € "+totalPrice}</Text>
                    </View>
                    <View style={Styles.btn_icon_holder}>
                        {/* <Icon color="#000" name="right" size={30} /> */}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const Cart_Screen = () => {

    const { items } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

  //  alert("datas "+JSON.stringify(items));

    return (
        <View style={Styles.main}>
            <View style={{ marginTop: hp('5%') }}></View>
            <Details_View />
            <ItemTile portionList={items.foodItems} />

            <View style={Styles.screenTitel}>
                <ProcessCheckOutBtn funtions={() => { Actions.Pay();}} totalPrice={items.totalPrice} />
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
    detail_Container: {
        width: wp('100%'),
        height: hp('30%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    detail_Holder: {
        width: wp('90%'),
        height: hp('28%'),
        justifyContent: 'center',

    },
    detail_row_holder: {
        width: wp('90%'),
        height: hp('15%'),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    desciption: {
        width: wp('90%'),
        height: hp('8%'),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    detail_icon_holder: {
        width: wp('20%'),
        height: hp('15%'),
        justifyContent: 'center',
    },
    detail_dtails_holder: {
        width: wp('50%'),
        height: hp('15%'),
        justifyContent: 'center',
    },
    detail_change_holder: {
        width: wp('20%'),
        height: hp('15%'),
        justifyContent: 'center',
    },
    pickup: {
        width: wp('15%'),
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain'
    },
    item_Container: {
        width: wp('100%'),
        height: hp('20%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    item_Holder: {
        width: wp('90%'),
        height: hp('18%'),
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#f5f5f5'
    },
    item_Holder_views: {
        width: wp('95%'),
        height: hp('18%'),
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#f5f5f5'
    },
    item_details_Holder: {
        width: wp('90%'),
        height: hp('15%'),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    item_single_Holder: {
        width: wp('40%'),
        height: hp('12%'),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    item_single_Holder2: {
        width: wp('50%'),
        height: hp('12%'),
        justifyContent: 'center',
    },
    item_info_Holder: {
        width: wp('50%'),
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    button_Holder: {
        width: wp('20%'),
        height: hp('5%'),
        margin: 2,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    item_info_Holder2: {
        width: wp('50%'),
        height: hp('3%'),
        margin: 3,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    item_button_Holder: {
        width: wp('20%'),
        height: hp('3%'),
        margin: 5,
        justifyContent: 'center',
    },
    cartInfos: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 16,
        color: '#000',
        letterSpacing: 0.04,
    },
    subCartInfo: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.04,
    },
    chageText: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: 'red',
        letterSpacing: 0.04,
        textDecorationColor: 'red'
    },
    productInfo: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 16,
        color: '#000',
        marginLeft: 4,
        letterSpacing: 0.04,
    },
    Qty_Input_View: {
        marginTop: 10,
        width: wp('40%'),
        height: hp('3%'),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    qty_input_text: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.04,
    },
    Qty_Input_holder: {
        width: wp('20%'),
        height: hp('3%'),
        justifyContent: 'center',
        margin: 1,
        flexDirection: 'row'
    },
    Qty_Input_holder2: {
        width: wp('10%'),
        height: hp('3%'),
        justifyContent: 'center',
    },
    Qty_single_tite: {
        width: wp('10%'),
        height: hp('3%'),
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3
    },
    qty_text: {
        fontFamily: 'NexaTextDemo-Bold',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.04,
    },
    screenTitel: {
        marginTop: hp('3%'),
        marginBottom: hp('3%'),
        position: 'absolute',
        bottom: 0
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
        borderColor : 'yellow',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'yellow',
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
});

export default Cart_Screen;
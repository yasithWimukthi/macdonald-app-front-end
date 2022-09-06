import React, { PropTypes, Component, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';

import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/actions';

import { Funtion_Single_Foods_Info } from '../../assert/networks/api_calls';

import AwesomeAlert from 'react-native-awesome-alerts';

import { Actions } from 'react-native-router-flux';

import { StoreOderInfo } from '../../assert/storeage/data_store';

const FoodName = ({ foodName }) => {
    return (
        <View style={Styles.foodName_Container}>
            <View style={Styles.foodName_Holder}>
                <View style={Styles.foodName_view}>
                    <Text style={Styles.foodName_text}>{foodName}</Text>
                </View>
            </View>
        </View>
    );
}

const PortionTitel = ({ protionList, updateSeletedPortion, updateValue }) => {

    var ids = 0;

    if (protionList.length >= 1 && updateValue == null) {
        ids = protionList[0].id;
        updateSeletedPortion(protionList[0]);
    }

    const [selectItem, setSelectItem] = useState(ids);

    return (
        <View style={Styles.portion_Container}>
            <View style={Styles.portion_Holder}>
                <View>
                    <Text style={Styles.portionTexts}>Select Your Portion</Text>
                </View>

                <ScrollView horizontal>
                    <FlatList
                        horizontal
                        data={protionList}
                        // keyExtractor={item => item.id}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => { setSelectItem(item.id); updateSeletedPortion(item); }}>
                                    <View style={[Styles.single_portion_View, { backgroundColor: selectItem == item.id ? '#EB1F25' : '#f5f5f5' }]}>
                                        <View style={Styles.single_portion_info_holder}>
                                            <Text style={{ color: selectItem == item.id ? '#fff' : '#000' }}>{"€ " + item.price}</Text>
                                        </View>
                                        <View style={Styles.single_portion_info_holder}>
                                            <Text style={{ color: selectItem == item.id ? '#fff' : '#000' }}>{item.name}</Text>
                                        </View>
                                        <View style={Styles.single_portion_info_holder}>
                                            <Text style={{ color: selectItem == item.id ? '#fff' : '#000' }}>{item.calories + " kcal"}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </ScrollView>
            </View>
        </View>
    );
}

const ItemImageView = ({ imageUrl }) => {
    return (
        <View style={Styles.Image_Container}>
            <View style={Styles.Image_Holder}>
                <Image resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: wp('5%') }} source={{ uri: imageUrl }} />
            </View>
        </View>
    );
}

const QtyInfoView = ({ qty, updateQty, updateNote }) => {
    return (
        <View style={Styles.Qty_Container}>
            <View style={Styles.Qty_Holder}>
                <View style={[Styles.Qty_Input_View, { flexDirection: 'row' }]}>
                    <View style={Styles.Qty_Input_holder}>
                        <View style={Styles.Qty_single_tite}>
                            <TouchableOpacity onPress={() => {
                                if (qty == 1) {
                                    updateQty(1);
                                } else {
                                    updateQty(qty - 1);
                                }
                            }}>
                                <Icon color="#000" name="minuscircle" size={30} />
                            </TouchableOpacity>
                        </View>
                        <View style={[Styles.Qty_single_tite, { borderWidth: 2, borderColor: '#f5f5f5', borderRadius: 5 }]}>
                            <Text style={Styles.qty_text}>{qty}</Text>
                        </View>
                        <View style={Styles.Qty_single_tite}>
                            <TouchableOpacity onPress={() => { updateQty(qty + 1); }}>
                                <Icon color="#000" name="pluscircle" size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* <View style={Styles.Qty_Input_holder2}>

                    </View> */}
                </View>
                <View style={[Styles.Qty_Input_View, { borderWidth: 1, borderColor: '#f5f5f5' }]}>
                    <TextInput style={Styles.qty_input_text} placeholder="Special Note.." onChangeText={(value) => { updateNote(value); }} multiline={true} />
                </View>
            </View>
        </View>
    );
}

const BtnAddToCartView = ({ funtions, protionCount }) => {
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

const Single_Tranding_Screen = ({ ...props }) => {

    //reducx state
    const { items } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [foodName, setFoodName] = useState("");
    const [protionlist, setPortionList] = useState([]);
    const [item, setItem] = useState(null);
    const [itemImage, setItemImage] = useState("");
    const [qty, setQty] = useState(1);
    const [note, setNote] = useState("");
    const [selectdPortion, setSeletedPortion] = useState(null);

    const [show, setShow] = useState(false);
    const [modelTitel, setModelTitel] = useState("");
    const [modelMessage, setModelMessage] = useState("");

    const [visbile, setVisible] = useState((items.foodItems.length > 0) ? true : false);

    const [totals, setTolats] = useState(items.totalPrice);

    const [spinerVisible, setSpinerVisible] = useState(false);

    useEffect(() => {
        setVisible((items.foodItems.length > 0) ? true : false);
        setTolats(items.totalPrice);
    });


    function getSingleFoodInfo(id) {
        setSpinerVisible(true);
        Funtion_Single_Foods_Info(id).then((response) => {

            if (response.code == '200') {
                // setModelTitel("SuccessFully");
                // setModelMessage("Table reservation successfully");
                // setShow(true);
                //redirct to home
                //Actions.authenticated();
                //setFoodList(response.responce.data);
                var dt = response.responce.data;
                setFoodName(dt.name);
                setPortionList(dt.portions);
                setItem(dt);
                setItemImage(dt.imgUrl);
                setSpinerVisible(false);
            } else if (response.code == '404') {
                setModelTitel("Error");
                setModelMessage("Food item not found. Try again");
                setSpinerVisible(false);
                setShow(true);
                Actions.reset('authenticated');
                //show eorr
            } else if (response.code == '401') {
                setModelTitel("Error");
                setModelMessage("Authentication Fail, Plase login again");
                setSpinerVisible(false);
                setShow(true);
                //redirct to login page
                //show eorr
            } else if (response.code == '500') {
                //server error
                setModelTitel("Error");
                setModelMessage("Something went wrong, try again later");
                setSpinerVisible(false);
                setShow(true);
            }
        }).catch((error) => {
            console.log("error on data getting tranding screen " + error);
            setSpinerVisible(false);
        });
    }

    useEffect(() => {
        getSingleFoodInfo(props.foodId);
    }, []);

    function AddToCart() {
        //alert(" cart item " + JSON.stringify(item) + " qty " + qty + " note " + note);
        var portionLit = items.foodItems;
        var seleted_po = {
            "id": item.id,
            "quantity": qty,
            "portionId": selectdPortion.id,
            "note": (note != "") ? note : " ",
            "itemName": item.name,
            "image": item.imgUrl,
            "cal": selectdPortion.calories,
            "potionName": selectdPortion.name,
            "potionPrice": selectdPortion.price,
            "dealID": "0",
            "dealType": "item",
            "dealItem": [],
        };

        if (portionLit.length == 0) {
            portionLit.push(seleted_po);
        } else {
            portionLit.forEach(element => {
                if (element.id == seleted_po.id & element.portionId == seleted_po.portionId & element.dealType == "item") {
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
            "totalPrice": (items.totalPrice) + parseInt(selectdPortion.price) * parseInt(qty),
            "promotionId": 0,
            "location": {
                "latitude": items.location.latitude,
                "longitude": items.location.longitude
            },
            "foodItems": portionLit,
        };

        dispatch(setCartItems(orderObj));
        StoreOderInfo(orderObj);
        setModelTitel("Item Added");
        setModelMessage("Item added to your cart!");
        setShow(true);
        console.log("location array " + JSON.stringify(items));
        // alert("set values "+JSON.stringify(items));
    }

    return (
        <View style={Styles.main}>
            <ScrollView>
                <FoodName foodName={foodName} />

                {/* <PortionTitel potionPrice={"100.00"} calaoriesCount={"537"} /> */}
                <PortionTitel protionList={protionlist} updateSeletedPortion={setSeletedPortion} updateValue={selectdPortion} />

                <ItemImageView imageUrl={itemImage} />

                <QtyInfoView qty={qty} updateQty={setQty} updateNote={setNote} />

                <View style={Styles.screenTitel}>
                    <BtnAddToCartView funtions={() => { AddToCart(); }} protionCount={protionlist.length} />
                </View>

                <View style={{ height: hp('5%') }}>

                </View>
            </ScrollView>

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
                                    <Text style={[Styles.itemText, { color: '#000', }]}>View Cart</Text>
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

            {(spinerVisible) ?
                <View
                    style={{
                        flex: 1,
                        position: "absolute",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0.8,
                        width: wp("100%"),
                        height: hp("100%"),
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        //zIndex:1
                    }}
                >

                    <View style={Styles.activityindicator_view}>
                        <ActivityIndicator animating size="large" color="#F5FCFF" />
                        <Text
                            style={{
                                color: "#000000"
                            }}
                        >
                            loading
                        </Text>
                    </View>
                </View>
                // <Feching_Loader/>
                : null}

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
        height: hp('14%'),
        justifyContent: 'center',
        //flexDirection: 'row'
    },
    single_portion_View: {
        width: wp('28%'),
        height: hp('11%'),
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
        alignItems: 'center'
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
        //position: 'absolute',
        //bottom: 0
    },
    cartTile: {
        width: wp('100%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
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
        marginLeft: 10,
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
    portionTexts: {
        fontFamily: 'NexaTextDemo-Light',
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.04,
    },
    activityindicator_view: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 100,
        opacity: 1,
        borderRadius: 20
    }


});

export default Single_Tranding_Screen;